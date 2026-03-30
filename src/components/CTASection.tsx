import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container relative z-10 px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">100% Gratuito</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto">
            Pronto para Resgatar sua{" "}
            <span className="text-gradient-primary">Receita Perdida</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Faça um diagnóstico gratuito e descubra quanto dinheiro seu e-commerce está deixando na mesa todos os dias.
          </p>

          <Link to="/diagnostico">
            <Button size="lg" className="glow-primary text-base px-10 py-6 group">
              Agendar Diagnóstico Gratuito
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
