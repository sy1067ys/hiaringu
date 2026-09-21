import { useState } from "react";

/* ══════════════════════════════════════════
   共通ユーティリティ
══════════════════════════════════════════ */
function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function Inp({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7c6455] focus:ring-1 focus:ring-[#7c6455]/20 text-sm transition-all" />
  );
}
function Txt({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7c6455] focus:ring-1 focus:ring-[#7c6455]/20 text-sm resize-none transition-all" />
  );
}
function FL({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold tracking-wider text-[#7c6455] uppercase mb-1.5">
      {children}{required && <span className="text-[#d4a5a5] normal-case font-normal ml-1">必須</span>}
    </label>
  );
}

function Checks({ options, selected, onToggle, cols = 2 }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void; cols?: number;
}) {
  const gridClass = cols === 3 ? "grid-cols-3" : cols === 4 ? "grid-cols-4" : "grid-cols-2";
  return (
    <div className={`grid gap-2 ${gridClass}`}>
      {options.map((o) => {
        const checked = selected.includes(o);
        return (
          <label key={o} className={`flex items-center gap-2.5 px-3 py-3 rounded-lg border cursor-pointer text-sm transition-all select-none ${
            checked ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7c6455] hover:bg-[#f7f3ee]"
          }`}>
            <input type="checkbox" checked={checked} onChange={() => onToggle(o)} className="sr-only" />
            <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${
              checked ? "bg-[#c9b8a4] border-[#c9b8a4]" : "bg-white border-[#c9b8a4]"
            }`}>
              {checked && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><polyline points="1 4.5 4 7.5 10 1" stroke="#3d2b1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </span>
            <span className="leading-tight">{o}</span>
          </label>
        );
      })}
    </div>
  );
}

function Radios({ options, selected, onSelect, cols = 3 }: {
  options: string[]; selected: string; onSelect: (v: string) => void; cols?: number;
}) {
  const gridClass = cols === 4 ? "grid-cols-4" : cols === 2 ? "grid-cols-2" : "grid-cols-3";
  return (
    <div className={`grid gap-2 ${gridClass}`}>
      {options.map((o) => {
        const checked = selected === o;
        return (
          <label key={o} className={`flex items-center gap-2.5 px-3 py-3 rounded-lg border cursor-pointer text-sm transition-all select-none ${
            checked ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7c6455] hover:bg-[#f7f3ee]"
          }`}>
            <input type="radio" checked={checked} onChange={() => onSelect(checked ? "" : o)} className="sr-only" />
            <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
              checked ? "border-[#c9b8a4]" : "bg-white border-[#c9b8a4]"
            }`}>
              {checked && <span className="w-2.5 h-2.5 rounded-full bg-[#c9b8a4] block" />}
            </span>
            <span className="leading-tight">{o}</span>
          </label>
        );
      })}
    </div>
  );
}

function Acc({ no, title, accent, required, open, onToggle, children }: {
  no: string; title: string; accent: string; required?: boolean;
  open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-[#c9b8a4]/40 rounded-xl overflow-hidden">
      <button type="button" onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${
          open ? `text-[#f7f3ee]` : "bg-[#faf8f5] text-[#1a1410] hover:bg-[#ede7de]"
        }`}
        style={open ? { backgroundColor: accent } : {}}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${open ? "bg-white/20 text-white/80" : "bg-[#c9b8a4]/30 text-[#7c6455]"}`}>{no}</span>
          <span className="font-semibold text-sm">{title}</span>
          {required && <span className={`text-xs px-2 py-0.5 rounded-full ${open ? "bg-white/20 text-white/80" : "bg-[#d4a5a5]/20 text-[#b07070]"}`}>必須項目含む</span>}
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="px-5 py-5 bg-[#fefcfa] space-y-5">{children}</div>}
    </div>
  );
}

function SectionHeader({ color, icon, title }: { color: string; icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-lg mb-2" style={{ backgroundColor: `${color}18` }}>
      <span className="text-xl">{icon}</span>
      <span className="font-semibold text-sm tracking-wide" style={{ color }}>{title}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   バナー広告ヒアリング
══════════════════════════════════════════ */
export type BannerBrief = {
  // S1 概要
  campaignName: string;
  countNew: string; countResize: string; countAB: string;
  media: string[]; adType: string[];
  startDate: string; endDate: string; linkUrl: string;
  // S2 目的
  primaryGoal: string[]; goalOther: string;
  targetKpi: string; currentIssue: string; mainAppeal: string;
  // S3 ターゲット
  targetAge: string; targetGender: string; targetRegion: string; targetAttribute: string;
  targetConcerns: string; actionTrigger: string; existingCustomers: string; avoidTarget: string;
  // S4 コピー
  mainCopy: string; subCopy: string;
  cta: string[]; ctaOther: string;
  priceConditions: string; requiredNotation: string;
  // S5 デザイン
  designTone: string[]; useColor: string; avoidColor: string;
  referenceDesign: string; ngExpression: string; brandRules: string;
  // S6 仕様
  sizeW: string; sizeH: string;
  fileFormats: string[]; capacityLimit: string;
  dataDelivery: string; submissionSupport: string;
  // S7 素材・権利
  providedAssets: string[]; rightsConfirmed: string;
  legalChecker: string; confirmPerson: string; finalApprover: string; revisionFlow: string;
  // S8 スケジュール・予算
  firstDraftDate: string; finalDeliveryDate: string;
  budget: string; priority: string; notes: string;
};

export const EMPTY_BANNER_BRIEF: BannerBrief = {
  campaignName: "", countNew: "", countResize: "", countAB: "",
  media: [], adType: [],
  startDate: "", endDate: "", linkUrl: "",
  primaryGoal: [], goalOther: "",
  targetKpi: "", currentIssue: "", mainAppeal: "",
  targetAge: "", targetGender: "", targetRegion: "", targetAttribute: "",
  targetConcerns: "", actionTrigger: "", existingCustomers: "", avoidTarget: "",
  mainCopy: "", subCopy: "",
  cta: [], ctaOther: "",
  priceConditions: "", requiredNotation: "",
  designTone: [], useColor: "", avoidColor: "",
  referenceDesign: "", ngExpression: "", brandRules: "",
  sizeW: "", sizeH: "",
  fileFormats: [], capacityLimit: "",
  dataDelivery: "", submissionSupport: "",
  providedAssets: [], rightsConfirmed: "",
  legalChecker: "", confirmPerson: "", finalApprover: "", revisionFlow: "",
  firstDraftDate: "", finalDeliveryDate: "",
  budget: "", priority: "", notes: "",
};

const BANNER_ACCENT = "#6a5c3a";

export function BannerBriefForm({ brief, onChange }: { brief: BannerBrief; onChange: (b: BannerBrief) => void }) {
  const [open, setOpen] = useState<string | null>("B1");
  const s = (key: keyof BannerBrief) => (val: string) => onChange({ ...brief, [key]: val });
  const t = (key: keyof BannerBrief, val: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], val) });
  const tog = (id: string) => setOpen((o) => o === id ? null : id);

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
        <SectionHeader color={BANNER_ACCENT} icon="▸" title="バナー広告 詳細ヒアリング" />
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
      </div>

      <Acc no="B1" title="ご依頼の概要" accent={BANNER_ACCENT} required open={open === "B1"} onToggle={() => tog("B1")}>
        <div><FL required>案件・キャンペーン名</FL><Inp value={brief.campaignName} onChange={s("campaignName")} placeholder="例：春の新作キャンペーン" /></div>
        <div>
          <FL>制作点数</FL>
          <div className="grid grid-cols-3 gap-3">
            {([["countNew","新規デザイン"],["countResize","サイズ違い"],["countAB","A/B差分"]] as const).map(([k,l])=>(
              <div key={k}>
                <p className="text-xs text-[#7c6455] mb-1">{l}</p>
                <Inp value={brief[k]} onChange={s(k)} placeholder="0点" />
              </div>
            ))}
          </div>
        </div>
        <div><FL required>掲載媒体</FL>
          <Checks cols={3} options={["Instagram","Facebook","TikTok","X","LINE","Google広告","Yahoo!広告","ECサイト","自社Web"]}
            selected={brief.media} onToggle={(v)=>t("media",v)} /></div>
        <div><FL required>広告の種類</FL>
          <Checks cols={3} options={["静止画","GIF","短尺動画","カルーセル","未定・相談"]}
            selected={brief.adType} onToggle={(v)=>t("adType",v)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>掲載開始日</FL><Inp type="date" value={brief.startDate} onChange={s("startDate")} /></div>
          <div><FL>掲載終了日</FL><Inp type="date" value={brief.endDate} onChange={s("endDate")} /></div>
        </div>
        <div><FL>リンク先URL</FL><Inp value={brief.linkUrl} onChange={s("linkUrl")} placeholder="https://..." /></div>
      </Acc>

      <Acc no="B2" title="広告の目的・成果指標" accent={BANNER_ACCENT} required open={open === "B2"} onToggle={() => tog("B2")}>
        <div><FL required>最優先の目的</FL>
          <Checks cols={3} options={["認知拡大","Web流入","購入","予約","問い合わせ","来店","フォロワー獲得","採用","イベント集客"]}
            selected={brief.primaryGoal} onToggle={(v)=>t("primaryGoal",v)} />
          <div className="mt-2"><Inp value={brief.goalOther} onChange={s("goalOther")} placeholder="その他" /></div>
        </div>
        <div><FL>目標KPI</FL><Inp value={brief.targetKpi} onChange={s("targetKpi")} placeholder="例：クリック率2%、CV数50件/月、CPA3,000円" /></div>
        <div><FL>現状・課題</FL><Txt value={brief.currentIssue} onChange={s("currentIssue")} placeholder="現在困っていること・改善したいこと" /></div>
        <div><FL required>今回の訴求（最も伝えたいこと1つ）</FL><Inp value={brief.mainAppeal} onChange={s("mainAppeal")} placeholder="1つに絞って記入" /></div>
      </Acc>

      <Acc no="B3" title="ターゲット" accent={BANNER_ACCENT} required open={open === "B3"} onToggle={() => tog("B3")}>
        <div>
          <FL required>主な対象</FL>
          <div className="grid grid-cols-2 gap-3">
            <Inp value={brief.targetAge} onChange={s("targetAge")} placeholder="年齢層（例：30〜40代）" />
            <Inp value={brief.targetGender} onChange={s("targetGender")} placeholder="性別" />
            <Inp value={brief.targetRegion} onChange={s("targetRegion")} placeholder="地域" />
            <Inp value={brief.targetAttribute} onChange={s("targetAttribute")} placeholder="職業・属性" />
          </div>
        </div>
        <div><FL>悩み・欲求</FL><Txt value={brief.targetConcerns} onChange={s("targetConcerns")} placeholder="ターゲットが抱えている悩み・叶えたいこと" /></div>
        <div><FL>購入・行動のきっかけ</FL><Inp value={brief.actionTrigger} onChange={s("actionTrigger")} placeholder="何が決め手になるか（価格、品質、限定感、実績など）" /></div>
        <div><FL>既存顧客の特徴</FL><Inp value={brief.existingCustomers} onChange={s("existingCustomers")} placeholder="実際によく利用するお客様の傾向" /></div>
        <div><FL>避けたい対象</FL><Inp value={brief.avoidTarget} onChange={s("avoidTarget")} placeholder="今回の広告で主対象にしない層" /></div>
      </Acc>

      <Acc no="B4" title="掲載内容・コピー" accent={BANNER_ACCENT} open={open === "B4"} onToggle={() => tog("B4")}>
        <div><FL>メインコピー</FL><Inp value={brief.mainCopy} onChange={s("mainCopy")} placeholder="必ず入れたい見出し（未定の場合は「提案希望」）" /></div>
        <div><FL>サブコピー</FL><Inp value={brief.subCopy} onChange={s("subCopy")} placeholder="補足説明、特徴、実績、限定条件など" /></div>
        <div><FL>CTA（ボタン文言）</FL>
          <Checks cols={3} options={["詳しく見る","購入する","予約する","問い合わせる","応募する","フォローする"]}
            selected={brief.cta} onToggle={(v)=>t("cta",v)} />
          <div className="mt-2"><Inp value={brief.ctaOther} onChange={s("ctaOther")} placeholder="その他のCTA文言" /></div>
        </div>
        <div><FL>価格・日付・条件</FL><Inp value={brief.priceConditions} onChange={s("priceConditions")} placeholder="税込/税別、期間、対象、数量、注意事項" /></div>
        <div><FL>必須表記</FL><Inp value={brief.requiredNotation} onChange={s("requiredNotation")} placeholder="会社名、ロゴ、注釈、免責、No.1根拠、許認可表示など" /></div>
      </Acc>

      <Acc no="B5" title="デザインの方向性" accent={BANNER_ACCENT} open={open === "B5"} onToggle={() => tog("B5")}>
        <div><FL>希望イメージ</FL>
          <Checks cols={3} options={["高級感","シンプル","かわいい","上品","和風","信頼感","ポップ","ナチュラル","力強い","スタイリッシュ"]}
            selected={brief.designTone} onToggle={(v)=>t("designTone",v)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>使いたい色</FL><Inp value={brief.useColor} onChange={s("useColor")} placeholder="色名 / #カラーコード" /></div>
          <div><FL>避けたい色</FL><Inp value={brief.avoidColor} onChange={s("avoidColor")} placeholder="避けたい色" /></div>
        </div>
        <div><FL>参考デザイン</FL><Inp value={brief.referenceDesign} onChange={s("referenceDesign")} placeholder="URL・画像名・気に入った理由" /></div>
        <div><FL>NG表現</FL><Inp value={brief.ngExpression} onChange={s("ngExpression")} placeholder="避けたい雰囲気、フォント、写真、表現" /></div>
        <div><FL>ブランドルール</FL><Inp value={brief.brandRules} onChange={s("brandRules")} placeholder="指定フォント、カラーコード、余白、ロゴ使用規定の有無" /></div>
      </Acc>

      <Acc no="B6" title="サイズ・納品仕様" accent={BANNER_ACCENT} open={open === "B6"} onToggle={() => tog("B6")}>
        <div>
          <FL>サイズ（px）</FL>
          <div className="flex items-center gap-2">
            <Inp value={brief.sizeW} onChange={s("sizeW")} placeholder="横" />
            <span className="text-[#7c6455] font-bold">×</span>
            <Inp value={brief.sizeH} onChange={s("sizeH")} placeholder="縦" />
          </div>
        </div>
        <div><FL>ファイル形式</FL>
          <Checks cols={3} options={["JPG","PNG","GIF","MP4","WebP","その他"]}
            selected={brief.fileFormats} onToggle={(v)=>t("fileFormats",v)} /></div>
        <div><FL>容量・秒数制限</FL><Inp value={brief.capacityLimit} onChange={s("capacityLimit")} placeholder="例：最大500KB / 動画15秒以内" /></div>
        <div><FL>納品データ</FL>
          <Radios cols={2} options={["完成データのみ","編集可能データも希望（別料金の場合あり）"]}
            selected={brief.dataDelivery} onSelect={s("dataDelivery")} /></div>
        <div><FL>入稿対応</FL>
          <Radios cols={3} options={["データ納品のみ","入稿サポート希望","広告運用も相談"]}
            selected={brief.submissionSupport} onSelect={s("submissionSupport")} /></div>
      </Acc>

      <Acc no="B7" title="素材・権利・確認体制" accent={BANNER_ACCENT} open={open === "B7"} onToggle={() => tog("B7")}>
        <div><FL>支給素材</FL>
          <Checks cols={3} options={["ロゴ","写真","イラスト","商品画像","原稿","ブランドガイド","過去広告","なし・素材提案希望"]}
            selected={brief.providedAssets} onToggle={(v)=>t("providedAssets",v)} /></div>
        <div><FL>素材の権利（商用利用許諾確認）</FL>
          <Radios cols={2} options={["確認済み","未確認"]}
            selected={brief.rightsConfirmed} onSelect={s("rightsConfirmed")} /></div>
        <div><FL>広告表現の確認担当</FL><Inp value={brief.legalChecker} onChange={s("legalChecker")} placeholder="薬機法・景表法・業界ルール等の確認担当者" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>初稿確認者</FL><Inp value={brief.confirmPerson} onChange={s("confirmPerson")} placeholder="担当者名" /></div>
          <div><FL>最終決裁者</FL><Inp value={brief.finalApprover} onChange={s("finalApprover")} placeholder="決裁者名" /></div>
        </div>
        <div><FL>修正のまとめ方</FL>
          <Radios cols={3} options={["担当者が一本化","複数名から直接","その他"]}
            selected={brief.revisionFlow} onSelect={s("revisionFlow")} /></div>
      </Acc>

      <Acc no="B8" title="スケジュール・予算" accent={BANNER_ACCENT} required open={open === "B8"} onToggle={() => tog("B8")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>初稿希望日</FL><Inp type="date" value={brief.firstDraftDate} onChange={s("firstDraftDate")} /></div>
          <div><FL>最終納品希望日</FL><Inp type="date" value={brief.finalDeliveryDate} onChange={s("finalDeliveryDate")} /></div>
        </div>
        <div><FL>希望予算</FL>
          <Radios cols={3} options={["1万円未満","1〜3万円","3〜5万円","5万円以上","相談"]}
            selected={brief.budget} onSelect={s("budget")} /></div>
        <div><FL>優先順位</FL>
          <Radios cols={3} options={["納期","価格","品質","成果設計","修正の柔軟さ"]}
            selected={brief.priority} onSelect={s("priority")} /></div>
        <div><FL>補足・ご要望</FL><Txt value={brief.notes} onChange={s("notes")} placeholder="その他ご要望をご自由に" rows={3} /></div>
      </Acc>
    </div>
  );
}

/* ══════════════════════════════════════════
   ロゴデザインヒアリング
══════════════════════════════════════════ */
export type LogoBrief = {
  // S1 基本情報
  nameJa: string; nameEn: string; reading: string;
  logoTarget: string[];
  businessDescription: string;
  foundedDate: string; isRenewal: string;
  nameOrigin: string; tagline: string;
  // S2 背景・目的
  creationReason: string; existingLogoIssues: string; targetImpression: string;
  // S3 ブランドの核
  vision: string; valueProposition: string; coreValues: string;
  brandStory: string;
  keyword1: string; keyword2: string; keyword3: string;
  // S4 ターゲット・市場
  primaryCustomer: string; customerPain: string;
  pricePosition: string; competitors: string; differentiation: string;
  // S5 デザイン方向性
  logoType: string[];
  designImages: string[];
  motif: string;
  preferColor: string; avoidColor: string;
  fontStyle: string[];
  referenceLogos: string; avoidExpression: string;
  // S6 使用場所・展開
  usagePlaces: string[];
  smallSizeUse: string; backgrounds: string[]; compositions: string[]; formats: string[];
  futurePlans: string;
  // S7 権利・調査
  trademarkPlan: string; trademarkCheck: string; usageRegion: string;
  // S8 進行・予算
  firstDraftDate: string; finalDeliveryDate: string;
  budget: string; proposalCount: string;
  confirmPerson: string; finalApprover: string;
  selectionCriteria: string; notes: string;
};

export const EMPTY_LOGO_BRIEF: LogoBrief = {
  nameJa: "", nameEn: "", reading: "",
  logoTarget: [],
  businessDescription: "",
  foundedDate: "", isRenewal: "",
  nameOrigin: "", tagline: "",
  creationReason: "", existingLogoIssues: "", targetImpression: "",
  vision: "", valueProposition: "", coreValues: "",
  brandStory: "",
  keyword1: "", keyword2: "", keyword3: "",
  primaryCustomer: "", customerPain: "",
  pricePosition: "", competitors: "", differentiation: "",
  logoType: [],
  designImages: [],
  motif: "",
  preferColor: "", avoidColor: "",
  fontStyle: [],
  referenceLogos: "", avoidExpression: "",
  usagePlaces: [],
  smallSizeUse: "", backgrounds: [], compositions: [], formats: [],
  futurePlans: "",
  trademarkPlan: "", trademarkCheck: "", usageRegion: "",
  firstDraftDate: "", finalDeliveryDate: "",
  budget: "", proposalCount: "",
  confirmPerson: "", finalApprover: "",
  selectionCriteria: "", notes: "",
};

const LOGO_ACCENT = "#4a5c6e";

export function LogoBriefForm({ brief, onChange }: { brief: LogoBrief; onChange: (b: LogoBrief) => void }) {
  const [open, setOpen] = useState<string | null>("L1");
  const s = (key: keyof LogoBrief) => (val: string) => onChange({ ...brief, [key]: val });
  const t = (key: keyof LogoBrief, val: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], val) });
  const tog = (id: string) => setOpen((o) => o === id ? null : id);

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
        <SectionHeader color={LOGO_ACCENT} icon="◈" title="ロゴデザイン 詳細ヒアリング" />
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
      </div>

      <Acc no="L1" title="ブランドの基本情報" accent={LOGO_ACCENT} required open={open === "L1"} onToggle={() => tog("L1")}>
        <div>
          <FL required>正式名称</FL>
          <div className="space-y-2">
            <Inp value={brief.nameJa} onChange={s("nameJa")} placeholder="日本語表記" />
            <Inp value={brief.nameEn} onChange={s("nameEn")} placeholder="英字表記（ローマ字）" />
            <Inp value={brief.reading} onChange={s("reading")} placeholder="読み方（ふりがな）" />
          </div>
        </div>
        <div><FL required>ロゴの対象</FL>
          <Checks cols={3} options={["会社","店舗","商品","サービス","ブランド","イベント"]}
            selected={brief.logoTarget} onToggle={(v)=>t("logoTarget",v)} /></div>
        <div><FL required>事業内容</FL><Txt value={brief.businessDescription} onChange={s("businessDescription")} placeholder="提供している商品・サービスをご記入ください" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>創業・開始時期</FL><Inp value={brief.foundedDate} onChange={s("foundedDate")} placeholder="例：2020年4月" /></div>
          <div><FL>新規 / リニューアル</FL>
            <Radios cols={2} options={["新規立上げ","リニューアル"]}
              selected={brief.isRenewal} onSelect={s("isRenewal")} /></div>
        </div>
        <div><FL>名称の由来</FL><Txt value={brief.nameOrigin} onChange={s("nameOrigin")} placeholder="込めた意味・エピソードをご記入ください" rows={2} /></div>
        <div><FL>タグライン / キャッチコピー</FL><Inp value={brief.tagline} onChange={s("tagline")} placeholder="なければ「提案希望」" /></div>
      </Acc>

      <Acc no="L2" title="ロゴ制作の背景" accent={LOGO_ACCENT} required open={open === "L2"} onToggle={() => tog("L2")}>
        <div><FL required>制作・変更の理由</FL><Txt value={brief.creationReason} onChange={s("creationReason")} placeholder="なぜ今ロゴが必要ですか？" /></div>
        <div><FL>現行ロゴの課題</FL><Txt value={brief.existingLogoIssues} onChange={s("existingLogoIssues")} placeholder="残したい点・変えたい点" rows={2} /></div>
        <div><FL required>達成したい印象</FL><Txt value={brief.targetImpression} onChange={s("targetImpression")} placeholder="ロゴを見た人にどう感じてほしいですか？" rows={2} /></div>
      </Acc>

      <Acc no="L3" title="ブランドの核" accent={LOGO_ACCENT} required open={open === "L3"} onToggle={() => tog("L3")}>
        <div><FL required>理念・ビジョン</FL><Txt value={brief.vision} onChange={s("vision")} placeholder="この事業で実現したい未来" rows={2} /></div>
        <div><FL required>提供価値</FL><Txt value={brief.valueProposition} onChange={s("valueProposition")} placeholder="お客様に約束する価値・選ばれる理由" rows={2} /></div>
        <div><FL>大切にする価値観</FL><Inp value={brief.coreValues} onChange={s("coreValues")} placeholder="例：誠実、挑戦、上質、親しみ、革新、地域性" /></div>
        <div><FL>ブランドストーリー</FL><Txt value={brief.brandStory} onChange={s("brandStory")} placeholder="立ち上げの経緯、原体験、特別な想い" rows={3} /></div>
        <div>
          <FL>ブランドを表す3つのキーワード</FL>
          <div className="grid grid-cols-3 gap-2">
            <Inp value={brief.keyword1} onChange={s("keyword1")} placeholder="キーワード①" />
            <Inp value={brief.keyword2} onChange={s("keyword2")} placeholder="キーワード②" />
            <Inp value={brief.keyword3} onChange={s("keyword3")} placeholder="キーワード③" />
          </div>
        </div>
      </Acc>

      <Acc no="L4" title="ターゲット・市場での立ち位置" accent={LOGO_ACCENT} open={open === "L4"} onToggle={() => tog("L4")}>
        <div><FL>主な顧客</FL><Inp value={brief.primaryCustomer} onChange={s("primaryCustomer")} placeholder="年齢、性別、地域、属性、価値観" /></div>
        <div><FL>顧客の悩み</FL><Inp value={brief.customerPain} onChange={s("customerPain")} placeholder="どんな課題を解決しますか？" /></div>
        <div><FL>価格帯・ポジション</FL>
          <Radios cols={4} options={["手頃","中価格","プレミアム","ラグジュアリー"]}
            selected={brief.pricePosition} onSelect={s("pricePosition")} /></div>
        <div><FL>競合・比較対象</FL><Inp value={brief.competitors} onChange={s("competitors")} placeholder="企業・ブランド名 / URL" /></div>
        <div><FL>差別化ポイント</FL><Inp value={brief.differentiation} onChange={s("differentiation")} placeholder="競合にはない強み" /></div>
      </Acc>

      <Acc no="L5" title="デザインの方向性" accent={LOGO_ACCENT} required open={open === "L5"} onToggle={() => tog("L5")}>
        <div><FL>ロゴのタイプ</FL>
          <Checks cols={3} options={["シンボル＋文字","文字のみ","頭文字","エンブレム","キャラクター","おまかせ・相談"]}
            selected={brief.logoType} onToggle={(v)=>t("logoType",v)} /></div>
        <div><FL>希望イメージ</FL>
          <Checks cols={3} options={["高級感","シンプル","上品","和風","かわいい","信頼感","先進的","力強い","親しみ","ミニマル"]}
            selected={brief.designImages} onToggle={(v)=>t("designImages",v)} /></div>
        <div><FL>形・モチーフ</FL><Inp value={brief.motif} onChange={s("motif")} placeholder="入れたい象徴、図形、動植物、地域要素など" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>希望色・カラーコード</FL><Inp value={brief.preferColor} onChange={s("preferColor")} placeholder="例：ネイビー / #1a2a4a" /></div>
          <div><FL>避けたい色</FL><Inp value={brief.avoidColor} onChange={s("avoidColor")} placeholder="NGカラー" /></div>
        </div>
        <div><FL>書体</FL>
          <Checks cols={3} options={["明朝系","ゴシック系","筆文字","セリフ体","サンセリフ体","手書き","おまかせ"]}
            selected={brief.fontStyle} onToggle={(v)=>t("fontStyle",v)} /></div>
        <div><FL>参考ロゴ</FL><Txt value={brief.referenceLogos} onChange={s("referenceLogos")} placeholder="ブランド名 / URL / 好きな理由" rows={2} /></div>
        <div><FL>避けたい表現</FL><Inp value={brief.avoidExpression} onChange={s("avoidExpression")} placeholder="似せたくない競合、NGモチーフ、NGテイスト" /></div>
      </Acc>

      <Acc no="L6" title="使用場所・展開" accent={LOGO_ACCENT} open={open === "L6"} onToggle={() => tog("L6")}>
        <div><FL>主な使用場所</FL>
          <Checks cols={3} options={["Web","SNS","名刺","看板","店舗","商品","パッケージ","ユニフォーム","車両","印刷物","動画"]}
            selected={brief.usagePlaces} onToggle={(v)=>t("usagePlaces",v)} /></div>
        <div><FL>最小使用サイズ（SNSアイコン・商品タグ等）</FL>
          <Radios cols={2} options={["あり","なし"]}
            selected={brief.smallSizeUse} onSelect={s("smallSizeUse")} /></div>
        <div><FL>背景色</FL>
          <Checks cols={3} options={["白","黒","写真上","複数色","透明","未定"]}
            selected={brief.backgrounds} onToggle={(v)=>t("backgrounds",v)} /></div>
        <div><FL>必要な組み方</FL>
          <Checks cols={3} options={["横組み","縦組み","シンボル単体","文字単体","英字版"]}
            selected={brief.compositions} onToggle={(v)=>t("compositions",v)} /></div>
        <div><FL>必要な納品形式</FL>
          <Checks cols={3} options={["AI","SVG","PDF","PNG（透過）","JPG","EPS"]}
            selected={brief.formats} onToggle={(v)=>t("formats",v)} /></div>
        <div><FL>将来の展開</FL><Inp value={brief.futurePlans} onChange={s("futurePlans")} placeholder="新事業、姉妹ブランド、海外展開、店舗展開など" /></div>
      </Acc>

      <Acc no="L7" title="権利・調査" accent={LOGO_ACCENT} open={open === "L7"} onToggle={() => tog("L7")}>
        <div><FL>商標登録の予定</FL>
          <Radios cols={3} options={["あり","なし","未定・相談"]}
            selected={brief.trademarkPlan} onSelect={s("trademarkPlan")} />
          <p className="text-xs text-[#7c6455] mt-2 leading-relaxed bg-[#f7f3ee] rounded px-3 py-2">
            ※ロゴ制作は商標登録の可否を保証するものではありません。登録予定がある場合は、採用前に弁理士等へ調査をご依頼ください。
          </p>
        </div>
        <div><FL>類似商標の確認</FL>
          <Radios cols={3} options={["自社で確認済み","専門家へ依頼予定","未確認"]}
            selected={brief.trademarkCheck} onSelect={s("trademarkCheck")} /></div>
        <div><FL>使用地域</FL>
          <Radios cols={3} options={["日本国内","海外","全世界"]}
            selected={brief.usageRegion} onSelect={s("usageRegion")} /></div>
      </Acc>

      <Acc no="L8" title="進行・決裁・予算" accent={LOGO_ACCENT} required open={open === "L8"} onToggle={() => tog("L8")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>初稿希望日</FL><Inp type="date" value={brief.firstDraftDate} onChange={s("firstDraftDate")} /></div>
          <div><FL>最終納品希望日</FL><Inp type="date" value={brief.finalDeliveryDate} onChange={s("finalDeliveryDate")} /></div>
        </div>
        <div><FL>希望予算</FL>
          <Radios cols={3} options={["6〜10万円","10〜20万円","20〜30万円","30万円以上","相談"]}
            selected={brief.budget} onSelect={s("budget")} /></div>
        <div><FL>提案希望数</FL>
          <Radios cols={4} options={["2案","3案","4案以上","相談"]}
            selected={brief.proposalCount} onSelect={s("proposalCount")} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>担当者</FL><Inp value={brief.confirmPerson} onChange={s("confirmPerson")} placeholder="確認担当者名" /></div>
          <div><FL>最終決裁者</FL><Inp value={brief.finalApprover} onChange={s("finalApprover")} placeholder="決裁者名" /></div>
        </div>
        <div><FL>採用案の判断基準</FL><Inp value={brief.selectionCriteria} onChange={s("selectionCriteria")} placeholder="何を最優先に採用案を決めますか？" /></div>
        <div><FL>補足・ご要望</FL><Txt value={brief.notes} onChange={s("notes")} placeholder="その他ご要望をご自由に" rows={3} /></div>
      </Acc>
    </div>
  );
}
