import { experience } from '../content/profile'

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-cyber-purple">02.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Experience_</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-blue/50 to-transparent" />
        </div>
        <ol className="border-l border-cyber-blue/30 pl-6 space-y-10">
          {experience.map((entry) => (
            <li key={`${entry.company}-${entry.period}`} className="relative">
              <span aria-hidden="true" className="absolute -left-[29px] top-2 w-2 h-2 rounded-full bg-cyber-blue" />
              <p className="text-sm text-cyber-green mb-2">{entry.period}</p>
              <h3 className="font-display text-xl text-white">{entry.role}</h3>
              <p className="text-sm text-cyber-blue mt-1">{entry.company} · {entry.location}</p>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-gray-300 leading-relaxed max-w-3xl">
                {entry.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
