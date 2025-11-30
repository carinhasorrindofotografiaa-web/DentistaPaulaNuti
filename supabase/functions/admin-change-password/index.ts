import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { hashPassword, verifyPassword } from '../_shared/auth.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, currentPassword, newPassword } = await req.json();

    if (!email || !currentPassword || !newPassword) {
      return new Response(
        JSON.stringify({ error: 'Todos os campos são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (newPassword.length < 6) {
      return new Response(
        JSON.stringify({ error: 'Nova senha deve ter no mínimo 6 caracteres' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Buscar admin
    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('id, password_hash')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return new Response(
        JSON.stringify({ error: 'Usuário não encontrado' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verificar senha atual
    const isValid = await verifyPassword(currentPassword, admin.password_hash);

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Senha atual incorreta' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Hash nova senha
    const newHash = await hashPassword(newPassword);

    // Atualizar senha
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({ 
        password_hash: newHash,
        updated_at: new Date().toISOString()
      })
      .eq('id', admin.id);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Senha alterada com sucesso' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in admin-change-password:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao alterar senha' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
