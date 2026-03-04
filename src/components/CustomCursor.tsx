import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.to(cursorDot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
      })
    }

    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: '#00f0ff',
        duration: 0.3,
      })
    }

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: 'rgba(0, 240, 255, 0.5)',
        duration: 0.3,
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    const links = document.querySelectorAll('a, button, [data-cursor-hover]')
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink)
      link.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink)
        link.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 border border-cyber-blue/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyber-blue rounded-full pointer-events-none z-[9999] hidden md:block"
      />
    </>
  )
}

export default CustomCursor
