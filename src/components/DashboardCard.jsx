import { motion } from 'framer-motion'

const DashboardCard = ({ icon, label, value, detail, url, accent }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-card rounded-[var(--radius-lg)] p-6 border border-white/10 hover:border-white/15 transition-all duration-300"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-[var(--color-text-muted)]">{label}</p>
                    <p className="mt-3 text-3xl sm:text-4xl font-semibold text-[var(--color-text-primary)]">{value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl shadow-soft">
                    {icon}
                </div>
            </div>

            {detail && <p className="mt-4 text-sm text-[var(--color-text-muted)]">{detail}</p>}

            {url && (
                <a href={url} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-white transition-colors">
                    <span>View details</span>
                    <span aria-hidden>→</span>
                </a>
            )}

            {accent && <span className="mt-4 inline-flex rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">{accent}</span>}
        </motion.article>
    )
}

export default DashboardCard
