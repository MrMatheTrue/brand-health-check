import { motion } from "framer-motion";
import { Atom, Clock, BarChart3, Rocket } from "lucide-react";

const methods = [
  { icon: Atom, title: "Metodologia Atômica", desc: "Sistema de automação baseado em 4 regras de conversão testadas e comprovadas que funcionam 24/7." },
  { icon: Clock, title: "Timing Perfeito", desc: "Mensagem certa, no momento exato. Transformamos perda em Receita Recorrente." },
  { icon: BarChart3, title: "ROI Comprovado", desc: "Recuperação de 50-80% dos carrinhos abandonados e aumento de 3x no LTV." },
  { icon: Rocket, title: "Resultados em 48h", desc: "Implementação rápida com impacto imediato na receita. Sem testes longos." },
];

const MethodSection = () => {
  return (
    <section id="metodo" className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Por que a <span className="text-gradient-primary">E-TOMIC</span>?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card gradient-border rounded-xl p-6 hover:bg-card/80 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary-sm transition-shadow">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
