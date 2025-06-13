
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatEmailRequest {
  customerName: string
  customerEmail?: string
  eventType?: string
  eventDate?: string
  eventLocation?: string
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: string
  }>
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { customerName, customerEmail, eventType, eventDate, eventLocation, messages }: ChatEmailRequest = await req.json()

    // Format the chat conversation
    let chatHistory = `<h2>Chat Conversation with ${customerName}</h2>\n`
    
    if (customerEmail) chatHistory += `<p><strong>Customer Email:</strong> ${customerEmail}</p>\n`
    if (eventType) chatHistory += `<p><strong>Event Type:</strong> ${eventType}</p>\n`
    if (eventDate) chatHistory += `<p><strong>Event Date:</strong> ${eventDate}</p>\n`
    if (eventLocation) chatHistory += `<p><strong>Event Location:</strong> ${eventLocation}</p>\n`
    
    chatHistory += `<br><h3>Chat Messages:</h3>\n<div style="font-family: monospace; background: #f5f5f5; padding: 15px; border-radius: 5px;">\n`

    messages.forEach((msg) => {
      const role = msg.role === 'user' ? customerName : 'Obadiah (DJ Bidex Bot)'
      const bgColor = msg.role === 'user' ? '#e3f2fd' : '#f3e5f5'
      chatHistory += `
        <div style="margin: 10px 0; padding: 10px; background: ${bgColor}; border-radius: 5px;">
          <strong>${role}:</strong> ${msg.content}<br>
          <small style="color: #666;">${new Date(msg.timestamp).toLocaleString()}</small>
        </div>\n`
    })

    chatHistory += `</div>\n<br><p>This chat conversation was automatically exported from the DJ Bidex chatbot system.</p>`

    const emailResponse = await resend.emails.send({
      from: "DJ Bidex Chatbot <onboarding@resend.dev>",
      to: ["deejaybidexx@gmail.com"],
      subject: `New Chat Conversation with ${customerName}`,
      html: chatHistory,
    })

    console.log("Chat email sent successfully:", emailResponse)

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Error in send-chat-email function:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    )
  }
})
