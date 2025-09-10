import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Shirt, Camera, Music2, Utensils } from 'lucide-react';
import { Card } from '@/components/ui/card';
import mapa from '@/assets/santome.png'; 
import { Heart, Instagram, Music, Share2 } from 'lucide-react';
import partyBackground from '@/assets/bg.jpg';


const EventDetailsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const details = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localização",
      description: "Santomé Bar e Restaurante",
      info: "Perto da UNIP e do Shopping Jaraguá",
      color: "text-party-accent"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horário",
      description: "A partir das 19:30",
      info: "Chegue pontualmente para não perder nenhum momento especial!",
      color: "text-party-gold"
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Alimentação",
      description: "Jantar e Doces Inclusos",
      info: "Menu especial com opções deliciosas para todos os gostos.",
      color: "text-party-gold"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Fotos & Vídeos",
      description: "Photographer Profissional",
      info: "Todos os momentos especiais serão registrados para a posteridade!",
      color: "text-party-silver"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-party-primary/30">
      <div className="max-w-6xl mx-auto">
      <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-party-accent"></div>
          <Heart className="w-6 h-6 text-red-400 animate-pulse" />
          <div className="w-16 h-px bg-gradient-to-r from-party-accent to-transparent"></div>
        </div>
        <br />

        {/* Map Placeholder */}
        <div className={`mt-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Card className="bg-gradient-card border-party-accent/20 shadow-party p-8 text-center">
            <MapPin className="w-12 h-12 text-party-accent mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Localização Exata</h3>
          
            <div className="bg-muted/20 rounded-lg h-64 flex items-center justify-center">
            <img 
            src={mapa}
            alt="Mapa do evento" 
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={() => {
              window.open("https://maps.app.goo.gl/4b9R8KWwUTgeRvyJ7", "__blank")
            }}
    />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;