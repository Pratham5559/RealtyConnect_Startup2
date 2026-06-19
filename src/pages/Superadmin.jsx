import { useMemo, useState } from 'react'
import { Lock, ShieldCheck, Users, IndianRupee, TrendingUp, Search, Mail, Phone } from 'lucide-react'
import { INVESTORS, PROPERTIES } from '../data'

const SUPERADMIN_EMAIL_HASH = 'fa43e4ca5db6d2a24c76a0a6fa87761b084e29e024bad2799d8f317cd8521a38'

function formatInr(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function propertyNames(holdings) {
  return holdings
    .map(holding => {
      const property = PROPERTIES.find(p => p.id === holding.propertyId)
      return property ? `${property.name} (${holding.units} units)` : `${holding.propertyId} (${holding.units} units)`
    })
    .join(', ')
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

export default function Superadmin() {
  const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('rc_superadmin_unlocked') === 'true')
  const [draftEmail, setDraftEmail] = useState('')
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  const totals = useMemo(() => {
    return INVESTORS.reduce(
      (acc, investor) => ({
        invested: acc.invested + investor.invested,
        nav: acc.nav + investor.currentNav,
        income: acc.income + investor.income,
      }),
      { invested: 0, nav: 0, income: 0 }
    )
  }, [])

  const filteredInvestors = INVESTORS.filter(investor => {
    const search = query.trim().toLowerCase()
    if (!search) return true
    return [investor.name, investor.email, investor.phone, investor.city, investor.kyc, investor.id]
      .some(value => value.toLowerCase().includes(search))
  })

  async function handleUnlock(e) {
    e.preventDefault()
    const normalizedEmail = draftEmail.trim().toLowerCase()
    const emailHash = await sha256(normalizedEmail)
    if (emailHash !== SUPERADMIN_EMAIL_HASH) {
      setError('This email is not registered as the superadmin.')
      return
    }

    localStorage.setItem('rc_superadmin_unlocked', 'true')
    setIsAuthorized(true)
    setDraftEmail('')
    setError('')
  }

  function handleSignOut() {
    localStorage.removeItem('rc_superadmin_unlocked')
    setIsAuthorized(false)
    setDraftEmail('')
  }

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="w-11 h-11 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
          <Lock size={20} />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Superadmin access</h1>
        <p className="text-sm text-gray-500 mb-5">
          Enter the registered superadmin email to view all investors.
        </p>

        <form onSubmit={handleUnlock} className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Superadmin email</label>
            <input
              type="email"
              required
              value={draftEmail}
              onChange={e => setDraftEmail(e.target.value)}
              placeholder="Enter superadmin email"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>
          {error && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-teal-400 hover:bg-teal-600 text-white font-medium rounded-lg text-sm transition-colors"
          >
            Unlock panel
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-medium mb-2">
            <ShieldCheck size={12} />
            Superadmin
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Investor control panel</h1>
          <p className="text-sm text-gray-500 mt-1">Signed in as superadmin</p>
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-500 hover:text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2 transition-colors"
        >
          Sign out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total investors', value: INVESTORS.length, icon: Users },
          { label: 'Capital invested', value: formatInr(totals.invested), icon: IndianRupee },
          { label: 'Current NAV', value: formatInr(totals.nav), icon: TrendingUp },
          { label: 'Income paid', value: formatInr(totals.income), icon: IndianRupee },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Icon size={13} className="text-gray-400" />
              <p className="text-xs text-gray-400">{label}</p>
            </div>
            <p className="text-xl font-semibold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">All investors</h2>
            <p className="text-xs text-gray-400 mt-0.5">{filteredInvestors.length} visible records</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search investors"
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">Investor</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">KYC</th>
                <th className="px-4 py-3 font-medium">Invested</th>
                <th className="px-4 py-3 font-medium">Current NAV</th>
                <th className="px-4 py-3 font-medium">Holdings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvestors.map(investor => (
                <tr key={investor.id} className="align-top">
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-900">{investor.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{investor.id} · {investor.city}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Joined {investor.joined}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="flex items-center gap-1.5 text-gray-700">
                      <Mail size={12} className="text-gray-400" />
                      {investor.email}
                    </p>
                    <p className="flex items-center gap-1.5 text-gray-500 mt-1">
                      <Phone size={12} className="text-gray-400" />
                      {investor.phone}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      investor.kyc === 'Verified'
                        ? 'bg-teal-50 text-teal-700'
                        : investor.kyc === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                    }`}>
                      {investor.kyc}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">{investor.risk} risk</p>
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900">{formatInr(investor.invested)}</td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-900">{formatInr(investor.currentNav)}</p>
                    <p className="text-xs text-teal-600 mt-0.5">{formatInr(investor.income)} income</p>
                  </td>
                  <td className="px-4 py-4 text-gray-500 min-w-64">{propertyNames(investor.holdings)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
