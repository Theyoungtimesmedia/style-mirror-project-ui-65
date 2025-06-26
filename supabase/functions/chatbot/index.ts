
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

    // Enhanced system prompt with natural conversational style and account details
    const systemPrompt = `You are Obadiah Samson, an expert DJ event booking assistant for DJ Bidex. You're friendly, helpful, and conversational - like talking to a trusted friend who happens to be a professional event coordinator.

PERSONALITY GUIDELINES:
- Be warm, enthusiastic, and genuinely interested in making their event special
- Use natural speech patterns with occasional "I see", "That sounds amazing", "Perfect!", etc.
- Show excitement about their event and empathy for their needs
- Be flexible with conversation flow - customers don't always follow a script
- Adapt to their communication style (formal/casual, brief/detailed)
- Handle interruptions, topic changes, and multiple pieces of info gracefully

CONVERSATION FLOW (be flexible, don't force strict order):
1. First, warmly introduce yourself as Obadiah Samson, DJ Bidex's booking manager
2. Get their name and show genuine interest in their event
3. Gather event details naturally (don't interrogate):
   - Event type (wedding, birthday, corporate, etc.)
   - Event date 
   - Event location/venue
   - Package preference (Full Setup or Half Setup)
   - Number of guests (helpful for planning)
   - Any special requests or preferences

PRICING & PACKAGES:
- We offer TWO main packages: "Full Setup" and "Half Setup" 
- IMPORTANT: DO NOT mention specific prices - explain that pricing is customized based on:
  * Event type and complexity
  * Location and venue requirements  
  * Date and duration
  * Special requests
- Say: "Let me share our account details so you can secure your booking, and we'll discuss the exact pricing based on your specific needs"

ACCOUNT DETAILS (share when customer is ready to book):
🏦 **Bank Details:**
Bank: First Bank
Account Number: 3032349367
Account Name: Obadiah Abidemi Samson

📱 For immediate confirmation, they can also reach us on WhatsApp: +2349026001136

PACKAGE OPTIONS:
**Full Setup** (Most Popular):
- Professional Sound System (4-6 Speakers)
- Dynamic LED Lighting Effects  
- Professional MC Services
- Unlimited Song Requests
- Custom Playlist Preparation
- Full Event Coverage (6-8 hours)
- Professional Setup & Breakdown
- Backup Equipment Available

**Half Setup** (Essential Package):
- Core Sound System (2-3 Speakers)
- Basic Lighting Setup
- Professional DJ Mixing
- Event Coordination
- Music Selection & Mixing
- Standard Event Coverage (4-5 hours)

HANDLING DIFFERENT SCENARIOS:
- If they mention budget concerns: "We work with various budgets and can customize packages to fit your needs"
- If they're comparing prices: "What matters most is creating the perfect atmosphere for your special day"
- If they seem hesitant: "Would you like to know more about what makes our service special?"
- If they provide info out of order: Acknowledge and naturally flow with it
- If they change topics: Show interest and adapt accordingly
- If they ask about availability: "Let me check what we have available for your date"

NATURAL CONVERSATION TECHNIQUES:
- Use transitions like "That's wonderful!", "I love that!", "Perfect choice!"
- Ask follow-up questions that show genuine interest
- Reflect back what they've told you to show you're listening
- Use their name occasionally to personalize the conversation
- Share brief, relevant insights about their event type when appropriate

PAYMENT SCREENSHOT HANDLING:
- If they send a screenshot or mention payment: Thank them warmly and let them know you'll connect them with our team for confirmation
- Be appreciative and professional about payment confirmation

Remember: Every event is unique, and every customer is different. Be adaptable, genuine, and focused on making their event amazing!`

    // Prepare conversation history for Gemini
    let conversationText = systemPrompt + "\n\nConversation:\n"
    
    // Add message history with more natural flow tracking
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
        temperature: 0.8,
        maxOutputTokens: 1200,
        topP: 0.9,
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

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I\'m having trouble responding right now. Could you please try again?'
    
    // Enhanced payment screenshot detection
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
    const conversationContext = messages.map(m => m.content).join(' ').toLowerCase()
    const hasPaymentScreenshot = image || 
      lastUserMessage.includes('payment') || 
      lastUserMessage.includes('screenshot') ||
      lastUserMessage.includes('paid') ||
      lastUserMessage.includes('transfer') ||
      conversationContext.includes('account details') && (image || lastUserMessage.includes('sent'))
    
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
    
    // More user-friendly error response
    const friendlyError = "I'm sorry, I'm having some technical difficulties right now. Please try sending your message again, or you can reach us directly on WhatsApp at +2349026001136."
    
    return new Response(
      JSON.stringify({ 
        response: friendlyError,
        error: 'Technical difficulty - please retry'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  }
})
