import { useState, useEffect } from "react";
import WebsiteBriefForm, { WebsiteBrief, EMPTY_WEBSITE_BRIEF } from "./WebsiteBriefForm";
import { BannerBriefForm, BannerBrief, EMPTY_BANNER_BRIEF, LogoBriefForm, LogoBrief, EMPTY_LOGO_BRIEF } from "./BannerLogoBriefForm";
import AdBriefForm, { AdBrief, EMPTY_AD_BRIEF } from "./AdBriefForm";
import PrBriefForm, { PrBrief, EMPTY_PR_BRIEF } from "./PrBriefForm";
import EcBriefForm, { EcBrief, EMPTY_EC_BRIEF } from "./EcBriefForm";
import ProductBriefForm, { ProductBrief, EMPTY_PRODUCT_BRIEF } from "./ProductBriefForm";
import ContentBriefForm, { ContentBrief, EMPTY_CONTENT_BRIEF } from "./ContentBriefForm";
import SnsBriefForm, { SnsBrief, EMPTY_SNS_BRIEF } from "./SnsBriefForm";
import AppBriefForm, { AppBrief, EMPTY_APP_BRIEF } from "./AppBriefForm";
import VideoBriefForm, { VideoBrief, EMPTY_VIDEO_BRIEF } from "./VideoBriefForm";

/* ─── Service Catalogue ─── */
const SERVICE_CATEGORIES = [
  {
    id: "design_web",
    label: "デザイン制作・Web",
    icon: "✦",
    color: "#7c6455",
    items: [
      "Webサイト制作",
      "ランディングページ（LP）",
      "バナー・広告クリエイティブ",
      "ロゴ・ブランディングデザイン",
      "パンフレット・印刷物デザイン",
      "UI/UXデザイン",
      "その他デザイン制作",
    ],
  },
  {
    id: "app_sns",
    label: "アプリ制作・SNS運用",
    icon: "◈",
    color: "#5c7a6e",
    items: [
      "iOSアプリ開発",
      "Androidアプリ開発",
      "Webアプリ開発",
      "Instagram運用代行",
      "X（Twitter）運用代行",
      "TikTok運用代行",
      "LINE公式アカウント構築・運用",
      "その他SNS運用",
    ],
  },
  {
    id: "ad_pr_video",
    label: "広告・PR・動画",
    icon: "▸",
    color: "#8a6a3a",
    items: [
      "Web広告運用（Google / Meta）",
      "動画広告制作",
      "プロモーション動画",
      "インフルエンサー PR",
      "プレスリリース配信",
      "メディア掲載支援",
      "イベント企画・PR",
      "その他広告・PR",
    ],
  },
  {
    id: "content_ec",
    label: "コンテンツ制作・EC",
    icon: "◇",
    color: "#6a5c7a",
    items: [
      "記事・ブログコンテンツ制作",
      "写真撮影・スタイリング",
      "商品画像制作",
      "EC サイト構築（Shopify / BASE 等）",
      "EC 運用サポート",
      "メールマガジン制作",
      "その他コンテンツ制作",
    ],
  },
  {
    id: "product_sales",
    label: "商品企画・販売支援",
    icon: "◉",
    color: "#7a5c5c",
    items: [
      "商品企画・コンセプト立案",
      "パッケージデザイン",
      "販路開拓・卸支援",
      "Amazon / 楽天 出店サポート",
      "クラウドファンディング支援",
      "OEM・製造先紹介",
      "その他販売支援",
    ],
  },
];

const BUDGET_OPTIONS = [
  "〜30万円", "30〜100万円", "100〜300万円",
  "300〜500万円", "500万円〜", "要相談",
];

const TIMELINE_OPTIONS = [
  "1ヶ月以内", "3ヶ月以内", "半年以内", "半年〜1年", "1年以上", "未定",
];

const HOW_FOUND_OPTIONS = [
  "Instagram", "X（Twitter）", "Google検索", "ご紹介", "展示会・イベント", "その他",
];

const STEP_LABELS = ["お客様情報", "ご依頼内容", "ご予算・期間", "確認・送信"];
const STORAGE_KEY = "yoichi_clients";

type ServiceSelection = {
  categoryId: string;
  items: string[];
  detail: string;
  websiteBrief?: WebsiteBrief;
  bannerBrief?: BannerBrief;
  logoBrief?: LogoBrief;
  adBrief?: AdBrief;
  prBrief?: PrBrief;
  ecBrief?: EcBrief;
  productBrief?: ProductBrief;
  contentBrief?: ContentBrief;
  snsBrief?: SnsBrief;
  appBrief?: AppBrief;
  videoBrief?: VideoBrief;
};

type ClientRecord = {
  id: string;
  timestamp: string;
  // Step 1
  companyName: string;
  corporateNumber: string;
  postalCode: string;
  address: string;
  representativeName: string;
  foundedDate: string;
  employeeCount: string;
  industry: string;
  existingSiteUrl: string;
  snsInstagram: string;
  snsTiktok: string;
  snsX: string;
  // Step 2
  services: ServiceSelection[];
  projectOverview: string;
  // Step 3
  budget: string;
  timeline: string;
  hasReference: string;
  referenceUrl: string;
  // Step 4
  howFound: string;
  message: string;
  signature: string;
  status: "new" | "in-progress" | "done";
};

const EMPTY_FORM: Omit<ClientRecord, "id" | "timestamp" | "status"> = {
  companyName: "", corporateNumber: "",
  postalCode: "", address: "", representativeName: "",
  foundedDate: "", employeeCount: "", industry: "",
  existingSiteUrl: "", snsInstagram: "", snsTiktok: "", snsX: "",
  services: [], projectOverview: "",
  budget: "", timeline: "", hasReference: "なし", referenceUrl: "",
  howFound: "", message: "", signature: "",
};

function loadRecords(): ClientRecord[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveRecords(r: ClientRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
}

export default function App() {
  const [mode, setMode] = useState<"tablet" | "pc">("tablet");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [records, setRecords] = useState<ClientRecord[]>(loadRecords);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ClientRecord | null>(null);

  useEffect(() => {
    const iv = setInterval(() => setRecords(loadRecords()), 2000);
    return () => clearInterval(iv);
  }, []);

  function setField<K extends keyof typeof EMPTY_FORM>(key: K, value: typeof EMPTY_FORM[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleServiceCategory(catId: string) {
    setForm((f) => {
      const exists = f.services.find((s) => s.categoryId === catId);
      return {
        ...f,
        services: exists
          ? f.services.filter((s) => s.categoryId !== catId)
          : [...f.services, {
              categoryId: catId, items: [], detail: "",
              websiteBrief: catId === "design_web" ? { ...EMPTY_WEBSITE_BRIEF } : undefined,
              bannerBrief: catId === "design_web" ? { ...EMPTY_BANNER_BRIEF } : undefined,
              logoBrief: catId === "design_web" ? { ...EMPTY_LOGO_BRIEF } : undefined,
              adBrief: catId === "ad_pr_video" ? { ...EMPTY_AD_BRIEF } : undefined,
              prBrief: catId === "ad_pr_video" ? { ...EMPTY_PR_BRIEF } : undefined,
              ecBrief: catId === "content_ec" ? { ...EMPTY_EC_BRIEF } : undefined,
              productBrief: catId === "product_sales" ? { ...EMPTY_PRODUCT_BRIEF } : undefined,
              contentBrief: catId === "content_ec" ? { ...EMPTY_CONTENT_BRIEF } : undefined,
              snsBrief: catId === "app_sns" ? { ...EMPTY_SNS_BRIEF } : undefined,
              appBrief: catId === "app_sns" ? { ...EMPTY_APP_BRIEF } : undefined,
              videoBrief: catId === "ad_pr_video" ? { ...EMPTY_VIDEO_BRIEF } : undefined,
            }],
      };
    });
  }

  function updateWebsiteBrief(catId: string, brief: WebsiteBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, websiteBrief: brief }),
    }));
  }
  function updateBannerBrief(catId: string, brief: BannerBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, bannerBrief: brief }),
    }));
  }
  function updateLogoBrief(catId: string, brief: LogoBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, logoBrief: brief }),
    }));
  }
  function updateAdBrief(catId: string, brief: AdBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, adBrief: brief }),
    }));
  }
  function updatePrBrief(catId: string, brief: PrBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, prBrief: brief }),
    }));
  }
  function updateEcBrief(catId: string, brief: EcBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, ecBrief: brief }),
    }));
  }
  function updateProductBrief(catId: string, brief: ProductBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, productBrief: brief }),
    }));
  }
  function updateContentBrief(catId: string, brief: ContentBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, contentBrief: brief }),
    }));
  }
  function updateSnsBrief(catId: string, brief: SnsBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, snsBrief: brief }),
    }));
  }
  function updateAppBrief(catId: string, brief: AppBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, appBrief: brief }),
    }));
  }
  function updateVideoBrief(catId: string, brief: VideoBrief) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, videoBrief: brief }),
    }));
  }

  function toggleServiceItem(catId: string, item: string) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) =>
        s.categoryId !== catId ? s :
        { ...s, items: s.items.includes(item) ? s.items.filter((i) => i !== item) : [...s.items, item] }
      ),
    }));
  }

  function setServiceDetail(catId: string, detail: string) {
    setForm((f) => ({
      ...f,
      services: f.services.map((s) => s.categoryId !== catId ? s : { ...s, detail }),
    }));
  }

  function handleSubmit() {
    const record: ClientRecord = {
      ...form, id: Date.now().toString(),
      timestamp: new Date().toLocaleString("ja-JP"), status: "new",
    };
    const updated = [record, ...records];
    setRecords(updated);
    saveRecords(updated);
    setSubmitted(true);
  }

  function handleReset() {
    setForm({ ...EMPTY_FORM });
    setStep(0);
    setSubmitted(false);
  }

  function updateStatus(id: string, status: ClientRecord["status"]) {
    const updated = records.map((r) => r.id === id ? { ...r, status } : r);
    setRecords(updated);
    saveRecords(updated);
    if (selectedRecord?.id === id) setSelectedRecord((r) => r ? { ...r, status } : r);
  }

  const canProceed = () => {
    if (step === 0) return !!(form.companyName && form.representativeName);
    if (step === 1) return form.services.length > 0;
    if (step === 2) return !!(form.budget && form.timeline);
    return true;
  };

  return (
    <div className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
      {/* Header */}
      <header className="bg-[#1a1410] text-[#f7f3ee] px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontStyle: "italic", letterSpacing: 3 }}>
            YOICHI
          </span>
          <div className="w-px h-6 bg-[#7c6455]" />
          <span className="text-[#c9b8a4] text-sm tracking-widest font-light">Client Hearing</span>
        </div>
        <div className="flex gap-2">
          {(["tablet", "pc"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                mode === m
                  ? "bg-[#c9b8a4] text-[#1a1410]"
                  : "text-[#c9b8a4] border border-[#3d2b1f] hover:border-[#7c6455]"
              }`}>
              {m === "tablet" ? "ヒアリング" : "PC管理画面"}
            </button>
          ))}
        </div>
      </header>

      {mode === "tablet" ? (
        <TabletView
          step={step} form={form} submitted={submitted}
          setField={setField}
          onToggleCategory={toggleServiceCategory}
          onToggleItem={toggleServiceItem}
          onSetDetail={setServiceDetail}
          onUpdateWebsiteBrief={updateWebsiteBrief}
          onUpdateBannerBrief={updateBannerBrief}
          onUpdateLogoBrief={updateLogoBrief}
          onUpdateAdBrief={updateAdBrief}
          onUpdatePrBrief={updatePrBrief}
          onUpdateEcBrief={updateEcBrief}
          onUpdateProductBrief={updateProductBrief}
          onUpdateContentBrief={updateContentBrief}
          onUpdateSnsBrief={updateSnsBrief}
          onUpdateAppBrief={updateAppBrief}
          onUpdateVideoBrief={updateVideoBrief}
          onNext={() => setStep((s) => s + 1)}
          onBack={() => setStep((s) => s - 1)}
          onGoToStep={(s) => setStep(s)}
          onSubmit={handleSubmit}
          onReset={handleReset}
          canProceed={canProceed()}
        />
      ) : (
        <PCView records={records} selected={selectedRecord}
          onSelect={setSelectedRecord} onUpdateStatus={updateStatus} />
      )}
    </div>
  );
}

/* ─── Tablet View ─── */
function TabletView({ step, form, submitted, setField, onToggleCategory, onToggleItem, onSetDetail, onUpdateWebsiteBrief, onUpdateBannerBrief, onUpdateLogoBrief, onUpdateAdBrief, onUpdatePrBrief, onUpdateEcBrief, onUpdateProductBrief, onUpdateContentBrief, onUpdateSnsBrief, onUpdateAppBrief, onUpdateVideoBrief, onNext, onBack, onGoToStep, onSubmit, onReset, canProceed }: {
  step: number;
  form: typeof EMPTY_FORM;
  submitted: boolean;
  setField: <K extends keyof typeof EMPTY_FORM>(k: K, v: typeof EMPTY_FORM[K]) => void;
  onToggleCategory: (id: string) => void;
  onToggleItem: (catId: string, item: string) => void;
  onSetDetail: (catId: string, detail: string) => void;
  onUpdateWebsiteBrief: (catId: string, brief: WebsiteBrief) => void;
  onUpdateBannerBrief: (catId: string, brief: BannerBrief) => void;
  onUpdateLogoBrief: (catId: string, brief: LogoBrief) => void;
  onUpdateAdBrief: (catId: string, brief: AdBrief) => void;
  onUpdatePrBrief: (catId: string, brief: PrBrief) => void;
  onUpdateEcBrief: (catId: string, brief: EcBrief) => void;
  onUpdateProductBrief: (catId: string, brief: ProductBrief) => void;
  onUpdateContentBrief: (catId: string, brief: ContentBrief) => void;
  onUpdateSnsBrief: (catId: string, brief: SnsBrief) => void;
  onUpdateAppBrief: (catId: string, brief: AppBrief) => void;
  onUpdateVideoBrief: (catId: string, brief: VideoBrief) => void;
  onNext: () => void;
  onBack: () => void;
  onGoToStep: (s: number) => void;
  onSubmit: () => void;
  onReset: () => void;
  canProceed: boolean;
}) {
  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#f7f3ee] p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-[#5c7a6e] flex items-center justify-center mb-6 shadow-lg">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32 }} className="text-[#1a1410] mb-2 italic">
          ありがとうございます
        </h2>
        <p className="text-[#7c6455] text-lg mb-1">ヒアリング内容を受け付けました</p>
        <p className="text-[#c9b8a4] text-sm mb-10">担当者より改めてご連絡いたします</p>
        <button onClick={onReset}
          className="px-8 py-3 bg-[#1a1410] text-[#f7f3ee] rounded font-medium hover:bg-[#7c6455] transition-colors tracking-wide">
          新しいヒアリングへ
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f7f3ee]">
      {/* Steps */}
      <div className="bg-[#1a1410] px-6 py-5">
        <div className="flex gap-0 max-w-3xl mx-auto">
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <button
                  type="button"
                  onClick={() => i < step && onGoToStep(i)}
                  disabled={i >= step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all border ${
                    i < step
                      ? "bg-[#5c7a6e] border-[#5c7a6e] text-white cursor-pointer hover:bg-[#4a6a5e] hover:scale-110"
                      : i === step
                      ? "bg-[#c9b8a4] border-[#c9b8a4] text-[#1a1410] cursor-default"
                      : "bg-transparent border-[#3d2b1f] text-[#7c6455] cursor-default"
                  }`}
                  title={i < step ? `${label}に戻る` : undefined}
                >
                  {i < step ? "✓" : i + 1}
                </button>
                <span className={`text-xs tracking-wide ${i === step ? "text-[#c9b8a4] font-semibold" : i < step ? "text-[#5c7a6e]" : "text-[#7c6455]"}`}>
                  {label}
                </span>
              </div>
              {i < 3 && <div className={`w-full h-px mb-5 ${i < step ? "bg-[#5c7a6e]" : "bg-[#3d2b1f]"}`} style={{ maxWidth: 40 }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {step === 0 && <Step1 form={form} setField={setField} />}
          {step === 1 && <Step2 form={form} onToggleCategory={onToggleCategory} onToggleItem={onToggleItem} onSetDetail={onSetDetail} setField={setField} onUpdateWebsiteBrief={onUpdateWebsiteBrief} onUpdateBannerBrief={onUpdateBannerBrief} onUpdateLogoBrief={onUpdateLogoBrief} onUpdateAdBrief={onUpdateAdBrief} onUpdatePrBrief={onUpdatePrBrief} onUpdateEcBrief={onUpdateEcBrief} onUpdateProductBrief={onUpdateProductBrief} onUpdateContentBrief={onUpdateContentBrief} onUpdateSnsBrief={onUpdateSnsBrief} onUpdateAppBrief={onUpdateAppBrief} onUpdateVideoBrief={onUpdateVideoBrief} />}
          {step === 2 && <Step3 form={form} setField={setField} />}
          {step === 3 && <Step4 form={form} setField={setField} onSubmit={onSubmit} onGoToStep={onGoToStep} />}
        </div>
      </div>

      <div className="bg-[#ede7de] border-t border-[#c9b8a4]/40 px-6 py-4 flex justify-between items-center">
        <button
          onClick={onBack}
          disabled={step === 0}
          className="flex items-center gap-2 px-5 py-2.5 border border-[#7c6455] text-[#7c6455] rounded-lg font-medium disabled:opacity-30 hover:bg-[#c9b8a4]/20 active:bg-[#c9b8a4]/40 transition-colors text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {step === 3 ? "予算・期間に戻る" : step === 2 ? "依頼内容に戻る" : step === 1 ? "お客様情報に戻る" : "戻る"}
        </button>
        <span className="text-xs text-[#7c6455]">{step + 1} / {STEP_LABELS.length}</span>
        {step < 3 ? (
          <button onClick={onNext} disabled={!canProceed}
            className="flex items-center gap-2 px-7 py-2.5 bg-[#1a1410] text-[#f7f3ee] rounded-lg font-medium disabled:opacity-40 hover:bg-[#7c6455] active:bg-[#3d2b1f] transition-colors tracking-wide text-sm">
            次へ
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ) : (
          <div className="w-32" />
        )}
      </div>
    </div>
  );
}

/* ─── Step Components ─── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "var(--font-display)" }}
      className="text-2xl text-[#1a1410] mb-2 italic">
      {children}
    </h2>
  );
}
function SectionSub({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-[#7c6455] mb-7">{children}</p>;
}
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold tracking-widest text-[#7c6455] uppercase mb-1.5">
      {children}{required && <span className="text-[#d4a5a5] normal-case font-normal ml-1">（必須）</span>}
    </label>
  );
}
function FInput({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-4 py-3 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7c6455] focus:ring-1 focus:ring-[#7c6455]/30 transition-all text-base" />
  );
}
function FTextarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-4 py-3 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7c6455] focus:ring-1 focus:ring-[#7c6455]/30 transition-all text-base resize-none" />
  );
}
function FSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-4 py-3 text-[#1a1410] focus:outline-none focus:border-[#7c6455] transition-all text-base appearance-none">
      <option value="">選択してください</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`px-4 py-2 rounded text-sm font-medium border transition-all ${
            value === o ? "bg-[#1a1410] text-[#f7f3ee] border-[#1a1410]"
              : "bg-white text-[#7c6455] border-[#c9b8a4]/60 hover:border-[#7c6455]"
          }`}>
          {o}
        </button>
      ))}
    </div>
  );
}

function Step1({ form, setField }: { form: typeof EMPTY_FORM; setField: <K extends keyof typeof EMPTY_FORM>(k: K, v: typeof EMPTY_FORM[K]) => void }) {
  return (
    <div className="space-y-6">
      <div><SectionTitle>お客様情報</SectionTitle><SectionSub>会社・団体の基本情報をご入力ください</SectionSub></div>

      {/* 正式名称／屋号 */}
      <div>
        <FieldLabel required>正式名称／屋号</FieldLabel>
        <FInput value={form.companyName} onChange={(v) => setField("companyName", v)} placeholder="株式会社〇〇 / 〇〇工房" />
      </div>

      {/* 法人番号 */}
      <div>
        <FieldLabel>法人番号（任意）</FieldLabel>
        <FInput value={form.corporateNumber} onChange={(v) => setField("corporateNumber", v)} placeholder="1234567890123（13桁）" />
      </div>

      {/* 所在地 */}
      <div>
        <FieldLabel>所在地</FieldLabel>
        <div className="flex gap-3 mb-2">
          <div className="w-40">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7c6455] text-sm font-medium pointer-events-none">〒</span>
              <input
                type="text"
                value={form.postalCode}
                onChange={(e) => setField("postalCode", e.target.value)}
                placeholder="000-0000"
                maxLength={8}
                className="w-full bg-white border border-[#c9b8a4]/60 rounded pl-8 pr-4 py-3 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7c6455] focus:ring-1 focus:ring-[#7c6455]/30 transition-all text-base"
              />
            </div>
          </div>
        </div>
        <FInput value={form.address} onChange={(v) => setField("address", v)} placeholder="東京都渋谷区〇〇町1-2-3" />
      </div>

      {/* 代表者名 ／ 設立年月 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel required>代表者名</FieldLabel>
          <FInput value={form.representativeName} onChange={(v) => setField("representativeName", v)} placeholder="山田 太郎" />
        </div>
        <div>
          <FieldLabel>設立年月</FieldLabel>
          <FInput value={form.foundedDate} onChange={(v) => setField("foundedDate", v)} placeholder="2010年4月" />
        </div>
      </div>

      {/* 従業員数 ／ 業種 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>従業員数</FieldLabel>
          <FInput value={form.employeeCount} onChange={(v) => setField("employeeCount", v)} placeholder="例：50名" />
        </div>
        <div>
          <FieldLabel>業種／事業分類</FieldLabel>
          <FInput value={form.industry} onChange={(v) => setField("industry", v)} placeholder="例：アパレル、飲食、IT" />
        </div>
      </div>

      {/* 既存サイトURL */}
      <div>
        <FieldLabel>既存サイトURL</FieldLabel>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7c6455] text-sm pointer-events-none select-none">https://</span>
          <input
            type="url"
            value={form.existingSiteUrl}
            onChange={(e) => setField("existingSiteUrl", e.target.value)}
            placeholder="www.example.com"
            className="w-full bg-white border border-[#c9b8a4]/60 rounded pl-20 pr-4 py-3 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7c6455] focus:ring-1 focus:ring-[#7c6455]/30 transition-all text-base"
          />
        </div>
      </div>

      {/* SNS URL */}
      <div>
        <FieldLabel>SNS URL</FieldLabel>
        <div className="space-y-3">
          {([
            { label: "Instagram", key: "snsInstagram", placeholder: "@username または URL" },
            { label: "TikTok", key: "snsTiktok", placeholder: "@username または URL" },
            { label: "X", key: "snsX", placeholder: "@username または URL" },
          ] as const).map(({ label, key, placeholder }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#7c6455] w-20 shrink-0">{label}：</span>
              <FInput value={form[key]} onChange={(v) => setField(key, v)} placeholder={placeholder} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2({ form, onToggleCategory, onToggleItem, onSetDetail, setField, onUpdateWebsiteBrief, onUpdateBannerBrief, onUpdateLogoBrief, onUpdateAdBrief, onUpdatePrBrief, onUpdateEcBrief, onUpdateProductBrief, onUpdateContentBrief, onUpdateSnsBrief, onUpdateAppBrief, onUpdateVideoBrief }: {
  form: typeof EMPTY_FORM;
  onToggleCategory: (id: string) => void;
  onToggleItem: (catId: string, item: string) => void;
  onSetDetail: (catId: string, detail: string) => void;
  setField: <K extends keyof typeof EMPTY_FORM>(k: K, v: typeof EMPTY_FORM[K]) => void;
  onUpdateWebsiteBrief: (catId: string, brief: WebsiteBrief) => void;
  onUpdateBannerBrief: (catId: string, brief: BannerBrief) => void;
  onUpdateLogoBrief: (catId: string, brief: LogoBrief) => void;
  onUpdateAdBrief: (catId: string, brief: AdBrief) => void;
  onUpdatePrBrief: (catId: string, brief: PrBrief) => void;
  onUpdateEcBrief: (catId: string, brief: EcBrief) => void;
  onUpdateProductBrief: (catId: string, brief: ProductBrief) => void;
  onUpdateContentBrief: (catId: string, brief: ContentBrief) => void;
  onUpdateSnsBrief: (catId: string, brief: SnsBrief) => void;
  onUpdateAppBrief: (catId: string, brief: AppBrief) => void;
  onUpdateVideoBrief: (catId: string, brief: VideoBrief) => void;
}) {
  return (
    <div className="space-y-5">
      <div><SectionTitle>ご依頼内容</SectionTitle><SectionSub>ご希望のカテゴリを選択し、詳細項目をお選びください（複数可）</SectionSub></div>

      {SERVICE_CATEGORIES.map((cat) => {
        const sel = form.services.find((s) => s.categoryId === cat.id);
        const active = !!sel;
        return (
          <div key={cat.id}
            className={`rounded-xl border-2 transition-all overflow-hidden ${
              active ? "border-[#3d2b1f] shadow-md" : "border-[#c9b8a4]/40 hover:border-[#c9b8a4]"
            }`}>
            {/* Category header toggle */}
            <button type="button" onClick={() => onToggleCategory(cat.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                active ? "bg-[#1a1410] text-[#f7f3ee]" : "bg-white text-[#1a1410] hover:bg-[#ede7de]"
              }`}>
              <span className="text-2xl" style={{ color: active ? "#c9b8a4" : cat.color }}>{cat.icon}</span>
              <span className="font-semibold text-base tracking-wide flex-1">{cat.label}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                active
                  ? "border-[#c9b8a4]/40 text-[#c9b8a4] bg-white/10"
                  : "border-[#c9b8a4]/60 text-[#7c6455]"
              }`}>
                {active ? "選択中 ✓" : "選択する"}
              </span>
            </button>

            {/* Sub-items */}
            {active && (
              <div className="bg-[#faf8f5] px-6 py-5 space-y-4 border-t border-[#c9b8a4]/30">
                <p className="text-xs text-[#7c6455] tracking-wider font-semibold uppercase">詳細項目を選択（複数可）</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <button key={item} type="button" onClick={() => onToggleItem(cat.id, item)}
                      className={`px-3.5 py-2 rounded-lg text-sm border transition-all ${
                        sel!.items.includes(item)
                          ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]"
                          : "bg-white text-[#7c6455] border-[#c9b8a4]/60 hover:border-[#7c6455]"
                      }`}>
                      {item}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-[#7c6455] tracking-wider font-semibold uppercase mb-1.5">
                    補足・詳細（任意）
                  </label>
                  <FTextarea
                    value={sel!.detail}
                    onChange={(v) => onSetDetail(cat.id, v)}
                    placeholder={`${cat.label}についての詳細や補足をご記入ください`}
                    rows={2}
                  />
                </div>
                {/* Webサイト制作詳細ヒアリング */}
                {cat.id === "design_web" &&
                  (sel!.items.includes("Webサイト制作") || sel!.items.includes("ランディングページ（LP）")) && (
                  <WebsiteBriefForm
                    brief={sel!.websiteBrief ?? { ...EMPTY_WEBSITE_BRIEF }}
                    onChange={(b) => onUpdateWebsiteBrief(cat.id, b)}
                  />
                )}
                {/* バナー広告詳細ヒアリング */}
                {cat.id === "design_web" && sel!.items.includes("バナー・広告クリエイティブ") && (
                  <BannerBriefForm
                    brief={sel!.bannerBrief ?? { ...EMPTY_BANNER_BRIEF }}
                    onChange={(b) => onUpdateBannerBrief(cat.id, b)}
                  />
                )}
                {/* ロゴデザイン詳細ヒアリング */}
                {cat.id === "design_web" && sel!.items.includes("ロゴ・ブランディングデザイン") && (
                  <LogoBriefForm
                    brief={sel!.logoBrief ?? { ...EMPTY_LOGO_BRIEF }}
                    onChange={(b) => onUpdateLogoBrief(cat.id, b)}
                  />
                )}
                {/* 動画制作詳細ヒアリング */}
                {cat.id === "ad_pr_video" && sel!.items.some((i) => i.includes("動画")) && (
                  <VideoBriefForm
                    brief={sel!.videoBrief ?? { ...EMPTY_VIDEO_BRIEF }}
                    onChange={(b) => onUpdateVideoBrief(cat.id, b)}
                  />
                )}
                {/* 広告運用詳細ヒアリング */}
                {cat.id === "ad_pr_video" && sel!.items.some((i) => i.includes("広告")) && (
                  <AdBriefForm
                    brief={sel!.adBrief ?? { ...EMPTY_AD_BRIEF }}
                    onChange={(b) => onUpdateAdBrief(cat.id, b)}
                  />
                )}
                {/* PR詳細ヒアリング */}
                {cat.id === "ad_pr_video" && sel!.items.some((i) => ["プレスリリース配信","メディア掲載支援","インフルエンサー PR"].includes(i)) && (
                  <PrBriefForm
                    brief={sel!.prBrief ?? { ...EMPTY_PR_BRIEF }}
                    onChange={(b) => onUpdatePrBrief(cat.id, b)}
                  />
                )}
                {/* コンテンツ制作詳細ヒアリング */}
                {cat.id === "content_ec" && sel!.items.some((i) =>
                  ["記事・ブログコンテンツ制作","写真撮影・スタイリング","商品画像制作","メールマガジン制作","その他コンテンツ制作"].includes(i)
                ) && (
                  <ContentBriefForm
                    brief={sel!.contentBrief ?? { ...EMPTY_CONTENT_BRIEF }}
                    onChange={(b) => onUpdateContentBrief(cat.id, b)}
                  />
                )}
                {/* EC制作詳細ヒアリング */}
                {cat.id === "content_ec" && sel!.items.some((i) => i.includes("EC")) && (
                  <EcBriefForm
                    brief={sel!.ecBrief ?? { ...EMPTY_EC_BRIEF }}
                    onChange={(b) => onUpdateEcBrief(cat.id, b)}
                  />
                )}
                {/* 商品企画・販売支援詳細ヒアリング */}
                {cat.id === "product_sales" && sel!.items.length > 0 && (
                  <ProductBriefForm
                    brief={sel!.productBrief ?? { ...EMPTY_PRODUCT_BRIEF }}
                    onChange={(b) => onUpdateProductBrief(cat.id, b)}
                  />
                )}
                {/* SNS運用詳細ヒアリング */}
                {cat.id === "app_sns" && sel!.items.some((i) => i.includes("運用") || i.includes("SNS")) && (
                  <SnsBriefForm
                    brief={sel!.snsBrief ?? { ...EMPTY_SNS_BRIEF }}
                    onChange={(b) => onUpdateSnsBrief(cat.id, b)}
                  />
                )}
                {/* アプリ制作詳細ヒアリング */}
                {cat.id === "app_sns" && sel!.items.some((i) => i.includes("アプリ") || i.includes("Webアプリ")) && (
                  <AppBriefForm
                    brief={sel!.appBrief ?? { ...EMPTY_APP_BRIEF }}
                    onChange={(b) => onUpdateAppBrief(cat.id, b)}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="pt-2">
        <FieldLabel>プロジェクトの概要・背景</FieldLabel>
        <FTextarea
          value={form.projectOverview}
          onChange={(v) => setField("projectOverview", v)}
          placeholder="お取り組みの背景、現状の課題、達成したい目標などをご自由にご記入ください"
          rows={4}
        />
      </div>
    </div>
  );
}

function Step3({ form, setField }: { form: typeof EMPTY_FORM; setField: <K extends keyof typeof EMPTY_FORM>(k: K, v: typeof EMPTY_FORM[K]) => void }) {
  return (
    <div className="space-y-6">
      <div><SectionTitle>ご予算・スケジュール</SectionTitle><SectionSub>おおよその目安をお聞かせください</SectionSub></div>
      <div>
        <FieldLabel required>ご予算の目安</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map((o) => (
            <button key={o} type="button" onClick={() => setField("budget", o)}
              className={`px-5 py-3 rounded-lg text-sm font-medium border transition-all ${
                form.budget === o ? "bg-[#1a1410] text-[#f7f3ee] border-[#1a1410]"
                  : "bg-white text-[#7c6455] border-[#c9b8a4]/60 hover:border-[#7c6455]"
              }`}>
              {o}
            </button>
          ))}
        </div>
      </div>
      <div>
        <FieldLabel required>ご希望の納期・スケジュール</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {TIMELINE_OPTIONS.map((o) => (
            <button key={o} type="button" onClick={() => setField("timeline", o)}
              className={`px-5 py-3 rounded-lg text-sm font-medium border transition-all ${
                form.timeline === o ? "bg-[#1a1410] text-[#f7f3ee] border-[#1a1410]"
                  : "bg-white text-[#7c6455] border-[#c9b8a4]/60 hover:border-[#7c6455]"
              }`}>
              {o}
            </button>
          ))}
        </div>
      </div>
      <div>
        <FieldLabel>参考サイト・資料はありますか？</FieldLabel>
        <Chips options={["あり", "なし"]} value={form.hasReference} onChange={(v) => setField("hasReference", v)} />
      </div>
      {form.hasReference === "あり" && (
        <div>
          <FieldLabel>参考URL・資料名</FieldLabel>
          <FInput value={form.referenceUrl} onChange={(v) => setField("referenceUrl", v)} placeholder="https://example.com" />
        </div>
      )}
    </div>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs text-[#7c6455] border border-[#c9b8a4] rounded-md px-3 py-1.5 hover:bg-[#c9b8a4]/20 hover:border-[#7c6455] transition-all active:bg-[#c9b8a4]/40"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      修正する
    </button>
  );
}

function ReviewSection({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#c9b8a4]/50 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-[#ede7de] border-b border-[#c9b8a4]/40">
        <span className="text-xs font-semibold tracking-widest text-[#7c6455] uppercase">{title}</span>
        <EditButton onClick={onEdit} />
      </div>
      <div className="px-5 py-4 text-sm">{children}</div>
    </div>
  );
}

function Step4({ form, setField, onSubmit, onGoToStep }: {
  form: typeof EMPTY_FORM;
  setField: <K extends keyof typeof EMPTY_FORM>(k: K, v: typeof EMPTY_FORM[K]) => void;
  onSubmit: () => void;
  onGoToStep: (s: number) => void;
}) {
  return (
    <div className="space-y-5">
      <div><SectionTitle>確認・送信</SectionTitle><SectionSub>内容をご確認いただき、修正がある場合は「修正する」をタップしてください</SectionSub></div>

      {/* Section 1: Customer Info */}
      <ReviewSection title="お客様情報" onEdit={() => onGoToStep(0)}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
          <CR label="正式名称／屋号" value={form.companyName} />
          <CR label="法人番号" value={form.corporateNumber || "—"} />
          <CR label="所在地" value={[form.postalCode && `〒${form.postalCode}`, form.address].filter(Boolean).join(" ")} />
          <CR label="代表者名" value={form.representativeName} />
          <CR label="設立年月" value={form.foundedDate} />
          <CR label="従業員数" value={form.employeeCount} />
          <CR label="業種／事業分類" value={form.industry} />
          <CR label="既存サイト" value={form.existingSiteUrl} />
          {(form.snsInstagram || form.snsTiktok || form.snsX) && (
            <div className="col-span-2 pt-2 border-t border-[#c9b8a4]/20">
              <p className="text-xs text-[#7c6455] mb-1.5">SNS</p>
              <div className="space-y-0.5">
                {form.snsInstagram && <p className="text-[#1a1410] text-sm"><span className="text-[#7c6455]">Instagram：</span>{form.snsInstagram}</p>}
                {form.snsTiktok && <p className="text-[#1a1410] text-sm"><span className="text-[#7c6455]">TikTok：</span>{form.snsTiktok}</p>}
                {form.snsX && <p className="text-[#1a1410] text-sm"><span className="text-[#7c6455]">X：</span>{form.snsX}</p>}
              </div>
            </div>
          )}
        </div>
      </ReviewSection>

      {/* Section 2: Services */}
      <ReviewSection title="ご依頼内容" onEdit={() => onGoToStep(1)}>
        <div className="space-y-3">
          {form.services.length === 0 ? (
            <p className="text-[#c9b8a4]">未選択</p>
          ) : form.services.map((s) => {
            const cat = SERVICE_CATEGORIES.find((c) => c.id === s.categoryId);
            return (
              <div key={s.categoryId} className="pb-3 border-b border-[#c9b8a4]/20 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span>{cat?.icon}</span>
                  <span className="font-semibold text-[#1a1410]">{cat?.label}</span>
                </div>
                {s.items.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    {s.items.map((item) => (
                      <span key={item} className="text-xs px-2 py-0.5 bg-[#3d2b1f]/10 text-[#3d2b1f] rounded-full">{item}</span>
                    ))}
                  </div>
                )}
                {s.detail && <p className="text-xs text-[#7c6455] mt-1">{s.detail}</p>}
              </div>
            );
          })}
          {form.projectOverview && (
            <div className="pt-2 border-t border-[#c9b8a4]/20">
              <p className="text-xs text-[#7c6455] mb-0.5">プロジェクト概要</p>
              <p className="text-[#1a1410]">{form.projectOverview}</p>
            </div>
          )}
        </div>
      </ReviewSection>

      {/* Section 3: Budget / Timeline */}
      <ReviewSection title="ご予算・スケジュール" onEdit={() => onGoToStep(2)}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
          <CR label="ご予算" value={form.budget} />
          <CR label="納期" value={form.timeline} />
          <CR label="参考資料" value={form.hasReference} />
          {form.referenceUrl && <CR label="参考URL" value={form.referenceUrl} />}
        </div>
      </ReviewSection>

      {/* Step 4-only fields */}
      <div className="pt-2 space-y-5">
        <div>
          <FieldLabel>当社をお知りになったきっかけ</FieldLabel>
          <Chips options={HOW_FOUND_OPTIONS} value={form.howFound} onChange={(v) => setField("howFound", v)} />
        </div>
        <div>
          <FieldLabel>担当者へのメッセージ（任意）</FieldLabel>
          <FTextarea value={form.message} onChange={(v) => setField("message", v)} placeholder="ご質問・ご要望などをご自由にご記入ください" rows={3} />
        </div>
      </div>

      <div className="bg-[#faf8f5] border border-[#c9b8a4]/60 rounded-xl p-5">
        <p className="text-xs text-[#7c6455] mb-4 leading-relaxed">
          ご入力いただいた情報は、ご提案・ご連絡の目的のみに使用し、第三者への提供は行いません。
        </p>
        <FieldLabel required>お名前（確認のため再入力）</FieldLabel>
        <FInput value={form.signature} onChange={(v) => setField("signature", v)} placeholder="山田 太郎" />
      </div>

      <button onClick={onSubmit} disabled={!form.signature}
        style={{ fontFamily: "var(--font-display)" }}
        className="w-full py-4 bg-[#1a1410] text-[#f7f3ee] rounded-xl text-xl font-semibold italic disabled:opacity-40 hover:bg-[#7c6455] transition-colors tracking-wide">
        送信する
      </button>
    </div>
  );
}

function CR({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[#7c6455]">{label}：</span>
      <span className="text-[#1a1410] font-medium">{value || "—"}</span>
    </div>
  );
}

/* ─── PC View ─── */

const STATUS_MAP = {
  new: { label: "新規受付", cls: "bg-[#d4a5a5]/30 text-[#7c3030] border-[#d4a5a5]" },
  "in-progress": { label: "対応中", cls: "bg-[#c9b8a4]/30 text-[#5c4033] border-[#c9b8a4]" },
  done: { label: "完了", cls: "bg-[#8a9e8c]/30 text-[#2e4a30] border-[#8a9e8c]" },
};

function PCView({ records, selected, onSelect, onUpdateStatus }: {
  records: ClientRecord[];
  selected: ClientRecord | null;
  onSelect: (r: ClientRecord) => void;
  onUpdateStatus: (id: string, status: ClientRecord["status"]) => void;
}) {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r border-[#c9b8a4]/40 bg-[#ede7de] flex flex-col">
        <div className="px-5 py-4 border-b border-[#c9b8a4]/40 bg-[#1a1410]">
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-lg text-[#f7f3ee] italic">受付リスト</h2>
          <p className="text-xs text-[#7c6455] mt-0.5">{records.length}件 — 自動更新中</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {records.length === 0 ? (
            <div className="p-8 text-center text-[#c9b8a4] text-sm">まだデータがありません</div>
          ) : records.map((r) => (
            <button key={r.id} onClick={() => onSelect(r)}
              className={`w-full text-left px-5 py-4 border-b border-[#c9b8a4]/30 hover:bg-[#c9b8a4]/20 transition-colors ${selected?.id === r.id ? "bg-[#c9b8a4]/30" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[#1a1410] text-sm">{r.companyName}</span>
                <span className={`text-xs px-2 py-0.5 rounded border ${STATUS_MAP[r.status].cls}`}>{STATUS_MAP[r.status].label}</span>
              </div>
              <div className="text-xs text-[#7c6455]">{r.representativeName}{r.industry ? `・${r.industry}` : ""}</div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {r.services.slice(0, 2).map((s) => {
                  const cat = SERVICE_CATEGORIES.find((c) => c.id === s.categoryId);
                  return <span key={s.categoryId} className="text-xs px-1.5 py-0.5 bg-[#1a1410]/10 text-[#1a1410] rounded">{cat?.label}</span>;
                })}
                {r.services.length > 2 && <span className="text-xs text-[#7c6455]">+{r.services.length - 2}</span>}
              </div>
              <div className="text-xs text-[#c9b8a4] mt-1">{r.timestamp}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      {selected ? (
        <div className="flex-1 overflow-y-auto p-8 bg-[#f7f3ee]">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start justify-between mb-7">
              <div>
                <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl text-[#1a1410] italic">{selected.companyName}</h2>
                <p className="text-[#7c6455] text-sm mt-1">{selected.representativeName} ／ {selected.timestamp}</p>
              </div>
              <div className="flex gap-2">
                {(["new", "in-progress", "done"] as ClientRecord["status"][]).map((s) => (
                  <button key={s} onClick={() => onUpdateStatus(selected.id, s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded border transition-all ${
                      selected.status === s ? STATUS_MAP[s].cls + " shadow-sm" : "bg-white text-[#7c6455] border-[#c9b8a4]/60 hover:border-[#7c6455]"
                    }`}>
                    {STATUS_MAP[s].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <DCard title="お客様情報">
                <DGrid2>
                  <DR label="正式名称／屋号" value={selected.companyName} />
                  <DR label="法人番号" value={selected.corporateNumber} />
                  <DR label="所在地" value={[selected.postalCode && `〒${selected.postalCode}`, selected.address].filter(Boolean).join(" ")} />
                  <DR label="代表者名" value={selected.representativeName} />
                  <DR label="設立年月" value={selected.foundedDate} />
                  <DR label="従業員数" value={selected.employeeCount} />
                  <DR label="業種／事業分類" value={selected.industry} />
                  <DR label="既存サイトURL" value={selected.existingSiteUrl} />
                  {selected.snsInstagram && <DR label="Instagram" value={selected.snsInstagram} />}
                  {selected.snsTiktok && <DR label="TikTok" value={selected.snsTiktok} />}
                  {selected.snsX && <DR label="X" value={selected.snsX} />}
                  <DR label="きっかけ" value={selected.howFound} />
                </DGrid2>
              </DCard>

              <DCard title="ご依頼内容">
                <div className="space-y-5">
                  {selected.services.map((s) => {
                    const cat = SERVICE_CATEGORIES.find((c) => c.id === s.categoryId);
                    return (
                      <div key={s.categoryId} className="pb-4 border-b border-[#c9b8a4]/30 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{cat?.icon}</span>
                          <span className="font-semibold text-[#1a1410] text-sm">{cat?.label}</span>
                        </div>
                        {s.items.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {s.items.map((item) => (
                              <span key={item} className="text-xs px-2.5 py-1 bg-[#3d2b1f]/10 text-[#3d2b1f] rounded-full">{item}</span>
                            ))}
                          </div>
                        )}
                        {s.detail && <p className="text-sm text-[#7c6455] mt-1">{s.detail}</p>}
                      </div>
                    );
                  })}
                </div>
                {selected.projectOverview && (
                  <div className="mt-4 pt-4 border-t border-[#c9b8a4]/30">
                    <p className="text-xs text-[#7c6455] tracking-wider font-semibold uppercase mb-1">プロジェクト概要</p>
                    <p className="text-[#1a1410] text-sm">{selected.projectOverview}</p>
                  </div>
                )}
              </DCard>

              <DCard title="ご予算・スケジュール">
                <DGrid2>
                  <DR label="ご予算" value={selected.budget} />
                  <DR label="納期" value={selected.timeline} />
                  <DR label="参考資料" value={selected.hasReference} />
                  {selected.referenceUrl && <DR label="参考URL" value={selected.referenceUrl} />}
                </DGrid2>
              </DCard>

              {selected.message && (
                <DCard title="メッセージ">
                  <p className="text-[#1a1410] text-sm">{selected.message}</p>
                </DCard>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-[#c9b8a4] text-sm bg-[#f7f3ee]">
          左のリストからお客様を選択してください
        </div>
      )}
    </div>
  );
}

function DCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#c9b8a4]/40 rounded-xl overflow-hidden">
      <div className="px-5 py-3 bg-[#ede7de] border-b border-[#c9b8a4]/40">
        <h3 className="text-xs font-semibold tracking-widest text-[#7c6455] uppercase">{title}</h3>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}
function DGrid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-6 gap-y-3">{children}</div>;
}
function DR({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-[#7c6455] tracking-wider">{label}</span>
      <p className="text-[#1a1410] font-medium text-sm mt-0.5">{value || "—"}</p>
    </div>
  );
}
