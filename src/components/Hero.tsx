import { useReducedMotion } from '../hooks/useReducedMotion'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { focusAreas, identity } from '../content/profile'
import { accentBorder, accentText } from '../lib/accents'

// Typewriter component
const Typewriter = ({ text, delay = 0, speed = 30, className = '', onComplete }: {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}) => {
  const reducedMotion = useReducedMotion()
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay, reducedMotion])

  useEffect(() => {
    if (reducedMotion || !started) return
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [displayed, started, text, speed, onComplete, reducedMotion])

  if (reducedMotion) return <span className={className}>{text}</span>
  if (!started) return null
  return <span className={className}>{displayed}</span>
}

// Detect in-app browsers (Messenger, Instagram, Facebook, etc.)
const isInAppBrowser = () => {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || navigator.vendor
  return /FBAN|FBAV|Instagram|Messenger|Twitter|Line|Snapchat|Pinterest/i.test(ua)
}

const Hero = () => {
  const reducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminalReady, setTerminalReady] = useState(false)
  const [showDeer, setShowDeer] = useState(true)

  useEffect(() => {
    if (isInAppBrowser()) {
      setShowDeer(false)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, ctaRef.current, terminalRef.current, ...heroRef.current!.querySelectorAll('.focus-card')], { opacity: 1, clearProps: 'transform' })
        setTerminalReady(true)
        return
      }
      const tl = gsap.timeline({ delay: 0.8 })

      // Badge fade in
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )

      // Glitch effect on title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, skewX: -5 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.2'
      )

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )

      // CTA buttons fade in
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )

      // Focus areas, one card after another
      tl.fromTo(
        '.focus-card',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.12, ease: 'power2.out' },
        '-=0.3'
      )

      // Terminal typing animation
      tl.fromTo(
        terminalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', onComplete: () => setTerminalReady(true) },
        '-=0.1'
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
  }, [reducedMotion])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-12 overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl float-element" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl float-element" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Status badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full opacity-0">
          <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
          <span className="font-mono text-sm text-cyber-green">Build-Test-Deploy</span>
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl mb-6 opacity-0"
        >
          <span className="text-white">WIKTOR</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink">
            JELEŃ
          </span>
        </h1>

        {/* Subtitle — one positioning, one sentence. */}
        <div ref={subtitleRef} className="mb-12 opacity-0">
          <p className="font-mono text-xl md:text-2xl text-cyber-blue mb-4">
            <span className="text-gray-500">{'>'}</span> {identity.role}
          </p>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            {identity.statement}
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-wrap justify-center gap-3 mb-10 opacity-0">
          <a href="#projects" className="w-56 flex items-center justify-center gap-1 px-5 py-3 rounded border border-cyber-blue/50 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 transition-colors">Explore projects <span aria-hidden="true">&darr;</span></a>
          <a href="#contact" className="w-56 flex items-center justify-center px-5 py-3 rounded border border-gray-600 text-gray-200 hover:bg-white/5 transition-colors">Get in touch</a>
        </div>

        {/* Focus areas — what to know in the first five seconds. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 text-left">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className={`focus-card glass rounded-lg p-4 border opacity-0 ${accentBorder[area.accent]}`}
            >
              <h2 className={`font-display font-bold text-sm mb-2 ${accentText[area.accent]}`}>
                {area.title}
              </h2>
              <p className="font-mono text-xs text-gray-400 leading-relaxed">
                {area.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>

        {/* Terminal window */}
        <div
          ref={terminalRef}
          className="hidden lg:block w-full glass rounded-lg overflow-hidden text-left opacity-0"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-cyber-dark border-b border-cyber-blue/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 font-mono text-xs text-gray-500">root@portfolio ~ </span>
          </div>

          {/* Terminal content */}
          <div className={`p-4 md:p-6 font-mono text-sm overflow-x-auto grid ${showDeer ? 'grid-cols-[160px_1fr]' : 'grid-cols-1'} items-stretch gap-6`}>
            {/* ASCII Deer - hidden in WebView in-app browsers */}
            {showDeer && (
            <div aria-hidden="true" className="flex justify-center">
            <pre className="text-cyber-blue text-[3px] leading-none whitespace-pre">{`        +-                                                                              .-
       #%%       =#+                                                          =#-       #%*
      :%@      =%%*                                                            +%%-      %%
      =%%     *@*                                                                *%+     %%-
      =%#    *@*      -+                                                  =:      +%=    %%-
 #%   :%%   .%#     =%%+                                                  *%#:     *%    %@.   %#
 *%    #%+  +%+    *@*                                                      +%=    +%-  *%#   .%*
 +%+   .%%- +%-   -@*                                                        +%-   +%= =%%    *%+
  *%=   .%%*+%+   *%:     %#    #%-                            -%*   -%%:    :%+   +%**%%.   *@#
   *%#    *%%%*   *%.      +%%: #%-     +-              =+     -%* +%%*.     :%*   *%%%*    %@#
    -%%*    *%%+  :%+        *%%%%:    :%*              *#:    -%%%%*        *%=  +%%*    %@%-
      :%%%%-   #%= .%#         #%%:    :%*              *#.    -%%+         %%- +%#   =%%%%:
         .*@%%%%%%%%%%%#=       #%:    :%*              *#.    :%*       +#%%%%%@%%%%@@*.
                .-=*#%%%%%%#*=  -%-    :%*              *#.    -%*  =*#%%%%%%#*=-.
                          -*%%%%#%*    :%+              *#.    +%%%%%%*-
                              :*%%%#:  .%+              *#.  -#%%%*:
                *%%%*+-.         :*%%#--%*              *#--#%%*.         :=+#%%%*
                +%#**%%%%%+:       .*%%%%*              #%%%%*        :*%%%%%**%%=
                -%#.   .=#%%%%+.     -%%%%#.          :%%%%#:     .*%%%%*=.   :%@-
                 #@=       +%%%%%=    =%#*-            :+#%=    =%%%%%+       +@#
                 -%%.        #%%%%#.  :      .=*###+-         :#%%%%#        :%%-
                  =%#         *%%%%#    =%%%%%%%%%%%%%%%%+    #%%%%*        :@%=
                   =%%-        %%%%*  .#%%%%%%%%%%%%%%%%%%%:  #@@@#        +@@=
                    .#%%+       -%#:  =%%%%%%%%%%%%%%%%%%%%=  .##:       *%@#
                      .*%%%#+-       +%%%%%%%%%%%%%%%%%%%%%%+      :+*#%%%*
                          -*%%%%*   #@%%%%%%%%%%%%%%%%%%%%%%%#.  *%%%#=.
                                   #@@%%%%%%%%%%%%%%%%%%%%%%%%#
                                  :%+. .=#%%%%%%%%%%%%%%%=. .+%-
                                  -@+ :-  *%%%%%%%%%%%%*  := =%=
                                  .%#-    .*%%%%%%%%%%#.    -#%:
                                   .#%%%#. =%%%%%%%%%%*  +%%%#:
                                     =%%%= -%%%%%%%%%%= -%@%=
                                     =%%@#+*%%%%%%%%%%#*#@@%=
                                     :%%%%%%%%%%%%%%%%%%%%%@:
                                      +%%%%%%%%%@@@@%%%%%%@*
                                       #%@@@@@%%###%@@@@%@#.
                                   :=   *@@@:        -@@@*   =:
                                   =%=  :%@@:        -@@%:  -%=
                                   =%*   *@@@#+    *#@@@*   +%+
                                   +%%:   .+*#*:  :*##+:   :%%+
                                   +%%+                    *%%+
                                   +%%%=    :*%@@@@@#:    +%%%+
                                   =%%%%*                *%%%%=
                                   :%%%%%%*            =%%%%%%-
                                    #%%%%%%%%=      .#%%%%%%%%
                                    =%%%%%%%%%%%%%%%%%%%%%%%%=
                                     #%%%%%%%%%%%%%%%%%%%%%%#
                                     .%%%%%%%%%%:.%%%%%%%%%%:
                                      :%%%%%%%%#  #%%%%%%%%:
                                       :%%%%%%%%%%%%%%%%%%:
                                        .#%%%%%%%%%%%%%%#.
                                          =%%%%%%%%%%%%+
                                           .*%@@@@@%%#:
                                             :#%@@%#:
                                               .##.`}</pre>
            </div>
            )}

            {terminalReady && (
              <div className="h-full flex flex-col justify-center">
                <div className="text-gray-500">
                  <Typewriter text="$ whoami" delay={100} speed={15} />
                </div>
                <div className="text-cyber-blue mb-4">
                  <Typewriter text="Wiktor_Jelen" delay={250} speed={12} />
                </div>

                <div className="text-gray-500">
                  <Typewriter text="$ cat status.txt" delay={450} speed={15} />
                </div>
                <div className="text-cyber-green mb-4">
                  <Typewriter text={`"${identity.role}"`} delay={700} speed={10} />
                </div>

                <div className="text-gray-500">
                  <Typewriter text="$ ls achievements/" delay={1200} speed={15} />
                </div>
                <div className="text-gray-300 mb-4">
                  <Typewriter text="Backend systems | Open source | Hardware R&D" delay={1500} speed={8} />
                </div>

                <div className="flex items-center text-gray-500">
                  <Typewriter text="$ " delay={2300} speed={30} />
                  <span className="text-cyber-blue cursor-blink">_</span>
                </div>
              </div>
            )}
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
