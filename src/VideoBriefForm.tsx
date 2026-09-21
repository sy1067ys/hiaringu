import { useState } from "react";

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}
function Inp({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7a3a3a] focus:ring-1 focus:ring-[#7a3a3a]/20 text-sm transition-all" />
  );
}
function Txt({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full bg-white border border-[#c9b8a4]/60 rounded px-3 py-2.5 text-[#1a1410] placeholder:text-[#c9b8a4] focus:outline-none focus:border-[#7a3a3a] focus:ring-1 focus:ring-[#7a3a3a]/20 text-sm resize-none transition-all" />
  );
}
function FL({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold tracking-wider text-[#7a3a3a] uppercase mb-1.5">
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7a3a3a] hover:bg-[#f7f3ee]"
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
            chk ? "bg-[#3d2b1f] text-[#f7f3ee] border-[#3d2b1f]" : "bg-white text-[#3d2b1f] border-[#c9b8a4]/70 hover:border-[#7a3a3a] hover:bg-[#f7f3ee]"
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

const ACCENT = "#7a3a3a";

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

export type VideoBrief = {
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
  s01_publishDate: string;
  s01_url: string;
  s01_background: string;
  s01_change: string;
  s01_pastIssues: string;
  // S02
  s02_purpose: string[];
  s02_target: string;
  s02_viewingContext: string;
  s02_cta: string;
  s02_objections: string;
  // S03
  s03_videoType: string[];
  s03_main_count: string; s03_main_length: string; s03_main_ratio: string; s03_main_subtitle: string;
  s03_vertical_count: string; s03_vertical_length: string; s03_vertical_ratio: string; s03_vertical_subtitle: string;
  s03_horizontal_count: string; s03_horizontal_length: string; s03_horizontal_ratio: string; s03_horizontal_subtitle: string;
  s03_signage_count: string; s03_signage_length: string; s03_signage_ratio: string; s03_signage_subtitle: string;
  s03_framerate: string;
  s03_format: string;
  s03_sizeLimit: string;
  s03_thumbnail: string;
  s03_stillCut: string;
  s03_rawData: string;
  // S04
  s04_concept: string;
  s04_message: string;
  s04_tone: string[];
  s04_ref1_url: string; s04_ref1_good: string; s04_ref1_adopt: string; s04_ref1_avoid: string;
  s04_ref2_url: string; s04_ref2_good: string; s04_ref2_adopt: string; s04_ref2_avoid: string;
  s04_ref3_url: string; s04_ref3_good: string; s04_ref3_adopt: string; s04_ref3_avoid: string;
  s04_ngRules: string;
  // S05
  s05_open_visual: string; s05_open_content: string; s05_open_audio: string; s05_open_duration: string;
  s05_dev1_visual: string; s05_dev1_content: string; s05_dev1_audio: string; s05_dev1_duration: string;
  s05_dev2_visual: string; s05_dev2_content: string; s05_dev2_audio: string; s05_dev2_duration: string;
  s05_cta_visual: string; s05_cta_content: string; s05_cta_audio: string; s05_cta_duration: string;
  s05_mustShots: string;
  s05_scriptOwner: string;
  s05_hook: string;
  // S06
  s06_cast: string[];
  s06_cast1_name: string; s06_cast1_role: string; s06_cast1_date: string; s06_cast1_contract: string;
  s06_cast2_name: string; s06_cast2_role: string; s06_cast2_date: string; s06_cast2_contract: string;
  s06_cast3_name: string; s06_cast3_role: string; s06_cast3_date: string; s06_cast3_contract: string;
  s06_audio: string[];
  s06_voiceStyle: string;
  s06_portraitRights: string;
  // S07
  s07_date1: string; s07_date2: string; s07_date3: string;
  s07_hours: string;
  s07_location: string;
  s07_spare: string;
  s07_attendee: string;
  s07_access: string;
  s07_arrangements: string[];
  s07_constraints: string;
  s07_dayOfRun: string;
  s07_safety: string;
  // S08
  s08_equipment: string[];
  s08_quality: string;
  s08_dronePermit: string;
  s08_productReady: string;
  s08_techTest: string;
  // S09
  s09_props: string[];
  s09_item1_name: string; s09_item1_qty: string; s09_item1_owner: string; s09_item1_date: string; s09_item1_notes: string;
  s09_item2_name: string; s09_item2_qty: string; s09_item2_owner: string; s09_item2_date: string; s09_item2_notes: string;
  s09_item3_name: string; s09_item3_qty: string; s09_item3_owner: string; s09_item3_date: string; s09_item3_notes: string;
  s09_productCondition: string;
  s09_costumeRules: string;
  // S10
  s10_editing: string[];
  s10_editStyle: string;
  s10_subtitleRules: string;
  s10_music: string;
  s10_logoDisplay: string;
  // S11
  s11_rights: string[];
  s11_medium: string;
  s11_region: string;
  s11_period: string;
  s11_adUse: string;
  s11_editRights: string;
  s11_portfolioUse: string;
  s11_rightsOwner: string;
  s11_legalNotes: string;
  // S12
  s12_phase1_item: string; s12_phase1_reviewer: string; s12_phase1_deadline: string; s12_phase1_revisions: string;
  s12_phase2_item: string; s12_phase2_reviewer: string; s12_phase2_deadline: string; s12_phase2_revisions: string;
  s12_phase3_item: string; s12_phase3_reviewer: string; s12_phase3_deadline: string; s12_phase3_revisions: string;
  s12_phase4_item: string; s12_phase4_reviewer: string; s12_phase4_deadline: string; s12_phase4_revisions: string;
  s12_revisionProcess: string;
  s12_delivery: string;
  s12_storage: string;
  s12_postChanges: string;
  // S13
  s13_budget: string;
  s13_expensesBudget: string;
  s13_publishDate: string;
  s13_draftDate: string;
  s13_quotationDeadline: string;
  s13_payment: string;
  s13_metrics: string[];
  s13_prioritySpec: string;
  s13_analyticsGoals: string;
  s13_additionalCosts: string;
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

export const EMPTY_VIDEO_BRIEF: VideoBrief = {
  ov_scope: [], ov_summary: "", ov_priority: "", ov_decided: "",
  s01_company: "", s01_project: "", s01_contact: "", s01_approver: "", s01_publishDate: "", s01_url: "",
  s01_background: "", s01_change: "", s01_pastIssues: "",
  s02_purpose: [], s02_target: "", s02_viewingContext: "", s02_cta: "", s02_objections: "",
  s03_videoType: [],
  s03_main_count: "", s03_main_length: "", s03_main_ratio: "", s03_main_subtitle: "",
  s03_vertical_count: "", s03_vertical_length: "", s03_vertical_ratio: "", s03_vertical_subtitle: "",
  s03_horizontal_count: "", s03_horizontal_length: "", s03_horizontal_ratio: "", s03_horizontal_subtitle: "",
  s03_signage_count: "", s03_signage_length: "", s03_signage_ratio: "", s03_signage_subtitle: "",
  s03_framerate: "", s03_format: "", s03_sizeLimit: "", s03_thumbnail: "", s03_stillCut: "", s03_rawData: "",
  s04_concept: "", s04_message: "", s04_tone: [],
  s04_ref1_url: "", s04_ref1_good: "", s04_ref1_adopt: "", s04_ref1_avoid: "",
  s04_ref2_url: "", s04_ref2_good: "", s04_ref2_adopt: "", s04_ref2_avoid: "",
  s04_ref3_url: "", s04_ref3_good: "", s04_ref3_adopt: "", s04_ref3_avoid: "",
  s04_ngRules: "",
  s05_open_visual: "", s05_open_content: "", s05_open_audio: "", s05_open_duration: "",
  s05_dev1_visual: "", s05_dev1_content: "", s05_dev1_audio: "", s05_dev1_duration: "",
  s05_dev2_visual: "", s05_dev2_content: "", s05_dev2_audio: "", s05_dev2_duration: "",
  s05_cta_visual: "", s05_cta_content: "", s05_cta_audio: "", s05_cta_duration: "",
  s05_mustShots: "", s05_scriptOwner: "", s05_hook: "",
  s06_cast: [],
  s06_cast1_name: "", s06_cast1_role: "", s06_cast1_date: "", s06_cast1_contract: "",
  s06_cast2_name: "", s06_cast2_role: "", s06_cast2_date: "", s06_cast2_contract: "",
  s06_cast3_name: "", s06_cast3_role: "", s06_cast3_date: "", s06_cast3_contract: "",
  s06_audio: [], s06_voiceStyle: "", s06_portraitRights: "",
  s07_date1: "", s07_date2: "", s07_date3: "", s07_hours: "", s07_location: "", s07_spare: "",
  s07_attendee: "", s07_access: "", s07_arrangements: [], s07_constraints: "", s07_dayOfRun: "", s07_safety: "",
  s08_equipment: [], s08_quality: "", s08_dronePermit: "", s08_productReady: "", s08_techTest: "",
  s09_props: [],
  s09_item1_name: "", s09_item1_qty: "", s09_item1_owner: "", s09_item1_date: "", s09_item1_notes: "",
  s09_item2_name: "", s09_item2_qty: "", s09_item2_owner: "", s09_item2_date: "", s09_item2_notes: "",
  s09_item3_name: "", s09_item3_qty: "", s09_item3_owner: "", s09_item3_date: "", s09_item3_notes: "",
  s09_productCondition: "", s09_costumeRules: "",
  s10_editing: [], s10_editStyle: "", s10_subtitleRules: "", s10_music: "", s10_logoDisplay: "",
  s11_rights: [], s11_medium: "", s11_region: "", s11_period: "", s11_adUse: "", s11_editRights: "",
  s11_portfolioUse: "", s11_rightsOwner: "", s11_legalNotes: "",
  s12_phase1_item: "", s12_phase1_reviewer: "", s12_phase1_deadline: "", s12_phase1_revisions: "",
  s12_phase2_item: "", s12_phase2_reviewer: "", s12_phase2_deadline: "", s12_phase2_revisions: "",
  s12_phase3_item: "", s12_phase3_reviewer: "", s12_phase3_deadline: "", s12_phase3_revisions: "",
  s12_phase4_item: "", s12_phase4_reviewer: "", s12_phase4_deadline: "", s12_phase4_revisions: "",
  s12_revisionProcess: "", s12_delivery: "", s12_storage: "", s12_postChanges: "",
  s13_budget: "", s13_expensesBudget: "", s13_publishDate: "", s13_draftDate: "", s13_quotationDeadline: "",
  s13_payment: "", s13_metrics: [], s13_prioritySpec: "", s13_analyticsGoals: "", s13_additionalCosts: "",
  s14_topPurpose: "", s14_topTarget: "", s14_mustHave: "", s14_outOfScope: "", s14_kpiTargets: "", s14_risks: "",
  s14_pending1: "", s14_pending1_owner: "", s14_pending1_deadline: "", s14_pending1_status: "",
  s14_pending2: "", s14_pending2_owner: "", s14_pending2_deadline: "", s14_pending2_status: "",
  s14_pending3: "", s14_pending3_owner: "", s14_pending3_deadline: "", s14_pending3_status: "",
  s14_clientName: "", s14_clientDate: "", s14_yoichiName: "", s14_yoichiDate: "", s14_status: "",
};

type DeliveryRow = { label: string; countKey: keyof VideoBrief; lengthKey: keyof VideoBrief; ratioKey: keyof VideoBrief; subKey: keyof VideoBrief };

function DeliveryTable({ brief, onChange }: { brief: VideoBrief; onChange: (b: VideoBrief) => void }) {
  const rows: DeliveryRow[] = [
    { label: "メイン", countKey: "s03_main_count", lengthKey: "s03_main_length", ratioKey: "s03_main_ratio", subKey: "s03_main_subtitle" },
    { label: "縦型短尺", countKey: "s03_vertical_count", lengthKey: "s03_vertical_length", ratioKey: "s03_vertical_ratio", subKey: "s03_vertical_subtitle" },
    { label: "横型短尺", countKey: "s03_horizontal_count", lengthKey: "s03_horizontal_length", ratioKey: "s03_horizontal_ratio", subKey: "s03_horizontal_subtitle" },
    { label: "サイネージ等", countKey: "s03_signage_count", lengthKey: "s03_signage_length", ratioKey: "s03_signage_ratio", subKey: "s03_signage_subtitle" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["用途／媒体","本数","尺","比率・解像度","字幕・言語"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.countKey, r.lengthKey, r.ratioKey, r.subKey] as (keyof VideoBrief)[]).map((k) => (
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

type RefRow = { label: string; urlKey: keyof VideoBrief; goodKey: keyof VideoBrief; adoptKey: keyof VideoBrief; avoidKey: keyof VideoBrief };

function RefVideoTable({ brief, onChange }: { brief: VideoBrief; onChange: (b: VideoBrief) => void }) {
  const rows: RefRow[] = [
    { label: "参考1", urlKey: "s04_ref1_url", goodKey: "s04_ref1_good", adoptKey: "s04_ref1_adopt", avoidKey: "s04_ref1_avoid" },
    { label: "参考2", urlKey: "s04_ref2_url", goodKey: "s04_ref2_good", adoptKey: "s04_ref2_adopt", avoidKey: "s04_ref2_avoid" },
    { label: "参考3", urlKey: "s04_ref3_url", goodKey: "s04_ref3_good", adoptKey: "s04_ref3_adopt", avoidKey: "s04_ref3_avoid" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["URL／作品名","良い点","取り入れたい点","避けたい点"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              {([r.urlKey, r.goodKey, r.adoptKey, r.avoidKey] as (keyof VideoBrief)[]).map((k) => (
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

type SceneRow = { label: string; visualKey: keyof VideoBrief; contentKey: keyof VideoBrief; audioKey: keyof VideoBrief; durationKey: keyof VideoBrief };

function ScriptTable({ brief, onChange }: { brief: VideoBrief; onChange: (b: VideoBrief) => void }) {
  const rows: SceneRow[] = [
    { label: "冒頭", visualKey: "s05_open_visual", contentKey: "s05_open_content", audioKey: "s05_open_audio", durationKey: "s05_open_duration" },
    { label: "展開1", visualKey: "s05_dev1_visual", contentKey: "s05_dev1_content", audioKey: "s05_dev1_audio", durationKey: "s05_dev1_duration" },
    { label: "展開2", visualKey: "s05_dev2_visual", contentKey: "s05_dev2_content", audioKey: "s05_dev2_audio", durationKey: "s05_dev2_duration" },
    { label: "結論・CTA", visualKey: "s05_cta_visual", contentKey: "s05_cta_content", audioKey: "s05_cta_audio", durationKey: "s05_cta_duration" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["区間","映像・出来事","伝える内容","音・台詞","目安尺"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.visualKey, r.contentKey, r.audioKey, r.durationKey] as (keyof VideoBrief)[]).map((k) => (
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

type CastRow = { label: string; nameKey: keyof VideoBrief; roleKey: keyof VideoBrief; dateKey: keyof VideoBrief; contractKey: keyof VideoBrief };

function CastTable({ brief, onChange }: { brief: VideoBrief; onChange: (b: VideoBrief) => void }) {
  const rows: CastRow[] = [
    { label: "出演1", nameKey: "s06_cast1_name", roleKey: "s06_cast1_role", dateKey: "s06_cast1_date", contractKey: "s06_cast1_contract" },
    { label: "出演2", nameKey: "s06_cast2_name", roleKey: "s06_cast2_role", dateKey: "s06_cast2_date", contractKey: "s06_cast2_contract" },
    { label: "出演3", nameKey: "s06_cast3_name", roleKey: "s06_cast3_role", dateKey: "s06_cast3_date", contractKey: "s06_cast3_contract" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["氏名／役割","出演内容","拘束可能日","許諾・契約"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              {([r.nameKey, r.roleKey, r.dateKey, r.contractKey] as (keyof VideoBrief)[]).map((k) => (
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

type PropRow = { label: string; nameKey: keyof VideoBrief; qtyKey: keyof VideoBrief; ownerKey: keyof VideoBrief; dateKey: keyof VideoBrief; notesKey: keyof VideoBrief };

function PropsTable({ brief, onChange }: { brief: VideoBrief; onChange: (b: VideoBrief) => void }) {
  const rows: PropRow[] = [
    { label: "準備物1", nameKey: "s09_item1_name", qtyKey: "s09_item1_qty", ownerKey: "s09_item1_owner", dateKey: "s09_item1_date", notesKey: "s09_item1_notes" },
    { label: "準備物2", nameKey: "s09_item2_name", qtyKey: "s09_item2_qty", ownerKey: "s09_item2_owner", dateKey: "s09_item2_date", notesKey: "s09_item2_notes" },
    { label: "準備物3", nameKey: "s09_item3_name", qtyKey: "s09_item3_qty", ownerKey: "s09_item3_owner", dateKey: "s09_item3_date", notesKey: "s09_item3_notes" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["品目","数量","準備担当","搬入日","注意点"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              {([r.nameKey, r.qtyKey, r.ownerKey, r.dateKey, r.notesKey] as (keyof VideoBrief)[]).map((k) => (
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

type ReviewRow = { label: string; itemKey: keyof VideoBrief; reviewerKey: keyof VideoBrief; deadlineKey: keyof VideoBrief; revisionsKey: keyof VideoBrief };

function ReviewTable({ brief, onChange }: { brief: VideoBrief; onChange: (b: VideoBrief) => void }) {
  const rows: ReviewRow[] = [
    { label: "企画", itemKey: "s12_phase1_item", reviewerKey: "s12_phase1_reviewer", deadlineKey: "s12_phase1_deadline", revisionsKey: "s12_phase1_revisions" },
    { label: "台本", itemKey: "s12_phase2_item", reviewerKey: "s12_phase2_reviewer", deadlineKey: "s12_phase2_deadline", revisionsKey: "s12_phase2_revisions" },
    { label: "初稿", itemKey: "s12_phase3_item", reviewerKey: "s12_phase3_reviewer", deadlineKey: "s12_phase3_deadline", revisionsKey: "s12_phase3_revisions" },
    { label: "最終稿", itemKey: "s12_phase4_item", reviewerKey: "s12_phase4_reviewer", deadlineKey: "s12_phase4_deadline", revisionsKey: "s12_phase4_revisions" },
  ];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#e8e4de]">
            {["段階","確認物","確認者","期限","修正回数"].map((h) => (
              <th key={h} className="px-2 py-2 text-left font-semibold text-[#3d2b1f] border border-[#c9b8a4]/50 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="even:bg-[#faf8f5]">
              <td className="px-2 py-1.5 border border-[#c9b8a4]/50 font-medium text-[#3d2b1f] whitespace-nowrap">{r.label}</td>
              {([r.itemKey, r.reviewerKey, r.deadlineKey, r.revisionsKey] as (keyof VideoBrief)[]).map((k) => (
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

export default function VideoBriefForm({ brief, onChange }: { brief: VideoBrief; onChange: (b: VideoBrief) => void }) {
  const [open, setOpen] = useState("OV");
  const acc = (id: string) => ({ open: open === id, onToggle: () => setOpen(open === id ? "" : id) });
  const u = (key: keyof VideoBrief) => (v: string) => onChange({ ...brief, [key]: v });
  const tc = (key: keyof VideoBrief) => (v: string) => onChange({ ...brief, [key]: toggle(brief[key] as string[], v) });

  return (
    <div className="mt-4 rounded-2xl overflow-hidden border-2" style={{ borderColor: ACCENT }}>
      <div className="px-5 py-4" style={{ background: ACCENT }}>
        <p className="text-xs font-mono tracking-widest text-white/60 uppercase mb-0.5">Hearing Sheet</p>
        <h3 className="text-lg font-bold text-white">動画制作 詳細ヒアリング</h3>
      </div>
      <div className="p-4 bg-[#f7f3ee] space-y-3">

        {/* OV */}
        <Acc no="OV" title="案件の全体像" {...acc("OV")}>
          <div>
            <FL>今回の相談内容</FL>
            <Checks cols={2} options={["ブランドムービー","商品・サービス紹介","広告動画","SNSショート","採用動画","インタビュー","How-to／マニュアル","イベント・記録","未定／相談したい","その他"]}
              selected={brief.ov_scope} onToggle={tc("ov_scope")} />
          </div>
          <div><FL required>今回の相談内容を一言で</FL><Txt value={brief.ov_summary} onChange={u("ov_summary")} rows={2} /></div>
          <div><FL required>最優先で解決したいこと</FL><Txt value={brief.ov_priority} onChange={u("ov_priority")} rows={2} /></div>
          <div><FL>現時点で決まっていること／決まっていないこと</FL><Txt value={brief.ov_decided} onChange={u("ov_decided")} rows={2} /></div>
        </Acc>

        {/* S01 */}
        <Acc no="S01" title="基本情報・制作背景" {...acc("S01")}>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>会社・ブランド名</FL><Inp value={brief.s01_company} onChange={u("s01_company")} /></div>
            <div><FL>動画／案件名</FL><Inp value={brief.s01_project} onChange={u("s01_project")} /></div>
            <div><FL>窓口担当者</FL><Inp value={brief.s01_contact} onChange={u("s01_contact")} /></div>
            <div><FL>最終決裁者</FL><Inp value={brief.s01_approver} onChange={u("s01_approver")} /></div>
            <div><FL>公開予定日</FL><Inp value={brief.s01_publishDate} onChange={u("s01_publishDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div><FL>関連URL</FL><Inp value={brief.s01_url} onChange={u("s01_url")} placeholder="https://" /></div>
          </div>
          <div><FL required>動画を制作する背景・解決したい課題</FL><Txt value={brief.s01_background} onChange={u("s01_background")} rows={3} /></div>
          <div><FL required>動画で視聴者に起こしたい変化</FL><Txt value={brief.s01_change} onChange={u("s01_change")} rows={3} /></div>
          <div><FL>既存動画の課題・過去の制作経験</FL><Txt value={brief.s01_pastIssues} onChange={u("s01_pastIssues")} rows={2} /></div>
        </Acc>

        {/* S02 */}
        <Acc no="S02" title="目的・ターゲット・視聴状況" {...acc("S02")}>
          <div>
            <FL required>目的</FL>
            <Checks cols={2} options={["認知","理解","信頼","共感","購入","問い合わせ","来店","採用応募","教育・研修","イベント演出","営業支援","記録","未定／相談したい","その他"]}
              selected={brief.s02_purpose} onToggle={tc("s02_purpose")} />
          </div>
          <div><FL required>最優先ターゲット</FL><Txt value={brief.s02_target} onChange={u("s02_target")} rows={3} /></div>
          <div><FL required>視聴場所・端末・音声ON/OFF・前後の文脈</FL><Txt value={brief.s02_viewingContext} onChange={u("s02_viewingContext")} rows={3} /></div>
          <div><FL required>視聴後のCTA・遷移先</FL><Txt value={brief.s02_cta} onChange={u("s02_cta")} rows={2} /></div>
          <div><FL>視聴者の不安・反対理由</FL><Txt value={brief.s02_objections} onChange={u("s02_objections")} rows={2} /></div>
        </Acc>

        {/* S03 */}
        <Acc no="S03" title="動画種別・本数・仕様" {...acc("S03")}>
          <div>
            <FL>動画タイプ</FL>
            <Checks cols={2} options={["実写","インタビュー","ドキュメンタリー","商品撮影","アニメーション","モーショングラフィックス","画面収録","ライブ配信","ドローン","写真スライド","未定／相談したい","その他"]}
              selected={brief.s03_videoType} onToggle={tc("s03_videoType")} />
          </div>
          <div>
            <FL>納品仕様</FL>
            <DeliveryTable brief={brief} onChange={onChange} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>フレームレート</FL><Inp value={brief.s03_framerate} onChange={u("s03_framerate")} placeholder="24fps / 30fps / 60fps" /></div>
            <div><FL>納品形式</FL><Inp value={brief.s03_format} onChange={u("s03_format")} placeholder="MP4 / MOV / その他" /></div>
            <div><FL>容量制限</FL><Inp value={brief.s03_sizeLimit} onChange={u("s03_sizeLimit")} /></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <FL>サムネイル</FL>
              <Radios cols={2} options={["必要","不要"]} selected={brief.s03_thumbnail} onSelect={u("s03_thumbnail")} />
            </div>
            <div>
              <FL>静止画切出し</FL>
              <Radios cols={2} options={["必要","不要"]} selected={brief.s03_stillCut} onSelect={u("s03_stillCut")} />
            </div>
            <div>
              <FL>元データ</FL>
              <Radios cols={3} options={["希望","不要","要相談"]} selected={brief.s03_rawData} onSelect={u("s03_rawData")} />
            </div>
          </div>
        </Acc>

        {/* S04 */}
        <Acc no="S04" title="コンセプト・メッセージ・参考" {...acc("S04")}>
          <div><FL required>動画を一言で表すコンセプト</FL><Txt value={brief.s04_concept} onChange={u("s04_concept")} rows={2} /></div>
          <div><FL required>絶対に伝えたいメッセージ・事実</FL><Txt value={brief.s04_message} onChange={u("s04_message")} rows={3} /></div>
          <div>
            <FL>希望トーン</FL>
            <Checks cols={3} options={["信頼感","上質","親しみ","感動","ワクワク","先進的","自然体","力強い","静か","テンポ重視","リアル","ユーモア","未定／相談したい","その他"]}
              selected={brief.s04_tone} onToggle={tc("s04_tone")} />
          </div>
          <div>
            <FL>参考動画</FL>
            <RefVideoTable brief={brief} onChange={onChange} />
          </div>
          <div><FL required>NG表現・ブランドルール</FL><Txt value={brief.s04_ngRules} onChange={u("s04_ngRules")} rows={3} /></div>
        </Acc>

        {/* S05 */}
        <Acc no="S05" title="構成・台本・絵コンテ" {...acc("S05")}>
          <div>
            <FL>構成案</FL>
            <ScriptTable brief={brief} onChange={onChange} />
          </div>
          <div><FL required>必須シーン・必須台詞・商品カット</FL><Txt value={brief.s05_mustShots} onChange={u("s05_mustShots")} rows={3} /></div>
          <div><FL>台本の支給／作成／監修担当</FL><Txt value={brief.s05_scriptOwner} onChange={u("s05_scriptOwner")} rows={2} /></div>
          <div><FL>視聴維持のための冒頭フック案</FL><Txt value={brief.s05_hook} onChange={u("s05_hook")} rows={2} /></div>
        </Acc>

        {/* S06 */}
        <Acc no="S06" title="出演者・ナレーション・言語" {...acc("S06")}>
          <div>
            <FL>出演者</FL>
            <Checks cols={2} options={["代表者","社員","顧客","モデル","俳優","インフルエンサー","専門家","子ども","顔出しなし","アニメキャラクター","未定／相談したい","その他"]}
              selected={brief.s06_cast} onToggle={tc("s06_cast")} />
          </div>
          <div>
            <FL>出演候補</FL>
            <CastTable brief={brief} onChange={onChange} />
          </div>
          <div>
            <FL>音声</FL>
            <Checks cols={2} options={["本人の台詞","ナレーター","社員ナレーション","合成音声","音声なし","多言語吹替","未定／相談したい","その他"]}
              selected={brief.s06_audio} onToggle={tc("s06_audio")} />
          </div>
          <div><FL>話し方・声質・アクセント・読み方指定</FL><Txt value={brief.s06_voiceStyle} onChange={u("s06_voiceStyle")} rows={2} /></div>
          <div><FL required>肩書・氏名表示、顔出し、使用期間・媒体の許諾</FL><Txt value={brief.s06_portraitRights} onChange={u("s06_portraitRights")} rows={3} /></div>
        </Acc>

        {/* S07 */}
        <Acc no="S07" title="撮影場所・日程・運営" {...acc("S07")}>
          <div className="grid grid-cols-3 gap-3">
            <div><FL>撮影候補日（第1）</FL><Inp value={brief.s07_date1} onChange={u("s07_date1")} /></div>
            <div><FL>撮影候補日（第2）</FL><Inp value={brief.s07_date2} onChange={u("s07_date2")} /></div>
            <div><FL>撮影候補日（第3）</FL><Inp value={brief.s07_date3} onChange={u("s07_date3")} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>撮影可能時間</FL><Inp value={brief.s07_hours} onChange={u("s07_hours")} /></div>
            <div><FL>場所</FL><Inp value={brief.s07_location} onChange={u("s07_location")} /></div>
            <div><FL>予備日</FL><Inp value={brief.s07_spare} onChange={u("s07_spare")} /></div>
            <div><FL>立会者</FL><Inp value={brief.s07_attendee} onChange={u("s07_attendee")} /></div>
            <div><FL>搬入・駐車</FL><Inp value={brief.s07_access} onChange={u("s07_access")} /></div>
          </div>
          <div>
            <FL>必要手配</FL>
            <Checks cols={2} options={["ロケハン","撮影許可","スタジオ","控室","電源・通信","交通規制","近隣案内","警備","雨天対応","保険","未定／相談したい","その他"]}
              selected={brief.s07_arrangements} onToggle={tc("s07_arrangements")} />
          </div>
          <div><FL>場所の広さ・音・光・映り込み・禁止事項</FL><Txt value={brief.s07_constraints} onChange={u("s07_constraints")} rows={3} /></div>
          <div><FL>撮影当日の進行・営業への影響・時間制限</FL><Txt value={brief.s07_dayOfRun} onChange={u("s07_dayOfRun")} rows={2} /></div>
          <div><FL required>安全衛生・機密情報・撮影禁止対象</FL><Txt value={brief.s07_safety} onChange={u("s07_safety")} rows={2} /></div>
        </Acc>

        {/* S08 */}
        <Acc no="S08" title="機材・技術・特殊撮影" {...acc("S08")}>
          <div>
            <FL>撮影要素</FL>
            <Checks cols={2} options={["複数カメラ","ジンバル","照明","ワイヤレスマイク","商品マクロ","スローモーション","タイムラプス","ドローン","水中・車載","クロマキー","画面収録","ライブ配信","未定／相談したい","その他"]}
              selected={brief.s08_equipment} onToggle={tc("s08_equipment")} />
          </div>
          <div><FL>特に重視する画・動き・音の品質</FL><Txt value={brief.s08_quality} onChange={u("s08_quality")} rows={2} /></div>
          <div><FL>ドローン・特殊機材の許可／安全条件</FL><Txt value={brief.s08_dronePermit} onChange={u("s08_dronePermit")} rows={2} /></div>
          <div><FL>撮影対象の商品・設備の準備状態</FL><Txt value={brief.s08_productReady} onChange={u("s08_productReady")} rows={2} /></div>
          <div><FL>技術テスト・事前接続確認の要否</FL><Txt value={brief.s08_techTest} onChange={u("s08_techTest")} rows={2} /></div>
        </Acc>

        {/* S09 */}
        <Acc no="S09" title="商品・美術・衣装・ヘアメイク" {...acc("S09")}>
          <div>
            <FL>必要物</FL>
            <Checks cols={2} options={["商品サンプル","予備商品","小道具","背景・セット","ロゴ・看板","衣装","制服","ヘアメイク","フードスタイリング","美術装飾","車両","資料・画面","未定／相談したい","その他"]}
              selected={brief.s09_props} onToggle={tc("s09_props")} />
          </div>
          <div>
            <FL>準備物</FL>
            <PropsTable brief={brief} onChange={onChange} />
          </div>
          <div><FL>商品を最良の状態に保つ条件・交換基準</FL><Txt value={brief.s09_productCondition} onChange={u("s09_productCondition")} rows={2} /></div>
          <div><FL>衣装・色・ブランド競合・ロゴ映り込みのルール</FL><Txt value={brief.s09_costumeRules} onChange={u("s09_costumeRules")} rows={2} /></div>
        </Acc>

        {/* S10 */}
        <Acc no="S10" title="編集・音楽・グラフィック" {...acc("S10")}>
          <div>
            <FL>編集要素</FL>
            <Checks cols={2} options={["カット編集","カラー調整","テロップ","フル字幕","図解","アニメーション","ロゴモーション","BGM","効果音","整音","ノイズ除去","多言語版","未定／相談したい","その他"]}
              selected={brief.s10_editing} onToggle={tc("s10_editing")} />
          </div>
          <div><FL>編集テンポ・色味・演出の希望</FL><Txt value={brief.s10_editStyle} onChange={u("s10_editStyle")} rows={3} /></div>
          <div><FL>字幕ルール・表記・フォント・セーフエリア</FL><Txt value={brief.s10_subtitleRules} onChange={u("s10_subtitleRules")} rows={2} /></div>
          <div><FL>音楽ジャンル・使用したい／避けたい音</FL><Txt value={brief.s10_music} onChange={u("s10_music")} rows={2} /></div>
          <div><FL required>ロゴ・CTA・法定表記の表示時間と位置</FL><Txt value={brief.s10_logoDisplay} onChange={u("s10_logoDisplay")} rows={2} /></div>
        </Acc>

        {/* S11 */}
        <Acc no="S11" title="権利・許諾・法務" {...acc("S11")}>
          <div>
            <FL>確認対象</FL>
            <Checks cols={2} options={["出演同意","肖像権","音源ライセンス","写真・映像素材","ロケ地許可","建物・美術品","商標・ロゴ","商品表示","口コミ・顧客情報","未成年者同意","ドローン許可","二次利用","未定／相談したい","その他"]}
              selected={brief.s11_rights} onToggle={tc("s11_rights")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>使用媒体</FL><Inp value={brief.s11_medium} onChange={u("s11_medium")} /></div>
            <div><FL>使用地域</FL><Inp value={brief.s11_region} onChange={u("s11_region")} /></div>
            <div><FL>使用期間</FL><Inp value={brief.s11_period} onChange={u("s11_period")} /></div>
            <div>
              <FL>広告利用</FL>
              <Radios cols={2} options={["あり","なし"]} selected={brief.s11_adUse} onSelect={u("s11_adUse")} />
            </div>
            <div>
              <FL>編集・切抜き</FL>
              <Radios cols={2} options={["可","条件あり"]} selected={brief.s11_editRights} onSelect={u("s11_editRights")} />
            </div>
            <div>
              <FL>実績掲載</FL>
              <Radios cols={3} options={["可","不可","公開後可"]} selected={brief.s11_portfolioUse} onSelect={u("s11_portfolioUse")} />
            </div>
          </div>
          <div><FL required>権利者・許諾取得担当・証跡保管</FL><Txt value={brief.s11_rightsOwner} onChange={u("s11_rightsOwner")} rows={2} /></div>
          <div><FL required>必須注記・法務／監修承認・NG表現</FL><Txt value={brief.s11_legalNotes} onChange={u("s11_legalNotes")} rows={3} /></div>
        </Acc>

        {/* S12 */}
        <Acc no="S12" title="確認・修正・納品・保管" {...acc("S12")}>
          <div>
            <FL>確認工程</FL>
            <ReviewTable brief={brief} onChange={onChange} />
          </div>
          <div><FL required>修正指示の集約方法・承認に必要な日数</FL><Txt value={brief.s12_revisionProcess} onChange={u("s12_revisionProcess")} rows={2} /></div>
          <div><FL>納品先・ファイル名・フォルダ構成・メタデータ</FL><Txt value={brief.s12_delivery} onChange={u("s12_delivery")} rows={2} /></div>
          <div><FL>プロジェクト／素材の保管期間と再編集条件</FL><Txt value={brief.s12_storage} onChange={u("s12_storage")} rows={2} /></div>
          <div><FL>公開後の差替え・短尺化・追加版の可能性</FL><Txt value={brief.s12_postChanges} onChange={u("s12_postChanges")} rows={2} /></div>
        </Acc>

        {/* S13 */}
        <Acc no="S13" title="予算・スケジュール・効果測定" {...acc("S13")}>
          <div>
            <FL>制作予算（税別）</FL>
            <Radios cols={3} options={["〜30万円","30〜50万円","50〜100万円","100〜300万円","300万円〜","未定"]}
              selected={brief.s13_budget} onSelect={u("s13_budget")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><FL>撮影・出演・場所実費</FL><Inp value={brief.s13_expensesBudget} onChange={u("s13_expensesBudget")} /></div>
            <div><FL>公開日</FL><Inp value={brief.s13_publishDate} onChange={u("s13_publishDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div><FL>初稿希望</FL><Inp value={brief.s13_draftDate} onChange={u("s13_draftDate")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div><FL>見積期限</FL><Inp value={brief.s13_quotationDeadline} onChange={u("s13_quotationDeadline")} placeholder="〇〇年〇〇月〇〇日" /></div>
            <div><FL>支払条件</FL><Inp value={brief.s13_payment} onChange={u("s13_payment")} /></div>
          </div>
          <div>
            <FL>効果指標</FL>
            <Checks cols={2} options={["再生数","到達人数","視聴完了率","平均視聴時間","クリック","購入・申込","指名検索","営業利用","社内理解","来場・応募","未定／相談したい","その他"]}
              selected={brief.s13_metrics} onToggle={tc("s13_metrics")} />
          </div>
          <div><FL required>予算内で最優先に残す表現・仕様</FL><Txt value={brief.s13_prioritySpec} onChange={u("s13_prioritySpec")} rows={2} /></div>
          <div><FL>公開媒体の分析環境と目標値</FL><Txt value={brief.s13_analyticsGoals} onChange={u("s13_analyticsGoals")} rows={2} /></div>
          <div><FL>追加費用が発生する条件で確認したい点</FL><Txt value={brief.s13_additionalCosts} onChange={u("s13_additionalCosts")} rows={2} /></div>
        </Acc>

        {/* S14 */}
        <Acc no="S14" title="制作方針まとめ・最終確認" {...acc("S14")}>
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
                        const k = `s14_${f}${n}` as keyof VideoBrief;
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
