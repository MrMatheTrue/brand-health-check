import { Link } from "react-router-dom";

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <lord-icon
      src="https://cdn.lordicon.com/qhgmphtg.json"
      trigger="loop"
      colors="primary:#FF6B35,secondary:#FF6B35"
      style={{ width: 80, height: 80, marginBottom: "1rem" }}
    />
    <h2 className="text-2xl font-display font-bold mb-2">Nenhum relatório encontrado</h2>
    <p className="text-muted-foreground mb-6">
      Parece que você ainda não fez um diagnóstico, ou os dados expiraram.
    </p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-transform hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(135deg, #FF6B35, #FF2E2E)",
        boxShadow: "0 10px 30px rgba(255,107,53,0.4)",
      }}
    >
      Fazer diagnóstico gratuito →
    </Link>
  </div>
);

// Lord Icon web component type declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          trigger?: string;
          colors?: string;
        },
        HTMLElement
      >;
    }
  }
}
