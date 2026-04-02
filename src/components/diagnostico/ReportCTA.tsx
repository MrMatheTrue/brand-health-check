type Props = { siteUrl: string };

export const ReportCTA = ({ siteUrl }: Props) => {
  const waText = encodeURIComponent(
    `Olá! Fiz o diagnóstico de marca do site ${siteUrl} e gostaria de conversar sobre os resultados.`
  );

  return (
    <div className="text-center py-12 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <h2 className="text-2xl font-display font-bold mb-2">
        Próximo passo: <span className="text-gradient-primary">acelere sua marca</span>
      </h2>
      <p className="text-muted-foreground mb-8">
        A E-TOMIC pode estruturar um plano de ação completo baseado neste diagnóstico.
      </p>
      <a
        href={`https://wa.me/5511999999999?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 font-semibold text-lg transition-transform hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #FF6B35, #FF2E2E)",
          color: "#fff",
          borderRadius: "50px",
          padding: "1.1rem 2.8rem",
          boxShadow: "0 10px 30px rgba(255,107,53,0.4)",
        }}
      >
        <i className="fi fi-brands-whatsapp" style={{ fontSize: 24 }} />
        Falar com um especialista
      </a>
    </div>
  );
};
