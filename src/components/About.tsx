import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePyPIDownloads } from '../hooks/usePyPIDownloads'

gsap.registerPlugin(ScrollTrigger)

const defaultStats = [
  { value: 36000, suffix: '+', label: 'PyPI Downloads', color: 'cyber-blue', isPyPI: true },
  { value: 450, suffix: '+', label: 'Concurrent Users', color: 'cyber-purple', isPyPI: false },
  { value: 4, suffix: '+', label: 'Years Experience', color: 'cyber-green', isPyPI: false },
]

const reviews = [
  { name: 'jakemedia207', country: 'US', rating: 5, time: 'February 2026', text: 'Helped me with my p1s 10/10 would recommend', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'tob_hu', country: 'CH', rating: 4, time: 'September 2025', text: 'Thank you for your Support!', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'skilnotfound', country: 'US', rating: 5, time: 'September 2025', text: 'Was very helpful and willing to help immediately. Was also very flexible in helping with the issue we were in vastly different time zones which meant it was difficult for us to always be online at the same time, But i would frequently get very early morning replies. 10/10 would reach out for consulting again.', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'kendrickcharles', country: 'US', rating: 5, time: 'October 2025', text: 'He was great and very attentive.', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'azproperties16', country: 'US', rating: 5, time: 'August 2025', text: "Amazing job! Wiktor helped me set up my 3d printer in a fraction of the time that I spent trying to set it up myself. He's absolutely worth it!", category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'atalavera3', country: 'US', rating: 5, time: 'August 2025', text: 'Very professional and helpful, quick to the point', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'jmwilson125', country: 'US', rating: 5, time: 'July 2025', text: 'Wiktor was very knowledgeable in klipper and helped me out a lot with my project', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'aaronw12', country: 'US', rating: 5, time: 'August 2025', text: 'Went above and beyond my initial requests. Very responsive and will be my Go-To for all my 3D printer needs.', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'jschanaker', country: 'US', rating: 5, time: 'March 2024', text: 'Wiktor did a great job and was very helpful along the way. Would recommend.', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'ccburton11', country: 'US', rating: 5, time: 'January 2024', text: "He was very helpful, knowledgeable, and responsive. I went in with bad print settings I couldn't figure out and left with a working printer, printing perfectly!", category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'redvsgoo', country: 'US', rating: 5, time: 'February 2024', text: 'Great service, excellent communication, and good to work with. I got the top tier service, and it was shown through his work. 100% would recommend his work to anyone looking to have marlin firmware made for their 3D printer.', category: 'Embedded C++ for 3D printers' },
  { name: 'ccrank85', country: 'US', rating: 5, time: 'November 2023', text: "This guy knows what he's doing. Helped me get my modified ender 3 printing again. I've been scratching my head on the problems with it for months and he helped me get it working in a couple days.", category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'the6thcrow', country: 'US', rating: 5, time: 'October 2023', text: 'Had some weird issues going on with my ender 3 pro after I tried to compile my own firmware, but we were able to fix it. Quick communication and very friendly. I extremely recommend him to do your custom firmware.', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'malikeost', country: 'US', rating: 5, time: 'September 2023', text: 'Good communication from seller, even with limited knowledge and still completed help setting up my printer.', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'owenland681', country: 'GB', rating: 5, time: 'August 2023', text: 'Absolutely Great!', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'keyven343', country: 'CA', rating: 5, time: 'July 2023', text: 'He give a very great support, gave me the courage to go back to my big project in 3d printing', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'keyven343', country: 'CA', rating: 5, time: 'June 2023', text: 'Hes my tech now, very nice in comunication and very nice :)', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'keithbfiver', country: 'US', rating: 5, time: 'May 2023', text: 'Amazing service. Super fast. Same day. And great communication. Got my printer working perfectly and fast. Thank you!', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'marlonvella', country: 'MT', rating: 5, time: 'April 2023', text: 'He stayed with me all the way he is amazing thank you', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'amarokstudios', country: 'US', rating: 5, time: 'March 2023', text: 'Absolutely amazing. If you are having issues with your 3D printer/Marlin firmware, this seller is definitely the place to go. I have an Ender 3 V1 with a CR Touch and filament runout sensor installed and I needed some help getting the firmware updated to use it. Definitely would recommend!', category: 'Embedded C++ for 3D printers' },
  { name: 'thee_kkid', country: 'US', rating: 5, time: 'February 2023', text: 'Thanks for helping me adjust my Easter and explaining to me what was wrong with my Internet', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'hendriski', country: 'GB', rating: 5, time: 'January 2023', text: "Great and Fast service. My Ender 3 is working perfect now. Am running the latest Marlin firmware and all done in an hour. He even added a little extra for the same price. Definitely gonna order from him again.", category: 'Embedded C++ for 3D printers' },
  { name: 'lztechs', country: 'PL', rating: 5, time: 'December 2022', text: 'Incredible seller! Very helpful and patient. Would definitely recommend!!', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'sure4thing', country: 'US', rating: 5, time: 'November 2022', text: 'They worked nonstop with me to get my printer back up and running. Very knowledgeable and fast at replying. Will go to again in the future!', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'ggabs_does', country: 'US', rating: 5, time: 'October 2022', text: 'Fixed my printer! Had a max temp error and he helped me within a day! I will definitely be back!!', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'ritchie176', country: 'IE', rating: 5, time: 'September 2022', text: "Absolutely fantastic help! Was willing to work through the issue with me in a comprehensive manner. Overall just a great service. I can't give you one reason to not choose Wiktor's service :D", category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'fallenlight1', country: 'US', rating: 5, time: 'August 2022', text: 'Wonderful I have used him twice now and will reach out again if needed', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'user03095544', country: 'NZ', rating: 5, time: 'July 2022', text: 'Seller has been really amazing. He knew exactly what to do and guided me through the process. I would recommend him to anyone who is having difficulties. Great service and will definitely work with him again.', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'lztechs', country: 'PL', rating: 5, time: 'June 2022', text: 'Incredible experience, this seller has huge knowledge. Totally recommend!', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'bellemalcolm', country: 'HK', rating: 5, time: 'May 2022', text: 'Have a lot of knowledge about 3D printers, very nice to work with, wonderful service!', category: 'Embedded Linux (Armbian) for 3D printers' },
  { name: 'lztechs', country: 'PL', rating: 5, time: 'April 2022', text: '20/10, he has huge knowledge in 3d printing. I would love to work with him again', category: 'Embedded Linux (Armbian) for 3D printers' },
]

const education = [
  {
    period: '10.2024 – Present',
    degree: 'B.Eng. in Computer Science, Cybersecurity (Part-time, Weekends)',
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
    team: '3-person team, sole full-time engineer',
    description: 'Designed and built complete backend architecture for Medical University of Silesia. Delivered REST API, LDAP SSO integration, OWASP security audits, and CI/CD pipelines. Production system handling 450+ concurrent users during exam periods.',
    tech: ['NestJS', 'TypeORM', 'MySQL', 'JWT', 'GitHub Actions'],
  },
  {
    period: '08.2024 – 08.2025',
    title: 'R&D Systems Engineer',
    company: 'GEEETECH',
    location: 'Shenzhen, China / Remote',
    team: 'Solo engineer, direct R&D collaboration',
    description: 'Complete structural redesign of A10M printer components. Klipper firmware optimization, stepper motor control enhancement, CAD modeling in Fusion 360. Acted as bridge between EU quality standards and Chinese R&D velocity.',
    tech: ['Klipper', 'Fusion 360', 'C++', 'Linux'],
  },
  {
    period: '04.2023 – 07.2024',
    title: 'Sales Systems Consultant',
    company: 'Randlab Software (Polsat Plus Group)',
    location: 'Remote',
    team: '10-person cross-functional team',
    description: 'Automated documentation generation for POS, telemarketing, and mobile sales channels across Polsat Plus Group. Streamlined workflows for sales operations documentation.',
    tech: ['Automation', 'Documentation', 'Sales Systems'],
  },
  {
    period: '09.2022 – 03.2023',
    title: 'Embedded / Thingsboard Specialist',
    company: 'Randlab Software',
    location: 'Nowy Sącz, Poland',
    team: '2-person team, ThingsBoard & Arduino focus',
    description: 'Pipe impedance monitoring system for heating industry. Configured ThingsBoard platform with custom plugins, built Arduino mock devices for data simulation and testing without production hardware. AWS-based alerting integration.',
    tech: ['ThingsBoard', 'Arduino', 'AWS', 'IoT'],
  },
]

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { downloads: pypiDownloads, pepyUrl } = usePyPIDownloads('pythonmetatrader5')

  // Parse PyPI downloads number for animation
  const pypiValue = pypiDownloads ? parseInt(pypiDownloads.replace(/\s/g, ''), 10) : 36000

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

        {/* Client Reviews - Infinite Scroll */}
        <div className="glass rounded-lg p-6 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-green via-cyber-blue to-transparent" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h3 className="font-display text-xl text-white flex items-center gap-3">
              <span className="text-cyber-green">&gt;</span>
              Client_Reviews
              <span className="text-sm font-mono text-gray-500">({reviews.length})</span>
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-cyber-green text-lg">{'★'.repeat(5)}</span>
              <span className="font-mono text-sm text-gray-400">4.9 avg</span>
              <a
                href="https://www.fiverr.com/akinzouent"
                target="_blank"
                rel="noopener noreferrer"
                className="px-1.5 bg-cyber-green/20 text-cyber-green hover:bg-cyber-blue/20 hover:text-cyber-blue transition-colors text-[10px] font-mono rounded"
              >
                [verify]
              </a>
            </div>
          </div>

          <div className="reviews-scroll-container h-[400px]">
            <div className="reviews-scroll">
              {/* Duplicate reviews for seamless loop */}
              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={index}
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
                <p className="font-mono text-xs text-gray-500">{exp.location}</p>
                <p className="font-mono text-xs text-cyber-purple mb-3">{exp.team}</p>
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
            I use AI tools (Claude, Cursor) for code generation and iteration - focusing on architecture decisions, code review, and system design rather than manual typing.
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
              href="/CV_WiktorJelen.pdf"
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
