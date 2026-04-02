import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import type { BrandScanReport } from "./types";

const dimensionLabels: Record<string, { full: string; short: string }> = {
  identidade_visual: { full: "Identidade Visual", short: "Id. Visual" },
  naming: { full: "Naming", short: "Naming" },
  proposta_de_valor: { full: "Proposta de Valor", short: "Proposta" },
  tom_de_voz: { full: "Tom de Voz", short: "Tom de Voz" },
  diferenciacao: { full: "Diferenciação", short: "Diferenciação" },
  coesao_de_marca: { full: "Coesão de Marca", short: "Coesão" },
};

const dimColor = (score: number) => {
  if (score >= 7) return "#2ed573";
  if (score >= 5) return "#FFD600";
  return "#FF6B35";
};

const priorityBadgeClass = (label: string) => {
  if (label === "Alto")
    return { color: "#2ed573", border: "rgba(46,213,115,0.3)", bg: "rgba(46,213,115,0.08)" };
  if (label === "Médio")
    return { color: "#FFD600", border: "rgba(255,214,0,0.3)", bg: "rgba(255,214,0,0.08)" };
  return { color: "rgba(255,255,255,0.5)", border: "rgba(255,255,255,0.15)", bg: "transparent" };
};

export const ReportSections = ({ report: r }: { report: BrandScanReport }) => {
  const radarData = Object.entries(r.dimensoes).map(([key, dim]) => ({
    subject: dimensionLabels[key]?.short || key,
    fullName: dimensionLabels[key]?.full || key,
    value: dim.score,
    fullMark: 10,
  }));

  return (
    <div className="max-w-[1100px] mx-auto px-4">
      {/* Resumo Executivo */}
      <SectionTitle>Resumo Executivo</SectionTitle>
      <div className="glass-card rounded-[18px] p-7 mb-10">
        <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>{r.resumo_executivo}</p>
      </div>

      {/* Pontos Fortes + Oportunidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="glass-card rounded-[18px] p-6">
          <h3 className="flex items-center gap-2 font-bold mb-4" style={{ color: "#2ed573" }}>
            <i className="fi fi-rr-check-circle" style={{ fontSize: 20 }} /> PONTOS FORTES
          </h3>
          <ul className="space-y-2">
            {r.pontos_fortes.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <span className="mt-0.5" style={{ color: "#2ed573" }}>✓</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="glass-card rounded-[18px] p-6"
          style={{ borderColor: "rgba(255,107,53,0.2)", background: "rgba(255,107,53,0.04)" }}
        >
          <h3 className="flex items-center gap-2 font-bold mb-4" style={{ color: "#FF6B35" }}>
            <i className="fi fi-rr-chart-line-up" style={{ fontSize: 20 }} /> OPORTUNIDADES
          </h3>
          <ul className="space-y-2">
            {r.oportunidades.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <span className="mt-0.5" style={{ color: "#FF6B35" }}>→</span> {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recomendação Prioritária */}
      <SectionTitle>Recomendação Prioritária</SectionTitle>
      <div
        className="flex gap-4 rounded-[18px] p-7 mb-10"
        style={{
          background: "rgba(255,107,53,0.06)",
          border: "1px solid rgba(255,107,53,0.25)",
        }}
      >
        <i className="fi fi-rr-bullseye shrink-0" style={{ fontSize: 36, color: "#FF6B35", marginTop: -6 }} />
        <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>{r.recomendacao_prioritaria}</p>
      </div>

      {/* Performance por Dimensão */}
      <SectionTitle>Performance por Dimensão</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-start">
        {/* Radar */}
        <div className="glass-card rounded-[18px] p-6">
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                axisLine={false}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#FF6B35"
                fill="rgba(255,107,53,0.12)"
                strokeWidth={2}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div
                      className="rounded-[10px] px-3 py-2"
                      style={{
                        background: "rgba(10,10,10,0.92)",
                        border: "1px solid rgba(255,107,53,0.4)",
                      }}
                    >
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>{d.fullName}</div>
                      <div style={{ color: "#FF6B35", fontSize: "1.3rem", fontWeight: 900 }}>{d.value}/10</div>
                    </div>
                  );
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dimension Cards */}
        <div className="flex flex-col gap-3">
          {Object.entries(r.dimensoes).map(([key, dim]) => (
            <DimensionCard
              key={key}
              label={dimensionLabels[key]?.full || key}
              score={dim.score}
              analise={dim.analise}
            />
          ))}
        </div>
      </div>

      {/* Oportunidades Priorizadas */}
      {r.oportunidades_priorizadas?.length > 0 && (
        <>
          <SectionTitle>Oportunidades Priorizadas</SectionTitle>
          <div className="glass-card rounded-[18px] overflow-hidden mb-10">
            <div
              className="grid gap-4 p-4 text-xs uppercase tracking-wider border-b"
              style={{
                gridTemplateColumns: "1fr auto auto auto",
                color: "rgba(255,255,255,0.3)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <span>Ação</span>
              <span className="hidden sm:block">Impacto</span>
              <span className="hidden sm:block">Esforço</span>
              <span>Prioridade</span>
            </div>
            {r.oportunidades_priorizadas.map((op, i) => (
              <div
                key={i}
                className="grid gap-4 p-4 items-center border-b last:border-0"
                style={{
                  gridTemplateColumns: "1fr auto auto auto",
                  borderColor: "rgba(255,255,255,0.04)",
                }}
              >
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{op.acao}</p>
                <span className="hidden sm:block"><PriorityBadge label={op.impacto} /></span>
                <span className="hidden sm:block"><PriorityBadge label={op.esforco} /></span>
                <PriorityBadge label={op.prioridade} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Plano 4 Semanas */}
      {r.plano_4_semanas?.length > 0 && (
        <>
          <SectionTitle>Plano de Ação — 4 Semanas</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {r.plano_4_semanas.map((sem) => (
              <div key={sem.semana} className="glass-card rounded-[18px] p-6">
                <h4
                  className="font-display font-bold mb-3"
                  style={{ color: "#FF6B35", fontSize: "0.78rem", letterSpacing: "2px" }}
                >
                  SEMANA {sem.semana}
                </h4>
                <ul className="space-y-2">
                  {sem.acoes.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <span style={{ color: "#FF6B35" }}>→</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Conclusão */}
      <SectionTitle>Conclusão</SectionTitle>
      <div className="glass-card rounded-[18px] p-7 mb-10">
        <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>{r.conclusao}</p>
      </div>
    </div>
  );
};

/* ---------- Helpers ---------- */

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-4">
    <p className="uppercase font-bold shrink-0" style={{ fontSize: "0.72rem", letterSpacing: "3px", color: "#FF6B35" }}>
      {children}
    </p>
    <div className="flex-1 h-px" style={{ background: "rgba(255,107,53,0.15)" }} />
  </div>
);

const DimensionCard = ({ label, score, analise }: { label: string; score: number; analise: string }) => {
  const [hovered, setHovered] = useState(false);
  const color = dimColor(score);

  return (
    <div
      className="glass-card rounded-[14px] p-4 transition-colors cursor-default"
      style={{
        borderColor: hovered ? "rgba(255,107,53,0.35)" : undefined,
        background: hovered ? "rgba(255,107,53,0.04)" : undefined,
      }}
      title={analise}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-sm text-foreground">{label}</h4>
        <span className="text-2xl font-bold" style={{ color }}>{score}</span>
      </div>
      <div className="w-full h-[5px] rounded-full mb-2" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(score / 10) * 100}%`, background: color }}
        />
      </div>
      {hovered && (
        <p className="text-sm mt-2 animate-in fade-in duration-200" style={{ color: "rgba(255,255,255,0.55)" }}>
          {analise}
        </p>
      )}
    </div>
  );
};

const PriorityBadge = ({ label }: { label: string }) => {
  const s = priorityBadgeClass(label);
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full border whitespace-nowrap"
      style={{ color: s.color, borderColor: s.border, background: s.bg }}
    >
      {label}
    </span>
  );
};
