import { useState } from 'react';
import { Building, Award, Handshake, Camera, Music, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CountdownWidget from '@/components/gift-widgets/CountdownWidget';
import PhotoGallery from '@/components/gift-widgets/PhotoGallery';
import MusicPlayer from '@/components/gift-widgets/MusicPlayer';

/**
 * Interface para dados do presente corporativo
 */
interface CorporateGiftData {
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
 * Props do layout corporativo
 */
interface CorporateGiftLayoutProps {
  giftData: CorporateGiftData;
  onUpdate: (data: Partial<CorporateGiftData>) => void;
}

/**
 * Layout elegante e profissional para presentes corporativos
 * Design clean, cores sóbrias e elementos de negócios
 */
const CorporateGiftLayout = ({ giftData, onUpdate }: CorporateGiftLayoutProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  /**
   * Seções do presente corporativo
   */
  const sections = [
    { id: 'welcome', label: 'Boas-vindas', icon: Handshake },
    { id: 'appreciation', label: 'Reconhecimento', icon: Award },
    { id: 'achievements', label: 'Conquistas', icon: Trophy },
    { id: 'timeline', label: 'Marcos', icon: Camera },
    { id: 'celebration', label: 'Celebração', icon: Music }
  ];

  /**
   * Renderiza a seção de boas-vindas
   */
  const renderWelcomeSection = () => (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      {/* Fundo corporativo elegante */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            background: `
              linear-gradient(135deg, ${giftData.backgroundColor}20, transparent),
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 50px,
                ${giftData.backgroundColor}05 50px,
                ${giftData.backgroundColor}05 100px
              )
            `
          }}
        />
      </div>
      
      <div className="text-center relative z-10 max-w-4xl mx-auto">
        {/* Logo/Ícone corporativo */}
        <div className="relative mb-12">
          <div className="w-32 h-32 mx-auto relative">
            <div 
              className="absolute inset-0 rounded-2xl border-4 shadow-2xl"
              style={{ 
                borderColor: giftData.backgroundColor,
                backgroundColor: 'rgba(255,255,255,0.95)'
              }}
            />
            <div className="absolute inset-4 flex items-center justify-center">
              <Building 
                size={56} 
                style={{ color: giftData.backgroundColor }}
              />
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 
              className="text-5xl font-bold leading-tight"
              style={{ color: giftData.textColor }}
            >
              Presente Corporativo
            </h1>
            
            <div 
              className="text-3xl font-semibold"
              style={{ color: giftData.backgroundColor }}
            >
              Para {giftData.recipientName}
            </div>
          </div>
          
          <div 
            className="max-w-2xl mx-auto text-xl leading-relaxed"
            style={{ color: giftData.textColor }}
          >
            <p className="mb-6">
              É com grande satisfação que apresentamos este reconhecimento especial, 
              demonstrando nossa gratidão pela excelência e dedicação demonstradas.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-lg">
              <Award size={24} style={{ color: giftData.backgroundColor }} />
              <span>Reconhecimento de Excelência</span>
            </div>
          </div>

          {/* Assinatura corporativa */}
          <div className="pt-12 border-t border-border/30">
            <div 
              className="text-lg font-medium"
              style={{ color: giftData.textColor }}
            >
              Atenciosamente,
            </div>
            <div 
              className="text-2xl font-bold mt-2"
              style={{ color: giftData.backgroundColor }}
            >
              {giftData.senderName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renderiza a seção de reconhecimento
   */
  const renderAppreciationSection = () => (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      <Card 
        className="max-w-5xl w-full p-12 relative overflow-hidden bg-background/98 border-0 shadow-2xl"
        style={{ 
          boxShadow: `0 25px 80px ${giftData.backgroundColor}15`,
          border: `1px solid ${giftData.backgroundColor}30`
        }}
      >
        {/* Elementos decorativos corporativos */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div 
            className="w-full h-full rounded-full"
            style={{ backgroundColor: giftData.backgroundColor }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
          <div 
            className="w-full h-full rounded-full"
            style={{ backgroundColor: giftData.backgroundColor }}
          />
        </div>

        <div className="relative z-10">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <div 
              className="w-20 h-20 mx-auto rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${giftData.backgroundColor}20` }}
            >
              <Award 
                size={40} 
                style={{ color: giftData.backgroundColor }}
                fill="currentColor"
              />
            </div>
            
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: giftData.backgroundColor }}
            >
              Certificado de Reconhecimento
            </h2>
            
            <div className="w-24 h-1 mx-auto rounded" style={{ backgroundColor: giftData.backgroundColor }} />
          </div>

          {/* Conteúdo da mensagem */}
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Concedido a
              </p>
              <h3 
                className="text-3xl font-bold mb-8"
                style={{ color: giftData.textColor }}
              >
                {giftData.recipientName}
              </h3>
            </div>

            <blockquote 
              className="text-xl leading-relaxed text-center relative p-8"
              style={{ color: giftData.textColor }}
            >
              <div className="absolute top-0 left-0 text-4xl opacity-20" style={{ color: giftData.backgroundColor }}>"</div>
              {giftData.message}
              <div className="absolute bottom-0 right-0 text-4xl opacity-20" style={{ color: giftData.backgroundColor }}>"</div>
            </blockquote>

            {/* Elementos de prestígio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: Trophy, title: 'Excelência', desc: 'Padrão de qualidade superior' },
                { icon: Handshake, title: 'Parceria', desc: 'Relacionamento de confiança' },
                { icon: Building, title: 'Profissionalismo', desc: 'Dedicação exemplar' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-xl bg-background/50">
                    <div 
                      className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${giftData.backgroundColor}20` }}
                    >
                      <Icon size={24} style={{ color: giftData.backgroundColor }} />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Data e assinatura */}
            <div className="flex justify-between items-end pt-12 border-t border-border/30">
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="font-medium" style={{ color: giftData.textColor }}>
                  {new Date(giftData.specialDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="text-right">
                <div className="w-48 border-b border-border mb-2" />
                <p className="font-bold" style={{ color: giftData.backgroundColor }}>
                  {giftData.senderName}
                </p>
                <p className="text-sm text-muted-foreground">Diretor Executivo</p>
              </div>
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
      case 'welcome':
        return renderWelcomeSection();
      case 'appreciation':
        return renderAppreciationSection();
      case 'achievements':
        return (
          <div className="min-h-screen p-8">
            <PhotoGallery 
              photos={giftData.photos || []}
              theme="corporate"
              accentColor={giftData.backgroundColor}
            />
          </div>
        );
      case 'timeline':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <CountdownWidget
              targetDate={giftData.specialDate}
              theme="corporate"
              title="Marco empresarial"
              accentColor={giftData.backgroundColor}
            />
          </div>
        );
      case 'celebration':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <MusicPlayer
              musicUrl={giftData.musicUrl}
              theme="corporate"
              accentColor={giftData.backgroundColor}
            />
          </div>
        );
      default:
        return renderWelcomeSection();
    }
  };

  return (
    <div className="relative">
      {/* Navegação corporativa */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <Card className="flex items-center gap-2 p-3 bg-background/95 backdrop-blur-sm border border-border/50 shadow-xl">
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
                    ? 'shadow-lg' 
                    : 'hover:bg-accent/50'
                  }
                `}
                style={{
                  backgroundColor: currentSection === index ? giftData.backgroundColor : undefined,
                  color: currentSection === index ? 'white' : undefined
                }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{section.label}</span>
              </Button>
            );
          })}
        </Card>
      </div>

      {/* Indicadores de progresso elegantes */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-8 rounded-full transition-all duration-300 cursor-pointer
                ${currentSection === index ? 'shadow-md' : 'bg-border hover:bg-border/70'}
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

export default CorporateGiftLayout;