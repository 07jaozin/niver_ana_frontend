import { useEffect, useRef, useState } from 'react';
import { Gift, Music, Cake } from 'lucide-react';
import birthdayCake from '@/assets/aniversario.jpg';

const AboutSection = () => {
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

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-dancing text-4xl md:text-6xl font-bold text-primary mb-4">
            Uma Noite Inesquecível
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Prepare-se para uma festa especial! Ana Julia está completando 17 anos e quer celebrar 
            essa data especial com as pessoas mais importantes da sua vida. Uma noite cheia de 
            música, diversão e momentos únicos espera por você!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative">
              <img 
                src={birthdayCake} 
                alt="Bolo de aniversário elegante" 
                className="rounded-2xl shadow-party w-full object-cover h-96"
              />
              <div className="absolute inset-0 bg-gradient-glow rounded-2xl opacity-20"></div>
            </div>
          </div>

          {/* Features */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-card p-3 rounded-full shadow-party">
                <Music className="w-6 h-6 text-party-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Música e Dança</h3>
                <p className="text-foreground/70">
                  Playlist especial com os hits do momento e clássicos que todo mundo ama!
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-card p-3 rounded-full shadow-party">
                <Cake className="w-6 h-6 text-party-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Delícias Especiais</h3>
                <p className="text-foreground/70">
                  Bolo personalizado, doces irresistíveis e surpresas gastronômicas!
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-card p-3 rounded-full shadow-party">
                <Gift className="w-6 h-6 text-party-silver" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Surpresas Especiais</h3>
                <p className="text-foreground/70">
                  Momentos únicos, jogos divertidos e muitas surpresas durante a noite!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;