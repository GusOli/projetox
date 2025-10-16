import { useState } from 'react';
import { ArrowLeft, Heart, Gift, Building, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
}

/**
 * Página principal para criação de presentes digitais
 * Permite ao usuário escolher entre diferentes temas e personalizar sua mensagem
 */
const CreateGift = () => {
  const navigate = useNavigate();
  const { selectedPlan, getPlanFeatures } = usePlan();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | null>(null);
  const [step, setStep] = useState<'theme' | 'form' | 'preview'>('theme');

  const planFeatures = getPlanFeatures(selectedPlan);

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
      <header className="relative z-10 p-6 border-b border-border/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="flex items-center gap-2 text-foreground hover:text-primary"
          >
            <ArrowLeft size={20} />
            Voltar
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {step === 'theme' ? 'Escolha seu Tema' : 'Personalize seu Presente'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {step === 'theme' 
                ? 'Selecione o estilo perfeito para sua ocasião especial'
                : 'Preencha os detalhes para criar uma experiência única'
              }
            </p>
          </div>

          {/* Informação do plano atual */}
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm">
              <planInfo.icon className={`w-4 h-4 ${planInfo.color}`} />
              <span className="text-muted-foreground">{planInfo.name}</span>
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
              {(Object.keys(themeConfigs) as ThemeType[]).map((theme) => (
                <ThemeCard
                  key={theme}
                  theme={theme}
                  config={themeConfigs[theme]}
                  onSelect={handleThemeSelect}
                />
              ))}
            </div>
          )}

          {/* Etapa 2: Formulário de personalização */}
          {step === 'form' && selectedTheme && (
            <div className="mt-8">
              <GiftForm 
                theme={selectedTheme}
                themeConfig={themeConfigs[selectedTheme]}
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