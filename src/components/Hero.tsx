import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 })

      // Glitch effect on title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, skewX: -5 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.8, ease: 'power3.out' }
      )

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )

      // Terminal typing animation
      tl.fromTo(
        terminalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyber-purple/20 rounded-full blur-[128px] float-element" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[128px] float-element" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full">
          <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
          <span className="font-mono text-sm text-cyber-green">Available for opportunities</span>
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl mb-6"
        >
          <span className="text-white">WIKTOR</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink">
            JELEŃ
          </span>
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-12">
          <p className="font-mono text-xl md:text-2xl text-gray-400 mb-4">
            <span className="text-cyber-blue">{'>'}</span> System Architect{' '}
            <span className="text-cyber-purple">|</span> Backend Developer{' '}
            <span className="text-cyber-purple">|</span> Cybersec
          </p>
          <p className="font-mono text-sm text-gray-500 max-w-2xl mx-auto">
            High-Velocity Engineering • LLM-Augmented Development • Security by Design
          </p>
        </div>

        {/* Terminal window */}
        <div
          ref={terminalRef}
          className="max-w-2xl mx-auto glass rounded-lg overflow-hidden text-left"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-cyber-dark border-b border-cyber-blue/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 font-mono text-xs text-gray-500">root@portfolio ~ </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm">
            <div className="text-gray-500 mb-2">$ whoami</div>
            <div className="text-cyber-blue mb-4">wiktor_jelen</div>

            <div className="text-gray-500 mb-2">$ cat status.txt</div>
            <div className="text-cyber-green mb-4">
              "Root Access System Architect"
            </div>

            <div className="text-gray-500 mb-2">$ ls achievements/</div>
            <div className="text-gray-300 mb-4">
              <span className="text-cyber-purple">36,000+</span> PyPI downloads •{' '}
              <span className="text-cyber-purple">450+</span> concurrent users handled •{' '}
              <span className="text-cyber-purple">Shenzhen</span> R&D
            </div>

            <div className="flex items-center text-gray-500">
              $ <span className="ml-2 text-cyber-blue cursor-blink">_</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-gray-500">scroll</span>
          <div className="w-6 h-10 border-2 border-cyber-blue/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyber-blue rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-20 left-6 w-20 h-20 border-l-2 border-t-2 border-cyber-blue/20" />
      <div className="absolute top-20 right-6 w-20 h-20 border-r-2 border-t-2 border-cyber-blue/20" />
      <div className="absolute bottom-20 left-6 w-20 h-20 border-l-2 border-b-2 border-cyber-blue/20" />
      <div className="absolute bottom-20 right-6 w-20 h-20 border-r-2 border-b-2 border-cyber-blue/20" />
    </section>
  )
}

export default Hero
