
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { messages, image } = await req.json()
    const openAIKey = Deno.env.get('OPENAI_API_KEY')
    
    if (!openAIKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    let requestBody = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are Obadiah Samson, an expert DJ event booking assistant for DJ Bidex. Be helpful, friendly, and conversational.
          
When speaking with customers:
1. Introduce yourself as Obadiah Samson, DJ Bidex's booking manager
2. Ask about event details: date, location, type of event, setup needed (half or full)
3. After collecting details, ask "Is there anything else I can help you with?"
4. If they say they've completed the payment, ask for a screenshot
5. When a customer has provided all necessary details, share the account details: Bank: GTBank, Account Number: 0123456789, Account Name: DJ Bidex
6. If they mention they've sent payment proof, thank them and let them know you'll redirect them to WhatsApp for confirmation

Remember to sound natural and conversational throughout the interaction.`
        },
        ...messages
      ]
    }

    // Handle image if provided
    if (image) {
      const lastMessage = requestBody.messages[requestBody.messages.length - 1]
      if (lastMessage.role === 'user') {
        lastMessage.content = [
          { type: "text", text: lastMessage.content },
          { type: "image_url", image_url: { url: image } }
        ]
      }
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()
    
    // Handle payment screenshot case
    if (data.choices && data.choices[0] && messages.some(m => 
      m.role === 'user' && (
        typeof m.content === 'string' && m.content.toLowerCase().includes('payment') ||
        Array.isArray(m.content) && m.content.some(c => c.type === 'image_url')
      ))) {
      
      return new Response(
        JSON.stringify({ 
          response: data.choices[0].message.content,
          redirectToWhatsApp: true
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ response: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
