import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { verifyPassword } from '../_shared/auth.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email e senha são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Buscar admin por email
    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('id, email, password_hash')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return new Response(
        JSON.stringify({ error: 'Credenciais inválidas' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verificar senha
    const isValid = await verifyPassword(password, admin.password_hash);

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Credenciais inválidas' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Gerar token de sessão (simples - pode ser melhorado com JWT)
    const sessionToken = crypto.randomUUID();

    return new Response(
      JSON.stringify({ 
        success: true,
        admin: {
          id: admin.id,
          email: admin.email
        },
        sessionToken
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in admin-login:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
