import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary animate-glow" fill="currentColor" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              HeartGift
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors">
              Início
            </a>
            <a href="#como-funciona" className="text-foreground hover:text-primary transition-colors">
              Como funciona?
            </a>
            <a href="#recursos" className="text-foreground hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#precos" className="text-foreground hover:text-primary transition-colors">
              Preços
            </a>
          </nav>

          <Button 
            variant="default" 
            className="bg-gradient-primary hover:opacity-90 shadow-love"
            onClick={() => window.location.href = '/criar-presente'}
          >
            Criar minha página
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;