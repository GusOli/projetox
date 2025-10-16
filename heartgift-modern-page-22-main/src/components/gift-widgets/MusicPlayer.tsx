import { useState, useRef } from 'react';
import { Play, Pause, Music, Upload, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

/**
 * Props do componente MusicPlayer
 */
interface MusicPlayerProps {
  musicUrl?: string;
  theme: 'couple' | 'birthday' | 'corporate';
  accentColor?: string;
}

/**
 * Player de música interativo para presentes digitais
 * Permite reproduzir música de fundo com controles personalizados
 */
const MusicPlayer = ({ 
  musicUrl, 
  theme, 
  accentColor = '#ff6b9d' 
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [uploadedMusic, setUploadedMusic] = useState<string | null>(null);
  const [musicName, setMusicName] = useState<string>('');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Controla play/pause da música
   */
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * Manipula o upload de arquivo de música
   */
  const handleMusicUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setUploadedMusic(url);
      setMusicName(file.name);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  /**
   * Atualiza o progresso da música
   */
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  /**
   * Busca para posição específica da música
   */
  const seekTo = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  /**
   * Controla o volume
   */
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  /**
   * Formata tempo em MM:SS
   */
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  /**
   * Configurações por tema
   */
  const getThemeConfig = () => {
    switch (theme) {
      case 'couple':
        return {
          title: 'Nossa Música Especial',
          subtitle: 'A trilha sonora do nosso amor',
          bgGradient: `linear-gradient(135deg, ${accentColor}10, ${accentColor}25)`,
          playerGradient: `linear-gradient(135deg, ${accentColor}, #ff8fab)`,
          emptyText: 'Adicione uma música que representa o amor de vocês 💕'
        };
      case 'birthday':
        return {
          title: 'Música da Festa',
          subtitle: 'Para tornar a celebração ainda mais especial',
          bgGradient: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(78,205,196,0.1))',
          playerGradient: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
          emptyText: 'Escolha uma música animada para a celebração! 🎵'
        };
      case 'corporate':
        return {
          title: 'Música Ambiente',
          subtitle: 'Som profissional para o evento',
          bgGradient: `linear-gradient(135deg, ${accentColor}08, ${accentColor}15)`,
          playerGradient: `linear-gradient(135deg, ${accentColor}, #6366f1)`,
          emptyText: 'Adicione uma música ambiente adequada para o evento corporativo'
        };
      default:
        return {
          title: 'Player de Música',
          subtitle: 'Adicione uma trilha sonora especial',
          bgGradient: `linear-gradient(135deg, ${accentColor}10, ${accentColor}20)`,
          playerGradient: `linear-gradient(135deg, ${accentColor}, #ff8fab)`,
          emptyText: 'Faça upload de uma música especial'
        };
    }
  };

  const config = getThemeConfig();
  const currentMusicUrl = uploadedMusic || musicUrl;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card 
        className="p-8 border-0 shadow-2xl relative overflow-hidden"
        style={{ 
          background: config.bgGradient,
          boxShadow: `0 25px 80px ${accentColor}20`
        }}
      >
        {/* Efeitos decorativos */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div 
            className="w-full h-full rounded-full animate-pulse"
            style={{ background: config.playerGradient }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
          <div 
            className="w-full h-full rounded-full animate-pulse"
            style={{ background: config.playerGradient }}
          />
        </div>

        <div className="relative z-10">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                style={{ background: config.playerGradient }}
              >
                <Music className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                {config.title}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {config.subtitle}
            </p>
          </div>

          {/* Player de música ou área de upload */}
          {currentMusicUrl ? (
            <div className="space-y-6">
              {/* Elemento de áudio */}
              <audio
                ref={audioRef}
                src={currentMusicUrl}
                onTimeUpdate={updateProgress}
                onLoadedMetadata={updateProgress}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Display da música atual */}
              <div className="text-center py-6">
                <div 
                  className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 animate-spin-slow"
                  style={{ background: config.playerGradient }}
                >
                  <Music className="w-12 h-12 text-white" />
                </div>
                {musicName && (
                  <p className="text-lg font-medium text-foreground mb-2 truncate">
                    {musicName.replace(/\.[^/.]+$/, '')}
                  </p>
                )}
              </div>

              {/* Controles principais */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-12 h-12"
                  disabled
                >
                  <SkipBack size={20} />
                </Button>
                
                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="rounded-full w-16 h-16 shadow-xl"
                  style={{ 
                    background: config.playerGradient,
                    color: 'white'
                  }}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-12 h-12"
                  disabled
                >
                  <SkipForward size={20} />
                </Button>
              </div>

              {/* Barra de progresso */}
              <div className="space-y-2">
                <Slider
                  value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
                  onValueChange={seekTo}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controle de volume */}
              <div className="flex items-center gap-3">
                <Volume2 size={20} style={{ color: accentColor }} />
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-10">
                  {volume}%
                </span>
              </div>

              {/* Opção de trocar música */}
              <div className="text-center pt-4 border-t border-border/30">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload size={16} />
                  Trocar Música
                </Button>
              </div>
            </div>
          ) : (
            /* Área de upload inicial */
            <div className="text-center py-12">
              <div 
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                style={{ backgroundColor: `${accentColor}20` }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={40} style={{ color: accentColor }} />
              </div>
              
              <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                {config.emptyText}
              </p>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                size="lg"
                className="shadow-lg"
                style={{ 
                  background: config.playerGradient,
                  color: 'white'
                }}
              >
                <Upload size={20} className="mr-2" />
                Escolher Música
              </Button>
            </div>
          )}

          {/* Input de arquivo oculto */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleMusicUpload}
            className="hidden"
          />
        </div>
      </Card>
    </div>
  );
};

export default MusicPlayer;