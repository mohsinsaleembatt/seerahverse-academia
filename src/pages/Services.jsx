import { services } from '../assets/data/siteContent.js'

const Services = () => {
  return (
    <div className="space-y-10">
      <section className="page-shell">
        <div className="glass-card rounded-[var(--radius-lg)] p-6 shadow-soft space-y-3">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Services</p>
          <h1 className="text-3xl font-semibold">SeerahVerse Academia Services</h1>
          <p className="text-[var(--color-muted)]">
            Counseling, corporate training, and leadership development designed for impact.
          </p>
        </div>
      </section>

      <section className="page-shell grid gap-6 lg:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="glass-card rounded-[var(--radius-lg)] overflow-hidden shadow-soft">
            <img src={service.image} alt={service.title} className="h-48 w-full object-cover" loading="lazy" />
            <div className="space-y-3 p-5">
              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <p className="text-[var(--color-muted)]">{service.description}</p>
              <ul className="space-y-2 text-sm text-[var(--color-muted)]">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span aria-hidden>•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Services

