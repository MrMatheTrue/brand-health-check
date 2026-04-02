import { Link } from "react-router-dom";
import { useState } from "react";
import type { BrandScanReport } from "./types";

type Props = {
  report: BrandScanReport;
  siteUrl: string;
  onCopy: () => void;
  onNewScan: () => void;
};

export const ReportHero = ({ report: r, siteUrl, onCopy, onNewScan }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Fiz um diagnóstico de marca do meu site com a E-TOMIC e recebi ${r.score}/10! Conferir diagnóstico: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <section className="pt-28 pb-8 px-[5%] text-center">
      {/* Back link */}
      <Link
        to="/"
        className="inline-block text-sm mb-6 transition-colors"
        style={{ color: "rgba(255,255,255,0.45)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B35")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
      >
        ← Voltar ao início
      </Link>

      {/* Screenshot */}
      {r.screenshot && (
        <div className="flex justify-center mb-8">
          <img
            src={r.screenshot}
            alt="Screenshot do site"
            className="w-[220px] h-auto"
            style={{
              borderRadius: "14px",
              border: "1px solid rgba(255,107,53,0.3)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,107,53,0.1)",
            }}
          />
        </div>
      )}

      {/* Score */}
      <p
        className="uppercase font-medium mb-2"
        style={{ fontSize: "0.78rem", letterSpacing: "2.5px", color: "rgba(255,255,255,0.4)" }}
      >
        Diagnóstico de Marca · BrandScan
      </p>
      <div className="flex items-baseline justify-center gap-1 mb-3">
        <span
          className="font-display font-black"
          style={{
            fontSize: "clamp(5rem, 12vw, 9rem)",
            background: "linear-gradient(135deg, #FF6B35, #FFD600)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {r.score}
        </span>
        <span style={{ fontSize: "2rem", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>/10</span>
      </div>
      <p
        className="font-semibold max-w-[700px] mx-auto text-foreground"
        style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
      >
        {r.headline}
      </p>

      {/* Action bar */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm border transition-colors"
          style={{
            borderColor: "rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          {copied ? (
            <>✅ Copiado!</>
          ) : (
            <>
              <i className="fi fi-rr-copy text-xs" /> Copiar relatório
            </>
          )}
        </button>
        <button
          onClick={shareWhatsApp}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm border transition-colors hover:bg-[rgba(46,213,115,0.1)]"
          style={{
            borderColor: "rgba(46,213,115,0.3)",
            color: "#2ed573",
            background: "transparent",
          }}
        >
          <i className="fi fi-brands-whatsapp text-xs" /> WhatsApp
        </button>
        <button
          onClick={onNewScan}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
          style={{
            background: "#FF6B35",
            color: "#fff",
          }}
        >
          <i className="fi fi-rr-refresh text-xs" /> Nova análise
        </button>
      </div>
    </section>
  );
};
