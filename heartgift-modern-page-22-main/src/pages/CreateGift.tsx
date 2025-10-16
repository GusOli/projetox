import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Gift, Building, Crown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePlan } from '@/contexts/PlanContext';
import ThemeCard from '@/components/create-gift/ThemeCard';
import GiftForm from '@/components/create-gift/GiftForm';
import FloatingHearts from '@/components/FloatingHearts';

/**
 * Tipos de tema disponíveis para o presente digital
 * - couple: Tema romântico para casais
 * - birthday: Tema alegre para aniversários  
 * - corporate: Tema profissional para empresas
 */
export type ThemeType = 'couple' | 'birthday' | 'corporate';

/**
 * Interface para os dados do presente digital
 */
export interface GiftData {
  theme: ThemeType;
  recipientName: string;
  senderName: string;
  message: string;
  specialDate: string;
  musicFile?: File;
  backgroundColor: string;
  textColor: string;
  spotifyTrack?: any;
  photos?: File[];
  photoUrls?: string[];
  customizationData?: any;
}

/**
 * Página principal para criação de presentes digitais
 * Permite ao usuário escolher entre diferentes temas e personalizar sua mensagem
 */
const CreateGift = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan, getPlanFeatures } = usePlan();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | null>(null);
  const [step, setStep] = useState<'theme' | 'form' | 'preview'>('theme');
  const [editingData, setEditingData] = useState<GiftData | null>(null);

  const planFeatures = getPlanFeatures(selectedPlan);

  /**
   * Verifica se está continuando uma edição
   */
  useEffect(() => {
    if (location.state?.giftData && location.state?.continueEditing) {
      const data = location.state.giftData as GiftData;
      setEditingData(data);
      setSelectedTheme(data.theme);
      setStep('form');
    }
  }, [location.state]);

  /**
   * Navega de volta para a página inicial
   */
  const handleGoBack = () => {
    if (step === 'form') {
      setStep('theme');
      setSelectedTheme(null);
    } else {
      navigate('/');
    }
  };

  /**
   * Processa a seleção do tema e avança para o formulário
   */
  const handleThemeSelect = (theme: ThemeType) => {
    setSelectedTheme(theme);
    setStep('form');
  };

  /**
   * Informações do plano atual
   */
  const getPlanInfo = () => {
    switch (selectedPlan) {
      case 'basico':
        return {
          name: 'Plano Básico',
          icon: Heart,
          color: 'text-blue-600',
          features: [
            `Até ${planFeatures.maxPhotos} fotos`,
            'Integração com Spotify',
            'Cores personalizadas',
            'QR Code incluído'
          ]
        };
      case 'premium':
        return {
          name: 'Plano Premium',
          icon: Crown,
          color: 'text-purple-600',
          features: [
            'Fotos ilimitadas',
            'Todos os efeitos visuais',
            'Animações especiais',
            'Suporte prioritário'
          ]
        };
      case 'deluxe':
        return {
          name: 'Plano Deluxe',
          icon: Crown,
          color: 'text-gold-600',
          features: [
            'Tudo do Premium',
            'Domínio personalizado',
            'Design exclusivo',
            'Backup em nuvem'
          ]
        };
      default:
        return {
          name: 'Plano Premium',
          icon: Crown,
          color: 'text-purple-600',
          features: []
        };
    }
  };

  const planInfo = getPlanInfo();

  /**
   * Configurações visuais para cada tema
   */
  const themeConfigs = {
    couple: {
      title: 'Namorados',
      description: 'Crie uma declaração de amor única e emocionante',
      icon: Heart,
      gradient: 'bg-gradient-primary',
      color: 'text-primary',
      features: ['Contador de dias juntos', 'Música romântica', 'Animações de corações', 'Mensagem personalizada']
    },
    birthday: {
      title: 'Aniversário', 
      description: 'Comemore essa data especial de forma inesquecível',
      icon: Gift,
      gradient: 'bg-gradient-hero',
      color: 'text-secondary',
      features: ['Countdown para aniversário', 'Efeitos de confete', 'Fotos especiais', 'Mensagem de parabéns']
    },
    corporate: {
      title: 'Empresarial',
      description: 'Presente corporativo elegante para clientes especiais',
      icon: Building,
      gradient: 'bg-gradient-card',
      color: 'text-foreground',
      features: ['Design profissional', 'Logo da empresa', 'Mensagem institucional', 'Cores personalizáveis']
    }
  };

  return (
    <div className="min-h-screen relative bg-background">
      <FloatingHearts />
      
      {/* Header com botão voltar */}
      <header className="relative z-10 p-6 border-b border-border/10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Voltar
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              {step === 'theme' ? 'Escolha seu Tema' : 'Personalize seu Presente'}
            </h1>
            <p className="text-muted-foreground mt-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {step === 'theme' 
                ? 'Selecione o estilo perfeito para sua ocasião especial'
                : 'Preencha os detalhes para criar uma experiência única'
              }
            </p>
          </div>

          {/* Informação do plano atual */}
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm bg-primary/10 px-3 py-1 rounded-full">
              <planInfo.icon className={`w-4 h-4 ${planInfo.color}`} />
              <span className="text-muted-foreground font-medium">{planInfo.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Etapa 1: Seleção de tema */}
          {step === 'theme' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {(Object.keys(themeConfigs) as ThemeType[]).map((theme, index) => (
                <div 
                  key={theme}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ThemeCard
                    theme={theme}
                    config={themeConfigs[theme]}
                    onSelect={handleThemeSelect}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Etapa 2: Formulário de personalização */}
          {step === 'form' && selectedTheme && (
            <div className="mt-8 animate-fade-in">
              <GiftForm 
                theme={selectedTheme}
                themeConfig={themeConfigs[selectedTheme]}
                initialData={editingData}
                onComplete={(data) => {
                  console.log('Gift created:', data);
                  // Aqui você pode implementar a lógica de salvar/gerar o presente
                }}
              />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default CreateGift;