import { visionCopy } from '../assets/data/siteContent.js'

const About = () => {
  return (
    <div className="space-y-10">
      <section className="page-shell">
        <div className="glass-card rounded-[var(--radius-lg)] p-6 shadow-soft space-y-4">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]">About SeerahVerse</p>
          <h1 className="text-3xl font-semibold">{visionCopy.headline}</h1>
          <div className="space-y-3 text-[var(--color-text-muted)]\">
            {visionCopy.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-6 sm:grid-cols-3">
        {[
          { label: 'Cohort-first', value: 'Small groups for accountability and depth.' },
          { label: 'Faith + Science', value: 'Timeless wisdom paired with modern rigor.' },
          { label: 'Global impact', value: 'Building leaders for the next 50-100 years.' },
        ].map((item) => (
          <div key={item.label} className="glass-card rounded-[var(--radius-lg)] p-5 shadow-soft">
            <p className="text-sm text-[var(--color-text-muted)] uppercase tracking-[0.08em]">{item.label}</p>
            <p className="mt-2 text-base font-semibold">{item.value}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default About

