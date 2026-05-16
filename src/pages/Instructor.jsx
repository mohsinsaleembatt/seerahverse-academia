const Instructor = () => {
  return (
    <section className="page-shell space-y-6">
      <div className="glass-card rounded-[var(--radius-lg)] p-6 shadow-soft space-y-3">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Join as instructor</p>
        <h1 className="text-3xl font-semibold">Share your expertise with our learners.</h1>
        <p className="text-[var(--color-muted)]">
          We curate instructors who blend domain mastery with empathy and mentorship. Tell us about your experience and
          how you would like to contribute.
        </p>
        <a
          href="mailto:info@seerahverse.org?subject=Instructor%20Application"
          className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--color-primary)] to-orange-500 px-5 py-3 text-sm font-semibold shadow-soft"
        >
          Apply now
          <span aria-hidden>→</span>
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          'Cohort-based teaching with live sessions and async feedback.',
          'Project-first approach so learners can apply immediately.',
          'Support from our team for curriculum design and delivery.',
        ].map((item) => (
          <div key={item} className="glass-card rounded-[var(--radius-lg)] p-4 text-sm text-[var(--color-muted)]">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Instructor

