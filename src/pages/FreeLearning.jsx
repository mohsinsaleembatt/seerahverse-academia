import { freeCourses, upcomingCourses } from '../assets/data/siteContent.js'

const Card = ({ item }) => (
  <article className="glass-card rounded-[var(--radius-lg)] overflow-hidden shadow-soft flex flex-col">
    <img src={item.image} alt={item.title} className="h-44 w-full object-cover" loading="lazy" />
    <div className="flex-1 space-y-3 p-4">
      <div className="flex items-center justify-between text-xs text-[var(--color-muted)] uppercase tracking-[0.08em]">
        <span>{item.duration}</span>
        <span>{item.level}</span>
      </div>
      <h3 className="text-xl font-semibold">{item.title}</h3>
      <p className="text-sm text-[var(--color-muted)]">{item.blurb}</p>
    </div>
    <div className="border-t border-white/5 p-4 flex items-center justify-between text-sm font-semibold">
      <div className="space-y-1">
        <p className="text-white flex items-center gap-2">
          <span aria-hidden>💲</span> {item.priceUsd}
        </p>
        <p className="text-[var(--color-muted)] flex items-center gap-2">
          <span aria-hidden>₹</span> {item.priceInr}
        </p>
      </div>
      <button className="rounded-[var(--radius-pill)] bg-white/10 px-4 py-2 text-xs uppercase tracking-wide hover:bg-white/20">
        Join now
      </button>
    </div>
  </article>
)

const FreeLearning = () => {
  return (
    <div className="space-y-12">
      <section className="page-shell">
        <div className="glass-card rounded-[var(--radius-lg)] p-6 shadow-soft space-y-3">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Free & Upcoming</p>
          <h1 className="text-3xl font-semibold">For the sake of generations</h1>
          <p className="text-[var(--color-muted)]">
            Open learning circles and early previews of the tracks we are about to launch.
          </p>
        </div>
      </section>

      <section className="page-shell space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-2xl font-semibold">Free courses</h2>
          <p className="text-sm text-[var(--color-muted)]">Always-on access for the community.</p>
        </div>
        <div className="grid gap-[var(--grid-gap)] sm:grid-cols-2">
          {freeCourses.map((item) => (
            <Card key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="page-shell space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-2xl font-semibold">Upcoming</h2>
          <p className="text-sm text-[var(--color-muted)]">Sneak peeks—join the waitlist.</p>
        </div>
        <div className="grid gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-3">
          {upcomingCourses.map((item) => (
            <Card key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default FreeLearning

