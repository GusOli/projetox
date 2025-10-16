import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: "Ana & Carlos",
    type: "Casal",
    rating: 5,
    text: "Incrível! A página ficou linda demais, meu namorado ficou super emocionado. Recomendo muito!",
    avatar: "👩‍❤️‍👨"
  },
  {
    name: "Maria Silva",
    type: "Aniversário",
    rating: 5,
    text: "Fiz uma página de aniversário para minha filha de 15 anos. Ela amou! Ficou tudo perfeito.",
    avatar: "🎂"
  },
  {
    name: "João & Fernanda",
    type: "Casamento",
    rating: 5,
    text: "Usamos para nosso pedido de casamento. A reação dela foi inesquecível! Valeu cada centavo.",
    avatar: "💍"
  },
  {
    name: "Pedro Santos",
    type: "Aniversário",
    rating: 5,
    text: "Página de aniversário para minha mãe de 60 anos. Ela chorou de emoção! Muito obrigado.",
    avatar: "🎈"
  },
  {
    name: "Camila & Rafael",
    type: "Namoro",
    rating: 5,
    text: "Para comemorar 2 anos de namoro. A página ficou romântica e emocionante. Super indico!",
    avatar: "💕"
  },
  {
    name: "Lucas Oliveira",
    type: "Aniversário",
    rating: 5,
    text: "Aniversário de 21 anos do meu irmão. Ele ficou surpreso e todos da família adoraram!",
    avatar: "🎉"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + itemsPerView >= testimonials.length ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [itemsPerView]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= testimonials.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - itemsPerView) : prev - 1
    );
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);
  
  // Se não tiver itens suficientes, completa com itens do início
  if (visibleTestimonials.length < itemsPerView) {
    const needed = itemsPerView - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, needed));
  }

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mais de 40.000 pessoas já criaram momentos especiais com HeartGift. 
            Veja alguns depoimentos reais de quem confia em nós.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${itemsPerView}, 1fr)` }}>
            {visibleTestimonials.map((testimonial, index) => (
              <Card 
                key={`${testimonial.name}-${index}`}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-love transition-all duration-300 animate-fade-in"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-primary">
                      {testimonial.type}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary/10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary/10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerView) === index
                    ? 'bg-primary w-8'
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index * itemsPerView)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 border border-border/50">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
              ))}
            </div>
            <span className="text-foreground font-medium">4.9/5</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">Baseado em +40.000 avaliações</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;