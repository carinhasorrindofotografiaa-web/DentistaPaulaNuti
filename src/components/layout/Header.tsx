import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#especialidade', label: 'Especialidade' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 px-4 md:px-8">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3">
            <img 
              src="https://cdn-ai.onspace.ai/onspace/files/eABBCFi6T7XsxKAcKGLSuK/pasted-image-1764248910730-1.png" 
              alt="Dra. Paula Nuti Pontes - Odontologia Biológica" 
              className="h-28 md:h-30 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              size="lg"
              className="font-semibold"
            >
              <a href={createWhatsAppLink(whatsappMessages.general)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="w-4 h-4 mr-2" />
                Agendar Consulta
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-foreground/80 hover:bg-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 pt-4">
                <Button
                  asChild
                  className="w-full font-semibold"
                >
                  <a href={createWhatsAppLink(whatsappMessages.general)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="w-4 h-4 mr-2" />
                    Agendar Consulta
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
