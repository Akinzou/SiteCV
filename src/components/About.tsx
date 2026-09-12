import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePyPIDownloads } from '../hooks/usePyPIDownloads'
import { clientWork, education, identity, research } from '../content/profile'
import { reviews } from '../content/reviews'

gsap.registerPlugin(ScrollTrigger)

const defaultStats = [
  { value: 42000, suffix: '+', label: 'PyPI Downloads', color: 'cyber-blue', isPyPI: true },
  { value: 450, suffix: '+', label: 'Concurrent Users', color: 'cyber-purple', isPyPI: false },
  { value: 4, suffix: '+', label: 'Years Experience', color: 'cyber-green', isPyPI: false },
]


const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const { downloads: pypiDownloads, pepyUrl } = usePyPIDownloads('pythonmetatrader5')

  // Parse PyPI downloads number for animation
  const pypiValue = pypiDownloads ? parseInt(pypiDownloads.replace(/\s/g, ''), 10) : 42000

  // Update stats with dynamic PyPI value
  const stats = defaultStats.map(stat =>
    stat.isPyPI ? { ...stat, value: pypiValue, suffix: '' } : stat
  )

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
    }, sectionRef)

    return () => ctx.revert()
  }, [pypiValue])

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

        {/* Same card treatment as Interests_&_R&D below. */}
        <div className="glass rounded-lg p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink" />
          <p className="text-gray-300 leading-relaxed max-w-3xl">{identity.definition}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 text-xs font-mono border border-cyber-blue/30 text-cyber-blue rounded">
              {identity.role}
            </span>
            <span className="px-3 py-1 text-xs font-mono border border-cyber-purple/30 text-cyber-purple rounded">
              {identity.location}
            </span>
            <span className="px-3 py-1 text-xs font-mono border border-cyber-green/30 text-cyber-green rounded">
              Open to opportunities
            </span>
          </div>
          {/* A real second URL, not an anchor: /about is a static page built
              from the same profile.ts, and it is the one a search engine or an
              assistant can quote when asked who this is. */}
          <a
            href="/about"
            className="inline-flex items-center gap-2 mt-6 font-mono text-sm text-cyber-blue hover:text-cyber-green transition-colors"
            data-cursor-hover
          >
            Full profile
            <span aria-hidden="true" className="text-xs opacity-60">
              →
            </span>
          </a>
        </div>

        {/* Worked with */}
        <div className="mb-12">
          <p className="font-mono text-xs text-gray-500 text-center mb-6">WORKED WITH</p>
          <div className="marquee-container">
            <div className="marquee-track">
              {/* First set */}
              <div className="marquee-content">
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">RANDLAB</span>
                  <span className="font-mono text-xs text-gray-500">Software House</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">CTS AUDIO</span>
                  <span className="font-mono text-xs text-gray-500">Audio Systems</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">GEEETECH</span>
                  <span className="font-mono text-xs text-gray-500">Shenzhen R&D</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-purple transition-colors">POLSAT PLUS</span>
                  <span className="font-mono text-xs text-gray-500">Cyfrowy Polsat Group</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">WSB-NLU</span>
                  <span className="font-mono text-xs text-gray-500">National Louis University</span>
                </div>
              </div>
              {/* Duplicate sets for seamless loop */}
              <div className="marquee-content">
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">RANDLAB</span>
                  <span className="font-mono text-xs text-gray-500">Software House</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">CTS AUDIO</span>
                  <span className="font-mono text-xs text-gray-500">Audio Systems</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">GEEETECH</span>
                  <span className="font-mono text-xs text-gray-500">Shenzhen R&D</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-purple transition-colors">POLSAT PLUS</span>
                  <span className="font-mono text-xs text-gray-500">Cyfrowy Polsat Group</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">WSB-NLU</span>
                  <span className="font-mono text-xs text-gray-500">National Louis University</span>
                </div>
              </div>
              <div className="marquee-content">
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">RANDLAB</span>
                  <span className="font-mono text-xs text-gray-500">Software House</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">CTS AUDIO</span>
                  <span className="font-mono text-xs text-gray-500">Audio Systems</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">GEEETECH</span>
                  <span className="font-mono text-xs text-gray-500">Shenzhen R&D</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-purple transition-colors">POLSAT PLUS</span>
                  <span className="font-mono text-xs text-gray-500">Cyfrowy Polsat Group</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">WSB-NLU</span>
                  <span className="font-mono text-xs text-gray-500">National Louis University</span>
                </div>
              </div>
              <div className="marquee-content">
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">RANDLAB</span>
                  <span className="font-mono text-xs text-gray-500">Software House</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">CTS AUDIO</span>
                  <span className="font-mono text-xs text-gray-500">Audio Systems</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">GEEETECH</span>
                  <span className="font-mono text-xs text-gray-500">Shenzhen R&D</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-purple transition-colors">POLSAT PLUS</span>
                  <span className="font-mono text-xs text-gray-500">Cyfrowy Polsat Group</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">WSB-NLU</span>
                  <span className="font-mono text-xs text-gray-500">National Louis University</span>
                </div>
              </div>
              <div className="marquee-content">
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">RANDLAB</span>
                  <span className="font-mono text-xs text-gray-500">Software House</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">CTS AUDIO</span>
                  <span className="font-mono text-xs text-gray-500">Audio Systems</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-blue transition-colors">GEEETECH</span>
                  <span className="font-mono text-xs text-gray-500">Shenzhen R&D</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-purple transition-colors">POLSAT PLUS</span>
                  <span className="font-mono text-xs text-gray-500">Cyfrowy Polsat Group</span>
                </div>
                <div className="group flex flex-col items-center flex-shrink-0">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white/60 group-hover:text-cyber-green transition-colors">WSB-NLU</span>
                  <span className="font-mono text-xs text-gray-500">National Louis University</span>
                </div>
              </div>
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
                  href="/Technical_Recommendation_Letter.pdf"
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

        {/* Academic Recommendations - WSB-NLU Researchers' Night */}
        <div className="glass rounded-lg p-8 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-purple" />
          <div className="flex items-start gap-4">
            <span className="text-4xl text-cyber-green/50">"</span>
            <div className="flex-1">
              <p className="text-gray-300 leading-relaxed italic mb-4">
                I recommend Mr. Wiktor Jeleń as a highly qualified specialist. His technical proactivity, cold analytics, and ability to communicate complex architectural concepts make him an engineer ready to execute the most critical technological projects.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-cyber-green/20 flex items-center justify-center">
                  <span className="text-cyber-green font-bold">MS</span>
                </div>
                <div>
                  <p className="font-mono text-sm text-white">Magdalena Szumacher, M.A.</p>
                  <p className="font-mono text-xs text-cyber-green">Deputy Head of Recruitment & Marketing, WSB National-Louis University</p>
                  <p className="font-mono text-xs text-gray-500">Nowy Sącz, Poland • 2020-2024</p>
                </div>
              </div>

              <p className="font-mono text-xs text-gray-500 mb-4">RESEARCHERS' NIGHT — 5 EDITIONS</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* 2024 */}
                <a
                  href="/RecomendationLetterWSB2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-cyber-dark/50 rounded border border-cyber-green/20 hover:border-cyber-green/50 transition-colors"
                >
                  <p className="font-mono text-lg text-cyber-green font-bold">2024</p>
                  <p className="font-mono text-xs text-gray-400 mb-2">Technical Demonstrator</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-green/10 text-cyber-green rounded">FastAPI</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-green/10 text-cyber-green rounded">Docker</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-green/10 text-cyber-green rounded">Git</span>
                  </div>
                  <p className="font-mono text-[10px] text-cyber-green/50 mt-2 group-hover:text-cyber-green transition-colors">[view PDF]</p>
                </a>

                {/* 2023 */}
                <a
                  href="/RecomendationLetterWSB2023.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-cyber-dark/50 rounded border border-cyber-blue/20 hover:border-cyber-blue/50 transition-colors"
                >
                  <p className="font-mono text-lg text-cyber-blue font-bold">2023</p>
                  <p className="font-mono text-xs text-gray-400 mb-2">Technical Demonstrator</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-blue/10 text-cyber-blue rounded">NetSec</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-blue/10 text-cyber-blue rounded">IoT</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-blue/10 text-cyber-blue rounded">Cloud</span>
                  </div>
                  <p className="font-mono text-[10px] text-cyber-blue/50 mt-2 group-hover:text-cyber-blue transition-colors">[view PDF]</p>
                </a>

                {/* 2022 */}
                <a
                  href="/RecomendationLetterWSB2022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-cyber-dark/50 rounded border border-cyber-purple/20 hover:border-cyber-purple/50 transition-colors"
                >
                  <p className="font-mono text-lg text-cyber-purple font-bold">2022</p>
                  <p className="font-mono text-xs text-gray-400 mb-2">Technical Demonstrator</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-purple/10 text-cyber-purple rounded">Security</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-purple/10 text-cyber-purple rounded">Telemetry</span>
                  </div>
                  <p className="font-mono text-[10px] text-cyber-purple/50 mt-2 group-hover:text-cyber-purple transition-colors">[view PDF]</p>
                </a>

                {/* 2021 */}
                <a
                  href="/RecomendationLetterWSB2021.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-cyber-dark/50 rounded border border-cyber-pink/20 hover:border-cyber-pink/50 transition-colors"
                >
                  <p className="font-mono text-lg text-cyber-pink font-bold">2021</p>
                  <p className="font-mono text-xs text-gray-400 mb-2">Technical Demonstrator</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-pink/10 text-cyber-pink rounded">Linux</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyber-pink/10 text-cyber-pink rounded">CLI</span>
                  </div>
                  <p className="font-mono text-[10px] text-cyber-pink/50 mt-2 group-hover:text-cyber-pink transition-colors">[view PDF]</p>
                </a>

                {/* 2020 */}
                <a
                  href="/RecomendationLetterWSB2020.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-cyber-dark/50 rounded border border-gray-600/20 hover:border-gray-400/50 transition-colors"
                >
                  <p className="font-mono text-lg text-gray-400 font-bold">2020</p>
                  <p className="font-mono text-xs text-gray-400 mb-2">Technical Demonstrator</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-gray-600/10 text-gray-400 rounded">Linux</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-gray-600/10 text-gray-400 rounded">Open-Source</span>
                  </div>
                  <p className="font-mono text-[10px] text-gray-500 mt-2 group-hover:text-gray-300 transition-colors">[view PDF]</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTS Recommendation */}
        <div className="glass rounded-lg p-8 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-transparent" />
          <div className="flex items-start gap-4">
            <span className="text-4xl text-cyber-blue/50">"</span>
            <div className="flex-1">
              <p className="text-gray-300 leading-relaxed italic mb-4">
                Wiktor Jeleń is a reliable, independent, and highly organized individual. He stands out with his analytical approach to technical problems and his ability to quickly find effective solutions. We wholeheartedly recommend Wiktor Jeleń as a specialist in Linux systems, Python programming, and cybersecurity. We are confident that his knowledge and dedication will be a valuable contribution to any technology organization.
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                    <span className="text-cyber-blue font-bold">SŁ</span>
                  </div>
                  <div>
                    <p className="font-mono text-sm text-white">Sebastian Łatka</p>
                    <p className="font-mono text-xs text-cyber-blue">R&D Director & CEO, CTS TECHNOLOGY</p>
                    <p className="font-mono text-xs text-gray-500">Poland • March 2026</p>
                  </div>
                </div>
                <a
                  href="/RecomendationLetterCTS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-blue/10 border border-cyber-blue/30 rounded font-mono text-sm text-cyber-blue hover:bg-cyber-blue/20 transition-colors"
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

        {/* Client work. The platform used to appear only inside an href, so the
            one piece of independently verifiable proof on the page was invisible
            unless you hovered a [verify] chip. */}
        <h3 className="font-display text-2xl text-white mb-8 mt-16 flex items-center gap-3">
          <span className="text-cyber-green">&gt;</span>
          Consulting_
        </h3>

        <div className="glass rounded-lg p-6 md:p-8 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-purple" />

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
            <h4 className="font-display text-lg text-white">{clientWork.headline}</h4>
            <span className="font-mono text-sm text-cyber-green whitespace-nowrap">
              {'★'.repeat(5)} on {clientWork.platform}
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed max-w-3xl mb-6">{clientWork.body}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {clientWork.stats.map((stat) => (
              <div key={stat.label} className="border border-cyber-green/20 rounded p-3">
                <p className="font-display font-bold text-xl text-cyber-green">{stat.value}</p>
                <p className="font-mono text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <a
            href={clientWork.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded border border-cyber-green/30 text-cyber-green font-mono text-sm hover:bg-white/5 transition-colors"
            data-cursor-hover
          >
            Verify on {clientWork.platform}
            <span aria-hidden="true" className="text-xs opacity-60">
              ↗
            </span>
          </a>

          <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4">
            All {reviews.length} reviews
          </p>

          <div className="reviews-scroll-container h-[400px]">
            <div className="reviews-scroll">
              {/* Duplicate reviews for seamless loop */}
              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={`${index < reviews.length ? 'a' : 'b'}-${review.name}-${review.time}`}
                  className="mb-4 p-4 bg-cyber-dark/50 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                        <span className="text-cyber-blue font-bold text-xs">{review.name.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-mono text-sm text-white">{review.name}</p>
                        <p className="font-mono text-xs text-gray-500">{review.country} • {review.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-cyber-green text-sm">{'★'.repeat(review.rating)}</span>
                      {review.rating < 5 && <span className="text-gray-600 text-sm">{'★'.repeat(5 - review.rating)}</span>}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 text-xs font-mono bg-cyber-purple/10 text-cyber-purple rounded">
                    {review.category}
                  </span>
                </div>
              ))}
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
              <div className="font-mono text-sm text-gray-400 flex items-center justify-center gap-2">
                {stat.label}
                {stat.isPyPI && (
                  <a
                    href={pepyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-1 bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-green/20 hover:text-cyber-green transition-colors text-[10px] rounded"
                  >
                    [verify]
                  </a>
                )}
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
            I work system-first: define architecture, invariants and failure modes before implementation.
            I use automation and modern development tooling aggressively to shorten the feedback loop,
            while relying on tests, observability and explicit system constraints to verify behavior.
          </p>
          <p className="text-gray-300 leading-relaxed max-w-3xl mt-4">
            Most recently primary contributor to a large multi-tenant TypeScript platform. Earlier work
            includes a quant library operating on real capital (42,000+ PyPI downloads) and hardware
            R&amp;D in Shenzhen.
          </p>
          <p className="text-gray-400 leading-relaxed max-w-3xl mt-4 text-sm">
            I'm comfortable with fully-remote, cross-cultural collaboration (EU–China).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 text-xs font-mono border border-cyber-blue/30 text-cyber-blue rounded">
              Temporal Orchestration
            </span>
            <span className="px-3 py-1 text-xs font-mono border border-cyber-purple/30 text-cyber-purple rounded">
              PostgreSQL RLS
            </span>
            <span className="px-3 py-1 text-xs font-mono border border-cyber-green/30 text-cyber-green rounded">
              CI/CD
            </span>
            <span className="px-3 py-1 text-xs font-mono border border-cyber-pink/30 text-cyber-pink rounded">
              Integration &amp; e2e Testing
            </span>
            <span className="px-3 py-1 text-xs font-mono border border-cyber-blue/30 text-cyber-blue rounded">
              Multi-provider AI
            </span>
            <span className="px-3 py-1 text-xs font-mono border border-cyber-purple/30 text-cyber-purple rounded">
              External API Integrations
            </span>
          </div>
        </div>

        {/* Interests / R&D */}
        <h3 className="font-display text-2xl text-white mb-8 mt-16 flex items-center gap-3">
          <span className="text-cyber-purple">&gt;</span>
          Interests_&_R&D
        </h3>

        <div className="glass rounded-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-blue" />
          <p className="text-gray-300 leading-relaxed max-w-3xl">{research.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {research.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono border border-cyber-purple/30 text-cyber-purple rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
