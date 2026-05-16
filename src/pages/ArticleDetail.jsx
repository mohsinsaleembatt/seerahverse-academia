import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

const ArticleDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load article from localStorage
    const storedArticles = localStorage.getItem('articles')
    if (storedArticles) {
      try {
        const articles = JSON.parse(storedArticles)
        const foundArticle = articles.find((a) => a.id === parseInt(id))
        setArticle(foundArticle)
      } catch (error) {
        console.error('Failed to load article:', error)
      }
    }
    setLoading(false)
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!article) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[var(--color-bg)] pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Article not found</h1>
            <button
              onClick={() => navigate('/articles')}
              className="text-[var(--color-primary)] hover:underline"
            >
              Back to articles
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)] pt-20 pb-10">
        <div className="page-shell max-w-3xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/articles')}
            className="mb-6 text-[var(--color-primary)] hover:underline font-semibold flex items-center gap-2"
          >
            ← Back to articles
          </button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">{article.title}</h1>
            <p className="text-xl text-[var(--color-text-muted)] mb-6">{article.subtitle}</p>

            {/* Author Info */}
            <div className="flex items-center gap-4 py-6 border-y border-white/10">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-lg font-semibold">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text-primary)]">
                  {article.author}
                  {article.authorVerified && <span className="ml-2 text-[var(--color-primary)]">✓ Verified Author</span>}
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {new Date(article.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <article className="glass-card rounded-2xl p-8 mb-8">
            <div
              className="prose prose-invert max-w-none text-[var(--color-text-muted)]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* Share Section */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-[var(--color-text-primary)] font-semibold mb-4">Share this article</p>
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[var(--color-text-muted)]">
                Share
              </button>
              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[var(--color-text-muted)]\">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default ArticleDetail
