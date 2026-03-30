import etomicIcon from "@/assets/etomic-icon.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-10">
      <div className="container px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={etomicIcon} alt="E-TOMIC" className="w-6 h-6" />
          <span className="font-display font-bold text-gradient-primary">E-TOMIC</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} E-TOMIC. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
