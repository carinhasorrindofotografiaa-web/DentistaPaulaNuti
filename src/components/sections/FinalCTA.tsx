
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

export default function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary to-accent relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground leading-tight">
            Recupere Conforto, Função e Qualidade de Vida
          </h2>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
            Um atendimento especializado, integral e genuinamente acolhedor está à sua disposição. Dê o primeiro passo para transformar sua saúde bucal e bem-estar geral.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="font-semibold text-base h-14 bg-background text-primary hover:bg-background/90 border-0"
            >
              <a href={createWhatsAppLink(whatsappMessages.appointment)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Agendar sua Consulta Agora
              </a>
            </Button>
            
            <Button
              asChild
              size="lg"
              className="font-semibold text-base h-14 bg-transparent border-2 border-background text-background hover:bg-background/10"
            >
              <a href={createWhatsAppLink(whatsappMessages.general)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Tirar Dúvidas no WhatsApp
              </a>
            </Button>
          </div>

          <div className="pt-8 space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
              <WhatsAppIcon className="w-5 h-5" />
              <span className="font-semibold text-lg">WhatsApp: (16) 98181-1616</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Respondemos rapidamente e estamos prontos para ajudar você
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
