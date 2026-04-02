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
    <section style={{ padding: "7rem 5% 2rem", background: "transparent", textAlign: "center" }}>
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
        <div className="flex justify-center mb-6">
          <img
            src={r.screenshot}
            alt="Screenshot do site"
            style={{
              width: 220,
              borderRadius: 14,
              border: "1px solid rgba(255,107,53,0.3)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 30px rgba(255,107,53,0.15)",
            }}
          />
        </div>
      )}

      {/* Label */}
      <p
        style={{
          fontSize: "0.78rem",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "0.5rem",
        }}
      >
        Diagnóstico de Marca · BrandScan
      </p>

      {/* Score */}
      <div className="flex items-baseline justify-center gap-1 mb-3">
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(5rem, 12vw, 9rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #FF6B35, #FFD600)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {r.score}
        </span>
        <span style={{ fontSize: "2rem", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>/10</span>
      </div>

      {/* Headline */}
      <p
        style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
          fontWeight: 600,
          color: "#fff",
          maxWidth: 700,
          margin: "0 auto",
          lineHeight: 1.5,
        }}
      >
        {r.headline}
      </p>

      {/* Action bar */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {/* Copy */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 transition-all"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            borderRadius: 8,
            background: "transparent",
            border: "1.5px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FF6B35";
            e.currentTarget.style.color = "#FF6B35";
            e.currentTarget.style.background = "rgba(255,107,53,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          {copied ? "✅ Copiado!" : (
            <><i className="fi fi-rr-copy" style={{ fontSize: 14 }} /> Copiar relatório</>
          )}
        </button>

        {/* WhatsApp */}
        <button
          onClick={shareWhatsApp}
          className="flex items-center gap-2 transition-all"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            borderRadius: 8,
            background: "transparent",
            border: "1.5px solid rgba(46,213,115,0.3)",
            color: "#2ed573",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(46,213,115,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <i className="fi fi-brands-whatsapp" style={{ fontSize: 14 }} /> WhatsApp
        </button>

        {/* Nova análise */}
        <button
          onClick={onNewScan}
          className="flex items-center gap-2 transition-all"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            borderRadius: 8,
            background: "linear-gradient(135deg, #FF6B35, #FF2E2E)",
            border: "none",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(255,107,53,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <i className="fi fi-rr-refresh" style={{ fontSize: 14 }} /> Nova análise
        </button>
      </div>
    </section>
  );
};
