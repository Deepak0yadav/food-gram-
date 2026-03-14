import { createContext, useContext, useState } from 'react'
import { logoutUser, logoutPartner } from '../api/auth'

const AuthContext = createContext(null)

function getStoredAuth() {
  try {
    const stored = localStorage.getItem('auth')
    return stored ? JSON.parse(stored) : { user: null, userType: null }
  } catch {
    return { user: null, userType: null }
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth)

  function login(user, userType) {
    const next = { user, userType }
    setAuth(next)
    localStorage.setItem('auth', JSON.stringify(next))
  }

  async function logout() {
    try {
      if (auth.userType === 'partner') {
        await logoutPartner()
      } else {
        await logoutUser()
      }
    } catch {
      // clear state regardless of network error
    }
    setAuth({ user: null, userType: null })
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
