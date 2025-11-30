import { CheckCircle } from 'lucide-react';

export default function Differentials() {
  const differentials = [
    {
      title: 'Alta competência com especialidade única',
      description: 'Odontologia Oncológica é uma área ainda muito restrita no Brasil. Possuo formação técnica avançada e experiência clínica comprovada no manejo dos efeitos da quimioterapia e radioterapia em todas as fases do tratamento.',
    },
    {
      title: 'Tecnologias Avançadas de Tratamento',
      description: 'Uso clínico especializado de Laserterapia de baixa potência, Fotobiomodulação e ILIB terapia para controle efetivo de dor, inflamação e aceleração da recuperação tecidual e nervosa.',
    },
    {
      title: 'Abordagem Integrativa Oncológica',
      description: 'Visão holística que integra os cuidados odontológicos aos aspectos físicos, emocionais, nutricionais e sistêmicos do paciente oncológico. Tratamento que considera o indivíduo em sua totalidade durante o combate ao câncer.',
    },
    {
      title: 'Protocolos de Segurança Avançados',
      description: 'Protocolos rigorosos e atualizados para procedimentos sensíveis, como remoção segura de amálgamas, evitando a exposição a metais pesados e protegendo a saúde sistêmica.',
    },
    {
      title: 'Tratamento Completo de Bruxismo',
      description: 'Combinação de placas acrílicas personalizadas com precisão e laserterapia terapêutica para alívio imediato e duradouro das dores musculares, tensões e cefaléias associadas.',
    },
    {
      title: 'Acompanhamento Humanizado',
      description: 'Atendimento acolhedor e empático, com foco em reduzir inseguranças, esclarecer dúvidas e aumentar o conforto emocional e físico durante todo o processo terapêutico.',
    },
    {
      title: 'Flexibilidade de Atendimento',
      description: 'Oferecemos tanto atendimento presencial quanto consultas online, adaptando-nos às necessidades e limitações de cada paciente, especialmente aqueles em tratamento oncológico.',
    },

  ];

  return (
    <section id="diferenciais" className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Diferenciais da Nossa Abordagem
          </h2>
          <p className="text-lg text-muted-foreground">
            O que torna nosso atendimento único e capaz de proporcionar resultados significativos na qualidade de vida dos nossos pacientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {differentials.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-border p-6 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
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
