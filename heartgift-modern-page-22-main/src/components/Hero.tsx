import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import phoneImage from '@/assets/phone-mockup.jpg';
import avatarsImage from '@/assets/couple-avatars.jpg';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="inicio" className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="text-sm font-medium text-primary-soft bg-primary/10 px-3 py-1 rounded-full">
                ✨ Apenas hoje 50% de desconto, aproveite!
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Crie páginas especiais
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                para momentos únicos!
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Declarações de amor, aniversários, casamentos e muito mais. Crie páginas 
              personalizadas que eternizam seus momentos mais especiais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 shadow-love animate-glow text-lg px-8 py-4 h-auto"
              onClick={() => navigate('/criar-presente')}
            >
              <Heart className="mr-2 h-5 w-5" fill="currentColor" />
              Criar minha página
            </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/30 text-primary hover:bg-primary/10 text-lg px-8 py-4 h-auto"
              >
                Ver exemplos
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center -space-x-2">
                <img 
                  src={avatarsImage} 
                  alt="Casais satisfeitos" 
                  className="w-12 h-12 rounded-full border-2 border-background shadow-lg"
                />
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <span className="text-muted-foreground">
                Mais de <span className="text-primary font-semibold">40.325</span> usuários satisfeitos
              </span>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="relative max-w-sm mx-auto">
              <img 
                src={phoneImage} 
                alt="Mockup do HeartGift" 
                className="w-full h-auto drop-shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-glow animate-glow">
                💕 Design personalizado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;