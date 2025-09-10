import { useEffect, useState } from 'react';
import { Sparkles, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleEffect from './ParticleEffect';
import partyBackground from '@/assets/bg.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp');
    rsvpSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        
      />
      
      {/* Particle Effects */}
      <ParticleEffect />
      
      {/* Hero Content */}
      <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Main Title with Sparkle Animation */}
        <div className="relative mb-6">
          <h1 className="font-dancing text-6xl md:text-8xl font-bold text-primary mb-2">
         A n a <br /> J u l i a
          </h1>
          
        </div>

        {/* Age Display */}
        <div className="inline-block bg-gradient-transparent rounded-full px-8 py-4 mb-6 shadow-party">
          <span className="text-3xl md:text-5xl font-dancing text-primary">1 7    a n o s</span>
          <div className="w-25 h-px bg-gradient-to-r from-transparent to-party-accent"></div>

        </div>

       

        {/* Event Details Cards */}
        
        <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          <div className="bg-gradient-card rounded-lg p-4 shadow-party hover:shadow-glow transition-all duration-300">
            <Calendar className="w-6 h-6 text-party-accent mx-auto mb-2" />
            <p className="text-lg font-semibold">21 de Setembro</p>
            <p className="text-sm text-muted-foreground">2025</p>
          </div>
          
          <div className="bg-gradient-card rounded-lg p-4 shadow-party hover:shadow-glow transition-all duration-300">
            <Clock className="w-6 h-6 text-party-gold mx-auto mb-2" />
            <p className="text-lg font-semibold">19:00h</p>
            <p className="text-sm text-muted-foreground">Horário</p>
          </div>
          
          <div className="bg-gradient-card rounded-lg p-4 shadow-party hover:shadow-glow transition-all duration-300">
            <MapPin className="w-6 h-6 text-party-gold mx-auto mb-2" />
            <p className="text-lg font-semibold">Santomé Bar e Restaurante</p>
            <p className="text-sm text-muted-foreground">Local</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={scrollToRSVP}
          size="lg" 
          className="bg-gradient-button hover:shadow-gold text-white font-semibold text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
        >
          Confirmar Presença 
        </Button>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-4 h-4 bg-party-accent rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{animationDelay: '1s'}}>
        <div className="w-6 h-6 bg-party-gold rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{animationDelay: '2s'}}>
        <div className="w-3 h-3 bg-party-silver rounded-full opacity-50"></div>
      </div>
    </section>
  );
};

export default HeroSection;