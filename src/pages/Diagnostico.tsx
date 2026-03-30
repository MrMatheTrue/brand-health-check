import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import etomicIcon from "@/assets/etomic-icon.png";
import { BrandScanForm } from "@/components/diagnostico/BrandScanForm";
import { BrandScanLoading } from "@/components/diagnostico/BrandScanLoading";
import { BrandScanReport } from "@/components/diagnostico/BrandScanReport";
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
            <img src={etomicIcon} alt="E-TOMIC" className="w-8 h-8" />
            <span className="text-xl font-display font-bold text-gradient-primary">E-TOMIC</span>
          </Link>
          {/* Progress indicator */}
          <div className="flex items-center gap-4 text-sm">
            <span className={`font-medium ${phase === "form" ? "text-primary" : "text-muted-foreground"}`}>
              1. URL
            </span>
            <div className="flex-1 h-0.5 w-16 md:w-32 bg-border/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: phase === "form" ? "50%" : "100%" }}
              />
            </div>
            <span className={`font-medium ${phase === "report" ? "text-primary" : "text-muted-foreground"}`}>
              2. Relatório
            </span>
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
    </div>
  );
};

export default DiagnosticoPage;
