import { Sparkles, Shield, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

export default function MainSpecialty() {
  const specialties = [
    {
      icon: Shield,
      title: 'Preparo e Acompanhamento Oncológico',
      description: 'Preparação completa da cavidade oral antes, durante e após quimioterapia e radioterapia para prevenir e minimizar complicações.',
    },
    {
      icon: Heart,
      title: 'Manejo de Manifestações Orais',
      description: 'Tratamento especializado de mucosite, disgeusia, xerostomia, trismo, gengivites, úlceras recorrentes e outras condições relacionadas ao tratamento oncológico.',
    },
    {
      icon: Zap,
      title: 'Tratamento de dores na ATM e disfunções orofaciais',
      description: 'Abordagem eficaz para bruxismo, dor nos maxilares (DTM), dores de cabeça tensionais e zumbido relacionado a problemas orais.',
    },
    {
      icon: Sparkles,
      title: 'Abordagem Integrativa Avançada',
      description: 'Integração de laserterapia de baixa potência, fotobiomodulação, ILIB terapia e terapias complementares para resultados superiores.',
    },
  ];

  return (
    <section id="especialidade" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-heading font-bold text-foreground mb-6">
            Tratamentos para ATM | Tratamentos para Oncológicos | Odonto Integrativa
          </h2>
          <p className="text-lg text-muted-foreground">
            Abordagem especializada que integra cuidados odontológicos técnicos com visão holística do paciente, considerando os impactos físicos, emocionais e sistêmicos do tratamento. Prevenção, minimização e tratamento de manifestações orais com terapias avançadas e acolhimento humanizado.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border p-8 hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                  {specialty.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {specialty.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="font-semibold text-base h-14"
          >
            <a href={createWhatsAppLink(whatsappMessages.oncology)} target="_blank" rel="noopener noreferrer">
              <Heart className="w-5 h-5 mr-2" />
              Saber Mais Sobre Os Tratamentos
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
