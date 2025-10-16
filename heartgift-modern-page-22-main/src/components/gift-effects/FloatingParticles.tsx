import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

/**
 * Interface para uma partícula flutuante individual
 */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  color: string;
  type: string;
  animationDelay: number;
}

/**
 * Props do componente FloatingParticles
 */
interface FloatingParticlesProps {
  type?: 'hearts' | 'confetti' | 'particles' | 'multicolor';
  color?: string;
  density?: number;
}

/**
 * Componente de partículas flutuantes animadas aprimorado
 * 
 * Cria efeitos visuais imersivos de fundo com diferentes tipos de partículas:
 * - hearts: corações românticos para temas de casais
 * - confetti: confetes coloridos para celebrações de aniversário
 * - particles: partículas abstratas para temas corporativos
 * - multicolor: mix de cores vibrantes
 * 
 * Performance otimizada com CSS animations e controle de densidade
 */
const FloatingParticles = ({ 
  type = 'hearts', 
  color = '#ff6b9d',
  density = 20 
}: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  /**
   * Gera partículas otimizadas baseadas no tipo
   */
  useEffect(() => {
    const generateParticles = () => {
      const particleArray: Particle[] = [];
      const colors = getParticleColors(type, color);
      
      for (let i = 0; i < density; i++) {
        particleArray.push({
          id: i,
          x: Math.random() * 100, // Posição X em porcentagem
          y: 100 + Math.random() * 20, // Começa abaixo da tela
          size: getParticleSize(type),
          speed: 0.5 + Math.random() * 1.5, // Velocidade variável
          opacity: 0.4 + Math.random() * 0.6,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: getParticleSymbol(type),
          animationDelay: Math.random() * 10 // Delay inicial variável
        });
      }
      
      setParticles(particleArray);
    };

    generateParticles();
  }, [type, color, density]);

  /**
   * Define cores baseadas no tipo de partícula
   */
  const getParticleColors = (particleType: string, baseColor: string): string[] => {
    switch (particleType) {
      case 'hearts':
        return [baseColor, '#ff8fab', '#ff4569', '#e91e63', '#f06292'];
      case 'confetti':
      case 'multicolor':
        return ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a8e6cf', '#ff8a80'];
      case 'particles':
        return [baseColor, `${baseColor}cc`, `${baseColor}99`, `${baseColor}66`];
      default:
        return [baseColor];
    }
  };

  /**
   * Define tamanho da partícula baseado no tipo
   */
  const getParticleSize = (particleType: string): number => {
    switch (particleType) {
      case 'hearts':
        return 12 + Math.random() * 20; // 12-32px
      case 'confetti':
      case 'multicolor':
        return 6 + Math.random() * 12; // 6-18px
      case 'particles':
        return 3 + Math.random() * 8; // 3-11px
      default:
        return 16;
    }
  };

  /**
   * Retorna símbolo/emoji para cada tipo de partícula
   */
  const getParticleSymbol = (particleType: string): string => {
    switch (particleType) {
      case 'hearts':
        return Math.random() > 0.7 ? '💕' : '💖'; // Varia entre dois tipos de coração
      case 'confetti':
      case 'multicolor':
        const confettiSymbols = ['🎊', '🎉', '✨', '⭐', '💫', '🌟', '🎈', '🎁'];
        return confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
      case 'particles':
        return '●'; // Círculo simples
      default:
        return '✨';
    }
  };

  /**
   * Renderiza uma partícula individual com otimizações
   */
  const renderParticle = (particle: Particle) => {
    // Para corações, usa ícone do Lucide com animações suaves
    if (type === 'hearts') {
      return (
        <Heart
          size={particle.size}
          className="drop-shadow-sm"
          style={{ 
            color: particle.color,
            fill: particle.color,
            opacity: particle.opacity,
            filter: `blur(0.3px) brightness(1.1)`,
            transform: `rotate(${particle.rotation}deg)`
          }}
        />
      );
    }
    
    // Para partículas abstratas (corporativo)
    if (type === 'particles') {
      return (
        <div
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size}px ${particle.color}40`,
            transform: `rotate(${particle.rotation}deg) scale(${0.8 + Math.sin(Date.now() * 0.001) * 0.2})`
          }}
        />
      );
    }
    
    // Para confetes e símbolos emoji
    return (
      <span 
        style={{
          fontSize: `${particle.size}px`,
          opacity: particle.opacity,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          transform: `rotate(${particle.rotation}deg) scale(${0.9 + Math.sin(Date.now() * 0.002 + particle.id) * 0.1})`,
          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          color: type === 'multicolor' || type === 'confetti' ? particle.color : color
        }}
      >
        {particle.type}
      </span>
    );
  };

  /**
   * CSS animations otimizadas para melhor performance
   */
  const getParticleAnimationStyle = (particle: Particle): React.CSSProperties => ({
    position: 'absolute',
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    animation: `
      particleFloat ${15 + particle.id % 10}s linear infinite,
      particleTwinkle ${3 + particle.id % 3}s ease-in-out infinite,
      particleRotate ${20 + particle.id % 15}s linear infinite
    `,
    animationDelay: `${particle.animationDelay}s, ${particle.animationDelay * 0.5}s, 0s`,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    perspective: '1000px'
  });

  return (
    <>
      {/* Container otimizado das partículas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ perspective: '1000px' }}>
        <style>{`
          @keyframes particleFloat {
            0% { transform: translateY(100vh) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-20vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
          }
          
          @keyframes particleTwinkle {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          
          .particle-item {
            position: absolute;
            will-change: transform, opacity;
            backface-visibility: hidden;
          }
        `}</style>
        
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle-item"
            style={getParticleAnimationStyle(particle)}
          >
            {renderParticle(particle)}
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingParticles;