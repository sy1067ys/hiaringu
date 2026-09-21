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
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#5c6e7a] focus:ring-1 focus:ring-[#5c6e7a]/20 text-sm transition-all" />
  );
}
function Txt({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#5c6e7a] focus:ring-1 focus:ring-[#5c6e7a]/20 text-sm resize-none transition-all" />
  );
}
function FL({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold tracking-wider text-[#5c6e7a] uppercase mb-1.5">
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#5c6e7a] hover:bg-[#f7f3ee]"
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#5c6e7a] hover:bg-[#f7f3ee]"
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

const ACCENT = "#3a5c6a";

function Acc({ no, title, required, open, onToggle, children }: {
  no: string; title: string; required?: boolean; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-[#c9b8a4]/40 rounded-xl overflow-hidden">
      <button type="button" onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${open ? "text-[#f7f3ee]" : "bg-[#faf8f5] text-[#1a1410] hover:bg-[#ede7de]"}`}
        style={open ? { backgroundColor: ACCENT } : {}}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${open ? "bg-white/20 text-white/80" : "bg-[#c9b8a4]/30 text-[#5c6e7a]"}`}>{no}</span>
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

/* ─── Type & Default ─── */
export type PrBrief = {
  // Overview
  consultType: string[]; consultTypeOther: string;
  consultSummary: string; topPriority: string; decisionsStatus: string;
  // S01
  organizationName: string; projectName: string;
  prContact: string; finalApprover: string;
  officialUrl: string; startDate: string;
  background: string; currentReputation: string; desiredChange: string;
  // S02
  purpose: string[]; purposeOther: string;
  stakeholders: string[]; stakeholdersOther: string;
  topTarget: string;
  // S03
  newFacts: string; socialConnection: string;
  timeliness: string; thirdPartyInterest: string;
  // S04
  keyMessage: string; story: string;
  competitorDiff: string; avoidMisunderstanding: string; toughQa: string;
  // S05
  targetMedia: string[]; targetMediaOther: string;
  avoidMedia: string; existingContacts: string;
  // S06
  releaseDate: string; embargoDatetime: string;
  distributionScope: string; distributionService: string;
  inquiryContact: string; publicLanguage: string;
  requiredMaterials: string[]; requiredMaterialsOther: string;
  titleAndSummary: string; approvalFlow: string;
  // S07
  spokespersons: string;
  commentCandidates: string; interviewAvailability: string;
  mediaTraining: string; articleCheckCriteria: string;
  // S08
  eventFormat: string[]; eventFormatOther: string;
  eventDate: string; venue: string;
  expectedGuests: string; presenters: string;
  exhibitDemo: string; giveaways: string;
  programFlow: string; eventStaff: string;
  // S09
  ownedChannels: string[]; ownedChannelsOther: string;
  internalSharing: string; reuseAssets: string;
  // S10
  thirdParties: string[]; thirdPartiesOther: string;
  thirdPartyRole: string; thirdPartyCriteria: string;
  compensationConditions: string; researchRequest: string;
  // S11
  expectedRisks: string[]; expectedRisksOther: string;
  emergencyContact: string; initialResponder: string;
  legalApprover: string; publicationDecider: string;
  responseTimeTarget: string; monitoringMethod: string;
  criticismsAndConcerns: string; responsePolicy: string;
  confidentialItems: string;
  // S12
  kpiItems: string[]; kpiItemsOther: string;
  urgentReport: string; reportFreq: string;
  clippingPeriod: string; meetingFreq: string;
  nextActionReflection: string; managementReport: string;
  // S13
  totalBudget: string; monthlyBudget: string;
  distributionCost: string; kickoffDate: string;
  releaseTargetDate: string; estimateDeadline: string;
  scope: string[]; scopeOther: string;
  internalRole: string; budgetPriority: string; rightsConditions: string;
  // S14
  finalPurpose: string; finalTarget: string;
  mustConditions: string; outOfScope: string;
  mainKpi: string; risks: string;
};

export const EMPTY_PR_BRIEF: PrBrief = {
  consultType: [], consultTypeOther: "", consultSummary: "", topPriority: "", decisionsStatus: "",
  organizationName: "", projectName: "", prContact: "", finalApprover: "",
  officialUrl: "", startDate: "",
  background: "", currentReputation: "", desiredChange: "",
  purpose: [], purposeOther: "", stakeholders: [], stakeholdersOther: "", topTarget: "",
  newFacts: "", socialConnection: "", timeliness: "", thirdPartyInterest: "",
  keyMessage: "", story: "", competitorDiff: "", avoidMisunderstanding: "", toughQa: "",
  targetMedia: [], targetMediaOther: "", avoidMedia: "", existingContacts: "",
  releaseDate: "", embargoDatetime: "", distributionScope: "", distributionService: "",
  inquiryContact: "", publicLanguage: "",
  requiredMaterials: [], requiredMaterialsOther: "",
  titleAndSummary: "", approvalFlow: "",
  spokespersons: "", commentCandidates: "", interviewAvailability: "",
  mediaTraining: "", articleCheckCriteria: "",
  eventFormat: [], eventFormatOther: "",
  eventDate: "", venue: "", expectedGuests: "", presenters: "",
  exhibitDemo: "", giveaways: "", programFlow: "", eventStaff: "",
  ownedChannels: [], ownedChannelsOther: "", internalSharing: "", reuseAssets: "",
  thirdParties: [], thirdPartiesOther: "",
  thirdPartyRole: "", thirdPartyCriteria: "", compensationConditions: "", researchRequest: "",
  expectedRisks: [], expectedRisksOther: "",
  emergencyContact: "", initialResponder: "", legalApprover: "", publicationDecider: "",
  responseTimeTarget: "", monitoringMethod: "",
  criticismsAndConcerns: "", responsePolicy: "", confidentialItems: "",
  kpiItems: [], kpiItemsOther: "",
  urgentReport: "", reportFreq: "", clippingPeriod: "", meetingFreq: "",
  nextActionReflection: "", managementReport: "",
  totalBudget: "", monthlyBudget: "", distributionCost: "",
  kickoffDate: "", releaseTargetDate: "", estimateDeadline: "",
  scope: [], scopeOther: "", internalRole: "", budgetPriority: "", rightsConditions: "",
  finalPurpose: "", finalTarget: "", mustConditions: "", outOfScope: "", mainKpi: "", risks: "",
};

/* ─── Main Component ─── */
export default function PrBriefForm({ brief, onChange }: { brief: PrBrief; onChange: (b: PrBrief) => void }) {
  const [open, setOpen] = useState<string | null>("OV");
  const s = (key: keyof PrBrief) => (val: string) => onChange({ ...brief, [key]: val });
  const t = (key: keyof PrBrief, val: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], val) });
  const tog = (id: string) => setOpen((o) => o === id ? null : id);

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
        <div className="flex items-center gap-2 py-2 px-4 rounded-lg" style={{ backgroundColor: `${ACCENT}18` }}>
          <span className="text-lg">📣</span>
          <span className="font-semibold text-sm tracking-wide" style={{ color: ACCENT }}>PR企画 詳細ヒアリング</span>
        </div>
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
      </div>

      {/* Overview */}
      <Acc no="OV" title="案件の全体像" required open={open === "OV"} onToggle={() => tog("OV")}>
        <div><FL required>今回の相談内容</FL>
          <Checks cols={3}
            options={["コーポレートPR","商品・サービスPR","新規事業・発表","採用広報","地域・社会活動","イベントPR","メディア対応","危機管理広報","未定／相談したい"]}
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
      <Acc no="S01" title="基本情報・PR背景" required open={open === "S01"} onToggle={() => tog("S01")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>会社・団体名</FL><Inp value={brief.organizationName} onChange={s("organizationName")} placeholder="会社名または団体名" /></div>
          <div><FL>案件／発表名</FL><Inp value={brief.projectName} onChange={s("projectName")} placeholder="例：新製品発表、周年記念PR" /></div>
          <div><FL>広報窓口</FL><Inp value={brief.prContact} onChange={s("prContact")} placeholder="担当者名" /></div>
          <div><FL>最終決裁者</FL><Inp value={brief.finalApprover} onChange={s("finalApprover")} placeholder="承認権限者" /></div>
          <div><FL>公式サイト</FL><Inp value={brief.officialUrl} onChange={s("officialUrl")} placeholder="https://..." /></div>
          <div><FL>希望開始日</FL><Inp type="date" value={brief.startDate} onChange={s("startDate")} /></div>
        </div>
        <div><FL required>PRを行う背景・社会／事業上の課題</FL>
          <Txt value={brief.background} onChange={s("background")} placeholder="なぜ今PRが必要ですか？背景を教えてください" rows={3} /></div>
        <div><FL>現在の認知・評判・誤解</FL>
          <Txt value={brief.currentReputation} onChange={s("currentReputation")} placeholder="現状どのように見られていますか？課題はありますか？" rows={2} /></div>
        <div><FL required>PRで変えたい認識・行動</FL>
          <Txt value={brief.desiredChange} onChange={s("desiredChange")} placeholder="このPRで、誰に何を変えてほしいですか？" rows={2} /></div>
      </Acc>

      {/* S02 */}
      <Acc no="S02" title="目的・ステークホルダー" required open={open === "S02"} onToggle={() => tog("S02")}>
        <div><FL required>主な目的</FL>
          <Checks cols={3}
            options={["認知拡大","信頼形成","商品理解","業界での立場確立","採用","投資家・取引先","地域関係","政策・社会課題","風評改善","危機予防","イベント集客","指名検索増加"]}
            selected={brief.purpose} onToggle={(v) => t("purpose", v)} />
          <div className="mt-2"><Inp value={brief.purposeOther} onChange={s("purposeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>重要ステークホルダー</FL>
          <Checks cols={3}
            options={["顧客","見込み顧客","従業員","求職者","取引先","投資家","行政","地域住民","業界団体","専門家","メディア","インフルエンサー"]}
            selected={brief.stakeholders} onToggle={(v) => t("stakeholders", v)} />
          <div className="mt-2"><Inp value={brief.stakeholdersOther} onChange={s("stakeholdersOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>最優先対象とその理由</FL>
          <Txt value={brief.topTarget} onChange={s("topTarget")} placeholder="最も重要なステークホルダーと、その理由を教えてください" rows={2} /></div>
      </Acc>

      {/* S03 */}
      <Acc no="S03" title="PRテーマ・ニュース価値" required open={open === "S03"} onToggle={() => tog("S03")}>
        <div><FL required>発表する事実・新規性・初／唯一／最大など</FL>
          <Txt value={brief.newFacts} onChange={s("newFacts")} placeholder="メディアが注目する具体的な事実・数値・初となる実績" rows={3} /></div>
        <div><FL>社会課題・業界動向との接点</FL>
          <Txt value={brief.socialConnection} onChange={s("socialConnection")} placeholder="今の社会・業界のトレンドとどのように結びつきますか？" rows={2} /></div>
        <div><FL required>今このタイミングで伝える必然性</FL>
          <Txt value={brief.timeliness} onChange={s("timeliness")} placeholder="なぜ今なのか？タイミングの根拠を教えてください" rows={2} /></div>
        <div><FL>第三者が関心を持つデータ・人物・ストーリー</FL>
          <Txt value={brief.thirdPartyInterest} onChange={s("thirdPartyInterest")} placeholder="記者・読者が興味を持つ人物やデータ、エピソード" rows={2} /></div>
      </Acc>

      {/* S04 */}
      <Acc no="S04" title="キーメッセージ・ストーリー" required open={open === "S04"} onToggle={() => tog("S04")}>
        <div><FL required>一文で伝えたいキーメッセージ</FL>
          <Inp value={brief.keyMessage} onChange={s("keyMessage")} placeholder="例：〇〇業界初の△△で、□□を実現します" /></div>
        <div><FL required>背景→課題→取り組み→変化のストーリー</FL>
          <Txt value={brief.story} onChange={s("story")} placeholder="起承転結の流れで伝えたいストーリーをご記入ください" rows={4} /></div>
        <div><FL>競合・業界との違い</FL>
          <Txt value={brief.competitorDiff} onChange={s("competitorDiff")} placeholder="他社や業界平均と比較した優位性" rows={2} /></div>
        <div><FL required>誤解されたくない点・避けたい表現</FL>
          <Txt value={brief.avoidMisunderstanding} onChange={s("avoidMisunderstanding")} placeholder="絶対に使いたくない言葉や、誤解を招く表現" rows={2} /></div>
        <div><FL>想定される厳しい質問と回答方針</FL>
          <Txt value={brief.toughQa} onChange={s("toughQa")} placeholder="記者や批判者から来そうな厳しい質問と、その答え方の方針" rows={3} /></div>
      </Acc>

      {/* S05 */}
      <Acc no="S05" title="メディア・記者ターゲット" open={open === "S05"} onToggle={() => tog("S05")}>
        <div><FL>対象媒体</FL>
          <Checks cols={3}
            options={["新聞","テレビ","ラジオ","通信社","ビジネス誌","専門誌","Webメディア","地域メディア","業界紙","ポッドキャスト","海外メディア","オウンドメディア"]}
            selected={brief.targetMedia} onToggle={(v) => t("targetMedia", v)} />
          <div className="mt-2"><Inp value={brief.targetMediaOther} onChange={s("targetMediaOther")} placeholder="その他" /></div>
        </div>
        <div><FL>避けたい媒体・取材条件</FL>
          <Txt value={brief.avoidMedia} onChange={s("avoidMedia")} placeholder="掲載を避けたい媒体、NGな取材スタイル" rows={2} /></div>
        <div><FL>既存の記者リスト・掲載実績</FL>
          <Txt value={brief.existingContacts} onChange={s("existingContacts")} placeholder="過去に接触した記者名、掲載実績のある媒体" rows={2} /></div>
      </Acc>

      {/* S06 */}
      <Acc no="S06" title="プレスリリース・配信計画" required open={open === "S06"} onToggle={() => tog("S06")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>発表希望日</FL><Inp type="date" value={brief.releaseDate} onChange={s("releaseDate")} /></div>
          <div><FL>情報解禁日時</FL><Inp value={brief.embargoDatetime} onChange={s("embargoDatetime")} placeholder="例：2026/10/01 10:00、設定なし" /></div>
          <div><FL>問い合わせ窓口</FL><Inp value={brief.inquiryContact} onChange={s("inquiryContact")} placeholder="担当者名・連絡先" /></div>
          <div><FL>公開言語</FL><Inp value={brief.publicLanguage} onChange={s("publicLanguage")} placeholder="例：日本語、英語、日英" /></div>
        </div>
        <div><FL>配信範囲</FL>
          <Radios cols={3} options={["一斉配信","個別案内","自社サイトのみ"]}
            selected={brief.distributionScope} onSelect={s("distributionScope")} />
        </div>
        <div><FL>配信サービス</FL>
          <Inp value={brief.distributionService} onChange={s("distributionService")} placeholder="例：PR TIMES、@Press、自社発信のみ" /></div>
        <div><FL>必要物</FL>
          <Checks cols={3}
            options={["プレスリリース","ファクトシート","会社概要","役員略歴","製品資料","高解像度画像","ロゴ","動画","FAQ","調査データ","取材候補","サンプル"]}
            selected={brief.requiredMaterials} onToggle={(v) => t("requiredMaterials", v)} />
          <div className="mt-2"><Inp value={brief.requiredMaterialsOther} onChange={s("requiredMaterialsOther")} placeholder="その他" /></div>
        </div>
        <div><FL>タイトル案・要約・引用コメント案</FL>
          <Txt value={brief.titleAndSummary} onChange={s("titleAndSummary")} placeholder="リリースの見出し案、代表者コメント案など" rows={3} /></div>
        <div><FL required>配信前の承認者・校了日・修正回数</FL>
          <Txt value={brief.approvalFlow} onChange={s("approvalFlow")} placeholder="誰が、いつまでに承認し、修正は何回まで対応するか" rows={2} /></div>
      </Acc>

      {/* S07 */}
      <Acc no="S07" title="スポークスパーソン・取材対応" open={open === "S07"} onToggle={() => tog("S07")}>
        <div><FL>登壇・取材候補（氏名・役職・語れるテーマ・制約）</FL>
          <Txt value={brief.spokespersons} onChange={s("spokespersons")} placeholder="例：代表取締役 山田○○ / 経営戦略・新事業 / テレビNGなし" rows={3} /></div>
        <div><FL>代表者・開発者・顧客のコメント候補</FL>
          <Txt value={brief.commentCandidates} onChange={s("commentCandidates")} placeholder="引用できる発言例や、協力してもらえる顧客・関係者" rows={2} /></div>
        <div><FL>取材可能な日時・場所・オンライン対応</FL>
          <Txt value={brief.interviewAvailability} onChange={s("interviewAvailability")} placeholder="例：平日10〜17時、都内オフィスまたはZoom" rows={2} /></div>
        <div><FL>メディアトレーニング・想定問答の要否</FL>
          <Radios cols={3} options={["必要","不要","検討中"]} selected={brief.mediaTraining} onSelect={s("mediaTraining")} /></div>
        <div><FL>発言確認・記事校正を依頼する基準</FL>
          <Txt value={brief.articleCheckCriteria} onChange={s("articleCheckCriteria")} placeholder="どのような場合に、記者への確認・訂正依頼を行うか" rows={2} /></div>
      </Acc>

      {/* S08 */}
      <Acc no="S08" title="発表会・イベント・体験設計" open={open === "S08"} onToggle={() => tog("S08")}>
        <div><FL>実施形態</FL>
          <Checks cols={3}
            options={["記者発表会","商品発表会","体験会","内覧会","記者勉強会","個別取材","オンライン配信","展示会","地域イベント","実施しない"]}
            selected={brief.eventFormat} onToggle={(v) => t("eventFormat", v)} />
          <div className="mt-2"><Inp value={brief.eventFormatOther} onChange={s("eventFormatOther")} placeholder="その他" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>候補日・時間</FL><Inp value={brief.eventDate} onChange={s("eventDate")} placeholder="例：2026/10/15（水）14:00〜" /></div>
          <div><FL>会場・配信</FL><Inp value={brief.venue} onChange={s("venue")} placeholder="会場名 or 配信ツール" /></div>
          <div><FL>想定招待数</FL><Inp value={brief.expectedGuests} onChange={s("expectedGuests")} placeholder="例：記者20名" /></div>
          <div><FL>登壇者</FL><Inp value={brief.presenters} onChange={s("presenters")} placeholder="登壇予定の人物" /></div>
          <div><FL>展示・デモ</FL><Inp value={brief.exhibitDemo} onChange={s("exhibitDemo")} placeholder="展示物や体験デモの内容" /></div>
          <div><FL>サンプル・手土産</FL><Inp value={brief.giveaways} onChange={s("giveaways")} placeholder="配布物の内容" /></div>
        </div>
        <div><FL>当日の流れ・見せ場・撮影ポイント</FL>
          <Txt value={brief.programFlow} onChange={s("programFlow")} placeholder="プログラムの流れ、写真・映像撮影のハイライトポイント" rows={3} /></div>
        <div><FL>招待・出欠・受付・フォローの担当</FL>
          <Txt value={brief.eventStaff} onChange={s("eventStaff")} placeholder="当日運営の担当分け" rows={2} /></div>
      </Acc>

      {/* S09 */}
      <Acc no="S09" title="オウンド・SNS・社内連携" open={open === "S09"} onToggle={() => tog("S09")}>
        <div><FL>連携先</FL>
          <Checks cols={3}
            options={["コーポレートサイト","ブランドサイト","ニュースルーム","メール","営業資料","採用サイト","社内報","Instagram","X","LinkedIn","YouTube","広告"]}
            selected={brief.ownedChannels} onToggle={(v) => t("ownedChannels", v)} />
          <div className="mt-2"><Inp value={brief.ownedChannelsOther} onChange={s("ownedChannelsOther")} placeholder="その他" /></div>
        </div>
        <div><FL>社内に先に共有すべき情報・順番</FL>
          <Txt value={brief.internalSharing} onChange={s("internalSharing")} placeholder="誰に、いつ、どの情報を先行共有するか" rows={2} /></div>
        <div><FL>掲載後に再活用したい素材・営業活用</FL>
          <Txt value={brief.reuseAssets} onChange={s("reuseAssets")} placeholder="掲載記事のロゴ使用、営業資料への掲載など" rows={2} /></div>
      </Acc>

      {/* S10 */}
      <Acc no="S10" title="インフルエンサー・専門家・第三者" open={open === "S10"} onToggle={() => tog("S10")}>
        <div><FL>候補</FL>
          <Checks cols={3}
            options={["業界専門家","学識者","医師・有資格者","顧客","アンバサダー","インフルエンサー","地域関係者","業界団体","調査会社","共同開発先"]}
            selected={brief.thirdParties} onToggle={(v) => t("thirdParties", v)} />
          <div className="mt-2"><Inp value={brief.thirdPartiesOther} onChange={s("thirdPartiesOther")} placeholder="その他" /></div>
        </div>
        <div><FL>協力を依頼したい役割・発言・投稿</FL>
          <Txt value={brief.thirdPartyRole} onChange={s("thirdPartyRole")} placeholder="コメント寄稿、SNS投稿、共同登壇など" rows={2} /></div>
        <div><FL>選定基準・除外条件・利益相反</FL>
          <Txt value={brief.thirdPartyCriteria} onChange={s("thirdPartyCriteria")} placeholder="選ぶ基準と、避けるべき属性や関係性" rows={2} /></div>
        <div><FL required>謝礼・契約・広告表記・二次利用条件</FL>
          <Txt value={brief.compensationConditions} onChange={s("compensationConditions")} placeholder="報酬の形、PR表記の要否、投稿素材の再利用可否" rows={2} /></div>
        <div><FL>第三者データ・調査の実施希望</FL>
          <Txt value={brief.researchRequest} onChange={s("researchRequest")} placeholder="調査会社への委託、アンケート実施などの希望" rows={2} /></div>
      </Acc>

      {/* S11 */}
      <Acc no="S11" title="リスク・危機管理広報" required open={open === "S11"} onToggle={() => tog("S11")}>
        <div><FL>想定リスク</FL>
          <Checks cols={3}
            options={["製品不具合","事故・安全","顧客情報漏えい","従業員不祥事","差別・不適切表現","広告表示","取引先問題","SNS炎上","風評・誤情報","災害・供給停止"]}
            selected={brief.expectedRisks} onToggle={(v) => t("expectedRisks", v)} />
          <div className="mt-2"><Inp value={brief.expectedRisksOther} onChange={s("expectedRisksOther")} placeholder="その他" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>緊急連絡先</FL><Inp value={brief.emergencyContact} onChange={s("emergencyContact")} placeholder="緊急時の連絡先" /></div>
          <div><FL>初動責任者</FL><Inp value={brief.initialResponder} onChange={s("initialResponder")} placeholder="最初に動く担当者" /></div>
          <div><FL>法務・経営確認</FL><Inp value={brief.legalApprover} onChange={s("legalApprover")} placeholder="法務・経営の確認者" /></div>
          <div><FL>公開判断者</FL><Inp value={brief.publicationDecider} onChange={s("publicationDecider")} placeholder="声明公開を判断する人物" /></div>
          <div><FL>対応時間目標</FL><Inp value={brief.responseTimeTarget} onChange={s("responseTimeTarget")} placeholder="例：発生から2時間以内に初動" /></div>
          <div><FL>監視方法</FL><Inp value={brief.monitoringMethod} onChange={s("monitoringMethod")} placeholder="例：SNS監視ツール、クリッピングサービス" /></div>
        </div>
        <div><FL required>現時点で想定される批判・懸念・未公開事実</FL>
          <Txt value={brief.criticismsAndConcerns} onChange={s("criticismsAndConcerns")} placeholder="批判が来そうなポイント、まだ公開していない重要情報" rows={3} /></div>
        <div><FL>一次コメント、FAQ、謝罪・訂正の基本方針</FL>
          <Txt value={brief.responsePolicy} onChange={s("responsePolicy")} placeholder="炎上・誤報時の初期コメント方針と謝罪フロー" rows={2} /></div>
        <div><FL>守秘・インサイダー・個人情報・取材NG事項</FL>
          <Txt value={brief.confidentialItems} onChange={s("confidentialItems")} placeholder="絶対に公開してはならない情報・関係者名など" rows={2} /></div>
      </Acc>

      {/* S12 */}
      <Acc no="S12" title="効果測定・レポート" open={open === "S12"} onToggle={() => tog("S12")}>
        <div><FL>評価指標</FL>
          <Checks cols={3}
            options={["掲載件数","媒体の質","想定読者到達","メッセージ反映","論調・感情","シェア・反応","指名検索","サイト流入","問い合わせ","採用応募","被リンク","社内反応"]}
            selected={brief.kpiItems} onToggle={(v) => t("kpiItems", v)} />
          <div className="mt-2"><Inp value={brief.kpiItemsOther} onChange={s("kpiItemsOther")} placeholder="その他" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>速報</FL>
            <Radios cols={2} options={["必要","不要"]} selected={brief.urgentReport} onSelect={s("urgentReport")} /></div>
          <div><FL>レポート頻度</FL><Inp value={brief.reportFreq} onChange={s("reportFreq")} placeholder="例：週次 / 月次" /></div>
          <div><FL>クリッピング期間</FL><Inp value={brief.clippingPeriod} onChange={s("clippingPeriod")} placeholder="例：発表後3ヶ月" /></div>
          <div><FL>定例会</FL><Inp value={brief.meetingFreq} onChange={s("meetingFreq")} placeholder="例：月1回Zoom" /></div>
        </div>
        <div><FL>次回施策への反映</FL>
          <Txt value={brief.nextActionReflection} onChange={s("nextActionReflection")} placeholder="測定結果をどのように次のPR活動に活かすか" rows={2} /></div>
        <div><FL>経営・社内報告で重視する観点</FL>
          <Txt value={brief.managementReport} onChange={s("managementReport")} placeholder="経営層や社内向け報告で特に強調したい数値・成果" rows={2} /></div>
      </Acc>

      {/* S13 */}
      <Acc no="S13" title="予算・体制・スケジュール" required open={open === "S13"} onToggle={() => tog("S13")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>総予算（税別）</FL><Inp value={brief.totalBudget} onChange={s("totalBudget")} placeholder="例：500,000円" /></div>
          <div><FL>月額広報予算</FL><Inp value={brief.monthlyBudget} onChange={s("monthlyBudget")} placeholder="例：100,000円/月" /></div>
          <div><FL>配信・会場等実費</FL><Inp value={brief.distributionCost} onChange={s("distributionCost")} placeholder="配信費・会場費の概算" /></div>
          <div><FL>開始希望</FL><Inp type="date" value={brief.kickoffDate} onChange={s("kickoffDate")} /></div>
          <div><FL>発表日</FL><Inp type="date" value={brief.releaseTargetDate} onChange={s("releaseTargetDate")} /></div>
          <div><FL>見積期限</FL><Inp type="date" value={brief.estimateDeadline} onChange={s("estimateDeadline")} /></div>
        </div>
        <div><FL>依頼範囲</FL>
          <Checks cols={3}
            options={["PR戦略","企画","リリース作成","メディアリスト","記者アプローチ","取材調整","発表会","撮影・素材","SNS連携","危機管理","クリッピング","効果測定"]}
            selected={brief.scope} onToggle={(v) => t("scope", v)} />
          <div className="mt-2"><Inp value={brief.scopeOther} onChange={s("scopeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>社内体制・YOICHIに期待する役割</FL>
          <Txt value={brief.internalRole} onChange={s("internalRole")} placeholder="社内の担当者と、YOICHIに任せたい業務範囲" rows={2} /></div>
        <div><FL required>予算内で優先する対象・活動</FL>
          <Txt value={brief.budgetPriority} onChange={s("budgetPriority")} placeholder="予算が限られる場合に、最優先すべき活動" rows={2} /></div>
        <div><FL>成果物の権利・機密保持・実績掲載条件</FL>
          <Txt value={brief.rightsConditions} onChange={s("rightsConditions")} placeholder="制作物の著作権、守秘義務の範囲、実績掲載の可否" rows={2} /></div>
      </Acc>

      {/* S14 */}
      <Acc no="S14" title="PR方針まとめ・最終確認" required open={open === "S14"} onToggle={() => tog("S14")}>
        <div><FL required>今回の最優先目的</FL>
          <Txt value={brief.finalPurpose} onChange={s("finalPurpose")} placeholder="一言で：このPRで最も達成したいことは？" rows={2} /></div>
        <div><FL required>最優先ターゲット</FL>
          <Txt value={brief.finalTarget} onChange={s("finalTarget")} placeholder="最も届けたいのは誰ですか？" rows={2} /></div>
        <div><FL required>必須要件・絶対に外せない条件</FL>
          <Txt value={brief.mustConditions} onChange={s("mustConditions")} placeholder="この条件が満たされなければ進められないこと" rows={2} /></div>
        <div><FL>対象外・次期へ回す項目</FL>
          <Txt value={brief.outOfScope} onChange={s("outOfScope")} placeholder="今回はやらないこと、将来的に検討すること" rows={2} /></div>
        <div><FL>主要KPIと目標値</FL>
          <Txt value={brief.mainKpi} onChange={s("mainKpi")} placeholder="例：3ヶ月で掲載20件、主要ビジネス誌掲載3本" rows={2} /></div>
        <div><FL>最大のリスク・未決事項</FL>
          <Txt value={brief.risks} onChange={s("risks")} placeholder="現時点で懸念していること、未決定の重要事項" rows={3} /></div>
      </Acc>
    </div>
  );
}
