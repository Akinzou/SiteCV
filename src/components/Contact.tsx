import { useEffect, useRef, useState, FormEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      render: (container: HTMLElement | string, options: object) => number
      reset: (widgetId?: number) => void
      getResponse: (widgetId?: number) => string
    }
  }
}

const RECAPTCHA_SITE_KEY = '6LdT0IAsAAAAAFZHPTnmC7uCm0jLyoM-NBAK2D8v'

const contactInfo = [
  {
    icon: '📍',
    label: 'Location',
    value: 'Cracow, Poland',
    href: null,
  },
  {
    icon: '📄',
    label: 'Resume',
    value: 'Download CV',
    href: '/CV_WiktorJelen.pdf',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/Akinzou',
    href: 'https://github.com/Akinzou',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'wiktor-jelen',
    href: 'https://www.linkedin.com/in/wiktor-jelen-8a658b293/',
  },
  {
    icon: '📧',
    label: 'Email',
    value: 'root@yelon.pro',
    href: 'mailto:root@yelon.pro',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+48 576 706 766',
    href: 'tel:+48576706766',
  },
]

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const recaptchaWidgetId = useRef<number | null>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    website: ''
  })
  const [formTimestamp] = useState(() => Date.now())
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '$ Establishing secure connection...',
    '$ Connection established.',
    '$ Ready to receive transmission.',
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  // Render reCAPTCHA widget
  useEffect(() => {
    const renderRecaptcha = () => {
      if (recaptchaRef.current && recaptchaWidgetId.current === null) {
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: 'dark',
        })
      }
    }

    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(renderRecaptcha)
    } else {
      // Fallback: wait for script to load
      const checkInterval = setInterval(() => {
        if (window.grecaptcha?.ready) {
          clearInterval(checkInterval)
          window.grecaptcha.ready(renderRecaptcha)
        }
      }, 100)
      return () => clearInterval(checkInterval)
    }
  }, [])

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(true)
      setTerminalLines((prev) => [...prev, `$ Email copied to clipboard: ${email}`])
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const handleCopyPhone = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone)
      setCopiedPhone(true)
      setTerminalLines((prev) => [...prev, `$ Phone number copied to clipboard: ${phone}`])
      setTimeout(() => setCopiedPhone(false), 2000)
    } catch (err) {
      console.error('Failed to copy phone:', err)
    }
  }

  const handleCardClick = (label: string, value: string, href: string | null) => {
    switch (label) {
      case 'Location':
        setTerminalLines((prev) => [...prev, `$ Location: ${value}`])
        break
      case 'Resume':
        setTerminalLines((prev) => [...prev, `$ Downloading CV...`, `$ File: CV_WiktorJelen.pdf`])
        break
      case 'GitHub':
        setTerminalLines((prev) => [...prev, `$ Redirecting to GitHub: ${href}`])
        break
      case 'LinkedIn':
        setTerminalLines((prev) => [...prev, `$ Redirecting to LinkedIn profile...`])
        break
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title
      gsap.fromTo(
        '.contact-title',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      // Contact cards
      gsap.fromTo(
        '.contact-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 85%',
          },
        }
      )

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Get reCAPTCHA response
    const recaptchaResponse = recaptchaWidgetId.current !== null
      ? window.grecaptcha?.getResponse(recaptchaWidgetId.current)
      : window.grecaptcha?.getResponse()
    if (!recaptchaResponse) {
      setTerminalLines((prev) => [...prev, `$ Error: Please complete the CAPTCHA verification`])
      return
    }

    setIsSubmitting(true)

    setTerminalLines((prev) => [...prev, `$ Sending message from ${formState.name}...`])

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          website: formState.website,
          timestamp: formTimestamp,
          recaptcha: recaptchaResponse,
        }),
      })

      if (response.ok) {
        setTerminalLines((prev) => [
          ...prev,
          `$ Message transmitted successfully.`,
          `$ Recipient: root@yelon.pro`,
          `$ Status: DELIVERED`,
        ])
        setFormState({ name: '', email: '', message: '', website: '' })
        if (recaptchaWidgetId.current !== null) window.grecaptcha?.reset(recaptchaWidgetId.current)
      } else {
        const error = await response.json()
        setTerminalLines((prev) => [
          ...prev,
          `$ Error: ${error.detail || 'Failed to send message'}`,
          `$ Status: FAILED`,
        ])
        if (recaptchaWidgetId.current !== null) window.grecaptcha?.reset(recaptchaWidgetId.current)
      }
    } catch {
      setTerminalLines((prev) => [
        ...prev,
        `$ Error: Network error`,
        `$ Status: FAILED`,
      ])
      if (recaptchaWidgetId.current !== null) window.grecaptcha?.reset(recaptchaWidgetId.current)
    }

    setIsSubmitting(false)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6 bg-cyber-darker"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16 contact-title">
          <span className="font-mono text-cyber-purple">04.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Contact_</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-pink/50 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Contact info */}
          <div>
            <p className="text-gray-400 mb-8 max-w-md">
              I'm currently open to new opportunities and interesting projects.
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>

            {/* Contact cards */}
            <div className="contact-grid grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {contactInfo.map((item) => {
                if (item.label === 'Email') {
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleCopyEmail(item.value)}
                      className="contact-card glass rounded-lg p-4 hover-glow transition-all cursor-pointer text-left relative"
                      data-cursor-hover
                    >
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <span className="font-mono text-xs text-gray-500 block">{item.label}</span>
                      <span className="font-mono text-sm text-cyber-blue block">{item.value}</span>
                      {copiedEmail && (
                        <span className="absolute top-2 right-2 font-mono text-xs text-cyber-green bg-cyber-dark/90 px-2 py-1 rounded">
                          Copied!
                        </span>
                      )}
                    </button>
                  )
                }
                if (item.label === 'Phone') {
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleCopyPhone(item.value)}
                      className="contact-card glass rounded-lg p-4 hover-glow transition-all cursor-pointer text-left relative"
                      data-cursor-hover
                    >
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <span className="font-mono text-xs text-gray-500 block">{item.label}</span>
                      <span className="font-mono text-sm text-cyber-blue block">{item.value}</span>
                      {copiedPhone && (
                        <span className="absolute top-2 right-2 font-mono text-xs text-cyber-green bg-cyber-dark/90 px-2 py-1 rounded">
                          Copied!
                        </span>
                      )}
                    </button>
                  )
                }
                if (item.label === 'Location') {
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleCardClick(item.label, item.value, item.href)}
                      className="contact-card glass rounded-lg p-4 hover-glow transition-all cursor-pointer text-left"
                      data-cursor-hover
                    >
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <span className="font-mono text-xs text-gray-500 block">{item.label}</span>
                      <span className="font-mono text-sm text-cyber-blue block">{item.value}</span>
                    </button>
                  )
                }
                return (
                  <a
                    key={item.label}
                    href={item.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCardClick(item.label, item.value, item.href)}
                    className="contact-card glass rounded-lg p-4 hover-glow transition-all cursor-pointer"
                    data-cursor-hover
                  >
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <span className="font-mono text-xs text-gray-500 block">{item.label}</span>
                    <span className="font-mono text-sm text-cyber-blue block">{item.value}</span>
                  </a>
                )
              })}
            </div>

            {/* Terminal output */}
            <div className="glass rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-cyber-dark border-b border-cyber-blue/10">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-2 font-mono text-xs text-gray-500">contact_log.sh</span>
              </div>
              <div className="p-4 font-mono text-xs h-40 overflow-y-auto">
                {terminalLines.map((line, index) => (
                  <div
                    key={index}
                    className={`mb-1 ${
                      line.includes('successfully') || line.includes('DELIVERED') || line.includes('copied')
                        ? 'text-cyber-green'
                        : line.includes('Sending') || line.includes('Downloading')
                        ? 'text-cyber-yellow'
                        : line.includes('Redirecting')
                        ? 'text-cyber-blue'
                        : line.includes('Location')
                        ? 'text-cyber-purple'
                        : 'text-gray-400'
                    }`}
                  >
                    {line}
                  </div>
                ))}
                <span className="text-cyber-blue cursor-blink">_</span>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="glass rounded-lg p-8">
              <h3 className="font-display text-xl text-white mb-6 flex items-center gap-2">
                <span className="text-cyber-green">&gt;</span>
                Send_Message()
              </h3>

              <div className="space-y-6">
                <input
                  type="text"
                  name="website"
                  value={formState.website}
                  onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                  className="absolute -left-[9999px] opacity-0 h-0 w-0"
                  tabIndex={-1}
                  autoComplete="off"
                />
                {/* Name input */}
                <div>
                  <label className="font-mono text-sm text-gray-400 block mb-2">
                    <span className="text-cyber-purple">const</span> name <span className="text-gray-500">=</span>
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full bg-cyber-dark border border-cyber-blue/20 rounded px-4 py-3 font-mono text-sm text-white focus:border-cyber-blue focus:outline-none transition-colors"
                    placeholder='"Your Name"'
                  />
                </div>

                {/* Email input */}
                <div>
                  <label className="font-mono text-sm text-gray-400 block mb-2">
                    <span className="text-cyber-purple">const</span> email <span className="text-gray-500">=</span>
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full bg-cyber-dark border border-cyber-blue/20 rounded px-4 py-3 font-mono text-sm text-white focus:border-cyber-blue focus:outline-none transition-colors"
                    placeholder='"your@email.com"'
                  />
                </div>

                {/* Message input */}
                <div>
                  <label className="font-mono text-sm text-gray-400 block mb-2">
                    <span className="text-cyber-purple">string</span> message <span className="text-gray-500">=</span>
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-cyber-dark border border-cyber-blue/20 rounded px-4 py-3 font-mono text-sm text-white focus:border-cyber-blue focus:outline-none transition-colors resize-none"
                    placeholder='"Your message here..."'
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <div ref={recaptchaRef} />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple font-display font-bold text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50 relative overflow-hidden group"
                  data-cursor-hover
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Transmitting...' : 'Execute send()'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple to-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Form footer */}
              <p className="font-mono text-xs text-gray-500 mt-4 text-center">
                // All transmissions are encrypted and secure
              </p>
            </form>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="font-mono text-gray-500 mb-4">
            Prefer a direct approach?
          </p>
          <button
            onClick={() => handleCopyEmail('root@yelon.pro')}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-cyber-blue text-cyber-blue font-display font-bold text-lg hover:bg-cyber-blue/10 transition-colors rounded gradient-border relative"
            data-cursor-hover
          >
            <span>root@yelon.pro</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copiedEmail && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-sm text-cyber-green bg-cyber-dark/90 px-3 py-1 rounded whitespace-nowrap">
                Copied to clipboard!
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact
