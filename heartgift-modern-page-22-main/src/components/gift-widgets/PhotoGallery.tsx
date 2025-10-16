import { useState, useRef } from 'react';
import { Camera, Upload, X, Heart, Gift, Image } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Props do componente PhotoGallery
 */
interface PhotoGalleryProps {
  photos: File[];
  theme: 'couple' | 'birthday' | 'corporate';
  accentColor?: string;
}

/**
 * Galeria de fotos interativa para presentes digitais
 * Permite visualização e upload de imagens com molduras temáticas
 */
const PhotoGallery = ({ 
  photos, 
  theme, 
  accentColor = '#ff6b9d' 
}: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Manipula o upload de novas fotos
   */
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedPhotos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  /**
   * Remove uma foto da galeria
   */
  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    setSelectedPhoto(null);
  };

  /**
   * Configurações por tema
   */
  const getThemeConfig = () => {
    switch (theme) {
      case 'couple':
        return {
          title: 'Nossos Momentos Especiais',
          subtitle: 'Memórias que guardaremos para sempre',
          icon: Heart,
          frameStyle: 'romantic',
          bgGradient: `linear-gradient(135deg, ${accentColor}10, ${accentColor}20)`,
          emptyText: 'Adicione fotos dos momentos especiais que vocês viveram juntos 💕'
        };
      case 'birthday':
        return {
          title: 'Galeria de Memórias',
          subtitle: 'Celebrando momentos felizes',
          icon: Gift,
          frameStyle: 'festive',
          bgGradient: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(78,205,196,0.1))',
          emptyText: 'Compartilhe as fotos mais divertidas e especiais! 🎉'
        };
      case 'corporate':
        return {
          title: 'Galeria Corporativa',
          subtitle: 'Marcos e conquistas importantes',
          icon: Image,
          frameStyle: 'professional',
          bgGradient: `linear-gradient(135deg, ${accentColor}08, ${accentColor}15)`,
          emptyText: 'Adicione imagens que representam marcos importantes da parceria'
        };
      default:
        return {
          title: 'Galeria de Fotos',
          subtitle: 'Momentos especiais',
          icon: Camera,
          frameStyle: 'classic',
          bgGradient: `linear-gradient(135deg, ${accentColor}10, ${accentColor}20)`,
          emptyText: 'Adicione suas fotos favoritas aqui'
        };
    }
  };

  const config = getThemeConfig();
  const Icon = config.icon;

  /**
   * Estilos de moldura por tema
   */
  const getFrameStyle = (isSelected: boolean = false) => {
    const baseClasses = "relative overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105";
    
    switch (config.frameStyle) {
      case 'romantic':
        return `${baseClasses} rounded-2xl border-4 ${
          isSelected 
            ? 'border-pink-400 shadow-2xl scale-110' 
            : 'border-pink-200 hover:border-pink-300 shadow-love'
        }`;
      case 'festive':
        return `${baseClasses} rounded-xl border-4 ${
          isSelected 
            ? 'border-purple-400 shadow-2xl scale-110' 
            : 'border-gradient-to-r from-pink-300 to-purple-300 shadow-glow'
        }`;
      case 'professional':
        return `${baseClasses} rounded-lg border-2 ${
          isSelected 
            ? 'border-blue-400 shadow-xl scale-105' 
            : 'border-gray-300 hover:border-blue-300 shadow-card'
        }`;
      default:
        return `${baseClasses} rounded-xl border-2 ${
          isSelected 
            ? 'border-primary shadow-xl scale-105' 
            : 'border-border hover:border-primary/50 shadow-md'
        }`;
    }
  };

  const allPhotos = [...photos.map(file => URL.createObjectURL(file)), ...uploadedPhotos];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card 
        className="p-8 border-0 shadow-2xl"
        style={{ 
          background: config.bgGradient,
          boxShadow: `0 25px 80px ${accentColor}15`
        }}
      >
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`
              }}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {config.title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            {config.subtitle}
          </p>
        </div>

        {/* Área de upload */}
        <div className="mb-8">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto flex items-center gap-3 mx-auto"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`
            }}
            size="lg"
          >
            <Upload size={20} />
            Adicionar Fotos
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        {/* Galeria de fotos */}
        {allPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allPhotos.map((photoUrl, index) => (
              <div 
                key={index}
                className={getFrameStyle(selectedPhoto === index)}
                onClick={() => setSelectedPhoto(selectedPhoto === index ? null : index)}
              >
                {/* Imagem */}
                <div className="aspect-square">
                  <img 
                    src={photoUrl}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay com controles */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(index);
                    }}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <X size={16} />
                  </Button>
                </div>

                {/* Indicador de seleção */}
                {selectedPhoto === index && (
                  <div 
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Heart size={14} className="text-white" fill="currentColor" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Estado vazio */
          <div className="text-center py-16">
            <div 
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 opacity-50"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Camera size={40} style={{ color: accentColor }} />
            </div>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {config.emptyText}
            </p>
          </div>
        )}

        {/* Modal de foto selecionada */}
        {selectedPhoto !== null && allPhotos[selectedPhoto] && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={allPhotos[selectedPhoto]}
                alt={`Foto ampliada ${selectedPhoto + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PhotoGallery;