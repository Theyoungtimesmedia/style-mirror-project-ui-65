
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const { messages, image, conversationId, customerInfo } = await req.json()
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Enhanced system prompt with more detailed information collection
    const systemPrompt = `You are Obadiah Samson, an expert DJ event booking assistant for DJ Bidex. Be helpful, friendly, and conversational.
          
When speaking with customers:
1. First, introduce yourself as Obadiah Samson, DJ Bidex's booking manager
2. Ask for their name if not provided yet
3. Ask about event details in this order:
   - Event type (wedding, birthday party, corporate event, etc.)
   - Event date
   - Event location/venue
   - Setup needed (half setup or full setup)
   - Contact email (optional but helpful)
4. After collecting basic details, ask "Is there anything else I can help you with?"
5. If they say they've completed the payment, ask for a screenshot
6. When a customer has provided all necessary details, share the account details: Bank: GTBank, Account Number: 0123456789, Account Name: DJ Bidex
7. If they mention they've sent payment proof, thank them and let them know you'll redirect them to WhatsApp for confirmation

Remember to sound natural and conversational throughout the interaction. Always be professional and helpful.`

    // Prepare conversation history for Gemini
    let conversationText = systemPrompt + "\n\nConversation:\n"
    
    // Add message history
    messages.forEach((msg, index) => {
      if (msg.role === 'user') {
        conversationText += `Customer: ${msg.content}\n`
      } else if (msg.role === 'assistant') {
        conversationText += `Obadiah: ${msg.content}\n`
      }
    })

    let requestBody = {
      contents: [
        {
          parts: [
            { text: conversationText + "\nObadiah:" }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    }

    // Handle image if provided
    if (image) {
      // Extract base64 data from data URL
      const base64Data = image.split(',')[1]
      const mimeType = image.match(/data:([^;]+);/)?.[1] || 'image/jpeg'
      
      requestBody.contents[0].parts.push({
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      })
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()
    
    if (!response.ok) {
      console.error('Gemini API error:', data)
      return new Response(
        JSON.stringify({ error: 'Failed to get response from Gemini API', details: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t generate a response.'
    
    // Handle payment screenshot case or when conversation seems complete
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
    const hasPaymentScreenshot = image || lastUserMessage.includes('payment') || lastUserMessage.includes('screenshot')
    
    if (hasPaymentScreenshot) {
      return new Response(
        JSON.stringify({ 
          response: aiResponse,
          redirectToWhatsApp: true,
          exportChat: true,
          conversationId: conversationId,
          customerInfo: customerInfo
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        conversationId: conversationId 
      }),
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
