import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export const BrandScanLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="text-center">
        {/* Spinning icon */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-1 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-2">Gerando diagnóstico de marca...</p>
        <p className="text-sm text-muted-foreground/60">Isso pode levar até 40 segundos</p>
      </div>
    </div>
  );
};
