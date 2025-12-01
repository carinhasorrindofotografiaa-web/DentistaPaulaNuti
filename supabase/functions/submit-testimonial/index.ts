import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, procedure, rating, comment } = await req.json();

    // Validation
    if (!name || !procedure || !rating || !comment) {
      return new Response(
        JSON.stringify({ error: 'Todos os campos são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({ error: 'Avaliação deve ser entre 1 e 5 estrelas' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role to bypass RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert testimonial
    const { data: testimonial, error: insertError } = await supabase
      .from('testimonials')
      .insert({
        name,
        procedure,
        rating,
        comment,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting testimonial:', insertError);
      return new Response(
        JSON.stringify({ error: 'Erro ao salvar depoimento' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Testimonial created:', testimonial.id);

    // Send approval email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Configuração de email não encontrada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the frontend URL for admin panel
    const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://dentistapaulanuti.onspace.app';
    const adminPanelUrl = `${frontendUrl}/admin`;

    const stars = '⭐'.repeat(rating);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0891b2; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .testimonial { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #0891b2; }
            .actions { text-align: center; margin: 30px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Novo Depoimento Recebido</h1>
            </div>
            <div class="content">
              <p>Um novo depoimento foi enviado e aguarda sua aprovação:</p>
              
              <div class="testimonial">
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Procedimento:</strong> ${procedure}</p>
                <p><strong>Avaliação:</strong> ${stars} (${rating}/5)</p>
                <p><strong>Comentário:</strong></p>
                <p style="font-style: italic; margin-top: 10px;">"${comment}"</p>
              </div>

              <div class="actions">
                <p style="margin-bottom: 10px; font-size: 16px;">
                  Para aprovar ou recusar este depoimento, acesse:
                </p>
                <p style="margin: 20px 0;">
                  <a href="${adminPanelUrl}" style="color: #0891b2; font-weight: bold; font-size: 18px; text-decoration: underline;">
                    ${adminPanelUrl}
                  </a>
                </p>
                <p style="font-size: 14px; color: #666;">
                  Neste painel você pode visualizar e moderar todos os depoimentos pendentes.
                </p>
              </div>
            </div>
            <div class="footer">
              <p>Dra. Paula Nuti Pontes - Odontologia Biológica</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Depoimentos <onboarding@resend.dev>',
        to: 'paulanutipontes@gmail.com',
        subject: `Novo Depoimento: ${name} - ${procedure}`,
        html: emailHtml
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Erro ao enviar email de aprovação' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendData = await resendResponse.json();
    console.log('Email sent via Resend:', resendData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Depoimento enviado com sucesso! Aguarde aprovação.' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in submit-testimonial:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
