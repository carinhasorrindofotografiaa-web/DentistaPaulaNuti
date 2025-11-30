import { useState, useEffect } from 'react';
import { Star, Check, X, Lock, Edit2, Save, Trash2, RotateCcw, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Testimonial {
  id: string;
  name: string;
  procedure: string;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
  approved_at?: string;
  rejected_at?: string;
}

type TabType = 'pending' | 'approved' | 'rejected';

const VALID_PASSWORDS = ['paula2025', '2025paula', 'drapaulanuti'];

export default function AdminTestimonials() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', procedure: '', rating: 5, comment: '' });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (isAuthenticated === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchTestimonials(activeTab);
    }
  }, [authenticated, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (VALID_PASSWORDS.includes(password)) {
      setAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      toast.success('Acesso autorizado');
    } else {
      toast.error('Código inválido');
      setPassword('');
    }
  };

  const fetchTestimonials = async (status: TabType) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-testimonials-by-status', {
        body: { status }
      });

      if (error) {
        console.error('Error fetching testimonials:', error);
        toast.error('Erro ao carregar depoimentos');
        return;
      }

      setTestimonials(data?.testimonials || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao carregar depoimentos');
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (id: string, action: 'approve' | 'reject') => {
    setProcessing(id);
    try {
      const { error } = await supabase.functions.invoke('moderate-testimonial', {
        body: { id, action }
      });

      if (error) throw error;

      toast.success(
        action === 'approve' 
          ? 'Depoimento aprovado e publicado!' 
          : 'Depoimento recusado'
      );

      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Erro ao processar depoimento');
    } finally {
      setProcessing(null);
    }
  };

  const handleChangeStatus = async (id: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    setProcessing(id);
    try {
      const { error } = await supabase.functions.invoke('change-testimonial-status', {
        body: { id, status: newStatus }
      });

      if (error) throw error;

      const messages = {
        approved: 'Depoimento reativado e publicado!',
        rejected: 'Depoimento removido da publicação',
        pending: 'Depoimento movido para pendentes'
      };

      toast.success(messages[newStatus]);
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Erro ao alterar status');
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este depoimento permanentemente?')) {
      return;
    }

    setProcessing(id);
    try {
      const { error } = await supabase.functions.invoke('delete-testimonial', {
        body: { id }
      });

      if (error) throw error;

      toast.success('Depoimento excluído permanentemente');
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Erro ao excluir depoimento');
    } finally {
      setProcessing(null);
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setEditForm({
      name: testimonial.name,
      procedure: testimonial.procedure,
      rating: testimonial.rating,
      comment: testimonial.comment
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', procedure: '', rating: 5, comment: '' });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setProcessing(editingId);

    try {
      const { error } = await supabase.functions.invoke('update-testimonial', {
        body: { id: editingId, ...editForm }
      });

      if (error) throw error;

      toast.success('Depoimento atualizado com sucesso');
      setTestimonials(prev => prev.map(t => 
        t.id === editingId ? { ...t, ...editForm } : t
      ));
      cancelEdit();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Erro ao atualizar depoimento');
    } finally {
      setProcessing(null);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setPassword('');
    toast.success('Sessão encerrada');
  };

  if (!authenticated) {
    return (
      <section className="section-padding bg-background min-h-screen flex items-center justify-center">
        <div className="container-custom max-w-md">
          <div className="bg-card border border-border p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                Painel de Moderação
              </h1>
              <p className="text-muted-foreground">
                Área restrita para gerenciamento de depoimentos
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Código de Acesso
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Digite o código"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Acessar
              </Button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background min-h-screen">
      <div className="container-custom max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Gerenciamento de Depoimentos
            </h1>
            <p className="text-muted-foreground">
              Gerencie todos os depoimentos enviados por pacientes
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'pending'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Pendentes
            {activeTab === 'pending' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'approved'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Aprovados
            {activeTab === 'approved' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'rejected'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Recusados
            {activeTab === 'rejected' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando depoimentos...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xl font-medium text-foreground mb-2">
              Nenhum depoimento {activeTab === 'pending' ? 'pendente' : activeTab === 'approved' ? 'aprovado' : 'recusado'}
            </p>
            <Button
              variant="outline"
              onClick={() => fetchTestimonials(activeTab)}
              className="mt-4"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Rating */}
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({testimonial.rating}/5)
                      </span>
                    </div>

                    {/* Comment */}
                    <div>
                      <p className="text-lg text-foreground leading-relaxed italic">
                        "{testimonial.comment}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="pt-4 border-t border-border">
                      {editingId === testimonial.id ? (
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Nome:</label>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full px-3 py-1.5 text-sm border border-border bg-background text-foreground focus:outline-none focus:border-primary mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Procedimento:</label>
                            <input
                              type="text"
                              value={editForm.procedure}
                              onChange={(e) => setEditForm({ ...editForm, procedure: e.target.value })}
                              className="w-full px-3 py-1.5 text-sm border border-border bg-background text-foreground focus:outline-none focus:border-primary mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Avaliação:</label>
                            <div className="flex gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setEditForm({ ...editForm, rating: star })}
                                  className="focus:outline-none"
                                >
                                  <Star
                                    className={`w-5 h-5 ${
                                      star <= editForm.rating
                                        ? 'fill-accent text-accent'
                                        : 'text-border'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Comentário:</label>
                            <textarea
                              value={editForm.comment}
                              onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-1.5 text-sm border border-border bg-background text-foreground focus:outline-none focus:border-primary mt-1 resize-none"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Nome:</span>
                            <p className="font-medium text-foreground mt-1">
                              {testimonial.name}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Procedimento:</span>
                            <p className="font-medium text-foreground mt-1">
                              {testimonial.procedure}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Enviado em:</span>
                            <p className="font-medium text-foreground mt-1">
                              {new Date(testimonial.created_at).toLocaleString('pt-BR')}
                            </p>
                          </div>
                          {testimonial.approved_at && (
                            <div>
                              <span className="text-muted-foreground">Aprovado em:</span>
                              <p className="font-medium text-green-600 mt-1">
                                {new Date(testimonial.approved_at).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          )}
                          {testimonial.rejected_at && (
                            <div>
                              <span className="text-muted-foreground">Recusado em:</span>
                              <p className="font-medium text-red-600 mt-1">
                                {new Date(testimonial.rejected_at).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-3 lg:w-40">
                    {editingId === testimonial.id ? (
                      <>
                        <Button
                          onClick={saveEdit}
                          disabled={processing === testimonial.id}
                          className="flex-1 lg:w-full bg-blue-600 hover:bg-blue-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </Button>
                        <Button
                          onClick={cancelEdit}
                          disabled={processing === testimonial.id}
                          variant="outline"
                          className="flex-1 lg:w-full"
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => startEdit(testimonial)}
                          disabled={processing === testimonial.id}
                          variant="outline"
                          className="flex-1 lg:w-full"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Editar
                        </Button>

                        {/* Pending Actions */}
                        {activeTab === 'pending' && (
                          <>
                            <Button
                              onClick={() => handleModerate(testimonial.id, 'approve')}
                              disabled={processing === testimonial.id}
                              className="flex-1 lg:w-full bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Aprovar
                            </Button>
                            <Button
                              onClick={() => handleModerate(testimonial.id, 'reject')}
                              disabled={processing === testimonial.id}
                              variant="destructive"
                              className="flex-1 lg:w-full"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Recusar
                            </Button>
                          </>
                        )}

                        {/* Approved Actions */}
                        {activeTab === 'approved' && (
                          <>
                            <Button
                              onClick={() => handleChangeStatus(testimonial.id, 'rejected')}
                              disabled={processing === testimonial.id}
                              variant="destructive"
                              className="flex-1 lg:w-full"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </Button>
                          </>
                        )}

                        {/* Rejected Actions */}
                        {activeTab === 'rejected' && (
                          <>
                            <Button
                              onClick={() => handleChangeStatus(testimonial.id, 'approved')}
                              disabled={processing === testimonial.id}
                              className="flex-1 lg:w-full bg-green-600 hover:bg-green-700"
                            >
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Reativar
                            </Button>
                            <Button
                              onClick={() => handleDelete(testimonial.id)}
                              disabled={processing === testimonial.id}
                              variant="destructive"
                              className="flex-1 lg:w-full"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
