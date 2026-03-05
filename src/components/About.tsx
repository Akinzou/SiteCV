import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 36000, suffix: '+', label: 'PyPI Downloads', color: 'cyber-blue' },
  { value: 450, suffix: '+', label: 'Concurrent Users', color: 'cyber-purple' },
  { value: 4, suffix: '+', label: 'Years Experience', color: 'cyber-green' },
]

const education = [
  {
    period: '10.2024 – Present',
    degree: 'B.Eng. in Computer Science, Cybersecurity',
    school: 'WSB National Louis University',
    location: 'Kraków, Poland',
  },
  {
    period: 'Completed',
    degree: 'Mechatronics Technician',
    school: 'Technical School of Electrical Engineering and Mechanics',
    location: 'Nowy Sącz, Poland',
  },
]

const experience = [
  {
    period: '09.2025 – 02.2026',
    title: 'System Architect',
    company: 'Randlab Software (Anatomy Project)',
    location: 'Remote',
    description: 'Backend architecture for 450+ concurrent users. NestJS 11, LDAP auth, OWASP audits, CI/CD pipelines.',
    tech: ['NestJS', 'TypeORM', 'MySQL', 'JWT', 'GitHub Actions'],
  },
  {
    period: '08.2024 – 08.2025',
    title: 'R&D Systems Engineer',
    company: 'GEEETECH',
    location: 'Shenzhen, China / Remote',
    description: 'Hardware enhancement & firmware optimization. Bridge between EU standards and Chinese R&D velocity.',
    tech: ['Klipper', 'Fusion 360', 'C++', 'Linux'],
  },
  {
    period: '04.2023 – 07.2024',
    title: 'Sales Systems Consultant',
    company: 'Randlab Software (Polsat Plus Group)',
    location: 'Remote',
    description: 'Automated documentation generation for POS, telemarketing, and mobile sales channels.',
    tech: ['Automation', 'Documentation', 'Sales Systems'],
  },
  {
    period: '09.2022 – 03.2023',
    title: 'Embedded / Thingsboard Specialist',
    company: 'Randlab Software',
    location: 'Nowy Sącz, Poland',
    description: 'Pipe impedance monitoring system for heating industry. Hardware-web integration with AWS alerting.',
    tech: ['ThingsBoard', 'C++', 'AWS', 'IoT'],
  },
]

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        '.about-title',
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

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-value')
      statElements?.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-value') || '0')
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
            },
          }
        )
      })

      // Timeline items stagger
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
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
      id="about"
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16 about-title">
          <span className="font-mono text-cyber-purple">01.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">About_Me</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-blue/50 to-transparent" />
        </div>

        {/* Worked with */}
        <div className="mb-12">
          <p className="font-mono text-xs text-gray-500 text-center mb-6">WORKED WITH</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="group flex flex-col items-center">
              <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">GEEETECH</span>
              <span className="font-mono text-xs text-gray-500">Shenzhen R&D</span>
            </div>
            <div className="group flex flex-col items-center">
              <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-purple transition-colors">POLSAT PLUS</span>
              <span className="font-mono text-xs text-gray-500">Cyfrowy Polsat Group</span>
            </div>
            <div className="group flex flex-col items-center">
              <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">RANDLAB</span>
              <span className="font-mono text-xs text-gray-500">Software House</span>
            </div>
          </div>
        </div>

        {/* Recommendation section */}
        <div className="glass rounded-lg p-8 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-purple via-cyber-blue to-transparent" />
          <div className="flex items-start gap-4">
            <span className="text-4xl text-cyber-purple/50">"</span>
            <div className="flex-1">
              <p className="text-gray-300 leading-relaxed italic mb-4">
                Wiktor consistently demonstrated a rare combination of technical depth, creativity, and hands-on problem-solving skills.
                His technical expertise, inventive thinking, and dedication to continuous improvement set him apart as both a capable engineer and a collaborative problem solver.
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyber-purple/20 flex items-center justify-center">
                    <span className="text-cyber-purple font-bold">TH</span>
                  </div>
                  <div>
                    <p className="font-mono text-sm text-white">Teddy Hu</p>
                    <p className="font-mono text-xs text-cyber-blue">R&D Department, GEEETECH</p>
                    <p className="font-mono text-xs text-gray-500">Shenzhen, China • August 2025</p>
                  </div>
                </div>
                <a
                  href="/List.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-purple/10 border border-cyber-purple/30 rounded font-mono text-sm text-cyber-purple hover:bg-cyber-purple/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Full Letter
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-lg p-6 text-center hover-glow group"
            >
              <div className={`font-display font-bold text-4xl md:text-5xl text-${stat.color} mb-2`}>
                <span className="stat-value" data-value={stat.value}>0</span>
                {stat.suffix}
              </div>
              <div className="font-mono text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Experience timeline */}
        <h3 className="font-display text-2xl text-white mb-8 flex items-center gap-3">
          <span className="text-cyber-purple">&gt;</span>
          Experience_Timeline
        </h3>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-pink" />

          {experience.map((exp, index) => (
            <div
              key={index}
              className={`timeline-item relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:ml-auto'
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-0 w-4 h-4 bg-cyber-dark border-2 border-cyber-blue rounded-full z-10 ${
                  index % 2 === 0 ? 'left-[-7px] md:left-auto md:right-[calc(50%-7px)]' : 'left-[-7px] md:left-[calc(50%-7px)]'
                }`}
              />

              <div className={`glass rounded-lg p-6 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                <span className="font-mono text-xs text-cyber-green">{exp.period}</span>
                <h4 className="font-display text-lg text-white mt-2">{exp.title}</h4>
                <p className="font-mono text-sm text-cyber-blue">{exp.company}</p>
                <p className="font-mono text-xs text-gray-500 mb-3">{exp.location}</p>
                <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs font-mono bg-cyber-blue/10 text-cyber-blue rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education section */}
        <h3 className="font-display text-2xl text-white mb-8 mt-16 flex items-center gap-3">
          <span className="text-cyber-green">&gt;</span>
          Education_
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="education-item glass rounded-lg p-6 hover-glow relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-green to-transparent" />
              <span className="font-mono text-xs text-cyber-green">{edu.period}</span>
              <h4 className="font-display text-lg text-white mt-2">{edu.degree}</h4>
              <p className="font-mono text-sm text-cyber-blue">{edu.school}</p>
              <p className="font-mono text-xs text-gray-500">{edu.location}</p>
            </div>
          ))}
        </div>

        {/* Paradigm statement */}
        <h3 className="font-display text-2xl text-white mb-8 mt-16 flex items-center gap-3">
          <span className="text-cyber-blue">&gt;</span>
          Paradigm_&_Strategy
        </h3>

        <div className="glass rounded-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink" />
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            I operate within the <span className="text-cyber-green font-semibold">High-Velocity Engineering</span> paradigm.
            I leverage LLMs as high-order compilers, allowing for rapid transition from business logic to stable production code.
            My measurable impact – including a proprietary Quant library operating on real capital and hardware optimization
            experience in Shenzhen – serves as hard evidence of my methodology in delivering high-stakes results.
          </p>
          <p className="text-gray-400 leading-relaxed max-w-3xl mt-4 text-sm">
            Experienced in cross-cultural remote collaboration (EU-China timezone coordination), async communication,
            and translating technical requirements for non-technical stakeholders.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 text-xs font-mono border border-cyber-blue/30 text-cyber-blue rounded">
                Security by Design
              </span>
              <span className="px-3 py-1 text-xs font-mono border border-cyber-purple/30 text-cyber-purple rounded">
                LLM Development
              </span>
              <span className="px-3 py-1 text-xs font-mono border border-cyber-green/30 text-cyber-green rounded">
                High-Stakes Delivery
              </span>
            </div>
            <a
              href="/List_WiktorJelenCV_merged.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-blue/10 border border-cyber-blue/30 rounded font-mono text-sm text-cyber-blue hover:bg-cyber-blue/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
