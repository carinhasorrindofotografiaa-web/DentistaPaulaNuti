import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { hashPassword, generateResetToken } from '../_shared/auth.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token, newPassword, action } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Ação: solicitar reset (enviar email)
    if (action === 'request') {
      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email é obrigatório' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verificar se admin existe
      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('id, email')
        .eq('email', email)
        .single();

      if (error || !admin) {
        // Por segurança, não revelamos se o email existe
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Se o email existir, um código de recuperação será enviado' 
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Gerar token de reset
      const resetToken = generateResetToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // Expira em 1 hora

      // Salvar token
      await supabase
        .from('admin_users')
        .update({
          reset_token: resetToken,
          reset_token_expires: expiresAt.toISOString()
        })
        .eq('id', admin.id);

      // Enviar email com token
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (resendApiKey) {
        const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://dentistapaulanuti.onspace.app';
        const resetLink = `${frontendUrl}/admin?reset=${resetToken}`;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Admin <onboarding@resend.dev>',
            to: email,
            subject: 'Recuperação de Senha - Painel Admin',
            html: `
              <h2>Recuperação de Senha</h2>
              <p>Você solicitou recuperação de senha para o painel administrativo.</p>
              <p>Seu código de recuperação é: <strong>${resetToken}</strong></p>
              <p>Ou acesse diretamente: <a href="${resetLink}">${resetLink}</a></p>
              <p>Este código expira em 1 hora.</p>
            `
          })
        });
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Código de recuperação enviado para seu email' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Ação: resetar senha com token
    if (action === 'reset') {
      if (!token || !newPassword) {
        return new Response(
          JSON.stringify({ error: 'Token e nova senha são obrigatórios' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (newPassword.length < 6) {
        return new Response(
          JSON.stringify({ error: 'Senha deve ter no mínimo 6 caracteres' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Buscar admin com token válido
      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('id, reset_token_expires')
        .eq('reset_token', token)
        .single();

      if (error || !admin) {
        return new Response(
          JSON.stringify({ error: 'Token inválido' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verificar expiração
      if (new Date(admin.reset_token_expires) < new Date()) {
        return new Response(
          JSON.stringify({ error: 'Token expirado' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Hash nova senha
      const newHash = await hashPassword(newPassword);

      // Atualizar senha e limpar token
      await supabase
        .from('admin_users')
        .update({
          password_hash: newHash,
          reset_token: null,
          reset_token_expires: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', admin.id);

      return new Response(
        JSON.stringify({ success: true, message: 'Senha redefinida com sucesso' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Ação inválida' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in admin-reset-password:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao processar recuperação de senha' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
