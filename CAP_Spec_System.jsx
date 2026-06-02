import { useState, useMemo } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1, pts: "PTS-4", name: "CAP Project Emulsion Intermediate Base",
    line: "X943-LINE", type: "Emulsion", status: "Active",
    date: "25/03/24", supersedes: "PTS dated 24/06/15",
    safetyDangers: "Can cause irritation to skin and be harmful if swallowed",
    safetyPrecautions: "Wash hands, face, and skin immediately with plenty water after contact and prevent ingestion",
    safetyPPE: "Wear Leather apron, safety goggle, nose mask when handling",
    specs: [
      { test: "Viscosity", requirements: "7.0 – 9.0 poises", procedure: "Measure with Sheen Rotothinner @ 27 ± 2°C. If too high, adjust with solvent indicated in recipe", minVal: 7.0, maxVal: 9.0, unit: "poises" },
      { test: "WPL", requirements: "± 0.1 of specification on formulation card", procedure: "Measure using Density Cup", minVal: null, maxVal: null, unit: "" },
      { test: "Dispersion", requirements: "0.1% max", procedure: "Weigh 100g of the millbase and run under water to check dispersion of the pigment as stated on the work order. Weigh the empty mesh and the mesh with the residue after dispersion. Allow the mesh to dry under the light for 15 minutes before taking the weight. Differences in weight will be calculated to know the % weight of the residue which should not be more than 0.1%.", minVal: null, maxVal: 0.1, unit: "%" },
      { test: "Film", requirements: "Film to be free from bits, excellent flow, and discoloration", procedure: "Apply on panel", minVal: null, maxVal: null, unit: "" },
      { test: "pH", requirements: "8.0 – 8.5", procedure: "Check with pH Meter", minVal: 8.0, maxVal: 8.5, unit: "" },
    ]
  },
  {
    id: 2, pts: "PTS-9", name: "CAP Acrylic Satin",
    line: "A933-LINE", type: "Satin", status: "Active",
    date: "—", supersedes: "—",
    safetyDangers: "Can cause irritation to skin and be harmful if swallowed",
    safetyPrecautions: "Wash hands, face, and skin immediately with plenty water after contact and prevent ingestion",
    safetyPPE: "Wear Leather apron, safety goggle, nose mask when handling",
    specs: [
      { test: "WPL – Light Colour", requirements: "1.05 – 1.20", procedure: "Measure using Density Cup", minVal: 1.05, maxVal: 1.20, unit: "" },
      { test: "WPL – Deep Colour", requirements: "1.03 – 1.20", procedure: "Measure using Density Cup", minVal: 1.03, maxVal: 1.20, unit: "" },
      { test: "Viscosity", requirements: "3.0 – 4.0 poises @ 27 ± 2°C", procedure: "Measure with viscometer", minVal: 3.0, maxVal: 4.0, unit: "poises" },
      { test: "pH", requirements: "8.0 – 8.5", procedure: "Check with pH Meter", minVal: 8.0, maxVal: 8.5, unit: "" },
      { test: "Opacity", requirements: "2–3 coats for white/light/deep shades", procedure: "Apply using 100 microns k-bar, spread film on Morex chart", minVal: null, maxVal: null, unit: "" },
      { test: "Colour", requirements: '"A" Match to standard', procedure: "Spectrophotometer", minVal: null, maxVal: null, unit: "" },
      { test: "Film", requirements: "Free from bits, excellent flow, no discoloration", procedure: "Apply on panel", minVal: null, maxVal: null, unit: "" },
      { test: "Drying Time", requirements: "Touch Dry: 10–20 min | Hard Dry: 1–2 hrs", procedure: "Apply on panel", minVal: null, maxVal: null, unit: "" },
      { test: "Gloss 85° (ASTM D523)", requirements: "White/Light: 8–12% on 60° | Deep: 4–8% on 60°", procedure: "Apply on 4″×6″ glass panel using Doctor's blade. Check gloss after 1 hour.", minVal: null, maxVal: null, unit: "%" },
      { test: "Coarse Particles / Foreign Matter", requirements: "1.0% max", procedure: "Manual inspection", minVal: null, maxVal: 1.0, unit: "%" },
      { test: "Resistance to Wet Abrasion", requirements: "5,000 cycles minimum", procedure: "Scrub test", minVal: 5000, maxVal: null, unit: "cycles" },
      { test: "Spreading Rate", requirements: "12 m²/L", procedure: "Apply on Morest chart and calculate", minVal: null, maxVal: null, unit: "m²/L" },
    ]
  },
  {
    id: 3, pts: "PTS-9B", name: "Spruce Acrylic Satin",
    line: "—", type: "Satin", status: "Active",
    date: "24/04/26", supersedes: "PTS dated 19/01/26",
    safetyDangers: "Can cause irritation to skin and be harmful if swallowed",
    safetyPrecautions: "Wash hands, face, and skin immediately with plenty water after contact and prevent ingestion",
    safetyPPE: "Wear Leather apron, safety goggle, nose mask when handling",
    approvals: [
      { role: "Development Chemist", date: "24/04/26" },
      { role: "Development Specialist", date: "26/04/26" },
      { role: "Development Lead", date: "26/04/26" },
      { role: "Quality Control Lead", date: "28/04/26" },
      { role: "Technical Manager", date: "28/04/26" },
    ],
    specs: [
      { test: "Viscosity", requirements: "4.0 – 4.5 poises", procedure: "Measure with Sheen Rotothinner @ 27 ± 2°C. If too high, adjust viscosity as indicated in the recipe", minVal: 4.0, maxVal: 4.5, unit: "poises" },
      { test: "WPL", requirements: "1.05 – 1.30", procedure: "Measure using the Density Cup", minVal: 1.05, maxVal: 1.30, unit: "" },
      { test: "Dispersion", requirements: "0.1% max", procedure: "Weigh 100g of the millbase and run under water to check the dispersion of the pigment as stated on the work order. Weigh the empty mesh and the mesh with the residue after dispersion. Allow the mesh to dry under the light for 15 minutes. Weight differences will be calculated to determine the % weight of the residue, which should not exceed 0.1%.", minVal: null, maxVal: 0.1, unit: "%" },
      { test: "Colour", requirements: '"A Match to Standard"', procedure: "Use the spectrophotometer to match", minVal: null, maxVal: null, unit: "" },
      { test: "Drying Time", requirements: "Touch Dry: 10–20 mins | Hard Dry: 1–2 hours", procedure: "Apply on a Morest chart", minVal: null, maxVal: null, unit: "" },
      { test: "Film", requirements: "Free from bits, excellent flow, and no discoloration", procedure: "Apply on a Morest chart", minVal: null, maxVal: null, unit: "" },
      { test: "pH", requirements: "7.0 – 9.0", procedure: "Check with pH Meter", minVal: 7.0, maxVal: 9.0, unit: "" },
      { test: "Opacity", requirements: "2 Coats", procedure: "Using 2' brush/K-bar spread film on Morest chart", minVal: null, maxVal: null, unit: "" },
      { test: "Gloss", requirements: "30% minimum on 85 degrees", procedure: "Apply on glass panel. Check the gloss level after drying for 1 hour at room temperature", minVal: 30, maxVal: null, unit: "%" },
      { test: "Resistance to Wet Abrasion", requirements: "5000 cycles minimum", procedure: "Apply on the scrub test panel and conduct the scrub test after exposing for 7 days at room temperature", minVal: 5000, maxVal: null, unit: "cycles" },
      { test: "Coarse Particles", requirements: "1.0% Maximum", procedure: "Check the manual for instructions to carry out the test", minVal: null, maxVal: 1.0, unit: "%" },
      { test: "Spreading Rate", requirements: "Standard: 13 m²/L", procedure: "Apply on a Morest chart and calculate", minVal: null, maxVal: null, unit: "m²/L" },
    ]
  },
  {
    id: 4, pts: "PTS-10", name: "CAP Screeding Filler",
    line: "A942-LINE", type: "Filler", status: "Active",
    date: "25/11/2020", supersedes: "Specification dated 28/07/20",
    safetyDangers: "Can cause irritation to skin and be harmful if swallowed",
    safetyPrecautions: "Wash hands, face and skin immediately with plenty water after contact and prevent ingestion",
    safetyPPE: "Wear Leather apron, safety goggle, nose mask when handling",
    approvals: [
      { role: "Raw Material Analyst", date: "26/11/2020" },
      { role: "Technical Manager", date: "26/11/2020" },
      { role: "Plant & Maintenance Manager", date: "26/11/2020" },
    ],
    specs: [
      { test: "WPL", requirements: "± 0.10 of specification on formulation card", procedure: "Measure using Density Cup", minVal: null, maxVal: null, unit: "" },
      { test: "Viscosity", requirements: "220 – 240 Poises on RT @ 27 ± 2°C", procedure: "Measure with viscometer", minVal: 220, maxVal: 240, unit: "Poises" },
      { test: "pH", requirements: "8 – 10", procedure: "Check with pH Meter", minVal: 8, maxVal: 10, unit: "" },
      { test: "Drying Time", requirements: "Touch dry: 1hr–2hrs | Hard dry: 18hrs–24hrs", procedure: "Apply on asbestos panel with scrapper", minVal: null, maxVal: null, unit: "" },
      { test: "Spreading Rate", requirements: "Up to 1.5 m²/L", procedure: "Apply on panel and calculate", minVal: null, maxVal: 1.5, unit: "m²/L" },
    ]
  },
  {
    id: 5, pts: "PTS-11", name: "Biocidal Wash",
    line: "A936-1", type: "Wash", status: "Active",
    date: "19/02/10", supersedes: "—",
    safetyDangers: "—", safetyPrecautions: "—", safetyPPE: "—",
    approvals: [
      { role: "Product Development Manager", date: "19/02/2010" },
      { role: "Quality Assurance Manager", date: "19/02/2010" },
      { role: "Plant Manager", date: "19/02/2010" },
      { role: "Technical Operation Manager", date: "19/02" },
    ],
    specs: [
      { test: "WPL", requirements: "± 0.02 of the specification on the formulation card", procedure: "Measure using Density Cup", minVal: null, maxVal: null, unit: "" },
      { test: "Appearance", requirements: "Clean and clear appearance | No sediments", procedure: "Visual inspection", minVal: null, maxVal: null, unit: "" },
    ]
  },
  {
    id: 6, pts: "PTS-12", name: "Dulux Weathershield Smooth Intermediate Base",
    line: "X970-LINE", type: "Weathershield", status: "Active",
    date: "25/03/24", supersedes: "PTS dated 30/04/19",
    safetyDangers: "Can cause irritation to skin and be harmful if swallowed",
    safetyPrecautions: "Wash hands, face, and skin immediately with plenty water after contact and prevent ingestion",
    safetyPPE: "Wear Leather apron, safety goggle, nose mask when handling",
    specs: [
      { test: "Viscosity (Gel Strength)", requirements: "70–80 gmcmrt @ 27 ± 2°C", procedure: "Measure with Gel Strength tester @ 27 ± 2°C. If too high, adjust with solvent indicated in recipe", minVal: 70, maxVal: 80, unit: "gmcmrt" },
      { test: "WPL", requirements: "± 0.1 of specification on formulation card", procedure: "Measure using Density Cup", minVal: null, maxVal: null, unit: "" },
      { test: "Dispersion", requirements: "0.1% max", procedure: "Weigh 100g of the millbase and run under water to check dispersion of the pigment as stated on the work order. Weigh the empty mesh and the mesh with the residue after dispersion. Allow the mesh to dry under the light for 15 minutes before taking the weight. Differences in weight will be calculated to know the % weight of the residue which should not be more than 0.1%.", minVal: null, maxVal: 0.1, unit: "%" },
      { test: "Film", requirements: "Free from bits, excellent flow, and discoloration", procedure: "Apply on panel", minVal: null, maxVal: null, unit: "" },
      { test: "pH", requirements: "7.5 – 9.50", procedure: "Check with pH Meter", minVal: 7.5, maxVal: 9.5, unit: "" },
    ]
  },
  {
    id: 7, pts: "PTS-13", name: "Caplux Textured Intermediate Base",
    line: "X956-LINE", type: "Textured", status: "Active",
    date: "30/04/19", supersedes: "PTS 13 dated 15/09/10",
    safetyDangers: "—", safetyPrecautions: "—", safetyPPE: "—",
    approvals: [
      { role: "Development Manager", date: "30/04/19" },
      { role: "Research & Development Manager", date: "06/05/19" },
      { role: "Plant Manager", date: "06/05/19" },
      { role: "Health, Safety, Environment & Quality Assurance Manager", date: "06/05/19" },
    ],
    specs: [
      { test: "WPL", requirements: "+/- 0.10 of specification on formulation card", procedure: "Measure using Density Cup", minVal: null, maxVal: null, unit: "" },
      { test: "Gel Strength", requirements: "60–65 gm/cm on RT @ 27 ± 2°C", procedure: "Measure with Gel Strength tester", minVal: 60, maxVal: 65, unit: "gm/cm" },
      { test: "pH", requirements: "7.5 – 9.0", procedure: "Check with pH Meter", minVal: 7.5, maxVal: 9.0, unit: "" },
    ]
  },
  {
    id: 8, pts: "PTS-14", name: "Caplux Emulsion Intermediate Base",
    line: "X939-LINE", type: "Emulsion", status: "Active",
    date: "25/03/24", supersedes: "PTS dated 25/09/14",
    safetyDangers: "Can cause irritation to skin and be harmful if swallowed",
    safetyPrecautions: "Wash hands, face, and skin immediately with plenty water after contact and prevent ingestion",
    safetyPPE: "Wear Leather apron, safety goggle, nose mask when handling",
    specs: [
      { test: "Viscosity", requirements: "7.0 – 9.0 poises", procedure: "Measure with Sheen Rotothinner @ 27 ± 2°C. If too high, adjust with solvent indicated in recipe", minVal: 7.0, maxVal: 9.0, unit: "poises" },
      { test: "WPL", requirements: "± 0.1 of specification on formulation card", procedure: "Measure using Density Cup", minVal: null, maxVal: null, unit: "" },
      { test: "Dispersion", requirements: "0.1% max", procedure: "Weigh 100g of the millbase and run under water to check dispersion of the pigment as stated on the work order. Weigh the empty mesh and the mesh with the residue after dispersion. Allow the mesh to dry under the light for 15 minutes before taking the weight. Differences in weight will be calculated to know the % weight of the residue which should not be more than 0.1%.", minVal: null, maxVal: 0.1, unit: "%" },
      { test: "Film", requirements: "Free from bits, excellent flow, and discoloration", procedure: "Apply on panel", minVal: null, maxVal: null, unit: "" },
      { test: "pH", requirements: "8.0 – 8.5", procedure: "Check with pH Meter", minVal: 8.0, maxVal: 8.5, unit: "" },
    ]
  },
  {
    id: 9, pts: "PTS-14B", name: "Spruce Emulsion Intermediate Bases",
    line: "—", type: "Emulsion", status: "Active",
    date: "19/01/26", supersedes: "—",
    safetyDangers: "Can cause irritation to skin and be harmful if swallowed",
    safetyPrecautions: "Wash hands, face, and skin immediately with plenty water after contact and prevent ingestion",
    safetyPPE: "Wear Leather apron, safety goggle, nose mask when handling",
    specs: [
      { test: "Viscosity", requirements: "7.0 – 8.0 poises", procedure: "Measure with Sheen Rotothinner @ 27 ± 2°C. If it is too high, adjust with the solvent indicated in the recipe", minVal: 7.0, maxVal: 8.0, unit: "poises" },
      { test: "WPL", requirements: "± 0.1 of specification on formulation card", procedure: "Measure using the Density Cup", minVal: null, maxVal: null, unit: "" },
      { test: "Dispersion", requirements: "0.1% max", procedure: "Weigh 100g of the millbase and run under water to check the dispersion of the pigment as stated on the work order. Weigh the empty mesh and the mesh with the residue after dispersion. Allow the mesh to dry under the light for 15 minutes before taking the weight. Differences in weight will be calculated to know the % weight of the residue which should not be more than 0.1%.", minVal: null, maxVal: 0.1, unit: "%" },
      { test: "Film", requirements: "Film to be free from bits, excellent flow, and discoloration", procedure: "Apply on panel", minVal: null, maxVal: null, unit: "" },
      { test: "pH", requirements: "7.0 – 9.0", procedure: "Check with the pH Meter", minVal: 7.0, maxVal: 9.0, unit: "" },
    ]
  },
];

const TYPE_COLORS = {
  Emulsion: "#0ea5e9", Satin: "#8b5cf6", Filler: "#f59e0b",
  Wash: "#10b981", Weathershield: "#3b82f6", Textured: "#ec4899",
};

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16 }) => {
  const icons = {
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    flask: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3h6m-3 0v8l4.5 7.5A2 2 0 0 1 14.76 21H9.24a2 2 0 0 1-1.74-2.5L12 11"/><path d="M6.5 14.5h11"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    print: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
    warning: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    lab: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/></svg>,
  };
  return icons[name] || null;
};

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function Badge({ type }) {
  const color = TYPE_COLORS[type] || "#64748b";
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}55`,
      borderRadius: 4, fontSize: 11, fontWeight: 700, padding: "2px 8px",
      letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "monospace",
    }}>{type}</span>
  );
}

function PTSBadge({ pts }) {
  return (
    <span style={{
      background: "#1e293b", color: "#94a3b8", border: "1px solid #334155",
      borderRadius: 4, fontSize: 11, fontWeight: 700, padding: "2px 8px",
      letterSpacing: "0.08em", fontFamily: "monospace",
    }}>{pts}</span>
  );
}

function SafetyBox({ product }) {
  if (!product.safetyDangers || product.safetyDangers === "—") return null;
  return (
    <div style={{
      background: "linear-gradient(135deg, #7f1d1d22, #991b1b11)",
      border: "1px solid #991b1b44", borderRadius: 8, padding: "16px 20px", marginBottom: 20
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "#fca5a5", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <Icon name="warning" size={14} /> Safety Measures
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {[["Dangers", product.safetyDangers], ["Precautions", product.safetyPrecautions], ["PPE", product.safetyPPE]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 8, fontSize: 12, color: "#cbd5e1" }}>
            <span style={{ color: "#f87171", fontWeight: 700, minWidth: 80 }}>{k}:</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecTable({ specs }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {["Test / Method", "Requirements / Limits", "Procedure"].map(h => (
              <th key={h} style={{
                background: "#0f172a", color: "#64748b", padding: "10px 14px",
                textAlign: "left", fontWeight: 700, fontSize: 11,
                letterSpacing: "0.08em", textTransform: "uppercase",
                borderBottom: "2px solid #1e293b",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.map((s, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #1e293b" }}>
              <td style={{ padding: "12px 14px", color: "#38bdf8", fontWeight: 700, fontFamily: "monospace", fontSize: 12, whiteSpace: "nowrap", verticalAlign: "top" }}>{s.test}</td>
              <td style={{ padding: "12px 14px", color: "#e2e8f0", fontWeight: 600, verticalAlign: "top" }}>{s.requirements}</td>
              <td style={{ padding: "12px 14px", color: "#94a3b8", lineHeight: 1.6, verticalAlign: "top", fontSize: 12 }}>{s.procedure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApprovalSection({ approvals }) {
  if (!approvals || !approvals.length) return null;
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ color: "#64748b", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Approval Levels</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {approvals.map((a, i) => (
          <div key={i} style={{
            background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8,
            padding: "10px 14px", minWidth: 160
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#4ade80", marginBottom: 4 }}>
              <Icon name="check" size={12} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#64748b" }}>Approved</span>
            </div>
            <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 12 }}>{a.role}</div>
            <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{a.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── VIEWS ─────────────────────────────────────────────────────────────────────
function DetailView({ product, onBack }) {
  const [tab, setTab] = useState("specs");
  return (
    <div style={{ animation: "fadeIn 0.25s ease" }}>
      <button onClick={onBack} style={{
        background: "none", border: "1px solid #1e293b", color: "#64748b",
        borderRadius: 6, padding: "6px 14px", cursor: "pointer", display: "flex",
        alignItems: "center", gap: 6, fontSize: 13, marginBottom: 20,
        transition: "all 0.15s"
      }}
        onMouseOver={e => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.borderColor = "#334155"; }}
        onMouseOut={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "#1e293b"; }}
      >
        <Icon name="back" size={14} /> Back to Products
      </button>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        border: "1px solid #334155", borderRadius: 12, padding: "24px 28px", marginBottom: 20
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
              <PTSBadge pts={product.pts} />
              <Badge type={product.type} />
              <span style={{ background: "#16a34a22", color: "#4ade80", border: "1px solid #16a34a44", borderRadius: 4, fontSize: 11, fontWeight: 700, padding: "2px 8px" }}>Active</span>
            </div>
            <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{product.name}</h2>
            {product.line !== "—" && <div style={{ color: "#38bdf8", fontSize: 12, marginTop: 6, fontFamily: "monospace" }}>Line: {product.line}</div>}
          </div>
          <button onClick={() => window.print()} style={{
            background: "#1e293b", border: "1px solid #334155", color: "#94a3b8",
            borderRadius: 8, padding: "8px 16px", cursor: "pointer", display: "flex",
            alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600
          }}>
            <Icon name="print" size={13} /> Print
          </button>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
          {[["Issue Date", product.date], ["Supersedes", product.supersedes]].map(([l, v]) => (
            <div key={l}>
              <div style={{ color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
              <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>{v}</div>
            </div>
          ))}
          <div>
            <div style={{ color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Parameters</div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>{product.specs.length} tests</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {[["specs", "Specifications"], ["safety", "Safety"], ["approvals", "Approvals"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            background: tab === id ? "#0ea5e9" : "#1e293b",
            color: tab === id ? "#fff" : "#64748b",
            border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer",
            fontSize: 13, fontWeight: 600, transition: "all 0.15s"
          }}>{label}</button>
        ))}
      </div>

      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden" }}>
        {tab === "specs" && <SpecTable specs={product.specs} />}
        {tab === "safety" && (
          <div style={{ padding: 24 }}>
            <SafetyBox product={product} />
            {product.safetyDangers === "—" && <p style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>No safety information recorded for this specification.</p>}
          </div>
        )}
        {tab === "approvals" && (
          <div style={{ padding: 24 }}>
            <ApprovalSection approvals={product.approvals} />
            {!product.approvals && <p style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>No approval records digitized for this specification.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardView({ onSelect }) {
  const byType = useMemo(() => {
    const map = {};
    PRODUCTS.forEach(p => { map[p.type] = (map[p.type] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, []);

  const allParams = useMemo(() => {
    const map = {};
    PRODUCTS.forEach(p => p.specs.forEach(s => { map[s.test] = (map[s.test] || 0) + 1; }));
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, []);

  const maxCount = Math.max(...byType.map(([, c]) => c));

  return (
    <div style={{ animation: "fadeIn 0.25s ease" }}>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          ["Total PTS", PRODUCTS.length, "#0ea5e9", "lab"],
          ["Product Types", new Set(PRODUCTS.map(p => p.type)).size, "#8b5cf6", "grid"],
          ["Total Tests", PRODUCTS.reduce((a, p) => a + p.specs.length, 0), "#10b981", "flask"],
          ["Active Specs", PRODUCTS.filter(p => p.status === "Active").length, "#f59e0b", "check"],
        ].map(([label, val, color, icon]) => (
          <div key={label} style={{
            background: `linear-gradient(135deg, ${color}15, ${color}08)`,
            border: `1px solid ${color}33`, borderRadius: 12, padding: "18px 20px"
          }}>
            <div style={{ color, marginBottom: 8 }}><Icon name={icon} size={18} /></div>
            <div style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em" }}>{val}</div>
            <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Products by Type */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
          <div style={{ color: "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Products by Type</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {byType.map(([type, count]) => (
              <div key={type}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{type}</span>
                  <span style={{ color: TYPE_COLORS[type] || "#64748b", fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>{count}</span>
                </div>
                <div style={{ background: "#1e293b", borderRadius: 4, height: 6, overflow: "hidden" }}>
                  <div style={{
                    width: `${(count / maxCount) * 100}%`, height: "100%",
                    background: TYPE_COLORS[type] || "#64748b", borderRadius: 4,
                    transition: "width 0.6s ease"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Common Parameters */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
          <div style={{ color: "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Top Parameters Across Products</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {allParams.map(([param, count]) => (
              <div key={param}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{param}</span>
                  <span style={{ color: "#38bdf8", fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>{count} products</span>
                </div>
                <div style={{ background: "#1e293b", borderRadius: 4, height: 5, overflow: "hidden" }}>
                  <div style={{
                    width: `${(count / PRODUCTS.length) * 100}%`, height: "100%",
                    background: "#38bdf8", borderRadius: 4,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>All Specifications — Quick Access</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
          {PRODUCTS.map(p => (
            <button key={p.id} onClick={() => onSelect(p)} style={{
              background: "#0a1628", border: "1px solid #1e293b",
              borderRadius: 8, padding: "12px 16px", cursor: "pointer", textAlign: "left",
              transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "space-between"
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.background = "#162032"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.background = "#0a1628"; }}
            >
              <div>
                <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                  <PTSBadge pts={p.pts} />
                  <Badge type={p.type} />
                </div>
                <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                {p.line !== "—" && <div style={{ color: "#475569", fontSize: 11, marginTop: 2, fontFamily: "monospace" }}>{p.line}</div>}
              </div>
              <Icon name="eye" size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsView({ onSelect }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const types = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.type)))];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PRODUCTS.filter(p => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.pts.toLowerCase().includes(q) || p.line.toLowerCase().includes(q) || p.type.toLowerCase().includes(q);
      const matchType = filterType === "All" || p.type === filterType;
      return matchSearch && matchType;
    });
  }, [search, filterType]);

  return (
    <div style={{ animation: "fadeIn 0.25s ease" }}>
      {/* Search & Filter */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569" }}>
            <Icon name="search" size={16} />
          </div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, PTS number, line code…"
            style={{
              width: "100%", background: "#0f172a", border: "1px solid #1e293b",
              borderRadius: 8, padding: "10px 12px 10px 38px", color: "#e2e8f0",
              fontSize: 14, outline: "none", boxSizing: "border-box",
              fontFamily: "inherit"
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilterType(t)} style={{
              background: filterType === t ? (TYPE_COLORS[t] || "#0ea5e9") : "#1e293b",
              color: filterType === t ? "#fff" : "#64748b",
              border: "none", borderRadius: 6, padding: "8px 14px",
              cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.15s"
            }}>{t}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#475569" }}>
          No specifications match your search.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => onSelect(p)} style={{
              background: "#0f172a", border: "1px solid #1e293b",
              borderRadius: 12, padding: "18px 22px", cursor: "pointer",
              transition: "all 0.15s", display: "flex", justifyContent: "space-between",
              alignItems: "center", flexWrap: "wrap", gap: 12
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.background = "#131f32"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.background = "#0f172a"; }}
            >
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  <PTSBadge pts={p.pts} />
                  <Badge type={p.type} />
                  <span style={{ background: "#16a34a22", color: "#4ade80", border: "1px solid #16a34a44", borderRadius: 4, fontSize: 10, fontWeight: 700, padding: "2px 7px" }}>Active</span>
                </div>
                <div style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700 }}>{p.name}</div>
                <div style={{ display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" }}>
                  {p.line !== "—" && <span style={{ color: "#38bdf8", fontSize: 12, fontFamily: "monospace" }}>Line: {p.line}</span>}
                  <span style={{ color: "#64748b", fontSize: 12 }}>Issued: {p.date}</span>
                  <span style={{ color: "#64748b", fontSize: 12 }}>{p.specs.length} test parameters</span>
                </div>
              </div>
              <div style={{
                background: "#1e293b", border: "1px solid #334155", borderRadius: 8,
                padding: "8px 16px", color: "#94a3b8", fontSize: 12, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap"
              }}>
                <Icon name="eye" size={13} /> View Spec
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("dashboard"); // dashboard | products | detail
  const [selected, setSelected] = useState(null);

  const handleSelect = (p) => { setSelected(p); setView("detail"); };
  const handleBack = () => { setSelected(null); setView("products"); };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "chart" },
    { id: "products", label: "Specifications", icon: "flask" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#020917", fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
      color: "#e2e8f0"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
        @media print {
          nav, button { display: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>

      {/* Top Nav */}
      <nav style={{
        background: "linear-gradient(90deg, #020917, #0a1628)",
        borderBottom: "1px solid #1e293b", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60, position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
            width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Icon name="flask" size={16} />
          </div>
          <div>
            <div style={{ color: "#f1f5f9", fontWeight: 800, fontSize: 14, letterSpacing: "-0.01em" }}>CAP Product Spec System</div>
            <div style={{ color: "#334155", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.08em" }}>CHEMICAL AND ALLIED PRODUCTS PLC</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => { setView(n.id); setSelected(null); }} style={{
              background: view === n.id || (view === "detail" && n.id === "products") ? "#1e293b" : "none",
              color: view === n.id || (view === "detail" && n.id === "products") ? "#e2e8f0" : "#64748b",
              border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer",
              fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.15s"
            }}>
              <Icon name={n.icon} size={14} /> {n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
        {/* Page Title */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#f1f5f9", letterSpacing: "-0.03em" }}>
            {view === "dashboard" ? "Dashboard" : view === "products" ? "Specification Library" : selected?.name}
          </h1>
          <p style={{ margin: "4px 0 0", color: "#475569", fontSize: 13 }}>
            {view === "dashboard" ? `${PRODUCTS.length} product specifications · Quality Management System` :
             view === "products" ? "Search and view all Product Testing Specifications" :
             `${selected?.pts} · ${selected?.type} · ${selected?.specs.length} test parameters`}
          </p>
        </div>

        {view === "dashboard" && <DashboardView onSelect={handleSelect} />}
        {view === "products" && <ProductsView onSelect={handleSelect} />}
        {view === "detail" && selected && <DetailView product={selected} onBack={handleBack} />}
      </main>
    </div>
  );
}
