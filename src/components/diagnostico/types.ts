export type Dimensao = {
  score: number;
  analise: string;
};

export type OportunidadePriorizada = {
  acao: string;
  impacto: string;
  esforco: string;
  prioridade: string;
};

export type PlanoSemana = {
  semana: number;
  acoes: string[];
};

export type BrandScanReport = {
  score: number;
  headline: string;
  resumo_executivo: string;
  pontos_fortes: string[];
  oportunidades: string[];
  recomendacao_prioritaria: string;
  dimensoes: {
    identidade_visual: Dimensao;
    naming: Dimensao;
    proposta_de_valor: Dimensao;
    tom_de_voz: Dimensao;
    diferenciacao: Dimensao;
    coesao_de_marca: Dimensao;
  };
  oportunidades_priorizadas: OportunidadePriorizada[];
  plano_4_semanas: PlanoSemana[];
  conclusao: string;
  screenshot?: string;
};

export type BrandScanResult = {
  id: string;
  score: number;
  report: BrandScanReport;
};
