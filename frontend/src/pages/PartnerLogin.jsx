import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../components/AuthForm.css'
import { loginPartner } from '../api/auth'
import { useAuth } from '../context/AuthContext'

function PartnerLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      const res = await loginPartner(form)
      login({ username: res.data.username, email: res.data.email }, 'partner')
      navigate('/partner/dashboard')
    } catch (err) {
      setError(err.response?.data || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Partner sign in</h2>
        <p className="auth-subtitle">Access your food partner dashboard</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
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
              placeholder="••••••••"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="auth-footer">
          No partner account?{' '}
          <Link to="/partner/register">Register here</Link>
          {' · '}
          <Link to="/login">User login</Link>
        </div>
      </div>
    </div>
  )
}

export default PartnerLogin
