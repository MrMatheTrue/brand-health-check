import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoMark from "@/assets/logo-mark.png";
import { StarfieldBackground } from "@/components/diagnostico/StarfieldBackground";
import { BrandScanForm } from "@/components/diagnostico/BrandScanForm";
import { BrandScanLoading } from "@/components/diagnostico/BrandScanLoading";
import { BrandScanReport } from "@/components/diagnostico/BrandScanReport";
import { DiagnosticoFooter } from "@/components/diagnostico/DiagnosticoFooter";
import type { BrandScanResult } from "@/components/diagnostico/types";

const DiagnosticoPage = () => {
  const [phase, setPhase] = useState<"form" | "loading" | "report">("form");
  const [result, setResult] = useState<BrandScanResult | null>(null);
  const [siteUrl, setSiteUrl] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleScanStart = (url: string) => {
    setSiteUrl(url);
    setPhase("loading");
  };

  const handleScanComplete = (data: BrandScanResult) => {
    setResult(data);
    setPhase("report");
  };

  const handleScanError = () => {
    setPhase("form");
  };

  const handleNewScan = () => {
    setResult(null);
    setSiteUrl("");
    setPhase("form");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#050505", color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <StarfieldBackground />

      {/* Header */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(5,5,5,0.9)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: "0 2rem" }}>
          <Link to="/" className="flex items-center gap-2">
            <img src={logoMark} alt="E-TOMIC" style={{ width: 28, height: 28 }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "#FF6B35", fontSize: "1.1rem" }}>E-TOMIC</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm transition-colors hover:text-[#FF6B35]" style={{ color: "rgba(255,255,255,0.6)" }}>Home</Link>
            <Link
              to="/"
              className="text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                padding: "0.5rem 1.2rem", borderRadius: 8,
                background: "linear-gradient(135deg, #FF6B35, #FF2E2E)", color: "#fff",
              }}
            >
              Novo Diagnóstico
            </Link>
          </div>
          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5" onClick={() => setMobileMenu(!mobileMenu)}>
            <span style={{ width: 22, height: 2, background: "#fff", display: "block", borderRadius: 2 }} />
            <span style={{ width: 22, height: 2, background: "#fff", display: "block", borderRadius: 2 }} />
            <span style={{ width: 22, height: 2, background: "#fff", display: "block", borderRadius: 2 }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenu && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 60 }} onClick={() => setMobileMenu(false)} />
          <div style={{
            position: "fixed", top: 0, right: 0, bottom: 0, width: 280, zIndex: 70,
            background: "#0a0a0a", padding: "5rem 2rem 2rem",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
          }}>
            <Link to="/" className="block text-lg mb-4" style={{ color: "rgba(255,255,255,0.7)" }} onClick={() => setMobileMenu(false)}>Home</Link>
            <Link
              to="/"
              className="inline-block text-sm font-semibold mt-4"
              style={{ padding: "0.6rem 1.5rem", borderRadius: 8, background: "linear-gradient(135deg, #FF6B35, #FF2E2E)", color: "#fff" }}
              onClick={() => setMobileMenu(false)}
            >
              Novo Diagnóstico
            </Link>
          </div>
        </>
      )}

      <div className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          {phase === "form" && (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <BrandScanForm onSubmit={handleScanStart} onComplete={handleScanComplete} onError={handleScanError} />
            </motion.div>
          )}
          {phase === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <BrandScanLoading />
            </motion.div>
          )}
          {phase === "report" && result && (
            <motion.div key="report" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <BrandScanReport result={result} siteUrl={siteUrl} onNewScan={handleNewScan} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DiagnosticoFooter />
    </div>
  );
};

export default DiagnosticoPage;
