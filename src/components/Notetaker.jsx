import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Notetaker.css'

const Notetaker = ({ courseSlug }) => {
  const [notes, setNotes] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${courseSlug}`)
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('notetaker_theme')
    if (savedTheme === 'dark') {
      setIsDarkTheme(true)
    }
  }, [courseSlug])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(`notes_${courseSlug}`, JSON.stringify(notes))
  }, [notes, courseSlug])

  // Apply theme class to body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('notetaker-dark-theme')
    } else {
      document.body.classList.remove('notetaker-dark-theme')
    }
    localStorage.setItem('notetaker_theme', isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

  const openDialog = (note = null) => {
    if (note) {
      setEditingNote(note)
      setFormData({ title: note.title, content: note.content })
    } else {
      setEditingNote(null)
      setFormData({ title: '', content: '' })
    }
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setEditingNote(null)
    setFormData({ title: '', content: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingNote) {
      // Update existing note
      setNotes(notes.map((note) => 
        note.id === editingNote.id 
          ? { ...note, title: formData.title, content: formData.content, updatedAt: new Date().toISOString() }
          : note
      ))
    } else {
      // Add new note
      const newNote = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setNotes([...notes, newNote])
    }
    closeDialog()
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  return (
    <div className={`notetaker-container ${isDarkTheme ? 'dark-theme' : ''}`}>
      <header className="notetaker-header">
        <h1 className="notetaker-title">Quick Notes</h1>
        <div className="notetaker-header-actions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openDialog()}
            className="notetaker-add-btn"
          >
            + Add Note
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="notetaker-theme-btn"
          >
            {isDarkTheme ? '☀️' : '🌙'}
          </motion.button>
        </div>
      </header>

      <main className="notetaker-notes-grid">
        <AnimatePresence>
          {notes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="notetaker-empty-state"
            >
              <h2>No notes yet</h2>
              <p>Click "Add Note" to create your first note for this course.</p>
            </motion.div>
          ) : (
            notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="notetaker-note-card"
              >
                <div className="notetaker-note-actions">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openDialog(note)}
                    className="notetaker-edit-btn"
                    aria-label="Edit note"
                  >
                    ✏️
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteNote(note.id)}
                    className="notetaker-delete-btn"
                    aria-label="Delete note"
                  >
                    🗑️
                  </motion.button>
                </div>
                <h3 className="notetaker-note-title">{note.title}</h3>
                <p className="notetaker-note-content">{note.content}</p>
                <p className="notetaker-note-date">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isDialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="notetaker-backdrop"
              onClick={closeDialog}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="notetaker-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="notetaker-dialog-content">
                <div className="notetaker-dialog-header">
                  <h2 className="notetaker-dialog-title">
                    {editingNote ? 'Edit Note' : 'Add New Note'}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeDialog}
                    className="notetaker-close-btn"
                    aria-label="Close dialog"
                  >
                    ✕
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} id="notetaker-form">
                  <div className="notetaker-form-group">
                    <label htmlFor="noteTitle" className="notetaker-form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      id="noteTitle"
                      className="notetaker-form-input"
                      placeholder="Enter note title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="notetaker-form-group">
                    <label htmlFor="noteContent" className="notetaker-form-label">
                      Content
                    </label>
                    <textarea
                      id="noteContent"
                      className="notetaker-form-textarea"
                      placeholder="Write your note here..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                    />
                  </div>

                  <div className="notetaker-dialog-actions">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeDialog}
                      className="notetaker-cancel-btn"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="notetaker-save-btn"
                    >
                      Save Note
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Notetaker

