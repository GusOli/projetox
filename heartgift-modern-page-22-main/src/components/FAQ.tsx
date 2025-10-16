import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

const faqs = [
  {
    question: "Como funciona o HeartGift?",
    answer: "É muito simples! Você escolhe um plano, personaliza sua página com fotos, textos e efeitos especiais, faz o pagamento e recebe o link por email. Todo o processo leva apenas alguns minutos."
  },
  {
    question: "Posso usar para aniversários além de declarações de amor?",
    answer: "Sim! O HeartGift é perfeito para qualquer ocasião especial: aniversários, casamentos, pedidos de namoro, formaturas, e muito mais. Nossos temas se adaptam a qualquer celebração."
  },
  {
    question: "As páginas ficam online para sempre?",
    answer: "Sim! No plano Premium e Deluxe suas páginas ficam online permanentemente. No plano Básico, a página fica disponível por 1 ano, com opção de renovação."
  },
  {
    question: "Posso adicionar vídeos e músicas?",
    answer: "Sim! Nos planos Premium e Deluxe você pode adicionar vídeos ilimitados e até mesmo música de fundo personalizada para criar uma experiência ainda mais especial."
  },
  {
    question: "É seguro? Minhas informações estão protegidas?",
    answer: "Absolutamente! Usamos criptografia de ponta e todos os dados são armazenados com segurança. Suas informações pessoais e fotos estão totalmente protegidas."
  },
  {
    question: "Posso editar a página depois de criada?",
    answer: "Sim! Você pode fazer alterações na sua página a qualquer momento. Nos planos Premium e Deluxe, você tem acesso completo ao editor para modificações ilimitadas."
  },
  {
    question: "Como faço para compartilhar a página?",
    answer: "Você recebe um link único e um QR code personalizado por email. Pode compartilhar via WhatsApp, redes sociais, ou qualquer plataforma que desejar."
  },
  {
    question: "Tem suporte se eu precisar de ajuda?",
    answer: "Claro! Temos uma equipe de suporte dedicada. Clientes Premium e Deluxe têm suporte prioritário, mas atendemos todos os nossos usuários com carinho."
  },
  {
    question: "Posso cancelar ou solicitar reembolso?",
    answer: "Sim! Oferecemos garantia de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro, sem perguntas. Sua satisfação é nossa prioridade."
  },
  {
    question: "Funciona bem no celular?",
    answer: "Perfeitamente! Todas as nossas páginas são responsivas e ficam lindas em celulares, tablets e computadores. A experiência é otimizada para todos os dispositivos."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tire suas dúvidas sobre o HeartGift. Se não encontrar a resposta que procura, 
            entre em contato conosco!
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-love transition-all duration-300 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ainda tem dúvidas?
          </p>
          <a 
            href="mailto:contato@heartgift.com"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
            Entre em contato conosco →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;