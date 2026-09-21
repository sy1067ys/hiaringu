
/**
 * YOICHI ヒアリング — 受付データ用 API（Vercel Functions）
 *
 *   POST   /api/records          … タブレットからの送信（誰でも可・新規追加のみ）
 *   GET    /api/records          … 一覧（管理者PINが必要）
 *   PATCH  /api/records          … ステータス変更（管理者PINが必要）
 *   PUT    /api/records          … バックアップからの復元（管理者PINが必要）
 *   DELETE /api/records?id=xxx   … 削除（管理者PINが必要）
 *   GET    /api/records?ping=1   … 保存先が設定済みかの確認
 *
 * 必要な環境変数（Vercel の Settings → Environment Variables）
 *   ADMIN_PIN                              管理画面のPIN（6桁以上を推奨）
 *   KV_REST_API_URL / KV_REST_API_TOKEN    Upstash Redis を接続すると自動で入る
 *   （UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN という名前でも可）
 */
import { timingSafeEqual } from "node:crypto";

const HASH = "yoichi:records";
const FAIL_KEY = "yoichi:pin_fail";
const STATUSES = ["new", "in-progress", "done"];
const MAX_BODY_CHARS = 900_000;

function config() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(cmd: (string | number)[]): Promise<any> {
  const c = config();
  if (!c) throw new Error("storage not configured");
  const res = await fetch(c.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const data: any = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || `redis ${res.status}`);
  return data.result;
}

function safeEqual(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

/** 管理者チェック。問題があれば {status, message} を返す */
async function checkAdmin(req: any): Promise<{ status: number; message: string } | null> {
  const pin = process.env.ADMIN_PIN;
  if (!pin) return { status: 503, message: "管理用のPIN（ADMIN_PIN）がまだ設定されていません" };

  const attempts = Number(await redis(["GET", FAIL_KEY])) || 0;
  if (attempts >= 10) {
    return { status: 429, message: "試行回数が多すぎます。1分ほど待ってからお試しください" };
  }

  const raw = req.headers["x-admin-pin"];
  let given = "";
  try {
    given = decodeURIComponent(Array.isArray(raw) ? raw[0] : raw || "");
  } catch {
    given = "";
  }
  if (!safeEqual(given, pin)) {
    const n = await redis(["INCR", FAIL_KEY]);
    if (Number(n) === 1) await redis(["EXPIRE", FAIL_KEY, 60]);
    return { status: 401, message: "PINが違います" };
  }
  return null;
}

function cleanRecord(input: any, keepStatus: boolean) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  if (typeof input.companyName !== "string" || !input.companyName.trim()) return null;
  const idOk = typeof input.id === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(input.id);
  const id = idOk ? input.id : `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const status = keepStatus && STATUSES.includes(input.status) ? input.status : "new";
  const timestamp =
    typeof input.timestamp === "string" && input.timestamp
      ? input.timestamp
      : new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  return { ...input, id, status, timestamp };
}

function byNewest(a: any, b: any) {
  const na = Number(a.id);
  const nb = Number(b.id);
  if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return nb - na;
  return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  const method: string = req.method;
  const query = req.query ?? {};
  const cfg = config();

  if (method === "GET" && query.ping) {
    return res.status(200).json({ ok: true, configured: !!cfg, pinSet: !!process.env.ADMIN_PIN });
  }
  if (!cfg) {
    return res.status(503).json({ error: "保存先（Upstash Redis）がまだ設定されていません" });
  }

  try {
    /* 新規受付（公開）— 同じIDが既にあれば上書きしない（再送しても重複しない） */
    if (method === "POST") {
      if (JSON.stringify(req.body ?? "").length > MAX_BODY_CHARS) {
        return res.status(413).json({ error: "データが大きすぎます" });
      }
      const rec = cleanRecord(req.body, false);
      if (!rec) return res.status(400).json({ error: "お客様名が入力されていません" });
      await redis(["HSETNX", HASH, rec.id, JSON.stringify(rec)]);
      return res.status(200).json({ ok: true, id: rec.id });
    }

    /* ここから先は管理者のみ */
    const denied = await checkAdmin(req);
    if (denied) return res.status(denied.status).json({ error: denied.message });

    if (method === "GET") {
      if (query.verify) return res.status(200).json({ ok: true });
      const values: string[] = (await redis(["HVALS", HASH])) || [];
      const records = values
        .map((v) => {
          try {
            return JSON.parse(v);
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .sort(byNewest);
      return res.status(200).json({ records });
    }

    if (method === "PATCH") {
      const { id, status } = req.body ?? {};
      if (typeof id !== "string" || !STATUSES.includes(status)) {
        return res.status(400).json({ error: "指定が正しくありません" });
      }
      const current = await redis(["HGET", HASH, id]);
      if (!current) return res.status(404).json({ error: "データが見つかりません" });
      const next = { ...JSON.parse(current), status };
      await redis(["HSET", HASH, id, JSON.stringify(next)]);
      return res.status(200).json({ ok: true });
    }

    if (method === "PUT") {
      if (JSON.stringify(req.body ?? "").length > MAX_BODY_CHARS) {
        return res.status(413).json({ error: "データが大きすぎます" });
      }
      const rec = cleanRecord(req.body, true);
      if (!rec) return res.status(400).json({ error: "データの形式が正しくありません" });
      await redis(["HSET", HASH, rec.id, JSON.stringify(rec)]);
      return res.status(200).json({ ok: true, id: rec.id });
    }

    if (method === "DELETE") {
      const id = typeof query.id === "string" ? query.id : "";
      if (!id) return res.status(400).json({ error: "IDが指定されていません" });
      await redis(["HDEL", HASH, id]);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch {
    return res.status(500).json({ error: "サーバーでエラーが発生しました" });
  }
}
