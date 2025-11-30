import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const action = url.searchParams.get('action');

    if (!id || !action) {
      return new Response(
        'Parâmetros inválidos',
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    if (action !== 'approve' && action !== 'reject') {
      return new Response(
        'Ação inválida',
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } }
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
        renderResponsePage(false, action),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    console.log(`Testimonial ${id} ${newStatus}`);

    return new Response(
      renderResponsePage(true, action),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } }
    );

  } catch (error) {
    console.error('Error in approve-testimonial:', error);
    return new Response(
      renderResponsePage(false, 'error'),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
});

function renderResponsePage(success: boolean, action: string): string {
  const isApprove = action === 'approve';
  
  if (!success) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Erro</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              margin: 0;
              background: #f3f4f6;
            }
            .container { 
              background: white; 
              padding: 40px; 
              border-radius: 10px; 
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
            }
            .icon { font-size: 60px; margin-bottom: 20px; }
            h1 { color: #ef4444; margin-bottom: 10px; }
            p { color: #666; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">⚠️</div>
            <h1>Erro</h1>
            <p>Não foi possível processar sua solicitação. Por favor, tente novamente ou entre em contato com o suporte.</p>
          </div>
        </body>
      </html>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${isApprove ? 'Depoimento Aprovado' : 'Depoimento Recusado'}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            margin: 0;
            background: #f3f4f6;
          }
          .container { 
            background: white; 
            padding: 40px; 
            border-radius: 10px; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
          }
          .icon { font-size: 60px; margin-bottom: 20px; }
          h1 { color: ${isApprove ? '#10b981' : '#6b7280'}; margin-bottom: 10px; }
          p { color: #666; line-height: 1.6; }
          .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 30px;
            background: #0891b2;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">${isApprove ? '✅' : '🚫'}</div>
          <h1>${isApprove ? 'Depoimento Aprovado!' : 'Depoimento Recusado'}</h1>
          <p>
            ${isApprove 
              ? 'O depoimento foi aprovado e agora está visível na seção de depoimentos do site.'
              : 'O depoimento foi recusado e não será publicado no site.'
            }
          </p>
          <p style="margin-top: 20px; font-size: 14px; color: #999;">
            Você pode fechar esta janela.
          </p>
        </div>
      </body>
    </html>
  `;
}
