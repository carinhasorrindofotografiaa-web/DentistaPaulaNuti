import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { id, action } = await req.json();

    if (!id || !action) {
      return new Response(
        JSON.stringify({ error: 'Parâmetros inválidos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action !== 'approve' && action !== 'reject') {
      return new Response(
        JSON.stringify({ error: 'Ação inválida' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update testimonial status
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    
    const { error: updateError } = await supabase
      .from('testimonials')
      .update({ status: newStatus })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating testimonial:', updateError);
      return new Response(
        JSON.stringify({ error: 'Erro ao atualizar depoimento' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Testimonial ${id} ${newStatus}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Depoimento ${action === 'approve' ? 'aprovado' : 'recusado'} com sucesso` 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in moderate-testimonial:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
