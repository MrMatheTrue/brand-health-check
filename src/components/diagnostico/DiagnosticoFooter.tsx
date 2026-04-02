import { Link } from "react-router-dom";
import logoMark from "@/assets/logo-mark.png";

export const DiagnosticoFooter = () => (
  <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "3rem", paddingBottom: "3rem", marginTop: "2rem" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img src={logoMark} alt="E-TOMIC" style={{ width: 40, height: 40 }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "#FF6B35", fontSize: "1.1rem" }}>E-TOMIC</span>
          </Link>
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>O Resgate Atômico de Receita</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Especialistas em Automação e LTV para E-commerce</p>
        </div>

        {/* Contato */}
        <div>
          <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: 12 }}>Contato</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:contato@e-tomic.com" className="transition-colors hover:text-[#FF6B35]" style={{ color: "rgba(255,255,255,0.5)" }}>contato@e-tomic.com</a></li>
            <li><a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#FF6B35]" style={{ color: "rgba(255,255,255,0.5)" }}>WhatsApp</a></li>
          </ul>
        </div>

        {/* Páginas */}
        <div>
          <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: 12 }}>Páginas</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="transition-colors hover:text-[#FF6B35]" style={{ color: "rgba(255,255,255,0.5)" }}>Home</Link></li>
          </ul>
        </div>

        {/* Serviços */}
        <div>
          <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: 12 }}>Serviços</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/#servicos" className="transition-colors hover:text-[#FF6B35]" style={{ color: "rgba(255,255,255,0.5)" }}>Regra #1 – Carrinho Abandonado</Link></li>
            <li><Link to="/#servicos" className="transition-colors hover:text-[#FF6B35]" style={{ color: "rgba(255,255,255,0.5)" }}>Regra #2 – Pós-Compra</Link></li>
            <li><Link to="/#servicos" className="transition-colors hover:text-[#FF6B35]" style={{ color: "rgba(255,255,255,0.5)" }}>Regra #3 – Reativação</Link></li>
            <li><Link to="/#servicos" className="transition-colors hover:text-[#FF6B35]" style={{ color: "rgba(255,255,255,0.5)" }}>Regra #4 – Recompra Recorrente</Link></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>© 2025 E-TOMIC. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);
