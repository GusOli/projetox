import { Edit3, CreditCard, Mail, Share } from 'lucide-react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    icon: Edit3,
    number: "1",
    title: "Personalize",
    description: "Personalize sua página com fotos, mensagens, efeitos especiais e muito mais."
  },
  {
    icon: CreditCard,
    number: "2",
    title: "Faça o pagamento",
    description: "Escolha seu plano preferido e faça o pagamento de forma rápida e segura."
  },
  {
    icon: Mail,
    number: "3",
    title: "Receba seu acesso",
    description: "Você receberá por email um QR code e link para acessar sua página."
  },
  {
    icon: Share,
    number: "4",
    title: "Compartilhe o amor",
    description: "Compartilhe a página com a pessoa amada e surpreenda-a de forma especial."
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Como funciona?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Crie sua página em poucos passos. Perfeito para declarações de amor, 
            aniversários e ocasiões especiais. O processo é simples e rápido.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={step.number} 
                className="relative p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-love transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow">
                    {step.number}
                  </div>
                </div>
                
                <div className="mb-6 pt-4">
                  <Icon className="h-12 w-12 text-primary mx-auto animate-float" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-8">
            Uma declaração de amor que ficará para sempre.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;