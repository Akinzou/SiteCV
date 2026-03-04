import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// Typewriter component
const Typewriter = ({ text, delay = 0, speed = 30, className = '', onComplete }: {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}) => {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [displayed, started, text, speed, onComplete])

  if (!started) return null
  return <span className={className}>{displayed}</span>
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminalReady, setTerminalReady] = useState(false)

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
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', onComplete: () => setTerminalReady(true) },
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
            <span className="text-cyber-purple">|</span> Fullstack Developer{' '}
            <span className="text-cyber-purple">|</span> Cybersec
          </p>
          <p className="font-mono text-sm text-gray-500 max-w-2xl mx-auto">
            High-Velocity Engineering • LLM Development • Security by Design
          </p>
        </div>

        {/* Terminal window */}
        <div
          ref={terminalRef}
          className="max-w-4xl mx-auto glass rounded-lg overflow-hidden text-left"
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
            {/* ASCII Deer */}
            <div className="flex justify-center mb-4">
            <pre className="text-cyber-blue text-[5px] md:text-[7px] leading-none whitespace-pre">{`        +-                                                                              .-
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

            {terminalReady && (
              <>
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
                  <Typewriter text='"Backend Architect & Systems Engineer"' delay={700} speed={10} />
                </div>

                <div className="text-gray-500">
                  <Typewriter text="$ ls achievements/" delay={1200} speed={15} />
                </div>
                <div className="text-gray-300 mb-4">
                  <Typewriter text="36,000+ PyPI downloads • 450+ concurrent users • Shenzhen R&D" delay={1500} speed={8} />
                </div>

                <div className="flex items-center text-gray-500">
                  <Typewriter text="$ " delay={2300} speed={30} />
                  <span className="text-cyber-blue cursor-blink">_</span>
                </div>
              </>
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
