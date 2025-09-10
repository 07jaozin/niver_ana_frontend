import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { CheckCircle, Heart, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import partyBackground from '@/assets/bg.jpg';


const RSVPSection = () => {
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Por favor, digite seu nome",
        description: "Precisamos saber quem está confirmando presença!",
        variant: "destructive",
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch("https://niveranabackend-production.up.railway.app/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao confirmar presença");
      }
  
      const data = await response.json();
  
      setIsSubmitted(true);
      toast({
        title: "Presença confirmada! 🎉",
        description: `Obrigado, ${data.name}! Estamos ansiosos para comemorar com você!`,
      });
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Não foi possível confirmar sua presença. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  if (isSubmitted) {
    return (
      <section id="rsvp" ref={sectionRef} className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-gradient-card border-party-accent/20 shadow-glow p-8">
            <div className="animate-fade-in-up">
              <CheckCircle className="w-16 h-16 text-party-accent mx-auto mb-4 animate-bounce" />
              <h3 className="font-dancing text-3xl font-bold text-primary mb-4">
                Presença Confirmada!
              </h3>
              <p className="text-lg text-foreground/80 mb-6">
                Obrigada por confirmar, <span className="text-party-accent font-semibold">{name}</span>! 
                Estamos ansiosos para comemorar com você essa data especial!
              </p>
              <div className="flex justify-center space-x-2">
                <Heart className="w-6 h-6 text-red-400 animate-bounce" style={{animationDelay: '0.2s'}} />
                <Sparkles className="w-6 h-6 text-party-gold animate-bounce" style={{animationDelay: '0.4s'}} />
                <Heart className="w-6 h-6 text-red-400 animate-bounce" style={{animationDelay: '0.6s'}} />
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" ref={sectionRef} className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-dancing text-4xl md:text-6xl font-bold text-primary mb-4">
            Confirme sua Presença
          </h2>
          
        </div>

        <Card className={`bg-gradient-card border-party-accent/20 shadow-party hover:shadow-glow transition-all duration-500 p-8 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                Seu nome completo
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome aqui..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input border-border focus:border-party-accent focus:ring-party-accent/20 text-lg p-4 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-gradient-button hover:shadow-gold text-primary-foreground font-semibold text-lg py-4 rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Confirmando...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Confirmar Presença
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            *Caso queira cancelar sua presença, me chame no privado
          </p>
        </Card>
      </div>
    </section>
  );
};

export default RSVPSection;