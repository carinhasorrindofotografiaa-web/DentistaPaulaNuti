// Edge function para inicializar o admin user
// Execute este endpoint uma vez para criar o usuário admin inicial
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { hashPassword } from '../_shared/auth.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password, initKey } = await req.json();

    // Chave de segurança para garantir que apenas você pode criar o admin
    const INIT_KEY = Deno.env.get('ADMIN_INIT_KEY') || 'paula-admin-init-2025';
    
    if (initKey !== INIT_KEY) {
      return new Response(
        JSON.stringify({ error: 'Chave de inicialização inválida' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

    // Verificar se já existe algum admin
    const { count } = await supabase
      .from('admin_users')
      .select('*', { count: 'exact', head: true });

    if (count && count > 0) {
      return new Response(
        JSON.stringify({ error: 'Já existe um administrador cadastrado' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Criar admin
    const { error } = await supabase
      .from('admin_users')
      .insert({
        email,
        password_hash: passwordHash
      });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Administrador criado com sucesso',
        email
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in admin-init:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao criar administrador' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
