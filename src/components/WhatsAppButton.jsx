import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WhatsAppButton = ({ phoneNumber = '+1234567890', message = 'Hello! I would like to know more about SeerahVerse Academia courses.' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! 👋 Welcome to SeerahVerse Academia. How can we help you today?',
      sender: 'organization',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Simulate organization response
    setTimeout(() => {
      const responses = [
        'Thank you for your interest! 🎓 You can explore our courses to learn more.',
        'How can I help you?',
        'Great question! Let me help you with that. 😊',
        'I\'ll connect you with our team shortly. Please hold on!',
        'You can also visit our website for more information.',
        'Is there anything else I can help you with?',
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const orgMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'organization',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, orgMessage])
    }, 1000)
  }

  const handleOpenWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message + '\n\n(This conversation was initiated from SeerahVerse Academia)'
    )}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-white/10 flex flex-col h-96 sm:h-[500px]"
          >
            {/* Chat Header */}
            <div className="bg-[var(--color-whatsapp)] text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">
                  💬
                </div>
                <div>
                  <h3 className="font-bold">SeerahVerse Support</h3>
                  <p className="text-xs text-white/80">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[var(--color-bg)]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-[var(--color-whatsapp)] text-white rounded-br-none'
                        : 'bg-white/10 text-[var(--color-text-primary)] rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-[var(--color-text-muted)]'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-white/10 bg-[var(--color-surface)] rounded-b-2xl space-y-2">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-whatsapp)] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--color-whatsapp)] text-white rounded-lg hover:bg-[var(--color-whatsapp-hover)] transition-colors font-semibold text-sm"
                >
                  Send
                </button>
              </form>

              <button
                onClick={handleOpenWhatsApp}
                className="w-full py-2 bg-gradient-to-r from-[var(--color-whatsapp)] to-[var(--color-whatsapp-hover)] text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                📱 Open WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-whatsapp)] shadow-soft hover:shadow-lg transition-shadow duration-300"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <span className="text-white text-xl">✕</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        )}
      </motion.button>
    </>
  )
}

export default WhatsAppButton


