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
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#6a5c7a] focus:ring-1 focus:ring-[#6a5c7a]/20 text-sm transition-all" />
  );
}
function Txt({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#6a5c7a] focus:ring-1 focus:ring-[#6a5c7a]/20 text-sm resize-none transition-all" />
  );
}
function FL({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold tracking-wider text-[#6a5c7a] uppercase mb-1.5">
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#6a5c7a] hover:bg-[#f7f3ee]"
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#6a5c7a] hover:bg-[#f7f3ee]"
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

const ACCENT = "#6a5c7a";

function Acc({ no, title, required, open, onToggle, children }: {
  no: string; title: string; required?: boolean; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-[#c9b8a4]/40 rounded-xl overflow-hidden">
      <button type="button" onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${open ? "text-[#f7f3ee]" : "bg-[#faf8f5] text-[#1a1410] hover:bg-[#ede7de]"}`}
        style={open ? { backgroundColor: ACCENT } : {}}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${open ? "bg-white/20 text-white/80" : "bg-[#c9b8a4]/30 text-[#6a5c7a]"}`}>{no}</span>
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
export type EcBrief = {
  // Overview
  consultType: string[]; consultTypeOther: string;
  consultSummary: string; topPriority: string; decisionsStatus: string;
  // S01
  companyBrand: string; shopName: string;
  contactPerson: string; finalApprover: string;
  currentEcUrl: string; launchDate: string;
  background: string; currentIssues: string; futureVision: string;
  // S02
  businessModel: string[]; businessModelOther: string;
  topGoal: string; successCriteria: string;
  // S03
  primaryCustomer: string; purchaseScene: string;
  decisionFactors: string;
  salesArea: string; languages: string; currencies: string;
  ageRestriction: string; corporateBuying: string; memberGuest: string;
  shippingExclusions: string;
  // S04
  productCategories: string; initialProductCount: string;
  skuCount: string; monthlyAdditions: string;
  priceRange: string; preorder: string;
  productFeatures: string[]; productFeaturesOther: string;
  productDataFormat: string; contentProduction: string;
  // S05
  platform: string[]; platformOther: string;
  requiredFeatures: string[]; requiredFeaturesOther: string;
  featurePriority: string;
  brandImage: string; mobileExperience: string;
  // S06
  promotionFeatures: string[]; promotionFeaturesOther: string;
  pricingRules: string; membershipRules: string;
  subscriptionRules: string; discountApprover: string;
  // S07
  inventoryLocation: string; inventorySystem: string;
  stockUpdateMethod: string; outOfStockPolicy: string;
  stocktakeFreq: string; safetyStock: string;
  allocationRules: string; lotManagement: string;
  // S08
  paymentMethods: string[]; paymentMethodsOther: string;
  paymentProvider: string; paymentCycle: string;
  fee3dSecure: string; fraudDetection: string;
  receiptInvoice: string;
  failedPaymentPolicy: string; chargebackPolicy: string;
  // S09
  shippingCompany: string; shippingBase: string;
  businessDays: string; temperatureZone: string;
  trackingNotification: string; dateSpecification: string;
  bundleShippingPolicy: string; packagingPolicy: string;
  // S10
  inquiryContact: string; responseHours: string;
  replyTime: string; returnDeadline: string;
  returnShippingFee: string; exchangePolicy: string;
  supportChannels: string[]; supportChannelsOther: string;
  cancellationPolicy: string; defectPolicy: string; templatePolicy: string;
  // S11
  requiredDocs: string[]; requiredDocsOther: string;
  legalNotes: string; taxNotes: string;
  privacyPolicy: string; legalReviewer: string;
  // S12
  integrations: string[]; integrationsOther: string;
  migrationTarget: string; dataStatus: string; redirectPlan: string;
  // S13
  trafficChannels: string[]; trafficChannelsOther: string;
  analyticsTools: string[]; analyticsToolsOther: string;
  reportingCycle: string; maintenancePolicy: string;
  // S14
  initialBudget: string; monthlySystemFee: string;
  monthlyOperationBudget: string; launchTarget: string;
  estimateDeadline: string; paymentTerms: string;
  scope: string[]; scopeOther: string;
  budgetPriority: string; deliveryConditions: string; additionalFeeQuestions: string;
  // S15
  finalPurpose: string; finalTarget: string;
  mustConditions: string; outOfScope: string;
  mainKpi: string; risks: string;
};

export const EMPTY_EC_BRIEF: EcBrief = {
  consultType: [], consultTypeOther: "", consultSummary: "", topPriority: "", decisionsStatus: "",
  companyBrand: "", shopName: "", contactPerson: "", finalApprover: "",
  currentEcUrl: "", launchDate: "",
  background: "", currentIssues: "", futureVision: "",
  businessModel: [], businessModelOther: "", topGoal: "", successCriteria: "",
  primaryCustomer: "", purchaseScene: "", decisionFactors: "",
  salesArea: "", languages: "", currencies: "", ageRestriction: "",
  corporateBuying: "", memberGuest: "", shippingExclusions: "",
  productCategories: "", initialProductCount: "", skuCount: "", monthlyAdditions: "",
  priceRange: "", preorder: "",
  productFeatures: [], productFeaturesOther: "",
  productDataFormat: "", contentProduction: "",
  platform: [], platformOther: "",
  requiredFeatures: [], requiredFeaturesOther: "", featurePriority: "",
  brandImage: "", mobileExperience: "",
  promotionFeatures: [], promotionFeaturesOther: "",
  pricingRules: "", membershipRules: "", subscriptionRules: "", discountApprover: "",
  inventoryLocation: "", inventorySystem: "",
  stockUpdateMethod: "", outOfStockPolicy: "", stocktakeFreq: "", safetyStock: "",
  allocationRules: "", lotManagement: "",
  paymentMethods: [], paymentMethodsOther: "",
  paymentProvider: "", paymentCycle: "", fee3dSecure: "", fraudDetection: "",
  receiptInvoice: "", failedPaymentPolicy: "", chargebackPolicy: "",
  shippingCompany: "", shippingBase: "", businessDays: "", temperatureZone: "",
  trackingNotification: "", dateSpecification: "",
  bundleShippingPolicy: "", packagingPolicy: "",
  inquiryContact: "", responseHours: "", replyTime: "", returnDeadline: "",
  returnShippingFee: "", exchangePolicy: "",
  supportChannels: [], supportChannelsOther: "",
  cancellationPolicy: "", defectPolicy: "", templatePolicy: "",
  requiredDocs: [], requiredDocsOther: "",
  legalNotes: "", taxNotes: "", privacyPolicy: "", legalReviewer: "",
  integrations: [], integrationsOther: "",
  migrationTarget: "", dataStatus: "", redirectPlan: "",
  trafficChannels: [], trafficChannelsOther: "",
  analyticsTools: [], analyticsToolsOther: "",
  reportingCycle: "", maintenancePolicy: "",
  initialBudget: "", monthlySystemFee: "", monthlyOperationBudget: "",
  launchTarget: "", estimateDeadline: "", paymentTerms: "",
  scope: [], scopeOther: "",
  budgetPriority: "", deliveryConditions: "", additionalFeeQuestions: "",
  finalPurpose: "", finalTarget: "", mustConditions: "", outOfScope: "", mainKpi: "", risks: "",
};

/* ─── Main Component ─── */
export default function EcBriefForm({ brief, onChange }: { brief: EcBrief; onChange: (b: EcBrief) => void }) {
  const [open, setOpen] = useState<string | null>("OV");
  const s = (key: keyof EcBrief) => (val: string) => onChange({ ...brief, [key]: val });
  const t = (key: keyof EcBrief, val: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], val) });
  const tog = (id: string) => setOpen((o) => o === id ? null : id);

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
        <div className="flex items-center gap-2 py-2 px-4 rounded-lg" style={{ backgroundColor: `${ACCENT}18` }}>
          <span className="text-lg">◇</span>
          <span className="font-semibold text-sm tracking-wide" style={{ color: ACCENT }}>EC制作 詳細ヒアリング</span>
        </div>
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
      </div>

      {/* Overview */}
      <Acc no="OV" title="案件の全体像" required open={open === "OV"} onToggle={() => tog("OV")}>
        <div><FL required>今回の相談内容</FL>
          <Checks cols={3}
            options={["新規EC立ち上げ","ECリニューアル","カート移行","D2C","BtoB EC","定期購入","越境EC","モール連携","未定／相談したい"]}
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
      <Acc no="S01" title="基本情報・EC事業背景" required open={open === "S01"} onToggle={() => tog("S01")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>会社・ブランド名</FL><Inp value={brief.companyBrand} onChange={s("companyBrand")} placeholder="会社名またはブランド名" /></div>
          <div><FL>ショップ名</FL><Inp value={brief.shopName} onChange={s("shopName")} placeholder="ECショップの名称" /></div>
          <div><FL>窓口担当者</FL><Inp value={brief.contactPerson} onChange={s("contactPerson")} placeholder="担当者名" /></div>
          <div><FL>最終決裁者</FL><Inp value={brief.finalApprover} onChange={s("finalApprover")} placeholder="承認権限者" /></div>
          <div><FL>現行EC URL</FL><Inp value={brief.currentEcUrl} onChange={s("currentEcUrl")} placeholder="https://（なければ空白）" /></div>
          <div><FL>公開希望日</FL><Inp type="date" value={brief.launchDate} onChange={s("launchDate")} /></div>
        </div>
        <div><FL required>ECを立ち上げる／見直す背景</FL>
          <Txt value={brief.background} onChange={s("background")} placeholder="なぜ今ECが必要ですか？背景をご記入ください" rows={3} /></div>
        <div><FL required>現状の販売課題・運用課題</FL>
          <Txt value={brief.currentIssues} onChange={s("currentIssues")} placeholder="現状困っていること、改善したい点" rows={2} /></div>
        <div><FL>1年後の事業像</FL>
          <Txt value={brief.futureVision} onChange={s("futureVision")} placeholder="1年後に目指したい姿・売上規模・ブランドポジション" rows={2} /></div>
      </Acc>

      {/* S02 */}
      <Acc no="S02" title="事業モデル・目標・KPI" required open={open === "S02"} onToggle={() => tog("S02")}>
        <div><FL required>事業形態</FL>
          <Checks cols={3}
            options={["D2C","仕入販売","メーカー直販","BtoB","卸売","マーケットプレイス","定期購入","予約販売","デジタル商品","越境"]}
            selected={brief.businessModel} onToggle={(v) => t("businessModel", v)} />
          <div className="mt-2"><Inp value={brief.businessModelOther} onChange={s("businessModelOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>最優先の事業目標とその理由</FL>
          <Txt value={brief.topGoal} onChange={s("topGoal")} placeholder="売上・CVR・客単価・リピート率など、最重要指標と根拠" rows={2} /></div>
        <div><FL>成功・撤退・見直しの判断基準</FL>
          <Txt value={brief.successCriteria} onChange={s("successCriteria")} placeholder="例：3ヶ月でCVR1%未満なら見直し、月商100万円達成で次フェーズへ" rows={2} /></div>
      </Acc>

      {/* S03 */}
      <Acc no="S03" title="顧客・市場・販売地域" required open={open === "S03"} onToggle={() => tog("S03")}>
        <div><FL required>最優先顧客</FL>
          <Txt value={brief.primaryCustomer} onChange={s("primaryCustomer")} placeholder="年齢、性別、ライフスタイル、購買行動など具体的に" rows={2} /></div>
        <div><FL>購入場面・用途・頻度・贈答需要</FL>
          <Txt value={brief.purchaseScene} onChange={s("purchaseScene")} placeholder="どんな場面で、何のために買うか。ギフト需要はあるか" rows={2} /></div>
        <div><FL required>比較ポイント・購入を止める不安</FL>
          <Txt value={brief.decisionFactors} onChange={s("decisionFactors")} placeholder="競合との比較軸、購入前の不安、解消に必要な情報" rows={2} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>販売国・地域</FL><Inp value={brief.salesArea} onChange={s("salesArea")} placeholder="例：日本全国、台湾・香港" /></div>
          <div><FL>対応言語</FL><Inp value={brief.languages} onChange={s("languages")} placeholder="例：日本語、英語" /></div>
          <div><FL>通貨</FL><Inp value={brief.currencies} onChange={s("currencies")} placeholder="例：円、USD" /></div>
          <div><FL>年齢制限</FL><Inp value={brief.ageRestriction} onChange={s("ageRestriction")} placeholder="例：20歳以上（酒類）" /></div>
          <div><FL>法人購入</FL>
            <Radios cols={2} options={["対応","非対応"]} selected={brief.corporateBuying} onSelect={s("corporateBuying")} /></div>
          <div><FL>会員／ゲスト</FL>
            <Radios cols={2} options={["会員のみ","ゲスト可"]} selected={brief.memberGuest} onSelect={s("memberGuest")} /></div>
        </div>
        <div><FL>海外・離島・配送不可地域</FL>
          <Txt value={brief.shippingExclusions} onChange={s("shippingExclusions")} placeholder="配送できない地域や条件をご記入ください" rows={2} /></div>
      </Acc>

      {/* S04 */}
      <Acc no="S04" title="商品・SKU・商品情報" required open={open === "S04"} onToggle={() => tog("S04")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>商品カテゴリ数</FL><Inp value={brief.productCategories} onChange={s("productCategories")} placeholder="例：3カテゴリ" /></div>
          <div><FL>初回商品数</FL><Inp value={brief.initialProductCount} onChange={s("initialProductCount")} placeholder="例：30品番" /></div>
          <div><FL>SKU数</FL><Inp value={brief.skuCount} onChange={s("skuCount")} placeholder="例：150SKU" /></div>
          <div><FL>月間追加数</FL><Inp value={brief.monthlyAdditions} onChange={s("monthlyAdditions")} placeholder="例：月10品番追加予定" /></div>
          <div><FL>価格帯</FL><Inp value={brief.priceRange} onChange={s("priceRange")} placeholder="例：3,000〜30,000円" /></div>
          <div><FL>予約・受注生産</FL>
            <Radios cols={2} options={["あり","なし"]} selected={brief.preorder} onSelect={s("preorder")} /></div>
        </div>
        <div><FL>商品要素</FL>
          <Checks cols={3}
            options={["サイズ・色","セット商品","オプション","名入れ","ギフト包装","デジタルDL","定期便","年齢確認","ロット・賞味期限","シリアル管理"]}
            selected={brief.productFeatures} onToggle={(v) => t("productFeatures", v)} />
          <div className="mt-2"><Inp value={brief.productFeaturesOther} onChange={s("productFeaturesOther")} placeholder="その他" /></div>
        </div>
        <div><FL>商品登録データの形式・担当・移行元</FL>
          <Txt value={brief.productDataFormat} onChange={s("productDataFormat")} placeholder="例：Excelリスト、既存ECからCSV移行、担当は内部スタッフ" rows={2} /></div>
        <div><FL>商品撮影・説明文・サイズ表・FAQの制作要否</FL>
          <Txt value={brief.contentProduction} onChange={s("contentProduction")} placeholder="制作が必要なコンテンツと、社内で用意できるもの" rows={2} /></div>
      </Acc>

      {/* S05 */}
      <Acc no="S05" title="EC基盤・機能・デザイン" required open={open === "S05"} onToggle={() => tog("S05")}>
        <div><FL>候補基盤</FL>
          <Checks cols={3}
            options={["Shopify","BASE","STORES","EC-CUBE","makeshop","カラーミー","WooCommerce","Amazon等モール","フルスクラッチ","未定"]}
            selected={brief.platform} onToggle={(v) => t("platform", v)} />
          <div className="mt-2"><Inp value={brief.platformOther} onChange={s("platformOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>必要機能</FL>
          <Checks cols={3}
            options={["商品検索","絞り込み","お気に入り","レビュー","会員","ポイント","クーポン","ギフト","再入荷通知","定期購入","予約販売","法人価格","見積","多言語・多通貨","店舗在庫","チャット"]}
            selected={brief.requiredFeatures} onToggle={(v) => t("requiredFeatures", v)} />
          <div className="mt-2"><Inp value={brief.requiredFeaturesOther} onChange={s("requiredFeaturesOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>必須機能と将来機能の優先順位</FL>
          <Txt value={brief.featurePriority} onChange={s("featurePriority")} placeholder="絶対に必要な機能と、後回しにできる機能を整理してください" rows={3} /></div>
        <div><FL>ブランドイメージ・参考EC・避けたい表現</FL>
          <Txt value={brief.brandImage} onChange={s("brandImage")} placeholder="目指すトーン、参考にしたいECサイトのURL、NGな表現" rows={2} /></div>
        <div><FL>スマホ購入で特に重視する体験</FL>
          <Txt value={brief.mobileExperience} onChange={s("mobileExperience")} placeholder="タップのしやすさ、画像の見せ方、チェックアウトの簡便さなど" rows={2} /></div>
      </Acc>

      {/* S06 */}
      <Acc no="S06" title="価格・販促・会員施策" open={open === "S06"} onToggle={() => tog("S06")}>
        <div><FL>販促機能</FL>
          <Checks cols={3}
            options={["クーポン","セール価格","まとめ買い","送料無料","会員限定","紹介制度","ポイント","ランク","誕生日","ギフト券","定期割引","初回割引"]}
            selected={brief.promotionFeatures} onToggle={(v) => t("promotionFeatures", v)} />
          <div className="mt-2"><Inp value={brief.promotionFeaturesOther} onChange={s("promotionFeaturesOther")} placeholder="その他" /></div>
        </div>
        <div><FL>通常価格・セール・併用・対象外のルール</FL>
          <Txt value={brief.pricingRules} onChange={s("pricingRules")} placeholder="値引きの適用条件、クーポンとの併用可否、セール対象外商品" rows={2} /></div>
        <div><FL>会員ランク・ポイント付与／利用／失効</FL>
          <Txt value={brief.membershipRules} onChange={s("membershipRules")} placeholder="ランク条件、ポイント付与率、有効期限ルール" rows={2} /></div>
        <div><FL>定期購入の周期・スキップ・解約・回数条件</FL>
          <Txt value={brief.subscriptionRules} onChange={s("subscriptionRules")} placeholder="定期便の仕様、解約条件、最低購入回数など" rows={2} /></div>
        <div><FL>値引き承認者・キャンペーン登録担当</FL>
          <Txt value={brief.discountApprover} onChange={s("discountApprover")} placeholder="誰が値引きを承認し、誰がシステムに登録するか" rows={2} /></div>
      </Acc>

      {/* S07 */}
      <Acc no="S07" title="在庫・倉庫・商品管理" required open={open === "S07"} onToggle={() => tog("S07")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>在庫保管場所</FL><Inp value={brief.inventoryLocation} onChange={s("inventoryLocation")} placeholder="例：自社倉庫、外部3PL" /></div>
          <div><FL>在庫管理システム</FL><Inp value={brief.inventorySystem} onChange={s("inventorySystem")} placeholder="例：ネクストエンジン、自社Excel" /></div>
          <div><FL>更新方式</FL>
            <Radios cols={3} options={["リアルタイム","定期同期","手動"]} selected={brief.stockUpdateMethod} onSelect={s("stockUpdateMethod")} /></div>
          <div><FL>欠品時</FL>
            <Radios cols={3} options={["非表示","予約","入荷通知"]} selected={brief.outOfStockPolicy} onSelect={s("outOfStockPolicy")} /></div>
          <div><FL>棚卸頻度</FL><Inp value={brief.stocktakeFreq} onChange={s("stocktakeFreq")} placeholder="例：月次、週次" /></div>
          <div><FL>安全在庫</FL><Inp value={brief.safetyStock} onChange={s("safetyStock")} placeholder="例：各SKU最低50個" /></div>
        </div>
        <div><FL required>引当・キャンセル戻し・セット品・店舗在庫のルール</FL>
          <Txt value={brief.allocationRules} onChange={s("allocationRules")} placeholder="在庫の引当タイミング、キャンセル時の戻し処理、セット品の扱い" rows={3} /></div>
        <div><FL>ロット・賞味期限・先入先出・廃棄の管理</FL>
          <Txt value={brief.lotManagement} onChange={s("lotManagement")} placeholder="食品・医薬品等で必要な管理ルール" rows={2} /></div>
      </Acc>

      {/* S08 */}
      <Acc no="S08" title="決済・不正対策・請求" required open={open === "S08"} onToggle={() => tog("S08")}>
        <div><FL required>決済方法</FL>
          <Checks cols={3}
            options={["クレジットカード","Apple Pay／Google Pay","PayPay等","Amazon Pay","楽天ペイ","後払い","代引","銀行振込","コンビニ","請求書","Shop Pay","海外決済"]}
            selected={brief.paymentMethods} onToggle={(v) => t("paymentMethods", v)} />
          <div className="mt-2"><Inp value={brief.paymentMethodsOther} onChange={s("paymentMethodsOther")} placeholder="その他" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>決済事業者</FL><Inp value={brief.paymentProvider} onChange={s("paymentProvider")} placeholder="例：Stripe、GMO-PG" /></div>
          <div><FL>入金サイクル</FL><Inp value={brief.paymentCycle} onChange={s("paymentCycle")} placeholder="例：月2回、翌月末払い" /></div>
          <div><FL>3Dセキュア</FL>
            <Radios cols={2} options={["必要","対応済"]} selected={brief.fee3dSecure} onSelect={s("fee3dSecure")} /></div>
          <div><FL>不正検知</FL><Inp value={brief.fraudDetection} onChange={s("fraudDetection")} placeholder="例：O-PLUX、Riskified" /></div>
        </div>
        <div><FL>領収書・請求書</FL>
          <Inp value={brief.receiptInvoice} onChange={s("receiptInvoice")} placeholder="例：自動PDF発行、適格請求書対応" /></div>
        <div><FL required>決済失敗・未入金・返金・部分返金の運用</FL>
          <Txt value={brief.failedPaymentPolicy} onChange={s("failedPaymentPolicy")} placeholder="各ケースの対応フローをご記入ください" rows={3} /></div>
        <div><FL>高額注文・転売・チャージバック対策</FL>
          <Txt value={brief.chargebackPolicy} onChange={s("chargebackPolicy")} placeholder="不正注文の検知・対応・予防の仕組み" rows={2} /></div>
      </Acc>

      {/* S09 */}
      <Acc no="S09" title="配送・梱包・出荷" open={open === "S09"} onToggle={() => tog("S09")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>配送会社</FL><Inp value={brief.shippingCompany} onChange={s("shippingCompany")} placeholder="例：ヤマト、佐川、日本郵便" /></div>
          <div><FL>出荷拠点</FL><Inp value={brief.shippingBase} onChange={s("shippingBase")} placeholder="出荷元の住所・施設名" /></div>
          <div><FL>営業日・締切</FL><Inp value={brief.businessDays} onChange={s("businessDays")} placeholder="例：平日午後2時までの注文は当日出荷" /></div>
          <div><FL>配送温度帯</FL><Inp value={brief.temperatureZone} onChange={s("temperatureZone")} placeholder="例：常温のみ、冷蔵対応あり" /></div>
          <div><FL>追跡通知</FL>
            <Radios cols={2} options={["必要","不要"]} selected={brief.trackingNotification} onSelect={s("trackingNotification")} /></div>
          <div><FL>置き配・日時指定</FL><Inp value={brief.dateSpecification} onChange={s("dateSpecification")} placeholder="例：日時指定可、置き配対応" /></div>
        </div>
        <div><FL>同梱・分割配送・予約商品・温度帯違いの扱い</FL>
          <Txt value={brief.bundleShippingPolicy} onChange={s("bundleShippingPolicy")} placeholder="複数商品の同梱ルール、温度帯が異なる商品の分割配送条件" rows={2} /></div>
        <div><FL>梱包資材、納品書、ギフト、環境配慮</FL>
          <Txt value={brief.packagingPolicy} onChange={s("packagingPolicy")} placeholder="箱・緩衝材の指定、エコ包装の希望、ギフト包装の対応範囲" rows={2} /></div>
      </Acc>

      {/* S10 */}
      <Acc no="S10" title="返品・キャンセル・顧客対応" required open={open === "S10"} onToggle={() => tog("S10")}>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>問い合わせ窓口</FL><Inp value={brief.inquiryContact} onChange={s("inquiryContact")} placeholder="メールアドレスや電話番号" /></div>
          <div><FL>対応時間</FL><Inp value={brief.responseHours} onChange={s("responseHours")} placeholder="例：平日10〜17時" /></div>
          <div><FL>返信目安</FL><Inp value={brief.replyTime} onChange={s("replyTime")} placeholder="例：24時間以内、2営業日以内" /></div>
          <div><FL>返品期限</FL><Inp value={brief.returnDeadline} onChange={s("returnDeadline")} placeholder="例：商品到着後8日以内" /></div>
          <div><FL>返送料負担</FL><Inp value={brief.returnShippingFee} onChange={s("returnShippingFee")} placeholder="例：不良品は当社負担、返品は顧客負担" /></div>
          <div><FL>交換対応</FL><Inp value={brief.exchangePolicy} onChange={s("exchangePolicy")} placeholder="例：サイズ交換1回まで対応" /></div>
        </div>
        <div><FL>対応チャネル</FL>
          <Checks cols={3}
            options={["メール","電話","フォーム","チャット","LINE","SNS DM","FAQ","問い合わせ管理システム"]}
            selected={brief.supportChannels} onToggle={(v) => t("supportChannels", v)} />
          <div className="mt-2"><Inp value={brief.supportChannelsOther} onChange={s("supportChannelsOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>注文変更・キャンセル可能なタイミング</FL>
          <Txt value={brief.cancellationPolicy} onChange={s("cancellationPolicy")} placeholder="出荷前まで、入金前まで、など具体的な条件" rows={2} /></div>
        <div><FL required>不良・破損・誤配送・長期不在の対応</FL>
          <Txt value={brief.defectPolicy} onChange={s("defectPolicy")} placeholder="各ケースの対応フローと補償範囲" rows={2} /></div>
        <div><FL>顧客対応テンプレート・エスカレーション先</FL>
          <Txt value={brief.templatePolicy} onChange={s("templatePolicy")} placeholder="標準回答文書の有無、複雑案件の担当者・フロー" rows={2} /></div>
      </Acc>

      {/* S11 */}
      <Acc no="S11" title="法務・税・プライバシー" required open={open === "S11"} onToggle={() => tog("S11")}>
        <div><FL>必要文書・表示</FL>
          <Checks cols={3}
            options={["特定商取引法表記","利用規約","プライバシーポリシー","返品規約","配送ポリシー","Cookie同意","未成年同意","酒類・年齢確認","食品表示","定期購入表示","適格請求書","海外規約"]}
            selected={brief.requiredDocs} onToggle={(v) => t("requiredDocs", v)} />
          <div className="mt-2"><Inp value={brief.requiredDocsOther} onChange={s("requiredDocsOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>商品カテゴリに関わる許認可・表示・注意事項</FL>
          <Txt value={brief.legalNotes} onChange={s("legalNotes")} placeholder="食品・化粧品・医薬品・酒類など規制対象商品の注意点" rows={3} /></div>
        <div><FL>税率・軽減税率・消費税・関税・インボイス対応</FL>
          <Txt value={brief.taxNotes} onChange={s("taxNotes")} placeholder="商品ごとの税率、インボイス番号の掲載要否、海外配送の関税" rows={2} /></div>
        <div><FL required>個人情報の利用目的・外部提供・保存期間</FL>
          <Txt value={brief.privacyPolicy} onChange={s("privacyPolicy")} placeholder="取得情報の種類、第三者提供の有無、データ保持期間" rows={2} /></div>
        <div><FL>法務・専門家の確認者と必要日数</FL>
          <Inp value={brief.legalReviewer} onChange={s("legalReviewer")} placeholder="例：法務部 田中さん / 確認に5営業日" /></div>
      </Acc>

      {/* S12 */}
      <Acc no="S12" title="外部連携・データ移行" open={open === "S12"} onToggle={() => tog("S12")}>
        <div><FL>連携先</FL>
          <Checks cols={3}
            options={["在庫・ERP","WMS・物流","POS","会計","CRM／MA","メール・LINE","決済","配送","モール","レビュー","広告","分析"]}
            selected={brief.integrations} onToggle={(v) => t("integrations", v)} />
          <div className="mt-2"><Inp value={brief.integrationsOther} onChange={s("integrationsOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>移行対象（商品・顧客・注文・ポイント・URL）</FL>
          <Txt value={brief.migrationTarget} onChange={s("migrationTarget")} placeholder="移行が必要なデータの種類と件数の概算" rows={2} /></div>
        <div><FL>データ件数・形式・重複・欠損・同意の状態</FL>
          <Txt value={brief.dataStatus} onChange={s("dataStatus")} placeholder="データ品質の現状と、移行前に必要なクリーニング" rows={2} /></div>
        <div><FL>旧EC停止・並行稼働・リダイレクト計画</FL>
          <Txt value={brief.redirectPlan} onChange={s("redirectPlan")} placeholder="旧URLの扱い、切り替えタイミング、SEO対策の方針" rows={2} /></div>
      </Acc>

      {/* S13 */}
      <Acc no="S13" title="集客・分析・運用体制" open={open === "S13"} onToggle={() => tog("S13")}>
        <div><FL>集客施策</FL>
          <Checks cols={3}
            options={["SEO","Instagram","TikTok","LINE","メール","検索広告","SNS広告","アフィリエイト","インフルエンサー","店舗送客","紹介","モール"]}
            selected={brief.trafficChannels} onToggle={(v) => t("trafficChannels", v)} />
          <div className="mt-2"><Inp value={brief.trafficChannelsOther} onChange={s("trafficChannelsOther")} placeholder="その他" /></div>
        </div>
        <div><FL>計測</FL>
          <Checks cols={3}
            options={["GA4","GTM","Search Console","広告タグ","ヒートマップ","CRM","LTV","商品別粗利","在庫回転","返品率"]}
            selected={brief.analyticsTools} onToggle={(v) => t("analyticsTools", v)} />
          <div className="mt-2"><Inp value={brief.analyticsToolsOther} onChange={s("analyticsToolsOther")} placeholder="その他" /></div>
        </div>
        <div><FL>最重要レポートと改善サイクル</FL>
          <Txt value={brief.reportingCycle} onChange={s("reportingCycle")} placeholder="毎週・毎月確認する指標と、改善を意思決定するサイクル" rows={2} /></div>
        <div><FL>保守・障害・バックアップ・権限管理の希望</FL>
          <Txt value={brief.maintenancePolicy} onChange={s("maintenancePolicy")} placeholder="障害時の対応フロー、バックアップ頻度、権限付与の方針" rows={2} /></div>
      </Acc>

      {/* S14 */}
      <Acc no="S14" title="予算・スケジュール・契約" required open={open === "S14"} onToggle={() => tog("S14")}>
        <div><FL required>初期予算（税別）</FL>
          <Checks cols={3}
            options={["〜50万円","50〜100万円","100〜300万円","300〜500万円","500万円〜","未定"]}
            selected={brief.initialBudget ? [brief.initialBudget] : []}
            onToggle={(v) => onChange({ ...brief, initialBudget: brief.initialBudget === v ? "" : v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>月額システム・アプリ費</FL><Inp value={brief.monthlySystemFee} onChange={s("monthlySystemFee")} placeholder="例：Shopify月額＋アプリ費" /></div>
          <div><FL>月額運用予算</FL><Inp value={brief.monthlyOperationBudget} onChange={s("monthlyOperationBudget")} placeholder="例：50,000円/月" /></div>
          <div><FL>公開希望</FL><Inp type="date" value={brief.launchTarget} onChange={s("launchTarget")} /></div>
          <div><FL>見積期限</FL><Inp type="date" value={brief.estimateDeadline} onChange={s("estimateDeadline")} /></div>
        </div>
        <div><FL>支払条件</FL>
          <Inp value={brief.paymentTerms} onChange={s("paymentTerms")} placeholder="例：着手金30%、残金は公開時" /></div>
        <div><FL>依頼範囲</FL>
          <Checks cols={3}
            options={["事業設計","要件定義","デザイン","構築","商品登録","撮影・原稿","データ移行","連携","法務ページ","テスト","集客設定","保守・運用"]}
            selected={brief.scope} onToggle={(v) => t("scope", v)} />
          <div className="mt-2"><Inp value={brief.scopeOther} onChange={s("scopeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>予算内で最優先に残す機能・商品・連携</FL>
          <Txt value={brief.budgetPriority} onChange={s("budgetPriority")} placeholder="予算が限られた場合に必ず確保すべき要件" rows={2} /></div>
        <div><FL>検収条件・納品・アカウント・データの所有権</FL>
          <Txt value={brief.deliveryConditions} onChange={s("deliveryConditions")} placeholder="検収の基準、納品物の定義、アカウント権限の帰属" rows={2} /></div>
        <div><FL>追加費用・アプリ利用料・決済手数料で確認したい点</FL>
          <Txt value={brief.additionalFeeQuestions} onChange={s("additionalFeeQuestions")} placeholder="見積外になりうる費用について不明な点" rows={2} /></div>
      </Acc>

      {/* S15 */}
      <Acc no="S15" title="EC方針まとめ・最終確認" required open={open === "S15"} onToggle={() => tog("S15")}>
        <div><FL required>今回の最優先目的</FL>
          <Txt value={brief.finalPurpose} onChange={s("finalPurpose")} placeholder="一言で：このEC構築で最も達成したいことは？" rows={2} /></div>
        <div><FL required>最優先ターゲット</FL>
          <Txt value={brief.finalTarget} onChange={s("finalTarget")} placeholder="最も届けたいお客様は誰ですか？" rows={2} /></div>
        <div><FL required>必須要件・絶対に外せない条件</FL>
          <Txt value={brief.mustConditions} onChange={s("mustConditions")} placeholder="この条件が満たされなければ進められないこと" rows={2} /></div>
        <div><FL>対象外・次期へ回す項目</FL>
          <Txt value={brief.outOfScope} onChange={s("outOfScope")} placeholder="今回はやらないこと、将来的に検討すること" rows={2} /></div>
        <div><FL>主要KPIと目標値</FL>
          <Txt value={brief.mainKpi} onChange={s("mainKpi")} placeholder="例：公開3ヶ月でCVR1%、月商500万円、リピート率20%" rows={2} /></div>
        <div><FL>最大のリスク・未決事項</FL>
          <Txt value={brief.risks} onChange={s("risks")} placeholder="現時点で懸念していること、未決定の重要事項" rows={3} /></div>
      </Acc>
    </div>
  );
}
