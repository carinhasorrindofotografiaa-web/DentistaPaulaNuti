import { Zap, Shield, Moon, Activity, AlertCircle, Sparkles, Smile, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

export default function Services() {
  const services = [
    {
      icon: Zap,
      title: 'Laserterapia / Fotobiomodulação',
      description: 'Tratamento avançado e não invasivo indicado para controle de dor aguda e crônica, inflamações, mucosite oral, recuperação nervosa em casos de parestesia, aftas recorrentes, hipersensibilidade dentária e aceleração da cicatrização de tecidos.',
      whatsappMessage: 'Oi, eu quero saber mais sobre laserterapia e fotobiomodulação.',
    },
    {
      icon: Activity,
      title: 'ILIB Terapia',
      description: 'Irradiação de laser intravascular de baixa intensidade, com poderosa ação antioxidante e anti-inflamatória sistêmica. Utilizada como suporte terapêutico em quadros inflamatórios crônicos, doenças autoimunes e para potencializar a recuperação geral do organismo.',
      whatsappMessage: 'Oi, eu quero saber mais sobre ILIB terapia.',
    },
    {
      icon: Moon,
      title: 'Tratamento de Bruxismo',
      description: 'Abordagem completa incluindo confecção de placas acrílicas de alta precisão personalizadas e aplicação de laserterapia para redução efetiva de dor muscular mastigatória, tensão facial, cefaléias tensionais e proteção dos dentes contra desgastes.',
      whatsappMessage: 'Oi, eu quero tratar bruxismo e dor muscular.',
    },
    {
      icon: Shield,
      title: 'Atendimento Odontológico ao Paciente Oncológico',
      description: 'Protocolo completo e especializado que inclui preparo criterioso da cavidade oral antes do início do tratamento oncológico, manejo ativo durante quimioterapia e radioterapia, controle das manifestações orais adversas e acompanhamento completo na fase de recuperação pós-tratamento.',
      whatsappMessage: 'Oi, eu quero atendimento odontológico oncológico.',
    },
    {
      icon: AlertCircle,
      title: 'Remoção Segura de Amálgamas',
      description: 'Protocolo de segurança máxima para remoção de restaurações de amálgama (mercúrio), com equipamentos e técnicas que evitam totalmente a contaminação do paciente por metais pesados, protegendo a saúde sistêmica.',
      whatsappMessage: 'Oi, eu quero remover amálgamas com segurança.',
    },
    {
      icon: Sparkles,
      title: 'Terapia Vibracional Quântica',
      description: 'Terapia complementar integrativa que auxilia no equilíbrio energético, redução de ansiedade, controle do estresse emocional e promoção do bem-estar geral, potencializando os resultados dos tratamentos convencionais.',
      whatsappMessage: 'Oi, eu quero saber mais sobre terapia vibracional quântica.',
    },
    {
      icon: Smile,
      title: 'Clareamento Dental',
      description: 'Procedimento estético seguro e eficaz para recuperar a coloração natural dos dentes ou obter um sorriso mais branco, utilizando técnicas modernas e produtos de alta qualidade.',
      whatsappMessage: 'Oi, eu quero fazer clareamento dental.',
    },

  ];

  return (
    <section id="servicos" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Serviços Especializados
          </h2>
          <p className="text-lg text-muted-foreground">
            Oferecemos um portfólio completo de tratamentos odontológicos avançados, integrando tecnologia de ponta com abordagem humanizada para resultados superiores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border p-6 hover:border-primary/50 transition-all group flex flex-col"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full font-semibold"
                >
                  <a href={createWhatsAppLink(service.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                    Saiba Mais
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
