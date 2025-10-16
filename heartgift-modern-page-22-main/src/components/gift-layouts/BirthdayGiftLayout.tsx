import { useState, useEffect } from 'react';
import { Gift, Cake, Sparkles, Camera, Music } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FloatingParticles from '@/components/gift-effects/FloatingParticles';
import CountdownWidget from '@/components/gift-widgets/CountdownWidget';
import PhotoGallery from '@/components/gift-widgets/PhotoGallery';
import MusicPlayer from '@/components/gift-widgets/MusicPlayer';

/**
 * Interface para dados do presente de aniversário
 */
interface BirthdayGiftData {
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
 * Props do layout de aniversário
 */
interface BirthdayGiftLayoutProps {
  giftData: BirthdayGiftData;
  onUpdate: (data: Partial<BirthdayGiftData>) => void;
}

/**
 * Layout festivo para presentes de aniversário
 * Design com cores vibrantes, confetes e elementos de celebração
 */
const BirthdayGiftLayout = ({ giftData, onUpdate }: BirthdayGiftLayoutProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  /**
   * Inicia animação de confetes
   */
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Seções do presente de aniversário
   */
  const sections = [
    { id: 'celebration', label: 'Celebração', icon: Cake },
    { id: 'wishes', label: 'Desejos', icon: Sparkles },
    { id: 'memories', label: 'Memórias', icon: Camera },
    { id: 'countdown', label: 'Contagem', icon: Gift },
    { id: 'party', label: 'Festa', icon: Music }
  ];

  /**
   * Renderiza a seção de celebração
   */
  const renderCelebrationSection = () => (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Fundo festivo com gradiente colorido */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, #ff6b9d40, transparent),
            radial-gradient(circle at 80% 20%, #4ecdc440, transparent),
            radial-gradient(circle at 40% 40%, #45b7d140, transparent),
            linear-gradient(135deg, ${giftData.backgroundColor}20, transparent)
          `
        }}
      />
      
      {/* Confetes animados */}
      {showConfetti && (
        <FloatingParticles type="confetti" color="multicolor" density={50} />
      )}
      
      <div className="text-center relative z-10 max-w-3xl mx-auto">
        {/* Ícone de bolo animado */}
        <div className="relative mb-12 animate-bounce">
          <div className="w-40 h-40 mx-auto relative">
            {/* Base do bolo */}
            <div 
              className="absolute inset-0 rounded-full animate-glow"
              style={{ 
                background: `conic-gradient(from 0deg, #ff6b9d, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b9d)`,
                boxShadow: `0 0 60px rgba(255, 107, 157, 0.4)`
              }}
            />
            <div className="absolute inset-6 bg-background rounded-full flex items-center justify-center shadow-inner">
              <Cake 
                size={64} 
                className="text-primary animate-pulse"
                fill="currentColor"
              />
            </div>
            
            {/* Velas animadas */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="inline-block w-1 h-8 bg-yellow-400 mx-1 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Texto principal */}
        <div className="space-y-6 animate-fade-in">
          <div className="text-6xl font-bold mb-4 animate-bounce" style={{ color: '#ff6b9d' }}>
            🎉 PARABÉNS! 🎉
          </div>
          
          <h1 
            className="text-5xl font-bold leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            Feliz Aniversário,<br />
            {giftData.recipientName}!
          </h1>
          
          <p 
            className="text-2xl leading-relaxed font-medium"
            style={{ color: giftData.textColor }}
          >
            Que este novo ano seja repleto de<br />
            <span className="text-yellow-400 font-bold">alegrias</span>, {' '}
            <span className="text-pink-400 font-bold">conquistas</span> e {' '}
            <span className="text-blue-400 font-bold">momentos especiais</span>!
          </p>

          {/* Remetente */}
          <div 
            className="text-xl font-medium pt-8"
            style={{ color: giftData.backgroundColor }}
          >
            Com carinho e muito amor,<br />
            <span className="text-3xl font-bold text-gradient-primary">
              {giftData.senderName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renderiza a seção de desejos
   */
  const renderWishesSection = () => (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      {/* Fundo com estrelas */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <Sparkles size={Math.random() * 20 + 10} className="text-yellow-400" />
          </div>
        ))}
      </div>
      
      <Card 
        className="max-w-4xl w-full p-12 relative overflow-hidden bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-blue-100/20 backdrop-blur-sm border-0 shadow-2xl"
      >
        {/* Borda colorida animada */}
        <div className="absolute inset-0 rounded-lg p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient">
          <div className="w-full h-full bg-background rounded-lg" />
        </div>

        <div className="text-center relative z-10 space-y-8">
          {/* Ícone de estrela */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center animate-spin-slow">
              <Sparkles size={36} className="text-white" fill="currentColor" />
            </div>
          </div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Meus Desejos para Você
          </h2>
          
          {/* Mensagem em destaque */}
          <div className="relative">
            <blockquote 
              className="text-2xl leading-relaxed font-medium text-foreground relative p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(78,205,196,0.1))'
              }}
            >
              <div className="absolute top-0 left-0 text-6xl text-pink-400 opacity-30">"</div>
              {giftData.message}
              <div className="absolute bottom-0 right-0 text-6xl text-blue-400 opacity-30">"</div>
            </blockquote>
          </div>

          {/* Lista de desejos decorativos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '🌟', text: 'Muito sucesso', color: 'text-yellow-500' },
              { icon: '💖', text: 'Amor infinito', color: 'text-pink-500' },
              { icon: '🎯', text: 'Sonhos realizados', color: 'text-blue-500' }
            ].map((wish, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-2">{wish.icon}</div>
                <div className={`text-lg font-semibold ${wish.color}`}>
                  {wish.text}
                </div>
              </div>
            ))}
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
      case 'celebration':
        return renderCelebrationSection();
      case 'wishes':
        return renderWishesSection();
      case 'memories':
        return (
          <div className="min-h-screen p-8">
            <PhotoGallery 
              photos={giftData.photos || []}
              theme="birthday"
              accentColor={giftData.backgroundColor}
            />
          </div>
        );
      case 'countdown':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <CountdownWidget
              targetDate={giftData.specialDate}
              theme="birthday"
              title="Countdown para o próximo aniversário"
              accentColor={giftData.backgroundColor}
            />
          </div>
        );
      case 'party':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <MusicPlayer
              musicUrl={giftData.musicUrl}
              theme="birthday"
              accentColor={giftData.backgroundColor}
            />
          </div>
        );
      default:
        return renderCelebrationSection();
    }
  };

  return (
    <div className="relative">
      {/* Navegação festiva */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <Card className="flex items-center gap-2 p-3 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-white/20">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={currentSection === index ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentSection(index)}
                className={`
                  flex items-center gap-2 transition-all duration-300 hover:scale-105
                  ${currentSection === index 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                    : 'hover:bg-white/20 text-foreground'
                  }
                `}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{section.label}</span>
              </Button>
            );
          })}
        </Card>
      </div>

      {/* Indicadores coloridos */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-3">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`
                w-3 h-8 rounded-full transition-all duration-300 cursor-pointer shadow-lg
                ${currentSection === index 
                  ? 'bg-gradient-to-b from-pink-500 to-purple-500 scale-110' 
                  : 'bg-white/30 hover:bg-white/50'
                }
              `}
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

export default BirthdayGiftLayout;