import { useState, useEffect } from 'react';
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
  
  // Novas opções de texto
  textAlignment: 'left' | 'center' | 'right' | 'justify';
  textPosition: 'top' | 'center' | 'bottom';
  textSpacing: number;
  lineHeight: number;
  letterSpacing: number;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textShadow: boolean;
  textShadowColor: string;
  textShadowBlur: number;
  
  // Opções de layout
  layoutType: 'centered' | 'left-aligned' | 'right-aligned' | 'split' | 'grid';
  elementSpacing: number;
  padding: number;
  margin: number;
  
  // Opções de fundo avançadas
  backgroundType: 'solid' | 'gradient' | 'pattern' | 'image';
  gradientType: 'linear' | 'radial' | 'conic';
  gradientDirection: string;
  gradientColors: string[];
  backgroundPattern: string;
  backgroundImage: string;
  backgroundOpacity: number;
  
  // Opções de animação
  animationType: 'none' | 'fade' | 'slide' | 'zoom' | 'bounce' | 'rotate';
  animationDirection: 'up' | 'down' | 'left' | 'right' | 'in' | 'out';
  animationDuration: number;
  animationDelay: number;
  hoverEffect: boolean;
  
  // Elementos decorativos
  decorativeElements: string[];
  borderStyle: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
  borderWidth: number;
  borderColor: string;
  
  // Efeitos especiais
  blurEffect: number;
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  hue: number;
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
    animationSpeed: giftData.animationSpeed || 1,
    
    // Novas opções de texto
    textAlignment: giftData.textAlignment || 'center',
    textPosition: giftData.textPosition || 'center',
    textSpacing: giftData.textSpacing || 1.5,
    lineHeight: giftData.lineHeight || 1.6,
    letterSpacing: giftData.letterSpacing || 0,
    textTransform: giftData.textTransform || 'none',
    textShadow: giftData.textShadow || false,
    textShadowColor: giftData.textShadowColor || '#000000',
    textShadowBlur: giftData.textShadowBlur || 2,
    
    // Opções de layout
    layoutType: giftData.layoutType || 'centered',
    elementSpacing: giftData.elementSpacing || 20,
    padding: giftData.padding || 24,
    margin: giftData.margin || 16,
    
    // Opções de fundo avançadas
    backgroundType: giftData.backgroundType || 'solid',
    gradientType: giftData.gradientType || 'linear',
    gradientDirection: giftData.gradientDirection || '135deg',
    gradientColors: giftData.gradientColors || ['#ff6b9d', '#ff8fab'],
    backgroundPattern: giftData.backgroundPattern || 'none',
    backgroundImage: giftData.backgroundImage || '',
    backgroundOpacity: giftData.backgroundOpacity || 1,
    
    // Opções de animação
    animationType: giftData.animationType || 'fade',
    animationDirection: giftData.animationDirection || 'up',
    animationDuration: giftData.animationDuration || 0.8,
    animationDelay: giftData.animationDelay || 0,
    hoverEffect: giftData.hoverEffect || false,
    
    // Elementos decorativos
    decorativeElements: giftData.decorativeElements || [],
    borderStyle: giftData.borderStyle || 'none',
    borderWidth: giftData.borderWidth || 0,
    borderColor: giftData.borderColor || '#000000',
    
    // Efeitos especiais
    blurEffect: giftData.blurEffect || 0,
    brightness: giftData.brightness || 100,
    contrast: giftData.contrast || 100,
    saturation: giftData.saturation || 100,
    sepia: giftData.sepia || 0,
    hue: giftData.hue || 0
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
   * Atualiza dados quando o giftData muda
   */
  useEffect(() => {
    if (giftData) {
      setLocalData(prev => ({
        ...prev,
        theme: giftData.theme || prev.theme,
        backgroundColor: giftData.backgroundColor || prev.backgroundColor,
        textColor: giftData.textColor || prev.textColor,
        accentColor: giftData.accentColor || prev.accentColor,
        fontFamily: giftData.fontFamily || prev.fontFamily,
        fontSize: giftData.fontSize || prev.fontSize,
        shadowIntensity: giftData.shadowIntensity || prev.shadowIntensity,
        particleEffect: giftData.particleEffect || prev.particleEffect,
        photoFrame: giftData.photoFrame || prev.photoFrame,
        animationSpeed: giftData.animationSpeed || prev.animationSpeed,
        
        // Novas propriedades
        textAlignment: giftData.textAlignment || prev.textAlignment,
        textPosition: giftData.textPosition || prev.textPosition,
        textSpacing: giftData.textSpacing || prev.textSpacing,
        lineHeight: giftData.lineHeight || prev.lineHeight,
        letterSpacing: giftData.letterSpacing || prev.letterSpacing,
        textTransform: giftData.textTransform || prev.textTransform,
        textShadow: giftData.textShadow || prev.textShadow,
        textShadowColor: giftData.textShadowColor || prev.textShadowColor,
        textShadowBlur: giftData.textShadowBlur || prev.textShadowBlur,
        
        layoutType: giftData.layoutType || prev.layoutType,
        elementSpacing: giftData.elementSpacing || prev.elementSpacing,
        padding: giftData.padding || prev.padding,
        margin: giftData.margin || prev.margin,
        
        backgroundType: giftData.backgroundType || prev.backgroundType,
        gradientType: giftData.gradientType || prev.gradientType,
        gradientDirection: giftData.gradientDirection || prev.gradientDirection,
        gradientColors: giftData.gradientColors || prev.gradientColors,
        backgroundPattern: giftData.backgroundPattern || prev.backgroundPattern,
        backgroundImage: giftData.backgroundImage || prev.backgroundImage,
        backgroundOpacity: giftData.backgroundOpacity || prev.backgroundOpacity,
        
        animationType: giftData.animationType || prev.animationType,
        animationDirection: giftData.animationDirection || prev.animationDirection,
        animationDuration: giftData.animationDuration || prev.animationDuration,
        animationDelay: giftData.animationDelay || prev.animationDelay,
        hoverEffect: giftData.hoverEffect || prev.hoverEffect,
        
        decorativeElements: giftData.decorativeElements || prev.decorativeElements,
        borderStyle: giftData.borderStyle || prev.borderStyle,
        borderWidth: giftData.borderWidth || prev.borderWidth,
        borderColor: giftData.borderColor || prev.borderColor,
        
        blurEffect: giftData.blurEffect || prev.blurEffect,
        brightness: giftData.brightness || prev.brightness,
        contrast: giftData.contrast || prev.contrast,
        saturation: giftData.saturation || prev.saturation,
        sepia: giftData.sepia || prev.sepia,
        hue: giftData.hue || prev.hue
      }));
    }
  }, [giftData]);

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

    const currentTheme = giftData?.theme || localData.theme;
    const defaults = defaultConfigs[currentTheme as keyof typeof defaultConfigs] || defaultConfigs.couple;
    
    const resetData = {
      ...localData,
      ...defaults,
      theme: currentTheme,
      fontFamily: 'Inter',
      fontSize: 16,
      borderRadius: 12,
      shadowIntensity: 30,
      animationSpeed: 1,
      photoFrame: 'classic',
      
      // Reset das novas propriedades
      textAlignment: 'center' as const,
      textPosition: 'center' as const,
      textSpacing: 1.5,
      lineHeight: 1.6,
      letterSpacing: 0,
      textTransform: 'none' as const,
      textShadow: false,
      textShadowColor: '#000000',
      textShadowBlur: 2,
      
      layoutType: 'centered' as const,
      elementSpacing: 20,
      padding: 24,
      margin: 16,
      
      backgroundType: 'solid' as const,
      gradientType: 'linear' as const,
      gradientDirection: '135deg',
      gradientColors: ['#ff6b9d', '#ff8fab'],
      backgroundPattern: 'none',
      backgroundImage: '',
      backgroundOpacity: 1,
      
      animationType: 'fade' as const,
      animationDirection: 'up' as const,
      animationDuration: 0.8,
      animationDelay: 0,
      hoverEffect: false,
      
      decorativeElements: [],
      borderStyle: 'none' as const,
      borderWidth: 0,
      borderColor: '#000000',
      
      blurEffect: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
      hue: 0
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
          <TabsList className="grid w-full grid-cols-6 text-xs">
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="text">Texto</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="background">Fundo</TabsTrigger>
            <TabsTrigger value="animation" disabled={!isPlanFeatureAllowed('visualEffects')}>
              Animações
            </TabsTrigger>
            <TabsTrigger value="effects" disabled={!isPlanFeatureAllowed('visualEffects')}>
              Efeitos
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
            <div className="space-y-4">
              {/* Fonte */}
              <div>
                <Label className="text-sm font-medium">Fonte</Label>
                <Select value={localData.fontFamily} onValueChange={(value) => updateData('fontFamily', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter (Moderno)</SelectItem>
                    <SelectItem value="Poppins">Poppins (Elegante)</SelectItem>
                    <SelectItem value="Playfair Display">Playfair Display (Serif)</SelectItem>
                    <SelectItem value="Dancing Script">Dancing Script (Cursiva)</SelectItem>
                    <SelectItem value="Roboto">Roboto (Clean)</SelectItem>
                    <SelectItem value="Open Sans">Open Sans (Legível)</SelectItem>
                    <SelectItem value="Lato">Lato (Suave)</SelectItem>
                    <SelectItem value="Montserrat">Montserrat (Geométrico)</SelectItem>
                    <SelectItem value="Source Sans Pro">Source Sans Pro (Profissional)</SelectItem>
                    <SelectItem value="Nunito">Nunito (Arredondado)</SelectItem>
                    <SelectItem value="Quicksand">Quicksand (Minimalista)</SelectItem>
                    <SelectItem value="Raleway">Raleway (Elegante)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tamanho e espaçamento */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm">Tamanho: {localData.fontSize}px</Label>
                  <Slider
                    value={[localData.fontSize]}
                    onValueChange={(value) => updateData('fontSize', value[0])}
                    min={8}
                    max={48}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm">Altura da linha: {localData.lineHeight}</Label>
                  <Slider
                    value={[localData.lineHeight]}
                    onValueChange={(value) => updateData('lineHeight', value[0])}
                    min={1}
                    max={3}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Alinhamento e posição */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm">Alinhamento</Label>
                  <Select value={localData.textAlignment} onValueChange={(value) => updateData('textAlignment', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Esquerda</SelectItem>
                      <SelectItem value="center">Centro</SelectItem>
                      <SelectItem value="right">Direita</SelectItem>
                      <SelectItem value="justify">Justificado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Posição vertical</Label>
                  <Select value={localData.textPosition} onValueChange={(value) => updateData('textPosition', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Superior</SelectItem>
                      <SelectItem value="center">Centro</SelectItem>
                      <SelectItem value="bottom">Inferior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Espaçamento e transformação */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm">Espaçamento entre letras: {localData.letterSpacing}px</Label>
                  <Slider
                    value={[localData.letterSpacing]}
                    onValueChange={(value) => updateData('letterSpacing', value[0])}
                    min={-2}
                    max={5}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm">Transformação</Label>
                  <Select value={localData.textTransform} onValueChange={(value) => updateData('textTransform', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Normal</SelectItem>
                      <SelectItem value="uppercase">MAIÚSCULAS</SelectItem>
                      <SelectItem value="lowercase">minúsculas</SelectItem>
                      <SelectItem value="capitalize">Primeira Maiúscula</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sombra do texto */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="textShadow"
                    checked={localData.textShadow}
                    onChange={(e) => updateData('textShadow', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="textShadow" className="text-sm">Sombra no texto</Label>
                </div>
                
                {localData.textShadow && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">Cor da sombra</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="color"
                          value={localData.textShadowColor}
                          onChange={(e) => updateData('textShadowColor', e.target.value)}
                          className="w-8 h-6 rounded border border-border cursor-pointer"
                        />
                        <Input
                          value={localData.textShadowColor}
                          onChange={(e) => updateData('textShadowColor', e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Intensidade: {localData.textShadowBlur}px</Label>
                      <Slider
                        value={[localData.textShadowBlur]}
                        onValueChange={(value) => updateData('textShadowBlur', value[0])}
                        min={0}
                        max={10}
                        step={0.5}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Layout */}
          <TabsContent value="layout" className="space-y-4 mt-4">
            <div className="space-y-4">
              {/* Tipo de layout */}
              <div>
                <Label className="text-sm font-medium">Tipo de Layout</Label>
                <Select value={localData.layoutType} onValueChange={(value) => updateData('layoutType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centered">Centralizado</SelectItem>
                    <SelectItem value="left-aligned">Alinhado à esquerda</SelectItem>
                    <SelectItem value="right-aligned">Alinhado à direita</SelectItem>
                    <SelectItem value="split">Dividido</SelectItem>
                    <SelectItem value="grid">Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Espaçamento */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm">Espaçamento entre elementos: {localData.elementSpacing}px</Label>
                  <Slider
                    value={[localData.elementSpacing]}
                    onValueChange={(value) => updateData('elementSpacing', value[0])}
                    min={0}
                    max={60}
                    step={2}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm">Padding interno: {localData.padding}px</Label>
                  <Slider
                    value={[localData.padding]}
                    onValueChange={(value) => updateData('padding', value[0])}
                    min={0}
                    max={80}
                    step={2}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Margem */}
              <div>
                <Label className="text-sm">Margem externa: {localData.margin}px</Label>
                <Slider
                  value={[localData.margin]}
                  onValueChange={(value) => updateData('margin', value[0])}
                  min={0}
                  max={60}
                  step={2}
                  className="mt-2"
                />
              </div>

              {/* Bordas */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Bordas</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Estilo</Label>
                    <Select value={localData.borderStyle} onValueChange={(value) => updateData('borderStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhuma</SelectItem>
                        <SelectItem value="solid">Sólida</SelectItem>
                        <SelectItem value="dashed">Tracejada</SelectItem>
                        <SelectItem value="dotted">Pontilhada</SelectItem>
                        <SelectItem value="double">Dupla</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm">Largura: {localData.borderWidth}px</Label>
                    <Slider
                      value={[localData.borderWidth]}
                      onValueChange={(value) => updateData('borderWidth', value[0])}
                      min={0}
                      max={10}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
                
                {localData.borderStyle !== 'none' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">Cor da borda</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="color"
                          value={localData.borderColor}
                          onChange={(e) => updateData('borderColor', e.target.value)}
                          className="w-8 h-6 rounded border border-border cursor-pointer"
                        />
                        <Input
                          value={localData.borderColor}
                          onChange={(e) => updateData('borderColor', e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Arredondamento: {localData.borderRadius}px</Label>
                      <Slider
                        value={[localData.borderRadius]}
                        onValueChange={(value) => updateData('borderRadius', value[0])}
                        min={0}
                        max={30}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Fundo */}
          <TabsContent value="background" className="space-y-4 mt-4">
            <div className="space-y-4">
              {/* Tipo de fundo */}
              <div>
                <Label className="text-sm font-medium">Tipo de Fundo</Label>
                <Select value={localData.backgroundType} onValueChange={(value) => updateData('backgroundType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Cor sólida</SelectItem>
                    <SelectItem value="gradient">Gradiente</SelectItem>
                    <SelectItem value="pattern">Padrão</SelectItem>
                    <SelectItem value="image">Imagem</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cor sólida */}
              {localData.backgroundType === 'solid' && (
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
              )}

              {/* Gradiente */}
              {localData.backgroundType === 'gradient' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">Tipo de gradiente</Label>
                      <Select value={localData.gradientType} onValueChange={(value) => updateData('gradientType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linear">Linear</SelectItem>
                          <SelectItem value="radial">Radial</SelectItem>
                          <SelectItem value="conic">Cônico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Direção: {localData.gradientDirection}</Label>
                      <Select value={localData.gradientDirection} onValueChange={(value) => updateData('gradientDirection', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0deg">→</SelectItem>
                          <SelectItem value="45deg">↗</SelectItem>
                          <SelectItem value="90deg">↑</SelectItem>
                          <SelectItem value="135deg">↖</SelectItem>
                          <SelectItem value="180deg">←</SelectItem>
                          <SelectItem value="225deg">↙</SelectItem>
                          <SelectItem value="270deg">↓</SelectItem>
                          <SelectItem value="315deg">↘</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Cores do gradiente</Label>
                    {localData.gradientColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...localData.gradientColors];
                            newColors[index] = e.target.value;
                            updateData('gradientColors', newColors);
                          }}
                          className="w-8 h-6 rounded border border-border cursor-pointer"
                        />
                        <Input
                          value={color}
                          onChange={(e) => {
                            const newColors = [...localData.gradientColors];
                            newColors[index] = e.target.value;
                            updateData('gradientColors', newColors);
                          }}
                          className="text-xs"
                        />
                        {localData.gradientColors.length > 2 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newColors = localData.gradientColors.filter((_, i) => i !== index);
                              updateData('gradientColors', newColors);
                            }}
                            className="text-destructive"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newColors = [...localData.gradientColors, '#ffffff'];
                        updateData('gradientColors', newColors);
                      }}
                      className="w-full"
                    >
                      + Adicionar Cor
                    </Button>
                  </div>
                </div>
              )}

              {/* Padrões */}
              {localData.backgroundType === 'pattern' && (
                <div>
                  <Label className="text-sm">Padrão de fundo</Label>
                  <Select value={localData.backgroundPattern} onValueChange={(value) => updateData('backgroundPattern', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhum</SelectItem>
                      <SelectItem value="dots">Pontos</SelectItem>
                      <SelectItem value="lines">Linhas</SelectItem>
                      <SelectItem value="grid">Grade</SelectItem>
                      <SelectItem value="diagonal">Diagonal</SelectItem>
                      <SelectItem value="waves">Ondas</SelectItem>
                      <SelectItem value="hearts">Corações</SelectItem>
                      <SelectItem value="stars">Estrelas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Opacidade */}
              <div>
                <Label className="text-sm">Opacidade: {Math.round(localData.backgroundOpacity * 100)}%</Label>
                <Slider
                  value={[localData.backgroundOpacity]}
                  onValueChange={(value) => updateData('backgroundOpacity', value[0])}
                  min={0.1}
                  max={1}
                  step={0.1}
                  className="mt-2"
                />
              </div>
            </div>
          </TabsContent>

          {/* Animações */}
          <TabsContent value="animation" className="space-y-4 mt-4">
            {!isPlanFeatureAllowed('visualEffects') ? (
              <div className="text-center py-6">
                <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Animações disponíveis no plano Premium
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Tipo de animação */}
                <div>
                  <Label className="text-sm font-medium">Tipo de Animação</Label>
                  <Select value={localData.animationType} onValueChange={(value) => updateData('animationType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      <SelectItem value="fade">Fade In</SelectItem>
                      <SelectItem value="slide">Deslizar</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                      <SelectItem value="rotate">Rotação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {localData.animationType !== 'none' && (
                  <>
                    {/* Direção da animação */}
                    <div>
                      <Label className="text-sm">Direção</Label>
                      <Select value={localData.animationDirection} onValueChange={(value) => updateData('animationDirection', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="up">Para cima</SelectItem>
                          <SelectItem value="down">Para baixo</SelectItem>
                          <SelectItem value="left">Para esquerda</SelectItem>
                          <SelectItem value="right">Para direita</SelectItem>
                          <SelectItem value="in">Para dentro</SelectItem>
                          <SelectItem value="out">Para fora</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Duração e delay */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Duração: {localData.animationDuration}s</Label>
                        <Slider
                          value={[localData.animationDuration]}
                          onValueChange={(value) => updateData('animationDuration', value[0])}
                          min={0.1}
                          max={3}
                          step={0.1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Delay: {localData.animationDelay}s</Label>
                        <Slider
                          value={[localData.animationDelay]}
                          onValueChange={(value) => updateData('animationDelay', value[0])}
                          min={0}
                          max={2}
                          step={0.1}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Efeito hover */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="hoverEffect"
                        checked={localData.hoverEffect}
                        onChange={(e) => updateData('hoverEffect', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="hoverEffect" className="text-sm">Efeito ao passar o mouse</Label>
                    </div>
                  </>
                )}
              </div>
            )}
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
              <div className="space-y-4">
                {/* Efeito de partículas */}
                <div>
                  <Label className="text-sm font-medium">Efeito de Partículas</Label>
                  <Select value={localData.particleEffect} onValueChange={(value) => updateData('particleEffect', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhum</SelectItem>
                      <SelectItem value="hearts">Corações</SelectItem>
                      <SelectItem value="confetti">Confetes</SelectItem>
                      <SelectItem value="sparkles">Brilhos</SelectItem>
                      <SelectItem value="stars">Estrelas</SelectItem>
                      <SelectItem value="snow">Neve</SelectItem>
                      <SelectItem value="leaves">Folhas</SelectItem>
                      <SelectItem value="bubbles">Bolhas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sombras */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Sombras</Label>
                  <div>
                    <Label className="text-sm">Intensidade da sombra: {localData.shadowIntensity}%</Label>
                    <Slider
                      value={[localData.shadowIntensity]}
                      onValueChange={(value) => updateData('shadowIntensity', value[0])}
                      min={0}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Efeitos de filtro */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Filtros Visuais</Label>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">Brilho: {localData.brightness}%</Label>
                      <Slider
                        value={[localData.brightness]}
                        onValueChange={(value) => updateData('brightness', value[0])}
                        min={0}
                        max={200}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Contraste: {localData.contrast}%</Label>
                      <Slider
                        value={[localData.contrast]}
                        onValueChange={(value) => updateData('contrast', value[0])}
                        min={0}
                        max={200}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">Saturação: {localData.saturation}%</Label>
                      <Slider
                        value={[localData.saturation]}
                        onValueChange={(value) => updateData('saturation', value[0])}
                        min={0}
                        max={200}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Matiz: {localData.hue}°</Label>
                      <Slider
                        value={[localData.hue]}
                        onValueChange={(value) => updateData('hue', value[0])}
                        min={-180}
                        max={180}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">Sepia: {localData.sepia}%</Label>
                      <Slider
                        value={[localData.sepia]}
                        onValueChange={(value) => updateData('sepia', value[0])}
                        min={0}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Desfoque: {localData.blurEffect}px</Label>
                      <Slider
                        value={[localData.blurEffect]}
                        onValueChange={(value) => updateData('blurEffect', value[0])}
                        min={0}
                        max={20}
                        step={0.5}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Velocidade geral */}
                <div>
                  <Label className="text-sm">Velocidade geral: {localData.animationSpeed}x</Label>
                  <Slider
                    value={[localData.animationSpeed]}
                    onValueChange={(value) => updateData('animationSpeed', value[0])}
                    min={0.1}
                    max={3}
                    step={0.1}
                    className="mt-2"
                  />
                </div>

                {/* Elementos decorativos */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Elementos Decorativos</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['hearts', 'stars', 'flowers', 'butterflies', 'geometric', 'vintage'].map((element) => (
                      <div
                        key={element}
                        className={`
                          p-2 border rounded cursor-pointer transition-all text-center text-xs
                          ${localData.decorativeElements.includes(element) 
                            ? 'border-primary bg-primary/10 text-primary' 
                            : 'border-border hover:border-primary/50'
                          }
                        `}
                        onClick={() => {
                          const newElements = localData.decorativeElements.includes(element)
                            ? localData.decorativeElements.filter(e => e !== element)
                            : [...localData.decorativeElements, element];
                          updateData('decorativeElements', newElements);
                        }}
                      >
                        {element === 'hearts' && '💕'}
                        {element === 'stars' && '⭐'}
                        {element === 'flowers' && '🌸'}
                        {element === 'butterflies' && '🦋'}
                        {element === 'geometric' && '🔷'}
                        {element === 'vintage' && '📜'}
                        <div className="mt-1 capitalize">{element}</div>
                      </div>
                    ))}
                  </div>
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
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'classic', name: 'Clássica', style: 'border-4 border-gray-300' },
                    { id: 'modern', name: 'Moderna', style: 'border-2 border-gray-500 rounded-lg' },
                    { id: 'vintage', name: 'Vintage', style: 'border-4 border-amber-600 rounded-none' },
                    { id: 'polaroid', name: 'Polaroid', style: 'border-2 border-white bg-white shadow-lg' }
                  ].map((frame) => (
                    <div
                      key={frame.id}
                      className={`
                        w-full h-20 cursor-pointer transition-all group
                        ${localData.photoFrame === frame.id 
                          ? 'ring-2 ring-primary ring-offset-2' 
                          : 'hover:scale-105'
                        }
                      `}
                      onClick={() => updateData('photoFrame', frame.id)}
                    >
                      <div className={`w-full h-full ${frame.style} p-1 flex items-center justify-center`}>
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600 capitalize">
                            {frame.name}
                          </span>
                        </div>
                      </div>
                      {localData.photoFrame === frame.id && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
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