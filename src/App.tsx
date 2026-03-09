import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ParticleBackground from './components/three/ParticleBackground'

gsap.registerPlugin(ScrollTrigger)

function App() {

  return (
    <div className="relative min-h-screen bg-cyber-black noise">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <footer className="py-8 text-center text-cyber-blue/50 font-mono text-sm border-t border-cyber-blue/10">
          <p>© 2026 Wiktor Jeleń | Built with React + Three.js + GSAP | <a href="https://github.com/Akinzou/SiteCV" target="_blank" rel="noopener noreferrer" className="text-cyber-purple hover:text-cyber-blue transition-colors">[source]</a></p>
          <p className="mt-2 text-xs">root@portfolio:~$ echo "High-Velocity Engineering"</p>
        </footer>
      </div>
    </div>
  )
}

export default App
