import { useState } from 'react';
import { QrCode, Download, Share2, Sparkles, Heart, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FloatingHearts from '@/components/FloatingHearts';

/**
 * Interface para props do QRCodeGenerator
 */
interface QRCodeGeneratorProps {
  giftData: any;
}

/**
 * Gerador de QR Code para presentes digitais
 * 
 * Este componente cria um QR Code que leva para uma página de visualização
 * final do presente, sem opções de edição, criando uma experiência imersiva
 * para quem recebe o presente através do código.
 * 
 * Funcionalidades principais:
 * - Gera QR Code para URL de visualização final
 * - Permite download do QR Code como imagem
 * - Compartilhamento nativo do presente
 * - Design responsivo e moderno
 * - Salva dados do presente para acesso posterior
 */
const QRCodeGenerator = ({ giftData }: QRCodeGeneratorProps) => {
  // Gera ID único para o presente se não existir
  const giftId = giftData.id || `gift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Salva os dados do presente no localStorage para acesso posterior via QR code
  useState(() => {
    try {
      const dataToStore = {
        ...giftData,
        id: giftId,
        createdAt: new Date().toISOString(),
        accessCount: 0
      };
      localStorage.setItem(`gift_${giftId}`, JSON.stringify(dataToStore));
      console.log(`💾 Dados do presente salvos com ID: ${giftId}`);
    } catch (error) {
      console.error('❌ Erro ao salvar dados do presente:', error);
    }
  });

  // URL final que será acessada através do QR Code
  const finalGiftUrl = `${window.location.origin}/presente/${giftId}`;
  
  // URLs para diferentes tamanhos de QR Code
  const qrCodeUrls = {
    small: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&format=png&margin=10&data=${encodeURIComponent(finalGiftUrl)}`,
    medium: `https://api.qrserver.com/v1/create-qr-code/?size=400x400&format=png&margin=10&data=${encodeURIComponent(finalGiftUrl)}`,
    large: `https://api.qrserver.com/v1/create-qr-code/?size=600x600&format=png&margin=15&data=${encodeURIComponent(finalGiftUrl)}`,
  };
  
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isDownloading, setIsDownloading] = useState(false);

  /**
   * Faz o download do QR Code como imagem PNG
   * Inclui o nome do destinatário no arquivo para personalização
   */
  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      // Fetch da imagem do QR Code
      const response = await fetch(qrCodeUrls[selectedSize]);
      const blob = await response.blob();
      
      // Cria URL temporária para download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Nome do arquivo personalizado
      const fileName = `presente-${giftData.recipientName || 'especial'}-${giftId}.png`;
      
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // Limpeza
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log(`✅ QR Code baixado: ${fileName}`);
    } catch (error) {
      console.error('❌ Erro ao baixar QR Code:', error);
      alert('Erro ao baixar o QR Code. Tente novamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Compartilha o presente usando a API nativa de compartilhamento
   * Inclui a URL final que será acessada via QR Code
   */
  const handleShare = async () => {
    const shareData = {
      title: `🎁 Presente especial de ${giftData.senderName}`,
      text: `${giftData.senderName} criou um presente digital especial para ${giftData.recipientName}! Clique para ver a surpresa 💕`,
      url: finalGiftUrl,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        console.log('✅ Presente compartilhado com sucesso');
      } else {
        // Fallback: copiar para área de transferência
        await navigator.clipboard.writeText(finalGiftUrl);
        alert('🔗 Link do presente copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('❌ Erro ao compartilhar:', error);
      // Fallback manual em caso de erro
      try {
        await navigator.clipboard.writeText(finalGiftUrl);
        alert('🔗 Link do presente copiado para a área de transferência!');
      } catch (clipboardError) {
        console.error('❌ Erro ao copiar para área de transferência:', clipboardError);
      }
    }
  };

  /**
   * Copia o link direto do presente para a área de transferência
   */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(finalGiftUrl);
      
      // Feedback visual temporário
      const button = document.querySelector('[data-copy-btn]') as HTMLElement;
      if (button) {
        const originalText = button.textContent;
        button.textContent = '✅ Copiado!';
        setTimeout(() => {
          if (button.textContent === '✅ Copiado!') {
            button.textContent = originalText;
          }
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Erro ao copiar link:', error);
      alert('Erro ao copiar link. Tente novamente.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden p-4">
      <FloatingHearts />
      
      <Card className="relative z-10 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-glow animate-fade-in border-0">
        
        {/* Header com animação aprimorada */}
        <div className="mb-10">
          <div className="relative mb-8">
            {/* Ícone principal com efeitos */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center animate-glow mb-6 relative overflow-hidden">
                <QrCode className="w-12 h-12 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
              
              {/* Elementos decorativos flutuantes */}
              <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-primary animate-pulse" />
              <Heart className="absolute -bottom-2 -left-2 w-6 h-6 text-accent animate-bounce" fill="currentColor" />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-secondary/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/4 -left-6 w-3 h-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          {/* Títulos principais */}
          <div className="space-y-4 mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              🎉 Presente Finalizado!
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md mx-auto">
              Seu presente digital está pronto para ser compartilhado e causar uma surpresa emocionante
            </p>
          </div>
          
          {/* Card de informações do presente */}
          {giftData.recipientName && giftData.senderName && (
            <div className="mt-6 p-6 bg-gradient-card rounded-2xl border border-border/30 backdrop-blur-sm">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Presente criado por</p>
                <div className="flex items-center justify-center gap-4 text-lg">
                  <span className="font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
                    {giftData.senderName}
                  </span>
                  <div className="flex items-center gap-2 text-accent">
                    <Heart size={16} fill="currentColor" />
                    <span>→</span>
                    <Heart size={16} fill="currentColor" />
                  </div>
                  <span className="font-bold text-accent bg-accent/10 px-4 py-2 rounded-lg">
                    {giftData.recipientName}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ID do presente: <code className="bg-muted/50 px-2 py-1 rounded text-xs">{giftId}</code>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Seletor de tamanho do QR Code */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-foreground mb-3 block">
            Tamanho do QR Code
          </Label>
          <div className="flex justify-center gap-2">
            {[
              { size: 'small' as const, label: 'Pequeno', dimensions: '300x300' },
              { size: 'medium' as const, label: 'Médio', dimensions: '400x400' },
              { size: 'large' as const, label: 'Grande', dimensions: '600x600' },
            ].map((option) => (
              <Button
                key={option.size}
                variant={selectedSize === option.size ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSize(option.size)}
                className={`text-xs ${selectedSize === option.size ? 'bg-primary text-primary-foreground' : ''}`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* QR Code com design premium */}
        <div className="mb-8">
          <div className="relative inline-block group">
            {/* Efeito de brilho de fundo */}
            <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-2xl opacity-20 animate-glow group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Container do QR Code */}
            <div className="relative p-8 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl border border-gray-100 transform transition-transform duration-300 hover:scale-105">
              {/* QR Code */}
              <img 
                src={qrCodeUrls[selectedSize]} 
                alt="QR Code do presente digital" 
                className="mx-auto rounded-2xl shadow-lg transition-transform duration-300"
                loading="lazy"
              />
              
              {/* Overlay com logo/marca */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart size={24} className="text-primary" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Instruções e link direto */}
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              📱 <strong>Escaneie com a câmera</strong> do celular ou clique no link abaixo
            </p>
            
            {/* Campo com link direto */}
            <div className="max-w-md mx-auto">
              <Label className="text-xs text-muted-foreground mb-2 block">Link direto do presente</Label>
              <div className="flex gap-2">
                <Input
                  value={finalGiftUrl}
                  readOnly
                  className="text-xs bg-muted/30 border-border/50 font-mono"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  data-copy-btn
                  className="flex-shrink-0"
                >
                  <LinkIcon size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Botões principais com design premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            variant="outline"
            size="lg"
            className="
              flex items-center gap-3 hover:bg-primary/10 transition-all duration-300 hover:scale-105
              border-2 border-border/50 hover:border-primary/50 shadow-lg hover:shadow-xl
              bg-background/50 backdrop-blur-sm
            "
          >
            <Download className={`w-5 h-5 ${isDownloading ? 'animate-spin' : ''}`} />
            {isDownloading ? 'Baixando...' : 'Baixar QR Code'}
          </Button>
          
          <Button 
            onClick={handleShare} 
            size="lg"
            className="
              bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-105 
              shadow-love hover:shadow-glow text-white font-semibold
            "
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar Presente
          </Button>
        </div>
        
        {/* Dicas e informações adicionais */}
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl border border-blue-200/30 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div className="space-y-2 text-left">
                <h4 className="text-sm font-semibold text-foreground">Dicas importantes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Salve o QR Code em sua galeria para compartilhar facilmente</li>
                  <li>• O presente ficará disponível permanentemente no link</li>
                  <li>• Funciona em qualquer dispositivo com câmera</li>
                  <li>• Você pode imprimir o QR Code para presentes físicos</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50/50 rounded-xl border border-green-200/30">
            <p className="text-sm text-green-700 flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span><strong>Presente salvo com sucesso!</strong> Agora você pode compartilhar quando quiser.</span>
            </p>
          </div>
        </div>
        
      </Card>
    </div>
  );
};

export default QRCodeGenerator;