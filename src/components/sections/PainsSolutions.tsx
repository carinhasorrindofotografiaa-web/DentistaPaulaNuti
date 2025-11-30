import { AlertTriangle, ArrowRight } from 'lucide-react';

export default function PainsSolutions() {
  const painsSolutions = [
    {
      pain: 'Dificuldade para se alimentar',
      solution: 'Laserterapia avançada para tratamento de mucosite oral, xerostomia (boca seca) e dor orofacial cronicas e agudas, além de protocolos específicos para recuperar completamente o conforto oral e a capacidade de alimentação.',
    },
    {
      pain: 'Sono ruim, ansiedade e dores de cabeça',
      solution: 'Abordagem integrativa combinando terapias de relaxamento, confecção de placas personalizadas para bruxismo e laserterapia nas regiões dolorosas, promovendo alívio profundo e duradouro.',
    },
    {
      pain: 'Dor nos maxilares / dor orofacial crônicas e agudas / zumbido',
      solution: 'Laserterapia direcionada para músculos da mastigação, ajuste funcional oclusal e terapias integrativas para restaurar o equilíbrio e eliminar a dor e o desconforto auditivo.',
    },
    {
      pain: 'Disgeusia (perda ou alteração do paladar)',
      solution: 'Fotobiomodulação direcionada e específica para estimulação das papilas gustativas e nervos sensoriais, promovendo a restauração gradual da percepção do sabor.',
    },
    {
      pain: 'Parestesia (dormência facial ou oral)',
      solution: 'Laserterapia especializada — uma das únicas alternativas terapêuticas comprovadamente eficazes, inclusive em casos prolongados e resistentes, estimulando a recuperação nervosa e sensorial.',
    },
    {
      pain: 'Alterações orais causadas por quimioterapia e radioterapia',
      solution: 'Protocolo completo e específico para prevenção e tratamento de mucosite, gengivites, trismo (limitação de abertura bucal), úlceras recorrentes, língua ardente e outras complicações associadas.',
    },
    {
      pain: 'Insegurança por não atender convênios médicos',
      solution: 'Nosso foco está na qualidade técnica, proximidade humana, diagnóstico preciso e experiência altamente especializada, proporcionando resultados superiores que justificam o investimento no seu bem-estar.',
    },
  ];

  return (
    <section id="dores-solucoes" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Dores e Soluções
          </h2>
          <p className="text-lg text-muted-foreground">
            Identificamos suas principais queixas e apresentamos soluções especializadas baseadas em evidências científicas e experiência clínica comprovada.
          </p>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {painsSolutions.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-border hover:border-primary/50 transition-all group"
            >
              <div className="grid md:grid-cols-5 gap-6 p-6">
                {/* Pain */}
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                    <span className="text-xs font-semibold text-destructive uppercase tracking-wider">
                      Problema
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground">
                    {item.pain}
                  </h3>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
                </div>

                {/* Solution */}
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-primary flex items-center justify-center shrink-0">
                      <ArrowRight className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Solução
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
