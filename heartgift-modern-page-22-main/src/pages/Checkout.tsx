import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, CheckCircle, Gift, Crown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GiftData } from './CreateGift';
import FloatingHearts from '@/components/FloatingHearts';
import { saveGiftToFirebase, processMercadoPagoPayment, FirebaseGiftData } from '@/services/firebase';

/**
 * Interface para dados de pagamento
 */
interface PaymentData {
  plan: 'basico' | 'premium' | 'deluxe';
  price: number;
  giftData: GiftData;
  paymentId?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

/**
 * Interface para dados do presente final
 */
interface FinalGiftData extends GiftData {
  id: string;
  qrCode: string;
  createdAt: Date;
  paymentStatus: 'pending' | 'approved' | 'rejected';
  paymentId?: string;
}

/**
 * Página de checkout com integração ao Mercado Pago
 */
const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [finalGiftData, setFinalGiftData] = useState<FirebaseGiftData | null>(null);

  /**
   * Carrega dados do presente da navegação
   */
  useEffect(() => {
    if (location.state?.giftData) {
      const giftData = location.state.giftData as GiftData;
      const plan = location.state.plan || 'premium';
      
      const prices = {
        basico: 9.90,
        premium: 19.90,
        deluxe: 39.90
      };

      setPaymentData({
        plan,
        price: prices[plan],
        giftData
      });
    } else {
      navigate('/criar-presente');
    }
  }, [location.state, navigate]);

  /**
   * Processa pagamento com Mercado Pago
   */
  const handlePayment = async () => {
    if (!paymentData) return;

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Processa pagamento com Mercado Pago
      const paymentResult = await processMercadoPagoPayment(paymentData);
      
      if (paymentResult.status === 'approved') {
        // Salva presente no Firebase
        const savedGift = await saveGiftToFirebase({
          ...paymentData.giftData,
          paymentId: paymentResult.id,
          paymentStatus: 'approved'
        });

        setFinalGiftData(savedGift);
        setPaymentStatus('success');
      } else {
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };


  /**
   * Navega de volta para criação
   */
  const handleGoBack = () => {
    navigate('/criar-presente', { 
      state: { 
        giftData: paymentData?.giftData,
        continueEditing: true 
      } 
    });
  };

  /**
   * Navega para o presente final
   */
  const handleViewGift = () => {
    if (finalGiftData) {
      navigate('/preview-presente', { 
        state: { 
          giftData: finalGiftData,
          showQR: true 
        } 
      });
    }
  };

  /**
   * Configurações dos planos
   */
  const getPlanConfig = (plan: string) => {
    const configs = {
      basico: {
        name: 'Plano Básico',
        icon: Heart,
        color: 'text-blue-600',
        features: ['Até 5 fotos', 'Integração com Spotify', 'Cores personalizadas', 'QR Code incluído'],
        description: 'Perfeito para presentes simples e especiais'
      },
      premium: {
        name: 'Plano Premium',
        icon: Crown,
        color: 'text-purple-600',
        features: ['Fotos ilimitadas', 'Todos os efeitos visuais', 'Animações especiais', 'Suporte prioritário'],
        description: 'A escolha ideal para presentes únicos'
      },
      deluxe: {
        name: 'Plano Deluxe',
        icon: Crown,
        color: 'text-gold-600',
        features: ['Tudo do Premium', 'Domínio personalizado', 'Design exclusivo', 'Backup em nuvem'],
        description: 'A experiência mais exclusiva e personalizada'
      }
    };
    return configs[plan as keyof typeof configs] || configs.premium;
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando dados do presente...</p>
        </div>
      </div>
    );
  }

  const planConfig = getPlanConfig(paymentData.plan);

  return (
    <div className="min-h-screen relative bg-background">
      <FloatingHearts />
      
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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
              Finalizar Compra
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete seu pedido e libere seu presente especial
            </p>
          </div>

          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          
          {paymentStatus === 'success' && finalGiftData ? (
            /* Tela de sucesso */
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Pagamento Aprovado! 🎉
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Seu presente especial foi criado e está pronto para ser compartilhado!
              </p>

              <div className="space-y-4">
                <Button
                  onClick={handleViewGift}
                  className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-3"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Ver Meu Presente
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  ID do presente: {finalGiftData.id}
                </p>
              </div>
            </div>
          ) : (
            /* Formulário de checkout */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Resumo do pedido */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Resumo do Pedido</h3>
                  
                  {/* Plano selecionado */}
                  <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center`}>
                      <planConfig.icon className={`w-6 h-6 ${planConfig.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{planConfig.name}</h4>
                      <p className="text-sm text-muted-foreground">{planConfig.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">R$ {paymentData.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">uma vez</p>
                    </div>
                  </div>

                  {/* Recursos do plano */}
                  <div className="space-y-3 mt-6">
                    <h5 className="font-medium text-foreground">Incluído no seu plano:</h5>
                    <ul className="space-y-2">
                      {planConfig.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

                {/* Informações de segurança */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-foreground">Pagamento Seguro</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Seus dados são protegidos com criptografia de ponta a ponta. 
                    Processamos pagamentos através do Mercado Pago, garantindo máxima segurança.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>🔒 SSL</span>
                    <span>🛡️ PCI DSS</span>
                    <span>✅ Mercado Pago</span>
                  </div>
                </Card>
              </div>

              {/* Formulário de pagamento */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Dados de Pagamento</h3>
                  
                  <div className="space-y-4">
                    {/* Simulação de formulário de pagamento */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background/50 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Nome no cartão</label>
                      <input
                        type="text"
                        placeholder="Nome como está no cartão"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background/50 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Número do cartão</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-border rounded-md bg-background/50 focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-border rounded-md bg-background/50 focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Mês</label>
                        <select className="w-full px-3 py-2 border border-border rounded-md bg-background/50 focus:border-primary focus:outline-none">
                          <option>01</option>
                          <option>02</option>
                          <option>03</option>
                          <option>04</option>
                          <option>05</option>
                          <option>06</option>
                          <option>07</option>
                          <option>08</option>
                          <option>09</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Ano</label>
                        <select className="w-full px-3 py-2 border border-border rounded-md bg-background/50 focus:border-primary focus:outline-none">
                          <option>2024</option>
                          <option>2025</option>
                          <option>2026</option>
                          <option>2027</option>
                          <option>2028</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Botão de pagamento */}
                  <div className="mt-8 space-y-4">
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-gradient-primary hover:opacity-90 text-lg py-3"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Pagar R$ {paymentData.price.toFixed(2)}
                        </>
                      )}
                    </Button>

                    {paymentStatus === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">
                          Erro no processamento do pagamento. Tente novamente.
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground text-center">
                      Ao finalizar a compra, você concorda com nossos termos de uso e política de privacidade.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
