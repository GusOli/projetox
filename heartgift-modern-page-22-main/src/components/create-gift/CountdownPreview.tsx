import { useState, useEffect } from 'react';
import { Clock, Heart, Gift, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ThemeType } from '@/pages/CreateGift';

/**
 * Interface para os dados do countdown
 */
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Props do componente CountdownPreview
 */
interface CountdownPreviewProps {
  targetDate: string;
  theme: ThemeType;
}

/**
 * Componente de preview do contador regressivo
 * Mostra o tempo restante até a data especial com animações suaves
 */
const CountdownPreview = ({ targetDate, theme }: CountdownPreviewProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isExpired, setIsExpired] = useState(false);

  /**
   * Calcula o tempo restante até a data alvo
   */
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference <= 0) {
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
   * Atualiza o countdown a cada segundo
   */
  useEffect(() => {
    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  /**
   * Configurações visuais baseadas no tema
   */
  const getThemeConfig = () => {
    switch (theme) {
      case 'couple':
        return {
          icon: Heart,
          gradient: 'bg-gradient-primary',
          color: 'text-primary',
          title: 'Contagem do Amor',
          message: 'dias especiais juntos'
        };
      case 'birthday':
        return {
          icon: Gift,
          gradient: 'bg-gradient-hero',
          color: 'text-secondary',
          title: 'Countdown Aniversário',
          message: 'dias para a festa'
        };
      case 'corporate':
        return {
          icon: Calendar,
          gradient: 'bg-gradient-card',
          color: 'text-foreground',
          title: 'Evento Especial',
          message: 'dias para o evento'
        };
      default:
        return {
          icon: Clock,
          gradient: 'bg-gradient-primary',
          color: 'text-primary',
          title: 'Countdown',
          message: 'dias restantes'
        };
    }
  };

  const config = getThemeConfig();
  const Icon = config.icon;

  /**
   * Renderiza um item do contador
   */
  const TimeUnit = ({ value, label, delay }: { value: number; label: string; delay: number }) => (
    <div
      className="flex flex-col items-center animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`
        w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold
        ${config.gradient} text-white shadow-love
        transition-transform duration-300 hover:scale-105
      `}>
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-sm text-muted-foreground mt-2 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="text-center">
        
        {/* Ícone e título */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center
            ${config.gradient} shadow-glow
          `}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            {config.title}
          </h3>
        </div>

        {/* Contador ou mensagem de evento passado */}
        {isExpired ? (
          <div className="text-center py-8">
            <div className={`
              w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
              ${config.gradient} animate-glow
            `}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-2">
              {theme === 'birthday' ? '🎉 Parabéns!' : '💝 Dia Especial!'}
            </h4>
            <p className="text-muted-foreground">
              {theme === 'birthday' 
                ? 'Hoje é o grande dia! Feliz aniversário!' 
                : 'O momento especial chegou!'
              }
            </p>
          </div>
        ) : (
          <>
            {/* Grid do contador */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <TimeUnit value={timeRemaining.days} label="Dias" delay={0} />
              <TimeUnit value={timeRemaining.hours} label="Horas" delay={100} />
              <TimeUnit value={timeRemaining.minutes} label="Min" delay={200} />
              <TimeUnit value={timeRemaining.seconds} label="Seg" delay={300} />
            </div>

            {/* Mensagem descritiva */}
            <p className="text-muted-foreground">
              {timeRemaining.days === 1 ? '1 dia' : `${timeRemaining.days} ${config.message}`}
            </p>
          </>
        )}

        {/* Efeito decorativo de fundo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className={`
            absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-5
            ${config.gradient}
            animate-float
          `} />
        </div>

      </div>
    </Card>
  );
};

export default CountdownPreview;