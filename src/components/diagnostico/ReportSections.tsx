import { useState, useEffect, useRef, useCallback } from "react";
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

const priorityBadgeStyle = (label: string) => {
  if (label === "Alto") return { color: "#2ed573", borderColor: "rgba(46,213,115,0.3)", background: "rgba(46,213,115,0.08)" };
  if (label === "Médio") return { color: "#FFD600", borderColor: "rgba(255,214,0,0.3)", background: "rgba(255,214,0,0.08)" };
  return { color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.15)", background: "transparent" };
};

const dimKeys = ["identidade_visual", "naming", "proposta_de_valor", "tom_de_voz", "diferenciacao", "coesao_de_marca"] as const;

export const ReportSections = ({ report: r }: { report: BrandScanReport }) => {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5% 5rem" }}>
      {/* Resumo Executivo */}
      <SectionTitle>Resumo Executivo</SectionTitle>
      <GlassCard style={{ marginBottom: "3.5rem" }}>
        <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "1rem" }}>{r.resumo_executivo}</p>
      </GlassCard>

      {/* Pontos Fortes + Oportunidades */}
      <div className="diag-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3.5rem" }}>
        {/* Pontos Fortes */}
        <GlassCard>
          <h3 className="flex items-center gap-2 font-bold mb-4" style={{ color: "#2ed573" }}>
            <i className="fi fi-rr-check-circle" style={{ fontSize: 20 }} /> Pontos Fortes
          </h3>
          <ul className="space-y-2">
            {r.pontos_fortes.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <span className="mt-0.5 shrink-0" style={{ color: "#2ed573" }}>✓</span> {p}
              </li>
            ))}
          </ul>
        </GlassCard>
        {/* Oportunidades */}
        <GlassCard style={{ borderColor: "rgba(255,107,53,0.2)", background: "rgba(255,107,53,0.04)" }}>
          <h3 className="flex items-center gap-2 font-bold mb-4" style={{ color: "#FF6B35" }}>
            <i className="fi fi-rr-chart-line-up" style={{ fontSize: 20 }} /> Oportunidades
          </h3>
          <ul className="space-y-2">
            {r.oportunidades.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <span className="mt-0.5 shrink-0" style={{ color: "#FF6B35" }}>→</span> {o}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Recomendação */}
      <SectionTitle>Recomendação Prioritária</SectionTitle>
      <div style={{
        display: "flex", gap: "1rem",
        background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.25)",
        borderRadius: 18, padding: "1.8rem 2rem", marginBottom: "3.5rem",
      }}>
        <i className="fi fi-rr-bullseye shrink-0" style={{ fontSize: 36, color: "#FF6B35", marginTop: -6 }} />
        <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>{r.recomendacao_prioritaria}</p>
      </div>

      {/* Performance por Dimensão */}
      <SectionTitle>Performance por Dimensão</SectionTitle>
      <div className="diag-viz-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start", marginBottom: "3.5rem" }}>
        <RadarChartCanvas report={r} />
        <div className="flex flex-col gap-3">
          {dimKeys.map((key) => {
            const dim = r.dimensoes[key];
            if (!dim) return null;
            return (
              <DimensionCard
                key={key}
                label={dimensionLabels[key]?.full || key}
                score={dim.score}
                analise={dim.analise}
              />
            );
          })}
        </div>
      </div>

      {/* Oportunidades Priorizadas */}
      {r.oportunidades_priorizadas?.length > 0 && (
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionTitle>Oportunidades Priorizadas</SectionTitle>
          <GlassCard style={{ padding: 0, overflow: "hidden" }}>
            <div
              className="diag-op-header"
              style={{
                display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "1rem",
                padding: "0.9rem 1.5rem",
                fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
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
                style={{
                  display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "1rem",
                  padding: "0.9rem 1.5rem", alignItems: "center",
                  borderBottom: i < r.oportunidades_priorizadas.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)" }}>{op.acao}</p>
                <span className="hidden sm:block"><Badge label={op.impacto} /></span>
                <span className="hidden sm:block"><Badge label={op.esforco} /></span>
                <Badge label={op.prioridade} />
              </div>
            ))}
          </GlassCard>
        </div>
      )}

      {/* Plano 4 Semanas */}
      {r.plano_4_semanas?.length > 0 && (
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionTitle>Plano de Ação — 4 Semanas</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
            {r.plano_4_semanas.map((sem) => (
              <GlassCard key={sem.semana}>
                <h4 style={{
                  fontSize: "0.78rem", letterSpacing: "2px", color: "#FF6B35",
                  fontWeight: 700, marginBottom: "1rem", fontFamily: "'Montserrat', sans-serif",
                }}>
                  SEMANA {sem.semana}
                </h4>
                <ul className="space-y-2">
                  {sem.acoes.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <span style={{ color: "#FF6B35" }}>→</span> {a}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Conclusão */}
      <SectionTitle>Conclusão</SectionTitle>
      <GlassCard style={{ marginBottom: "3.5rem" }}>
        <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "1rem" }}>{r.conclusao}</p>
      </GlassCard>
    </div>
  );
};

/* ---- Helpers ---- */

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-4">
    <span style={{
      fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase",
      color: "#FF6B35", fontWeight: 700, flexShrink: 0,
    }}>{children}</span>
    <div style={{ flex: 1, height: 1, background: "rgba(255,107,53,0.15)" }} />
  </div>
);

const GlassCard = ({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{
      background: "rgba(20,20,20,0.55)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 18,
      padding: "1.8rem 2rem",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

const Badge = ({ label }: { label: string }) => {
  const s = priorityBadgeStyle(label);
  return (
    <span style={{
      fontSize: "0.72rem", fontWeight: 600, padding: "4px 10px", borderRadius: 20,
      border: `1px solid ${s.borderColor}`, color: s.color, background: s.background,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
};

const DimensionCard = ({ label, score, analise }: { label: string; score: number; analise: string }) => {
  const [hovered, setHovered] = useState(false);
  const color = dimColor(score);

  return (
    <div
      style={{
        background: hovered ? "rgba(255,107,53,0.04)" : "rgba(20,20,20,0.55)",
        border: `1px solid ${hovered ? "rgba(255,107,53,0.35)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 14, padding: "1rem 1.3rem", cursor: "default",
        transition: "border-color 0.2s ease, background 0.2s ease",
      }}
      title={analise}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-sm" style={{ color: "#fff" }}>{label}</h4>
        <div className="flex items-baseline">
          <span style={{ fontSize: "1.7rem", fontWeight: 900, fontFamily: "'Montserrat',sans-serif", color }}>
            {score}
          </span>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>/10</span>
        </div>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 5, marginBottom: 8 }}>
        <div style={{
          height: "100%", borderRadius: 5, background: color,
          width: `${(score / 10) * 100}%`,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
      {hovered && (
        <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginTop: 4 }}>
          {analise}
        </p>
      )}
    </div>
  );
};

/* ---- Chart.js Radar ---- */

const RadarChartCanvas = ({ report: r }: { report: BrandScanReport }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const buildChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Chart.js loaded via CDN on window
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;

    if (chartRef.current) chartRef.current.destroy();

    const scores = dimKeys.map((k) => r.dimensoes[k]?.score ?? 0);
    const labels = dimKeys.map((k) => dimensionLabels[k]?.short || k);
    const fullLabels = dimKeys.map((k) => dimensionLabels[k]?.full || k);

    chartRef.current = new ChartJS(canvas, {
      type: "radar",
      data: {
        labels,
        datasets: [{
          label: "Score",
          data: scores,
          backgroundColor: "rgba(255,107,53,0.12)",
          borderColor: "#FF6B35",
          borderWidth: 2,
          pointBackgroundColor: scores.map(dimColor),
          pointBorderColor: "#0a0a0a",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#FF6B35",
          pointRadius: 6,
          pointHoverRadius: 9,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 900, easing: "easeInOutQuart" },
        scales: {
          r: {
            min: 0, max: 10,
            ticks: { stepSize: 2, color: "rgba(255,255,255,0.3)", backdropColor: "transparent", font: { size: 10 } },
            grid: { color: "rgba(255,255,255,0.07)" },
            angleLines: { color: "rgba(255,255,255,0.06)" },
            pointLabels: {
              color: "rgba(255,255,255,0.75)",
              font: { size: 12, family: "Poppins, sans-serif", weight: "600" },
              padding: 14,
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: (context: any) => {
              const tt = tooltipRef.current;
              if (!tt) return;
              const tooltipModel = context.tooltip;
              if (tooltipModel.opacity === 0) {
                tt.style.opacity = "0";
                return;
              }
              const idx = tooltipModel.dataPoints?.[0]?.dataIndex;
              if (idx === undefined) return;

              const labelEl = tt.querySelector(".tt-label") as HTMLElement;
              const scoreEl = tt.querySelector(".tt-score") as HTMLElement;
              if (labelEl) labelEl.textContent = fullLabels[idx];
              if (scoreEl) scoreEl.textContent = `${scores[idx]}/10`;

              const wrap = wrapRef.current;
              if (wrap) {
                const pos = tooltipModel.caretX;
                const posY = tooltipModel.caretY;
                tt.style.left = pos + "px";
                tt.style.top = posY + "px";
              }
              tt.style.opacity = "1";
            },
          },
        },
        onHover: (_event: any, elements: any[]) => {
          if (!elements.length && tooltipRef.current) {
            tooltipRef.current.style.opacity = "0";
          }
        },
      },
    });
  }, [r]);

  useEffect(() => {
    // Wait for Chart.js to load
    const tryBuild = () => {
      if ((window as any).Chart) {
        buildChart();
      } else {
        setTimeout(tryBuild, 200);
      }
    };
    tryBuild();
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [buildChart]);

  return (
    <div ref={wrapRef} style={{
      background: "rgba(20,20,20,0.55)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 18, padding: "1.5rem", position: "relative",
    }}>
      <canvas ref={canvasRef} style={{ width: "100%" }} />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute", pointerEvents: "none", opacity: 0,
          background: "rgba(10,10,10,0.92)", border: "1px solid rgba(255,107,53,0.4)",
          borderRadius: 10, padding: "8px 14px", transition: "opacity 0.15s ease",
          transform: "translate(-50%, -120%)",
        }}
      >
        <div className="tt-label" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }} />
        <div className="tt-score" style={{ color: "#FF6B35", fontSize: "1.3rem", fontWeight: 900 }} />
      </div>
    </div>
  );
};
