import { useEffect } from 'react'

const CHATBASE_BOT_ID = 'WdNwhF3MOiLX1tKW7eZVJ'

export default function ChatbotWidget() {
  useEffect(() => {
    if (document.getElementById('chatbase-script')) return

    window.embeddedChatbotConfig = {
      chatbotId: CHATBASE_BOT_ID,
      domain: 'www.chatbase.co',
    }

    const script = document.createElement('script')
    script.id = 'chatbase-script'
    script.src = 'https://www.chatbase.co/embed.min.js'
    script.setAttribute('chatbotId', CHATBASE_BOT_ID)
    script.setAttribute('domain', 'www.chatbase.co')
    script.defer = true

    document.body.appendChild(script)
  }, [])

  return null
}
