import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePyPIDownloads } from '../hooks/usePyPIDownloads'
import { projects } from '../content/profile'
import { accentBorder, accentText } from '../lib/accents'

gsap.registerPlugin(ScrollTrigger)

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
  </svg>
)

/**
 * Case-study shape (problem → solution → stack → links) rather than a title and
 * a row of technology tags. The tags say what was touched; only the problem
 * says whether the work was worth doing.
 */
const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { downloads: pypiDownloads, pepyUrl } = usePyPIDownloads('pythonmetatrader5')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-title',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.project-case',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: { trigger: '.projects-list', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-16 projects-title">
          <span className="font-mono text-cyber-purple">04.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Projects_</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-green/50 to-transparent" />
        </div>

        <div className="projects-list space-y-8">
          {projects.map((project) => {
            const metric =
              project.pypiPackage && pypiDownloads
                ? `${pypiDownloads} PyPI downloads`
                : project.metric

            return (
              <article
                key={project.name}
                className={`project-case glass rounded-lg p-6 md:p-8 border ${accentBorder[project.accent]} relative overflow-hidden`}
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-2xl text-white">{project.name}</h3>
                  <span className="font-mono text-xs text-gray-400 flex items-center gap-2">
                    {metric}
                    {project.pypiPackage && (
                      <a
                        href={pepyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1 bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-green/20 hover:text-cyber-green transition-colors text-[10px] rounded"
                      >
                        [verify]
                      </a>
                    )}
                  </span>
                </div>

                <p className={`font-mono text-sm mb-6 ${accentText[project.accent]}`}>
                  {project.tagline}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-cyber-pink mb-2">
                      Problem
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-cyber-green mb-2">
                      Solution
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-500 mr-2">
                    Stack
                  </span>
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-mono text-gray-300 border border-gray-600/40 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {project.links.length > 0 && (
                  <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-700/40">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 font-mono text-sm hover:underline ${accentText[project.accent]}`}
                        data-cursor-hover
                      >
                        {link.label === 'GitHub' && <GitHubIcon />}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
