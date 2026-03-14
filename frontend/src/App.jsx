import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import PartnerLogin from './pages/PartnerLogin'
import PartnerRegister from './pages/PartnerRegister'
import PartnerDashboard from './pages/PartnerDashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/partner/register" element={<PartnerRegister />} />

          <Route element={<ProtectedRoute requiredType="partner" redirectTo="/partner/login" />}>
            <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
