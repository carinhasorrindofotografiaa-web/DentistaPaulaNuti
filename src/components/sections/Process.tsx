import { Search, ClipboardList, Sparkles, UserCheck } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Avaliação Inicial',
      description: 'Consulta presencial ou online com análise detalhada da queixa principal, histórico clínico completo, exame físico e identificação de todas as necessidades do paciente.',
    },
    {
      icon: ClipboardList,
      number: '02',
      title: 'Plano de Tratamento Individualizado',
      description: 'Desenvolvimento de um protocolo personalizado considerando dor, rotina diária, fase do tratamento oncológico (quando aplicável), necessidades complementares e objetivos específicos do paciente.',
    },
    {
      icon: Sparkles,
      number: '03',
      title: 'Aplicação das Terapias',
      description: 'Realização das sessões de laserterapia, ILIB, confecção e ajuste de placas para bruxismo, manejo integrativo e todos os procedimentos planejados com técnica e cuidado.',
    },
    {
      icon: UserCheck,
      number: '04',
      title: 'Acompanhamento Contínuo',
      description: 'Monitoramento regular dos sintomas, avaliação de resultados, ajustes periódicos no plano terapêutico para garantir maior conforto, eficácia e satisfação do paciente.',
    },
  ];

  return (
    <section id="processo" className="section-padding bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Processo de Atendimento
          </h2>
          <p className="text-lg text-muted-foreground">
            Um fluxo estruturado e personalizado que garante o melhor resultado possível em cada etapa do seu tratamento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-6 z-0"></div>
                )}
                
                <div className="relative bg-card border border-border p-6 hover:border-primary/50 transition-all group h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-4xl font-heading font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
