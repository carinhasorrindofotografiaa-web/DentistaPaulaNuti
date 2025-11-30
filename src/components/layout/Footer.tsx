import { MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

export default function Footer() {
  const address = 'Avenida Independência, 3181 - Sala 4, Ribeirão Preto - SP';
  const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.2!2d-47.8!3d-21.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzEyLjAiUyA0N8KwNDgnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890';

  return (
    <footer id="contato" className="bg-foreground text-background">
      {/* Map Section */}
      <div className="w-full h-[400px] bg-muted">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da clínica"
          className="grayscale hover:grayscale-0 transition-all duration-300"
        ></iframe>
      </div>

      {/* Footer Content */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About */}
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-bold">
                Dra. Paula Nuti Pontes
              </h3>
              <p className="text-background/80 leading-relaxed">
                Especialista em Odontologia Oncológica e Integrativa, oferecendo cuidado humanizado e tratamentos avançados para pacientes que necessitam de atenção especializada.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-bold">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-background/80 hover:text-background transition-colors">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{address}</span>
                </li>
                <li className="flex items-center gap-3 text-background/80 hover:text-background transition-colors">
                  <Clock className="w-5 h-5 shrink-0" />
                  <span>Segunda a sexta, 9h às 17h30</span>
                </li>
                <li className="flex items-center gap-3 text-background/80 hover:text-background transition-colors">
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <a href={createWhatsAppLink(whatsappMessages.general)} target="_blank" rel="noopener noreferrer">
                    (16) 98181-1616
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-bold">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#especialidade" className="text-background/80 hover:text-background transition-colors">
                    Especialidade
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="text-background/80 hover:text-background transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="text-background/80 hover:text-background transition-colors">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="#depoimentos" className="text-background/80 hover:text-background transition-colors">
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-background/80 hover:text-background transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & CTA */}
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-bold">Redes Sociais</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/drapaulanutipontes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/drapaulanuti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <Button
                asChild
                variant="secondary"
                className="w-full font-semibold mt-6 bg-background text-foreground hover:bg-background/90"
              >
                <a href={createWhatsAppLink(whatsappMessages.appointment)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-4 h-4 mr-2" />
                  Agendar Agora
                </a>
              </Button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/60 text-sm">
            <p>
              © {new Date().getFullYear()} Dra. Paula Nuti Pontes - Odontologia Oncológica e Integrativa. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
