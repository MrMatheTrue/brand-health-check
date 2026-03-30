import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, RefreshCw, Repeat } from "lucide-react";

const rules = [
  {
    icon: DollarSign,
    num: "01",
    title: "Carrinho Abandonado",
    desc: "Resgate da compra em minutos após a desistência. Sistema inteligente que identifica o momento exato de reengajamento.",
    impact: "Recuperação de 50-80% dos carrinhos abandonados",
  },
  {
    icon: ShoppingBag,
    num: "02",
    title: "Pós-Compra Imediato",
    desc: "Upsell e cross-sell automáticos nos primeiros minutos após a conversão. Maximiza o ticket médio.",
    impact: "Aumento de 30% no valor médio do pedido",
  },
  {
    icon: RefreshCw,
    num: "03",
    title: "Reativação de Inativos",
    desc: "Sequências personalizadas que trazem clientes inativos de volta com ofertas irresistíveis.",
    impact: "Reativação de 25% da base inativa em 30 dias",
  },
  {
    icon: Repeat,
    num: "04",
    title: "Recompra Recorrente",
    desc: "Programa de nutrição e fidelização que transforma clientes em compradores frequentes.",
    impact: "LTV 3x maior em 90 dias",
  },
];

const RulesSection = () => {
  return (
    <section id="regras" className="py-24">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            As 4 Regras <span className="text-gradient-primary">Atômicas</span> de Lucro
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sistema de automação que trabalha 24h por dia para converter falhas em vendas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card gradient-border rounded-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <rule.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-mono text-primary/60">#{rule.num}</span>
                  <h3 className="text-xl font-bold mb-2">{rule.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{rule.desc}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    ⚡ {rule.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
