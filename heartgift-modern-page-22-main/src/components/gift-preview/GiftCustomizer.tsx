import { useState } from 'react';
import { Palette, Type, Frame, Music, Image, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

/**
 * Interface para dados customizáveis do presente
 */
interface CustomGiftData {
  theme: string;
  recipientName: string;
  senderName: string;
  message: string;
  specialDate: string;
  backgroundColor: string;
  textColor: string;
  photos?: File[];
  selectedFrame?: string;
  musicUrl?: string;
  textStyle?: string;
}

/**
 * Props do componente GiftCustomizer
 */
interface GiftCustomizerProps {
  giftData: CustomGiftData;
  onUpdate: (data: Partial<CustomGiftData>) => void;
}

/**
 * Painel de customização avançada do presente digital
 * Permite ajustar cores, molduras, tipografia e outros elementos visuais
 */
const GiftCustomizer = ({ giftData, onUpdate }: GiftCustomizerProps) => {
  const [activeTab, setActiveTab] = useState('colors');

  /**
   * Paleta de cores pré-definidas por tema
   */
  const getThemeColors = () => {
    switch (giftData.theme) {
      case 'couple':
        return [
          '#ff6b9d', '#e91e63', '#ff4569', '#ff8fab',
          '#f06292', '#ec407a', '#ff7043', '#ff5722'
        ];
      case 'birthday':
        return [
          '#4ecdc4', '#26c6da', '#29b6f6', '#42a5f5',
          '#ab47bc', '#9c27b0', '#5e35b1', '#3f51b5'
        ];
      case 'corporate':
        return [
          '#6366f1', '#4f46e5', '#7c3aed', '#8b5cf6',
          '#06b6d4', '#0891b2', '#059669', '#047857'
        ];
      default:
        return [
          '#ff6b9d', '#4ecdc4', '#6366f1', '#8b5cf6',
          '#f59e0b', '#ef4444', '#10b981', '#3b82f6'
        ];
    }
  };

  /**
   * Estilos de moldura disponíveis
   */
  const frameStyles = [
    { id: 'classic', name: 'Clássica', preview: '□' },
    { id: 'elegant', name: 'Elegante', preview: '◊' },
    { id: 'modern', name: 'Moderna', preview: '▢' },
    { id: 'vintage', name: 'Vintage', preview: '◈' },
    { id: 'minimalist', name: 'Minimalista', preview: '▭' },
    { id: 'ornate', name: 'Ornamentada', preview: '❋' }
  ];

  /**
   * Estilos de texto disponíveis
   */
  const textStyles = [
    { id: 'romantic', name: 'Romântico', font: 'serif' },
    { id: 'modern', name: 'Moderno', font: 'sans-serif' },
    { id: 'playful', name: 'Divertido', font: 'cursive' },
    { id: 'elegant', name: 'Elegante', font: 'serif' },
    { id: 'bold', name: 'Marcante', font: 'sans-serif' },
    { id: 'classic', name: 'Clássico', font: 'serif' }
  ];

  return (
    <Card className="h-fit sticky top-6 bg-background/95 backdrop-blur-sm border-border/50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${giftData.backgroundColor}20` }}
          >
            <Settings size={20} style={{ color: giftData.backgroundColor }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Personalização
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize cada detalhe
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="colors" className="text-xs">
              <Palette size={14} className="mr-1" />
              Cores
            </TabsTrigger>
            <TabsTrigger value="frames" className="text-xs">
              <Frame size={14} className="mr-1" />
              Molduras
            </TabsTrigger>
            <TabsTrigger value="text" className="text-xs">
              <Type size={14} className="mr-1" />
              Texto
            </TabsTrigger>
            <TabsTrigger value="media" className="text-xs">
              <Image size={14} className="mr-1" />
              Mídia
            </TabsTrigger>
          </TabsList>

          {/* Aba de Cores */}
          <TabsContent value="colors" className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Cor Principal
              </Label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {getThemeColors().map((color) => (
                  <button
                    key={color}
                    className={`
                      w-full aspect-square rounded-lg border-2 transition-all duration-200
                      ${giftData.backgroundColor === color 
                        ? 'border-foreground scale-110' 
                        : 'border-border hover:border-foreground/50 hover:scale-105'
                      }
                    `}
                    style={{ backgroundColor: color }}
                    onClick={() => onUpdate({ backgroundColor: color })}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={giftData.backgroundColor}
                  onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                  className="w-12 h-8 rounded border border-border cursor-pointer"
                />
                <Input
                  value={giftData.backgroundColor}
                  onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                  className="flex-1 text-xs"
                  placeholder="#ff6b9d"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Cor do Texto
              </Label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {['#ffffff', '#000000', '#333333', '#666666', '#999999', '#cccccc', '#f8f9fa', '#212529'].map((color) => (
                  <button
                    key={color}
                    className={`
                      w-full aspect-square rounded-lg border-2 transition-all duration-200
                      ${giftData.textColor === color 
                        ? 'border-foreground scale-110' 
                        : 'border-border hover:border-foreground/50 hover:scale-105'
                      }
                    `}
                    style={{ backgroundColor: color }}
                    onClick={() => onUpdate({ textColor: color })}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={giftData.textColor}
                  onChange={(e) => onUpdate({ textColor: e.target.value })}
                  className="w-12 h-8 rounded border border-border cursor-pointer"
                />
                <Input
                  value={giftData.textColor}
                  onChange={(e) => onUpdate({ textColor: e.target.value })}
                  className="flex-1 text-xs"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </TabsContent>

          {/* Aba de Molduras */}
          <TabsContent value="frames" className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Estilo da Moldura
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {frameStyles.map((frame) => (
                  <Button
                    key={frame.id}
                    variant={giftData.selectedFrame === frame.id ? "default" : "outline"}
                    className={`
                      h-16 flex flex-col items-center justify-center gap-1 transition-all duration-200
                      ${giftData.selectedFrame === frame.id ? 'scale-105 shadow-lg' : 'hover:scale-102'}
                    `}
                    onClick={() => onUpdate({ selectedFrame: frame.id })}
                    style={{
                      backgroundColor: giftData.selectedFrame === frame.id ? giftData.backgroundColor : undefined,
                      borderColor: giftData.selectedFrame === frame.id ? giftData.backgroundColor : undefined
                    }}
                    data-frame={frame.id}
                  >
                    <span className="text-2xl">{frame.preview}</span>
                    <span className="text-xs">{frame.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Aba de Texto */}
          <TabsContent value="text" className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Estilo de Tipografia
              </Label>
              <div className="space-y-2">
                {textStyles.map((style) => (
                  <Button
                    key={style.id}
                    variant={giftData.textStyle === style.id ? "default" : "outline"}
                    className={`
                      w-full justify-start transition-all duration-200 text-${style.id}
                      ${giftData.textStyle === style.id ? 'shadow-lg' : 'hover:scale-102'}
                    `}
                    onClick={() => onUpdate({ textStyle: style.id })}
                    style={{
                      backgroundColor: giftData.textStyle === style.id ? giftData.backgroundColor : undefined,
                      borderColor: giftData.textStyle === style.id ? giftData.backgroundColor : undefined,
                      fontFamily: style.font
                    }}
                    data-text-style={style.id}
                  >
                    <Type size={16} className="mr-2" />
                    {style.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Tamanho do Texto
              </Label>
              <Slider
                value={[18]}
                max={32}
                min={12}
                step={2}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Pequeno</span>
                <span>Grande</span>
              </div>
            </div>
          </TabsContent>

          {/* Aba de Mídia */}
          <TabsContent value="media" className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Configurações de Mídia
              </Label>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {/* Implementar upload de fotos */}}
                >
                  <Image size={16} className="mr-2" />
                  Gerenciar Fotos ({giftData.photos?.length || 0})
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {/* Implementar seleção de música */}}
                >
                  <Music size={16} className="mr-2" />
                  {giftData.musicUrl ? 'Trocar Música' : 'Adicionar Música'}
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Efeitos Visuais
              </Label>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Partículas Flutuantes</span>
                  <Button variant="outline" size="sm">Ativo</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Animações de Entrada</span>
                  <Button variant="outline" size="sm">Ativo</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Efeitos de Hover</span>
                  <Button variant="outline" size="sm">Ativo</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Ações finais */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-border/30">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs"
          >
            Resetar
          </Button>
          <Button 
            size="sm" 
            className="flex-1 text-xs"
            style={{ backgroundColor: giftData.backgroundColor }}
          >
            Aplicar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GiftCustomizer;