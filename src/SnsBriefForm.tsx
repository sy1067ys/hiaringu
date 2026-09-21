import { useState } from "react";

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}
function Inp({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#4a5c8a] focus:ring-1 focus:ring-[#4a5c8a]/20 text-sm transition-all" />
  );
}
function Txt({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#4a5c8a] focus:ring-1 focus:ring-[#4a5c8a]/20 text-sm resize-none transition-all" />
  );
}
function FL({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold tracking-wider text-[#4a5c8a] uppercase mb-1.5">
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#4a5c8a] hover:bg-[#f7f3ee]"
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#4a5c8a] hover:bg-[#f7f3ee]"
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

const ACCENT = "#4a5c8a";

function Acc({ no, title, required, open, onToggle, children }: {
  no: string; title: string; required?: boolean; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-[#c9b8a4]/40 rounded-xl overflow-hidden">
      <button type="button" onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ background: open ? ACCENT : "#faf8f5" }}>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest opacity-60" style={{ color: open ? "#f7f3ee" : ACCENT }}>{no}</span>
          <span className="font-semibold text-sm" style={{ color: open ? "#f7f3ee" : "#3d2b1f" }}>{title}</span>
          {required && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: open ? "rgba(255,255,255,0.15)" : "#f7e8e8", color: open ? "#f7f3ee" : "#c06060" }}>必須</span>}
        </div>
        <span style={{ color: open ? "#f7f3ee" : ACCENT }} className="text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 py-5 bg-[#faf8f5] space-y-5">{children}</div>}
    </div>
  );
}

export type SnsBrief = {
  // OV
  ov_scope: string[];
  ov_summary: string;
  ov_priority: string;
  ov_decided: string;
  // S01
  s01_company: string;
  s01_project: string;
  s01_contact: string;
  s01_approver: string;
  s01_website: string;
  s01_startDate: string;
  s01_background: string;
  s01_problem: string;
  s01_vision: string;
  // S02
  s02_purpose: string[];
  s02_priorityRole: string;
  s02_kpi_reach_now: string; s02_kpi_reach_3m: string; s02_kpi_reach_12m: string; s02_kpi_reach_how: string;
  s02_kpi_follow_now: string; s02_kpi_follow_3m: string; s02_kpi_follow_12m: string; s02_kpi_follow_how: string;
  s02_kpi_engage_now: string; s02_kpi_engage_3m: string; s02_kpi_engage_12m: string; s02_kpi_engage_how: string;
  s02_kpi_traffic_now: string; s02_kpi_traffic_3m: string; s02_kpi_traffic_12m: string; s02_kpi_traffic_how: string;
  s02_kpi_cv_now: string; s02_kpi_cv_3m: string; s02_kpi_cv_12m: string; s02_kpi_cv_how: string;
  s02_successCriteria: string;
  // S03
  s03_platforms: string[];
  s03_ig_url: string; s03_ig_followers: string; s03_ig_posts: string; s03_ig_issue: string;
  s03_tt_url: string; s03_tt_followers: string; s03_tt_posts: string; s03_tt_issue: string;
  s03_x_url: string; s03_x_followers: string; s03_x_posts: string; s03_x_issue: string;
  s03_yt_url: string; s03_yt_followers: string; s03_yt_posts: string; s03_yt_issue: string;
  s03_other_url: string; s03_other_followers: string; s03_other_posts: string; s03_other_issue: string;
  s03_roleDistribution: string;
  s03_pastLearnings: string;
  // S04
  s04_target: string;
  s04_usageContext: string;
  s04_needsInsights: string;
  s04_engagementTriggers: string;
  s04_avoidance: string;
  // S05
  s05_concept: string;
  s05_valuePromise: string;
  s05_tone: string[];
  s05_voiceRules: string;
  s05_ngRules: string;
  // S06
  s06_pillar_product: string; s06_pillar_product_purpose: string; s06_pillar_product_target: string; s06_pillar_product_format: string; s06_pillar_product_ratio: string;
  s06_pillar_knowhow: string; s06_pillar_knowhow_purpose: string; s06_pillar_knowhow_target: string; s06_pillar_knowhow_format: string; s06_pillar_knowhow_ratio: string;
  s06_pillar_brand: string; s06_pillar_brand_purpose: string; s06_pillar_brand_target: string; s06_pillar_brand_format: string; s06_pillar_brand_ratio: string;
  s06_pillar_case: string; s06_pillar_case_purpose: string; s06_pillar_case_target: string; s06_pillar_case_format: string; s06_pillar_case_ratio: string;
  s06_pillar_ugc: string; s06_pillar_ugc_purpose: string; s06_pillar_ugc_target: string; s06_pillar_ugc_format: string; s06_pillar_ugc_ratio: string;
  s06_formats: string[];
  s06_series: string;
  s06_annualEvents: string;
  // S07
  s07_ig_posts: string; s07_ig_video: string; s07_ig_story: string; s07_ig_timing: string;
  s07_tt_posts: string; s07_tt_video: string; s07_tt_story: string; s07_tt_timing: string;
  s07_x_posts: string; s07_x_video: string; s07_x_story: string; s07_x_timing: string;
  s07_yt_posts: string; s07_yt_video: string; s07_yt_story: string; s07_yt_timing: string;
  s07_line_posts: string; s07_line_video: string; s07_line_story: string; s07_line_timing: string;
  s07_includes: string[];
  s07_assets: string;
  s07_shootingConditions: string;
  // S08
  s08_plan_client: string; s08_plan_yoichi: string; s08_plan_deadline: string; s08_plan_approver: string;
  s08_assets_client: string; s08_assets_yoichi: string; s08_assets_deadline: string; s08_assets_approver: string;
  s08_draft_client: string; s08_draft_yoichi: string; s08_draft_deadline: string; s08_draft_approver: string;
  s08_review_client: string; s08_review_yoichi: string; s08_review_deadline: string; s08_review_approver: string;
  s08_post_client: string; s08_post_yoichi: string; s08_post_deadline: string; s08_post_approver: string;
  s08_report_client: string; s08_report_yoichi: string; s08_report_deadline: string; s08_report_approver: string;
  s08_approver: string;
  s08_reviewDays: string;
  s08_revisions: string;
  s08_urgentApproval: string;
  s08_tool: string;
  s08_delayPolicy: string;
  // S09
  s09_scope: string[];
  s09_hours: string;
  s09_responseTime: string;
  s09_responsible: string;
  s09_escalation: string;
  s09_template: string;
  s09_allowedContent: string;
  s09_crisisRules: string;
  // S10
  s10_measures: string[];
  s10_campaignDetails: string;
  s10_influencerCriteria: string;
  s10_ugcPermission: string;
  s10_legalCheck: string;
  // S11
  s11_risks: string[];
  s11_accountOwner: string;
  s11_adminCount: string;
  s11_twoFactor: string;
  s11_passwordMethod: string;
  s11_emergencyContact: string;
  s11_stopDecider: string;
  s11_crisisFlow: string;
  s11_rightsCheck: string;
  // S12
  s12_reportItems: string[];
  s12_frequency: string;
  s12_meetingFrequency: string;
  s12_format: string;
  s12_tool: string;
  s12_utm: string;
  s12_keyQuestions: string;
  s12_improvementProcess: string;
  // S13
  s13_monthlyBudget: string;
  s13_initialBudget: string;
  s13_shootingBudget: string;
  s13_startDate: string;
  s13_contractPeriod: string;
  s13_quotationDeadline: string;
  s13_contractScope: string[];
  s13_priorityWork: string;
  s13_rightsConditions: string;
  // S14
  s14_topPurpose: string;
  s14_topTarget: string;
  s14_mustHave: string;
  s14_outOfScope: string;
  s14_kpiTargets: string;
  s14_risks: string;
  s14_pending1: string; s14_pending1_owner: string; s14_pending1_deadline: string; s14_pending1_status: string;
  s14_pending2: string; s14_pending2_owner: string; s14_pending2_deadline: string; s14_pending2_status: string;
  s14_pending3: string; s14_pending3_owner: string; s14_pending3_deadline: string; s14_pending3_status: string;
  s14_clientName: string;
  s14_clientDate: string;
  s14_yoichiName: string;
  s14_yoichiDate: string;
  s14_status: string;
};

export const EMPTY_SNS_BRIEF: SnsBrief = {
  ov_scope: [], ov_summary: "", ov_priority: "", ov_decided: "",
  s01_company: "", s01_project: "", s01_contact: "", s01_approver: "", s01_website: "", s01_startDate: "",
  s01_background: "", s01_problem: "", s01_vision: "",
  s02_purpose: [], s02_priorityRole: "",
  s02_kpi_reach_now: "", s02_kpi_reach_3m: "", s02_kpi_reach_12m: "", s02_kpi_reach_how: "",
  s02_kpi_follow_now: "", s02_kpi_follow_3m: "", s02_kpi_follow_12m: "", s02_kpi_follow_how: "",
  s02_kpi_engage_now: "", s02_kpi_engage_3m: "", s02_kpi_engage_12m: "", s02_kpi_engage_how: "",
  s02_kpi_traffic_now: "", s02_kpi_traffic_3m: "", s02_kpi_traffic_12m: "", s02_kpi_traffic_how: "",
  s02_kpi_cv_now: "", s02_kpi_cv_3m: "", s02_kpi_cv_12m: "", s02_kpi_cv_how: "",
  s02_successCriteria: "",
  s03_platforms: [],
  s03_ig_url: "", s03_ig_followers: "", s03_ig_posts: "", s03_ig_issue: "",
  s03_tt_url: "", s03_tt_followers: "", s03_tt_posts: "", s03_tt_issue: "",
  s03_x_url: "", s03_x_followers: "", s03_x_posts: "", s03_x_issue: "",
  s03_yt_url: "", s03_yt_followers: "", s03_yt_posts: "", s03_yt_issue: "",
  s03_other_url: "", s03_other_followers: "", s03_other_posts: "", s03_other_issue: "",
  s03_roleDistribution: "", s03_pastLearnings: "",
  s04_target: "", s04_usageContext: "", s04_needsInsights: "", s04_engagementTriggers: "", s04_avoidance: "",
  s05_concept: "", s05_valuePromise: "", s05_tone: [], s05_voiceRules: "", s05_ngRules: "",
  s06_pillar_product: "", s06_pillar_product_purpose: "", s06_pillar_product_target: "", s06_pillar_product_format: "", s06_pillar_product_ratio: "",
  s06_pillar_knowhow: "", s06_pillar_knowhow_purpose: "", s06_pillar_knowhow_target: "", s06_pillar_knowhow_format: "", s06_pillar_knowhow_ratio: "",
  s06_pillar_brand: "", s06_pillar_brand_purpose: "", s06_pillar_brand_target: "", s06_pillar_brand_format: "", s06_pillar_brand_ratio: "",
  s06_pillar_case: "", s06_pillar_case_purpose: "", s06_pillar_case_target: "", s06_pillar_case_format: "", s06_pillar_case_ratio: "",
  s06_pillar_ugc: "", s06_pillar_ugc_purpose: "", s06_pillar_ugc_target: "", s06_pillar_ugc_format: "", s06_pillar_ugc_ratio: "",
  s06_formats: [], s06_series: "", s06_annualEvents: "",
  s07_ig_posts: "", s07_ig_video: "", s07_ig_story: "", s07_ig_timing: "",
  s07_tt_posts: "", s07_tt_video: "", s07_tt_story: "", s07_tt_timing: "",
  s07_x_posts: "", s07_x_video: "", s07_x_story: "", s07_x_timing: "",
  s07_yt_posts: "", s07_yt_video: "", s07_yt_story: "", s07_yt_timing: "",
  s07_line_posts: "", s07_line_video: "", s07_line_story: "", s07_line_timing: "",
  s07_includes: [], s07_assets: "", s07_shootingConditions: "",
  s08_plan_client: "", s08_plan_yoichi: "", s08_plan_deadline: "", s08_plan_approver: "",
  s08_assets_client: "", s08_assets_yoichi: "", s08_assets_deadline: "", s08_assets_approver: "",
  s08_draft_client: "", s08_draft_yoichi: "", s08_draft_deadline: "", s08_draft_approver: "",
  s08_review_client: "", s08_review_yoichi: "", s08_review_deadline: "", s08_review_approver: "",
  s08_post_client: "", s08_post_yoichi: "", s08_post_deadline: "", s08_post_approver: "",
  s08_report_client: "", s08_report_yoichi: "", s08_report_deadline: "", s08_report_approver: "",
  s08_approver: "", s08_reviewDays: "", s08_revisions: "", s08_urgentApproval: "", s08_tool: "", s08_delayPolicy: "",
  s09_scope: [], s09_hours: "", s09_responseTime: "", s09_responsible: "", s09_escalation: "", s09_template: "",
  s09_allowedContent: "", s09_crisisRules: "",
  s10_measures: [], s10_campaignDetails: "", s10_influencerCriteria: "", s10_ugcPermission: "", s10_legalCheck: "",
  s11_risks: [], s11_accountOwner: "", s11_adminCount: "", s11_twoFactor: "", s11_passwordMethod: "",
  s11_emergencyContact: "", s11_stopDecider: "", s11_crisisFlow: "", s11_rightsCheck: "",
  s12_reportItems: [], s12_frequency: "", s12_meetingFrequency: "", s12_format: "", s12_tool: "", s12_utm: "",
  s12_keyQuestions: "", s12_improvementProcess: "",
  s13_monthlyBudget: "", s13_initialBudget: "", s13_shootingBudget: "", s13_startDate: "", s13_contractPeriod: "",
  s13_quotationDeadline: "", s13_contractScope: [], s13_priorityWork: "", s13_rightsConditions: "",
  s14_topPurpose: "", s14_topTarget: "", s14_mustHave: "", s14_outOfScope: "", s14_kpiTargets: "", s14_risks: "",
  s14_pending1: "", s14_pending1_owner: "", s14_pending1_deadline: "", s14_pending1_status: "",
  s14_pending2: "", s14_pending2_owner: "", s14_pending2_deadline: "", s14_pending2_status: "",
  s14_pending3: "", s14_pending3_owner: "", s14_pending3_deadline: "", s14_pending3_status: "",
  s14_clientName: "", s14_clientDate: "", s14_yoichiName: "", s14_yoichiDate: "", s14_status: "",
};

type KpiRow = { label: string; nowKey: keyof SnsBrief; m3Key: keyof SnsBrief; m12Key: keyof SnsBrief; howKey: keyof SnsBrief };

function KpiTable({ brief, onChange }: { brief: SnsBrief; onChange: (b: SnsBrief) => void }) {
  const rows: KpiRow[] = [
    { label: "リーチ／表示", nowKey: "s02_kpi_reach_now", m3Key: "s02_kpi_reach_3m", m12Key: "s02_kpi_reach_12m", howKey: "s02_kpi_reach_how" },
    { label: "フォロワー／登録者", nowKey: "s02_kpi_follow_now", m3Key: "s02_kpi_follow_3m", m12Key: "s02_kpi_follow_12m", howKey: "s02_kpi_follow_how" },
    { label: "保存・反応率", nowKey: "s02_kpi_engage_now", m3Key: "s02_kpi_engage_3m", m12Key: "s02_kpi_engage_12m", howKey: "s02_kpi_engage_how" },
    { label: "サイト流入", nowKey: "s02_kpi_traffic_now", m3Key: "s02_kpi_traffic_3m", m12Key: "s02_kpi_traffic_12m", howKey: "s02_kpi_traffic_how" },
    { label: "購入・予約・応募", nowKey: "s02_kpi_cv_now", m3Key: "s02_kpi_cv_3m", m12Key: "s02_kpi_cv_12m", howKey: "s02_kpi_cv_how" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["指標","現状","3か月後","12か月後","確認方法"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.nowKey, r.m3Key, r.m12Key, r.howKey] as (keyof SnsBrief)[]).map((k) => (
                <td key={k} className="border border-[#c9b8a4]/50 p-0.5">
                  <input value={brief[k] as string} onChange={(e) => onChange({ ...brief, [k]: e.target.value })}
                    className="w-full bg-transparent px-2 py-1.5 text-[#1a1410] focus:outline-none focus:bg-white rounded text-xs" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type AccountRow = {
  label: string;
  urlKey: keyof SnsBrief;
  followersKey: keyof SnsBrief;
  postsKey: keyof SnsBrief;
  issueKey: keyof SnsBrief;
};

function AccountTable({ brief, onChange }: { brief: SnsBrief; onChange: (b: SnsBrief) => void }) {
  const rows: AccountRow[] = [
    { label: "Instagram", urlKey: "s03_ig_url", followersKey: "s03_ig_followers", postsKey: "s03_ig_posts", issueKey: "s03_ig_issue" },
    { label: "TikTok", urlKey: "s03_tt_url", followersKey: "s03_tt_followers", postsKey: "s03_tt_posts", issueKey: "s03_tt_issue" },
    { label: "X", urlKey: "s03_x_url", followersKey: "s03_x_followers", postsKey: "s03_x_posts", issueKey: "s03_x_issue" },
    { label: "YouTube", urlKey: "s03_yt_url", followersKey: "s03_yt_followers", postsKey: "s03_yt_posts", issueKey: "s03_yt_issue" },
    { label: "その他", urlKey: "s03_other_url", followersKey: "s03_other_followers", postsKey: "s03_other_posts", issueKey: "s03_other_issue" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["媒体","URL／ID","フォロワー","月間投稿","主な課題"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.urlKey, r.followersKey, r.postsKey, r.issueKey] as (keyof SnsBrief)[]).map((k) => (
                <td key={k} className="border border-[#c9b8a4]/50 p-0.5">
                  <input value={brief[k] as string} onChange={(e) => onChange({ ...brief, [k]: e.target.value })}
                    className="w-full bg-transparent px-2 py-1.5 text-[#1a1410] focus:outline-none focus:bg-white rounded text-xs" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ContentPillarKey = {
  theme: keyof SnsBrief;
  purpose: keyof SnsBrief;
  target: keyof SnsBrief;
  format: keyof SnsBrief;
  ratio: keyof SnsBrief;
};

function ContentPillarTable({ brief, onChange }: { brief: SnsBrief; onChange: (b: SnsBrief) => void }) {
  const rows: { label: string; keys: ContentPillarKey }[] = [
    { label: "商品・サービス", keys: { theme: "s06_pillar_product", purpose: "s06_pillar_product_purpose", target: "s06_pillar_product_target", format: "s06_pillar_product_format", ratio: "s06_pillar_product_ratio" } },
    { label: "ノウハウ・教育", keys: { theme: "s06_pillar_knowhow", purpose: "s06_pillar_knowhow_purpose", target: "s06_pillar_knowhow_target", format: "s06_pillar_knowhow_format", ratio: "s06_pillar_knowhow_ratio" } },
    { label: "ブランド・人", keys: { theme: "s06_pillar_brand", purpose: "s06_pillar_brand_purpose", target: "s06_pillar_brand_target", format: "s06_pillar_brand_format", ratio: "s06_pillar_brand_ratio" } },
    { label: "実績・お客様", keys: { theme: "s06_pillar_case", purpose: "s06_pillar_case_purpose", target: "s06_pillar_case_target", format: "s06_pillar_case_format", ratio: "s06_pillar_case_ratio" } },
    { label: "参加型・UGC", keys: { theme: "s06_pillar_ugc", purpose: "s06_pillar_ugc_purpose", target: "s06_pillar_ugc_target", format: "s06_pillar_ugc_format", ratio: "s06_pillar_ugc_ratio" } },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["テーマ","目的","対象","主な形式","目安比率"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.keys.purpose, r.keys.target, r.keys.format, r.keys.ratio] as (keyof SnsBrief)[]).map((k) => (
                <td key={k} className="border border-[#c9b8a4]/50 p-0.5">
                  <input value={brief[k] as string} onChange={(e) => onChange({ ...brief, [k]: e.target.value })}
                    className="w-full bg-transparent px-2 py-1.5 text-[#1a1410] focus:outline-none focus:bg-white rounded text-xs" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type VolumeRow = {
  label: string;
  postsKey: keyof SnsBrief;
  videoKey: keyof SnsBrief;
  storyKey: keyof SnsBrief;
  timingKey: keyof SnsBrief;
};

function VolumeTable({ brief, onChange }: { brief: SnsBrief; onChange: (b: SnsBrief) => void }) {
  const rows: VolumeRow[] = [
    { label: "Instagram", postsKey: "s07_ig_posts", videoKey: "s07_ig_video", storyKey: "s07_ig_story", timingKey: "s07_ig_timing" },
    { label: "TikTok", postsKey: "s07_tt_posts", videoKey: "s07_tt_video", storyKey: "s07_tt_story", timingKey: "s07_tt_timing" },
    { label: "X／Threads", postsKey: "s07_x_posts", videoKey: "s07_x_video", storyKey: "s07_x_story", timingKey: "s07_x_timing" },
    { label: "YouTube", postsKey: "s07_yt_posts", videoKey: "s07_yt_video", storyKey: "s07_yt_story", timingKey: "s07_yt_timing" },
    { label: "LINE等", postsKey: "s07_line_posts", videoKey: "s07_line_video", storyKey: "s07_line_story", timingKey: "s07_line_timing" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["媒体","投稿／月","動画／月","ストーリー等","希望曜日・時間"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.postsKey, r.videoKey, r.storyKey, r.timingKey] as (keyof SnsBrief)[]).map((k) => (
                <td key={k} className="border border-[#c9b8a4]/50 p-0.5">
                  <input value={brief[k] as string} onChange={(e) => onChange({ ...brief, [k]: e.target.value })}
                    className="w-full bg-transparent px-2 py-1.5 text-[#1a1410] focus:outline-none focus:bg-white rounded text-xs" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type WorkflowRow = {
  label: string;
  clientKey: keyof SnsBrief;
  yoichiKey: keyof SnsBrief;
  deadlineKey: keyof SnsBrief;
  approverKey: keyof SnsBrief;
};

function WorkflowTable({ brief, onChange }: { brief: SnsBrief; onChange: (b: SnsBrief) => void }) {
  const rows: WorkflowRow[] = [
    { label: "月次企画", clientKey: "s08_plan_client", yoichiKey: "s08_plan_yoichi", deadlineKey: "s08_plan_deadline", approverKey: "s08_plan_approver" },
    { label: "素材準備", clientKey: "s08_assets_client", yoichiKey: "s08_assets_yoichi", deadlineKey: "s08_assets_deadline", approverKey: "s08_assets_approver" },
    { label: "原稿・デザイン", clientKey: "s08_draft_client", yoichiKey: "s08_draft_yoichi", deadlineKey: "s08_draft_deadline", approverKey: "s08_draft_approver" },
    { label: "確認・修正", clientKey: "s08_review_client", yoichiKey: "s08_review_yoichi", deadlineKey: "s08_review_deadline", approverKey: "s08_review_approver" },
    { label: "投稿・予約", clientKey: "s08_post_client", yoichiKey: "s08_post_yoichi", deadlineKey: "s08_post_deadline", approverKey: "s08_post_approver" },
    { label: "分析・報告", clientKey: "s08_report_client", yoichiKey: "s08_report_yoichi", deadlineKey: "s08_report_deadline", approverKey: "s08_report_approver" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["工程","クライアント","YOICHI","期限／頻度","承認者"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.clientKey, r.yoichiKey, r.deadlineKey, r.approverKey] as (keyof SnsBrief)[]).map((k) => (
                <td key={k} className="border border-[#c9b8a4]/50 p-0.5">
                  <input value={brief[k] as string} onChange={(e) => onChange({ ...brief, [k]: e.target.value })}
                    className="w-full bg-transparent px-2 py-1.5 text-[#1a1410] focus:outline-none focus:bg-white rounded text-xs" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SnsBriefForm({ brief, onChange }: { brief: SnsBrief; onChange: (b: SnsBrief) => void }) {
  const [open, setOpen] = useState("OV");
  const acc = (id: string) => ({ open: open === id, onToggle: () => setOpen(open === id ? "" : id) });
  const u = (key: keyof SnsBrief) => (v: string) => onChange({ ...brief, [key]: v });
  const tc = (key: keyof SnsBrief) => (v: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], v) });

  return (
    <div className="mt-4 rounded-2xl overflow-hidden border-2" style={{ borderColor: ACCENT }}>
      <div className="px-5 py-4" style={{ background: ACCENT }}>
        <p className="text-xs font-mono tracking-widest text-white/60 uppercase mb-0.5">Hearing Sheet</p>
        <h3 className="text-lg font-bold text-white">SNS運用 詳細ヒアリング</h3>
      </div>
      <div className="p-4 bg-[#f7f3ee] space-y-3">

        {/* OV */}
        <Acc no="OV" title="案件の全体像" {...acc("OV")}>
          <div>
            <FL>今回の相談内容</FL>
            <Checks cols={2} options={["新規アカウント立ち上げ","既存アカウント改善","運用代行","投稿制作のみ","戦略・企画支援","撮影込み","コメント・DM対応込み","広告連携込み","未定／相談したい","その他"]}
              selected={brief.ov_scope} onToggle={tc("ov_scope")} />
          </div>
          <div><FL required>今回の相談内容を一言で</FL><Txt value={brief.ov_summary} onChange={u("ov_summary")} rows={2} /></div>
          <div><FL required>最優先で解決したいこと</FL><Txt value={brief.ov_priority} onChange={u("ov_priority")} rows={2} /></div>
          <div><FL>現時点で決まっていること／決まっていないこと</FL><Txt value={brief.ov_decided} onChange={u("ov_decided")} rows={2} /></div>
        </Acc>

        {/* S01 */}
        <Acc no="S01" title="基本情報・相談背景" {...acc("S01")}>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>会社・ブランド名</FL><Inp value={brief.s01_company} onChange={u("s01_company")} /></div>
            <div><FL>案件名</FL><Inp value={brief.s01_project} onChange={u("s01_project")} /></div>
            <div><FL>窓口担当者</FL><Inp value={brief.s01_contact} onChange={u("s01_contact")} /></div>
            <div><FL>最終決裁者</FL><Inp value={brief.s01_approver} onChange={u("s01_approver")} /></div>
            <div><FL>公式サイト</FL><Inp value={brief.s01_website} onChange={u("s01_website")} placeholder="https://" /></div>
            <div><FL>運用開始希望</FL><Inp value={brief.s01_startDate} onChange={u("s01_startDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
          </div>
          <div><FL required>SNS運用を始める／見直す背景</FL><Txt value={brief.s01_background} onChange={u("s01_background")} rows={3} /></div>
          <div><FL required>現在感じている問題</FL><Txt value={brief.s01_problem} onChange={u("s01_problem")} rows={2} /></div>
          <div><FL required>1年後に実現したい状態</FL><Txt value={brief.s01_vision} onChange={u("s01_vision")} rows={2} /></div>
        </Acc>

        {/* S02 */}
        <Acc no="S02" title="目的・KPI・優先順位" {...acc("S02")}>
          <div>
            <FL required>主な目的</FL>
            <Checks cols={2} options={["認知拡大","ブランド好意形成","商品理解","EC売上","来店・予約","問い合わせ","採用","ファン化","UGC創出","コミュニティ形成","カスタマーサポート","リード獲得","未定／相談したい","その他"]}
              selected={brief.s02_purpose} onToggle={tc("s02_purpose")} />
          </div>
          <div><FL required>最優先目的と、SNSが担う役割</FL><Txt value={brief.s02_priorityRole} onChange={u("s02_priorityRole")} rows={3} /></div>
          <div>
            <FL>KPI</FL>
            <KpiTable brief={brief} onChange={onChange} />
          </div>
          <div><FL>成功・失敗を判断する基準</FL><Txt value={brief.s02_successCriteria} onChange={u("s02_successCriteria")} rows={2} /></div>
        </Acc>

        {/* S03 */}
        <Acc no="S03" title="対象SNS・アカウント現状" {...acc("S03")}>
          <div>
            <FL required>対象媒体</FL>
            <Checks cols={2} options={["Instagram","TikTok","X","YouTube","LINE公式","Threads","Facebook","Pinterest","LinkedIn","note","未定／相談したい","その他"]}
              selected={brief.s03_platforms} onToggle={tc("s03_platforms")} />
          </div>
          <div>
            <FL>アカウント一覧</FL>
            <AccountTable brief={brief} onChange={onChange} />
          </div>
          <div><FL required>各媒体の役割分担・優先順位</FL><Txt value={brief.s03_roleDistribution} onChange={u("s03_roleDistribution")} rows={2} /></div>
          <div><FL>過去に成果が出た／出なかった投稿や施策</FL><Txt value={brief.s03_pastLearnings} onChange={u("s03_pastLearnings")} rows={2} /></div>
        </Acc>

        {/* S04 */}
        <Acc no="S04" title="ターゲット・インサイト" {...acc("S04")}>
          <div><FL required>最優先ターゲット</FL><Txt value={brief.s04_target} onChange={u("s04_target")} rows={3} /></div>
          <div><FL>SNSを見る場面・時間帯・利用目的</FL><Txt value={brief.s04_usageContext} onChange={u("s04_usageContext")} rows={2} /></div>
          <div><FL required>悩み・欲求・検索／閲覧テーマ</FL><Txt value={brief.s04_needsInsights} onChange={u("s04_needsInsights")} rows={3} /></div>
          <div><FL>保存・共有・コメント・購入につながる理由</FL><Txt value={brief.s04_engagementTriggers} onChange={u("s04_engagementTriggers")} rows={2} /></div>
          <div><FL>避けられる表現・離脱する理由</FL><Txt value={brief.s04_avoidance} onChange={u("s04_avoidance")} rows={2} /></div>
        </Acc>

        {/* S05 */}
        <Acc no="S05" title="ブランド・アカウント設計" {...acc("S05")}>
          <div><FL required>アカウントの一言コンセプト</FL><Txt value={brief.s05_concept} onChange={u("s05_concept")} rows={2} /></div>
          <div><FL required>ユーザーに約束する価値</FL><Txt value={brief.s05_valuePromise} onChange={u("s05_valuePromise")} rows={2} /></div>
          <div>
            <FL>トーン・印象</FL>
            <Checks cols={3} options={["専門的","親しみ","上質","先進的","ユーモア","温かい","率直","憧れ","生活感","エネルギッシュ","未定／相談したい","その他"]}
              selected={brief.s05_tone} onToggle={tc("s05_tone")} />
          </div>
          <div><FL>ブランドキーワード・口調・一人称・絵文字ルール</FL><Txt value={brief.s05_voiceRules} onChange={u("s05_voiceRules")} rows={3} /></div>
          <div><FL required>NG表現・競合比較・政治宗教・炎上リスク</FL><Txt value={brief.s05_ngRules} onChange={u("s05_ngRules")} rows={3} /></div>
        </Acc>

        {/* S06 */}
        <Acc no="S06" title="コンテンツ柱・投稿企画" {...acc("S06")}>
          <div>
            <FL>コンテンツ柱</FL>
            <ContentPillarTable brief={brief} onChange={onChange} />
          </div>
          <div>
            <FL>投稿形式</FL>
            <Checks cols={2} options={["静止画","カルーセル","縦型ショート動画","長尺動画","ストーリーズ","ライブ配信","テキスト投稿","アンケート","ユーザー投稿紹介","キャンペーン","未定／相談したい","その他"]}
              selected={brief.s06_formats} onToggle={tc("s06_formats")} />
          </div>
          <div><FL>定番シリーズ・企画案</FL><Txt value={brief.s06_series} onChange={u("s06_series")} rows={3} /></div>
          <div><FL>必ず告知したい年間イベント・発売・繁忙期</FL><Txt value={brief.s06_annualEvents} onChange={u("s06_annualEvents")} rows={2} /></div>
        </Acc>

        {/* S07 */}
        <Acc no="S07" title="投稿量・制作条件" {...acc("S07")}>
          <div>
            <FL>運用量</FL>
            <VolumeTable brief={brief} onChange={onChange} />
          </div>
          <div>
            <FL>制作に含めたいもの</FL>
            <Checks cols={2} options={["企画","台本","コピー","デザイン","写真撮影","動画撮影","編集","出演者手配","投稿設定","ハッシュタグ","サムネイル","素材管理","未定／相談したい","その他"]}
              selected={brief.s07_includes} onToggle={tc("s07_includes")} />
          </div>
          <div><FL>支給できる写真・動画・商品・資料</FL><Txt value={brief.s07_assets} onChange={u("s07_assets")} rows={2} /></div>
          <div><FL>撮影場所・出演可能者・撮影頻度・制約</FL><Txt value={brief.s07_shootingConditions} onChange={u("s07_shootingConditions")} rows={2} /></div>
        </Acc>

        {/* S08 */}
        <Acc no="S08" title="投稿フロー・承認体制" {...acc("S08")}>
          <div>
            <FL>業務分担</FL>
            <WorkflowTable brief={brief} onChange={onChange} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>承認者</FL><Inp value={brief.s08_approver} onChange={u("s08_approver")} /></div>
            <div><FL>通常確認日数</FL><Inp value={brief.s08_reviewDays} onChange={u("s08_reviewDays")} /></div>
            <div><FL>修正回数</FL><Inp value={brief.s08_revisions} onChange={u("s08_revisions")} /></div>
            <div><FL>緊急投稿の承認</FL><Inp value={brief.s08_urgentApproval} onChange={u("s08_urgentApproval")} /></div>
          </div>
          <div>
            <FL>使用ツール</FL>
            <Radios cols={3} options={["Slack","Chatwork","LINE","メール","その他"]} selected={brief.s08_tool} onSelect={u("s08_tool")} />
          </div>
          <div><FL>承認遅延・素材未提出時の扱い</FL><Txt value={brief.s08_delayPolicy} onChange={u("s08_delayPolicy")} rows={2} /></div>
        </Acc>

        {/* S09 */}
        <Acc no="S09" title="コメント・DM・コミュニティ対応" {...acc("S09")}>
          <div>
            <FL>対応範囲</FL>
            <Checks cols={2} options={["コメント返信","DM一次返信","問い合わせ振り分け","予約・在庫案内","口コミ対応","メンション反応","UGC許諾","不適切投稿の非表示・報告","未定／相談したい","その他"]}
              selected={brief.s09_scope} onToggle={tc("s09_scope")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>対応時間</FL><Inp value={brief.s09_hours} onChange={u("s09_hours")} /></div>
            <div><FL>返信目安</FL><Inp value={brief.s09_responseTime} onChange={u("s09_responseTime")} /></div>
          </div>
          <div>
            <FL>担当範囲</FL>
            <Radios cols={3} options={["クライアント","YOICHI","共同"]} selected={brief.s09_responsible} onSelect={u("s09_responsible")} />
          </div>
          <div><FL>エスカレーション先</FL><Inp value={brief.s09_escalation} onChange={u("s09_escalation")} /></div>
          <div>
            <FL>回答テンプレート</FL>
            <Radios cols={3} options={["あり","なし","作成希望"]} selected={brief.s09_template} onSelect={u("s09_template")} />
          </div>
          <div><FL required>回答してよい内容／社内確認が必要な内容</FL><Txt value={brief.s09_allowedContent} onChange={u("s09_allowedContent")} rows={2} /></div>
          <div><FL required>クレーム・誹謗中傷・個人情報の対応ルール</FL><Txt value={brief.s09_crisisRules} onChange={u("s09_crisisRules")} rows={3} /></div>
        </Acc>

        {/* S10 */}
        <Acc no="S10" title="キャンペーン・UGC・インフルエンサー" {...acc("S10")}>
          <div>
            <FL>検討施策</FL>
            <Checks cols={2} options={["プレゼント企画","ハッシュタグ企画","モニター","アンバサダー","インフルエンサー","ライブコマース","コラボ投稿","店舗連動","未定／相談したい","その他"]}
              selected={brief.s10_measures} onToggle={tc("s10_measures")} />
          </div>
          <div><FL>企画目的・景品・参加条件・実施時期</FL><Txt value={brief.s10_campaignDetails} onChange={u("s10_campaignDetails")} rows={3} /></div>
          <div><FL>起用条件・希望ジャンル・除外条件</FL><Txt value={brief.s10_influencerCriteria} onChange={u("s10_influencerCriteria")} rows={2} /></div>
          <div><FL>UGCの許諾取得・二次利用範囲</FL><Txt value={brief.s10_ugcPermission} onChange={u("s10_ugcPermission")} rows={2} /></div>
          <div><FL required>広告表記・景品表示・抽選・個人情報の確認体制</FL><Txt value={brief.s10_legalCheck} onChange={u("s10_legalCheck")} rows={2} /></div>
        </Acc>

        {/* S11 */}
        <Acc no="S11" title="危機管理・権限・セキュリティ" {...acc("S11")}>
          <div>
            <FL>想定リスク</FL>
            <Checks cols={2} options={["誤投稿","事実誤認","権利侵害","不適切表現","情報漏えい","なりすまし","乗っ取り","クレーム急増","従業員投稿","災害時投稿","未定／相談したい","その他"]}
              selected={brief.s11_risks} onToggle={tc("s11_risks")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>アカウント所有者</FL><Inp value={brief.s11_accountOwner} onChange={u("s11_accountOwner")} /></div>
            <div><FL>管理者人数</FL><Inp value={brief.s11_adminCount} onChange={u("s11_adminCount")} /></div>
          </div>
          <div>
            <FL>二要素認証</FL>
            <Radios cols={2} options={["設定済み","未設定"]} selected={brief.s11_twoFactor} onSelect={u("s11_twoFactor")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>パスワード共有方法</FL><Inp value={brief.s11_passwordMethod} onChange={u("s11_passwordMethod")} /></div>
            <div><FL>緊急連絡先</FL><Inp value={brief.s11_emergencyContact} onChange={u("s11_emergencyContact")} /></div>
            <div><FL>投稿停止の判断者</FL><Inp value={brief.s11_stopDecider} onChange={u("s11_stopDecider")} /></div>
          </div>
          <div><FL required>炎上・誤投稿時の初動、報告、削除、声明ルール</FL><Txt value={brief.s11_crisisFlow} onChange={u("s11_crisisFlow")} rows={3} /></div>
          <div><FL>素材の著作権・肖像権・音源ライセンス確認方法</FL><Txt value={brief.s11_rightsCheck} onChange={u("s11_rightsCheck")} rows={2} /></div>
        </Acc>

        {/* S12 */}
        <Acc no="S12" title="分析・レポート・改善" {...acc("S12")}>
          <div>
            <FL>報告項目</FL>
            <Checks cols={2} options={["リーチ","フォロワー増減","反応率","保存・共有","動画視聴維持","プロフィール遷移","サイト流入","コンバージョン","投稿ランキング","競合比較","コメント傾向","改善提案","未定／相談したい","その他"]}
              selected={brief.s12_reportItems} onToggle={tc("s12_reportItems")} />
          </div>
          <div>
            <FL>レポート頻度</FL>
            <Radios cols={4} options={["週次","月次","四半期","その他"]} selected={brief.s12_frequency} onSelect={u("s12_frequency")} />
          </div>
          <div><FL>定例頻度</FL><Inp value={brief.s12_meetingFrequency} onChange={u("s12_meetingFrequency")} /></div>
          <div>
            <FL>形式</FL>
            <Radios cols={3} options={["PDF","スプレッドシート","ダッシュボード"]} selected={brief.s12_format} onSelect={u("s12_format")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>分析ツール</FL><Inp value={brief.s12_tool} onChange={u("s12_tool")} /></div>
            <div>
              <FL>UTM・計測環境</FL>
              <Radios cols={3} options={["あり","なし","設定希望"]} selected={brief.s12_utm} onSelect={u("s12_utm")} />
            </div>
          </div>
          <div><FL>毎月必ず確認したい問い・経営報告に必要な数字</FL><Txt value={brief.s12_keyQuestions} onChange={u("s12_keyQuestions")} rows={2} /></div>
          <div><FL>改善施策の決裁方法・テスト許容範囲</FL><Txt value={brief.s12_improvementProcess} onChange={u("s12_improvementProcess")} rows={2} /></div>
        </Acc>

        {/* S13 */}
        <Acc no="S13" title="予算・契約・スケジュール" {...acc("S13")}>
          <div>
            <FL>月額予算（税別）</FL>
            <Radios cols={3} options={["〜10万円","10〜30万円","30〜50万円","50〜100万円","100万円〜","未定"]}
              selected={brief.s13_monthlyBudget} onSelect={u("s13_monthlyBudget")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>初期設計予算</FL><Inp value={brief.s13_initialBudget} onChange={u("s13_initialBudget")} /></div>
            <div><FL>撮影・広告別予算</FL><Inp value={brief.s13_shootingBudget} onChange={u("s13_shootingBudget")} /></div>
            <div><FL>開始希望</FL><Inp value={brief.s13_startDate} onChange={u("s13_startDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div><FL>見積期限</FL><Inp value={brief.s13_quotationDeadline} onChange={u("s13_quotationDeadline")} placeholder="〇〇年〇〇月〇〇日" /></div>
          </div>
          <div>
            <FL>契約期間</FL>
            <Radios cols={4} options={["3か月","6か月","12か月","その他"]} selected={brief.s13_contractPeriod} onSelect={u("s13_contractPeriod")} />
          </div>
          <div>
            <FL>契約に含めたい範囲</FL>
            <Checks cols={2} options={["戦略設計","企画会議","投稿制作","撮影","投稿代行","コメント・DM","キャンペーン","インフルエンサー","広告連携","レポート","定例会","ガイドライン作成","未定／相談したい","その他"]}
              selected={brief.s13_contractScope} onToggle={tc("s13_contractScope")} />
          </div>
          <div><FL required>予算内で最優先に残す媒体・業務</FL><Txt value={brief.s13_priorityWork} onChange={u("s13_priorityWork")} rows={2} /></div>
          <div><FL>納品データ・投稿素材の権利・実績掲載条件</FL><Txt value={brief.s13_rightsConditions} onChange={u("s13_rightsConditions")} rows={2} /></div>
        </Acc>

        {/* S14 */}
        <Acc no="S14" title="運用方針まとめ・最終確認" {...acc("S14")}>
          <div><FL required>今回の最優先目的</FL><Txt value={brief.s14_topPurpose} onChange={u("s14_topPurpose")} rows={2} /></div>
          <div><FL required>最優先ターゲット</FL><Txt value={brief.s14_topTarget} onChange={u("s14_topTarget")} rows={2} /></div>
          <div><FL required>必須要件・絶対に外せない条件</FL><Txt value={brief.s14_mustHave} onChange={u("s14_mustHave")} rows={2} /></div>
          <div><FL>対象外・次期へ回す項目</FL><Txt value={brief.s14_outOfScope} onChange={u("s14_outOfScope")} rows={2} /></div>
          <div><FL>主要KPIと目標値</FL><Txt value={brief.s14_kpiTargets} onChange={u("s14_kpiTargets")} rows={2} /></div>
          <div><FL>最大のリスク・未決事項</FL><Txt value={brief.s14_risks} onChange={u("s14_risks")} rows={2} /></div>
          <div>
            <FL>未決事項一覧</FL>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#e8e4de]">
                    {["未決事項","決定者","期限","決定内容／状態"].map((h) => (
                      <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {([1, 2, 3] as const).map((n) => (
                    <tr key={n} className="even:bg-[#faf8f5]">
                      {(["pending", "pending_owner", "pending_deadline", "pending_status"] as const).map((f) => {
                        const k = `s14_${f}${n}` as keyof SnsBrief;
                        return (
                          <td key={f} className="border border-[#c9b8a4]/50 p-0.5">
                            <input value={brief[k] as string} onChange={(e) => onChange({ ...brief, [k]: e.target.value })}
                              className="w-full bg-transparent px-2 py-1.5 text-[#1a1410] focus:outline-none focus:bg-white rounded text-xs" />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>クライアント氏名</FL><Inp value={brief.s14_clientName} onChange={u("s14_clientName")} /></div>
            <div><FL>クライアント確認日</FL><Inp value={brief.s14_clientDate} onChange={u("s14_clientDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div><FL>YOICHI担当者氏名</FL><Inp value={brief.s14_yoichiName} onChange={u("s14_yoichiName")} /></div>
            <div><FL>YOICHI確認日</FL><Inp value={brief.s14_yoichiDate} onChange={u("s14_yoichiDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
          </div>
          <div>
            <FL>要件の状態</FL>
            <Radios cols={2} options={["ヒアリング中","見積作成可","要件確定","再確認が必要"]} selected={brief.s14_status} onSelect={u("s14_status")} />
          </div>
        </Acc>

      </div>
    </div>
  );
}
