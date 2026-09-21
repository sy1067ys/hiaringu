import { useState } from "react";

/* ─── shared helpers ─── */
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
  const gc = cols === 3 ? "grid-cols-3" : cols === 4 ? "grid-cols-4" : "grid-cols-2";
  return (
    <div className={`grid gap-2 ${gc}`}>
      {options.map((o) => {
        const chk = selected.includes(o);
        return (
          <label key={o} className={`flex items-center gap-2.5 px-3 py-3 rounded-lg border cursor-pointer text-sm transition-all select-none ${
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7c6455] hover:bg-[#f7f3ee]"
          }`}>
            <input type="checkbox" checked={chk} onChange={() => onToggle(o)} className="sr-only" />
            <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${chk ? "bg-[#c9b8a4] border-[#c9b8a4]" : "bg-white border-[#c9b8a4]"}`}>
              {chk && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><polyline points="1 4.5 4 7.5 10 1" stroke="#3d2b1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
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
  const gc = cols === 4 ? "grid-cols-4" : cols === 2 ? "grid-cols-2" : "grid-cols-3";
  return (
    <div className={`grid gap-2 ${gc}`}>
      {options.map((o) => {
        const chk = selected === o;
        return (
          <label key={o} className={`flex items-center gap-2.5 px-3 py-3 rounded-lg border cursor-pointer text-sm transition-all select-none ${
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7c6455] hover:bg-[#f7f3ee]"
          }`}>
            <input type="radio" checked={chk} onChange={() => onSelect(chk ? "" : o)} className="sr-only" />
            <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${chk ? "border-[#c9b8a4]" : "bg-white border-[#c9b8a4]"}`}>
              {chk && <span className="w-2.5 h-2.5 rounded-full bg-[#c9b8a4] block" />}
            </span>
            <span className="leading-tight">{o}</span>
          </label>
        );
      })}
    </div>
  );
}
const ACCENT = "#5c4a7a";
function Acc({ no, title, required, open, onToggle, children }: {
  no: string; title: string; required?: boolean; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-[#c9b8a4]/40 rounded-xl overflow-hidden">
      <button type="button" onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${open ? "text-[#f7f3ee]" : "bg-[#faf8f5] text-[#1a1410] hover:bg-[#ede7de]"}`}
        style={open ? { backgroundColor: ACCENT } : {}}>
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

/* ─── 採算行テーブル ─── */
type CpaRow = { product: string; ltv: string; profit: string; cpa: string; roas: string };
function CpaTable({ rows, onChange }: {
  rows: CpaRow[];
  onChange: (rows: CpaRow[]) => void;
}) {
  const headers = ["商品／成果", "売上・LTV", "粗利", "目標CPA", "目標ROAS"];
  const keys = ["product", "ltv", "profit", "cpa", "roas"] as const;
  return (
    <div className="overflow-x-auto rounded-lg border border-[#c9b8a4]/40">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[#ede7de]">
            {headers.map((h) => <th key={h} className="px-3 py-2 text-left text-[#7c6455] font-semibold tracking-wide">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[#c9b8a4]/20">
              {keys.map((k) => (
                <td key={k} className="px-2 py-1">
                  <input value={row[k]} onChange={(e) => {
                    const next = rows.map((r, j) => j === i ? { ...r, [k]: e.target.value } : r);
                    onChange(next);
                  }} className="w-full bg-transparent text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none text-xs py-1 px-1 rounded focus:bg-white focus:ring-1 focus:ring-[#7c6455]/30 transition-all"
                    placeholder="—" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => onChange([...rows, { product: "", ltv: "", profit: "", cpa: "", roas: "" }])}
        className="w-full py-2 text-xs text-[#7c6455] hover:bg-[#ede7de] transition-colors border-t border-[#c9b8a4]/20">
        ＋ 行を追加
      </button>
    </div>
  );
}

/* ─── Type & Default ─── */
export type AdBrief = {
  // Overview
  consultType: string[]; consultTypeOther: string;
  consultSummary: string; topPriority: string; decisionsStatus: string;
  // S01
  campaignName: string; contactPerson: string; finalApprover: string;
  productUrl: string; startDate: string;
  background: string; pastResults: string; expectedRole: string;
  // S02
  adPurpose: string[]; adPurposeOther: string;
  topConversion: string; successCondition: string;
  // S03
  productOverview: string; strengths: string;
  exclusiveOffer: string; anxietyAndEvidence: string; proofPoints: string;
  // S04
  primaryTarget: string; targetConcerns: string;
  deliveryArea: string; ageGender: string; jobRole: string;
  interests: string; deviceTime: string;
  existingCustomers: string;
  excludeTargets: string; customerList: string;
  // S05
  candidateMedia: string[]; candidateMediaOther: string;
  funnelNotes: string; deliveryConditions: string;
  // S06
  targetKeywords: string; excludeKeywords: string;
  audience: string[]; audienceOther: string;
  // S07
  requiredAssets: string[]; requiredAssetsOther: string;
  mainMessage: string; brandTone: string;
  requiredNotation: string;
  // S08
  landingUrl: string; lpStatus: string; formStatus: string;
  phoneTracking: string; mobileOptimized: string; pageSpeed: string;
  lpContent: string; formFlow: string; lpIssues: string;
  // S09
  measureTools: string[]; measureToolsOther: string;
  accountOwner: string; billingEntity: string;
  adminAccess: string; cvSetup: string; cookieConsent: string;
  measureEvents: string; offlineTracking: string; reportSharing: string;
  // S10
  monthlyBudget: string; firstMonthBudget: string;
  productionCost: string; operationFee: string; budgetCap: string;
  budgetApprover: string;
  cpaRows: { product: string; ltv: string; profit: string; cpa: string; roas: string }[];
  budgetConditions: string; mediaLimits: string;
  // S11
  operationItems: string[]; operationItemsOther: string;
  reportFreq: string; meetingFreq: string; emergencyContact: string;
  approvalRequired: string; stopDecider: string;
  reportMetrics: string; autoOptimizeRange: string; stopCriteria: string;
  // S12
  legalAreas: string[]; legalAreasOther: string;
  legalContact: string; evidence: string;
  prohibitedPlacements: string; reviewFailResponse: string;
  // S13
  deliveryStart: string; deliveryEnd: string;
  busySeason: string; assetSubmit: string; approver: string; estimateDeadline: string;
  contractConditions: string; rightsConditions: string;
  // S14
  finalPurpose: string; finalTarget: string;
  mustConditions: string; outOfScope: string;
  mainKpi: string; risks: string;
};

const EMPTY_CPA_ROWS = [
  { product: "", ltv: "", profit: "", cpa: "", roas: "" },
  { product: "", ltv: "", profit: "", cpa: "", roas: "" },
];

export const EMPTY_AD_BRIEF: AdBrief = {
  consultType: [], consultTypeOther: "", consultSummary: "", topPriority: "", decisionsStatus: "",
  campaignName: "", contactPerson: "", finalApprover: "",
  productUrl: "", startDate: "",
  background: "", pastResults: "", expectedRole: "",
  adPurpose: [], adPurposeOther: "", topConversion: "", successCondition: "",
  productOverview: "", strengths: "", exclusiveOffer: "", anxietyAndEvidence: "", proofPoints: "",
  primaryTarget: "", targetConcerns: "",
  deliveryArea: "", ageGender: "", jobRole: "", interests: "", deviceTime: "",
  existingCustomers: "", excludeTargets: "", customerList: "",
  candidateMedia: [], candidateMediaOther: "", funnelNotes: "", deliveryConditions: "",
  targetKeywords: "", excludeKeywords: "", audience: [], audienceOther: "",
  requiredAssets: [], requiredAssetsOther: "", mainMessage: "", brandTone: "", requiredNotation: "",
  landingUrl: "", lpStatus: "", formStatus: "", phoneTracking: "", mobileOptimized: "", pageSpeed: "",
  lpContent: "", formFlow: "", lpIssues: "",
  measureTools: [], measureToolsOther: "",
  accountOwner: "", billingEntity: "", adminAccess: "", cvSetup: "", cookieConsent: "",
  measureEvents: "", offlineTracking: "", reportSharing: "",
  monthlyBudget: "", firstMonthBudget: "", productionCost: "", operationFee: "", budgetCap: "", budgetApprover: "",
  cpaRows: EMPTY_CPA_ROWS,
  budgetConditions: "", mediaLimits: "",
  operationItems: [], operationItemsOther: "",
  reportFreq: "", meetingFreq: "", emergencyContact: "", approvalRequired: "", stopDecider: "",
  reportMetrics: "", autoOptimizeRange: "", stopCriteria: "",
  legalAreas: [], legalAreasOther: "", legalContact: "", evidence: "",
  prohibitedPlacements: "", reviewFailResponse: "",
  deliveryStart: "", deliveryEnd: "", busySeason: "", assetSubmit: "", approver: "", estimateDeadline: "",
  contractConditions: "", rightsConditions: "",
  finalPurpose: "", finalTarget: "", mustConditions: "", outOfScope: "", mainKpi: "", risks: "",
};

/* ─── Main Component ─── */
export default function AdBriefForm({ brief, onChange }: { brief: AdBrief; onChange: (b: AdBrief) => void }) {
  const [open, setOpen] = useState<string | null>("OV");
  const s = (key: keyof AdBrief) => (val: string) => onChange({ ...brief, [key]: val });
  const t = (key: keyof AdBrief, val: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], val) });
  const tog = (id: string) => setOpen((o) => o === id ? null : id);

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
        <div className="flex items-center gap-2 py-2 px-4 rounded-lg" style={{ backgroundColor: `${ACCENT}18` }}>
          <span className="text-lg">▸</span>
          <span className="font-semibold text-sm tracking-wide" style={{ color: ACCENT }}>広告運用 詳細ヒアリング</span>
        </div>
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
      </div>

      {/* Overview */}
      <Acc no="OV" title="案件の全体像" required open={open === "OV"} onToggle={() => tog("OV")}>
        <div><FL required>今回の相談内容</FL>
          <Checks cols={3}
            options={["Web広告運用","SNS広告","検索広告","動画広告","ディスプレイ広告","交通・屋外広告","紙媒体広告","広告戦略・診断","未定／相談したい"]}
            selected={brief.consultType} onToggle={(v) => t("consultType", v)} />
          <div className="mt-2"><Inp value={brief.consultTypeOther} onChange={s("consultTypeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>今回の相談内容を一言で</FL>
          <Inp value={brief.consultSummary} onChange={s("consultSummary")} placeholder="簡潔に教えてください" /></div>
        <div><FL required>最優先で解決したいこと</FL>
          <Txt value={brief.topPriority} onChange={s("topPriority")} placeholder="最も解決したい課題" rows={2} /></div>
        <div><FL>現時点で決まっていること／決まっていないこと</FL>
          <Txt value={brief.decisionsStatus} onChange={s("decisionsStatus")} placeholder="確定済みの条件や未決事項をご記入ください" rows={2} /></div>
      </Acc>

      {/* S01 */}
      <Acc no="S01" title="基本情報・出稿背景" required open={open === "S01"} onToggle={() => tog("S01")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>案件／キャンペーン名</FL><Inp value={brief.campaignName} onChange={s("campaignName")} placeholder="例：春の新作キャンペーン" /></div>
          <div><FL>窓口担当者</FL><Inp value={brief.contactPerson} onChange={s("contactPerson")} placeholder="担当者名" /></div>
          <div><FL>最終決裁者</FL><Inp value={brief.finalApprover} onChange={s("finalApprover")} placeholder="決裁者名" /></div>
          <div><FL>出稿開始希望日</FL><Inp type="date" value={brief.startDate} onChange={s("startDate")} /></div>
        </div>
        <div><FL>対象商品URL</FL><Inp value={brief.productUrl} onChange={s("productUrl")} placeholder="https://..." /></div>
        <div><FL required>出稿を検討した背景・事業課題</FL>
          <Txt value={brief.background} onChange={s("background")} placeholder="なぜ今広告が必要ですか？" rows={3} /></div>
        <div><FL>過去の広告実績・現在の課題</FL>
          <Txt value={brief.pastResults} onChange={s("pastResults")} placeholder="過去の運用経験・結果・改善したい点" rows={2} /></div>
        <div><FL required>今回広告に期待する役割</FL>
          <Txt value={brief.expectedRole} onChange={s("expectedRole")} placeholder="広告でどんな結果を求めていますか？" rows={2} /></div>
      </Acc>

      {/* S02 */}
      <Acc no="S02" title="目的・コンバージョン" required open={open === "S02"} onToggle={() => tog("S02")}>
        <div><FL required>広告目的</FL>
          <Checks cols={3}
            options={["認知","動画視聴","サイト流入","問い合わせ","資料請求","予約","来店","EC購入","アプリDL","会員登録","採用応募","既存顧客再購入"]}
            selected={brief.adPurpose} onToggle={(v) => t("adPurpose", v)} />
          <div className="mt-2"><Inp value={brief.adPurposeOther} onChange={s("adPurposeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>最優先コンバージョンと価値</FL>
          <Txt value={brief.topConversion} onChange={s("topConversion")} placeholder="最も重要な成果地点と、その価値（売上・LTV等）" rows={2} /></div>
        <div><FL required>広告が成功したと判断する条件</FL>
          <Txt value={brief.successCondition} onChange={s("successCondition")} placeholder="例：月50件の問い合わせ、CPA3,000円以下" rows={2} /></div>
      </Acc>

      {/* S03 */}
      <Acc no="S03" title="商品・オファー・訴求" required open={open === "S03"} onToggle={() => tog("S03")}>
        <div><FL required>商品・サービス概要、価格、契約条件</FL>
          <Txt value={brief.productOverview} onChange={s("productOverview")} placeholder="提供内容・価格帯・申込条件をご記入ください" rows={3} /></div>
        <div><FL required>競合と比べた強み・選ばれる理由</FL>
          <Txt value={brief.strengths} onChange={s("strengths")} placeholder="他社にない優位性や実績" rows={2} /></div>
        <div><FL>広告限定オファー・特典・無料体験</FL>
          <Inp value={brief.exclusiveOffer} onChange={s("exclusiveOffer")} placeholder="例：初月無料、限定割引、無料サンプル" /></div>
        <div><FL>購入・申込を止める不安と解消材料</FL>
          <Txt value={brief.anxietyAndEvidence} onChange={s("anxietyAndEvidence")} placeholder="よくある不安と、それを解消できる根拠" rows={2} /></div>
        <div><FL>使用できる実績・数値・口コミ・受賞歴</FL>
          <Txt value={brief.proofPoints} onChange={s("proofPoints")} placeholder="信頼性を高める具体的な数字・証拠" rows={2} /></div>
      </Acc>

      {/* S04 */}
      <Acc no="S04" title="ターゲット・商圏" required open={open === "S04"} onToggle={() => tog("S04")}>
        <div><FL required>最優先ターゲット</FL>
          <Txt value={brief.primaryTarget} onChange={s("primaryTarget")} placeholder="年齢、性別、地域、職業、役職、会社規模など具体的に" rows={2} /></div>
        <div><FL required>顧客の悩み・欲求・検討タイミング</FL>
          <Txt value={brief.targetConcerns} onChange={s("targetConcerns")} placeholder="何に困っていて、いつ検討するか" rows={2} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>配信地域</FL><Inp value={brief.deliveryArea} onChange={s("deliveryArea")} placeholder="例：全国、東京23区、大阪市" /></div>
          <div><FL>年齢・性別</FL><Inp value={brief.ageGender} onChange={s("ageGender")} placeholder="例：25〜44歳、女性" /></div>
          <div><FL>職業・役職・会社規模</FL><Inp value={brief.jobRole} onChange={s("jobRole")} placeholder="例：経営者、BtoB 50名以上" /></div>
          <div><FL>興味関心</FL><Inp value={brief.interests} onChange={s("interests")} placeholder="例：美容、フィットネス、投資" /></div>
          <div><FL>デバイス・時間帯</FL><Inp value={brief.deviceTime} onChange={s("deviceTime")} placeholder="例：スマホ中心、平日夜" /></div>
          <div><FL>既存顧客の扱い</FL>
            <Radios cols={3} options={["含む","除外","別配信"]}
              selected={brief.existingCustomers} onSelect={s("existingCustomers")} /></div>
        </div>
        <div><FL>配信から除外したい顧客・地域・キーワード</FL>
          <Txt value={brief.excludeTargets} onChange={s("excludeTargets")} placeholder="除外条件をご記入ください" rows={2} /></div>
        <div><FL>保有する顧客リスト・類似配信への利用可否</FL>
          <Inp value={brief.customerList} onChange={s("customerList")} placeholder="例：メールリスト5,000件あり、利用可" /></div>
      </Acc>

      {/* S05 */}
      <Acc no="S05" title="媒体・配分・配信設計" required open={open === "S05"} onToggle={() => tog("S05")}>
        <div><FL required>候補媒体</FL>
          <Checks cols={3}
            options={["Google検索","Yahoo!検索","Googleディスプレイ","YouTube","Meta","Instagram","TikTok","LINE","X","LinkedIn","アフィリエイト","屋外・交通","新聞・雑誌","折込・DM","未定／相談したい"]}
            selected={brief.candidateMedia} onToggle={(v) => t("candidateMedia", v)} />
          <div className="mt-2"><Inp value={brief.candidateMediaOther} onChange={s("candidateMediaOther")} placeholder="その他" /></div>
        </div>
        <div><FL>認知→比較→申込の媒体・メッセージ分担</FL>
          <Txt value={brief.funnelNotes} onChange={s("funnelNotes")} placeholder="各フェーズでどの媒体を使い、何を訴求するか" rows={2} /></div>
        <div><FL>曜日・時間・季節・イベントによる配信条件</FL>
          <Txt value={brief.deliveryConditions} onChange={s("deliveryConditions")} placeholder="例：平日9〜18時のみ、年末商戦は予算増額" rows={2} /></div>
      </Acc>

      {/* S06 */}
      <Acc no="S06" title="検索語・オーディエンス" open={open === "S06"} onToggle={() => tog("S06")}>
        <div><FL>狙いたい検索キーワード・質問</FL>
          <Txt value={brief.targetKeywords} onChange={s("targetKeywords")} placeholder="例：東京 美容院 縮毛矯正、Web制作 格安" rows={2} /></div>
        <div><FL>除外キーワード・避けたい文脈</FL>
          <Txt value={brief.excludeKeywords} onChange={s("excludeKeywords")} placeholder="例：無料、DIY、競合社名" rows={2} /></div>
        <div><FL>オーディエンス設定</FL>
          <Checks cols={3}
            options={["サイト訪問者","カート離脱","動画視聴者","SNS反応者","顧客リスト","類似ユーザー","興味関心","地域・来店圏","法人属性","検索意図"]}
            selected={brief.audience} onToggle={(v) => t("audience", v)} />
          <div className="mt-2"><Inp value={brief.audienceOther} onChange={s("audienceOther")} placeholder="その他" /></div>
        </div>
      </Acc>

      {/* S07 */}
      <Acc no="S07" title="クリエイティブ・コピー" required open={open === "S07"} onToggle={() => tog("S07")}>
        <div><FL>必要素材</FL>
          <Checks cols={3}
            options={["静止画バナー","縦型動画","横型動画","カルーセル","検索広告文","レスポンシブ広告","LP","記事広告","チラシ・ポスター","音声広告"]}
            selected={brief.requiredAssets} onToggle={(v) => t("requiredAssets", v)} />
          <div className="mt-2"><Inp value={brief.requiredAssetsOther} onChange={s("requiredAssetsOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>最重要メッセージ・CTA</FL>
          <Txt value={brief.mainMessage} onChange={s("mainMessage")} placeholder="広告で最も伝えたいこと・ボタン文言" rows={2} /></div>
        <div><FL>ブランドトーン・デザインルール</FL>
          <Txt value={brief.brandTone} onChange={s("brandTone")} placeholder="カラーコード、フォント、イメージの禁止事項など" rows={2} /></div>
        <div><FL required>必須表記・注記・NG表現・競合名使用</FL>
          <Txt value={brief.requiredNotation} onChange={s("requiredNotation")} placeholder="薬機法・景表法対応の注記、使用禁止表現など" rows={2} /></div>
      </Acc>

      {/* S08 */}
      <Acc no="S08" title="LP・導線・フォーム" open={open === "S08"} onToggle={() => tog("S08")}>
        <div><FL>誘導先URL</FL><Inp value={brief.landingUrl} onChange={s("landingUrl")} placeholder="https://..." /></div>
        <div className="grid grid-cols-3 gap-3">
          <div><FL>LPの状態</FL>
            <Radios cols={1} options={["既存利用","改修","新規制作"]}
              selected={brief.lpStatus} onSelect={s("lpStatus")} /></div>
          <div><FL>フォーム／購入</FL>
            <Radios cols={1} options={["あり","改修必要","新規"]}
              selected={brief.formStatus} onSelect={s("formStatus")} /></div>
          <div>
            <div className="mb-3">
              <FL>電話・店舗計測</FL>
              <Radios cols={1} options={["必要","不要"]} selected={brief.phoneTracking} onSelect={s("phoneTracking")} />
            </div>
            <div>
              <FL>スマホ最適化</FL>
              <Radios cols={1} options={["済","未確認"]} selected={brief.mobileOptimized} onSelect={s("mobileOptimized")} />
            </div>
          </div>
        </div>
        <div><FL>LPで伝える順番・必須情報</FL>
          <Txt value={brief.lpContent} onChange={s("lpContent")} placeholder="例：課題共感→強み→実績→料金→FAQ→CTA" rows={2} /></div>
        <div><FL>入力項目・完了画面・自動返信・追客</FL>
          <Txt value={brief.formFlow} onChange={s("formFlow")} placeholder="フォームの設計と申込後フローをご記入ください" rows={2} /></div>
        <div><FL>現在の離脱箇所・改善したい点</FL>
          <Txt value={brief.lpIssues} onChange={s("lpIssues")} placeholder="アクセス解析等で判明している課題" rows={2} /></div>
      </Acc>

      {/* S09 */}
      <Acc no="S09" title="計測・アカウント・データ" required open={open === "S09"} onToggle={() => tog("S09")}>
        <div><FL>利用環境</FL>
          <Checks cols={3}
            options={["GA4","Google Tag Manager","Search Console","Google広告","Metaピクセル／CAPI","TikTok Pixel","LINE Tag","CRM","EC計測","電話計測"]}
            selected={brief.measureTools} onToggle={(v) => t("measureTools", v)} />
          <div className="mt-2"><Inp value={brief.measureToolsOther} onChange={s("measureToolsOther")} placeholder="その他" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>広告アカウント所有者</FL><Inp value={brief.accountOwner} onChange={s("accountOwner")} placeholder="会社名 or 個人名" /></div>
          <div><FL>請求主体</FL><Inp value={brief.billingEntity} onChange={s("billingEntity")} placeholder="請求先" /></div>
          <div><FL>管理権限付与</FL>
            <Radios cols={2} options={["可能","要確認"]} selected={brief.adminAccess} onSelect={s("adminAccess")} /></div>
          <div><FL>CV設定</FL>
            <Radios cols={2} options={["済","要設定"]} selected={brief.cvSetup} onSelect={s("cvSetup")} /></div>
        </div>
        <div><FL required>計測したいイベント・値・重複除外ルール</FL>
          <Txt value={brief.measureEvents} onChange={s("measureEvents")} placeholder="例：フォーム完了、電話タップ、購入完了、重複除外方法" rows={3} /></div>
        <div><FL>オフライン成約・来店・電話の計測方法</FL>
          <Txt value={brief.offlineTracking} onChange={s("offlineTracking")} placeholder="電話計測ツール、来店計測の方法など" rows={2} /></div>
        <div><FL>既存レポート・データ共有方法</FL>
          <Inp value={brief.reportSharing} onChange={s("reportSharing")} placeholder="例：Looker Studio、Google スプレッドシート" /></div>
      </Acc>

      {/* S10 */}
      <Acc no="S10" title="予算・入札・採算" required open={open === "S10"} onToggle={() => tog("S10")}>
        <div className="grid grid-cols-2 gap-3">
          {([
            ["monthlyBudget","月間広告費（税別）"],
            ["firstMonthBudget","初月テスト費"],
            ["productionCost","制作費"],
            ["operationFee","運用費"],
            ["budgetCap","予算上限"],
            ["budgetApprover","増額決裁者・条件"],
          ] as const).map(([k, l]) => (
            <div key={k}><FL>{l}</FL><Inp value={brief[k]} onChange={s(k)} placeholder="例：200,000円" /></div>
          ))}
        </div>
        <div>
          <FL>採算シミュレーション</FL>
          <CpaTable rows={brief.cpaRows} onChange={(rows) => onChange({ ...brief, cpaRows: rows })} />
        </div>
        <div><FL required>予算増減の条件・最低継続期間</FL>
          <Txt value={brief.budgetConditions} onChange={s("budgetConditions")} placeholder="例：CPA3,000円以下なら増額可、最低3ヶ月" rows={2} /></div>
        <div><FL>媒体別の上限・除外したい配分</FL>
          <Txt value={brief.mediaLimits} onChange={s("mediaLimits")} placeholder="例：TikTokは月5万円まで、Xは使わない" rows={2} /></div>
      </Acc>

      {/* S11 */}
      <Acc no="S11" title="運用・最適化・レポート" required open={open === "S11"} onToggle={() => tog("S11")}>
        <div><FL>運用内容</FL>
          <Checks cols={3}
            options={["入札調整","予算配分","キーワード管理","オーディエンス調整","クリエイティブ差替え","LP改善提案","不正クリック監視","ブランドセーフティ","週次確認","月次報告"]}
            selected={brief.operationItems} onToggle={(v) => t("operationItems", v)} />
          <div className="mt-2"><Inp value={brief.operationItemsOther} onChange={s("operationItemsOther")} placeholder="その他" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>レポート頻度</FL><Inp value={brief.reportFreq} onChange={s("reportFreq")} placeholder="例：週次 / 月次" /></div>
          <div><FL>定例頻度</FL><Inp value={brief.meetingFreq} onChange={s("meetingFreq")} placeholder="例：月1回Zoom" /></div>
          <div><FL>緊急連絡基準</FL><Inp value={brief.emergencyContact} onChange={s("emergencyContact")} placeholder="例：CPAが目標の2倍を超えたら即連絡" /></div>
          <div><FL>停止判断者</FL><Inp value={brief.stopDecider} onChange={s("stopDecider")} placeholder="誰が広告停止を判断しますか？" /></div>
        </div>
        <div><FL>変更前承認が必要な項目</FL>
          <Inp value={brief.approvalRequired} onChange={s("approvalRequired")} placeholder="例：クリエイティブ変更、予算10%以上の変更" /></div>
        <div><FL>必ず報告してほしい数字・切り口</FL>
          <Txt value={brief.reportMetrics} onChange={s("reportMetrics")} placeholder="例：媒体別CPA・ROAS、デバイス比率、時間帯別" rows={2} /></div>
        <div><FL>自動最適化・実験で許容できる範囲</FL>
          <Txt value={brief.autoOptimizeRange} onChange={s("autoOptimizeRange")} placeholder="例：A/Bテストは予告なし実施OK、予算±20%は自動調整可" rows={2} /></div>
        <div><FL required>成果悪化時の停止・見直し基準</FL>
          <Txt value={brief.stopCriteria} onChange={s("stopCriteria")} placeholder="例：2週連続でCPAが目標の150%超えたら即停止" rows={2} /></div>
      </Acc>

      {/* S12 */}
      <Acc no="S12" title="審査・法務・ブランド安全" required open={open === "S12"} onToggle={() => tog("S12")}>
        <div><FL>確認が必要な領域</FL>
          <Checks cols={3}
            options={["景品表示法","薬機法","医療・健康","金融・投資","不動産","酒類・たばこ","求人","子ども向け","比較広告","著作権・肖像権","個人情報","業界自主基準"]}
            selected={brief.legalAreas} onToggle={(v) => t("legalAreas", v)} />
          <div className="mt-2"><Inp value={brief.legalAreasOther} onChange={s("legalAreasOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>社内法務・監修の担当と必要日数</FL>
          <Inp value={brief.legalContact} onChange={s("legalContact")} placeholder="例：法務部 山田さん / 確認に5営業日" /></div>
        <div><FL required>エビデンス・注記・免責・必須表記</FL>
          <Txt value={brief.evidence} onChange={s("evidence")} placeholder="No.1根拠、調査機関名、免責文言、許認可番号など" rows={2} /></div>
        <div><FL>掲載禁止サイト・コンテンツ・ブランドセーフティ条件</FL>
          <Txt value={brief.prohibitedPlacements} onChange={s("prohibitedPlacements")} placeholder="例：アダルト・ギャンブル・政治系コンテンツには掲載しない" rows={2} /></div>
        <div><FL>審査落ち・アカウント停止時の対応</FL>
          <Txt value={brief.reviewFailResponse} onChange={s("reviewFailResponse")} placeholder="誰に連絡し、どう対処するか" rows={2} /></div>
      </Acc>

      {/* S13 */}
      <Acc no="S13" title="スケジュール・体制・契約" open={open === "S13"} onToggle={() => tog("S13")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>出稿開始</FL><Inp type="date" value={brief.deliveryStart} onChange={s("deliveryStart")} /></div>
          <div><FL>終了／見直し予定日</FL><Inp type="date" value={brief.deliveryEnd} onChange={s("deliveryEnd")} /></div>
          <div><FL>繁忙期・発売日</FL><Inp value={brief.busySeason} onChange={s("busySeason")} placeholder="例：年末12月、新商品発売4月" /></div>
          <div><FL>素材提出期限</FL><Inp value={brief.assetSubmit} onChange={s("assetSubmit")} placeholder="例：出稿5営業日前" /></div>
          <div><FL>承認者</FL><Inp value={brief.approver} onChange={s("approver")} placeholder="広告素材・設定の最終承認者" /></div>
          <div><FL>見積提出期限</FL><Inp type="date" value={brief.estimateDeadline} onChange={s("estimateDeadline")} /></div>
        </div>
        <div><FL>契約期間・解約・休止・広告費支払条件</FL>
          <Txt value={brief.contractConditions} onChange={s("contractConditions")} placeholder="最低契約期間、解約条件、支払タイミングなど" rows={2} /></div>
        <div><FL>制作物・広告アカウント・データの権利と引継ぎ条件</FL>
          <Txt value={brief.rightsConditions} onChange={s("rightsConditions")} placeholder="契約終了時のアカウント・データの取り扱い" rows={2} /></div>
      </Acc>

      {/* S14 */}
      <Acc no="S14" title="広告方針まとめ・最終確認" required open={open === "S14"} onToggle={() => tog("S14")}>
        <div><FL required>今回の最優先目的</FL>
          <Txt value={brief.finalPurpose} onChange={s("finalPurpose")} placeholder="一言で：何を最も達成したいですか？" rows={2} /></div>
        <div><FL required>最優先ターゲット</FL>
          <Txt value={brief.finalTarget} onChange={s("finalTarget")} placeholder="最も届けたいのは誰ですか？" rows={2} /></div>
        <div><FL required>必須要件・絶対に外せない条件</FL>
          <Txt value={brief.mustConditions} onChange={s("mustConditions")} placeholder="この条件が満たされなければ進められないこと" rows={2} /></div>
        <div><FL>対象外・次期へ回す項目</FL>
          <Txt value={brief.outOfScope} onChange={s("outOfScope")} placeholder="今回はやらないこと、将来的に検討すること" rows={2} /></div>
        <div><FL>主要KPIと目標値</FL>
          <Txt value={brief.mainKpi} onChange={s("mainKpi")} placeholder="例：月間CV数50件、CPA3,000円以下、ROAS300%" rows={2} /></div>
        <div><FL>最大のリスク・未決事項</FL>
          <Txt value={brief.risks} onChange={s("risks")} placeholder="現時点で懸念していること、未決定の重要事項" rows={3} /></div>
      </Acc>
    </div>
  );
}
