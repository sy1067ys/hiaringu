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
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7a5c5c] focus:ring-1 focus:ring-[#7a5c5c]/20 text-sm transition-all" />
  );
}
function Txt({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7a5c5c] focus:ring-1 focus:ring-[#7a5c5c]/20 text-sm resize-none transition-all" />
  );
}
function FL({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold tracking-wider text-[#7a5c5c] uppercase mb-1.5">
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7a5c5c] hover:bg-[#f7f3ee]"
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7a5c5c] hover:bg-[#f7f3ee]"
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

const ACCENT = "#7a5c5c";

function Acc({ no, title, required, open, onToggle, children }: {
  no: string; title: string; required?: boolean; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-[#c9b8a4]/40 rounded-xl overflow-hidden">
      <button type="button" onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${open ? "text-[#f7f3ee]" : "bg-[#faf8f5] text-[#1a1410] hover:bg-[#ede7de]"}`}
        style={open ? { backgroundColor: ACCENT } : {}}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${open ? "bg-white/20 text-white/80" : "bg-[#c9b8a4]/30 text-[#7a5c5c]"}`}>{no}</span>
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
export type ProductBrief = {
  // Overview
  consultType: string[]; consultTypeOther: string;
  consultSummary: string; topPriority: string; decisionsStatus: string;
  // S01
  companyBrand: string; productName: string;
  contactPerson: string; finalApprover: string;
  releaseTarget: string; existingProductUrl: string;
  background: string; businessIssue: string; existingStrengths: string;
  // S02
  purpose: string[]; purposeOther: string;
  topPurpose: string; successCriteria: string;
  // S03
  primaryCustomer: string; usageScene: string;
  unmetNeeds: string; purchaseFactors: string; loyaltyReasons: string;
  // S04
  marketScale: string; targetPosition: string;
  uniqueDefense: string; referenceProducts: string;
  // S05
  conceptStatement: string; productValues: string;
  developmentStory: string;
  targetImpression: string[]; targetImpressionOther: string;
  namingConditions: string; avoidWorldview: string;
  // S06
  specMaterials: string; specSize: string;
  specColor: string; specPerformance: string;
  specDurability: string; specAccessories: string;
  variations: string[]; variationsOther: string;
  qualityStandard: string; userTestPoints: string;
  // S07
  retailPrice: string; wholesalePrice: string;
  targetCost: string; targetMargin: string;
  devBudgetCap: string; breakEvenQty: string;
  priceJustification: string; channelProfitability: string;
  costRevisionRule: string;
  // S08
  manufacturingMethod: string;
  factoryCandidate: string; moq: string;
  leadTime: string; productionRegion: string; paymentTerms: string;
  procurementRisks: string; factoryAuditPolicy: string; reorderPolicy: string;
  // S09
  legalAreas: string[]; legalAreasOther: string;
  applicableLaws: string; requiredLabeling: string;
  testingPlan: string; expertReviewer: string;
  // S10
  packagingItems: string[]; packagingItemsOther: string;
  packagingPriority: string; sizeConstraints: string;
  ecoPolicy: string; logisticsNotes: string;
  // S11
  salesChannels: string[]; salesChannelsOther: string;
  wholesaleConditions: string; channelControlRules: string;
  existingLeads: string;
  // S12
  promotionItems: string[]; promotionItemsOther: string;
  topAppeal: string; salesToolsTraining: string; ugcStrategy: string;
  // S13
  demandForecast: string; reorderTrigger: string;
  returnExchangePolicy: string; recallContactPlan: string; customerFeedbackLoop: string;
  // S14
  ipTargets: string[]; ipTargetsOther: string;
  filedRights: string; ownershipScope: string;
  infringementConcerns: string; confidentialityConditions: string;
  // S15
  totalBudget: string; devCost: string;
  initialProductionCost: string; promotionBudget: string;
  launchDate: string; estimateDeadline: string;
  internalTeam: string; budgetPriority: string; changeConditions: string;
  // S16
  finalPurpose: string; finalTarget: string;
  mustConditions: string; outOfScope: string;
  mainKpi: string; risks: string;
};

export const EMPTY_PRODUCT_BRIEF: ProductBrief = {
  consultType: [], consultTypeOther: "", consultSummary: "", topPriority: "", decisionsStatus: "",
  companyBrand: "", productName: "", contactPerson: "", finalApprover: "",
  releaseTarget: "", existingProductUrl: "",
  background: "", businessIssue: "", existingStrengths: "",
  purpose: [], purposeOther: "", topPurpose: "", successCriteria: "",
  primaryCustomer: "", usageScene: "", unmetNeeds: "", purchaseFactors: "", loyaltyReasons: "",
  marketScale: "", targetPosition: "", uniqueDefense: "", referenceProducts: "",
  conceptStatement: "", productValues: "", developmentStory: "",
  targetImpression: [], targetImpressionOther: "",
  namingConditions: "", avoidWorldview: "",
  specMaterials: "", specSize: "", specColor: "", specPerformance: "",
  specDurability: "", specAccessories: "",
  variations: [], variationsOther: "",
  qualityStandard: "", userTestPoints: "",
  retailPrice: "", wholesalePrice: "", targetCost: "", targetMargin: "",
  devBudgetCap: "", breakEvenQty: "",
  priceJustification: "", channelProfitability: "", costRevisionRule: "",
  manufacturingMethod: "", factoryCandidate: "", moq: "",
  leadTime: "", productionRegion: "", paymentTerms: "",
  procurementRisks: "", factoryAuditPolicy: "", reorderPolicy: "",
  legalAreas: [], legalAreasOther: "",
  applicableLaws: "", requiredLabeling: "", testingPlan: "", expertReviewer: "",
  packagingItems: [], packagingItemsOther: "",
  packagingPriority: "", sizeConstraints: "", ecoPolicy: "", logisticsNotes: "",
  salesChannels: [], salesChannelsOther: "",
  wholesaleConditions: "", channelControlRules: "", existingLeads: "",
  promotionItems: [], promotionItemsOther: "",
  topAppeal: "", salesToolsTraining: "", ugcStrategy: "",
  demandForecast: "", reorderTrigger: "",
  returnExchangePolicy: "", recallContactPlan: "", customerFeedbackLoop: "",
  ipTargets: [], ipTargetsOther: "",
  filedRights: "", ownershipScope: "", infringementConcerns: "", confidentialityConditions: "",
  totalBudget: "", devCost: "", initialProductionCost: "", promotionBudget: "",
  launchDate: "", estimateDeadline: "",
  internalTeam: "", budgetPriority: "", changeConditions: "",
  finalPurpose: "", finalTarget: "", mustConditions: "", outOfScope: "", mainKpi: "", risks: "",
};

/* ─── Main Component ─── */
export default function ProductBriefForm({ brief, onChange }: { brief: ProductBrief; onChange: (b: ProductBrief) => void }) {
  const [open, setOpen] = useState<string | null>("OV");
  const s = (key: keyof ProductBrief) => (val: string) => onChange({ ...brief, [key]: val });
  const t = (key: keyof ProductBrief, val: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], val) });
  const tog = (id: string) => setOpen((o) => o === id ? null : id);

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
        <div className="flex items-center gap-2 py-2 px-4 rounded-lg" style={{ backgroundColor: `${ACCENT}18` }}>
          <span className="text-lg">◉</span>
          <span className="font-semibold text-sm tracking-wide" style={{ color: ACCENT }}>商品企画・販売支援 詳細ヒアリング</span>
        </div>
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
      </div>

      {/* Overview */}
      <Acc no="OV" title="案件の全体像" required open={open === "OV"} onToggle={() => tog("OV")}>
        <div><FL required>今回の相談内容</FL>
          <Checks cols={3}
            options={["新商品企画","既存商品改良","OEM／ODM","ブランド立ち上げ","パッケージ開発","価格・収支設計","販路開拓","販売促進","未定／相談したい"]}
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
      <Acc no="S01" title="基本情報・企画背景" required open={open === "S01"} onToggle={() => tog("S01")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>会社・ブランド名</FL><Inp value={brief.companyBrand} onChange={s("companyBrand")} placeholder="会社名またはブランド名" /></div>
          <div><FL>商品名／仮称</FL><Inp value={brief.productName} onChange={s("productName")} placeholder="仮の商品名でもOK" /></div>
          <div><FL>窓口担当者</FL><Inp value={brief.contactPerson} onChange={s("contactPerson")} placeholder="担当者名" /></div>
          <div><FL>最終決裁者</FL><Inp value={brief.finalApprover} onChange={s("finalApprover")} placeholder="承認権限者" /></div>
          <div><FL>発売希望</FL><Inp value={brief.releaseTarget} onChange={s("releaseTarget")} placeholder="例：2027年3月頃" /></div>
          <div><FL>既存商品URL</FL><Inp value={brief.existingProductUrl} onChange={s("existingProductUrl")} placeholder="https://（なければ空白）" /></div>
        </div>
        <div><FL required>商品企画のきっかけ・背景</FL>
          <Txt value={brief.background} onChange={s("background")} placeholder="なぜこの商品を作ろうとしているか、経緯や動機をご記入ください" rows={3} /></div>
        <div><FL required>事業上解決したい課題</FL>
          <Txt value={brief.businessIssue} onChange={s("businessIssue")} placeholder="売上・顧客・競合・ブランド面でどんな課題がありますか？" rows={2} /></div>
        <div><FL>商品化に活用できる技術・資産・強み</FL>
          <Txt value={brief.existingStrengths} onChange={s("existingStrengths")} placeholder="自社が持つ製造技術、知的財産、人脈、原料など" rows={2} /></div>
      </Acc>

      {/* S02 */}
      <Acc no="S02" title="事業目的・成功条件" required open={open === "S02"} onToggle={() => tog("S02")}>
        <div><FL required>目的</FL>
          <Checks cols={3}
            options={["新規売上","新規顧客","客単価向上","リピート","ブランド象徴","既存技術活用","地域資源活用","販路拡大","OEM受注","社会課題","話題化","テスト販売"]}
            selected={brief.purpose} onToggle={(v) => t("purpose", v)} />
          <div className="mt-2"><Inp value={brief.purposeOther} onChange={s("purposeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>最優先目的とその理由</FL>
          <Txt value={brief.topPurpose} onChange={s("topPurpose")} placeholder="最も重要な目的と、なぜそれが優先されるかの理由" rows={2} /></div>
        <div><FL>成功・継続・撤退の判断基準</FL>
          <Txt value={brief.successCriteria} onChange={s("successCriteria")} placeholder="例：発売6ヶ月で損益分岐を超えなければ見直し" rows={2} /></div>
      </Acc>

      {/* S03 */}
      <Acc no="S03" title="ターゲット・顧客課題・利用場面" required open={open === "S03"} onToggle={() => tog("S03")}>
        <div><FL required>最優先顧客像</FL>
          <Txt value={brief.primaryCustomer} onChange={s("primaryCustomer")} placeholder="年齢・性別・ライフスタイル・価値観・所得など具体的に" rows={2} /></div>
        <div><FL required>利用場面・購入場面・贈答／自家需要</FL>
          <Txt value={brief.usageScene} onChange={s("usageScene")} placeholder="いつ、どこで、どんな目的で使うか。ギフト需要の有無" rows={2} /></div>
        <div><FL required>顧客の不満・未充足ニーズ・代替品</FL>
          <Txt value={brief.unmetNeeds} onChange={s("unmetNeeds")} placeholder="今使っているもので不満な点、理想の解決策" rows={3} /></div>
        <div><FL>購入時の比較ポイント・許容価格</FL>
          <Txt value={brief.purchaseFactors} onChange={s("purchaseFactors")} placeholder="他商品と比べる軸、いくらまでなら払えるか" rows={2} /></div>
        <div><FL>使い続ける／人に勧める理由</FL>
          <Txt value={brief.loyaltyReasons} onChange={s("loyaltyReasons")} placeholder="リピート・口コミが生まれる理由を想定して記入" rows={2} /></div>
      </Acc>

      {/* S04 */}
      <Acc no="S04" title="市場・競合・ポジショニング" required open={open === "S04"} onToggle={() => tog("S04")}>
        <div><FL>市場規模・成長性・トレンドの認識</FL>
          <Txt value={brief.marketScale} onChange={s("marketScale")} placeholder="対象市場の規模感、成長しているか、関連トレンド" rows={2} /></div>
        <div><FL required>狙うポジション・選ばれる一言</FL>
          <Txt value={brief.targetPosition} onChange={s("targetPosition")} placeholder="例：「忙しいママが自分へのご褒美に選ぶ、日本製オーガニックスキンケア」" rows={2} /></div>
        <div><FL>競合が真似しにくい根拠</FL>
          <Txt value={brief.uniqueDefense} onChange={s("uniqueDefense")} placeholder="製法特許、原料の独占供給、ブランドストーリーなど" rows={2} /></div>
        <div><FL>参考商品で取り入れたい／避けたい点</FL>
          <Txt value={brief.referenceProducts} onChange={s("referenceProducts")} placeholder="参考にしたい商品・ブランドとその理由、避けたいイメージ" rows={2} /></div>
      </Acc>

      {/* S05 */}
      <Acc no="S05" title="商品コンセプト・ブランド" required open={open === "S05"} onToggle={() => tog("S05")}>
        <div><FL required>商品コンセプトを一文で</FL>
          <Inp value={brief.conceptStatement} onChange={s("conceptStatement")} placeholder="例：「毎日使えるのに、特別な気持ちになれる○○」" /></div>
        <div><FL required>機能価値・感情価値・社会価値</FL>
          <Txt value={brief.productValues} onChange={s("productValues")} placeholder="何ができる（機能）／どんな気持ちになる（感情）／社会にどう貢献する（社会）" rows={3} /></div>
        <div><FL>ブランド／企業とのつながり・開発ストーリー</FL>
          <Txt value={brief.developmentStory} onChange={s("developmentStory")} placeholder="なぜこの会社がこの商品を出すのか、という必然性" rows={2} /></div>
        <div><FL>目指す印象</FL>
          <Checks cols={4}
            options={["上質","親しみ","革新的","自然","職人性","かわいい","力強い","安心","サステナブル","地域性","ギフト感","日常使い"]}
            selected={brief.targetImpression} onToggle={(v) => t("targetImpression", v)} />
          <div className="mt-2"><Inp value={brief.targetImpressionOther} onChange={s("targetImpressionOther")} placeholder="その他" /></div>
        </div>
        <div><FL>商品名・ネーミング条件・商標候補</FL>
          <Txt value={brief.namingConditions} onChange={s("namingConditions")} placeholder="候補名、言語・文字数の制限、避けたい音・意味" rows={2} /></div>
        <div><FL>絶対に避けたい世界観・表現</FL>
          <Txt value={brief.avoidWorldview} onChange={s("avoidWorldview")} placeholder="NG色、NG言葉、イメージしたくないカテゴリ" rows={2} /></div>
      </Acc>

      {/* S06 */}
      <Acc no="S06" title="仕様・バリエーション・品質" required open={open === "S06"} onToggle={() => tog("S06")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>素材・成分</FL><Txt value={brief.specMaterials} onChange={s("specMaterials")} placeholder="必須素材・成分、禁止成分など" rows={2} /></div>
          <div><FL>サイズ・容量</FL><Txt value={brief.specSize} onChange={s("specSize")} placeholder="希望サイズ・容量・重量" rows={2} /></div>
          <div><FL>色・香り・味</FL><Txt value={brief.specColor} onChange={s("specColor")} placeholder="必須の色展開、香り・フレーバーの方向性" rows={2} /></div>
          <div><FL>性能・機能</FL><Txt value={brief.specPerformance} onChange={s("specPerformance")} placeholder="必ず達成すべき性能・機能の数値目標" rows={2} /></div>
          <div><FL>耐久・保存</FL><Txt value={brief.specDurability} onChange={s("specDurability")} placeholder="耐久年数、賞味期限、保存条件" rows={2} /></div>
          <div><FL>付属品</FL><Txt value={brief.specAccessories} onChange={s("specAccessories")} placeholder="同梱する付属品・ツール" rows={2} /></div>
        </div>
        <div><FL>バリエーション</FL>
          <Checks cols={3}
            options={["サイズ違い","色違い","香り・味","容量違い","セット","限定版","名入れ","業務用","詰替え","定期便"]}
            selected={brief.variations} onToggle={(v) => t("variations", v)} />
          <div className="mt-2"><Inp value={brief.variationsOther} onChange={s("variationsOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>品質基準・検品方法・不良判定</FL>
          <Txt value={brief.qualityStandard} onChange={s("qualityStandard")} placeholder="合格・不合格の基準、検品体制、不良時の対処" rows={2} /></div>
        <div><FL>ユーザーテスト・モニターで確認したい点</FL>
          <Txt value={brief.userTestPoints} onChange={s("userTestPoints")} placeholder="発売前に確認しておきたい使用感・機能・反応" rows={2} /></div>
      </Acc>

      {/* S07 */}
      <Acc no="S07" title="原価・価格・収支" required open={open === "S07"} onToggle={() => tog("S07")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>希望上代（税込）</FL><Inp value={brief.retailPrice} onChange={s("retailPrice")} placeholder="例：3,980円" /></div>
          <div><FL>卸価格</FL><Inp value={brief.wholesalePrice} onChange={s("wholesalePrice")} placeholder="例：1,800円（掛率45%）" /></div>
          <div><FL>目標原価</FL><Inp value={brief.targetCost} onChange={s("targetCost")} placeholder="例：800円以下" /></div>
          <div><FL>目標粗利率</FL><Inp value={brief.targetMargin} onChange={s("targetMargin")} placeholder="例：60%以上" /></div>
          <div><FL>初期開発費上限</FL><Inp value={brief.devBudgetCap} onChange={s("devBudgetCap")} placeholder="例：500万円" /></div>
          <div><FL>損益分岐数量</FL><Inp value={brief.breakEvenQty} onChange={s("breakEvenQty")} placeholder="例：月1,000個" /></div>
        </div>
        <div><FL>価格に対する顧客の納得材料</FL>
          <Txt value={brief.priceJustification} onChange={s("priceJustification")} placeholder="この価格を正当化できる素材・機能・ストーリー" rows={2} /></div>
        <div><FL required>卸・委託・EC等、チャネル別の採算条件</FL>
          <Txt value={brief.channelProfitability} onChange={s("channelProfitability")} placeholder="各チャネルで成立する最低粗利率や手数料上限" rows={2} /></div>
        <div><FL>原価上昇時の仕様・価格見直しルール</FL>
          <Txt value={brief.costRevisionRule} onChange={s("costRevisionRule")} placeholder="原料高騰時にどのように対応するか" rows={2} /></div>
      </Acc>

      {/* S08 */}
      <Acc no="S08" title="製造・仕入・サプライヤー" required open={open === "S08"} onToggle={() => tog("S08")}>
        <div><FL>製造方法</FL>
          <Radios cols={4} options={["自社","OEM","ODM","仕入","未定"]} selected={brief.manufacturingMethod} onSelect={s("manufacturingMethod")} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>候補工場・仕入先</FL><Inp value={brief.factoryCandidate} onChange={s("factoryCandidate")} placeholder="工場名や仕入先候補" /></div>
          <div><FL>MOQ（最小発注数）</FL><Inp value={brief.moq} onChange={s("moq")} placeholder="例：500個〜" /></div>
          <div><FL>標準リードタイム</FL><Inp value={brief.leadTime} onChange={s("leadTime")} placeholder="例：発注後60日" /></div>
          <div><FL>生産国・地域</FL><Inp value={brief.productionRegion} onChange={s("productionRegion")} placeholder="例：国内、中国、ベトナム" /></div>
        </div>
        <div><FL>支払・発注条件</FL>
          <Inp value={brief.paymentTerms} onChange={s("paymentTerms")} placeholder="例：前金30%・残金出荷時、NET60日" /></div>
        <div><FL required>原料・部材の調達条件、代替可否、供給リスク</FL>
          <Txt value={brief.procurementRisks} onChange={s("procurementRisks")} placeholder="主要原料の調達難易度、代替素材の有無、リスク対策" rows={3} /></div>
        <div><FL>工場監査・秘密保持・金型・レシピの所有権</FL>
          <Txt value={brief.factoryAuditPolicy} onChange={s("factoryAuditPolicy")} placeholder="工場への立ち入り確認、NDA、金型の帰属先" rows={2} /></div>
        <div><FL>増産・追加発注・欠品時の対応</FL>
          <Txt value={brief.reorderPolicy} onChange={s("reorderPolicy")} placeholder="売れ行き好調時の増産スピード、欠品時の優先配分" rows={2} /></div>
      </Acc>

      {/* S09 */}
      <Acc no="S09" title="安全・法規・表示・認証" required open={open === "S09"} onToggle={() => tog("S09")}>
        <div><FL>確認領域</FL>
          <Checks cols={3}
            options={["食品衛生","アレルギー","賞味期限","化粧品・薬機法","電気用品","玩具・子ども","繊維表示","家庭用品品質表示","PL保険","原産国","環境表示","知的財産"]}
            selected={brief.legalAreas} onToggle={(v) => t("legalAreas", v)} />
          <div className="mt-2"><Inp value={brief.legalAreasOther} onChange={s("legalAreasOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>適用される法令・業界基準・認証</FL>
          <Txt value={brief.applicableLaws} onChange={s("applicableLaws")} placeholder="食品衛生法、薬機法、JIS規格など必要な認証・基準" rows={2} /></div>
        <div><FL required>必須表示（名称、成分、注意、事業者、期限等）</FL>
          <Txt value={brief.requiredLabeling} onChange={s("requiredLabeling")} placeholder="パッケージや説明書に必ず載せる情報" rows={2} /></div>
        <div><FL>試験・検査・証明書・ロット追跡</FL>
          <Txt value={brief.testingPlan} onChange={s("testingPlan")} placeholder="第三者試験機関の利用、ロット番号管理の方法" rows={2} /></div>
        <div><FL>専門家・行政・検査機関の確認担当と期限</FL>
          <Inp value={brief.expertReviewer} onChange={s("expertReviewer")} placeholder="例：薬剤師 田中さん、届出は販売6週間前まで" /></div>
      </Acc>

      {/* S10 */}
      <Acc no="S10" title="パッケージ・同梱物・物流" required open={open === "S10"} onToggle={() => tog("S10")}>
        <div><FL>必要物</FL>
          <Checks cols={3}
            options={["容器","個装箱","外装箱","ラベル","説明書","保証書","同梱カード","ギフト包装","什器","配送箱","緩衝材","バーコード"]}
            selected={brief.packagingItems} onToggle={(v) => t("packagingItems", v)} />
          <div className="mt-2"><Inp value={brief.packagingItemsOther} onChange={s("packagingItemsOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>パッケージで最優先に伝える情報</FL>
          <Txt value={brief.packagingPriority} onChange={s("packagingPriority")} placeholder="店頭やECサムネイルで一番目立たせたいこと" rows={2} /></div>
        <div><FL>サイズ・重量・陳列・輸送・保管の制約</FL>
          <Txt value={brief.sizeConstraints} onChange={s("sizeConstraints")} placeholder="棚のサイズ制限、重量上限、保管温度、積み重ね可否" rows={2} /></div>
        <div><FL>環境配慮・素材・廃棄・リサイクル条件</FL>
          <Txt value={brief.ecoPolicy} onChange={s("ecoPolicy")} placeholder="FSC認証、再生素材、プラ削減、リサイクル表示など" rows={2} /></div>
        <div><FL>物流条件（保管・入庫・出荷・返品）</FL>
          <Txt value={brief.logisticsNotes} onChange={s("logisticsNotes")} placeholder="倉庫条件、入庫検品の手順、出荷基準、返品時の処理" rows={2} /></div>
      </Acc>

      {/* S11 */}
      <Acc no="S11" title="販売チャネル・取引条件" required open={open === "S11"} onToggle={() => tog("S11")}>
        <div><FL required>販売先</FL>
          <Checks cols={3}
            options={["自社EC","ECモール","直営店","百貨店","専門店","量販店","卸売","代理店","法人営業","イベント","クラウドファンディング","海外"]}
            selected={brief.salesChannels} onToggle={(v) => t("salesChannels", v)} />
          <div className="mt-2"><Inp value={brief.salesChannelsOther} onChange={s("salesChannelsOther")} placeholder="その他" /></div>
        </div>
        <div><FL>希望する卸率・掛率・支払・返品・買取条件</FL>
          <Txt value={brief.wholesaleConditions} onChange={s("wholesaleConditions")} placeholder="バイヤーに提示できる条件の上限・下限" rows={2} /></div>
        <div><FL required>チャネル競合・価格統制・販売地域のルール</FL>
          <Txt value={brief.channelControlRules} onChange={s("channelControlRules")} placeholder="定価を守るルール、チャネルごとの販売地域制限" rows={2} /></div>
        <div><FL>既存商談先・導入障壁・必要な営業資料</FL>
          <Txt value={brief.existingLeads} onChange={s("existingLeads")} placeholder="すでに話が進んでいる取引先、バイヤーが求める書類" rows={2} /></div>
      </Acc>

      {/* S12 */}
      <Acc no="S12" title="発売・販促・営業支援" required open={open === "S12"} onToggle={() => tog("S12")}>
        <div><FL>施策</FL>
          <Checks cols={3}
            options={["ティザー","プレスリリース","SNS","広告","インフルエンサー","サンプリング","展示会","店頭POP","営業資料","キャンペーン","クラウドファンディング","レビュー獲得"]}
            selected={brief.promotionItems} onToggle={(v) => t("promotionItems", v)} />
          <div className="mt-2"><Inp value={brief.promotionItemsOther} onChange={s("promotionItemsOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>一番強く打ち出す訴求・証拠</FL>
          <Txt value={brief.topAppeal} onChange={s("topAppeal")} placeholder="広告・店頭・SNSで最初に伝えるべき一言とその根拠" rows={2} /></div>
        <div><FL>販売員・代理店が説明しやすくする資料・研修</FL>
          <Txt value={brief.salesToolsTraining} onChange={s("salesToolsTraining")} placeholder="トークスクリプト、商品勉強会、FAQ集などの要否" rows={2} /></div>
        <div><FL>レビュー・UGC・リピートを生む仕組み</FL>
          <Txt value={brief.ugcStrategy} onChange={s("ugcStrategy")} placeholder="購入後のフォロー、レビュー依頼、SNS投稿促進の仕掛け" rows={2} /></div>
      </Acc>

      {/* S13 */}
      <Acc no="S13" title="需要・在庫・アフター対応" required open={open === "S13"} onToggle={() => tog("S13")}>
        <div><FL>需要予測（初月・3ヶ月・初年度・繁忙期）</FL>
          <Txt value={brief.demandForecast} onChange={s("demandForecast")} placeholder="各期間の販売見込数、生産・発注数、安全在庫の考え方" rows={3} /></div>
        <div><FL required>追加発注点・リードタイム・欠品時の優先配分</FL>
          <Txt value={brief.reorderTrigger} onChange={s("reorderTrigger")} placeholder="どの在庫水準で次の発注をかけるか、欠品時の優先チャネル" rows={2} /></div>
        <div><FL>返品・交換・修理・保証・問い合わせの条件</FL>
          <Txt value={brief.returnExchangePolicy} onChange={s("returnExchangePolicy")} placeholder="返品・交換の受付期限、費用負担、保証期間" rows={2} /></div>
        <div><FL required>不具合・事故・回収時の連絡・判断体制</FL>
          <Txt value={brief.recallContactPlan} onChange={s("recallContactPlan")} placeholder="問題発生時に誰が何を判断し、どこに連絡するか" rows={2} /></div>
        <div><FL>顧客の声を商品改良へ戻す方法</FL>
          <Txt value={brief.customerFeedbackLoop} onChange={s("customerFeedbackLoop")} placeholder="レビュー・問い合わせ・販売員からの声をどう収集・反映するか" rows={2} /></div>
      </Acc>

      {/* S14 */}
      <Acc no="S14" title="知的財産・契約・権利" open={open === "S14"} onToggle={() => tog("S14")}>
        <div><FL>確認対象</FL>
          <Checks cols={3}
            options={["商標","意匠","特許・実用新案","著作権","商品名・ドメイン","レシピ・配合","金型","デザインデータ","写真・コピー","共同開発成果","OEM秘密保持","販売地域・独占"]}
            selected={brief.ipTargets} onToggle={(v) => t("ipTargets", v)} />
          <div className="mt-2"><Inp value={brief.ipTargetsOther} onChange={s("ipTargetsOther")} placeholder="その他" /></div>
        </div>
        <div><FL>出願済み／出願予定の権利・調査状況</FL>
          <Txt value={brief.filedRights} onChange={s("filedRights")} placeholder="商標出願中、特許の先行調査状況など" rows={2} /></div>
        <div><FL required>共同開発先・製造先との所有権・利用範囲</FL>
          <Txt value={brief.ownershipScope} onChange={s("ownershipScope")} placeholder="デザイン・配合・金型などの帰属と使用許諾の範囲" rows={2} /></div>
        <div><FL>類似品・模倣・競合権利への懸念</FL>
          <Txt value={brief.infringementConcerns} onChange={s("infringementConcerns")} placeholder="既に類似品がある場合の差別化、模倣リスクへの対策" rows={2} /></div>
        <div><FL>実績掲載・サンプル展示・秘密保持条件</FL>
          <Txt value={brief.confidentialityConditions} onChange={s("confidentialityConditions")} placeholder="YOICHIが実績として公開できるか、NDAの範囲" rows={2} /></div>
      </Acc>

      {/* S15 */}
      <Acc no="S15" title="予算・体制・スケジュール" required open={open === "S15"} onToggle={() => tog("S15")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>総予算（税別）</FL><Inp value={brief.totalBudget} onChange={s("totalBudget")} placeholder="例：1,000万円" /></div>
          <div><FL>試作・開発費</FL><Inp value={brief.devCost} onChange={s("devCost")} placeholder="例：200万円" /></div>
          <div><FL>初回生産費</FL><Inp value={brief.initialProductionCost} onChange={s("initialProductionCost")} placeholder="例：500万円" /></div>
          <div><FL>販促・営業費</FL><Inp value={brief.promotionBudget} onChange={s("promotionBudget")} placeholder="例：300万円" /></div>
          <div><FL>発売希望</FL><Inp value={brief.launchDate} onChange={s("launchDate")} placeholder="例：2027年春" /></div>
          <div><FL>見積期限</FL><Inp type="date" value={brief.estimateDeadline} onChange={s("estimateDeadline")} /></div>
        </div>
        <div><FL required>社内体制・外部パートナー・最終決裁者</FL>
          <Txt value={brief.internalTeam} onChange={s("internalTeam")} placeholder="プロジェクト体制と、YOICHIに期待する役割分担" rows={2} /></div>
        <div><FL required>予算内で優先する仕様・販路・施策</FL>
          <Txt value={brief.budgetPriority} onChange={s("budgetPriority")} placeholder="予算が足りない場合に絶対に外せないこと" rows={2} /></div>
        <div><FL>中止・延期・仕様変更を判断する条件</FL>
          <Txt value={brief.changeConditions} onChange={s("changeConditions")} placeholder="どの段階で、どんな状況になったらプロジェクトを見直すか" rows={2} /></div>
      </Acc>

      {/* S16 */}
      <Acc no="S16" title="商品方針まとめ・最終確認" required open={open === "S16"} onToggle={() => tog("S16")}>
        <div><FL required>今回の最優先目的</FL>
          <Txt value={brief.finalPurpose} onChange={s("finalPurpose")} placeholder="一言で：この商品開発で最も達成したいことは？" rows={2} /></div>
        <div><FL required>最優先ターゲット</FL>
          <Txt value={brief.finalTarget} onChange={s("finalTarget")} placeholder="最も届けたいのは誰ですか？" rows={2} /></div>
        <div><FL required>必須要件・絶対に外せない条件</FL>
          <Txt value={brief.mustConditions} onChange={s("mustConditions")} placeholder="これが満たされなければ前に進めないという条件" rows={2} /></div>
        <div><FL>対象外・次期へ回す項目</FL>
          <Txt value={brief.outOfScope} onChange={s("outOfScope")} placeholder="今回はやらないこと、将来的に検討すること" rows={2} /></div>
        <div><FL>主要KPIと目標値</FL>
          <Txt value={brief.mainKpi} onChange={s("mainKpi")} placeholder="例：発売初年度1,000万円、取扱店舗50店舗、リピート率30%" rows={2} /></div>
        <div><FL>最大のリスク・未決事項</FL>
          <Txt value={brief.risks} onChange={s("risks")} placeholder="現時点で懸念していること、未決定の重要事項" rows={3} /></div>
      </Acc>
    </div>
  );
}
