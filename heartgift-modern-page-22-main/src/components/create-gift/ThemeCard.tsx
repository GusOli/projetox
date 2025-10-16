import { LucideIcon, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeType } from '@/pages/CreateGift';

/**
 * Interface para configuração visual do tema
 */
interface ThemeConfig {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  color: string;
  features: string[];
}

/**
 * Props do componente ThemeCard
 */
interface ThemeCardProps {
  theme: ThemeType;
  config: ThemeConfig;
  onSelect: (theme: ThemeType) => void;
  isSelected?: boolean;
}

/**
 * Card de seleção de tema com preview visual e lista de recursos
 * Exibe as características e funcionalidades de cada tipo de presente
 */
const ThemeCard = ({ theme, config, onSelect, isSelected = false }: ThemeCardProps) => {
  const { title, description, icon: Icon, gradient, color, features } = config;

  /**
   * Manipula a seleção do tema
   */
  const handleSelect = () => {
    onSelect(theme);
  };

  /**
   * Estilo de hover baseado no tema
   */
  const getHoverStyle = () => {
    switch (theme) {
      case 'couple':
        return 'hover:shadow-[0_25px_80px_-12px_hsl(348_83%_47%/0.4)] hover:border-theme-couple/30 hover:bg-theme-couple/5';
      case 'birthday':
        return 'hover:shadow-[0_25px_80px_-12px_hsl(43_96%_56%/0.4)] hover:border-theme-birthday/30 hover:bg-theme-birthday/5';
      case 'corporate':
        return 'hover:shadow-[0_25px_80px_-12px_hsl(239_84%_67%/0.4)] hover:border-theme-corporate/30 hover:bg-theme-corporate/5';
      default:
        return 'hover:shadow-love';
    }
  };

  return (
    <Card className={`
      group relative overflow-hidden transition-all duration-500 cursor-pointer
      hover:scale-[1.02] hover:-translate-y-1
      ${isSelected ? 'ring-2 ring-primary shadow-glow' : getHoverStyle()}
      border-border/50
    `}>
      <div className="relative p-6 h-full">
        
        {/* Gradiente de fundo */}
        <div className={`
          absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300
          ${gradient}
        `} />

        {/* Ícone de hover baseado no tema */}
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto
          bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm
          group-hover:scale-110 transition-all duration-500
          ${theme === 'couple' ? 'group-hover:from-theme-couple/30 group-hover:to-theme-couple/10' :
            theme === 'birthday' ? 'group-hover:from-theme-birthday/30 group-hover:to-theme-birthday/10' :
            'group-hover:from-theme-corporate/30 group-hover:to-theme-corporate/10'}
        `}>
          <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-300`} />
        </div>

        {/* Título e descrição */}
        <div className="text-center mb-6 relative z-10">
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Lista de recursos */}
        <div className="space-y-3 mb-8 relative z-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 text-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Botão de seleção */}
        <Button 
          onClick={handleSelect}
          className={`
            w-full relative z-10 transition-all duration-300
            ${isSelected 
              ? 'bg-primary hover:bg-primary/90' 
              : 'bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary'
            }
          `}
          size="lg"
        >
          {isSelected ? 'Selecionado' : `Escolher ${title}`}
        </Button>

        {/* Efeito de hover decorativo */}
        <div className="
          absolute -top-1/2 -right-1/2 w-full h-full rounded-full 
          bg-gradient-to-br from-primary/5 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
          pointer-events-none
        " />

      </div>
    </Card>
  );
};

export default ThemeCard;