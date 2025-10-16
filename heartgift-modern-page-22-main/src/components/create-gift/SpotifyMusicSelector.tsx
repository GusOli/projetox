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

  /**
   * Simula busca no Spotify (para demo)
   * Em produção, isso seria uma chamada real para a API do Spotify
   */
  const searchSpotify = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 800));

    // Dados simulados baseados no tema
    const mockResults: SpotifyTrack[] = theme === 'couple' 
      ? [
          {
            id: '1',
            name: 'Perfect',
            artists: [{ name: 'Ed Sheeran' }],
            album: {
              name: '÷ (Divide)',
              images: [{ url: '/placeholder.svg', height: 300, width: 300 }]
            },
            preview_url: null,
            external_urls: { spotify: 'https://open.spotify.com/track/1' }
          },
          {
            id: '2',
            name: 'All of Me',
            artists: [{ name: 'John Legend' }],
            album: {
              name: 'Love in the Future',
              images: [{ url: '/placeholder.svg', height: 300, width: 300 }]
            },
            preview_url: null,
            external_urls: { spotify: 'https://open.spotify.com/track/2' }
          }
        ]
      : theme === 'birthday'
      ? [
          {
            id: '3',
            name: 'Happy Birthday',
            artists: [{ name: 'Stevie Wonder' }],
            album: {
              name: 'Hotter Than July',
              images: [{ url: '/placeholder.svg', height: 300, width: 300 }]
            },
            preview_url: null,
            external_urls: { spotify: 'https://open.spotify.com/track/3' }
          },
          {
            id: '4',
            name: 'Celebration',
            artists: [{ name: 'Kool & The Gang' }],
            album: {
              name: 'Celebrate!',
              images: [{ url: '/placeholder.svg', height: 300, width: 300 }]
            },
            preview_url: null,
            external_urls: { spotify: 'https://open.spotify.com/track/4' }
          }
        ]
      : [
          {
            id: '5',
            name: 'Confident',
            artists: [{ name: 'Demi Lovato' }],
            album: {
              name: 'Confident',
              images: [{ url: '/placeholder.svg', height: 300, width: 300 }]
            },
            preview_url: null,
            external_urls: { spotify: 'https://open.spotify.com/track/5' }
          }
        ];

    setSearchResults(mockResults);
    setIsLoading(false);
  };

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
              className="p-3 cursor-pointer hover:bg-accent/5 transition-colors"
              onClick={() => onMusicSelect(track)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{track.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {track.artists.map(artist => artist.name).join(', ')} • {track.album.name}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Aqui seria implementado o player de preview
                    console.log('Play preview:', track.name);
                  }}
                >
                  <Play className="w-4 h-4" />
                </Button>
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