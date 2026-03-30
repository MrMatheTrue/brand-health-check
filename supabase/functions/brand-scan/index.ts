import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, email, telefone, site_url } = await req.json();

    if (!nome || !email || !telefone || !site_url) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format URL
    let url = site_url.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!FIRECRAWL_API_KEY) {
      throw new Error("FIRECRAWL_API_KEY not configured");
    }
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    console.log("Scraping URL:", url);

    // Step 1: Scrape the website with Firecrawl
    const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats: ["markdown", "screenshot", "links"],
        onlyMainContent: false,
        waitFor: 3000,
      }),
    });

    const scrapeData = await scrapeResponse.json();

    if (!scrapeResponse.ok) {
      console.error("Firecrawl error:", scrapeData);
      throw new Error(`Falha ao analisar o site: ${scrapeData.error || "erro desconhecido"}`);
    }

    const siteContent = scrapeData.data?.markdown || scrapeData.markdown || "";
    const siteScreenshot = scrapeData.data?.screenshot || scrapeData.screenshot || "";
    const siteMetadata = scrapeData.data?.metadata || scrapeData.metadata || {};

    console.log("Scrape successful, analyzing with AI...");

    // Step 2: Analyze with AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Você é um especialista em branding e marketing digital. Analise o site fornecido e gere um diagnóstico completo de marca em português brasileiro.

Responda APENAS com o JSON (sem markdown, sem backticks). O JSON deve seguir exatamente esta estrutura:
{
  "score": 7.5,
  "headline": "Frase impactante de 1 linha resumindo o diagnóstico",
  "resumo_executivo": "Parágrafo de 3-5 frases com análise geral da marca",
  "pontos_fortes": ["ponto 1", "ponto 2", "ponto 3"],
  "oportunidades": ["oportunidade 1", "oportunidade 2", "oportunidade 3"],
  "recomendacao_prioritaria": "Recomendação principal em 2-3 frases",
  "dimensoes": {
    "identidade_visual": { "score": 8.0, "analise": "Análise em 1-2 frases" },
    "naming": { "score": 7.0, "analise": "Análise em 1-2 frases" },
    "proposta_de_valor": { "score": 6.5, "analise": "Análise em 1-2 frases" },
    "tom_de_voz": { "score": 7.5, "analise": "Análise em 1-2 frases" },
    "diferenciacao": { "score": 6.0, "analise": "Análise em 1-2 frases" },
    "coesao_de_marca": { "score": 7.0, "analise": "Análise em 1-2 frases" }
  },
  "oportunidades_priorizadas": [
    { "acao": "Descrição da ação", "impacto": "Alto", "esforco": "Médio", "prioridade": "Alto" },
    { "acao": "Descrição da ação", "impacto": "Médio", "esforco": "Baixo", "prioridade": "Médio" },
    { "acao": "Descrição da ação", "impacto": "Alto", "esforco": "Alto", "prioridade": "Médio" }
  ],
  "plano_4_semanas": [
    { "semana": 1, "acoes": ["ação 1", "ação 2"] },
    { "semana": 2, "acoes": ["ação 1", "ação 2"] },
    { "semana": 3, "acoes": ["ação 1", "ação 2"] },
    { "semana": 4, "acoes": ["ação 1", "ação 2"] }
  ],
  "conclusao": "Parágrafo final de 3-5 frases com conclusão e próximos passos"
}

Os scores devem ser de 0 a 10 com uma casa decimal. Seja honesto e construtivo. Adapte a análise para o segmento do site.`,
          },
          {
            role: "user",
            content: `Analise este site: ${url}\n\nTítulo: ${siteMetadata.title || "N/A"}\nDescrição: ${siteMetadata.description || "N/A"}\n\nConteúdo do site:\n${siteContent.substring(0, 8000)}`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const aiError = await aiResponse.text();
      console.error("AI error:", aiResponse.status, aiError);
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas solicitações. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Serviço temporariamente indisponível." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI analysis failed");
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    console.log("AI response received, parsing...");

    // Parse the AI response - strip markdown code blocks if present
    let report;
    try {
      const cleaned = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      report = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("Failed to parse AI response:", rawContent.substring(0, 500));
      throw new Error("Falha ao processar a análise");
    }

    // Step 3: Save to database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: scanRecord, error: dbError } = await supabase
      .from("brand_scans")
      .insert({
        nome,
        email,
        telefone,
        site_url: url,
        score: report.score,
        report: { ...report, screenshot: siteScreenshot },
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      throw new Error("Falha ao salvar o diagnóstico");
    }

    console.log("Brand scan completed successfully:", scanRecord.id);

    return new Response(
      JSON.stringify({
        success: true,
        id: scanRecord.id,
        score: report.score,
        report: { ...report, screenshot: siteScreenshot },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("brand-scan error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
