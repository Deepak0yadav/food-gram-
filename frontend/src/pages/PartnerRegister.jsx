import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../components/AuthForm.css'
import { registerPartner } from '../api/auth'

function PartnerRegister() {
  const [form, setForm] = useState({ fullname: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.fullname || !form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      await registerPartner({ username: form.fullname, email: form.email, password: form.password })
      navigate('/partner/login')
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Become a partner</h2>
        <p className="auth-subtitle">Share your food with the world</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullname">Business / Full name</label>
            <input
              id="fullname"
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="My Restaurant"
              disabled={loading}
              autoComplete="organization"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@restaurant.com"
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account…' : 'Create partner account'}
          </button>
        </form>

        <div className="auth-footer">
          Already a partner? <Link to="/partner/login">Sign in</Link>
          {' · '}
          <Link to="/register">User register</Link>
        </div>
      </div>
    </div>
  )
}

export default PartnerRegister
