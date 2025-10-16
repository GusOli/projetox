import { useState, useEffect } from 'react';
import { Search, Music, Play, Pause, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

/**
 * Interface para track do Spotify
 */
interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; height: number; width: number }[];
  };
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
}

/**
 * Props do componente
 */
interface SpotifyMusicSelectorProps {
  onMusicSelect: (track: SpotifyTrack) => void;
  selectedTrack?: SpotifyTrack | null;
  theme: 'couple' | 'birthday' | 'corporate';
}

/**
 * Componente para seleção de música via Spotify
 * Simula a integração com a API do Spotify para demo
 */
const SpotifyMusicSelector = ({ 
  onMusicSelect, 
  selectedTrack, 
  theme 
}: SpotifyMusicSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  /**
   * Busca no Spotify usando a API real
   * Para demo, usa dados simulados mais realistas
   */
  const searchSpotify = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 800));

      // Dados simulados mais realistas baseados no tema e query
      const mockResults: SpotifyTrack[] = getMockResults(query, theme);
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Erro ao buscar músicas:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gera resultados simulados baseados na query e tema
   */
  const getMockResults = (query: string, theme: string): SpotifyTrack[] => {
    const baseResults = {
      couple: [
        {
          id: '1',
          name: 'Perfect',
          artists: [{ name: 'Ed Sheeran' }],
          album: {
            name: '÷ (Divide)',
            images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96', height: 300, width: 300 }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/1',
          external_urls: { spotify: 'https://open.spotify.com/track/1' }
        },
        {
          id: '2',
          name: 'All of Me',
          artists: [{ name: 'John Legend' }],
          album: {
            name: 'Love in the Future',
            images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2732c7b0b5b5b5b5b5b5b5b5b5b', height: 300, width: 300 }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/2',
          external_urls: { spotify: 'https://open.spotify.com/track/2' }
        },
        {
          id: '3',
          name: 'A Thousand Years',
          artists: [{ name: 'Christina Perri' }],
          album: {
            name: 'The Twilight Saga: Breaking Dawn - Part 1',
            images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2733c7b0b5b5b5b5b5b5b5b5b5b', height: 300, width: 300 }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/3',
          external_urls: { spotify: 'https://open.spotify.com/track/3' }
        }
      ],
      birthday: [
        {
          id: '4',
          name: 'Happy Birthday',
          artists: [{ name: 'Stevie Wonder' }],
          album: {
            name: 'Hotter Than July',
            images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2734c7b0b5b5b5b5b5b5b5b5b5b', height: 300, width: 300 }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/4',
          external_urls: { spotify: 'https://open.spotify.com/track/4' }
        },
        {
          id: '5',
          name: 'Celebration',
          artists: [{ name: 'Kool & The Gang' }],
          album: {
            name: 'Celebrate!',
            images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2735c7b0b5b5b5b5b5b5b5b5b5b', height: 300, width: 300 }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/5',
          external_urls: { spotify: 'https://open.spotify.com/track/5' }
        },
        {
          id: '6',
          name: 'Birthday',
          artists: [{ name: 'Katy Perry' }],
          album: {
            name: 'Prism',
            images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2736c7b0b5b5b5b5b5b5b5b5b5b', height: 300, width: 300 }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/6',
          external_urls: { spotify: 'https://open.spotify.com/track/6' }
        }
      ],
      corporate: [
        {
          id: '7',
          name: 'Confident',
          artists: [{ name: 'Demi Lovato' }],
          album: {
            name: 'Confident',
            images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2737c7b0b5b5b5b5b5b5b5b5b5b', height: 300, width: 300 }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/7',
          external_urls: { spotify: 'https://open.spotify.com/track/7' }
        },
        {
          id: '8',
          name: 'Stronger',
          artists: [{ name: 'Kelly Clarkson' }],
          album: {
            name: 'Stronger',
            images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2738c7b0b5b5b5b5b5b5b5b5b5b', height: 300, width: 300 }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/8',
          external_urls: { spotify: 'https://open.spotify.com/track/8' }
        },
        {
          id: '9',
          name: 'Unstoppable',
          artists: [{ name: 'Sia' }],
          album: {
            name: 'This Is Acting',
            images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2739c7b0b5b5b5b5b5b5b5b5b5b', height: 300, width: 300 }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/9',
          external_urls: { spotify: 'https://open.spotify.com/track/9' }
        }
      ]
    };

    const themeResults = baseResults[theme as keyof typeof baseResults] || baseResults.couple;
    
    // Filtra resultados baseados na query
    return themeResults.filter(track => 
      track.name.toLowerCase().includes(query.toLowerCase()) ||
      track.artists.some(artist => artist.name.toLowerCase().includes(query.toLowerCase()))
    );
  };

  /**
   * Reproduz preview da música
   */
  const playPreview = (track: SpotifyTrack) => {
    // Para a música atual se estiver tocando
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    if (track.preview_url) {
      const audio = new Audio(track.preview_url);
      setAudioElement(audio);
      setPlayingTrack(track.id);
      
      audio.play().catch(error => {
        console.log('Erro ao reproduzir preview:', error);
        setPlayingTrack(null);
      });

      // Para automaticamente após 30 segundos
      setTimeout(() => {
        audio.pause();
        setPlayingTrack(null);
      }, 30000);
    } else {
      alert('Preview não disponível para esta música');
    }
  };

  /**
   * Para a reprodução atual
   */
  const stopPreview = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    setPlayingTrack(null);
  };

  /**
   * Limpa recursos ao desmontar
   */
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [audioElement]);

  /**
   * Debounce para a busca
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchSpotify(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, theme]);

  /**
   * Configurações por tema
   */
  const getThemeConfig = () => {
    switch (theme) {
      case 'couple':
        return {
          placeholder: 'Procure por música romântica...',
          suggestions: ['Perfect Ed Sheeran', 'All of Me John Legend', 'A Thousand Years'],
          accent: '#ff6b9d'
        };
      case 'birthday':
        return {
          placeholder: 'Procure por música de aniversário...',
          suggestions: ['Happy Birthday', 'Celebration', 'Birthday Katy Perry'],
          accent: '#ffc107'
        };
      case 'corporate':
        return {
          placeholder: 'Procure por música ambiente...',
          suggestions: ['Confident', 'Stronger', 'Unstoppable'],
          accent: '#6366f1'
        };
      default:
        return {
          placeholder: 'Procure por músicas...',
          suggestions: [],
          accent: '#ff6b9d'
        };
    }
  };

  const config = getThemeConfig();

  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2 text-foreground">
        <Music className="w-4 h-4 text-primary" />
        Música de fundo (Spotify)
      </Label>

      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={config.placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background/50 border-border/50 focus:border-primary"
        />
      </div>

      {/* Sugestões rápidas */}
      {!searchQuery && config.suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Sugestões populares:</p>
          <div className="flex flex-wrap gap-2">
            {config.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Música selecionada */}
      {selectedTrack && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{selectedTrack.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedTrack.artists.map(artist => artist.name).join(', ')}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(selectedTrack.external_urls.spotify, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Buscando músicas...</p>
        </div>
      )}

      {/* Resultados da busca */}
      {searchResults.length > 0 && !isLoading && (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          <p className="text-sm text-muted-foreground">Resultados:</p>
          {searchResults.map((track) => (
            <Card 
              key={track.id} 
              className={`p-3 cursor-pointer hover:bg-accent/5 transition-colors ${
                selectedTrack?.id === track.id ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => onMusicSelect(track)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  {track.album.images[0] ? (
                    <img 
                      src={track.album.images[0].url} 
                      alt={track.album.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Music className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{track.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {track.artists.map(artist => artist.name).join(', ')} • {track.album.name}
                  </p>
                  {track.preview_url && (
                    <p className="text-xs text-green-600 mt-1">Preview disponível</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {track.preview_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (playingTrack === track.id) {
                          stopPreview();
                        } else {
                          playPreview(track);
                        }
                      }}
                      className="hover:bg-primary/10"
                    >
                      {playingTrack === track.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(track.external_urls.spotify, '_blank');
                    }}
                    className="hover:bg-primary/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Estado vazio */}
      {searchQuery && searchResults.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <Music className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Nenhuma música encontrada para "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SpotifyMusicSelector;