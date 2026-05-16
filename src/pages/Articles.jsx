import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load articles from localStorage
    const storedArticles = localStorage.getItem('articles')
    if (storedArticles) {
      try {
        setArticles(JSON.parse(storedArticles))
      } catch (error) {
        console.error('Failed to load articles:', error)
      }
    }
  }, [])

  const categories = ['all', 'technology', 'religion', 'science', 'education']

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)] pt-20 pb-10">
        <div className="page-shell">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Articles & Blog</h1>
            <p className="text-lg text-[var(--color-text-muted)]">
              Explore insightful articles on Quranic knowledge, science, and Islamic education.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--color-primary)] text-[var(--color-bg)]'
                    : 'bg-white/5 border border-white/10 text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <motion.article key={article.id} variants={itemVariants} className="group cursor-pointer">
                  <Link to={`/articles/${article.id}`}>
                    <div className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                      {/* Article Image */}
                      <div className="h-48 bg-gradient-to-r from-[var(--color-primary)]/20 to-orange-500/20 flex items-center justify-center overflow-hidden">
                        <div className="text-6xl group-hover:scale-110 transition-transform">{article.emoji || '📄'}</div>
                      </div>

                      {/* Article Content */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Category Badge */}
                        <div className="mb-3">
                          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
                            {article.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">{article.subtitle}</p>

                        {/* Author Info */}
                        <div className="mt-auto pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-sm font-semibold">
                                {article.author.charAt(0)}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[var(--color-text-primary)]">{article.author}</p>
                                {article.authorVerified && (
                                  <p className="text-xs text-[var(--color-primary)] flex items-center gap-1">
                                    ✓ Verified
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="text-xs text-[var(--color-text-muted)]">
                              {new Date(article.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-[var(--color-text-muted)] text-lg">No articles found. Check back soon!</p>
              </div>
            )}
          </motion.div>

          {/* Write Article CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Want to share your knowledge?</h2>
            <Link
              to="/admin/write-article"
              className="inline-block bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Write an Article
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Articles
