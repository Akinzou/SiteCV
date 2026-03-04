import { useEffect, useRef, useState, FormEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: '📍',
    label: 'Location',
    value: 'Kraków, Poland',
    href: null,
  },
  {
    icon: '📄',
    label: 'Resume',
    value: 'Download CV',
    href: '/List_WiktorJelenCV_merged.pdf',
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
    value: 'wiktorjn@gmail.com',
    href: 'mailto:wiktorjn@gmail.com',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+48 798 859 023',
    href: 'tel:+48798859023',
  },
]

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '$ Establishing secure connection...',
    '$ Connection established.',
    '$ Ready to receive transmission.',
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)

    // Simulate form submission with terminal output
    setTerminalLines((prev) => [...prev, `$ Sending message from ${formState.name}...`])

    // In production, replace with actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setTerminalLines((prev) => [
      ...prev,
      `$ Message transmitted successfully.`,
      `$ Recipient: wiktorjn@gmail.com`,
      `$ Status: DELIVERED`,
    ])

    setIsSubmitting(false)
    setFormState({ name: '', email: '', message: '' })
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
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href || '#'}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`contact-card glass rounded-lg p-4 hover-glow transition-all ${
                    item.href ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  data-cursor-hover
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="font-mono text-xs text-gray-500 block">{item.label}</span>
                  <span className="font-mono text-sm text-cyber-blue block">{item.value}</span>
                </a>
              ))}
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
                      line.includes('successfully') || line.includes('DELIVERED')
                        ? 'text-cyber-green'
                        : line.includes('Sending')
                        ? 'text-cyber-yellow'
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
                    <span className="text-cyber-purple">const</span> message <span className="text-gray-500">=</span>
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
          <a
            href="mailto:wiktorjn@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-cyber-blue text-cyber-blue font-display font-bold text-lg hover:bg-cyber-blue/10 transition-colors rounded gradient-border"
            data-cursor-hover
          >
            <span>wiktorjn@gmail.com</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
