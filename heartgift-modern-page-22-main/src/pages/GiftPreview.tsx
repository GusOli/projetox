import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Edit3, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GiftData, ThemeType } from '@/pages/CreateGift';
import CoupleGiftLayout from '@/components/gift-layouts/CoupleGiftLayout';
import BirthdayGiftLayout from '@/components/gift-layouts/BirthdayGiftLayout';
import CorporateGiftLayout from '@/components/gift-layouts/CorporateGiftLayout';
import GiftCustomizer from '@/components/gift-preview/GiftCustomizer';
import FloatingHearts from '@/components/FloatingHearts';
import QRCodeGenerator from '@/components/QRCodeGenerator';

/**
 * Interface para dados customizados do presente
 */
interface CustomGiftData extends GiftData {
  photos?: File[];
  selectedFrame?: string;
  textStyle?: string;
  musicUrl?: string;
  customElements?: any[];
}

/**
 * Página final de visualização do presente digital
 * Exibe o presente personalizado com todas as funcionalidades interativas
 */
const GiftPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [giftData, setGiftData] = useState<CustomGiftData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);

  /**
   * Carrega os dados do presente da navegação
   */
  useEffect(() => {
    // Simula carregamento dos dados
    const timer = setTimeout(() => {
      if (location.state?.giftData) {
        setGiftData(location.state.giftData as CustomGiftData);
        setShowQR(location.state.showQR || false);
      } else {
        // Dados de exemplo caso não venha do estado
        setGiftData({
          theme: 'couple',
          recipientName: 'Maria',
          senderName: 'João',
          message: 'Cada momento ao seu lado é um presente especial. Te amo infinitamente!',
          specialDate: '2024-12-25',
          backgroundColor: '#ff6b9d',
          textColor: '#ffffff',
          photos: [],
          selectedFrame: 'classic',
          textStyle: 'romantic'
        });
      }
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.state]);

  /**
   * Atualiza os dados customizados do presente
   */
  const handleGiftUpdate = (updatedData: Partial<CustomGiftData>) => {
    if (giftData) {
      setGiftData({ ...giftData, ...updatedData });
    }
  };

  /**
   * Navega de volta para a criação
   */
  const handleGoBack = () => {
    navigate('/criar-presente');
  };

  /**
   * Compartilha o presente
   */
  const handleShare = async () => {
    if (navigator.share && giftData) {
      try {
        await navigator.share({
          title: `Presente especial de ${giftData.senderName}`,
          text: `${giftData.senderName} criou um presente especial para ${giftData.recipientName}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  /**
   * Baixa o presente como imagem
   */
  const handleDownload = () => {
    // Implementar captura de tela do presente
    console.log('Download do presente implementar');
  };

  /**
   * Renderiza o layout baseado no tema
   */
  const renderGiftLayout = () => {
    if (!giftData) return null;

    const layoutProps = {
      giftData,
      onUpdate: handleGiftUpdate
    };

    switch (giftData.theme) {
      case 'couple':
        return <CoupleGiftLayout {...layoutProps} />;
      case 'birthday':
        return <BirthdayGiftLayout {...layoutProps} />;
      case 'corporate':
        return <CorporateGiftLayout {...layoutProps} />;
      default:
        return <CoupleGiftLayout {...layoutProps} />;
    }
  };

  /**
   * Configurações do tema para o header
   */
  const getThemeConfig = (theme: ThemeType) => {
    switch (theme) {
      case 'couple':
        return {
          title: 'Declaração de Amor',
          gradient: 'bg-gradient-primary',
          color: 'text-primary'
        };
      case 'birthday':
        return {
          title: 'Presente de Aniversário',
          gradient: 'bg-gradient-hero',
          color: 'text-secondary'
        };
      case 'corporate':
        return {
          title: 'Presente Empresarial',
          gradient: 'bg-gradient-card',
          color: 'text-foreground'
        };
      default:
        return {
          title: 'Presente Digital',
          gradient: 'bg-gradient-primary',
          color: 'text-primary'
        };
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <FloatingHearts />
        <div className="text-center relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-6 animate-glow flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Criando seu presente especial...
          </h2>
          <p className="text-muted-foreground animate-pulse">
            Preparando uma experiência única e emocionante
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!giftData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Presente não encontrado
          </h2>
          <Button onClick={handleGoBack}>
            Criar Novo Presente
          </Button>
        </div>
      </div>
    );
  }

  const themeConfig = getThemeConfig(giftData.theme);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      
      {/* Header com controles */}
      <header className="relative z-20 p-4 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Navegação */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              className="flex items-center gap-2 text-foreground hover:text-primary"
            >
              <ArrowLeft size={20} />
              Voltar
            </Button>
            
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold ${themeConfig.gradient} bg-clip-text text-transparent`}>
                {themeConfig.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Para {giftData.recipientName}
              </p>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-2">
            {!showQR && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="hidden sm:flex items-center gap-2"
              >
                <Edit3 size={16} />
                {isEditing ? 'Finalizar' : 'Personalizar'}
              </Button>
            )}
            
            {!showQR ? (
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowQR(true)}
                className="bg-gradient-primary hover:opacity-90 flex items-center gap-2 shadow-love animate-glow"
              >
                <QrCode size={16} />
                <span className="hidden sm:inline">Gerar QR Code</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQR(false)}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Ver Presente</span>
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">Compartilhar</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Salvar</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="relative z-10">
        {showQR ? (
          /* Página do QR Code em tela cheia */
          <QRCodeGenerator giftData={giftData} />
        ) : (
          <div className="max-w-7xl mx-auto p-4">
            <div className={`grid ${isEditing ? 'lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
              
              {/* Painel de personalização (apenas quando editando) */}
              {isEditing && (
                <div className="lg:col-span-1">
                  <GiftCustomizer
                    giftData={giftData}
                    onUpdate={handleGiftUpdate}
                  />
                </div>
              )}

              {/* Área do presente - Preview completo quando não editando */}
              <div className={`${isEditing ? 'lg:col-span-3' : 'col-span-1'}`}>
                <div className="relative">
                  {renderGiftLayout()}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

    </div>
  );
};

export default GiftPreview;