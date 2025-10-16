import { useState, useEffect } from 'react';
import { Clock, Heart, Gift, Calendar, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * Interface para dados do contador
 */
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Props do componente CountdownWidget
 */
interface CountdownWidgetProps {
  targetDate: string;
  theme: 'couple' | 'birthday' | 'corporate';
  title?: string;
  accentColor?: string;
}

/**
 * Widget de contador regressivo/progressivo
 * Exibe tempo até data especial com design personalizado por tema
 */
const CountdownWidget = ({ 
  targetDate, 
  theme, 
  title = 'Contagem Especial',
  accentColor = '#ff6b9d'
}: CountdownWidgetProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isExpired, setIsExpired] = useState(false);
  const [isPast, setIsPast] = useState(false);

  /**
   * Calcula o tempo restante ou decorrido
   */
  const calculateTime = () => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = Math.abs(target - now);

    if (target < now) {
      setIsPast(true);
    } else {
      setIsPast(false);
    }

    if (difference === 0) {
      setIsExpired(true);
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeRemaining({ days, hours, minutes, seconds });
    setIsExpired(false);
  };

  /**
   * Atualiza o contador a cada segundo
   */
  useEffect(() => {
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  /**
   * Configurações por tema
   */
  const getThemeConfig = () => {
    switch (theme) {
      case 'couple':
        return {
          icon: Heart,
          gradient: `linear-gradient(135deg, ${accentColor}, #ff8fab)`,
          bgGradient: `linear-gradient(135deg, ${accentColor}10, ${accentColor}20)`,
          labels: ['Dias', 'Horas', 'Min', 'Seg'],
          message: isPast ? 'Dias especiais juntos' : 'Dias até nossa data especial',
          celebrationText: '💕 Momento Especial Chegou! 💕'
        };
      case 'birthday':
        return {
          icon: Gift,
          gradient: `linear-gradient(135deg, #ff6b9d, #4ecdc4, #45b7d1)`,
          bgGradient: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(78,205,196,0.1))',
          labels: ['Dias', 'Horas', 'Min', 'Seg'],
          message: isPast ? 'Dias desde o aniversário' : 'Dias para o aniversário',
          celebrationText: '🎉 Parabéns! Feliz Aniversário! 🎂'
        };
      case 'corporate':
        return {
          icon: Calendar,
          gradient: `linear-gradient(135deg, ${accentColor}, #6366f1)`,
          bgGradient: `linear-gradient(135deg, ${accentColor}08, ${accentColor}15)`,
          labels: ['Dias', 'Horas', 'Min', 'Seg'],
          message: isPast ? 'Dias desde o marco' : 'Dias para o evento',
          celebrationText: '🏆 Marco Empresarial Alcançado! 🏆'
        };
      default:
        return {
          icon: Clock,
          gradient: `linear-gradient(135deg, ${accentColor}, #ff8fab)`,
          bgGradient: `linear-gradient(135deg, ${accentColor}10, ${accentColor}20)`,
          labels: ['Dias', 'Horas', 'Min', 'Seg'],
          message: 'Tempo especial',
          celebrationText: '✨ Momento Especial! ✨'
        };
    }
  };

  const config = getThemeConfig();
  const Icon = config.icon;

  /**
   * Componente de unidade de tempo
   */
  const TimeUnit = ({ value, label, delay }: { value: number; label: string; delay: number }) => (
    <div 
      className="flex flex-col items-center animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-xl transition-all duration-300 hover:scale-110"
        style={{ 
          background: config.gradient,
          boxShadow: `0 10px 30px ${accentColor}30`
        }}
      >
        <span className="relative z-10">
          {value.toString().padStart(2, '0')}
        </span>
        
        {/* Efeito de brilho */}
        <div className="absolute inset-1 rounded-xl bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <span className="text-sm sm:text-base text-foreground mt-3 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <Card 
      className="w-full max-w-2xl mx-auto p-8 sm:p-12 relative overflow-hidden border-0 shadow-2xl"
      style={{ 
        background: config.bgGradient,
        boxShadow: `0 25px 80px ${accentColor}20`
      }}
    >
      {/* Efeitos de fundo decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div 
          className="w-full h-full rounded-full animate-pulse"
          style={{ background: config.gradient }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
        <div 
          className="w-full h-full rounded-full animate-pulse"
          style={{ background: config.gradient }}
        />
      </div>

      <div className="text-center relative z-10">
        
        {/* Cabeçalho com ícone */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: config.gradient }}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            {title}
          </h3>
        </div>

        {/* Contador ou celebração */}
        {isExpired ? (
          <div className="py-8">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow"
              style={{ background: config.gradient }}
            >
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h4 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {config.celebrationText}
            </h4>
            <p className="text-lg text-muted-foreground">
              Este momento especial chegou!
            </p>
          </div>
        ) : (
          <>
            {/* Grid do contador */}
            <div className="grid grid-cols-4 gap-4 sm:gap-6 mb-8">
              <TimeUnit 
                value={timeRemaining.days} 
                label={config.labels[0]} 
                delay={0} 
              />
              <TimeUnit 
                value={timeRemaining.hours} 
                label={config.labels[1]} 
                delay={100} 
              />
              <TimeUnit 
                value={timeRemaining.minutes} 
                label={config.labels[2]} 
                delay={200} 
              />
              <TimeUnit 
                value={timeRemaining.seconds} 
                label={config.labels[3]} 
                delay={300} 
              />
            </div>

            {/* Mensagem descritiva */}
            <p className="text-lg text-muted-foreground">
              {timeRemaining.days === 1 
                ? `1 dia ${isPast ? 'desde' : 'para'} ${config.message.split(' ').slice(-1)}`
                : config.message
              }
            </p>

            {/* Data alvo */}
            <div className="mt-6 pt-6 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                Data: {new Date(targetDate).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </>
        )}

      </div>
    </Card>
  );
};

export default CountdownWidget;