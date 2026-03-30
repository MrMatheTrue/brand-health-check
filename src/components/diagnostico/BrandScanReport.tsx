import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, Share2, CheckCircle2, TrendingUp, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import type { BrandScanResult } from "./types";

type Props = {
  result: BrandScanResult;
  siteUrl: string;
  onNewScan: () => void;
};

const dimensionLabels: Record<string, string> = {
  identidade_visual: "Identidade Visual",
  naming: "Naming",
  proposta_de_valor: "Proposta de Valor",
  tom_de_voz: "Tom de Voz",
  diferenciacao: "Diferenciação",
  coesao_de_marca: "Coesão de Marca",
};

const priorityColor: Record<string, string> = {
  Alto: "text-green-400 border-green-400/30 bg-green-400/10",
  Médio: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  Baixo: "text-muted-foreground border-border/30 bg-secondary/30",
};

export const BrandScanReport = ({ result, siteUrl, onNewScan }: Props) => {
  const { toast } = useToast();
  const r = result.report;

  const radarData = Object.entries(r.dimensoes).map(([key, dim]) => ({
    subject: dimensionLabels[key] || key,
    value: dim.score,
    fullMark: 10,
  }));

  const copyReport = () => {
    const text = `DIAGNÓSTICO DE MARCA - ${siteUrl}\nScore: ${r.score}/10\n\n${r.resumo_executivo}\n\nPontos Fortes:\n${r.pontos_fortes.map((p) => `• ${p}`).join("\n")}\n\nOportunidades:\n${r.oportunidades.map((o) => `• ${o}`).join("\n")}\n\nRecomendação: ${r.recomendacao_prioritaria}\n\nConclusão: ${r.conclusao}`;
    navigator.clipboard.writeText(text);
    toast({ title: "Copiado!", description: "Relatório copiado para a área de transferência." });
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Acabei de fazer um diagnóstico de marca do meu site e tirei ${r.score}/10! Faça o seu também: ${window.location.origin}/diagnostico`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header with screenshot */}
      {r.screenshot && (
        <div className="flex justify-center mb-8">
          <img
            src={r.screenshot}
            alt="Screenshot do site"
            className="w-48 h-auto rounded-lg shadow-lg border border-border/30"
          />
        </div>
      )}

      {/* Score */}
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Diagnóstico de Marca</p>
        <div className="flex items-baseline justify-center gap-1 mb-3">
          <span className="text-7xl font-display font-bold text-primary">{r.score}</span>
          <span className="text-2xl text-muted-foreground">/10</span>
        </div>
        <p className="text-xl font-semibold max-w-2xl mx-auto">{r.headline}</p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Button variant="outline" size="sm" onClick={copyReport} className="border-border/50">
          <Copy className="w-4 h-4 mr-2" /> Copiar relatório
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(window.location.href)} className="border-border/50">
          <Share2 className="w-4 h-4 mr-2" /> Copiar link
        </Button>
        <Button variant="outline" size="sm" onClick={shareWhatsApp} className="border-green-500/30 text-green-400 hover:bg-green-500/10">
          WhatsApp
        </Button>
        <Button onClick={onNewScan} size="sm" className="bg-primary hover:bg-primary/90">
          <RefreshCw className="w-4 h-4 mr-2" /> Nova análise
        </Button>
      </div>

      <hr className="border-border/30 mb-10" />

      {/* Resumo Executivo */}
      <Section title="RESUMO EXECUTIVO">
        <div className="glass-card rounded-xl p-6 border border-border/30">
          <p className="text-muted-foreground leading-relaxed">{r.resumo_executivo}</p>
        </div>
      </Section>

      {/* Pontos Fortes + Oportunidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="glass-card rounded-xl p-6 border border-border/30">
          <h3 className="flex items-center gap-2 text-green-400 font-bold mb-4">
            <CheckCircle2 className="w-5 h-5" /> PONTOS FORTES
          </h3>
          <ul className="space-y-2">
            {r.pontos_fortes.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-400 mt-0.5">✓</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card rounded-xl p-6 border border-primary/20 bg-primary/5">
          <h3 className="flex items-center gap-2 text-primary font-bold mb-4">
            <TrendingUp className="w-5 h-5" /> OPORTUNIDADES
          </h3>
          <ul className="space-y-2">
            {r.oportunidades.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">→</span> {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recomendação Prioritária */}
      <Section title="RECOMENDAÇÃO PRIORITÁRIA">
        <div className="glass-card rounded-xl p-6 border border-primary/20 bg-primary/5">
          <p className="flex items-start gap-3 text-muted-foreground">
            <Target className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            {r.recomendacao_prioritaria}
          </p>
        </div>
      </Section>

      {/* Radar Chart */}
      <Section title="PERFORMANCE POR DIMENSÃO">
        <div className="glass-card rounded-xl p-6 border border-border/30">
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <Radar
                name="Score"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* Análise por Dimensão */}
      <Section title="ANÁLISE POR DIMENSÃO">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(r.dimensoes).map(([key, dim]) => (
            <div key={key} className="glass-card rounded-xl p-5 border border-green-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm">{dimensionLabels[key]}</h4>
                <span className="text-2xl font-bold text-green-400">{dim.score}</span>
              </div>
              <div className="w-full h-1.5 bg-border/30 rounded-full mb-3">
                <div
                  className="h-full bg-green-400 rounded-full transition-all"
                  style={{ width: `${(dim.score / 10) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{dim.analise}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Oportunidades Priorizadas */}
      {r.oportunidades_priorizadas?.length > 0 && (
        <Section title="OPORTUNIDADES PRIORIZADAS">
          <div className="glass-card rounded-xl border border-border/30 overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 text-xs uppercase tracking-wider text-muted-foreground border-b border-border/30">
              <span>Ação</span>
              <span>Impacto</span>
              <span>Esforço</span>
              <span>Prioridade</span>
            </div>
            {r.oportunidades_priorizadas.map((op, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 items-center border-b border-border/10 last:border-0">
                <p className="text-sm text-muted-foreground">{op.acao}</p>
                <Badge label={op.impacto} />
                <Badge label={op.esforco} />
                <Badge label={op.prioridade} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Plano 4 Semanas */}
      {r.plano_4_semanas?.length > 0 && (
        <Section title="PLANO DE AÇÃO - 4 SEMANAS">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {r.plano_4_semanas.map((sem) => (
              <div key={sem.semana} className="glass-card rounded-xl p-5 border border-border/30">
                <h4 className="text-primary font-bold text-sm mb-3">SEMANA {sem.semana}</h4>
                <ul className="space-y-2">
                  {sem.acoes.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">→</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Conclusão */}
      <Section title="CONCLUSÃO">
        <div className="glass-card rounded-xl p-6 border border-border/30">
          <p className="text-muted-foreground leading-relaxed">{r.conclusao}</p>
        </div>
      </Section>

      {/* CTA final */}
      <div className="text-center mt-12 mb-8">
        <p className="text-lg font-semibold mb-2">
          A partir deste diagnóstico, a E-TOMIC pode estruturar um plano de trabalho sob medida.
        </p>
        <p className="text-muted-foreground mb-6">
          Fale com um de nossos especialistas e receba uma proposta personalizada.
        </p>
        <a
          href="https://wa.me/5511999999999?text=Olá! Fiz o diagnóstico de marca e gostaria de agendar uma reunião."
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-pink-500 glow-primary">
            📅 Agende sua reunião
          </Button>
        </a>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <p className="text-xs uppercase tracking-widest text-primary mb-4">{title}</p>
    {children}
  </div>
);

const Badge = ({ label }: { label: string }) => (
  <span className={`text-xs px-2 py-1 rounded-full border ${priorityColor[label] || priorityColor.Baixo}`}>
    {label}
  </span>
);
