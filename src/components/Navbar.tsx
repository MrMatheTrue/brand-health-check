import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import etomicIcon from "@/assets/etomic-icon.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={etomicIcon} alt="E-TOMIC" className="w-8 h-8" />
          <span className="text-xl font-display font-bold text-gradient-primary">E-TOMIC</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#problema" className="text-sm text-muted-foreground hover:text-foreground transition-colors">O Problema</a>
          <a href="#metodo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Método</a>
          <a href="#regras" className="text-sm text-muted-foreground hover:text-foreground transition-colors">4 Regras</a>
          <a href="#cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cases</a>
          <Link to="/diagnostico">
            <Button size="sm" className="glow-primary-sm">Diagnóstico Gratuito</Button>
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-card border-t border-border/30 p-4 space-y-3">
          <a href="#problema" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">O Problema</a>
          <a href="#metodo" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">Método</a>
          <a href="#regras" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">4 Regras</a>
          <a href="#cases" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">Cases</a>
          <Link to="/diagnostico" onClick={() => setOpen(false)}>
            <Button size="sm" className="w-full glow-primary-sm">Diagnóstico Gratuito</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
