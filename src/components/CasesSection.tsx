import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const cases = [
  {
    quote: "Recuperamos R$ 127mil em carrinhos abandonados no primeiro mês. A E-TOMIC pagou o investimento em 5 dias.",
    name: "Mariana Ferreira",
    role: "CEO • Fashion Brand",
    initials: "MF",
  },
  {
    quote: "Nossa taxa de recompra subiu de 15% para 47% em 60 dias. O LTV triplicou e agora temos previsibilidade de receita.",
    name: "Roberto Santos",
    role: "Diretor Comercial • TechStore",
    initials: "RS",
  },
  {
    quote: "Deixamos de gastar R$ 40mil/mês em tráfego e focamos em converter melhor quem já conhece a marca. ROI de 8:1.",
    name: "Carla Pinto",
    role: "CMO • BeautyHub",
    initials: "CP",
  },
];

const CasesSection = () => {
  return (
    <section id="cases" className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Cases de <span className="text-gradient-primary">Sucesso</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card gradient-border rounded-xl p-6 flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary/40 mb-4" />
              <p className="text-sm text-foreground/90 flex-1 mb-6 leading-relaxed">"{c.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {c.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
