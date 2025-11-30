import { Quote, Star, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Testimonial {
  id: string;
  name: string;
  procedure: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    procedure: '',
    rating: 5,
    comment: ''
  });

  // Fetch approved testimonials
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
        return;
      }

      setTestimonials(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-testimonial', {
        body: formData
      });

      if (error) {
        let errorMessage = error.message;
        if (error instanceof Error && 'context' in error) {
          try {
            const context = (error as any).context;
            if (context && typeof context.text === 'function') {
              const textContent = await context.text();
              errorMessage = textContent || error.message;
            }
          } catch {
            errorMessage = error.message;
          }
        }
        throw new Error(errorMessage);
      }

      toast.success('Depoimento enviado com sucesso! Aguarde aprovação.');
      
      // Reset form
      setFormData({
        name: '',
        procedure: '',
        rating: 5,
        comment: ''
      });

    } catch (error: any) {
      console.error('Error submitting testimonial:', error);
      toast.error(error.message || 'Erro ao enviar depoimento. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="depoimentos" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Depoimentos de Pacientes
          </h2>
          <p className="text-lg text-muted-foreground">
            Histórias reais de pessoas que recuperaram conforto, função e qualidade de vida através dos nossos tratamentos especializados.
          </p>
        </div>

        {/* Testimonials Grid + Form Layout */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 mb-16">
          {/* Testimonials - Left Side */}
          <div>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando depoimentos...</p>
              </div>
            ) : testimonials.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-card border border-border p-6 hover:border-primary/50 transition-all group relative"
                  >
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                    
                    <div className="relative space-y-4">
                      {/* Rating */}
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>

                      {/* Testimonial text */}
                      <p className="text-muted-foreground leading-relaxed italic">
                        "{testimonial.comment}"
                      </p>

                      {/* Author */}
                      <div className="pt-4 border-t border-border">
                        <p className="font-heading font-bold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.procedure}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Seja o primeiro a deixar seu depoimento!</p>
              </div>
            )}
          </div>

          {/* Testimonial Submission Form - Right Side */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-border p-6">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                Deixe seu Depoimento
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Compartilhe sua experiência e ajude outras pessoas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-foreground mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Procedure */}
                <div>
                  <label htmlFor="procedure" className="block text-xs font-medium text-foreground mb-1.5">
                    Procedimento/Tratamento *
                  </label>
                  <input
                    type="text"
                    id="procedure"
                    required
                    value={formData.procedure}
                    onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Ex: Laserterapia"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Avaliação *
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'fill-accent text-accent'
                              : 'text-border'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label htmlFor="comment" className="block text-xs font-medium text-foreground mb-1.5">
                    Seu Depoimento *
                  </label>
                  <textarea
                    id="comment"
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Conte sobre sua experiência..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-semibold"
                >
                  {submitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Depoimento
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Seu depoimento será analisado antes de ser publicado.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
