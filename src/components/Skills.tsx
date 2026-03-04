import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Backend',
    icon: '⚡',
    color: 'cyber-blue',
    skills: [
      { name: 'NestJS 11', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'FastAPI', level: 85 },
      { name: 'TypeORM', level: 85 },
      { name: 'MySQL/PostgreSQL', level: 80 },
    ],
  },
  {
    title: 'Infrastructure',
    icon: '🔧',
    color: 'cyber-purple',
    skills: [
      { name: 'Linux (Ubuntu/Debian)', level: 90 },
      { name: 'Docker', level: 85 },
      { name: 'GitHub Actions (CI/CD)', level: 85 },
      { name: 'Nginx', level: 80 },
      { name: 'AWS', level: 75 },
    ],
  },
  {
    title: 'Cybersec Logic',
    icon: '🔒',
    color: 'cyber-green',
    skills: [
      { name: 'IAM (LDAP/AD)', level: 85 },
      { name: 'JWT Authentication', level: 90 },
      { name: 'Zod Validation', level: 85 },
      { name: 'OWASP Top 10 Audit', level: 80 },
      { name: 'SSL/TLS', level: 80 },
    ],
  },
  {
    title: 'Low-Level',
    icon: '🔌',
    color: 'cyber-pink',
    skills: [
      { name: 'C++ (Embedded)', level: 75 },
      { name: 'SPI/I2C', level: 70 },
      { name: 'Klipper Firmware', level: 85 },
      { name: 'Fusion 360 (CAD)', level: 80 },
      { name: 'Hardware Optimization', level: 80 },
    ],
  },
  {
    title: 'Tools & Testing',
    icon: '🛠️',
    color: 'cyber-yellow',
    skills: [
      { name: 'Jest Testing', level: 85 },
      { name: 'Swagger/OpenAPI', level: 90 },
      { name: 'Postman', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Claude Prompt Engineering', level: 95 },
    ],
  },
]

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title
      gsap.fromTo(
        '.skills-title',
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

      // Skill cards stagger
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      )

      // Skill bars animation
      const skillBars = document.querySelectorAll('.skill-bar-fill')
      skillBars.forEach((bar) => {
        const width = bar.getAttribute('data-width')
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 px-6 bg-cyber-darker"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16 skills-title">
          <span className="font-mono text-cyber-purple">02.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Technical_Specs</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-purple/50 to-transparent" />
        </div>

        {/* Skills grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-card glass rounded-lg p-6 hover-glow relative overflow-hidden group"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-${category.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Card header */}
              <div className="flex items-center gap-3 mb-6 relative">
                <span className="text-2xl">{category.icon}</span>
                <h3 className={`font-display font-bold text-lg text-${category.color}`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-4 relative">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-sm text-gray-300">{skill.name}</span>
                      <span className={`font-mono text-xs text-${category.color}`}>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-cyber-dark rounded-full overflow-hidden">
                      <div
                        className={`skill-bar-fill h-full bg-gradient-to-r from-${category.color} to-${category.color}/50 rounded-full`}
                        data-width={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Corner decoration */}
              <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-${category.color}/20`} />
              <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-${category.color}/20`} />
            </div>
          ))}
        </div>

        {/* Tech stack summary */}
        <div className="mt-16 glass rounded-lg p-8">
          <h3 className="font-display text-xl text-white mb-6 flex items-center gap-3">
            <span className="text-cyber-green">&gt;</span>
            Quick_Reference
          </h3>
          <div className="font-mono text-sm space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-500">const stack = {'{'}</span>
            </div>
            <div className="pl-4 text-gray-300">
              <span className="text-cyber-blue">backend</span>: [<span className="text-cyber-green">"NestJS"</span>, <span className="text-cyber-green">"FastAPI"</span>, <span className="text-cyber-green">"TypeORM"</span>],
            </div>
            <div className="pl-4 text-gray-300">
              <span className="text-cyber-purple">infra</span>: [<span className="text-cyber-green">"Docker"</span>, <span className="text-cyber-green">"Linux"</span>, <span className="text-cyber-green">"GitHub Actions"</span>],
            </div>
            <div className="pl-4 text-gray-300">
              <span className="text-cyber-pink">security</span>: [<span className="text-cyber-green">"LDAP"</span>, <span className="text-cyber-green">"JWT"</span>, <span className="text-cyber-green">"OWASP"</span>],
            </div>
            <div className="pl-4 text-gray-300">
              <span className="text-cyber-yellow">lowLevel</span>: [<span className="text-cyber-green">"C++"</span>, <span className="text-cyber-green">"Klipper"</span>, <span className="text-cyber-green">"Fusion 360"</span>]
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-500">{'}'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
