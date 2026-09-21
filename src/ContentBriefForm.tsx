import { useState } from "react";

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}
function Inp({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#4a6e5c] focus:ring-1 focus:ring-[#4a6e5c]/20 text-sm transition-all" />
  );
}
function Txt({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#4a6e5c] focus:ring-1 focus:ring-[#4a6e5c]/20 text-sm resize-none transition-all" />
  );
}
function FL({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold tracking-wider text-[#4a6e5c] uppercase mb-1.5">
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#4a6e5c] hover:bg-[#f7f3ee]"
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#4a6e5c] hover:bg-[#f7f3ee]"
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

const ACCENT = "#4a6e5c";

function Acc({ no, title, required, open, onToggle, children }: {
  no: string; title: string; required?: boolean; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-[#c9b8a4]/40 rounded-xl overflow-hidden">
      <button type="button" onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${open ? "text-[#f7f3ee]" : "bg-[#faf8f5] text-[#1a1410] hover:bg-[#ede7de]"}`}
        style={open ? { backgroundColor: ACCENT } : {}}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${open ? "bg-white/20 text-white/80" : "bg-[#c9b8a4]/30 text-[#4a6e5c]"}`}>{no}</span>
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

/* ─── Type ─── */
export type ContentBrief = {
  consultType: string[]; consultTypeOther: string;
  consultSummary: string; topPriority: string; decisionsStatus: string;
  // S01
  companyBrand: string; projectName: string;
  contactPerson: string; finalApprover: string;
  publishUrl: string; firstPublishDate: string;
  background: string; existingIssues: string; expectedOutcome: string;
  // S02
  purpose: string[]; purposeOther: string;
  topPurpose: string; cta: string;
  // S03
  primaryReader: string; readerContext: string;
  searchQueries: string; readerMisconceptions: string; desiredUnderstanding: string;
  // S04
  contentItems: string[]; contentItemsOther: string;
  specs: string;
  updateFrequency: string; plannedPeriod: string;
  cmsEntry: string; imageSelection: string; diagramCreation: string;
  // S05
  editorialPolicy: string; uniquePerspective: string;
  offLimitTopics: string; seasonalEvents: string;
  // S06
  tone: string[]; toneOther: string;
  brandVoice: string; notationRules: string; avoidExpressions: string;
  referenceContent: string;
  // S07
  mainTheme: string; priorityKeywords: string;
  targetArea: string; competitorSites: string;
  searchConsole: string; existingArticleCleanup: string;
  linkingPolicy: string; rewriteTargets: string; seoValue: string;
  // S08
  sources: string[]; sourcesOther: string;
  interviewCandidates: string;
  providedMaterials: string; quotableData: string; recordingConditions: string;
  // S09
  reviewDays: string; revisionCount: string;
  commentMethod: string; finalApproverName: string;
  urgentPublish: string; conflictResolution: string; delayPolicy: string;
  // S10
  legalAreas: string[]; legalAreasOther: string;
  supervisorInfo: string; citationPolicy: string;
  requiredDisclaimer: string; aiPolicy: string;
  // S11
  requiredAssets: string[]; requiredAssetsOther: string;
  assetNotes: string; secondaryUseConditions: string;
  // S12
  distributionChannels: string[]; distributionChannelsOther: string;
  publishPlan: string; derivedContent: string;
  localizationNeeds: string; updateResponsibility: string;
  // S13
  productionBudget: string; monthlyBudget: string;
  interviewCost: string; firstPublish: string;
  contractPeriod: string; estimateDeadline: string;
  scope: string[]; scopeOther: string;
  budgetPriority: string; copyrightConditions: string; revisionCancelPolicy: string;
  // S14
  finalPurpose: string; finalTarget: string;
  mustConditions: string; outOfScope: string;
  mainKpi: string; risks: string;
};

export const EMPTY_CONTENT_BRIEF: ContentBrief = {
  consultType: [], consultTypeOther: "", consultSummary: "", topPriority: "", decisionsStatus: "",
  companyBrand: "", projectName: "", contactPerson: "", finalApprover: "",
  publishUrl: "", firstPublishDate: "",
  background: "", existingIssues: "", expectedOutcome: "",
  purpose: [], purposeOther: "", topPurpose: "", cta: "",
  primaryReader: "", readerContext: "", searchQueries: "",
  readerMisconceptions: "", desiredUnderstanding: "",
  contentItems: [], contentItemsOther: "", specs: "",
  updateFrequency: "", plannedPeriod: "",
  cmsEntry: "", imageSelection: "", diagramCreation: "",
  editorialPolicy: "", uniquePerspective: "", offLimitTopics: "", seasonalEvents: "",
  tone: [], toneOther: "", brandVoice: "", notationRules: "", avoidExpressions: "",
  referenceContent: "",
  mainTheme: "", priorityKeywords: "", targetArea: "", competitorSites: "",
  searchConsole: "", existingArticleCleanup: "",
  linkingPolicy: "", rewriteTargets: "", seoValue: "",
  sources: [], sourcesOther: "", interviewCandidates: "",
  providedMaterials: "", quotableData: "", recordingConditions: "",
  reviewDays: "", revisionCount: "", commentMethod: "", finalApproverName: "",
  urgentPublish: "", conflictResolution: "", delayPolicy: "",
  legalAreas: [], legalAreasOther: "", supervisorInfo: "", citationPolicy: "",
  requiredDisclaimer: "", aiPolicy: "",
  requiredAssets: [], requiredAssetsOther: "", assetNotes: "", secondaryUseConditions: "",
  distributionChannels: [], distributionChannelsOther: "",
  publishPlan: "", derivedContent: "", localizationNeeds: "", updateResponsibility: "",
  productionBudget: "", monthlyBudget: "", interviewCost: "",
  firstPublish: "", contractPeriod: "", estimateDeadline: "",
  scope: [], scopeOther: "",
  budgetPriority: "", copyrightConditions: "", revisionCancelPolicy: "",
  finalPurpose: "", finalTarget: "", mustConditions: "", outOfScope: "", mainKpi: "", risks: "",
};

/* ─── Main Component ─── */
export default function ContentBriefForm({ brief, onChange }: { brief: ContentBrief; onChange: (b: ContentBrief) => void }) {
  const [open, setOpen] = useState<string | null>("OV");
  const s = (key: keyof ContentBrief) => (val: string) => onChange({ ...brief, [key]: val });
  const t = (key: keyof ContentBrief, val: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], val) });
  const tog = (id: string) => setOpen((o) => o === id ? null : id);

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
        <div className="flex items-center gap-2 py-2 px-4 rounded-lg" style={{ backgroundColor: `${ACCENT}18` }}>
          <span className="text-lg">✍</span>
          <span className="font-semibold text-sm tracking-wide" style={{ color: ACCENT }}>コンテンツ制作 詳細ヒアリング</span>
        </div>
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
      </div>

      {/* Overview */}
      <Acc no="OV" title="案件の全体像" required open={open === "OV"} onToggle={() => tog("OV")}>
        <div><FL required>今回の相談内容</FL>
          <Checks cols={3}
            options={["Web記事","SEO記事","インタビュー","導入事例","LP・サイト原稿","ホワイトペーパー","メール・メルマガ","SNS・動画台本","未定／相談したい"]}
            selected={brief.consultType} onToggle={(v) => t("consultType", v)} />
          <div className="mt-2"><Inp value={brief.consultTypeOther} onChange={s("consultTypeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>今回の相談内容を一言で</FL>
          <Inp value={brief.consultSummary} onChange={s("consultSummary")} placeholder="簡潔に教えてください" /></div>
        <div><FL required>最優先で解決したいこと</FL>
          <Txt value={brief.topPriority} onChange={s("topPriority")} placeholder="最も解決したい課題" rows={2} /></div>
        <div><FL>現時点で決まっていること／決まっていないこと</FL>
          <Txt value={brief.decisionsStatus} onChange={s("decisionsStatus")} placeholder="確定済みの条件や未決事項" rows={2} /></div>
      </Acc>

      {/* S01 */}
      <Acc no="S01" title="基本情報・制作背景" required open={open === "S01"} onToggle={() => tog("S01")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>会社・ブランド名</FL><Inp value={brief.companyBrand} onChange={s("companyBrand")} placeholder="会社名またはブランド名" /></div>
          <div><FL>案件名</FL><Inp value={brief.projectName} onChange={s("projectName")} placeholder="例：採用オウンドメディア立ち上げ" /></div>
          <div><FL>窓口担当者</FL><Inp value={brief.contactPerson} onChange={s("contactPerson")} placeholder="担当者名" /></div>
          <div><FL>最終決裁者</FL><Inp value={brief.finalApprover} onChange={s("finalApprover")} placeholder="承認権限者" /></div>
          <div><FL>掲載先URL</FL><Inp value={brief.publishUrl} onChange={s("publishUrl")} placeholder="https://（なければ空白）" /></div>
          <div><FL>初回公開希望日</FL><Inp type="date" value={brief.firstPublishDate} onChange={s("firstPublishDate")} /></div>
        </div>
        <div><FL required>コンテンツ制作を行う背景・課題</FL>
          <Txt value={brief.background} onChange={s("background")} placeholder="なぜ今コンテンツが必要か、事業上の背景" rows={3} /></div>
        <div><FL>既存コンテンツの課題</FL>
          <Txt value={brief.existingIssues} onChange={s("existingIssues")} placeholder="現在の記事・ページで改善したい点" rows={2} /></div>
        <div><FL required>今回期待する成果</FL>
          <Txt value={brief.expectedOutcome} onChange={s("expectedOutcome")} placeholder="数値目標や定性的な変化など" rows={2} /></div>
      </Acc>

      {/* S02 */}
      <Acc no="S02" title="目的・ファネル・CTA" required open={open === "S02"} onToggle={() => tog("S02")}>
        <div><FL required>目的</FL>
          <Checks cols={3}
            options={["認知","検索流入","専門性・信頼","商品理解","比較検討","資料請求","問い合わせ","購入","既存顧客育成","採用","営業支援","社内教育"]}
            selected={brief.purpose} onToggle={(v) => t("purpose", v)} />
          <div className="mt-2"><Inp value={brief.purposeOther} onChange={s("purposeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>最優先目的と顧客導線上の役割</FL>
          <Txt value={brief.topPurpose} onChange={s("topPurpose")} placeholder="このコンテンツはファネルのどの段階で、何を達成するか" rows={2} /></div>
        <div><FL required>読後のCTA・誘導先・次のコンテンツ</FL>
          <Txt value={brief.cta} onChange={s("cta")} placeholder="例：問い合わせボタン、関連記事リンク、資料DLフォーム" rows={2} /></div>
      </Acc>

      {/* S03 */}
      <Acc no="S03" title="読者・検索意図・課題" required open={open === "S03"} onToggle={() => tog("S03")}>
        <div><FL required>最優先読者像</FL>
          <Txt value={brief.primaryReader} onChange={s("primaryReader")} placeholder="職種、役職、課題感、リテラシーレベルなど具体的に" rows={2} /></div>
        <div><FL>読む直前の状況・知識・感情</FL>
          <Txt value={brief.readerContext} onChange={s("readerContext")} placeholder="何に困って、どんな気持ちで検索・クリックしてくるか" rows={2} /></div>
        <div><FL>検索語・質問・比較ポイント</FL>
          <Txt value={brief.searchQueries} onChange={s("searchQueries")} placeholder="読者が実際に打ち込む検索キーワードや質問" rows={2} /></div>
        <div><FL>読者が信じている誤解・反対理由</FL>
          <Txt value={brief.readerMisconceptions} onChange={s("readerMisconceptions")} placeholder="このコンテンツを読む前に持っている誤った認識" rows={2} /></div>
        <div><FL required>読後に理解・納得してほしいこと</FL>
          <Txt value={brief.desiredUnderstanding} onChange={s("desiredUnderstanding")} placeholder="読み終わったときに「そうか」と思ってほしいこと" rows={2} /></div>
      </Acc>

      {/* S04 */}
      <Acc no="S04" title="制作物・量・仕様" required open={open === "S04"} onToggle={() => tog("S04")}>
        <div><FL required>制作物</FL>
          <Checks cols={3}
            options={["SEO記事","コラム","ニュース","インタビュー","導入事例","LPコピー","商品説明","ホワイトペーパー","営業資料原稿","メール","SNS原稿","動画台本","写真","図解・イラスト"]}
            selected={brief.contentItems} onToggle={(v) => t("contentItems", v)} />
          <div className="mt-2"><Inp value={brief.contentItemsOther} onChange={s("contentItemsOther")} placeholder="その他" /></div>
        </div>
        <div><FL>制作仕様（制作物・本数・文字数・公開先・納品形式）</FL>
          <Txt value={brief.specs} onChange={s("specs")} placeholder="例：SEO記事 月4本 3,000字 自社サイト Word納品、SNS原稿 月8投稿 テキストのみ" rows={3} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>更新頻度</FL><Inp value={brief.updateFrequency} onChange={s("updateFrequency")} placeholder="例：週2本、月8本" /></div>
          <div><FL>想定期間</FL><Inp value={brief.plannedPeriod} onChange={s("plannedPeriod")} placeholder="例：3ヶ月、1年間" /></div>
          <div><FL>CMS入稿</FL>
            <Radios cols={2} options={["含む","含まない"]} selected={brief.cmsEntry} onSelect={s("cmsEntry")} /></div>
          <div><FL>画像選定</FL>
            <Radios cols={2} options={["含む","支給"]} selected={brief.imageSelection} onSelect={s("imageSelection")} /></div>
        </div>
        <div><FL>図版制作</FL>
          <Radios cols={2} options={["含む","含まない"]} selected={brief.diagramCreation} onSelect={s("diagramCreation")} /></div>
      </Acc>

      {/* S05 */}
      <Acc no="S05" title="テーマ・編集方針" required open={open === "S05"} onToggle={() => tog("S05")}>
        <div><FL required>編集方針・一貫して主張する考え</FL>
          <Txt value={brief.editorialPolicy} onChange={s("editorialPolicy")} placeholder="このメディア・コンテンツが軸として伝え続けるメッセージや視点" rows={3} /></div>
        <div><FL>自社だから提供できる一次情報・独自視点</FL>
          <Txt value={brief.uniquePerspective} onChange={s("uniquePerspective")} placeholder="社内データ、現場経験、専門家のコメントなど他社にない情報" rows={2} /></div>
        <div><FL required>扱わないテーマ・競合・センシティブ領域</FL>
          <Txt value={brief.offLimitTopics} onChange={s("offLimitTopics")} placeholder="特定競合への言及禁止、政治・宗教など避けるトピック" rows={2} /></div>
        <div><FL>年間イベント・季節・発売予定</FL>
          <Txt value={brief.seasonalEvents} onChange={s("seasonalEvents")} placeholder="コンテンツに合わせたい季節感・発売日・キャンペーン" rows={2} /></div>
      </Acc>

      {/* S06 */}
      <Acc no="S06" title="トーン・文章・ブランド" required open={open === "S06"} onToggle={() => tog("S06")}>
        <div><FL>トーン</FL>
          <Checks cols={4}
            options={["専門的","平易","親しみ","上質","端的","丁寧","熱量","客観的","ストーリー重視","データ重視"]}
            selected={brief.tone} onToggle={(v) => t("tone", v)} />
          <div className="mt-2"><Inp value={brief.toneOther} onChange={s("toneOther")} placeholder="その他" /></div>
        </div>
        <div><FL>ブランドボイス・想定する話者</FL>
          <Txt value={brief.brandVoice} onChange={s("brandVoice")} placeholder="例：30代のベテラン編集者が語りかけるような文体" rows={2} /></div>
        <div><FL>表記ルール・用語集・固有名詞・敬語</FL>
          <Txt value={brief.notationRules} onChange={s("notationRules")} placeholder="社名の略称ルール、業界用語の表記、敬体・常体など" rows={2} /></div>
        <div><FL required>避けたい言い回し・誇張・AIらしい表現</FL>
          <Txt value={brief.avoidExpressions} onChange={s("avoidExpressions")} placeholder="例：「〜を実現します」「革命的な」などの誇張表現、常套句" rows={2} /></div>
        <div><FL>参考コンテンツ（URL・良い点・取り入れたい点）</FL>
          <Txt value={brief.referenceContent} onChange={s("referenceContent")} placeholder="参考にしたいURL、その良い点、取り入れたい・避けたい点" rows={3} /></div>
      </Acc>

      {/* S07 */}
      <Acc no="S07" title="SEO・情報設計" open={open === "S07"} onToggle={() => tog("S07")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>主要テーマ</FL><Inp value={brief.mainTheme} onChange={s("mainTheme")} placeholder="例：中小企業向け経理SaaS" /></div>
          <div><FL>優先キーワード</FL><Inp value={brief.priorityKeywords} onChange={s("priorityKeywords")} placeholder="例：経費精算 クラウド 比較" /></div>
          <div><FL>対象地域</FL><Inp value={brief.targetArea} onChange={s("targetArea")} placeholder="例：全国、関東圏" /></div>
          <div><FL>競合サイト</FL><Inp value={brief.competitorSites} onChange={s("competitorSites")} placeholder="意識している競合メディア" /></div>
          <div><FL>Search Console共有</FL>
            <Radios cols={2} options={["共有可","なし"]} selected={brief.searchConsole} onSelect={s("searchConsole")} /></div>
          <div><FL>既存記事整理</FL>
            <Radios cols={2} options={["必要","不要"]} selected={brief.existingArticleCleanup} onSelect={s("existingArticleCleanup")} /></div>
        </div>
        <div><FL>内部リンク・カテゴリ・タグ・URL方針</FL>
          <Txt value={brief.linkingPolicy} onChange={s("linkingPolicy")} placeholder="カテゴリ設計の方針、内部リンクルール、URL命名規則" rows={2} /></div>
        <div><FL>統合・リライト・削除したい既存記事</FL>
          <Txt value={brief.rewriteTargets} onChange={s("rewriteTargets")} placeholder="URLや記事名、対処の方向性" rows={2} /></div>
        <div><FL required>SEO以外でも必ず伝える価値</FL>
          <Txt value={brief.seoValue} onChange={s("seoValue")} placeholder="検索上位を狙わない記事でも必ず込める価値・読者への貢献" rows={2} /></div>
      </Acc>

      {/* S08 */}
      <Acc no="S08" title="取材・一次情報・資料" open={open === "S08"} onToggle={() => tog("S08")}>
        <div><FL>情報源</FL>
          <Checks cols={3}
            options={["担当者取材","経営者取材","顧客取材","専門家監修","社内資料","調査データ","商品サンプル","現場見学","既存記事","公的資料"]}
            selected={brief.sources} onToggle={(v) => t("sources", v)} />
          <div className="mt-2"><Inp value={brief.sourcesOther} onChange={s("sourcesOther")} placeholder="その他" /></div>
        </div>
        <div><FL>取材候補（氏名・所属・テーマ・候補日）</FL>
          <Txt value={brief.interviewCandidates} onChange={s("interviewCandidates")} placeholder="例：営業部 山田さん / 新機能の活用事例 / 10月中旬希望" rows={3} /></div>
        <div><FL>支給資料・データ・画像・アクセス方法</FL>
          <Txt value={brief.providedMaterials} onChange={s("providedMaterials")} placeholder="提供できる資料の種類と共有方法" rows={2} /></div>
        <div><FL>引用可能な数値・実績・顧客コメント</FL>
          <Txt value={brief.quotableData} onChange={s("quotableData")} placeholder="掲載できる数字・お客様の声・導入実績" rows={2} /></div>
        <div><FL>取材録音・文字起こし・発言確認の条件</FL>
          <Txt value={brief.recordingConditions} onChange={s("recordingConditions")} placeholder="録音の可否、文字起こしの担当、発言内容の確認フロー" rows={2} /></div>
      </Acc>

      {/* S09 */}
      <Acc no="S09" title="構成・制作・承認フロー" required open={open === "S09"} onToggle={() => tog("S09")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>通常確認日数</FL><Inp value={brief.reviewDays} onChange={s("reviewDays")} placeholder="例：3営業日以内" /></div>
          <div><FL>修正回数</FL><Inp value={brief.revisionCount} onChange={s("revisionCount")} placeholder="例：初稿2回、最終稿1回" /></div>
          <div><FL>コメント方法</FL><Inp value={brief.commentMethod} onChange={s("commentMethod")} placeholder="例：Google Docs コメント機能" /></div>
          <div><FL>最終承認者</FL><Inp value={brief.finalApproverName} onChange={s("finalApproverName")} placeholder="コンテンツ公開の最終決裁者" /></div>
        </div>
        <div><FL>緊急公開の基準と対応</FL>
          <Inp value={brief.urgentPublish} onChange={s("urgentPublish")} placeholder="例：ニュース速報は2営業日対応、通常フロー短縮条件" /></div>
        <div><FL>確認者間で意見が分かれた場合の決定方法</FL>
          <Txt value={brief.conflictResolution} onChange={s("conflictResolution")} placeholder="誰が最終判断をするか、どのように合意形成するか" rows={2} /></div>
        <div><FL>素材・取材が遅れた場合の扱い</FL>
          <Txt value={brief.delayPolicy} onChange={s("delayPolicy")} placeholder="代替コンテンツへの切り替え、スケジュール調整のルール" rows={2} /></div>
      </Acc>

      {/* S10 */}
      <Acc no="S10" title="正確性・法務・監修" required open={open === "S10"} onToggle={() => tog("S10")}>
        <div><FL>確認領域</FL>
          <Checks cols={3}
            options={["事実・数値","薬機法","景品表示法","医療・健康","金融・投資","法律","食品・アレルギー","著作権","肖像権","個人情報","社名・商標","広告表記"]}
            selected={brief.legalAreas} onToggle={(v) => t("legalAreas", v)} />
          <div className="mt-2"><Inp value={brief.legalAreasOther} onChange={s("legalAreasOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>監修者・法務担当・確認に必要な日数</FL>
          <Txt value={brief.supervisorInfo} onChange={s("supervisorInfo")} placeholder="例：薬剤師 田中さん / 確認に5営業日必要" rows={2} /></div>
        <div><FL>出典の基準・引用方法・更新期限</FL>
          <Txt value={brief.citationPolicy} onChange={s("citationPolicy")} placeholder="統計データの引用ルール、出典の明記方法、情報の鮮度基準" rows={2} /></div>
        <div><FL required>断定できない内容・必須注記・免責</FL>
          <Txt value={brief.requiredDisclaimer} onChange={s("requiredDisclaimer")} placeholder="「〜の場合があります」「個人差があります」等の必須注記" rows={2} /></div>
        <div><FL>生成AIの利用可否・禁止範囲・確認方法</FL>
          <Txt value={brief.aiPolicy} onChange={s("aiPolicy")} placeholder="AI執筆・補助の可否、禁止用途、人間によるレビュー基準" rows={2} /></div>
      </Acc>

      {/* S11 */}
      <Acc no="S11" title="画像・図解・素材・権利" required open={open === "S11"} onToggle={() => tog("S11")}>
        <div><FL>必要素材</FL>
          <Checks cols={3}
            options={["撮影写真","支給写真","ストック写真","図解","グラフ","イラスト","スクリーンショット","動画","ロゴ","人物プロフィール"]}
            selected={brief.requiredAssets} onToggle={(v) => t("requiredAssets", v)} />
          <div className="mt-2"><Inp value={brief.requiredAssetsOther} onChange={s("requiredAssetsOther")} placeholder="その他" /></div>
        </div>
        <div><FL>画像の世界観・NG・アクセシビリティ要件</FL>
          <Txt value={brief.assetNotes} onChange={s("assetNotes")} placeholder="使用可能なビジュアルのトーン、禁止表現、alt文の要否" rows={2} /></div>
        <div><FL required>二次利用・編集・切り抜き・クレジット条件</FL>
          <Txt value={brief.secondaryUseConditions} onChange={s("secondaryUseConditions")} placeholder="素材の再利用範囲、著作者クレジットの表記ルール" rows={2} /></div>
      </Acc>

      {/* S12 */}
      <Acc no="S12" title="公開・配信・再活用" required open={open === "S12"} onToggle={() => tog("S12")}>
        <div><FL>展開先</FL>
          <Checks cols={3}
            options={["Webサイト","オウンドメディア","SNS","メール","広告","営業資料","セミナー","プレスリリース","採用","店頭","紙媒体","動画・音声"]}
            selected={brief.distributionChannels} onToggle={(v) => t("distributionChannels", v)} />
          <div className="mt-2"><Inp value={brief.distributionChannelsOther} onChange={s("distributionChannelsOther")} placeholder="その他" /></div>
        </div>
        <div><FL>公開日・配信順・告知方法</FL>
          <Txt value={brief.publishPlan} onChange={s("publishPlan")} placeholder="どのコンテンツを、いつ、どう告知するか" rows={2} /></div>
        <div><FL>一つの素材から作る派生コンテンツ</FL>
          <Txt value={brief.derivedContent} onChange={s("derivedContent")} placeholder="例：インタビュー記事 → SNS切り抜き → 社内報 → 採用ページ" rows={2} /></div>
        <div><FL>多言語・短縮版・媒体別最適化の要否</FL>
          <Txt value={brief.localizationNeeds} onChange={s("localizationNeeds")} placeholder="英語版の要否、SNS用の短縮版、印刷物への転用など" rows={2} /></div>
        <div><FL required>公開後の更新責任者・見直し頻度・アーカイブ条件</FL>
          <Txt value={brief.updateResponsibility} onChange={s("updateResponsibility")} placeholder="誰がいつ更新し、古い記事をどう扱うか" rows={2} /></div>
      </Acc>

      {/* S13 */}
      <Acc no="S13" title="予算・契約・スケジュール" required open={open === "S13"} onToggle={() => tog("S13")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>制作予算（税別）</FL><Inp value={brief.productionBudget} onChange={s("productionBudget")} placeholder="例：500,000円" /></div>
          <div><FL>月額予算</FL><Inp value={brief.monthlyBudget} onChange={s("monthlyBudget")} placeholder="例：100,000円/月" /></div>
          <div><FL>撮影・取材実費</FL><Inp value={brief.interviewCost} onChange={s("interviewCost")} placeholder="例：交通費・謝礼実費" /></div>
          <div><FL>初回公開</FL><Inp type="date" value={brief.firstPublish} onChange={s("firstPublish")} /></div>
          <div><FL>契約期間</FL><Inp value={brief.contractPeriod} onChange={s("contractPeriod")} placeholder="例：6ヶ月、1年間（自動更新）" /></div>
          <div><FL>見積期限</FL><Inp type="date" value={brief.estimateDeadline} onChange={s("estimateDeadline")} /></div>
        </div>
        <div><FL>依頼範囲</FL>
          <Checks cols={3}
            options={["戦略・企画","調査","取材","構成","執筆","編集・校正","SEO","画像選定","図解","撮影","CMS入稿","分析・改善"]}
            selected={brief.scope} onToggle={(v) => t("scope", v)} />
          <div className="mt-2"><Inp value={brief.scopeOther} onChange={s("scopeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>予算内で優先する制作物・本数</FL>
          <Txt value={brief.budgetPriority} onChange={s("budgetPriority")} placeholder="予算が限られる場合に最優先で確保すべきもの" rows={2} /></div>
        <div><FL>著作権・編集権・著作者名・実績掲載条件</FL>
          <Txt value={brief.copyrightConditions} onChange={s("copyrightConditions")} placeholder="成果物の著作権帰属、バイラインの表記、YOICHIの実績掲載可否" rows={2} /></div>
        <div><FL>追加修正・再取材・更新・キャンセル条件</FL>
          <Txt value={brief.revisionCancelPolicy} onChange={s("revisionCancelPolicy")} placeholder="契約範囲外の追加作業の扱い、中途解約時の精算方法" rows={2} /></div>
      </Acc>

      {/* S14 */}
      <Acc no="S14" title="制作方針まとめ・最終確認" required open={open === "S14"} onToggle={() => tog("S14")}>
        <div><FL required>今回の最優先目的</FL>
          <Txt value={brief.finalPurpose} onChange={s("finalPurpose")} placeholder="一言で：このコンテンツ制作で最も達成したいことは？" rows={2} /></div>
        <div><FL required>最優先ターゲット</FL>
          <Txt value={brief.finalTarget} onChange={s("finalTarget")} placeholder="最も届けたいのは誰ですか？" rows={2} /></div>
        <div><FL required>必須要件・絶対に外せない条件</FL>
          <Txt value={brief.mustConditions} onChange={s("mustConditions")} placeholder="この条件が満たされなければ進められないこと" rows={2} /></div>
        <div><FL>対象外・次期へ回す項目</FL>
          <Txt value={brief.outOfScope} onChange={s("outOfScope")} placeholder="今回はやらないこと、将来的に検討すること" rows={2} /></div>
        <div><FL>主要KPIと目標値</FL>
          <Txt value={brief.mainKpi} onChange={s("mainKpi")} placeholder="例：月間オーガニック流入3,000PV、資料DL月50件" rows={2} /></div>
        <div><FL>最大のリスク・未決事項</FL>
          <Txt value={brief.risks} onChange={s("risks")} placeholder="現時点で懸念していること、未決定の重要事項" rows={3} /></div>
      </Acc>
    </div>
  );
}
