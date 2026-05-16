// import { useState, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext.jsx'
// import PageTransition from '../components/PageTransition.jsx'

// const WriteArticle = () => {
//   const navigate = useNavigate()
//   const { user, isAuthenticated } = useAuth()
//   const editorRef = useRef(null)
//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     category: 'technology',
//     content: '',
//   })
//   const [errors, setErrors] = useState({})
//   const [isLoading, setIsLoading] = useState(false)

//   if (!isAuthenticated) {
//     return (
//       <PageTransition>
//         <div className="min-h-screen bg-[var(--color-bg)] pt-20 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Sign in to write articles</h1>
//             <p className="text-[var(--color-muted)] mb-6">You must be logged in to write and publish articles.</p>
//             <button
//               onClick={() => navigate('/login')}
//               className="bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       </PageTransition>
//     )
//   }

//   const applyFormatting = (command, value = null) => {
//     document.execCommand(command, false, value)
//     editorRef.current?.focus()
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
//   }

//   const handleContentChange = (e) => {
//     setFormData((prev) => ({ ...prev, content: e.currentTarget.innerHTML }))
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     if (!formData.title.trim()) newErrors.title = 'Article title is required'
//     if (!formData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required'
//     if (!formData.content.trim()) newErrors.content = 'Article content is required'
//     return newErrors
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const newErrors = validateForm()
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors)
//       return
//     }

//     setIsLoading(true)
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       const newArticle = {
//         id: Date.now(),
//         ...formData,
//         author: user.fullName,
//         authorVerified: user.role === 'admin',
//         createdAt: new Date().toISOString(),
//         emoji: '📄',
//       }

//       const articles = JSON.parse(localStorage.getItem('articles') || '[]')
//       articles.push(newArticle)
//       localStorage.setItem('articles', JSON.stringify(articles))

//       navigate('/articles', { state: { message: 'Article published successfully!' } })
//     } catch (error) {
//       setErrors({ submit: 'Failed to publish article. Please try again.' })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const ToolButton = ({ icon, title, onClick, shortcut }) => (
//     <button
//       type="button"
//       onClick={onClick}
//       title={`${title} ${shortcut ? `(${shortcut})` : ''}`}
//       className="p-2 hover:bg-white/10 rounded transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
//     >
//       {icon}
//     </button>
//   )

//   return (
//     <PageTransition>
//       <div className="min-h-screen bg-[var(--color-bg)] pt-20 pb-10">
//         <div className="page-shell max-w-4xl">
//           <div className="mb-8">
//             <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-2">Write Article</h1>
//             <p className="text-[var(--color-muted)]">Share your knowledge and insights with our community</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Article Title *</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Enter your article title..."
//                 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors text-lg"
//               />
//               {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
//             </div>

//             {/* Subtitle */}
//             <div>
//               <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Subtitle *</label>
//               <input
//                 type="text"
//                 name="subtitle"
//                 value={formData.subtitle}
//                 onChange={handleChange}
//                 placeholder="Brief summary of your article..."
//                 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
//               />
//               {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Category *</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
//               >
//                 <option value="technology">Technology</option>
//                 <option value="religion">Religion & Islam</option>
//                 <option value="science">Science & Quran</option>
//                 <option value="education">Education</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             {/* Rich Text Editor */}
//             <div>
//               <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Article Content *</label>

//               {/* Toolbar */}
//               <div className="flex flex-wrap gap-1 mb-4 p-3 bg-white/5 border border-white/10 rounded-t-lg">
//                 <ToolButton
//                   icon="<b>B</b>"
//                   title="Bold"
//                   onClick={() => applyFormatting('bold')}
//                   shortcut="Ctrl+B"
//                 />
//                 <ToolButton
//                   icon="<i>I</i>"
//                   title="Italic"
//                   onClick={() => applyFormatting('italic')}
//                   shortcut="Ctrl+I"
//                 />
//                 <ToolButton
//                   icon="<u>U</u>"
//                   title="Underline"
//                   onClick={() => applyFormatting('underline')}
//                   shortcut="Ctrl+U"
//                 />
//                 <div className="w-px bg-white/10 mx-2"></div>
//                 <ToolButton
//                   icon="H1"
//                   title="Heading 1"
//                   onClick={() => applyFormatting('formatBlock', '<h1>')}
//                 />
//                 <ToolButton
//                   icon="H2"
//                   title="Heading 2"
//                   onClick={() => applyFormatting('formatBlock', '<h2>')}
//                 />
//                 <ToolButton
//                   icon="H3"
//                   title="Heading 3"
//                   onClick={() => applyFormatting('formatBlock', '<h3>')}
//                 />
//                 <div className="w-px bg-white/10 mx-2"></div>
//                 <ToolButton
//                   icon="•"
//                   title="Bullet List"
//                   onClick={() => applyFormatting('insertUnorderedList')}
//                 />
//                 <ToolButton
//                   icon="1."
//                   title="Numbered List"
//                   onClick={() => applyFormatting('insertOrderedList')}
//                 />
//                 <div className="w-px bg-white/10 mx-2"></div>
//                 <ToolButton
//                   icon='"'
//                   title="Quote"
//                   onClick={() => applyFormatting('formatBlock', '<blockquote>')}
//                 />
//                 <ToolButton
//                   icon="←"
//                   title="Decrease Indent"
//                   onClick={() => applyFormatting('outdent')}
//                 />
//                 <ToolButton
//                   icon="→"
//                   title="Increase Indent"
//                   onClick={() => applyFormatting('indent')}
//                 />
//                 <div className="w-px bg-white/10 mx-2"></div>
//                 <ToolButton
//                   icon="↶"
//                   title="Undo"
//                   onClick={() => applyFormatting('undo')}
//                   shortcut="Ctrl+Z"
//                 />
//                 <ToolButton
//                   icon="↷"
//                   title="Redo"
//                   onClick={() => applyFormatting('redo')}
//                   shortcut="Ctrl+Y"
//                 />
//               </div>

//               {/* Content Editor */}
//               <div
//                 ref={editorRef}
//                 contentEditable
//                 onInput={handleContentChange}
//                 className="w-full min-h-96 bg-white/5 border border-white/10 rounded-b-lg px-4 py-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors overflow-auto"
//                 suppressContentEditableWarning
//               />
//               {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
//             </div>

//             {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

//             {/* Buttons */}
//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? 'Publishing...' : 'Publish Article'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate('/articles')}
//                 className="flex-1 bg-white/5 border border-white/10 text-[var(--color-text-primary)] font-semibold py-3 rounded-lg hover:bg-white/10 transition-all"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </PageTransition>
//   )
// }

// export default WriteArticle



import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import PageTransition from '../components/PageTransition.jsx'

const WriteArticle = () => {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()

    const editorRef = useRef(null)

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        category: 'technology',
        content: '',
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    if (!isAuthenticated) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-[var(--color-bg)] pt-20 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                            Sign in to write articles
                        </h1>
                        <p className="text-[var(--color-muted)] mb-6">
                            You must be logged in to write and publish articles.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </PageTransition>
        )
    }

    const applyFormatting = (command, value = null) => {
        document.execCommand(command, false, value)
        editorRef.current?.focus()
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    // ✅ SAFE contentEditable handler
    const handleContentChange = () => {
        if (!editorRef.current) return

        setFormData((prev) => ({
            ...prev,
            content: editorRef.current.innerHTML,
        }))

        if (errors.content) {
            setErrors((prev) => ({ ...prev, content: '' }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.title.trim()) newErrors.title = 'Article title is required'
        if (!formData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required'
        if (!formData.content.trim()) newErrors.content = 'Article content is required'
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = validateForm()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const newArticle = {
                id: Date.now(),
                ...formData,
                author: user.fullName,
                authorVerified: user.role === 'admin',
                createdAt: new Date().toISOString(),
                emoji: '📄',
            }

            const articles = JSON.parse(localStorage.getItem('articles') || '[]')
            articles.push(newArticle)
            localStorage.setItem('articles', JSON.stringify(articles))

            navigate('/articles', {
                state: { message: 'Article published successfully!' },
            })
        } catch {
            setErrors({ submit: 'Failed to publish article. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const ToolButton = ({ icon, title, onClick, shortcut }) => (
        <button
            type="button"
            onClick={onClick}
            title={`${title}${shortcut ? ` (${shortcut})` : ''}`}
            className="p-2 hover:bg-white/10 rounded transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
        >
            {icon}
        </button>
    )

    return (
        <PageTransition>
            <div className="min-h-screen bg-[var(--color-bg)] pt-20 pb-10">
                <div className="page-shell max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-2">
                        Write Article
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Article title"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-lg"
                        />

                        {/* Subtitle */}
                        <input
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            placeholder="Subtitle"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                        />

                        {/* Editor */}
                        <div className="border border-white/10 rounded-lg">
                            <div className="flex gap-1 p-2 bg-white/5 border-b border-white/10">
                                <ToolButton icon={<b>B</b>} title="Bold" onClick={() => applyFormatting('bold')} />
                                <ToolButton icon={<i>I</i>} title="Italic" onClick={() => applyFormatting('italic')} />
                                <ToolButton icon={<u>U</u>} title="Underline" onClick={() => applyFormatting('underline')} />
                            </div>

                            <div
                                ref={editorRef}
                                contentEditable
                                onInput={handleContentChange}
                                suppressContentEditableWarning
                                className="min-h-96 p-4 bg-white/5 focus:outline-none"
                            />
                        </div>

                        {errors.content && <p className="text-red-500">{errors.content}</p>}
                        {errors.submit && <p className="text-red-500">{errors.submit}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[var(--color-primary)] to-orange-500 py-3 rounded-lg text-white font-semibold"
                        >
                            {isLoading ? 'Publishing…' : 'Publish Article'}
                        </button>
                    </form>
                </div>
            </div>
        </PageTransition>
    )
}

export default WriteArticle
