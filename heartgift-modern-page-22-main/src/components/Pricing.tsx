import { Check, Heart, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const plans = [
  {
    name: "Básico",
    price: "R$ 29",
    originalPrice: "R$ 49",
    description: "Perfeito para ocasiões especiais simples",
    features: [
      "1 página personalizada",
      "5 fotos incluídas",
      "3 temas disponíveis",
      "Mensagem de texto",
      "Compartilhamento via link",
      "Página online por 1 ano"
    ],
    popular: false,
    icon: Heart
  },
  {
    name: "Premium",
    price: "R$ 49",
    originalPrice: "R$ 89", 
    description: "A escolha favorita para momentos únicos",
    features: [
      "Página personalizada completa",
      "Fotos e vídeos ilimitados",
      "Todos os temas disponíveis",
      "Efeitos especiais animados",
      "Música de fundo personalizada",
      "QR code personalizado",
      "Página online para sempre",
      "Suporte prioritário"
    ],
    popular: true,
    icon: Crown
  },
  {
    name: "Deluxe",
    price: "R$ 79",
    originalPrice: "R$ 149",
    description: "Para momentos únicos e inesquecíveis",
    features: [
      "Tudo do plano Premium",
      "Design exclusivo personalizado",
      "Timeline interativa",
      "Galeria de fotos avançada",
      "Contador regressivo especial",
      "Domínio personalizado",
      "Certificado de amor digital",
      "Backup em nuvem"
    ],
    popular: false,
    icon: Crown
  }
];

const Pricing = () => {
  return (
    <section id="precos" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Escolha seu Plano
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Preços especiais por tempo limitado. Crie sua declaração de amor hoje mesmo!
          </p>
          <div className="inline-block mt-4">
            <span className="text-sm font-medium text-primary-soft bg-primary/10 px-3 py-1 rounded-full">
              🔥 50% OFF - Apenas hoje!
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name}
                className={`relative p-8 text-center transition-all duration-300 animate-fade-in ${
                  plan.popular 
                    ? 'bg-gradient-primary border-primary shadow-glow scale-105' 
                    : 'bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-love'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <Icon className={`h-12 w-12 mx-auto ${plan.popular ? 'text-white' : 'text-primary'}`} />
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                
                <p className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
                
                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-2">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg line-through ${plan.popular ? 'text-white/60' : 'text-muted-foreground'}`}>
                      {plan.originalPrice}
                    </span>
                  </div>
                  <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-muted-foreground'}`}>
                    pagamento único
                  </span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className={`flex items-center space-x-3 ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                      <Check className={`h-5 w-5 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="lg"
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-white text-primary hover:bg-white/90' 
                      : 'bg-gradient-primary hover:opacity-90 shadow-love'
                  }`}
                  onClick={() => {
                    if (plan.name === 'Deluxe') {
                      // Placeholder para contato empresarial
                      alert('Entre em contato conosco para um plano personalizado: contato@heartgift.com');
                    } else {
                      // Redireciona para criar presente com plano selecionado
                      window.location.href = `/criar-presente?plano=${plan.name.toLowerCase()}`;
                    }
                  }}
                >
                  {plan.name === 'Deluxe' ? 'Consultar' : `Escolher ${plan.name}`}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;