import { useState } from 'react'
import { Link } from 'react-router-dom'
import './PartnerDashboard.css'
import { createFood } from '../api/food'
import { useAuth } from '../context/AuthContext'

function PartnerDashboard() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: '', video: '', description: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.video) {
      setError('Food name and video URL are required.')
      return
    }
    setLoading(true)
    try {
      await createFood(form)
      setSuccess('Food reel posted successfully!')
      setForm({ name: '', video: '', description: '' })
    } catch (err) {
      setError(err.response?.data || 'Failed to post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <h2>Partner Dashboard</h2>
      <p className="dashboard-subtitle">
        Welcome, {user?.username}. Post a new food reel below.
      </p>

      {error && <div className="dashboard-error">{error}</div>}
      {success && <div className="dashboard-success">{success}</div>}

      <form className="dashboard-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Food name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Spicy Ramen"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="video">Video URL</label>
          <input
            id="video"
            type="url"
            name="video"
            value={form.video}
            onChange={handleChange}
            placeholder="https://example.com/video.mp4"
            disabled={loading}
          />
          <span className="form-hint">Direct link to an .mp4 or similar video file</span>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description <span style={{ fontWeight: 400, color: '#9ca3af' }}>(optional)</span></label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell people about this dish…"
            rows={3}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Posting…' : 'Post reel'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#666' }}>
        <Link to="/">View feed</Link>
      </div>
    </div>
  )
}

export default PartnerDashboard
