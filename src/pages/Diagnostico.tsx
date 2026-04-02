import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoMark from "@/assets/logo-mark.png";
import { BrandScanForm } from "@/components/diagnostico/BrandScanForm";
import { BrandScanLoading } from "@/components/diagnostico/BrandScanLoading";
import { BrandScanReport } from "@/components/diagnostico/BrandScanReport";
import { DiagnosticoFooter } from "@/components/diagnostico/DiagnosticoFooter";
import type { BrandScanResult } from "@/components/diagnostico/types";

const DiagnosticoPage = () => {
  const [phase, setPhase] = useState<"form" | "loading" | "report">("form");
  const [result, setResult] = useState<BrandScanResult | null>(null);
  const [siteUrl, setSiteUrl] = useState("");

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
        <div className="container flex items-center justify-between h-16 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoMark} alt="E-TOMIC" className="w-7 h-7" />
            <span className="text-xl font-display font-bold text-gradient-primary">E-TOMIC</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:inline">
              Home
            </Link>
            <Link
              to="/"
              className="text-sm font-medium px-4 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              Novo Diagnóstico
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          {phase === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <BrandScanForm onSubmit={handleScanStart} onComplete={handleScanComplete} onError={handleScanError} />
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <BrandScanLoading />
            </motion.div>
          )}

          {phase === "report" && result && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
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
