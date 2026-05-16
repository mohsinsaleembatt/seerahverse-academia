import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { motion } from 'framer-motion'

const Community = () => {
  const { isAuthenticated, user } = useAuth()
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [category, setCategory] = useState('general')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [replyText, setReplyText] = useState({})

  useEffect(() => {
    // Load posts from localStorage
    const storedPosts = localStorage.getItem('communityPosts')
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts))
      } catch (error) {
        console.error('Failed to load posts:', error)
      }
    }
  }, [])

  const categories = ['all', 'general', 'questions', 'resources', 'announcements', 'events']

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      alert('Please sign in to post')
      return
    }

    if (!newPost.trim()) return

    const post = {
      id: Date.now(),
      author: user.fullName,
      authorId: user.id,
      category,
      content: newPost,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
      liked: false,
    }

    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts))
    setNewPost('')
  }

  const handleReply = (postId) => {
    if (!isAuthenticated) {
      alert('Please sign in to reply')
      return
    }

    if (!replyText[postId]?.trim()) return

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: Date.now(),
              author: user.fullName,
              content: replyText[postId],
              createdAt: new Date().toISOString(),
              likes: 0,
            },
          ],
        }
      }
      return post
    })

    setPosts(updatedPosts)
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts))
    setReplyText({ ...replyText, [postId]: '' })
  }

  const toggleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        }
      }
      return post
    })
    setPosts(updatedPosts)
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts))
  }

  const filteredPosts = posts.filter((post) => selectedCategory === 'all' || post.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Community</h1>
            <p className="text-lg text-[var(--color-muted)]">
              Connect with fellow learners, ask questions, and share resources.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              {isAuthenticated && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-[var(--color-muted)] mb-2">What's on your mind?</p>
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your thoughts, questions, or resources..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none min-h-24"
                    />
                  </div>

                  <div className="flex gap-4 items-center">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors text-sm"
                    >
                      <option value="general">General</option>
                      <option value="questions">Question</option>
                      <option value="resources">Resource</option>
                      <option value="announcements">Announcement</option>
                      <option value="events">Events</option>
                    </select>
                    <button
                      onClick={handlePostSubmit}
                      className="ml-auto bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${selectedCategory === cat
                        ? 'bg-[var(--color-primary)] text-[var(--color-bg)]'
                        : 'bg-white/5 border border-white/10 text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'
                      }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Posts Feed */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <motion.div key={post.id} variants={itemVariants} className="glass-card rounded-2xl p-6">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center font-bold">
                              {post.author.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-[var(--color-text-primary)]">{post.author}</p>
                              <p className="text-xs text-[var(--color-muted)]">
                                {new Date(post.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
                          {post.category}
                        </span>
                      </div>

                      {/* Post Content */}
                      <p className="text-[var(--color-muted)] mb-4">{post.content}</p>

                      {/* Post Actions */}
                      <div className="flex gap-6 py-4 border-t border-white/10">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.liked ? 'text-red-400' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                          <span>{post.liked ? '❤️' : '🤍'}</span>
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                          <span>💬</span>
                          {post.replies.length}
                        </button>
                        <button className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                          <span>↗️</span>
                          Share
                        </button>
                      </div>

                      {/* Replies */}
                      {post.replies.length > 0 && (
                        <div className="mt-4 space-y-3 pl-4 border-l border-white/10">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="text-sm">
                              <p className="font-semibold text-[var(--color-text-primary)]">{reply.author}</p>
                              <p className="text-[var(--color-text-muted)] mt-1">{reply.content}</p>
                              <p className="text-xs text-[var(--color-text-muted-secondary)] mt-1">
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      {isAuthenticated && (
                        <div className="mt-4 flex gap-2">
                          <input
                            type="text"
                            value={replyText[post.id] || ''}
                            onChange={(e) => setReplyText({ ...replyText, [post.id]: e.target.value })}
                            placeholder="Write a reply..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                          />
                          <button
                            onClick={() => handleReply(post.id)}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-sm transition-colors"
                          >
                            Reply
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-[var(--color-text-muted)]">No posts yet. Be the first to start a discussion!</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community Stats */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-muted)]">Total Members</span>
                    <span className="text-2xl font-bold text-[var(--color-primary)]">1.2K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-text-muted)]">Active Discussions</span>
                    <span className="text-2xl font-bold text-orange-500">{filteredPosts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-text-muted)]">Messages Today</span>
                    <span className="text-2xl font-bold text-[var(--color-text-muted-secondary)]">342</span>
                  </div>
                </div>
              </div>

              {/* Featured Members */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {['Ahmed Hassan', 'Fatima Khan', 'Muhammad Ali'].map((name, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-sm font-bold">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]\">{name}</p>
                        <p className="text-xs text-[var(--color-text-muted)]\">⭐ {50 - index * 10} posts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guidelines */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Community Guidelines</h3>
                <ul className="text-sm text-[var(--color-muted)] space-y-2">
                  <li>✓ Be respectful to all members</li>
                  <li>✓ Stay on topic</li>
                  <li>✓ No spam or self-promotion</li>
                  <li>✓ Share knowledge generously</li>
                  <li>✓ Report inappropriate content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Community
