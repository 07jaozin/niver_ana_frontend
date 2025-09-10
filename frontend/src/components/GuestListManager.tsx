import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, UserPlus, Users, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


interface Guest {
  id: string;
  name: string;
}

const MAX_GUESTS = 15;

export default function GuestListManager() {
  
  const [guests, setGuests] = useState<Guest[]>([]);
  useEffect(() => {
    fetch("https://niverana-production.up.railway.app/nomes")
      .then((res) => res.json())
      .then((data: Guest[]) => setGuests(data))
      .catch((err) => console.error("Erro ao buscar convidados:", err));
  }, []);
  const [newGuestName, setNewGuestName] = useState('');
  const { toast } = useToast();

  const addGuest = () => {
    if (!newGuestName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, digite o nome do convidado.",
        variant: "destructive",
      });
      return;
    }

    if (guests.length >= MAX_GUESTS) {
      toast({
        title: "Limite atingido",
        description: `Máximo de ${MAX_GUESTS} convidados permitido.`,
        variant: "destructive",
      });
      return;
    }

    if (guests.some(guest => guest.name.toLowerCase() === newGuestName.toLowerCase())) {
      toast({
        title: "Convidado já existe",
        description: "Este convidado já está na lista.",
        variant: "destructive",
      });
      return;
    }

    const newGuest: Guest = {
      id: Date.now().toString(),
      name: newGuestName.trim(),
    };

    setGuests(prev => [...prev, newGuest]);
    setNewGuestName('');
    
    toast({
      title: "Convidado adicionado!",
      description: `${newGuestName} foi adicionado à lista.`,
    });
  };

  const removeGuest = (guestId: string) => {
    const guest = guests.find(g => g.id === guestId);
    setGuests(prev => prev.filter(g => g.id !== guestId));
    
    if (guest) {
      toast({
        title: "Convidado removido",
        description: `${guest.name} foi removido da lista.`,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addGuest();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <PartyPopper className="h-8 w-8 text-primary animate-glow" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Lista de Convidados
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gerencie os convidados do seu aniversário especial
          </p>
        </div>

        {/* Stats Card */}
        <Card className="p-6 bg-gradient-surface border-border shadow-elegant">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Convidados Confirmados</p>
                <p className="text-3xl font-bold text-foreground">{guests.length}</p>
              </div>
            </div>
            <Badge 
              variant={guests.length >= MAX_GUESTS ? "destructive" : "secondary"}
              className="px-4 py-2 text-sm font-medium"
            >
              {guests.length} / {MAX_GUESTS}
            </Badge>
          </div>
        </Card>

        {/* Add Guest Form */}
        <Card className="p-6 bg-gradient-glass border-border shadow-card backdrop-blur-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Adicionar Convidado
            </h2>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Digite o nome do convidado..."
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-input border-border focus:ring-primary focus:border-primary transition-smooth"
                disabled={guests.length >= MAX_GUESTS}
              />
              <Button 
                onClick={addGuest}
                disabled={guests.length >= MAX_GUESTS}
                className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth"
              >
                Adicionar
              </Button>
            </div>
            {guests.length >= MAX_GUESTS && (
              <p className="text-sm text-destructive">
                Limite máximo de convidados atingido.
              </p>
            )}
          </div>
        </Card>

        {/* Guest List */}
        <Card className="p-6 bg-gradient-glass border-border shadow-card backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Lista de Convidados ({guests.length})
          </h2>
          
          {guests.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg">Nenhum convidado na lista ainda.</p>
              <p className="text-sm text-muted-foreground mt-2">Adicione o primeiro convidado acima!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {guests.map((guest, index) => (
                <div
                  key={guest.id}
                  className="group flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border hover:bg-secondary/70 hover:border-primary/30 transition-smooth animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-glow"></div>
                    <span className="font-medium text-foreground">{guest.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGuest(guest.id)}
                    className="opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive/10 hover:text-destructive p-2 h-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Progress Bar */}
        {guests.length > 0 && (
          <Card className="p-4 bg-gradient-surface border-border shadow-elegant">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progresso da Lista</span>
                <span>{Math.round((guests.length / MAX_GUESTS) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-smooth shadow-glow"
                  style={{ width: `${Math.min((guests.length / MAX_GUESTS) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}