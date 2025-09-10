import { Heart, Instagram, Music, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import partyBackground from '@/assets/bg.jpg';


const Footer = () => {
  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Aniversário Ana Julia - 17 anos',
        text: 'Você está convidado para o aniversário da Ana Julia!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <footer className="py-16 px-4 border-t border-party-accent/20">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Main Message */}
        <div className="mb-12">
          <h3 className="font-dancing text-3xl md:text-4xl font-bold text-primary mb-4">
            Esperamos você para tornar esse dia inesquecível!
          </h3>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
           
          </p>
        </div>

        {/* Social Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={shareEvent}
            className="border-party-accent/30 hover:bg-party-accent/10 hover:border-party-accent"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar Convite
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-party-gold/30 hover:bg-party-gold/10 hover:border-party-gold"
            onClick={() => {
              window.open("https://www.instagram.com/ana_casthro?igsh=MWwxZXBneGR0MDM0cw==", "__blank");
              }}
          >
            <Instagram className="w-5 h-5 mr-2" />
            Siga ana_casthro
          </Button>
          
          
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-party-accent"></div>
          <Heart className="w-6 h-6 text-red-400 animate-pulse" />
          <div className="w-16 h-px bg-gradient-to-r from-party-accent to-transparent"></div>
        </div>

        {/* Event Info Summary */}
        <div className="bg-gradient-card rounded-lg p-6 shadow-party mb-8 max-w-md mx-auto">
          <h4 className="font-semibold text-lg mb-2">Lembrete:</h4>
          <p className="text-sm text-foreground/70">
            <strong>Data:</strong> 21 de Setembro de 2025<br />
            <strong>Horário:</strong> 19:00h<br />
         
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm text-muted-foreground">
          
          <p className="mt-2">© 2025 - Convite Digital Especial</p>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute bottom-10 left-10 animate-float opacity-60">
          <div className="w-2 h-2 bg-party-accent rounded-full"></div>
        </div>
        <div className="absolute bottom-16 right-16 animate-float opacity-40" style={{animationDelay: '1s'}}>
          <div className="w-3 h-3 bg-party-gold rounded-full"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;