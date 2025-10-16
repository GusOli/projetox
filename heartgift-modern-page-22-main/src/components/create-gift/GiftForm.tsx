import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Palette, User, Heart, MessageSquare, Upload, QrCode, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { usePlan } from '@/contexts/PlanContext';
import { ThemeType, GiftData } from '@/pages/CreateGift';
import SpotifyMusicSelector from './SpotifyMusicSelector';
import GiftCustomizer from './GiftCustomizer';
import CountdownPreview from './CountdownPreview';

/**
 * Interface para configuração do tema
 */
interface ThemeConfig {
  title: string;
  description: string;
  gradient: string;
  color: string;
}

/**
 * Props do componente GiftForm
 */
interface GiftFormProps {
  theme: ThemeType;
  themeConfig: ThemeConfig;
  initialData?: GiftData | null;
  onComplete: (data: GiftData) => void;
}

/**
 * Formulário para personalização do presente digital
 * Permite configurar todos os aspectos visuais e funcionais do presente
 */
const GiftForm = ({ theme, themeConfig, initialData, onComplete }: GiftFormProps) => {
  const navigate = useNavigate();
  const { selectedPlan, isPlanFeatureAllowed, getPlanFeatures } = usePlan();
  const photosInputRef = useRef<HTMLInputElement>(null);
  
  // Estado do formulário
  const [formData, setFormData] = useState<Partial<GiftData>>({
    theme: initialData?.theme || theme,
    recipientName: initialData?.recipientName || '',
    senderName: initialData?.senderName || '',
    message: initialData?.message || '',
    specialDate: initialData?.specialDate || '',
    backgroundColor: initialData?.backgroundColor || (theme === 'couple' ? '#ff6b9d' : theme === 'birthday' ? '#4ecdc4' : '#6366f1'),
    textColor: initialData?.textColor || '#ffffff'
  });

  const [selectedSpotifyTrack, setSelectedSpotifyTrack] = useState<any>(initialData?.spotifyTrack || null);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>(initialData?.photos || []);
  const [photoUrls, setPhotoUrls] = useState<string[]>(initialData?.photoUrls || []);
  const [showCustomizer, setShowCustomizer] = useState(true); // Personalização automática
  const [customizationData, setCustomizationData] = useState<any>(initialData?.customizationData || {});

  const planFeatures = getPlanFeatures(selectedPlan);

  /**
   * Atualiza os dados do formulário
   */
  const updateFormData = (field: keyof GiftData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Manipula o upload de fotos
   */
  const handlePhotosUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Verifica limite do plano
    const maxPhotos = planFeatures.maxPhotos;
    if (maxPhotos !== -1 && uploadedPhotos.length + files.length > maxPhotos) {
      alert(`Seu plano permite até ${maxPhotos} fotos. Faça upgrade para adicionar mais.`);
      return;
    }

    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Cria URLs para preview
    const newPhotoUrls = imageFiles.map(file => URL.createObjectURL(file));
    
    setUploadedPhotos(prev => [...prev, ...imageFiles]);
    setPhotoUrls(prev => [...prev, ...newPhotoUrls]);
  };

  /**
   * Remove foto da lista
   */
  const removePhoto = (index: number) => {
    // Revoga a URL para liberar memória
    if (photoUrls[index]) {
      URL.revokeObjectURL(photoUrls[index]);
    }
    
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoUrls(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Gera QR Code do presente
   */
  const generateQRCode = () => {
    if (!formData.recipientName || !formData.senderName || !formData.message) {
      alert('Preencha todos os campos obrigatórios antes de gerar o QR Code.');
      return;
    }

    // Navega para o checkout
    const finalGiftData = {
      ...formData,
      spotifyTrack: selectedSpotifyTrack,
      photos: uploadedPhotos,
      photoUrls: photoUrls,
      customizationData: customizationData,
      isFinalized: true
    };

    navigate('/checkout', { 
      state: { 
        giftData: finalGiftData,
        plan: selectedPlan
      }
    });
  };

  /**
   * Valida e envia o formulário
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.recipientName || !formData.senderName || !formData.message || !formData.specialDate) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Navega para a página de preview com os dados
    const finalGiftData = {
      ...formData,
      spotifyTrack: selectedSpotifyTrack,
      photos: uploadedPhotos,
      photoUrls: photoUrls,
      customizationData: customizationData
    };

    navigate('/preview-presente', { 
      state: { giftData: finalGiftData }
    });
  };

  /**
   * Mensagens placeholder baseadas no tema
   */
  const getPlaceholderMessage = () => {
    switch (theme) {
      case 'couple':
        return 'Meu amor, cada dia ao seu lado é um presente especial...';
      case 'birthday':
        return 'Parabéns! Que este novo ano seja repleto de alegrias e conquistas...';
      case 'corporate':
        return 'Agradecemos sua confiança e parceria. Que este presente simbolize...';
      default:
        return 'Escreva sua mensagem especial aqui...';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Formulário de personalização */}
        <Card className="p-8 xl:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2 animate-fade-in">
              Personalize seu {themeConfig.title}
            </h2>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Preencha os detalhes para criar uma experiência única
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Nome do destinatário */}
            <div className="space-y-2">
              <Label htmlFor="recipient" className="flex items-center gap-2 text-foreground">
                <User className="w-4 h-4 text-primary" />
                Para quem é o presente? *
              </Label>
              <Input
                id="recipient"
                placeholder="Nome do destinatário"
                value={formData.recipientName || ''}
                onChange={(e) => updateFormData('recipientName', e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Nome do remetente */}
            <div className="space-y-2">
              <Label htmlFor="sender" className="flex items-center gap-2 text-foreground">
                <Heart className="w-4 h-4 text-primary" />
                Seu nome *
              </Label>
              <Input
                id="sender"
                placeholder="Seu nome"
                value={formData.senderName || ''}
                onChange={(e) => updateFormData('senderName', e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Data especial */}
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                Data especial *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.specialDate || ''}
                onChange={(e) => updateFormData('specialDate', e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Mensagem personalizada */}
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2 text-foreground">
                <MessageSquare className="w-4 h-4 text-primary" />
                Mensagem especial *
              </Label>
              <Textarea
                id="message"
                placeholder={getPlaceholderMessage()}
                value={formData.message || ''}
                onChange={(e) => updateFormData('message', e.target.value)}
                rows={4}
                className="bg-background/50 border-border/50 focus:border-primary resize-none"
              />
            </div>

            {/* Integração Spotify */}
            <SpotifyMusicSelector
              onMusicSelect={setSelectedSpotifyTrack}
              selectedTrack={selectedSpotifyTrack}
              theme={theme}
            />

            {/* Upload de fotos */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Upload className="w-4 h-4 text-primary" />
                Fotos especiais
                {planFeatures.maxPhotos !== -1 && (
                  <span className="text-xs text-muted-foreground">
                    (até {planFeatures.maxPhotos} fotos)
                  </span>
                )}
              </Label>
              
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => photosInputRef.current?.click()}
                  className="flex items-center gap-2 w-full"
                >
                  <Upload className="w-4 h-4" />
                  Adicionar Fotos
                </Button>
                
                {photoUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {photoUrls.map((photoUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photoUrl}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <input
                ref={photosInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotosUpload}
                className="hidden"
              />
            </div>

            {/* Cores personalizadas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <Palette className="w-4 h-4 text-primary" />
                  Cor de fundo
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.backgroundColor || '#ff6b9d'}
                    onChange={(e) => updateFormData('backgroundColor', e.target.value)}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <Input
                    value={formData.backgroundColor || '#ff6b9d'}
                    onChange={(e) => updateFormData('backgroundColor', e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <Palette className="w-4 h-4 text-primary" />
                  Cor do texto
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.textColor || '#ffffff'}
                    onChange={(e) => updateFormData('textColor', e.target.value)}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <Input
                    value={formData.textColor || '#ffffff'}
                    onChange={(e) => updateFormData('textColor', e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>
            </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="submit"
            className="flex-1 bg-gradient-primary hover:opacity-90 flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            Ver Preview Final
          </Button>
          <Button
            type="button"
            onClick={generateQRCode}
            variant="outline"
            className="flex-1 flex items-center gap-2 hover:bg-primary/10 transition-all duration-200 hover:scale-105"
          >
            <QrCode className="w-4 h-4" />
            Gerar QR Code
          </Button>
        </div>

          </form>
        </Card>

        {/* Painel de personalização e preview */}
        <div className="space-y-6 xl:col-span-1">
          
          {/* Personalização (aberto por padrão) */}
          {showCustomizer && (
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <GiftCustomizer
                giftData={{...formData, ...customizationData}}
                onUpdate={(updates) => {
                  setCustomizationData(updates);
                  setFormData(prev => ({ 
                    ...prev, 
                    backgroundColor: updates.backgroundColor || prev.backgroundColor, 
                    textColor: updates.textColor || prev.textColor 
                  }));
                }}
              />
            </div>
          )}

          {/* Preview em tempo real */}
          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold text-foreground mb-4">Preview do Presente</h3>
            <div
              className="rounded-lg p-6 min-h-[400px] flex flex-col justify-center items-center text-center transition-all duration-300 relative overflow-hidden"
              style={{
                // Fundo
                backgroundColor: customizationData.backgroundType === 'gradient' 
                  ? `linear-gradient(${customizationData.gradientDirection || '135deg'}, ${(customizationData.gradientColors || ['#ff6b9d', '#ff8fab']).join(', ')})`
                  : formData.backgroundColor,
                color: formData.textColor,
                
                // Tipografia
                fontFamily: customizationData.fontFamily || 'Inter',
                fontSize: `${customizationData.fontSize || 16}px`,
                lineHeight: customizationData.lineHeight || 1.6,
                letterSpacing: `${customizationData.letterSpacing || 0}px`,
                textAlign: customizationData.textAlignment || 'center',
                textTransform: customizationData.textTransform || 'none',
                
                // Layout
                padding: `${customizationData.padding || 24}px`,
                margin: `${customizationData.margin || 16}px`,
                borderRadius: `${customizationData.borderRadius || 12}px`,
                
                // Bordas
                borderStyle: customizationData.borderStyle || 'none',
                borderWidth: `${customizationData.borderWidth || 0}px`,
                borderColor: customizationData.borderColor || '#000000',
                
                // Sombras
                boxShadow: customizationData.textShadow 
                  ? `0 ${customizationData.textShadowBlur || 2}px ${customizationData.textShadowBlur || 2}px ${customizationData.textShadowColor || '#000000'}, 0 ${customizationData.shadowIntensity || 30}px 60px rgba(0,0,0,0.3)`
                  : `0 ${customizationData.shadowIntensity || 30}px 60px rgba(0,0,0,0.3)`,
                
                // Filtros
                filter: `
                  brightness(${customizationData.brightness || 100}%) 
                  contrast(${customizationData.contrast || 100}%) 
                  saturate(${customizationData.saturation || 100}%) 
                  hue-rotate(${customizationData.hue || 0}deg) 
                  sepia(${customizationData.sepia || 0}%) 
                  blur(${customizationData.blurEffect || 0}px)
                `,
                
                // Opacidade
                opacity: customizationData.backgroundOpacity || 1,
                
                // Posicionamento
                justifyContent: customizationData.textPosition === 'top' ? 'flex-start' : 
                               customizationData.textPosition === 'bottom' ? 'flex-end' : 'center',
                
                // Espaçamento
                gap: `${customizationData.elementSpacing || 20}px`
              }}
            >
              {/* Efeito de partículas no fundo */}
              {customizationData.particleEffect && customizationData.particleEffect !== 'none' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full opacity-20 text-2xl">
                    {customizationData.particleEffect === 'hearts' && '💕💖💗💝💞💕💖💗💝💞💕💖💗💝💞'}
                    {customizationData.particleEffect === 'confetti' && '🎉🎊🎈🎁🎂🎉🎊🎈🎁🎂🎉🎊🎈🎁🎂'}
                    {customizationData.particleEffect === 'sparkles' && '✨⭐🌟💫✨⭐🌟💫✨⭐🌟💫✨⭐🌟💫'}
                    {customizationData.particleEffect === 'stars' && '⭐🌟✨💫⭐🌟✨💫⭐🌟✨💫⭐🌟✨💫'}
                    {customizationData.particleEffect === 'snow' && '❄️❅❆❄️❅❆❄️❅❆❄️❅❆❄️❅❆'}
                    {customizationData.particleEffect === 'leaves' && '🍃🍂🍁🍃🍂🍁🍃🍂🍁🍃🍂🍁🍃🍂🍁'}
                    {customizationData.particleEffect === 'bubbles' && '🫧💧🫧💧🫧💧🫧💧🫧💧🫧💧🫧💧🫧'}
                  </div>
                </div>
              )}

              {/* Elementos decorativos */}
              {customizationData.decorativeElements && customizationData.decorativeElements.length > 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full opacity-30 text-lg">
                    {customizationData.decorativeElements.includes('hearts') && '💕💖💗💝💞'}
                    {customizationData.decorativeElements.includes('stars') && '⭐🌟✨💫⭐'}
                    {customizationData.decorativeElements.includes('flowers') && '🌸🌺🌻🌷🌹'}
                    {customizationData.decorativeElements.includes('butterflies') && '🦋🦋🦋🦋🦋'}
                    {customizationData.decorativeElements.includes('geometric') && '🔷🔶🔹🔸🔷'}
                    {customizationData.decorativeElements.includes('vintage') && '📜📜📜📜📜'}
                  </div>
                </div>
              )}

              <div className="relative z-10">
                {formData.recipientName && (
                  <h2 className="text-2xl font-bold mb-4">
                    Para {formData.recipientName}
                  </h2>
                )}
                
                {formData.message && (
                  <p className="text-lg leading-relaxed mb-6 max-w-md">
                    {formData.message}
                  </p>
                )}
                
                {/* Galeria de fotos em miniatura */}
                {photoUrls.length > 0 && (
                  <div className="mt-4 mb-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {photoUrls.slice(0, 3).map((photoUrl, index) => (
                        <div 
                          key={index} 
                          className="w-12 h-12 rounded border-2 border-white/30 overflow-hidden"
                          style={{
                            borderColor: customizationData.accentColor || formData.backgroundColor
                          }}
                        >
                          <img
                            src={photoUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {photoUrls.length > 3 && (
                        <div className="w-12 h-12 rounded border-2 border-white/30 bg-white/20 flex items-center justify-center text-xs font-bold">
                          +{photoUrls.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {formData.senderName && (
                  <p className="text-lg font-medium">
                    Com amor, {formData.senderName}
                  </p>
                )}
                
                {selectedSpotifyTrack && (
                  <div className="mt-4 text-sm opacity-70 flex items-center justify-center gap-2">
                    <span>♪</span>
                    <span>{selectedSpotifyTrack.name}</span>
                  </div>
                )}
                
                {!formData.recipientName && !formData.message && !formData.senderName && (
                  <p className="text-center opacity-70">
                    Preencha o formulário para ver o preview
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Countdown preview */}
          {formData.specialDate && (
            <CountdownPreview
              targetDate={formData.specialDate}
              theme={theme}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default GiftForm;