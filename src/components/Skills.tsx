import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Backend',
    icon: '⚡',
    color: 'cyber-blue',
    skills: ['NestJS 11', 'TypeScript', 'FastAPI', 'TypeORM', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'cyber-pink',
    skills: ['React', 'Three.js', 'TailwindCSS', 'GSAP', 'Vite'],
  },
  {
    title: 'Infrastructure',
    icon: '🔧',
    color: 'cyber-purple',
    skills: ['Linux (Ubuntu/Debian)', 'Nginx', 'PM2', 'Docker', 'GitHub Actions', 'AWS'],
  },
  {
    title: 'Cybersec Logic',
    icon: '🔒',
    color: 'cyber-green',
    skills: ['IAM (LDAP/AD)', 'JWT', 'Zod Validation', 'OWASP Top 10', 'SSL/TLS'],
  },
  {
    title: 'Low-Level',
    icon: '🔌',
    color: 'cyber-yellow',
    skills: ['C++ (Embedded)', 'SPI/I2C', 'Klipper Firmware', 'Fusion 360', 'Hardware Optimization'],
  },
  {
    title: 'Tools & Testing',
    icon: '🛠️',
    color: 'cyber-blue',
    skills: ['Jest', 'Swagger/OpenAPI', 'Postman', 'Git'],
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

      // Skill tags animation
      gsap.fromTo(
        '.skill-tag',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      )
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
              <div className="flex flex-wrap gap-2 relative">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`skill-tag px-3 py-1.5 text-sm font-mono bg-${category.color}/10 text-${category.color} border border-${category.color}/20 rounded hover:bg-${category.color}/20 transition-colors`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Corner decoration */}
              <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-${category.color}/20`} />
              <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-${category.color}/20`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
