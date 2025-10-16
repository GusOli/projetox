import { useState } from 'react';
import { Palette, Image, Sparkles, Music, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlan } from '@/contexts/PlanContext';

/**
 * Interface para dados customizados
 */
interface CustomGiftData {
  theme: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: number;
  borderRadius: number;
  shadowIntensity: number;
  particleEffect: string;
  photoFrame: string;
  animationSpeed: number;
}

/**
 * Props do componente
 */
interface GiftCustomizerProps {
  giftData: any;
  onUpdate: (data: Partial<CustomGiftData>) => void;
}

/**
 * Painel de personalização avançada do presente
 * Permite ajustar cores, efeitos visuais, tipografia e animações
 */
const GiftCustomizer = ({ giftData, onUpdate }: GiftCustomizerProps) => {
  const { selectedPlan, isPlanFeatureAllowed } = usePlan();
  const [localData, setLocalData] = useState<CustomGiftData>({
    theme: giftData.theme || 'couple',
    backgroundColor: giftData.backgroundColor || '#ff6b9d',
    textColor: giftData.textColor || '#ffffff',
    accentColor: giftData.accentColor || '#ff8fab',
    fontFamily: giftData.fontFamily || 'Inter',
    fontSize: giftData.fontSize || 16,
    borderRadius: giftData.borderRadius || 12,
    shadowIntensity: giftData.shadowIntensity || 30,
    particleEffect: giftData.particleEffect || 'hearts',
    photoFrame: giftData.photoFrame || 'classic',
    animationSpeed: giftData.animationSpeed || 1
  });

  /**
   * Atualiza dados localmente e propaga para o pai
   */
  const updateData = (field: keyof CustomGiftData, value: any) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    onUpdate(newData);
  };

  /**
   * Reseta configurações para padrão do tema
   */
  const resetToDefault = () => {
    const defaultConfigs = {
      couple: {
        backgroundColor: '#ff6b9d',
        textColor: '#ffffff',
        accentColor: '#ff8fab',
        particleEffect: 'hearts'
      },
      birthday: {
        backgroundColor: '#4ecdc4',
        textColor: '#ffffff',
        accentColor: '#ffc107',
        particleEffect: 'confetti'
      },
      corporate: {
        backgroundColor: '#6366f1',
        textColor: '#ffffff',
        accentColor: '#8b5cf6',
        particleEffect: 'sparkles'
      }
    };

    const defaults = defaultConfigs[localData.theme as keyof typeof defaultConfigs] || defaultConfigs.couple;
    
    const resetData = {
      ...localData,
      ...defaults,
      fontFamily: 'Inter',
      fontSize: 16,
      borderRadius: 12,
      shadowIntensity: 30,
      animationSpeed: 1
    };

    setLocalData(resetData);
    onUpdate(resetData);
  };

  /**
   * Aplica alterações (para feedback visual)
   */
  const applyChanges = () => {
    onUpdate(localData);
    // Aqui poderia ter uma animação de confirmação
  };

  return (
    <Card className="p-6 h-fit">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Personalização</h3>
            <p className="text-sm text-muted-foreground">Plano {selectedPlan}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetToDefault}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Resetar
            </Button>
            <Button size="sm" onClick={applyChanges}>
              <Check className="w-4 h-4 mr-1" />
              Aplicar
            </Button>
          </div>
        </div>

        {/* Tabs de personalização */}
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="text">Texto</TabsTrigger>
            <TabsTrigger value="effects" disabled={!isPlanFeatureAllowed('visualEffects')}>
              Efeitos
            </TabsTrigger>
            <TabsTrigger value="frames" disabled={!isPlanFeatureAllowed('photoFrames')}>
              Molduras
            </TabsTrigger>
          </TabsList>

          {/* Cores */}
          <TabsContent value="colors" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Cor de fundo</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={localData.backgroundColor}
                    onChange={(e) => updateData('backgroundColor', e.target.value)}
                    className="w-10 h-8 rounded border border-border cursor-pointer"
                  />
                  <Input
                    value={localData.backgroundColor}
                    onChange={(e) => updateData('backgroundColor', e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Cor do texto</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={localData.textColor}
                    onChange={(e) => updateData('textColor', e.target.value)}
                    className="w-10 h-8 rounded border border-border cursor-pointer"
                  />
                  <Input
                    value={localData.textColor}
                    onChange={(e) => updateData('textColor', e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Cor de destaque</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={localData.accentColor}
                    onChange={(e) => updateData('accentColor', e.target.value)}
                    className="w-10 h-8 rounded border border-border cursor-pointer"
                  />
                  <Input
                    value={localData.accentColor}
                    onChange={(e) => updateData('accentColor', e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Texto */}
          <TabsContent value="text" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Fonte</Label>
                <Select value={localData.fontFamily} onValueChange={(value) => updateData('fontFamily', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                    <SelectItem value="Dancing Script">Dancing Script</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Tamanho da fonte: {localData.fontSize}px</Label>
                <Slider
                  value={[localData.fontSize]}
                  onValueChange={(value) => updateData('fontSize', value[0])}
                  min={12}
                  max={24}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm">Arredondamento: {localData.borderRadius}px</Label>
                <Slider
                  value={[localData.borderRadius]}
                  onValueChange={(value) => updateData('borderRadius', value[0])}
                  min={0}
                  max={24}
                  step={2}
                  className="mt-2"
                />
              </div>
            </div>
          </TabsContent>

          {/* Efeitos visuais */}
          <TabsContent value="effects" className="space-y-4 mt-4">
            {!isPlanFeatureAllowed('visualEffects') ? (
              <div className="text-center py-6">
                <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Efeitos visuais disponíveis no plano Premium
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Efeito de partículas</Label>
                  <Select value={localData.particleEffect} onValueChange={(value) => updateData('particleEffect', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hearts">Corações</SelectItem>
                      <SelectItem value="confetti">Confetes</SelectItem>
                      <SelectItem value="sparkles">Brilhos</SelectItem>
                      <SelectItem value="none">Nenhum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Intensidade da sombra: {localData.shadowIntensity}%</Label>
                  <Slider
                    value={[localData.shadowIntensity]}
                    onValueChange={(value) => updateData('shadowIntensity', value[0])}
                    min={0}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm">Velocidade da animação: {localData.animationSpeed}x</Label>
                  <Slider
                    value={[localData.animationSpeed]}
                    onValueChange={(value) => updateData('animationSpeed', value[0])}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </TabsContent>

          {/* Molduras */}
          <TabsContent value="frames" className="space-y-4 mt-4">
            {!isPlanFeatureAllowed('photoFrames') ? (
              <div className="text-center py-6">
                <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Molduras personalizadas disponíveis no plano Premium
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Estilo da moldura</Label>
                  <Select value={localData.photoFrame} onValueChange={(value) => updateData('photoFrame', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Clássica</SelectItem>
                      <SelectItem value="modern">Moderna</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="polaroid">Polaroid</SelectItem>
                      <SelectItem value="none">Sem moldura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Preview das molduras */}
                <div className="grid grid-cols-2 gap-2">
                  {['classic', 'modern', 'vintage', 'polaroid'].map((frame) => (
                    <div
                      key={frame}
                      className={`
                        w-full h-16 border-2 rounded cursor-pointer transition-all
                        ${localData.photoFrame === frame 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                      onClick={() => updateData('photoFrame', frame)}
                    >
                      <div className="w-full h-full bg-muted/50 rounded flex items-center justify-center">
                        <span className="text-xs text-muted-foreground capitalize">
                          {frame}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

      </div>
    </Card>
  );
};

export default GiftCustomizer;