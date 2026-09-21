
/**
 * データ保存の窓口。
 * - サーバー（/api/records）が使えるとき：全端末で同期される
 * - 使えないとき：この端末（ブラウザ）だけに保存される
 */

export type RecordStatus = "new" | "in-progress" | "done";
export type BaseRecord = { id: string; timestamp: string; status: RecordStatus };

const LOCAL_KEY = "yoichi_clients";
const OUTBOX_KEY = "yoichi_outbox";
const API = "/api/records";

export class AuthError extends Error {}

/* ─── localStorage helpers ─── */
function readJson<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeJson(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/* ─── server call ─── */
async function call(
  method: string,
  pin: string | null,
  opts: { query?: string; body?: unknown } = {},
) {
  const res = await fetch(`${API}${opts.query ?? ""}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(pin ? { "x-admin-pin": encodeURIComponent(pin) } : {}),
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    cache: "no-store",
  });
  if (res.status === 401) throw new AuthError("PINが違います");
  if (!res.ok) {
    let msg = `サーバーエラー (${res.status})`;
    try {
      const j = await res.json();
      if (j && typeof j.error === "string") msg = j.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res.json();
}

/** サーバー保存が使えるか（Upstash Redis が設定済みか）を確認する */
export async function detectBackend(): Promise<boolean> {
  try {
    const res = await fetch(`${API}?ping=1`, { cache: "no-store" });
    if (!res.ok) return false;
    const data = await res.json();
    return !!(data && data.configured === true);
  } catch {
    return false;
  }
}

/* ─── 送信（タブレット側） ─── */
export async function submitRecord<T extends BaseRecord>(
  rec: T,
  backend: boolean,
): Promise<"sent" | "queued"> {
  if (backend) {
    try {
      await call("POST", null, { body: rec });
      return "sent";
    } catch {
      // 通信できないとき：端末に一時保存し、あとで自動再送する
      const outbox = readJson<T[]>(OUTBOX_KEY, []);
      if (!outbox.some((o) => o.id === rec.id)) outbox.push(rec);
      if (!writeJson(OUTBOX_KEY, outbox)) {
        throw new Error("送信も端末への保存もできませんでした。通信状況をご確認ください。");
      }
      return "queued";
    }
  }
  const list = readJson<T[]>(LOCAL_KEY, []);
  list.unshift(rec);
  if (!writeJson(LOCAL_KEY, list)) {
    throw new Error("この端末に保存できませんでした（容量不足の可能性があります）。");
  }
  return "sent";
}

let flushing = false;
/** 未送信データを再送する。残っている件数を返す */
export async function flushOutbox(): Promise<number> {
  if (flushing) return outboxCount();
  flushing = true;
  try {
    const outbox = readJson<BaseRecord[]>(OUTBOX_KEY, []);
    if (outbox.length === 0) return 0;
    const remain: BaseRecord[] = [];
    for (const r of outbox) {
      try {
        await call("POST", null, { body: r });
      } catch {
        remain.push(r);
      }
    }
    writeJson(OUTBOX_KEY, remain);
    return remain.length;
  } finally {
    flushing = false;
  }
}
export function outboxCount(): number {
  return readJson<BaseRecord[]>(OUTBOX_KEY, []).length;
}

/* ─── 管理画面側 ─── */
export async function listRecords<T extends BaseRecord>(backend: boolean, pin: string): Promise<T[]> {
  if (backend) {
    const data = await call("GET", pin);
    return (Array.isArray(data.records) ? data.records : []) as T[];
  }
  return readJson<T[]>(LOCAL_KEY, []);
}

export async function verifyPin(pin: string): Promise<boolean> {
  try {
    await call("GET", pin, { query: "?verify=1" });
    return true;
  } catch (e) {
    if (e instanceof AuthError) return false;
    throw e;
  }
}

export async function updateStatus(backend: boolean, pin: string, id: string, status: RecordStatus) {
  if (backend) {
    await call("PATCH", pin, { body: { id, status } });
    return;
  }
  const list = readJson<BaseRecord[]>(LOCAL_KEY, []);
  writeJson(LOCAL_KEY, list.map((r) => (r.id === id ? { ...r, status } : r)));
}

export async function deleteRecord(backend: boolean, pin: string, id: string) {
  if (backend) {
    await call("DELETE", pin, { query: `?id=${encodeURIComponent(id)}` });
    return;
  }
  const list = readJson<BaseRecord[]>(LOCAL_KEY, []);
  writeJson(LOCAL_KEY, list.filter((r) => r.id !== id));
}

/** バックアップ（JSON）から読み込む。すでにあるIDはスキップ。追加した件数を返す */
export async function importRecords<T extends BaseRecord>(
  backend: boolean,
  pin: string,
  records: T[],
): Promise<number> {
  if (backend) {
    const existing = new Set((await listRecords<T>(true, pin)).map((r) => r.id));
    let n = 0;
    for (const r of records) {
      if (existing.has(r.id)) continue;
      await call("PUT", pin, { body: r });
      n++;
    }
    return n;
  }
  const list = readJson<T[]>(LOCAL_KEY, []);
  const ids = new Set(list.map((r) => r.id));
  const add = records.filter((r) => !ids.has(r.id));
  const merged = [...add, ...list].sort((a, b) => Number(b.id) - Number(a.id) || (a.id < b.id ? 1 : -1));
  if (!writeJson(LOCAL_KEY, merged)) throw new Error("この端末に保存できませんでした。");
  return add.length;
}
