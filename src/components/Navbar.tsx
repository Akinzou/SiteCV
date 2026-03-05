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
          className="group"
          data-cursor-hover
        >
          <span className="font-display font-bold text-xl text-white group-hover:text-cyber-blue transition-colors">
            YELON<span className="text-cyber-purple">_</span>
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
            href="/CV_WiktorJelen.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group px-6 py-2.5 font-mono text-sm font-semibold overflow-hidden"
            data-cursor-hover
          >
            {/* Glowing background */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink opacity-80 group-hover:opacity-100 transition-opacity" />
            {/* Animated glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink blur-md opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />
            {/* Border */}
            <span className="absolute inset-[1px] bg-cyber-black" />
            {/* Text */}
            <span className="relative flex items-center gap-2 text-white group-hover:text-cyber-blue transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume.pdf
            </span>
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
          <a
            href="/CV_WiktorJelen.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block mt-4 py-3 text-center font-mono text-sm font-semibold overflow-hidden rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink opacity-80" />
            <span className="absolute inset-[1px] bg-cyber-black rounded" />
            <span className="relative flex items-center justify-center gap-2 text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume.pdf
            </span>
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
