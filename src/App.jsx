import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Waitlist from './pages/Waitlist'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Portfolio from './pages/Portfolio'
import Secondary from './pages/Secondary'
import Superadmin from './pages/Superadmin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Waitlist />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<PropertyDetail />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="secondary" element={<Secondary />} />
        <Route path="superadmin" element={<Superadmin />} />
      </Route>
    </Routes>
  )
}
