import { Calendar, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary">
                Especialista em Odontologia Integrativa, Oncológica e Laserterapia
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
              Odontologia Integrativa, Oncológica e Tratamentos de ATM
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Cuidado especializado em pacientes oncológicos e pessoas com dores orofaciais como distúrbios na ATM. Uma abordagem integrativa que considera o paciente em sua totalidade: aspectos físicos, emocionais, nutricionais e sistêmicos durante o tratamento.
            </p>

            <div className="space-y-4 p-6 bg-card border border-border">
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Tratamentos Especializados:
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Minimização de efeitos colaterais da quimioterapia e radioterapia</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Redução e controle de dores orofaciais crônicas, como distúrbios na ATM</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Restauração de funções bucais e melhora da qualidade de vida</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="font-semibold text-base h-14"
              >
                <a href={createWhatsAppLink(whatsappMessages.appointment)} target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Avaliação
                </a>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold text-base h-14 border-2"
              >
                <a href={createWhatsAppLink(whatsappMessages.general)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary"></div>
                <span>Atendimento Presencial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary"></div>
                <span>Consultas Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary"></div>
                <span>Todas as Idades</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative border-4 border-primary/20 bg-muted/20">
              <img
                src="https://cdn-ai.onspace.ai/onspace/files/PuqH3ZRCQc825GqtDCaxZ9/Imagem_do_WhatsApp_de_2025-11-25_à(s)_14.46.16_a2a41824.jpg"
                alt="Consultório Odontológico Dra. Paula Nuti Pontes"
                className="w-full h-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating badge */}
            
          </div>
        </div>
      </div>
    </section>
  );
}
