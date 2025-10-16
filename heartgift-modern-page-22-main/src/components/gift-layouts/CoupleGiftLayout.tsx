import { useState, useEffect } from 'react';
import { Heart, Music, Calendar, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FloatingParticles from '@/components/gift-effects/FloatingParticles';
import CountdownWidget from '@/components/gift-widgets/CountdownWidget';
import PhotoGallery from '@/components/gift-widgets/PhotoGallery';
import MusicPlayer from '@/components/gift-widgets/MusicPlayer';

/**
 * Interface para dados do presente de casal
 */
interface CoupleGiftData {
  recipientName: string;
  senderName: string;
  message: string;
  specialDate: string;
  backgroundColor: string;
  textColor: string;
  photos?: File[];
  selectedFrame?: string;
  textStyle?: string;
  musicUrl?: string;
}

/**
 * Props do layout de casal
 */
interface CoupleGiftLayoutProps {
  giftData: CoupleGiftData;
  onUpdate: (data: Partial<CoupleGiftData>) => void;
}

/**
 * Layout romântico para presentes de casais
 * Design com elementos de amor, cores quentes e animações suaves
 */
const CoupleGiftLayout = ({ giftData, onUpdate }: CoupleGiftLayoutProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Animação de entrada gradual
   */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Seções do presente romântico
   */
  const sections = [
    { id: 'intro', label: 'Introdução', icon: Heart },
    { id: 'message', label: 'Mensagem', icon: Heart },
    { id: 'photos', label: 'Momentos', icon: Camera },
    { id: 'countdown', label: 'Nosso Tempo', icon: Calendar },
    { id: 'music', label: 'Nossa Música', icon: Music }
  ];

  /**
   * Renderiza a seção de introdução
   */
  const renderIntroSection = () => (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Fundo com gradiente romântico */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{
          background: `linear-gradient(135deg, ${giftData.backgroundColor}20, ${giftData.backgroundColor}40, transparent)`
        }}
      />
      
      {/* Partículas flutuantes de corações */}
      <FloatingParticles type="hearts" color={giftData.backgroundColor} />
      
      <div className="text-center relative z-10 max-w-2xl mx-auto">
        {/* Anel de coração animado */}
        <div className="relative mb-12">
          <div className="w-32 h-32 mx-auto relative">
            <div 
              className="absolute inset-0 rounded-full animate-glow"
              style={{ 
                background: `linear-gradient(45deg, ${giftData.backgroundColor}, #ff8fab)`,
                boxShadow: `0 0 40px ${giftData.backgroundColor}40`
              }}
            />
            <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center">
              <Heart 
                size={48} 
                className="animate-pulse"
                style={{ color: giftData.backgroundColor }}
                fill="currentColor"
              />
            </div>
          </div>
        </div>

        {/* Texto de abertura */}
        <div 
          className={`animate-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        >
          <h1 
            className="text-5xl font-bold mb-6 leading-tight"
            style={{ color: giftData.textColor }}
          >
            Para a pessoa mais especial...
          </h1>
          
          <div 
            className="text-3xl mb-8 font-semibold"
            style={{ color: giftData.backgroundColor }}
          >
            {giftData.recipientName}
          </div>
          
          <p 
            className="text-xl leading-relaxed mb-12 opacity-90"
            style={{ color: giftData.textColor }}
          >
            Um presente feito especialmente para você,<br />
            com todo meu amor e carinho.
          </p>

          {/* Assinatura */}
          <div 
            className="text-lg font-medium opacity-80"
            style={{ color: giftData.textColor }}
          >
            Com amor infinito,<br />
            <span 
              className="text-2xl font-bold"
              style={{ color: giftData.backgroundColor }}
            >
              {giftData.senderName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renderiza a seção da mensagem principal
   */
  const renderMessageSection = () => (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            background: `radial-gradient(circle at 30% 70%, ${giftData.backgroundColor}40, transparent),
                        radial-gradient(circle at 70% 30%, #ff8fab30, transparent)`
          }}
        />
      </div>
      
      <Card 
        className="max-w-4xl w-full p-12 relative overflow-hidden bg-background/95 backdrop-blur-sm border-0 shadow-2xl"
        style={{ 
          boxShadow: `0 20px 60px ${giftData.backgroundColor}20`,
          border: `2px solid ${giftData.backgroundColor}20`
        }}
      >
        {/* Decoração de cantos */}
        <div className="absolute top-0 left-0 w-20 h-20">
          <div 
            className="w-full h-full rounded-br-full opacity-20"
            style={{ backgroundColor: giftData.backgroundColor }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20">
          <div 
            className="w-full h-full rounded-tl-full opacity-20"
            style={{ backgroundColor: giftData.backgroundColor }}
          />
        </div>

        <div className="text-center relative z-10">
          {/* Ícone decorativo */}
          <div className="mb-8">
            <div 
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${giftData.backgroundColor}20` }}
            >
              <Heart 
                size={28} 
                style={{ color: giftData.backgroundColor }}
                fill="currentColor"
              />
            </div>
          </div>

          {/* Mensagem principal */}
          <div className="space-y-8">
            <h2 
              className="text-4xl font-bold mb-8"
              style={{ color: giftData.backgroundColor }}
            >
              Minha Declaração
            </h2>
            
            <blockquote 
              className={`text-2xl leading-relaxed font-light italic relative ${giftData.textStyle ? `text-${giftData.textStyle}` : 'text-romantic'}`}
              style={{ color: giftData.textColor }}
            >
              <span className="text-6xl opacity-30 absolute -top-4 -left-4">"</span>
              <span className={giftData.selectedFrame ? `frame-${giftData.selectedFrame}` : 'frame-classic'}>
                {giftData.message}
              </span>
              <span className="text-6xl opacity-30 absolute -bottom-8 right-4">"</span>
            </blockquote>

            {/* Assinatura elegante */}
            <div className="mt-12 pt-8 border-t border-border/30">
              <p 
                className="text-xl font-medium"
                style={{ color: giftData.backgroundColor }}
              >
                Para sempre seu,<br />
                <span className="text-2xl font-bold">{giftData.senderName}</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  /**
   * Renderiza a seção atual
   */
  const renderCurrentSection = () => {
    const section = sections[currentSection];
    
    switch (section.id) {
      case 'intro':
        return renderIntroSection();
      case 'message':
        return renderMessageSection();
      case 'photos':
        return (
          <div className="min-h-screen p-8">
            <PhotoGallery 
              photos={giftData.photos || []}
              theme="couple"
              accentColor={giftData.backgroundColor}
            />
          </div>
        );
      case 'countdown':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <CountdownWidget
              targetDate={giftData.specialDate}
              theme="couple"
              title="Nosso tempo especial"
              accentColor={giftData.backgroundColor}
            />
          </div>
        );
      case 'music':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <MusicPlayer
              musicUrl={giftData.musicUrl}
              theme="couple"
              accentColor={giftData.backgroundColor}
            />
          </div>
        );
      default:
        return renderIntroSection();
    }
  };

  return (
    <div className="relative">
      {/* Navegação entre seções */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <Card className="flex items-center gap-2 p-3 bg-background/90 backdrop-blur-sm border-border/50">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={currentSection === index ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentSection(index)}
                className={`
                  flex items-center gap-2 transition-all duration-300
                  ${currentSection === index 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-primary/10'
                  }
                `}
                style={{
                  backgroundColor: currentSection === index ? giftData.backgroundColor : undefined
                }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{section.label}</span>
              </Button>
            );
          })}
        </Card>
      </div>

      {/* Indicadores de progresso */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-8 rounded-full transition-all duration-300 cursor-pointer
                ${currentSection === index ? 'bg-primary' : 'bg-border'}
              `}
              style={{
                backgroundColor: currentSection === index ? giftData.backgroundColor : undefined
              }}
              onClick={() => setCurrentSection(index)}
            />
          ))}
        </div>
      </div>

      {/* Seção atual */}
      <div className="relative">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default CoupleGiftLayout;