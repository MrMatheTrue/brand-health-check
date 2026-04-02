type Props = { siteUrl: string };

export const ReportCTA = ({ siteUrl }: Props) => {
  const waText = encodeURIComponent(
    `Olá! Fiz o diagnóstico de marca do site ${siteUrl} e gostaria de conversar sobre os resultados.`
  );

  return (
    <div style={{ textAlign: "center", padding: "3rem 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <h2 style={{ fontSize: "1.5rem", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, marginBottom: "0.5rem" }}>
        Próximo passo:{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #FF9E00, #FF6B35, #FF2E2E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          acelere sua marca
        </span>
      </h2>
      <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "2rem" }}>
        A E-TOMIC pode estruturar um plano de ação completo baseado neste diagnóstico.
      </p>
      <a
        href={`https://wa.me/5511999999999?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 font-bold transition-transform hover:-translate-y-1"
        style={{
          background: "linear-gradient(135deg, #FF6B35, #FF2E2E)",
          color: "#fff",
          borderRadius: 50,
          padding: "1.1rem 2.8rem",
          fontSize: "1.05rem",
          textDecoration: "none",
          boxShadow: "0 10px 30px rgba(255,107,53,0.4)",
        }}
      >
        <i className="fi fi-brands-whatsapp" style={{ fontSize: 24 }} />
        Falar com um especialista
      </a>
    </div>
  );
};
