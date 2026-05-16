import { ctaCard } from '../assets/data/siteContent.js'

const Homeschooling = () => {
  return (
    <div className="space-y-10">
      <section className="page-shell">
        <div className="glass-card rounded-[var(--radius-lg)] p-6 shadow-soft space-y-4">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">{ctaCard.eyebrow}</p>
          <h1 className="text-3xl font-semibold">{ctaCard.title}</h1>
          <p className="text-[var(--color-muted)]">{ctaCard.body}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] bg-white/5 p-4">
              <h3 className="font-semibold">Parents + Learners</h3>
              <p className="text-sm text-[var(--color-muted)]">Coach parents to facilitate, learners to own outcomes.</p>
            </div>
            <div className="rounded-[var(--radius-lg)] bg-white/5 p-4">
              <h3 className="font-semibold">Weekly rhythm</h3>
              <p className="text-sm text-[var(--color-muted)]">Live cohorts, async practice, reflective journaling.</p>
            </div>
          </div>
          <a
            href="mailto:info@seerahverse.org"
            className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--color-primary)] to-orange-500 px-5 py-3 text-sm font-semibold shadow-soft"
          >
            {ctaCard.actionLabel}
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Homeschooling

