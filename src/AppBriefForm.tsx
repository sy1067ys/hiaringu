import { useState } from "react";

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}
function Inp({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7a6a3a] focus:ring-1 focus:ring-[#7a6a3a]/20 text-sm transition-all" />
  );
}
function Txt({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7a6a3a] focus:ring-1 focus:ring-[#7a6a3a]/20 text-sm resize-none transition-all" />
  );
}
function FL({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold tracking-wider text-[#7a6a3a] uppercase mb-1.5">
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7a6a3a] hover:bg-[#f7f3ee]"
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7a6a3a] hover:bg-[#f7f3ee]"
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

const ACCENT = "#7a6a3a";

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

export type AppBrief = {
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
  s01_url: string;
  s01_launchDate: string;
  s01_background: string;
  s01_problems: string;
  s01_vision: string;
  // S02
  s02_purpose: string[];
  s02_priorityReason: string;
  s02_kpi_reg_now: string; s02_kpi_reg_3m: string; s02_kpi_reg_12m: string; s02_kpi_reg_how: string;
  s02_kpi_mau_now: string; s02_kpi_mau_3m: string; s02_kpi_mau_12m: string; s02_kpi_mau_how: string;
  s02_kpi_cv_now: string; s02_kpi_cv_3m: string; s02_kpi_cv_12m: string; s02_kpi_cv_how: string;
  s02_kpi_ops_now: string; s02_kpi_ops_3m: string; s02_kpi_ops_12m: string; s02_kpi_ops_how: string;
  s02_kpi_other_now: string; s02_kpi_other_3m: string; s02_kpi_other_12m: string; s02_kpi_other_how: string;
  s02_successState: string;
  // S03
  s03_primaryUser: string;
  s03_secondaryUser: string;
  s03_userProblems: string;
  s03_usageContext: string;
  s03_engagementReason: string;
  s03_specialUsers: string[];
  // S04
  s04_platforms: string[];
  s04_osVersions: string;
  s04_devices: string;
  s04_regions: string;
  s04_languages: string;
  s04_usersY1: string;
  s04_usersY3: string;
  s04_ageRestriction: string;
  s04_revenueModel: string[];
  s04_pricingDetails: string;
  // S05
  s05_features: string[];
  s05_feat1_name: string; s05_feat1_purpose: string; s05_feat1_launch: string; s05_feat1_notes: string;
  s05_feat2_name: string; s05_feat2_purpose: string; s05_feat2_launch: string; s05_feat2_notes: string;
  s05_feat3_name: string; s05_feat3_purpose: string; s05_feat3_launch: string; s05_feat3_notes: string;
  s05_feat4_name: string; s05_feat4_purpose: string; s05_feat4_launch: string; s05_feat4_notes: string;
  s05_feat5_name: string; s05_feat5_purpose: string; s05_feat5_launch: string; s05_feat5_notes: string;
  s05_dependencies: string;
  // S06
  s06_flow1_scene: string; s06_flow1_start: string; s06_flow1_action: string; s06_flow1_done: string; s06_flow1_error: string;
  s06_flow2_scene: string; s06_flow2_start: string; s06_flow2_action: string; s06_flow2_done: string; s06_flow2_error: string;
  s06_flow3_scene: string; s06_flow3_start: string; s06_flow3_action: string; s06_flow3_done: string; s06_flow3_error: string;
  s06_flow4_scene: string; s06_flow4_start: string; s06_flow4_action: string; s06_flow4_done: string; s06_flow4_error: string;
  s06_screens: string;
  s06_loginDiff: string;
  s06_errorHandling: string;
  // S07
  s07_loginMethods: string[];
  s07_user_general_view: string; s07_user_general_edit: string; s07_user_general_manage: string; s07_user_general_note: string;
  s07_user_paid_view: string; s07_user_paid_edit: string; s07_user_paid_manage: string; s07_user_paid_note: string;
  s07_user_biz_view: string; s07_user_biz_edit: string; s07_user_biz_manage: string; s07_user_biz_note: string;
  s07_user_admin_view: string; s07_user_admin_edit: string; s07_user_admin_manage: string; s07_user_admin_note: string;
  s07_personalData: string;
  s07_deletionPolicy: string;
  s07_dataMigration: string;
  // S08
  s08_integrations: string[];
  s08_int1_name: string; s08_int1_data: string; s08_int1_direction: string; s08_int1_api: string; s08_int1_timing: string;
  s08_int2_name: string; s08_int2_data: string; s08_int2_direction: string; s08_int2_api: string; s08_int2_timing: string;
  s08_int3_name: string; s08_int3_data: string; s08_int3_direction: string; s08_int3_api: string; s08_int3_timing: string;
  s08_adminNeeds: string;
  s08_notifications: string;
  // S09
  s09_impression: string;
  s09_ux: string[];
  s09_ref1_name: string; s09_ref1_good: string; s09_ref1_adopt: string; s09_ref1_avoid: string;
  s09_ref2_name: string; s09_ref2_good: string; s09_ref2_adopt: string; s09_ref2_avoid: string;
  s09_ref3_name: string; s09_ref3_good: string; s09_ref3_adopt: string; s09_ref3_avoid: string;
  s09_brandAssets: string;
  s09_accessibility: string;
  // S10
  s10_concurrentUsers: string;
  s10_responseTime: string;
  s10_uptime: string;
  s10_backup: string;
  s10_monitoring: string;
  s10_compliance: string;
  s10_security: string[];
  s10_priorityConditions: string;
  s10_regulations: string;
  // S11
  s11_appleAccount: string;
  s11_googleConsole: string;
  s11_publishName: string;
  s11_distribution: string;
  s11_ageRating: string;
  s11_reviewContact: string;
  s11_testItems: string[];
  s11_acceptanceCriteria: string;
  s11_releasePolicy: string;
  // S12
  s12_operations: string[];
  s12_events: string;
  s12_opsOwner: string;
  s12_support: string;
  s12_incidentHours: string;
  s12_sla: string;
  s12_reportFrequency: string;
  s12_maintenance: string;
  s12_postLaunchHypotheses: string;
  // S13
  s13_startDate: string;
  s13_betaDate: string;
  s13_launchDate: string;
  s13_launchRequired: string;
  s13_launchReason: string;
  s13_unavailablePeriod: string;
  s13_phase1_deadline: string; s13_phase1_client: string; s13_phase1_yoichi: string; s13_phase1_done: string;
  s13_phase2_deadline: string; s13_phase2_client: string; s13_phase2_yoichi: string; s13_phase2_done: string;
  s13_phase3_deadline: string; s13_phase3_client: string; s13_phase3_yoichi: string; s13_phase3_done: string;
  s13_phase4_deadline: string; s13_phase4_client: string; s13_phase4_yoichi: string; s13_phase4_done: string;
  s13_phase5_deadline: string; s13_phase5_client: string; s13_phase5_yoichi: string; s13_phase5_done: string;
  s13_phase6_deadline: string; s13_phase6_client: string; s13_phase6_yoichi: string; s13_phase6_done: string;
  s13_approvalFlow: string;
  s13_assetSubmission: string;
  // S14
  s14_initBudget: string;
  s14_monthlyBudget: string;
  s14_budgetCap: string;
  s14_quotationDeadline: string;
  s14_payment: string;
  s14_competitive: string;
  s14_scope: string[];
  s14_priorityFeatures: string;
  s14_deliverables: string;
  s14_revisionPolicy: string;
  // S15
  s15_topPurpose: string;
  s15_topTarget: string;
  s15_mustHave: string;
  s15_outOfScope: string;
  s15_kpiTargets: string;
  s15_risks: string;
  s15_pending1: string; s15_pending1_owner: string; s15_pending1_deadline: string; s15_pending1_status: string;
  s15_pending2: string; s15_pending2_owner: string; s15_pending2_deadline: string; s15_pending2_status: string;
  s15_pending3: string; s15_pending3_owner: string; s15_pending3_deadline: string; s15_pending3_status: string;
  s15_clientName: string;
  s15_clientDate: string;
  s15_yoichiName: string;
  s15_yoichiDate: string;
  s15_status: string;
};

export const EMPTY_APP_BRIEF: AppBrief = {
  ov_scope: [], ov_summary: "", ov_priority: "", ov_decided: "",
  s01_company: "", s01_project: "", s01_contact: "", s01_approver: "", s01_url: "", s01_launchDate: "",
  s01_background: "", s01_problems: "", s01_vision: "",
  s02_purpose: [], s02_priorityReason: "",
  s02_kpi_reg_now: "", s02_kpi_reg_3m: "", s02_kpi_reg_12m: "", s02_kpi_reg_how: "",
  s02_kpi_mau_now: "", s02_kpi_mau_3m: "", s02_kpi_mau_12m: "", s02_kpi_mau_how: "",
  s02_kpi_cv_now: "", s02_kpi_cv_3m: "", s02_kpi_cv_12m: "", s02_kpi_cv_how: "",
  s02_kpi_ops_now: "", s02_kpi_ops_3m: "", s02_kpi_ops_12m: "", s02_kpi_ops_how: "",
  s02_kpi_other_now: "", s02_kpi_other_3m: "", s02_kpi_other_12m: "", s02_kpi_other_how: "",
  s02_successState: "",
  s03_primaryUser: "", s03_secondaryUser: "", s03_userProblems: "", s03_usageContext: "", s03_engagementReason: "", s03_specialUsers: [],
  s04_platforms: [], s04_osVersions: "", s04_devices: "", s04_regions: "", s04_languages: "",
  s04_usersY1: "", s04_usersY3: "", s04_ageRestriction: "", s04_revenueModel: [], s04_pricingDetails: "",
  s05_features: [],
  s05_feat1_name: "", s05_feat1_purpose: "", s05_feat1_launch: "", s05_feat1_notes: "",
  s05_feat2_name: "", s05_feat2_purpose: "", s05_feat2_launch: "", s05_feat2_notes: "",
  s05_feat3_name: "", s05_feat3_purpose: "", s05_feat3_launch: "", s05_feat3_notes: "",
  s05_feat4_name: "", s05_feat4_purpose: "", s05_feat4_launch: "", s05_feat4_notes: "",
  s05_feat5_name: "", s05_feat5_purpose: "", s05_feat5_launch: "", s05_feat5_notes: "",
  s05_dependencies: "",
  s06_flow1_scene: "", s06_flow1_start: "", s06_flow1_action: "", s06_flow1_done: "", s06_flow1_error: "",
  s06_flow2_scene: "", s06_flow2_start: "", s06_flow2_action: "", s06_flow2_done: "", s06_flow2_error: "",
  s06_flow3_scene: "", s06_flow3_start: "", s06_flow3_action: "", s06_flow3_done: "", s06_flow3_error: "",
  s06_flow4_scene: "", s06_flow4_start: "", s06_flow4_action: "", s06_flow4_done: "", s06_flow4_error: "",
  s06_screens: "", s06_loginDiff: "", s06_errorHandling: "",
  s07_loginMethods: [],
  s07_user_general_view: "", s07_user_general_edit: "", s07_user_general_manage: "", s07_user_general_note: "",
  s07_user_paid_view: "", s07_user_paid_edit: "", s07_user_paid_manage: "", s07_user_paid_note: "",
  s07_user_biz_view: "", s07_user_biz_edit: "", s07_user_biz_manage: "", s07_user_biz_note: "",
  s07_user_admin_view: "", s07_user_admin_edit: "", s07_user_admin_manage: "", s07_user_admin_note: "",
  s07_personalData: "", s07_deletionPolicy: "", s07_dataMigration: "",
  s08_integrations: [],
  s08_int1_name: "", s08_int1_data: "", s08_int1_direction: "", s08_int1_api: "", s08_int1_timing: "",
  s08_int2_name: "", s08_int2_data: "", s08_int2_direction: "", s08_int2_api: "", s08_int2_timing: "",
  s08_int3_name: "", s08_int3_data: "", s08_int3_direction: "", s08_int3_api: "", s08_int3_timing: "",
  s08_adminNeeds: "", s08_notifications: "",
  s09_impression: "", s09_ux: [],
  s09_ref1_name: "", s09_ref1_good: "", s09_ref1_adopt: "", s09_ref1_avoid: "",
  s09_ref2_name: "", s09_ref2_good: "", s09_ref2_adopt: "", s09_ref2_avoid: "",
  s09_ref3_name: "", s09_ref3_good: "", s09_ref3_adopt: "", s09_ref3_avoid: "",
  s09_brandAssets: "", s09_accessibility: "",
  s10_concurrentUsers: "", s10_responseTime: "", s10_uptime: "", s10_backup: "", s10_monitoring: "", s10_compliance: "",
  s10_security: [], s10_priorityConditions: "", s10_regulations: "",
  s11_appleAccount: "", s11_googleConsole: "", s11_publishName: "", s11_distribution: "", s11_ageRating: "", s11_reviewContact: "",
  s11_testItems: [], s11_acceptanceCriteria: "", s11_releasePolicy: "",
  s12_operations: [], s12_events: "", s12_opsOwner: "", s12_support: "", s12_incidentHours: "", s12_sla: "",
  s12_reportFrequency: "", s12_maintenance: "", s12_postLaunchHypotheses: "",
  s13_startDate: "", s13_betaDate: "", s13_launchDate: "", s13_launchRequired: "", s13_launchReason: "", s13_unavailablePeriod: "",
  s13_phase1_deadline: "", s13_phase1_client: "", s13_phase1_yoichi: "", s13_phase1_done: "",
  s13_phase2_deadline: "", s13_phase2_client: "", s13_phase2_yoichi: "", s13_phase2_done: "",
  s13_phase3_deadline: "", s13_phase3_client: "", s13_phase3_yoichi: "", s13_phase3_done: "",
  s13_phase4_deadline: "", s13_phase4_client: "", s13_phase4_yoichi: "", s13_phase4_done: "",
  s13_phase5_deadline: "", s13_phase5_client: "", s13_phase5_yoichi: "", s13_phase5_done: "",
  s13_phase6_deadline: "", s13_phase6_client: "", s13_phase6_yoichi: "", s13_phase6_done: "",
  s13_approvalFlow: "", s13_assetSubmission: "",
  s14_initBudget: "", s14_monthlyBudget: "", s14_budgetCap: "", s14_quotationDeadline: "", s14_payment: "", s14_competitive: "",
  s14_scope: [], s14_priorityFeatures: "", s14_deliverables: "", s14_revisionPolicy: "",
  s15_topPurpose: "", s15_topTarget: "", s15_mustHave: "", s15_outOfScope: "", s15_kpiTargets: "", s15_risks: "",
  s15_pending1: "", s15_pending1_owner: "", s15_pending1_deadline: "", s15_pending1_status: "",
  s15_pending2: "", s15_pending2_owner: "", s15_pending2_deadline: "", s15_pending2_status: "",
  s15_pending3: "", s15_pending3_owner: "", s15_pending3_deadline: "", s15_pending3_status: "",
  s15_clientName: "", s15_clientDate: "", s15_yoichiName: "", s15_yoichiDate: "", s15_status: "",
};

type KpiRowDef = { label: string; nowKey: keyof AppBrief; m3Key: keyof AppBrief; m12Key: keyof AppBrief; howKey: keyof AppBrief };

function KpiTable({ brief, onChange }: { brief: AppBrief; onChange: (b: AppBrief) => void }) {
  const rows: KpiRowDef[] = [
    { label: "登録者数", nowKey: "s02_kpi_reg_now", m3Key: "s02_kpi_reg_3m", m12Key: "s02_kpi_reg_12m", howKey: "s02_kpi_reg_how" },
    { label: "MAU／継続率", nowKey: "s02_kpi_mau_now", m3Key: "s02_kpi_mau_3m", m12Key: "s02_kpi_mau_12m", howKey: "s02_kpi_mau_how" },
    { label: "購入・予約・申込", nowKey: "s02_kpi_cv_now", m3Key: "s02_kpi_cv_3m", m12Key: "s02_kpi_cv_12m", howKey: "s02_kpi_cv_how" },
    { label: "業務削減時間", nowKey: "s02_kpi_ops_now", m3Key: "s02_kpi_ops_3m", m12Key: "s02_kpi_ops_12m", howKey: "s02_kpi_ops_how" },
    { label: "その他", nowKey: "s02_kpi_other_now", m3Key: "s02_kpi_other_3m", m12Key: "s02_kpi_other_12m", howKey: "s02_kpi_other_how" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["指標","現状","公開3か月後","公開12か月後","計測方法"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.nowKey, r.m3Key, r.m12Key, r.howKey] as (keyof AppBrief)[]).map((k) => (
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

type FeatRow = { label: string; nameKey: keyof AppBrief; purposeKey: keyof AppBrief; launchKey: keyof AppBrief; notesKey: keyof AppBrief };

function FeatureTable({ brief, onChange }: { brief: AppBrief; onChange: (b: AppBrief) => void }) {
  const rows: FeatRow[] = [
    { label: "機能1", nameKey: "s05_feat1_name", purposeKey: "s05_feat1_purpose", launchKey: "s05_feat1_launch", notesKey: "s05_feat1_notes" },
    { label: "機能2", nameKey: "s05_feat2_name", purposeKey: "s05_feat2_purpose", launchKey: "s05_feat2_launch", notesKey: "s05_feat2_notes" },
    { label: "機能3", nameKey: "s05_feat3_name", purposeKey: "s05_feat3_purpose", launchKey: "s05_feat3_launch", notesKey: "s05_feat3_notes" },
    { label: "機能4", nameKey: "s05_feat4_name", purposeKey: "s05_feat4_purpose", launchKey: "s05_feat4_launch", notesKey: "s05_feat4_notes" },
    { label: "機能5", nameKey: "s05_feat5_name", purposeKey: "s05_feat5_purpose", launchKey: "s05_feat5_launch", notesKey: "s05_feat5_notes" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["機能名","目的・利用者","公開時（必須/希望）","補足・制約"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              {([r.nameKey, r.purposeKey, r.launchKey, r.notesKey] as (keyof AppBrief)[]).map((k) => (
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

type FlowRow = { label: string; sceneKey: keyof AppBrief; startKey: keyof AppBrief; actionKey: keyof AppBrief; doneKey: keyof AppBrief; errorKey: keyof AppBrief };

function FlowTable({ brief, onChange }: { brief: AppBrief; onChange: (b: AppBrief) => void }) {
  const rows: FlowRow[] = [
    { label: "初回登録", sceneKey: "s06_flow1_scene", startKey: "s06_flow1_start", actionKey: "s06_flow1_action", doneKey: "s06_flow1_done", errorKey: "s06_flow1_error" },
    { label: "主要行動1", sceneKey: "s06_flow2_scene", startKey: "s06_flow2_start", actionKey: "s06_flow2_action", doneKey: "s06_flow2_done", errorKey: "s06_flow2_error" },
    { label: "主要行動2", sceneKey: "s06_flow3_scene", startKey: "s06_flow3_start", actionKey: "s06_flow3_action", doneKey: "s06_flow3_done", errorKey: "s06_flow3_error" },
    { label: "退会・解約", sceneKey: "s06_flow4_scene", startKey: "s06_flow4_start", actionKey: "s06_flow4_action", doneKey: "s06_flow4_done", errorKey: "s06_flow4_error" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["利用シーン","開始画面","主な操作","完了状態","失敗・例外"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.sceneKey, r.startKey, r.actionKey, r.doneKey, r.errorKey] as (keyof AppBrief)[]).map((k) => (
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

type UserPermRow = { label: string; viewKey: keyof AppBrief; editKey: keyof AppBrief; manageKey: keyof AppBrief; noteKey: keyof AppBrief };

function UserPermTable({ brief, onChange }: { brief: AppBrief; onChange: (b: AppBrief) => void }) {
  const rows: UserPermRow[] = [
    { label: "一般ユーザー", viewKey: "s07_user_general_view", editKey: "s07_user_general_edit", manageKey: "s07_user_general_manage", noteKey: "s07_user_general_note" },
    { label: "有料会員", viewKey: "s07_user_paid_view", editKey: "s07_user_paid_edit", manageKey: "s07_user_paid_manage", noteKey: "s07_user_paid_note" },
    { label: "店舗・法人担当", viewKey: "s07_user_biz_view", editKey: "s07_user_biz_edit", manageKey: "s07_user_biz_manage", noteKey: "s07_user_biz_note" },
    { label: "運営管理者", viewKey: "s07_user_admin_view", editKey: "s07_user_admin_edit", manageKey: "s07_user_admin_manage", noteKey: "s07_user_admin_note" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["利用者区分","閲覧","登録・編集","承認・管理","備考"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.viewKey, r.editKey, r.manageKey, r.noteKey] as (keyof AppBrief)[]).map((k) => (
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

type IntRow = { label: string; nameKey: keyof AppBrief; dataKey: keyof AppBrief; dirKey: keyof AppBrief; apiKey: keyof AppBrief; timingKey: keyof AppBrief };

function IntegrationTable({ brief, onChange }: { brief: AppBrief; onChange: (b: AppBrief) => void }) {
  const rows: IntRow[] = [
    { label: "連携1", nameKey: "s08_int1_name", dataKey: "s08_int1_data", dirKey: "s08_int1_direction", apiKey: "s08_int1_api", timingKey: "s08_int1_timing" },
    { label: "連携2", nameKey: "s08_int2_name", dataKey: "s08_int2_data", dirKey: "s08_int2_direction", apiKey: "s08_int2_api", timingKey: "s08_int2_timing" },
    { label: "連携3", nameKey: "s08_int3_name", dataKey: "s08_int3_data", dirKey: "s08_int3_direction", apiKey: "s08_int3_api", timingKey: "s08_int3_timing" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["システム名","連携データ","方向","API資料／担当","必須時期"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              {([r.nameKey, r.dataKey, r.dirKey, r.apiKey, r.timingKey] as (keyof AppBrief)[]).map((k) => (
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

type RefRow = { label: string; nameKey: keyof AppBrief; goodKey: keyof AppBrief; adoptKey: keyof AppBrief; avoidKey: keyof AppBrief };

function RefAppTable({ brief, onChange }: { brief: AppBrief; onChange: (b: AppBrief) => void }) {
  const rows: RefRow[] = [
    { label: "参考1", nameKey: "s09_ref1_name", goodKey: "s09_ref1_good", adoptKey: "s09_ref1_adopt", avoidKey: "s09_ref1_avoid" },
    { label: "参考2", nameKey: "s09_ref2_name", goodKey: "s09_ref2_good", adoptKey: "s09_ref2_adopt", avoidKey: "s09_ref2_avoid" },
    { label: "参考3", nameKey: "s09_ref3_name", goodKey: "s09_ref3_good", adoptKey: "s09_ref3_adopt", avoidKey: "s09_ref3_avoid" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["アプリ名／URL","良い点","取り入れたい点","避けたい点"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              {([r.nameKey, r.goodKey, r.adoptKey, r.avoidKey] as (keyof AppBrief)[]).map((k) => (
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

type PhaseRow = { label: string; deadlineKey: keyof AppBrief; clientKey: keyof AppBrief; yoichiKey: keyof AppBrief; doneKey: keyof AppBrief };

function ScheduleTable({ brief, onChange }: { brief: AppBrief; onChange: (b: AppBrief) => void }) {
  const rows: PhaseRow[] = [
    { label: "要件確定", deadlineKey: "s13_phase1_deadline", clientKey: "s13_phase1_client", yoichiKey: "s13_phase1_yoichi", doneKey: "s13_phase1_done" },
    { label: "UI承認", deadlineKey: "s13_phase2_deadline", clientKey: "s13_phase2_client", yoichiKey: "s13_phase2_yoichi", doneKey: "s13_phase2_done" },
    { label: "開発・連携", deadlineKey: "s13_phase3_deadline", clientKey: "s13_phase3_client", yoichiKey: "s13_phase3_yoichi", doneKey: "s13_phase3_done" },
    { label: "受入テスト", deadlineKey: "s13_phase4_deadline", clientKey: "s13_phase4_client", yoichiKey: "s13_phase4_yoichi", doneKey: "s13_phase4_done" },
    { label: "ストア申請", deadlineKey: "s13_phase5_deadline", clientKey: "s13_phase5_client", yoichiKey: "s13_phase5_yoichi", doneKey: "s13_phase5_done" },
    { label: "公開", deadlineKey: "s13_phase6_deadline", clientKey: "s13_phase6_client", yoichiKey: "s13_phase6_yoichi", doneKey: "s13_phase6_done" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["工程","期限","クライアント担当","YOICHI担当","完了条件"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.deadlineKey, r.clientKey, r.yoichiKey, r.doneKey] as (keyof AppBrief)[]).map((k) => (
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

export default function AppBriefForm({ brief, onChange }: { brief: AppBrief; onChange: (b: AppBrief) => void }) {
  const [open, setOpen] = useState("OV");
  const acc = (id: string) => ({ open: open === id, onToggle: () => setOpen(open === id ? "" : id) });
  const u = (key: keyof AppBrief) => (v: string) => onChange({ ...brief, [key]: v });
  const tc = (key: keyof AppBrief) => (v: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], v) });

  return (
    <div className="mt-4 rounded-2xl overflow-hidden border-2" style={{ borderColor: ACCENT }}>
      <div className="px-5 py-4" style={{ background: ACCENT }}>
        <p className="text-xs font-mono tracking-widest text-white/60 uppercase mb-0.5">Hearing Sheet</p>
        <h3 className="text-lg font-bold text-white">アプリ制作 詳細ヒアリング</h3>
      </div>
      <div className="p-4 bg-[#f7f3ee] space-y-3">

        {/* OV */}
        <Acc no="OV" title="案件の全体像" {...acc("OV")}>
          <div>
            <FL>今回の相談内容</FL>
            <Checks cols={2} options={["新規アプリ開発","既存アプリの全面改修","一部機能追加・改善","PoC／MVP開発","iOSアプリ","Androidアプリ","Webアプリ／PWA","管理画面・業務アプリ","未定／相談したい","その他"]}
              selected={brief.ov_scope} onToggle={tc("ov_scope")} />
          </div>
          <div><FL required>今回の相談内容を一言で</FL><Txt value={brief.ov_summary} onChange={u("ov_summary")} rows={2} /></div>
          <div><FL required>最優先で解決したいこと</FL><Txt value={brief.ov_priority} onChange={u("ov_priority")} rows={2} /></div>
          <div><FL>現時点で決まっていること／決まっていないこと</FL><Txt value={brief.ov_decided} onChange={u("ov_decided")} rows={2} /></div>
        </Acc>

        {/* S01 */}
        <Acc no="S01" title="基本情報・開発背景" {...acc("S01")}>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>会社・団体名</FL><Inp value={brief.s01_company} onChange={u("s01_company")} /></div>
            <div><FL>案件名／仮称</FL><Inp value={brief.s01_project} onChange={u("s01_project")} /></div>
            <div><FL>窓口担当者</FL><Inp value={brief.s01_contact} onChange={u("s01_contact")} /></div>
            <div><FL>最終決裁者</FL><Inp value={brief.s01_approver} onChange={u("s01_approver")} /></div>
            <div><FL>既存サービスURL</FL><Inp value={brief.s01_url} onChange={u("s01_url")} placeholder="https://" /></div>
            <div><FL>希望公開時期</FL><Inp value={brief.s01_launchDate} onChange={u("s01_launchDate")} placeholder="〇〇年〇〇月頃" /></div>
          </div>
          <div><FL required>企画・開発を検討した背景</FL><Txt value={brief.s01_background} onChange={u("s01_background")} rows={3} /></div>
          <div><FL required>現在の業務・サービスで困っていること</FL><Txt value={brief.s01_problems} onChange={u("s01_problems")} rows={3} /></div>
          <div><FL required>アプリで実現したい状態</FL><Txt value={brief.s01_vision} onChange={u("s01_vision")} rows={3} /></div>
        </Acc>

        {/* S02 */}
        <Acc no="S02" title="事業目的・成功条件" {...acc("S02")}>
          <div>
            <FL required>主な目的</FL>
            <Checks cols={2} options={["新規顧客獲得","売上・課金","予約・注文","顧客継続率向上","業務効率化","会員化・囲い込み","ブランド体験","データ収集","社内DX","新規事業検証","未定／相談したい","その他"]}
              selected={brief.s02_purpose} onToggle={tc("s02_purpose")} />
          </div>
          <div><FL required>最優先の目的と、その理由</FL><Txt value={brief.s02_priorityReason} onChange={u("s02_priorityReason")} rows={3} /></div>
          <div>
            <FL>KPI・目標</FL>
            <KpiTable brief={brief} onChange={onChange} />
          </div>
          <div><FL required>公開後に成功と判断できる具体的な状態</FL><Txt value={brief.s02_successState} onChange={u("s02_successState")} rows={2} /></div>
        </Acc>

        {/* S03 */}
        <Acc no="S03" title="ターゲットユーザー・利用場面" {...acc("S03")}>
          <div><FL required>最優先ユーザー像（年齢・職業・IT習熟度・利用端末・地域・利用頻度など）</FL><Txt value={brief.s03_primaryUser} onChange={u("s03_primaryUser")} rows={3} /></div>
          <div><FL>第2・第3ユーザー／管理者ユーザー</FL><Txt value={brief.s03_secondaryUser} onChange={u("s03_secondaryUser")} rows={2} /></div>
          <div><FL required>ユーザーが抱える課題・不満・代替手段</FL><Txt value={brief.s03_userProblems} onChange={u("s03_userProblems")} rows={3} /></div>
          <div><FL required>主な利用場面・場所・時間帯</FL><Txt value={brief.s03_usageContext} onChange={u("s03_usageContext")} rows={2} /></div>
          <div><FL>利用を始めるきっかけ／継続する理由</FL><Txt value={brief.s03_engagementReason} onChange={u("s03_engagementReason")} rows={2} /></div>
          <div>
            <FL>配慮が必要なユーザー</FL>
            <Checks cols={2} options={["高齢者","子ども","外国語話者","視覚・聴覚への配慮","片手操作","低速回線","法人管理者","店舗スタッフ","未定／相談したい","その他"]}
              selected={brief.s03_specialUsers} onToggle={tc("s03_specialUsers")} />
          </div>
        </Acc>

        {/* S04 */}
        <Acc no="S04" title="提供形態・プラットフォーム" {...acc("S04")}>
          <div>
            <FL required>対象プラットフォーム</FL>
            <Checks cols={2} options={["iOS","Android","iPad／タブレット","Webアプリ","PWA","Windows／Mac","Apple Watch等","専用端末・キオスク","未定／相談したい","その他"]}
              selected={brief.s04_platforms} onToggle={tc("s04_platforms")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>対応OS・バージョン</FL><Inp value={brief.s04_osVersions} onChange={u("s04_osVersions")} /></div>
            <div><FL>対応端末・画面サイズ</FL><Inp value={brief.s04_devices} onChange={u("s04_devices")} /></div>
            <div><FL>提供国・地域</FL><Inp value={brief.s04_regions} onChange={u("s04_regions")} /></div>
            <div><FL>対応言語</FL><Inp value={brief.s04_languages} onChange={u("s04_languages")} /></div>
            <div><FL>想定ユーザー数（初年度）</FL><Inp value={brief.s04_usersY1} onChange={u("s04_usersY1")} /></div>
            <div><FL>想定ユーザー数（3年後）</FL><Inp value={brief.s04_usersY3} onChange={u("s04_usersY3")} /></div>
            <div><FL>年齢制限</FL><Inp value={brief.s04_ageRestriction} onChange={u("s04_ageRestriction")} placeholder="なし / 〇歳以上" /></div>
          </div>
          <div>
            <FL>収益モデル</FL>
            <Checks cols={2} options={["無料","買い切り","月額／年額サブスク","アプリ内課金","広告収益","販売手数料","法人契約","既存契約に付帯","未定／相談したい","その他"]}
              selected={brief.s04_revenueModel} onToggle={tc("s04_revenueModel")} />
          </div>
          <div><FL>料金プラン・無料期間・課金タイミング</FL><Txt value={brief.s04_pricingDetails} onChange={u("s04_pricingDetails")} rows={2} /></div>
        </Acc>

        {/* S05 */}
        <Acc no="S05" title="機能要件・優先順位" {...acc("S05")}>
          <div>
            <FL required>候補機能</FL>
            <Checks cols={2} options={["会員登録・ログイン","プロフィール","検索・絞り込み","お気に入り","プッシュ通知","チャット","位置情報・地図","カメラ・画像投稿","動画・音声","予約・カレンダー","決済・サブスク","商品購入","クーポン・ポイント","レビュー・評価","QR／バーコード","多言語","オフライン利用","管理画面","未定／相談したい","その他"]}
              selected={brief.s05_features} onToggle={tc("s05_features")} />
          </div>
          <div>
            <FL>機能優先度</FL>
            <FeatureTable brief={brief} onChange={onChange} />
          </div>
          <div><FL>機能同士の依存関係・絶対に同時実装したい組み合わせ</FL><Txt value={brief.s05_dependencies} onChange={u("s05_dependencies")} rows={2} /></div>
        </Acc>

        {/* S06 */}
        <Acc no="S06" title="画面構成・ユーザーフロー" {...acc("S06")}>
          <div>
            <FL>主要フロー</FL>
            <FlowTable brief={brief} onChange={onChange} />
          </div>
          <div><FL required>必要画面・メニュー構成</FL><Txt value={brief.s06_screens} onChange={u("s06_screens")} rows={4} /></div>
          <div><FL>ログイン前／ログイン後で変わる内容</FL><Txt value={brief.s06_loginDiff} onChange={u("s06_loginDiff")} rows={2} /></div>
          <div><FL>エラー、通信切断、権限拒否時に必要な案内</FL><Txt value={brief.s06_errorHandling} onChange={u("s06_errorHandling")} rows={2} /></div>
        </Acc>

        {/* S07 */}
        <Acc no="S07" title="アカウント・権限・データ" {...acc("S07")}>
          <div>
            <FL>ログイン方法</FL>
            <Checks cols={2} options={["メールアドレス","電話番号・SMS","Apple","Google","LINE","法人SSO","招待コード","ゲスト利用","未定／相談したい","その他"]}
              selected={brief.s07_loginMethods} onToggle={tc("s07_loginMethods")} />
          </div>
          <div>
            <FL>利用者と権限</FL>
            <UserPermTable brief={brief} onChange={onChange} />
          </div>
          <div><FL required>取得・保存する個人情報／機微情報</FL><Txt value={brief.s07_personalData} onChange={u("s07_personalData")} rows={3} /></div>
          <div><FL>退会・データ削除・保存期間のルール</FL><Txt value={brief.s07_deletionPolicy} onChange={u("s07_deletionPolicy")} rows={2} /></div>
          <div><FL>既存データの移行元・件数・形式・名寄せ条件</FL><Txt value={brief.s07_dataMigration} onChange={u("s07_dataMigration")} rows={2} /></div>
        </Acc>

        {/* S08 */}
        <Acc no="S08" title="外部連携・管理画面" {...acc("S08")}>
          <div>
            <FL>連携候補</FL>
            <Checks cols={2} options={["決済サービス","地図・位置情報","メール・SMS","LINE","CRM／MA","予約システム","EC／在庫","会計","配送","SNS","分析・広告SDK","社内基幹システム","未定／相談したい","その他"]}
              selected={brief.s08_integrations} onToggle={tc("s08_integrations")} />
          </div>
          <div>
            <FL>外部連携一覧</FL>
            <IntegrationTable brief={brief} onChange={onChange} />
          </div>
          <div><FL required>管理画面で必要な検索・編集・承認・集計・出力</FL><Txt value={brief.s08_adminNeeds} onChange={u("s08_adminNeeds")} rows={3} /></div>
          <div><FL>通知先、CSV入出力、操作履歴の要否</FL><Txt value={brief.s08_notifications} onChange={u("s08_notifications")} rows={2} /></div>
        </Acc>

        {/* S09 */}
        <Acc no="S09" title="UI・ブランド・アクセシビリティ" {...acc("S09")}>
          <div><FL required>目指す印象・世界観・キーワード</FL><Txt value={brief.s09_impression} onChange={u("s09_impression")} rows={2} /></div>
          <div>
            <FL>重視する体験</FL>
            <Checks cols={2} options={["迷わない","少ない操作数","高級感","親しみ","楽しさ","信頼・安心","スピード","没入感","片手操作","読みやすさ","未定／相談したい","その他"]}
              selected={brief.s09_ux} onToggle={tc("s09_ux")} />
          </div>
          <div>
            <FL>参考アプリ</FL>
            <RefAppTable brief={brief} onChange={onChange} />
          </div>
          <div><FL>ロゴ・ブランドガイド・UI素材の有無</FL><Txt value={brief.s09_brandAssets} onChange={u("s09_brandAssets")} rows={2} /></div>
          <div><FL>アクセシビリティ基準・文字サイズ・色覚配慮</FL><Txt value={brief.s09_accessibility} onChange={u("s09_accessibility")} rows={2} /></div>
        </Acc>

        {/* S10 */}
        <Acc no="S10" title="非機能・品質・セキュリティ" {...acc("S10")}>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>同時利用者／ピーク</FL><Inp value={brief.s10_concurrentUsers} onChange={u("s10_concurrentUsers")} /></div>
            <div><FL>目標応答時間</FL><Inp value={brief.s10_responseTime} onChange={u("s10_responseTime")} /></div>
            <div><FL>稼働時間・停止許容</FL><Inp value={brief.s10_uptime} onChange={u("s10_uptime")} /></div>
            <div><FL>バックアップ／復旧目標</FL><Inp value={brief.s10_backup} onChange={u("s10_backup")} /></div>
            <div><FL>監視・ログ保存期間</FL><Inp value={brief.s10_monitoring} onChange={u("s10_monitoring")} /></div>
            <div><FL>準拠基準</FL><Inp value={brief.s10_compliance} onChange={u("s10_compliance")} placeholder="ISMS / PCI DSS / 社内規定など" /></div>
          </div>
          <div>
            <FL>必要な対策</FL>
            <Checks cols={2} options={["通信・保存データ暗号化","多要素認証","権限分離","脆弱性診断","不正利用対策","監査ログ","端末紛失対策","レート制限","バックアップ","障害監視","未定／相談したい","その他"]}
              selected={brief.s10_security} onToggle={tc("s10_security")} />
          </div>
          <div><FL required>性能・可用性・セキュリティで特に重要な条件</FL><Txt value={brief.s10_priorityConditions} onChange={u("s10_priorityConditions")} rows={2} /></div>
          <div><FL>法令・業界規制・社内セキュリティ審査</FL><Txt value={brief.s10_regulations} onChange={u("s10_regulations")} rows={2} /></div>
        </Acc>

        {/* S11 */}
        <Acc no="S11" title="ストア公開・テスト・リリース" {...acc("S11")}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FL>Apple Developerアカウント</FL>
              <Radios cols={3} options={["あり","なし","取得中"]} selected={brief.s11_appleAccount} onSelect={u("s11_appleAccount")} />
            </div>
            <div>
              <FL>Google Play Console</FL>
              <Radios cols={3} options={["あり","なし","取得中"]} selected={brief.s11_googleConsole} onSelect={u("s11_googleConsole")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>公開名義</FL><Inp value={brief.s11_publishName} onChange={u("s11_publishName")} /></div>
            <div>
              <FL>配布方法</FL>
              <Radios cols={3} options={["一般公開","限定公開","社内配布"]} selected={brief.s11_distribution} onSelect={u("s11_distribution")} />
            </div>
            <div><FL>年齢レーティング</FL><Inp value={brief.s11_ageRating} onChange={u("s11_ageRating")} /></div>
            <div><FL>審査用連絡先</FL><Inp value={brief.s11_reviewContact} onChange={u("s11_reviewContact")} /></div>
          </div>
          <div>
            <FL>テスト対象</FL>
            <Checks cols={2} options={["実機・OS別","機能テスト","決済テスト","通信障害","負荷","セキュリティ","アクセシビリティ","ベータテスト","データ移行","ストア審査","未定／相談したい","その他"]}
              selected={brief.s11_testItems} onToggle={tc("s11_testItems")} />
          </div>
          <div><FL required>検収条件・受入テスト担当・テスト端末</FL><Txt value={brief.s11_acceptanceCriteria} onChange={u("s11_acceptanceCriteria")} rows={3} /></div>
          <div><FL>段階公開、告知、旧版停止、ロールバック方針</FL><Txt value={brief.s11_releasePolicy} onChange={u("s11_releasePolicy")} rows={2} /></div>
        </Acc>

        {/* S12 */}
        <Acc no="S12" title="分析・運用・保守" {...acc("S12")}>
          <div>
            <FL>分析・運用項目</FL>
            <Checks cols={2} options={["Firebase等の行動分析","クラッシュ分析","広告計測","A/Bテスト","レビュー監視","問い合わせ対応","コンテンツ更新","OS更新対応","脆弱性対応","定期レポート","未定／相談したい","その他"]}
              selected={brief.s12_operations} onToggle={tc("s12_operations")} />
          </div>
          <div><FL>追跡したいイベント・ファネル</FL><Txt value={brief.s12_events} onChange={u("s12_events")} rows={2} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>運用担当</FL><Inp value={brief.s12_opsOwner} onChange={u("s12_opsOwner")} /></div>
            <div><FL>問い合わせ窓口</FL><Inp value={brief.s12_support} onChange={u("s12_support")} /></div>
            <div><FL>障害連絡時間</FL><Inp value={brief.s12_incidentHours} onChange={u("s12_incidentHours")} /></div>
            <div><FL>希望SLA</FL><Inp value={brief.s12_sla} onChange={u("s12_sla")} /></div>
            <div><FL>定例・レポート頻度</FL><Inp value={brief.s12_reportFrequency} onChange={u("s12_reportFrequency")} /></div>
            <div>
              <FL>保守契約希望</FL>
              <Radios cols={3} options={["あり","なし","相談"]} selected={brief.s12_maintenance} onSelect={u("s12_maintenance")} />
            </div>
          </div>
          <div><FL>公開後3か月で改善したい仮説・追加候補</FL><Txt value={brief.s12_postLaunchHypotheses} onChange={u("s12_postLaunchHypotheses")} rows={3} /></div>
        </Acc>

        {/* S13 */}
        <Acc no="S13" title="スケジュール・体制" {...acc("S13")}>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>着手希望</FL><Inp value={brief.s13_startDate} onChange={u("s13_startDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div><FL>ベータ版希望</FL><Inp value={brief.s13_betaDate} onChange={u("s13_betaDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div><FL>正式公開希望</FL><Inp value={brief.s13_launchDate} onChange={u("s13_launchDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div>
              <FL>公開時期区分</FL>
              <Radios cols={2} options={["必須","希望"]} selected={brief.s13_launchRequired} onSelect={u("s13_launchRequired")} />
            </div>
            <div><FL>公開理由</FL><Inp value={brief.s13_launchReason} onChange={u("s13_launchReason")} placeholder="イベント / 契約 / 広告など" /></div>
            <div><FL>連絡不可期間</FL><Inp value={brief.s13_unavailablePeriod} onChange={u("s13_unavailablePeriod")} /></div>
          </div>
          <div>
            <FL>工程と担当</FL>
            <ScheduleTable brief={brief} onChange={onChange} />
          </div>
          <div><FL required>社内承認フロー・確認に必要な日数</FL><Txt value={brief.s13_approvalFlow} onChange={u("s13_approvalFlow")} rows={2} /></div>
          <div><FL>支給素材・API・アカウントの提出予定</FL><Txt value={brief.s13_assetSubmission} onChange={u("s13_assetSubmission")} rows={2} /></div>
        </Acc>

        {/* S14 */}
        <Acc no="S14" title="予算・契約・権利" {...acc("S14")}>
          <div>
            <FL>初期開発予算（税別）</FL>
            <Radios cols={3} options={["〜100万円","100〜300万円","300〜500万円","500〜1,000万円","1,000万円〜","未定"]}
              selected={brief.s14_initBudget} onSelect={u("s14_initBudget")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>月額保守予算（税別）</FL><Inp value={brief.s14_monthlyBudget} onChange={u("s14_monthlyBudget")} /></div>
            <div><FL>予算上限</FL><Inp value={brief.s14_budgetCap} onChange={u("s14_budgetCap")} /></div>
            <div><FL>見積提出期限</FL><Inp value={brief.s14_quotationDeadline} onChange={u("s14_quotationDeadline")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div>
              <FL>支払条件</FL>
              <Radios cols={2} options={["一括","分割","マイルストーン","その他"]} selected={brief.s14_payment} onSelect={u("s14_payment")} />
            </div>
            <div>
              <FL>相見積もり</FL>
              <Radios cols={2} options={["あり","なし"]} selected={brief.s14_competitive} onSelect={u("s14_competitive")} />
            </div>
          </div>
          <div>
            <FL>見積に含めたい範囲</FL>
            <Checks cols={2} options={["企画・要件定義","UI／UX","iOS","Android","Web・管理画面","バックエンド","外部連携","データ移行","テスト","ストア申請","分析設定","保守・改善","未定／相談したい","その他"]}
              selected={brief.s14_scope} onToggle={tc("s14_scope")} />
          </div>
          <div><FL required>予算内で最優先に残す機能</FL><Txt value={brief.s14_priorityFeatures} onChange={u("s14_priorityFeatures")} rows={2} /></div>
          <div><FL>納品物・ソースコード・デザインデータ・著作権の希望</FL><Txt value={brief.s14_deliverables} onChange={u("s14_deliverables")} rows={2} /></div>
          <div><FL>修正回数、瑕疵対応、再審査、追加費用で確認したい点</FL><Txt value={brief.s14_revisionPolicy} onChange={u("s14_revisionPolicy")} rows={2} /></div>
        </Acc>

        {/* S15 */}
        <Acc no="S15" title="要件まとめ・最終確認" {...acc("S15")}>
          <div><FL required>今回の最優先目的</FL><Txt value={brief.s15_topPurpose} onChange={u("s15_topPurpose")} rows={2} /></div>
          <div><FL required>最優先ターゲット</FL><Txt value={brief.s15_topTarget} onChange={u("s15_topTarget")} rows={2} /></div>
          <div><FL required>必須要件・絶対に外せない条件</FL><Txt value={brief.s15_mustHave} onChange={u("s15_mustHave")} rows={2} /></div>
          <div><FL>対象外・次期へ回す項目</FL><Txt value={brief.s15_outOfScope} onChange={u("s15_outOfScope")} rows={2} /></div>
          <div><FL>主要KPIと目標値</FL><Txt value={brief.s15_kpiTargets} onChange={u("s15_kpiTargets")} rows={2} /></div>
          <div><FL>最大のリスク・未決事項</FL><Txt value={brief.s15_risks} onChange={u("s15_risks")} rows={2} /></div>
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
                        const k = `s15_${f}${n}` as keyof AppBrief;
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
            <div><FL>クライアント氏名</FL><Inp value={brief.s15_clientName} onChange={u("s15_clientName")} /></div>
            <div><FL>クライアント確認日</FL><Inp value={brief.s15_clientDate} onChange={u("s15_clientDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div><FL>YOICHI担当者氏名</FL><Inp value={brief.s15_yoichiName} onChange={u("s15_yoichiName")} /></div>
            <div><FL>YOICHI確認日</FL><Inp value={brief.s15_yoichiDate} onChange={u("s15_yoichiDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
          </div>
          <div>
            <FL>要件の状態</FL>
            <Radios cols={2} options={["ヒアリング中","見積作成可","要件確定","再確認が必要"]} selected={brief.s15_status} onSelect={u("s15_status")} />
          </div>
        </Acc>

      </div>
    </div>
  );
}
