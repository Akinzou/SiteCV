import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'PythonMetaTrader5',
    subtitle: 'Production-Ready Quant Library',
    description:
      'MetaTrader5 wrapper designed for algorithmic trading with real capital. Ensures data normalization and critical execution stability with comprehensive retcode handling.',
    stats: { downloads: '36,000+', status: 'Production', platform: 'PyPI' },
    tech: ['Python', 'MetaTrader5', 'Algorithmic Trading', 'PyPI'],
    github: 'https://github.com/Akinzou/MetaTrader5-Python',
    color: 'cyber-blue',
    featured: true,
  },
  {
    title: 'TradeLockerBot',
    subtitle: 'Trading Automation System',
    description:
      'FastAPI backend integrated with TradingView webhooks. Fully containerized via Docker with automated CI/CD pipelines for deployment.',
    stats: { status: 'Active', type: 'Automation', deployment: 'Docker' },
    tech: ['FastAPI', 'Docker', 'TradingView', 'CI/CD', 'Webhooks'],
    github: 'https://github.com/Akinzou/TradeLockerBot',
    color: 'cyber-purple',
    featured: true,
  },
  {
    title: 'Anatomy Project',
    subtitle: 'Medical University Platform',
    description:
      'Scalable backend architecture for Medical University of Silesia. Handles 450+ concurrent users with LDAP authentication and comprehensive API design.',
    stats: { users: '450+', endpoints: '16+', coverage: '50%+' },
    tech: ['NestJS', 'TypeORM', 'MySQL', 'LDAP', 'JWT', 'Jest'],
    color: 'cyber-green',
    featured: false,
  },
  {
    title: 'GEEETECH A10M Enhancement',
    subtitle: 'Hardware R&D Project',
    description:
      'Complete structural redesign of A10M printer components. Firmware optimization with Klipper and stepper motor control enhancement.',
    stats: { location: 'Shenzhen', type: 'Hardware', methodology: 'R&D' },
    tech: ['Fusion 360', 'Klipper', 'C++', 'CAD', 'Firmware'],
    color: 'cyber-pink',
    featured: false,
  },
  {
    title: 'IoT Pipe Monitoring',
    subtitle: 'ThingsBoard Integration',
    description:
      'Pipe impedance monitoring system for the heating industry. Hardware-web integration with AWS-based alerting systems.',
    stats: { industry: 'Heating', cloud: 'AWS', platform: 'ThingsBoard' },
    tech: ['ThingsBoard', 'C++', 'AWS', 'IoT', 'Embedded'],
    color: 'cyber-yellow',
    featured: false,
  },
]

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title
      gsap.fromTo(
        '.projects-title',
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

      // Featured projects
      gsap.fromTo(
        '.featured-project',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: '.featured-projects',
            start: 'top 80%',
          },
        }
      )

      // Other projects grid
      gsap.fromTo(
        '.project-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.other-projects',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16 projects-title">
          <span className="font-mono text-cyber-purple">03.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Projects_</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-green/50 to-transparent" />
        </div>

        {/* Featured projects */}
        <div className="featured-projects space-y-16 mb-20">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`featured-project relative grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Project image/visualization placeholder */}
              <div
                className={`relative aspect-video glass rounded-lg overflow-hidden group ${
                  index % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark to-cyber-black" />
                <div className={`absolute inset-0 bg-${project.color}/5`} />

                {/* Terminal-style visualization */}
                <div className="absolute inset-4 border border-cyber-blue/20 rounded p-4 font-mono text-xs">
                  <div className="text-cyber-green mb-2">$ npm info {project.title.toLowerCase().replace(/\s/g, '-')}</div>
                  <div className="text-gray-400">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-cyber-purple">{key}:</span>{' '}
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Corner decorations */}
                <div className={`absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-${project.color}/50`} />
                <div className={`absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-${project.color}/50`} />
              </div>

              {/* Project info */}
              <div className={index % 2 === 1 ? 'md:order-1 md:text-right' : ''}>
                <span className={`font-mono text-sm text-${project.color}`}>{project.subtitle}</span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white mt-2 mb-4">
                  {project.title}
                </h3>

                <div className="glass rounded-lg p-6 mb-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
                </div>

                <div className={`flex flex-wrap gap-2 mb-6 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className={`px-2 py-1 text-xs font-mono text-${project.color} bg-${project.color}/10 rounded`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 font-mono text-sm text-${project.color} hover:underline`}
                    data-cursor-hover
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                    </svg>
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Other projects */}
        <h3 className="font-display text-xl text-white mb-8 flex items-center gap-3">
          <span className="text-cyber-purple">&gt;</span>
          Other_Notable_Work
        </h3>

        <div className="other-projects grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.title}
              className="project-card glass rounded-lg p-6 hover-glow group relative overflow-hidden cursor-pointer"
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${project.color} to-transparent`} />

              {/* Folder icon */}
              <div className="flex justify-between items-start mb-4">
                <svg
                  className={`w-10 h-10 text-${project.color}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>

              <h4 className="font-display font-bold text-lg text-white mb-1">{project.title}</h4>
              <p className={`font-mono text-xs text-${project.color} mb-3`}>{project.subtitle}</p>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs font-mono text-gray-500">
                    {t}
                  </span>
                ))}
              </div>

              {/* Hover glow effect */}
              <div
                className={`absolute inset-0 bg-${project.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
