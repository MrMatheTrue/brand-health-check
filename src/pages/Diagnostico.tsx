import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, Globe, Users, Target, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import etomicIcon from "@/assets/etomic-icon.png";
import { useToast } from "@/hooks/use-toast";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  site: string;
  faturamento: string;
  desafio: string;
};

const faturamentos = [
  "Até R$ 50 mil",
  "R$ 50 mil - R$ 100 mil",
  "R$ 100 mil - R$ 300 mil",
  "R$ 300 mil - R$ 500 mil",
  "Acima de R$ 500 mil",
];

const steps = [
  { icon: Users, title: "Seus Dados", desc: "Conte-nos sobre você" },
  { icon: Globe, title: "Sua Empresa", desc: "Sobre seu e-commerce" },
  { icon: Target, title: "Seu Desafio", desc: "O que quer resolver" },
  { icon: BarChart3, title: "Concluído", desc: "Diagnóstico solicitado" },
];

const DiagnosticoPage = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    site: "",
    faturamento: "",
    desafio: "",
  });

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canNext = () => {
    if (step === 0) return form.nome && form.email && form.telefone;
    if (step === 1) return form.empresa && form.faturamento;
    return true;
  };

  const handleSubmit = () => {
    console.log("Lead captured:", form);
    setSubmitted(true);
    toast({
      title: "Diagnóstico solicitado!",
      description: "Nossa equipe entrará em contato em até 24h.",
    });
  };

  const next = () => {
    if (step === 2) {
      handleSubmit();
      setStep(3);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
        <div className="container flex items-center justify-between h-16 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={etomicIcon} alt="E-TOMIC" className="w-8 h-8" />
            <span className="text-xl font-display font-bold text-gradient-primary">E-TOMIC</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary font-medium">100% Gratuito</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 pt-16 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i <= step
                      ? "bg-primary text-primary-foreground glow-primary-sm"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card gradient-border rounded-2xl p-6 md:p-10"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{steps[step].title}</h2>
                <p className="text-muted-foreground">{steps[step].desc}</p>
              </div>

              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Nome Completo *</label>
                    <Input
                      value={form.nome}
                      onChange={(e) => update("nome", e.target.value)}
                      placeholder="Seu nome completo"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">E-mail *</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="seu@email.com"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Telefone/WhatsApp *</label>
                    <Input
                      value={form.telefone}
                      onChange={(e) => update("telefone", e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Nome da Empresa *</label>
                    <Input
                      value={form.empresa}
                      onChange={(e) => update("empresa", e.target.value)}
                      placeholder="Sua empresa"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Site do E-commerce</label>
                    <Input
                      value={form.site}
                      onChange={(e) => update("site", e.target.value)}
                      placeholder="https://seusite.com.br"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Faturamento Mensal *</label>
                    <div className="grid grid-cols-1 gap-2">
                      {faturamentos.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => update("faturamento", f)}
                          className={`text-left px-4 py-3 rounded-lg text-sm transition-all border ${
                            form.faturamento === f
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Qual seu maior desafio hoje?</label>
                    <textarea
                      value={form.desafio}
                      onChange={(e) => update("desafio", e.target.value)}
                      placeholder="Ex: Carrinhos abandonados, baixa recompra, clientes inativos..."
                      rows={4}
                      className="w-full rounded-lg border border-border/50 bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>
                  <div className="glass-card rounded-lg p-4 border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">⚡ Após o envio:</span> Nossa equipe
                      analisará seus dados e entrará em contato em até 24h com seu diagnóstico completo.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 glow-primary">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Diagnóstico Solicitado!</h3>
                  <p className="text-muted-foreground mb-6">
                    Nossa equipe vai analisar seu e-commerce e entrar em contato em até 24h
                    com um diagnóstico personalizado.
                  </p>
                  <Link to="/">
                    <Button variant="outline" className="border-border/50">
                      Voltar ao site
                    </Button>
                  </Link>
                </div>
              )}

              {step < 3 && (
                <div className="flex items-center justify-between mt-8">
                  {step > 0 ? (
                    <Button
                      variant="ghost"
                      onClick={() => setStep((s) => s - 1)}
                      className="text-muted-foreground"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button
                    onClick={next}
                    disabled={!canNext()}
                    className="glow-primary-sm group"
                  >
                    {step === 2 ? "Enviar Diagnóstico" : "Próximo"}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticoPage;
