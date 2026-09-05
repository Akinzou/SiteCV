import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups, languages } from '../content/profile'
import { accentBorder, accentText } from '../lib/accents'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-title',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 px-6">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16 skills-title">
          <span className="font-mono text-cyber-purple">02.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            Technical_Skills
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-purple/50 to-transparent" />
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className={`skill-card glass rounded-lg p-6 border ${accentBorder[group.accent]} hover-glow`}
            >
              <h3 className={`font-display font-bold text-lg mb-4 ${accentText[group.accent]}`}>
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="px-2.5 py-1 text-xs font-mono text-gray-300 border border-gray-600/40 rounded"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="skill-card glass rounded-lg p-6 border border-gray-600/30">
            <h3 className="font-display font-bold text-lg text-gray-300 mb-4">Languages</h3>
            <ul className="space-y-2">
              {languages.map((language) => (
                <li key={language} className="font-mono text-xs text-gray-400 leading-relaxed">
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
