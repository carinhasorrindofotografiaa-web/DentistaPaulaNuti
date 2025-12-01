import { GraduationCap, Award, Heart, Users } from 'lucide-react';

export default function About() {
  const qualifications = [
    'Mestrado em prótese – University of Malaya (Malásia)',
    'Estágio no Hospital Odontológico de Tokyo, no departamento de prótese-buco-maxilo-facial.',
    'Residência em prótese buco-baxilo-facial – FORP/USP',
    'Habilitação em Laserterapia – IALD',
    'Mentoria em Odontologia para pacientes oncológicos – Hospital do Câncer de Ribeirão Preto',
    'Certificação em atendimento odontológico para pacientes oncológicos – ABO',
    'Certificação em Terapia Vibracional Quântica – Faculdade de Pinhais',
  ];

  const highlights = [
    { icon: GraduationCap, text: 'Formação Internacional' },
    { icon: Award, text: 'Especialista Certificada' },
    { icon: Heart, text: 'Abordagem Humanizada' },
    { icon: Users, text: 'Atendimento Integral' },
  ];

  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="container-custom">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-12">
          Quem Sou
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative border-4 border-accent/20 overflow-hidden">
              <img
                src="https://cdn-ai.onspace.ai/onspace/files/Vy745qcAYAgTsxfzEHdd4Z/soueu.jpg"
                alt="Dra. Paula Nuti Pontes"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary p-6 border-4 border-background max-w-xs">
              <p className="text-primary-foreground font-heading font-bold">
                Odontologia com visão integrativa do paciente
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Sou a <strong className="text-foreground">Dra. Paula Nuti Pontes</strong>, dentista especializada em Odontologia Integrativa e Oncológica. Minha atuação vai além dos aspectos técnicos: busco compreender e acolher o paciente em sua totalidade, buscando melhorar a qualidade de vida de pacientes oncológicos e de pacientes que possuem disfunções orofaciais.
                </p>
                <p>
                  No atendimento a pacientes oncológicos, a abordagem integrativa significa considerar não apenas os sintomas bucais, mas também o impacto emocional, nutricional, sistêmico e social que o tratamento oncológico provoca. Trabalho desde o preparo pré-tratamento até a recuperação pós-quimio/radioterapia, incluindo terapias avançadas para bruxismo, parestesia, ansiedade e condições que comprometem alimentação e qualidade de vida.
                </p>
                <p>
                  No tratamento de dores e disfunções orofaciais, também considero uma abordagem holística, incluindo a laserterapia que promove excelentes resultados para a qualidade de vida de pacientes com bruxismo, cefaléias tensionais associadas e outros distúrbios.
                </p>
                <p>
                  Cada paciente é único, e o tratamento deve refletir essa individualidade, sempre baseado em evidências científicas e cuidado genuinamente humanizado.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-4 bg-secondary/50 border border-border">
                    <Icon className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Qualifications */}
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-bold text-foreground">
                Formação e Qualificações
              </h3>
              <ul className="space-y-3">
                {qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <Award className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
