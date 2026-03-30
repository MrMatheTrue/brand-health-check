import { motion } from "framer-motion";
import { TrendingDown, ShoppingCart, UserX } from "lucide-react";

const problems = [
  { icon: TrendingDown, value: "98%", label: "Visitantes saem sem comprar na 1ª visita" },
  { icon: ShoppingCart, value: "70%", label: "Carrinhos abandonados sem resgate" },
  { icon: UserX, value: "80%", label: "Clientes nunca voltam após 1ª compra" },
];

const ProblemSection = () => {
  return (
    <section id="problema" className="py-24 relative">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            O Dinheiro <span className="text-gradient-primary">Deixado na Mesa</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seu e-commerce já investe em tráfego, mas o dinheiro real está sendo perdido no funil.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {problems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card gradient-border rounded-xl p-8 text-center"
            >
              <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-4xl md:text-5xl font-bold text-gradient-primary mb-3">{item.value}</p>
              <p className="text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
