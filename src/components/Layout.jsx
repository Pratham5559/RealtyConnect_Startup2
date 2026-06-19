import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Building2, PieChart, ArrowLeftRight, ShieldCheck, Crown } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/properties', icon: Building2, label: 'Properties' },
  { to: '/app/portfolio', icon: PieChart, label: 'Portfolio' },
  { to: '/app/secondary', icon: ArrowLeftRight, label: 'Market' },
  { to: '/app/superadmin', icon: Crown, label: 'Superadmin' },
]

export default function Layout() {
  const [lang, setLang] = useState('en')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 h-14 flex items-center px-6 justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 font-semibold text-gray-900 text-base">
            <span className="w-2 h-2 rounded-full bg-teal-400 inline-block"></span>
            RealtyConnect
          </button>
          <nav className="flex gap-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
            {['en', 'hi'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  lang === l ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                {l === 'en' ? 'EN' : 'हिं'}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium">
            <ShieldCheck size={11} />
            SEBI SM-REIT
          </span>
          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-semibold">
            RD
          </div>
        </div>
      </header>

      {/* Prototype notice */}
      <div className="bg-amber-50 border-b border-amber-100 px-6 py-2 text-xs text-amber-800 flex items-center gap-2">
        <span className="font-medium">Prototype:</span>
        {lang === 'en'
          ? 'No real money accepted. Minimum investment ₹10,00,000 per SEBI SM-REIT Regulations 2024.'
          : 'कोई वास्तविक पैसा स्वीकार नहीं। SEBI SM-REIT 2024 के तहत न्यूनतम निवेश ₹10,00,000।'}
      </div>

      <main className="flex-1 px-6 py-6 max-w-5xl mx-auto w-full">
        <Outlet context={{ lang }} />
      </main>

      <footer className="border-t border-gray-100 py-4 px-6 text-xs text-gray-400 text-center bg-white">
        RealtyConnect Pvt Ltd · SEBI SM-REIT Regulations 2024 · Minimum investment ₹10,00,000 · This is a prototype platform
      </footer>
    </div>
  )
}
