import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'Atende convênio?',
      answer: 'Não atendemos convênios odontológicos. Nosso foco está em oferecer atendimento altamente especializado, com tempo adequado para cada paciente, tecnologias avançadas e abordagem personalizada. Essa qualidade e exclusividade não são viáveis dentro das limitações dos convênios. O investimento no tratamento reflete diretamente na qualidade dos resultados e no seu bem-estar.',
    },
    {
      question: 'O laser dói ou tem contraindicações?',
      answer: 'A laserterapia é indolor, não invasiva e não apresenta contraindicações significativas para a maioria dos pacientes. Em alguns casos específicos, como gestantes ou pacientes com certas condições médicas, é necessária avaliação prévia. O laser é seguro, cientificamente comprovado e amplamente utilizado na medicina e odontologia moderna.',
    },
    {
      question: 'Quantas sessões são necessárias para dor ou parestesia?',
      answer: 'O número de sessões varia conforme a condição individual de cada paciente, intensidade dos sintomas e tempo de evolução do quadro. Em média, casos de dor aguda podem responder em 3 a 6 sessões, enquanto parestesia (dormência) pode requerer 8 a 15 sessões ou mais. Durante a avaliação inicial, apresentamos uma estimativa personalizada baseada no seu caso específico.',
    },
    {
      question: 'O atendimento online substitui a avaliação presencial?',
      answer: 'O atendimento online é eficaz para consultas de orientação, acompanhamento de tratamentos em andamento, esclarecimento de dúvidas e avaliação inicial de certos casos. No entanto, para exames físicos detalhados, procedimentos práticos e diagnósticos precisos, o atendimento presencial é essencial. Avaliamos cada situação individualmente para indicar a melhor modalidade.',
    },
    {
      question: 'Como funciona o suporte durante quimio/radioterapia?',
      answer: 'O suporte odontológico durante o tratamento oncológico envolve avaliação prévia completa, orientações específicas de higiene, aplicação preventiva de laserterapia, monitoramento frequente da saúde bucal e intervenções imediatas em caso de complicações como mucosite, infecções ou xerostomia. O acompanhamento é contínuo e adaptado conforme a evolução do tratamento médico.',
    },
    {
      question: 'O tratamento para bruxismo realmente alivia dor e cefaleias?',
      answer: 'Sim. A combinação de placas acrílicas personalizadas com laserterapia proporciona alívio significativo e comprovado das dores musculares, tensões faciais e cefaléias tensionais associadas ao bruxismo. A placa protege os dentes e reposiciona a mandíbula, enquanto o laser reduz inflamação e relaxa a musculatura. A maioria dos pacientes relata melhora já nas primeiras semanas.',
    },
    {
      question: 'Parestesia oral tem recuperação?',
      answer: 'Sim, muitos casos de parestesia (dormência) oral e facial podem ter recuperação parcial ou total, especialmente quando tratados adequadamente com fotobiomodulação (laserterapia). O laser estimula a regeneração nervosa e melhora a circulação local. Quanto mais precoce o tratamento, maiores as chances de recuperação completa, mas casos crônicos também podem apresentar melhorias significativas.',
    },
    {
      question: 'Como funciona o protocolo para remoção de amálgamas?',
      answer: 'Utilizamos protocolo de segurança que inclui isolamento absoluto do dente, sucção de alta potência, oxigenação adequada e remoção por seções para minimizar a liberação de vapores de mercúrio. Esse protocolo visa proteger o paciente contra a contaminação por metais pesados durante a remoção das restaurações de amálgama.',
    },

  ];

  return (
    <section id="faq" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Esclarecemos as principais dúvidas sobre nossos tratamentos, protocolos e forma de atendimento.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
