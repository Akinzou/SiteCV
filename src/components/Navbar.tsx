import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - Deer */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          data-cursor-hover
        >
          <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
            <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-cyber-blue group-hover:text-cyber-purple transition-colors">
              <path d="M25 45 L35 25 M35 25 L30 15 M35 25 L42 18"/>
              <path d="M75 45 L65 25 M65 25 L70 15 M65 25 L58 18"/>
              <path d="M35 50 Q50 38 65 50 L60 68 Q50 85 40 68 Z"/>
            </g>
            <circle cx="43" cy="55" r="3" className="fill-cyber-blue"/>
            <circle cx="57" cy="55" r="3" className="fill-cyber-blue"/>
          </svg>
          <span className="font-display font-bold text-xl text-white group-hover:text-cyber-blue transition-colors">
            JELEŃ<span className="text-cyber-purple">_</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="relative font-mono text-sm text-gray-400 hover:text-cyber-blue transition-colors group"
              data-cursor-hover
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-cyber-purple mr-1">{`0${index + 1}.`}</span>
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-blue group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="/List_WiktorJelenCV_merged.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-cyber-blue text-cyber-blue font-mono text-sm hover:bg-cyber-blue/10 transition-all gradient-border"
            data-cursor-hover
          >
            Resume.pdf
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyber-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass mt-4 mx-6 p-6 rounded-lg">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-3 font-mono text-gray-400 hover:text-cyber-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-cyber-purple mr-2">{`0${index + 1}.`}</span>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
