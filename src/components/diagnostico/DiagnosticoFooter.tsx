import { Link } from "react-router-dom";
import logoMark from "@/assets/logo-mark.png";

export const DiagnosticoFooter = () => (
  <footer className="border-t border-[rgba(255,255,255,0.07)] py-12 mt-8">
    <div className="container px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logoMark} alt="E-TOMIC" className="w-7 h-7" />
            <span className="font-display font-bold text-gradient-primary">E-TOMIC</span>
          </div>
          <p className="text-sm font-display font-semibold text-foreground/80 mb-1">O Resgate Atômico de Receita</p>
          <p className="text-xs text-muted-foreground">Especialistas em Automação e LTV para E-commerce</p>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-bold">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:contato@e-tomic.com" className="text-muted-foreground hover:text-primary transition-colors">
                contato@e-tomic.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Páginas */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-bold">Páginas</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
          </ul>
        </div>

        {/* Serviços */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-bold">Serviços</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">Regra #1 – Carrinho Abandonado</Link></li>
            <li><Link to="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">Regra #2 – Pós-Compra</Link></li>
            <li><Link to="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">Regra #3 – Reativação</Link></li>
            <li><Link to="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">Regra #4 – Recompra Recorrente</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.07)] pt-6 text-center">
        <p className="text-xs text-muted-foreground">© 2025 E-TOMIC. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);
