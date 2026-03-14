import { Outlet, Link, useNavigate } from 'react-router-dom'
import './Layout.css'
import { useAuth } from '../context/AuthContext'

function Layout() {
  const { user, userType, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Food Reels</Link>
        <div className="navbar-links">
          {user ? (
            <>
              <span className="navbar-username">{user.username}</span>
              {userType === 'partner' && (
                <Link to="/partner/dashboard">Dashboard</Link>
              )}
              <button className="navbar-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/partner/login">Partner</Link>
            </>
          )}
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
