import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../content/profile'

gsap.registerPlugin(ScrollTrigger)

/**
 * Work history lived only in the JSON-LD graph until now — structured data a
 * recruiter never sees. The site claimed the roles to machines and hid them
 * from people.
 */
const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience-title',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.experience-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: '.experience-list', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 px-6 bg-cyber-darker">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-16 experience-title">
          <span className="font-mono text-cyber-purple">02.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Experience_</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-blue/50 to-transparent" />
        </div>

        <div className="experience-list space-y-8">
          {experience.map((role) => (
            <article
              key={`${role.company}-${role.start}`}
              className="experience-item glass rounded-lg p-6 md:p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-transparent" />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                <h3 className="font-display font-bold text-xl text-white">
                  {role.role}
                  {role.project && (
                    <span className="text-cyber-blue font-normal"> — {role.project}</span>
                  )}
                </h3>
                <span className="font-mono text-xs text-cyber-green whitespace-nowrap">
                  {role.period}
                </span>
              </div>

              <p className="font-mono text-sm text-gray-500 mb-4">
                {role.company} · {role.location}
              </p>

              <ul className="space-y-2">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="text-cyber-purple flex-shrink-0">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
