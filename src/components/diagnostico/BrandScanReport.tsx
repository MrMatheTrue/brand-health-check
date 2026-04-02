import { useToast } from "@/hooks/use-toast";
import { ReportHero } from "./ReportHero";
import { ReportSections } from "./ReportSections";
import { ReportCTA } from "./ReportCTA";
import type { BrandScanResult } from "./types";

type Props = {
  result: BrandScanResult;
  siteUrl: string;
  onNewScan: () => void;
};

export const BrandScanReport = ({ result, siteUrl, onNewScan }: Props) => {
  const { toast } = useToast();
  const r = result.report;

  const copyReport = () => {
    const text = `DIAGNÓSTICO DE MARCA – ${siteUrl}\nScore: ${r.score}/10\n\n${r.resumo_executivo}\n\nPONTOS FORTES:\n${r.pontos_fortes.map((p) => `• ${p}`).join("\n")}\n\nOPORTUNIDADES:\n${r.oportunidades.map((o) => `• ${o}`).join("\n")}\n\nRECOMENDAÇÃO: ${r.recomendacao_prioritaria}\n\nCONCLUSÃO: ${r.conclusao}`;
    navigator.clipboard.writeText(text);
    toast({ title: "Copiado!", description: "Relatório copiado para a área de transferência." });
  };

  return (
    <div>
      <ReportHero report={r} siteUrl={siteUrl} onCopy={copyReport} onNewScan={onNewScan} />
      <ReportSections report={r} />
      <div className="max-w-[1100px] mx-auto px-4">
        <ReportCTA siteUrl={siteUrl} />
      </div>
    </div>
  );
};
