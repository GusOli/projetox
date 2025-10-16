import { Sparkles, Share2, Star, Lock, Smartphone, Palette } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Palette,
    title: "Design Personalizado",
    description: "Escolha entre diversos temas românticos e personalize cores, fontes e layouts."
  },
  {
    icon: Sparkles,
    title: "Efeitos Especiais",
    description: "Adicione animações de corações, pétalas de rosa e outros efeitos mágicos."
  },
  {
    icon: Smartphone,
    title: "Responsivo",
    description: "Sua página funciona perfeitamente em celulares, tablets e computadores."
  },
  {
    icon: Share2,
    title: "Fácil Compartilhamento",
    description: "Compartilhe via QR code, link direto ou redes sociais de forma instantânea."
  },
  {
    icon: Lock,
    title: "Totalmente Seguro",
    description: "Suas informações e memórias estão protegidas com criptografia de ponta."
  },
  {
    icon: Star,
    title: "Memórias Eternas",
    description: "Sua página permanecerá online para sempre, preservando suas memórias."
  }
];

const Features = () => {
  return (
    <section id="recursos" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Recursos Exclusivos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tudo que você precisa para criar páginas especiais inesquecíveis para qualquer ocasião.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="p-8 bg-gradient-card border-border/50 hover:shadow-love transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <Icon className="h-12 w-12 text-primary group-hover:animate-glow transition-all duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;