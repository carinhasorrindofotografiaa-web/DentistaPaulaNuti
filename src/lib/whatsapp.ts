const WHATSAPP_NUMBER = '5516981811616';

export const createWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const whatsappMessages = {
  general: 'Oi, eu quero agendar uma consulta.',
  oncology: 'Oi, eu quero saber mais sobre odontologia oncológica.',
  laser: 'Oi, eu quero saber mais sobre laserterapia.',
  bruxism: 'Oi, eu quero tratar bruxismo.',
  pain: 'Oi, eu quero tratar dores orofaciais.',
  appointment: 'Oi, eu quero agendar uma avaliação.',
};
