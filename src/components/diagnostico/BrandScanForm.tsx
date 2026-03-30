import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { BrandScanResult } from "./types";

type Props = {
  onSubmit: (url: string) => void;
  onComplete: (result: BrandScanResult) => void;
  onError: () => void;
};

export const BrandScanForm = ({ onSubmit, onComplete, onError }: Props) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const canSubmit = nome.trim() && email.trim() && telefone.trim() && siteUrl.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    onSubmit(siteUrl);

    try {
      const { data, error } = await supabase.functions.invoke("brand-scan", {
        body: { nome, email, telefone, site_url: siteUrl },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      onComplete(data as BrandScanResult);
    } catch (err: any) {
      console.error("Brand scan error:", err);
      toast({
        title: "Erro na análise",
        description: err.message || "Não foi possível analisar o site. Tente novamente.",
        variant: "destructive",
      });
      onError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
            Diagnóstico <span className="text-primary">de Marca</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Preencha seus dados e cole a URL do site que deseja analisar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="bg-secondary/50 border-border/50 h-12"
              required
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="bg-secondary/50 border-border/50 h-12"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone / WhatsApp"
              className="bg-secondary/50 border-border/50 h-12"
              required
            />
            <Input
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://exemplo.com.br"
              className="bg-secondary/50 border-border/50 h-12"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 border-0 glow-primary group"
          >
            Gerar diagnóstico
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>
    </div>
  );
};
