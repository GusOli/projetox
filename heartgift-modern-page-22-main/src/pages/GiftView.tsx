import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Share2, Download, Home, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CoupleGiftLayout from '@/components/gift-layouts/CoupleGiftLayout';
import BirthdayGiftLayout from '@/components/gift-layouts/BirthdayGiftLayout';
import CorporateGiftLayout from '@/components/gift-layouts/CorporateGiftLayout';
import FloatingHearts from '@/components/FloatingHearts';
import { getGiftById, FirebaseGiftData } from '@/services/firebase';

/**
 * Interface para dados do presente recebidos via QR code
 * Esta interface define todos os campos necessários para exibir um presente digital completo
 */
interface GiftViewData {
  id?: string;
  theme: 'couple' | 'birthday' | 'corporate';
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
  customElements?: any[];
}

/**
 * Página de visualização final do presente digital via QR Code
 * 
 * Esta página é especificamente projetada para ser acessada através de QR codes
 * e exibe o presente de forma imersiva e sem opções de edição, criando uma
 * experiência pura de recebimento do presente digital.
 * 
 * Características principais:
 * - Visualização em tela cheia
 * - Sem controles de edição
 * - Interface otimizada para mobile
 * - Carregamento suave com animações
 * - Botões de compartilhamento e download discretos
 */
const GiftView = () => {
  // Hooks de navegação e roteamento
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Estados para gerenciar os dados e interface
  const [giftData, setGiftData] = useState<GiftViewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [hasError, setHasError] = useState(false);

  /**
   * Efeito para carregar os dados do presente
   * 
   * Tenta carregar os dados de várias fontes:
   * 1. Estado da navegação (quando vem do preview)
   * 2. Firebase usando ID (dados do QR code)
   * 3. localStorage (dados salvos localmente)
   * 4. URL params decodificados (dados do QR code)
   * 5. Dados de exemplo como fallback
   */
  useEffect(() => {
    const loadGiftData = async () => {
      try {
        let data: GiftViewData | null = null;

        // Primeira tentativa: dados do estado da navegação
        if (location.state?.giftData) {
          data = location.state.giftData as GiftViewData;
          console.log('📦 Dados carregados do estado da navegação');
        }
        // Segunda tentativa: Firebase usando ID (para QR codes)
        else if (id) {
          try {
            const firebaseData = await getGiftById(id);
            if (firebaseData) {
              data = {
                id: firebaseData.id,
                theme: firebaseData.theme as 'couple' | 'birthday' | 'corporate',
                recipientName: firebaseData.recipientName,
                senderName: firebaseData.senderName,
                message: firebaseData.message,
                specialDate: firebaseData.specialDate,
                backgroundColor: firebaseData.backgroundColor,
                textColor: firebaseData.textColor,
                photos: firebaseData.photos ? firebaseData.photos.map(url => ({ url } as any)) : [],
                customizationData: firebaseData.customizationData,
                spotifyTrack: firebaseData.spotifyTrack
              } as GiftViewData;
              console.log('📦 Dados carregados do Firebase');
            }
          } catch (firebaseError) {
            console.log('📦 Erro ao carregar do Firebase, tentando localStorage:', firebaseError);
          }
        }
        
        // Terceira tentativa: localStorage usando ID
        if (!data && id) {
          const storedData = localStorage.getItem(`gift_${id}`);
          if (storedData) {
            data = JSON.parse(storedData) as GiftViewData;
            console.log('📦 Dados carregados do localStorage');
          }
        }
        
        // Quarta tentativa: dados codificados na URL (para QR codes)
        if (!data) {
          const urlParams = new URLSearchParams(window.location.search);
          const encodedData = urlParams.get('data');
          if (encodedData) {
            data = JSON.parse(decodeURIComponent(encodedData)) as GiftViewData;
            console.log('📦 Dados carregados da URL');
          }
        }

        // Fallback: dados de exemplo para demonstração
        if (!data) {
          console.log('📦 Usando dados de exemplo (fallback)');
          data = {
            id: id || 'demo',
            theme: 'couple',
            recipientName: 'Maria',
            senderName: 'João',
            message: 'Meu amor, cada momento ao seu lado é um presente especial. Você ilumina meus dias e torna tudo mais bonito. Te amo infinitamente! 💕',
            specialDate: '2024-12-25',
            backgroundColor: '#ff6b9d',
            textColor: '#ffffff',
            selectedFrame: 'romantic',
            textStyle: 'romantic',
            photos: [],
          };
        }

        // Simula carregamento para uma melhor experiência do usuário
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setGiftData(data);
        setHasError(false);
      } catch (error) {
        console.error('❌ Erro ao carregar dados do presente:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadGiftData();
  }, [id, location.state]);

  /**
   * Efeito para mostrar controles após um tempo
   * Permite uma visualização imersiva inicial, depois mostra os controles
   */
  useEffect(() => {
    if (!isLoading && giftData) {
      const timer = setTimeout(() => {
        setShowControls(true);
      }, 3000); // Mostra controles após 3 segundos

      return () => clearTimeout(timer);
    }
  }, [isLoading, giftData]);

  /**
   * Compartilha o presente usando a API nativa de compartilhamento
   * Inclui fallback para copiar URL quando API não está disponível
   */
  const handleShare = async () => {
    const shareData = {
      title: `Presente especial de ${giftData?.senderName || 'alguém especial'}`,
      text: `${giftData?.senderName || 'Alguém especial'} criou um presente digital para ${giftData?.recipientName || 'você'}! 🎁💕`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        console.log('✅ Presente compartilhado com sucesso');
      } else {
        // Fallback: copiar para área de transferência
        await navigator.clipboard.writeText(window.location.href);
        
        // Feedback visual temporário
        const button = document.querySelector('[data-share-btn]') as HTMLElement;
        if (button) {
          const originalText = button.textContent;
          button.textContent = '✅ Link copiado!';
          setTimeout(() => {
            button.textContent = originalText;
          }, 2000);
        }
      }
    } catch (error) {
      console.error('❌ Erro ao compartilhar:', error);
      
      // Fallback manual
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('🔗 Link copiado para a área de transferência!');
      } catch (clipboardError) {
        console.error('❌ Erro ao copiar para área de transferência:', clipboardError);
      }
    }
  };

  /**
   * Baixa o presente como uma imagem ou PDF
   * Implementação futura: captura de tela do presente
   */
  const handleDownload = async () => {
    try {
      console.log('💾 Iniciando download do presente...');
      
      // TODO: Implementar captura de tela usando html2canvas ou similar
      // Por enquanto, mostra mensagem informativa
      alert('🚧 Funcionalidade de download em desenvolvimento!\n\nEm breve você poderá baixar seu presente como imagem ou PDF.');
      
    } catch (error) {
      console.error('❌ Erro ao fazer download:', error);
      alert('❌ Erro ao fazer download. Tente novamente.');
    }
  };

  /**
   * Navega para a página inicial do site
   */
  const handleGoHome = () => {
    navigate('/');
  };

  /**
   * Renderiza o layout apropriado baseado no tema do presente
   * 
   * @returns JSX.Element - Componente de layout específico do tema
   */
  const renderGiftLayout = () => {
    if (!giftData) return null;

    // Props compartilhados para todos os layouts
    const layoutProps = {
      giftData,
      onUpdate: () => {}, // Não permite edição nesta visualização
    };

    // Seleciona o layout baseado no tema
    switch (giftData.theme) {
      case 'couple':
        return <CoupleGiftLayout {...layoutProps} />;
      case 'birthday':
        return <BirthdayGiftLayout {...layoutProps} />;
      case 'corporate':
        return <CorporateGiftLayout {...layoutProps} />;
      default:
        console.warn(`⚠️ Tema desconhecido: ${giftData.theme}. Usando layout de casal como fallback.`);
        return <CoupleGiftLayout {...layoutProps} />;
    }
  };

  /**
   * Obtém configurações visuais baseadas no tema
   * 
   * @param theme - Tema do presente
   * @returns Objeto com configurações de título, gradiente e cor
   */
  const getThemeConfig = (theme: string) => {
    const configs = {
      couple: {
        title: 'Declaração de Amor',
        gradient: 'bg-gradient-primary',
        color: 'text-primary',
        icon: Heart,
        bgEffect: 'hearts'
      },
      birthday: {
        title: 'Presente de Aniversário',
        gradient: 'bg-gradient-hero',
        color: 'text-secondary',
        icon: Sparkles,
        bgEffect: 'confetti'
      },
      corporate: {
        title: 'Presente Empresarial',
        gradient: 'bg-gradient-card',
        color: 'text-foreground',
        icon: Heart,
        bgEffect: 'particles'
      },
    };

    return configs[theme as keyof typeof configs] || configs.couple;
  };

  // Tela de carregamento com animação suave
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <FloatingHearts />
        
        <div className="text-center relative z-10 max-w-md mx-auto px-6">
          {/* Ícone de carregamento animado */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto animate-glow flex items-center justify-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white/20 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          
          {/* Texto de carregamento */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              ✨ Preparando sua surpresa...
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Criando uma experiência mágica e inesquecível especialmente para você
            </p>
          </div>
          
          {/* Indicador de progresso animado */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-primary rounded-full animate-bounce"
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de erro com opção de voltar ao início
  if (hasError || !giftData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <FloatingHearts />
        
        <Card className="p-8 sm:p-12 max-w-md mx-4 text-center relative z-10 border border-destructive/20 bg-destructive/5">
          <div className="space-y-6">
            {/* Ícone de erro */}
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <div className="text-3xl">😔</div>
            </div>
            
            {/* Mensagem de erro */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Ops! Presente não encontrado
              </h2>
              <p className="text-muted-foreground">
                Não conseguimos carregar este presente. O link pode estar expirado ou incorreto.
              </p>
            </div>
            
            {/* Botão para ir ao início */}
            <Button 
              onClick={handleGoHome}
              className="bg-gradient-primary hover:opacity-90 shadow-love"
              size="lg"
            >
              <Home size={20} className="mr-2" />
              Ir para o Início
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const themeConfig = getThemeConfig(giftData.theme);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Efeitos de fundo baseados no tema */}
      <FloatingHearts />
      
      {/* Controles flutuantes discretos */}
      <div className={`
        fixed top-6 right-6 z-50 transition-all duration-500 ease-out
        ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}>
        <div className="flex flex-col gap-3">
          {/* Botão de compartilhar */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            data-share-btn
            className="
              bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/20 
              shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
              text-foreground hover:text-accent
            "
          >
            <Share2 size={16} className="sm:mr-2" />
            <span className="hidden sm:inline">Compartilhar</span>
          </Button>
          
          {/* Botão de download */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="
              bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary/20 
              shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
              text-foreground hover:text-primary
            "
          >
            <Download size={16} className="sm:mr-2" />
            <span className="hidden sm:inline">Salvar</span>
          </Button>
          
          {/* Botão home (discreto) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoHome}
            className="
              bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-foreground
              opacity-70 hover:opacity-100 transition-all duration-300
            "
          >
            <Home size={16} />
          </Button>
        </div>
      </div>

      {/* Indicador de toque para mostrar controles (mobile) */}
      {!showControls && (
        <div 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animate-bounce sm:hidden"
          onClick={() => setShowControls(true)}
        >
          <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border/30">
            <p className="text-xs text-muted-foreground">Toque para ver opções</p>
          </div>
        </div>
      )}

      {/* Conteúdo principal - Layout do presente */}
      <main className="relative z-10">
        {renderGiftLayout()}
      </main>

      {/* Meta tags dinâmicas para compartilhamento */}
      <div className="hidden">
        <meta property="og:title" content={`Presente de ${giftData.senderName} para ${giftData.recipientName}`} />
        <meta property="og:description" content={giftData.message.substring(0, 160)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Presente especial de ${giftData.senderName}`} />
        <meta name="twitter:description" content={`${giftData.senderName} criou um presente digital especial para ${giftData.recipientName}! 🎁💕`} />
      </div>
    </div>
  );
};

export default GiftView;