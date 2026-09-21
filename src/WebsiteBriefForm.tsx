import { useState } from "react";

export type WebsiteBrief = {
  // S01 プロジェクト背景
  projectBackground: string;
  mainChallenge: string;
  // S02 事業・ブランド
  businessDescription: string;
  mainProductsPricing: string;
  competitiveAdvantage: string;
  weakness: string;
  brandMission: string;
  brandImpressions: string[];
  brandImpressionOther: string;
  mainMessage: string;
  avoidExpression: string;
  // S03 サイト目的
  sitePurposes: string[];
  sitePurposeOther: string;
  topPriority: string;
  successCondition: string;
  mainConversions: string[];
  conversionOther: string;
  // S04 ターゲット
  primaryTarget: string;
  secondaryTarget: string;
  targetConcerns: string;
  comparisonPoints: string;
  trustEvidence: string;
  trafficSources: string[];
  trafficSourceOther: string;
  targetKeywords: string;
  // S05 競合・参考
  competitor1name: string; competitor1url: string; competitor1good: string; competitor1weak: string;
  competitor2name: string; competitor2url: string; competitor2good: string; competitor2weak: string;
  ref1url: string; ref1good: string; ref1element: string;
  ref2url: string; ref2good: string; ref2element: string;
  referenceAspects: string[];
  existingSiteIssues: string;
  // S06 制作範囲
  productionTargets: string[];
  productionTargetOther: string;
  // S08 デザイン
  designDirections: string[];
  designDirectionOther: string;
  designReasonEmotion: string;
  logoStatus: string;
  mainColor: string;
  subColor: string;
  accentColor: string;
  fontJa: string;
  fontEn: string;
  visualDirections: string[];
  animationStyle: string[];
  avoidDesign: string;
  // S09 機能
  basicFunctions: string[];
  contactFunctions: string[];
  ecFunctions: string[];
  // S10 問い合わせ導線
  contactMethods: string[];
  ctaText: string;
  // S12 SEO
  seoPriority: string;
  seoKeywords: string;
  // S17 スケジュール
  launchDate: string;
  launchRequired: string;
  meetingMethods: string[];
  meetingFrequency: string;
  // S18 予算
  productionBudget: string;
  paymentMethod: string;
  deliverables: string[];
  // S19 最終確認
  finalPriority: string;
  finalTarget: string;
  finalMessage: string;
};

export const EMPTY_WEBSITE_BRIEF: WebsiteBrief = {
  projectBackground: "", mainChallenge: "",
  businessDescription: "", mainProductsPricing: "", competitiveAdvantage: "",
  weakness: "", brandMission: "",
  brandImpressions: [], brandImpressionOther: "", mainMessage: "", avoidExpression: "",
  sitePurposes: [], sitePurposeOther: "", topPriority: "", successCondition: "",
  mainConversions: [], conversionOther: "",
  primaryTarget: "", secondaryTarget: "", targetConcerns: "", comparisonPoints: "",
  trustEvidence: "", trafficSources: [], trafficSourceOther: "", targetKeywords: "",
  competitor1name: "", competitor1url: "", competitor1good: "", competitor1weak: "",
  competitor2name: "", competitor2url: "", competitor2good: "", competitor2weak: "",
  ref1url: "", ref1good: "", ref1element: "",
  ref2url: "", ref2good: "", ref2element: "",
  referenceAspects: [], existingSiteIssues: "",
  productionTargets: [], productionTargetOther: "",
  designDirections: [], designDirectionOther: "", designReasonEmotion: "",
  logoStatus: "", mainColor: "", subColor: "", accentColor: "",
  fontJa: "", fontEn: "",
  visualDirections: [], animationStyle: [], avoidDesign: "",
  basicFunctions: [], contactFunctions: [], ecFunctions: [],
  contactMethods: [], ctaText: "",
  seoPriority: "", seoKeywords: "",
  launchDate: "", launchRequired: "", meetingMethods: [], meetingFrequency: "",
  productionBudget: "", paymentMethod: "", deliverables: [],
  finalPriority: "", finalTarget: "", finalMessage: "",
};

/* ─── helpers ─── */
function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function BriefInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7c6455] focus:ring-1 focus:ring-[#7c6455]/20 text-sm transition-all" />
  );
}
function BriefTextarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
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
function CheckGroup({ options, selected, onToggle, cols = 2 }: { options: string[]; selected: string[]; onToggle: (v: string) => void; cols?: number }) {
  return (
    <div className={`grid gap-2 ${cols === 3 ? "grid-cols-3" : cols === 4 ? "grid-cols-4" : "grid-cols-2"}`}>
      {options.map((o) => {
        const checked = selected.includes(o);
        return (
          <label key={o}
            className={`flex items-center gap-2.5 px-3 py-3 rounded-lg border cursor-pointer text-sm transition-all select-none ${
              checked
                ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]"
                : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7c6455] hover:bg-[#f7f3ee]"
            }`}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(o)}
              className="sr-only"
            />
            <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${
              checked ? "bg-[#c9b8a4] border-[#c9b8a4]" : "bg-white border-[#c9b8a4]"
            }`}>
              {checked && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <polyline points="1 4.5 4 7.5 10 1" stroke="#3d2b1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="leading-tight">{o}</span>
          </label>
        );
      })}
    </div>
  );
}

function RadioGroup({ options, selected, onSelect, cols = 3 }: { options: string[]; selected: string; onSelect: (v: string) => void; cols?: number }) {
  return (
    <div className={`grid gap-2 ${cols === 4 ? "grid-cols-4" : cols === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
      {options.map((o) => {
        const checked = selected === o;
        return (
          <label key={o}
            className={`flex items-center gap-2.5 px-3 py-3 rounded-lg border cursor-pointer text-sm transition-all select-none ${
              checked
                ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]"
                : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7c6455] hover:bg-[#f7f3ee]"
            }`}>
            <input
              type="radio"
              checked={checked}
              onChange={() => onSelect(checked ? "" : o)}
              className="sr-only"
            />
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

/* ─── Accordion Section ─── */
function AccSection({ sectionNo, title, required, isOpen, onToggle, children }: {
  sectionNo: string; title: string; required?: boolean;
  isOpen: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-[#c9b8a4]/40 rounded-xl overflow-hidden">
      <button type="button" onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${
          isOpen ? "bg-[#3d2b1f] text-[#f7f3ee]" : "bg-[#faf8f5] text-[#1a1410] hover:bg-[#ede7de]"
        }`}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${isOpen ? "bg-white/20 text-[#c9b8a4]" : "bg-[#c9b8a4]/30 text-[#7c6455]"}`}>{sectionNo}</span>
          <span className="font-semibold text-sm">{title}</span>
          {required && <span className={`text-xs px-2 py-0.5 rounded-full ${isOpen ? "bg-[#d4a5a5]/30 text-[#f7c5c5]" : "bg-[#d4a5a5]/20 text-[#b07070]"}`}>必須項目含む</span>}
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && <div className="px-5 py-5 bg-[#fefcfa] space-y-5">{children}</div>}
    </div>
  );
}

/* ─── Main Form ─── */
export default function WebsiteBriefForm({
  brief, onChange,
}: {
  brief: WebsiteBrief;
  onChange: (b: WebsiteBrief) => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>("S01");
  const set = (key: keyof WebsiteBrief) => (val: string) => onChange({ ...brief, [key]: val });
  const tog = (key: keyof WebsiteBrief, val: string) =>
    onChange({ ...brief, [key]: toggle(brief[key] as string[], val) });
  const toggleSection = (id: string) => setOpenSection((s) => (s === id ? null : id));

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
        <span className="text-xs font-semibold tracking-widest text-[#7c6455] uppercase px-2">Webサイト制作 詳細ヒアリング</span>
        <div className="h-px flex-1 bg-[#c9b8a4]/40" />
      </div>

      {/* S01 プロジェクト背景 */}
      <AccSection sectionNo="S01" title="プロジェクト発足の背景・課題" required isOpen={openSection === "S01"} onToggle={() => toggleSection("S01")}>
        <div><FL required>プロジェクト発足の背景・きっかけ</FL>
          <BriefTextarea value={brief.projectBackground} onChange={set("projectBackground")}
            placeholder="例：問い合わせが少ない、ブランドイメージが古い、採用を強化したい、新規事業を立ち上げるため" rows={3} /></div>
        <div><FL required>今回解決したい最重要課題</FL>
          <BriefTextarea value={brief.mainChallenge} onChange={set("mainChallenge")} placeholder="最も解決したい課題を具体的にご記入ください" rows={3} /></div>
      </AccSection>

      {/* S02 事業・ブランド */}
      <AccSection sectionNo="S02" title="事業・商品・ブランド理解" required isOpen={openSection === "S02"} onToggle={() => toggleSection("S02")}>
        <div><FL required>事業内容・提供サービス</FL>
          <BriefTextarea value={brief.businessDescription} onChange={set("businessDescription")}
            placeholder="主力事業、提供エリア、BtoB/BtoC、オンライン/店舗などもご記入ください" rows={3} /></div>
        <div><FL required>主力商品・サービスと価格帯</FL>
          <BriefTextarea value={brief.mainProductsPricing} onChange={set("mainProductsPricing")} placeholder="商品・サービス名と価格帯をご記入ください" rows={2} /></div>
        <div><FL required>お客様が選ぶ主な理由（強み・独自性・実績）</FL>
          <BriefTextarea value={brief.competitiveAdvantage} onChange={set("competitiveAdvantage")} placeholder="他社との違い、強みをご記入ください" rows={3} /></div>
        <div><FL>競合と比べて弱い点・改善したい点</FL>
          <BriefTextarea value={brief.weakness} onChange={set("weakness")} placeholder="改善したい点をご記入ください" rows={2} /></div>
        <div><FL>ブランドの理念・ミッション・創業ストーリー</FL>
          <BriefTextarea value={brief.brandMission} onChange={set("brandMission")} placeholder="理念やミッションをご記入ください" rows={2} /></div>
        <div><FL>ブランドから連想してほしい印象</FL>
          <CheckGroup cols={3}
            options={["信頼感", "高級感", "親しみやすさ", "先進性", "専門性", "安心感", "温かさ", "力強さ", "上品さ", "楽しさ", "若々しさ", "地域密着"]}
            selected={brief.brandImpressions}
            onToggle={(v) => tog("brandImpressions", v)} />
          <div className="mt-2"><BriefInput value={brief.brandImpressionOther} onChange={set("brandImpressionOther")} placeholder="その他（自由記入）" /></div>
        </div>
        <div><FL>絶対に伝えたいメッセージ／キャッチコピー</FL>
          <BriefInput value={brief.mainMessage} onChange={set("mainMessage")} placeholder="キャッチコピーや核となるメッセージ" /></div>
        <div><FL>避けたい表現・言ってはいけないこと</FL>
          <BriefInput value={brief.avoidExpression} onChange={set("avoidExpression")} placeholder="NGワード・表現をご記入ください" /></div>
      </AccSection>

      {/* S03 サイトの目的 */}
      <AccSection sectionNo="S03" title="サイトの目的・成果指標（KPI）" required isOpen={openSection === "S03"} onToggle={() => toggleSection("S03")}>
        <div><FL required>サイトの主な目的（複数可）</FL>
          <CheckGroup cols={2}
            options={["問い合わせ獲得", "見積依頼", "予約獲得", "商品販売", "来店促進", "資料請求", "採用応募", "会社・事業の信頼形成", "ブランド認知", "情報発信・SEO集客", "代理店・協業先募集", "既存顧客サポート"]}
            selected={brief.sitePurposes}
            onToggle={(v) => tog("sitePurposes", v)} />
          <div className="mt-2"><BriefInput value={brief.sitePurposeOther} onChange={set("sitePurposeOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>最優先の目的（1つ）とその理由</FL>
          <BriefTextarea value={brief.topPriority} onChange={set("topPriority")} placeholder="最も重要な目的と選んだ理由を教えてください" rows={2} /></div>
        <div><FL required>サイト公開後に「成功した」と判断できる具体的な状態</FL>
          <BriefTextarea value={brief.successCondition} onChange={set("successCondition")} placeholder="例：月10件の問い合わせ獲得、採用応募が月3件以上" rows={2} /></div>
        <div><FL>主要なコンバージョン（成果地点）</FL>
          <CheckGroup cols={2}
            options={["フォーム送信", "電話タップ", "LINE追加", "予約完了", "購入完了", "資料ダウンロード", "店舗への経路検索", "採用応募", "SNSフォロー", "メール登録"]}
            selected={brief.mainConversions}
            onToggle={(v) => tog("mainConversions", v)} /></div>
      </AccSection>

      {/* S04 ターゲット */}
      <AccSection sectionNo="S04" title="ターゲット・顧客行動" required isOpen={openSection === "S04"} onToggle={() => toggleSection("S04")}>
        <div><FL required>最優先ターゲット</FL>
          <BriefTextarea value={brief.primaryTarget} onChange={set("primaryTarget")}
            placeholder="年齢、性別、地域、職業、役職、会社規模、家族構成、予算感など具体的に" rows={3} /></div>
        <div><FL>第2・第3ターゲット</FL>
          <BriefTextarea value={brief.secondaryTarget} onChange={set("secondaryTarget")} placeholder="サブターゲット層について" rows={2} /></div>
        <div><FL required>ターゲットが抱えている悩み・不安・不満</FL>
          <BriefTextarea value={brief.targetConcerns} onChange={set("targetConcerns")} placeholder="ターゲットの課題をご記入ください" rows={3} /></div>
        <div><FL>購入・問い合わせ前に比較するポイント</FL>
          <BriefTextarea value={brief.comparisonPoints} onChange={set("comparisonPoints")} placeholder="比較検討される要素" rows={2} /></div>
        <div><FL>不安を解消できる根拠</FL>
          <BriefTextarea value={brief.trustEvidence} onChange={set("trustEvidence")}
            placeholder="実績、事例、資格、保証、口コミ、数字、メディア掲載など" rows={2} /></div>
        <div><FL>主な流入経路（複数可）</FL>
          <CheckGroup cols={3}
            options={["Google・Yahoo!検索", "Googleマップ", "Instagram", "TikTok", "X", "YouTube", "Web広告", "紹介・口コミ", "営業資料・名刺QR", "チラシ・看板", "ポータルサイト", "既存顧客への案内"]}
            selected={brief.trafficSources}
            onToggle={(v) => tog("trafficSources", v)} />
          <div className="mt-2"><BriefInput value={brief.trafficSourceOther} onChange={set("trafficSourceOther")} placeholder="その他" /></div>
        </div>
        <div><FL>よく検索される／されたいキーワード</FL>
          <BriefTextarea value={brief.targetKeywords} onChange={set("targetKeywords")} placeholder="例：渋谷 美容院、オーガニック コスメ" rows={2} /></div>
      </AccSection>

      {/* S05 競合・参考サイト */}
      <AccSection sectionNo="S05" title="競合・参考サイト" isOpen={openSection === "S05"} onToggle={() => toggleSection("S05")}>
        <div className="space-y-4">
          <p className="text-xs text-[#7c6455]">競合サイト（最大2社）</p>
          {([
            { label: "競合1", nameKey: "competitor1name", urlKey: "competitor1url", goodKey: "competitor1good", weakKey: "competitor1weak" },
            { label: "競合2", nameKey: "competitor2name", urlKey: "competitor2url", goodKey: "competitor2good", weakKey: "competitor2weak" },
          ] as const).map((c) => (
            <div key={c.label} className="bg-white border border-[#c9b8a4]/40 rounded-lg p-4 space-y-2">
              <p className="text-xs font-semibold text-[#7c6455] mb-2">{c.label}</p>
              <div className="grid grid-cols-2 gap-2">
                <BriefInput value={brief[c.nameKey]} onChange={set(c.nameKey)} placeholder="会社名・サイト名" />
                <BriefInput value={brief[c.urlKey]} onChange={set(c.urlKey)} placeholder="https://..." />
              </div>
              <BriefInput value={brief[c.goodKey]} onChange={set(c.goodKey)} placeholder="良い点" />
              <BriefInput value={brief[c.weakKey]} onChange={set(c.weakKey)} placeholder="弱い点・差別化ポイント" />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <p className="text-xs text-[#7c6455]">参考・好きなサイト（最大2件）</p>
          {([
            { label: "参考1", urlKey: "ref1url", goodKey: "ref1good", elKey: "ref1element" },
            { label: "参考2", urlKey: "ref2url", goodKey: "ref2good", elKey: "ref2element" },
          ] as const).map((r) => (
            <div key={r.label} className="bg-white border border-[#c9b8a4]/40 rounded-lg p-4 space-y-2">
              <p className="text-xs font-semibold text-[#7c6455] mb-2">{r.label}</p>
              <BriefInput value={brief[r.urlKey]} onChange={set(r.urlKey)} placeholder="https://..." />
              <BriefInput value={brief[r.goodKey]} onChange={set(r.goodKey)} placeholder="好きな点" />
              <BriefInput value={brief[r.elKey]} onChange={set(r.elKey)} placeholder="取り入れたい要素" />
            </div>
          ))}
        </div>
        <div><FL>参考にしたい観点</FL>
          <CheckGroup cols={3}
            options={["全体の雰囲気", "配色", "字体", "写真", "余白", "動き・アニメーション", "ページ構成", "文章", "導線", "機能", "スマホ表示", "問い合わせのしやすさ"]}
            selected={brief.referenceAspects}
            onToggle={(v) => tog("referenceAspects", v)} /></div>
        <div><FL>既存サイトの問題点</FL>
          <BriefTextarea value={brief.existingSiteIssues} onChange={set("existingSiteIssues")}
            placeholder="デザイン・更新・速度・集客・スマホ・セキュリティ等の問題点" rows={2} /></div>
      </AccSection>

      {/* S06 制作範囲 */}
      <AccSection sectionNo="S06" title="制作範囲・ページ構成" isOpen={openSection === "S06"} onToggle={() => toggleSection("S06")}>
        <div><FL>制作対象（複数可）</FL>
          <CheckGroup cols={2}
            options={["PC・スマホ対応Webサイト", "ランディングページ", "ECサイト", "採用サイト", "ブログ／お知らせ", "会員サイト", "予約サイト", "外国語ページ", "ロゴ・VI", "写真撮影", "動画撮影・編集", "文章作成", "図解・イラスト", "印刷物・営業資料", "SNS初期設計", "広告用クリエイティブ"]}
            selected={brief.productionTargets}
            onToggle={(v) => tog("productionTargets", v)} />
          <div className="mt-2"><BriefInput value={brief.productionTargetOther} onChange={set("productionTargetOther")} placeholder="その他" /></div>
        </div>
      </AccSection>

      {/* S08 デザイン */}
      <AccSection sectionNo="S08" title="デザイン・ブランド表現" required isOpen={openSection === "S08"} onToggle={() => toggleSection("S08")}>
        <div><FL required>希望するデザインの方向性</FL>
          <CheckGroup cols={3}
            options={["シンプル", "ミニマル", "ラグジュアリー", "上品", "かわいい", "ナチュラル", "親しみやすい", "スタイリッシュ", "クール", "和風", "未来的", "力強い", "誠実・堅実", "楽しい・ポップ", "温かい", "写真中心"]}
            selected={brief.designDirections}
            onToggle={(v) => tog("designDirections", v)} />
          <div className="mt-2"><BriefInput value={brief.designDirectionOther} onChange={set("designDirectionOther")} placeholder="その他" /></div>
        </div>
        <div><FL required>その印象を選んだ理由・顧客へ与えたい感情</FL>
          <BriefTextarea value={brief.designReasonEmotion} onChange={set("designReasonEmotion")} placeholder="理由や感情をご記入ください" rows={2} /></div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <FL>ロゴデータ</FL>
            <RadioGroup cols={1} options={["あり", "なし", "制作希望"]} selected={brief.logoStatus}
              onSelect={(v) => onChange({ ...brief, logoStatus: v })} />
          </div>
          <div>
            <FL>メインカラー</FL>
            <BriefInput value={brief.mainColor} onChange={set("mainColor")} placeholder="色名 / #XXXXXX" />
          </div>
          <div>
            <FL>サブカラー</FL>
            <BriefInput value={brief.subColor} onChange={set("subColor")} placeholder="色名 / #XXXXXX" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><FL>指定フォント（和文）</FL><BriefInput value={brief.fontJa} onChange={set("fontJa")} placeholder="例：游ゴシック" /></div>
          <div><FL>指定フォント（欧文）</FL><BriefInput value={brief.fontEn} onChange={set("fontEn")} placeholder="例：Helvetica" /></div>
        </div>
        <div><FL>写真・ビジュアルの方向性</FL>
          <CheckGroup cols={3}
            options={["人物中心", "商品中心", "店舗・空間中心", "実績・施工中心", "イラスト中心", "余白多め", "明るい", "暗め・重厚", "自然光", "スタジオ撮影", "動画を多用", "3D・CG"]}
            selected={brief.visualDirections}
            onToggle={(v) => tog("visualDirections", v)} /></div>
        <div><FL>動き・演出</FL>
          <CheckGroup cols={3}
            options={["ほぼ静的", "控えめなフェード", "スクロール演出", "パララックス", "動画背景", "ローディング演出", "マウス連動", "おまかせ"]}
            selected={brief.animationStyle}
            onToggle={(v) => tog("animationStyle", v)} /></div>
        <div><FL required>絶対に避けたい色・表現・レイアウト・演出</FL>
          <BriefTextarea value={brief.avoidDesign} onChange={set("avoidDesign")} placeholder="NGの色、レイアウト、表現をご記入ください" rows={2} /></div>
      </AccSection>

      {/* S09 機能要件 */}
      <AccSection sectionNo="S09" title="必要機能・システム要件" isOpen={openSection === "S09"} onToggle={() => toggleSection("S09")}>
        <div><FL>基本機能</FL>
          <CheckGroup cols={2}
            options={["スマホ最適化", "お知らせ投稿", "ブログ投稿", "実績・事例投稿", "スタッフ紹介更新", "FAQ更新", "サイト内検索", "PDF掲載", "動画埋め込み", "SNS埋め込み", "多言語切替"]}
            selected={brief.basicFunctions}
            onToggle={(v) => tog("basicFunctions", v)} /></div>
        <div><FL>問い合わせ・予約</FL>
          <CheckGroup cols={2}
            options={["問い合わせフォーム", "複数フォーム", "自動返信メール", "ファイル添付", "確認画面", "スパム対策", "カレンダー予約", "オンライン決済", "LINE連携", "電話タップ", "チャット"]}
            selected={brief.contactFunctions}
            onToggle={(v) => tog("contactFunctions", v)} /></div>
        <div><FL>会員・EC・業務連携</FL>
          <CheckGroup cols={2}
            options={["商品販売", "在庫管理", "会員登録・ログイン", "マイページ", "限定コンテンツ", "顧客管理（CRM）連携", "メール配信連携", "求人応募管理", "資料ダウンロード"]}
            selected={brief.ecFunctions}
            onToggle={(v) => tog("ecFunctions", v)} /></div>
      </AccSection>

      {/* S10 問い合わせ導線 */}
      <AccSection sectionNo="S10" title="問い合わせ・予約・購入導線" required isOpen={openSection === "S10"} onToggle={() => toggleSection("S10")}>
        <div><FL required>優先する問い合わせ方法</FL>
          <CheckGroup cols={3}
            options={["フォーム", "電話", "LINE", "メール", "予約システム", "店舗来店", "資料請求", "オンライン相談"]}
            selected={brief.contactMethods}
            onToggle={(v) => tog("contactMethods", v)} /></div>
        <div><FL>ボタンに表示したい文言</FL>
          <BriefInput value={brief.ctaText} onChange={set("ctaText")} placeholder="例：無料相談を予約する、30秒で見積依頼、LINEで質問する" /></div>
      </AccSection>

      {/* S12 SEO */}
      <AccSection sectionNo="S12" title="SEO・MEO・検索表示" isOpen={openSection === "S12"} onToggle={() => toggleSection("S12")}>
        <div><FL>SEOの優先度</FL>
          <RadioGroup cols={4} options={["最優先", "重要", "最低限", "今回は対象外"]}
            selected={brief.seoPriority}
            onSelect={(v) => onChange({ ...brief, seoPriority: v })} /></div>
        <div><FL>最も獲得したい検索キーワード</FL>
          <BriefTextarea value={brief.seoKeywords} onChange={set("seoKeywords")} placeholder="例：渋谷 美容院 縮毛矯正、東京 Web制作 格安" rows={2} /></div>
      </AccSection>

      {/* S17 スケジュール */}
      <AccSection sectionNo="S17" title="スケジュール・打ち合わせ" required isOpen={openSection === "S17"} onToggle={() => toggleSection("S17")}>
        <div className="grid grid-cols-2 gap-4">
          <div><FL>公開希望日</FL>
            <BriefInput value={brief.launchDate} onChange={set("launchDate")} placeholder="例：2025年10月末" /></div>
          <div><FL>必須 or 希望</FL>
            <RadioGroup cols={2} options={["必須", "希望"]}
              selected={brief.launchRequired}
              onSelect={(v) => onChange({ ...brief, launchRequired: v })} /></div>
        </div>
        <div><FL>打ち合わせ方法</FL>
          <CheckGroup cols={3}
            options={["対面", "Zoom", "Google Meet", "Microsoft Teams", "電話", "チャット中心"]}
            selected={brief.meetingMethods}
            onToggle={(v) => tog("meetingMethods", v)} /></div>
        <div><FL>定例頻度</FL>
          <RadioGroup cols={3} options={["毎週", "隔週", "月1回", "工程ごと", "必要時"]}
            selected={brief.meetingFrequency}
            onSelect={(v) => onChange({ ...brief, meetingFrequency: v })} /></div>
      </AccSection>

      {/* S18 予算 */}
      <AccSection sectionNo="S18" title="予算・見積・納品条件" isOpen={openSection === "S18"} onToggle={() => toggleSection("S18")}>
        <div><FL>制作予算（税別）</FL>
          <RadioGroup cols={3}
            options={["〜30万円", "30〜50万円", "50〜100万円", "100〜300万円", "300万円〜", "未定"]}
            selected={brief.productionBudget}
            onSelect={(v) => onChange({ ...brief, productionBudget: v })} /></div>
        <div><FL>支払希望</FL>
          <RadioGroup cols={4} options={["一括", "着手・納品", "分割", "その他"]}
            selected={brief.paymentMethod}
            onSelect={(v) => onChange({ ...brief, paymentMethod: v })} /></div>
        <div><FL>納品・権利に関する希望</FL>
          <CheckGroup cols={2}
            options={["Webサイト公開をもって納品", "データ一式納品", "デザインデータ納品", "ソースコード納品", "著作権譲渡希望", "実績掲載不可", "秘密保持契約が必要"]}
            selected={brief.deliverables}
            onToggle={(v) => tog("deliverables", v)} /></div>
      </AccSection>

      {/* S19 最終確認 */}
      <AccSection sectionNo="S19" title="要件まとめ・最終確認" required isOpen={openSection === "S19"} onToggle={() => toggleSection("S19")}>
        <div><FL required>サイトの最優先目的</FL>
          <BriefTextarea value={brief.finalPriority} onChange={set("finalPriority")} placeholder="一言でまとめると何を最も達成したいですか？" rows={2} /></div>
        <div><FL required>最優先ターゲット</FL>
          <BriefTextarea value={brief.finalTarget} onChange={set("finalTarget")} placeholder="このサイトを最も届けたい人物像" rows={2} /></div>
        <div><FL required>ブランドの核となるメッセージ</FL>
          <BriefTextarea value={brief.finalMessage} onChange={set("finalMessage")} placeholder="サイト全体を貫く一番伝えたいこと" rows={2} /></div>
      </AccSection>
    </div>
  );
}
