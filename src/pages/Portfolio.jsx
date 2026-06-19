import { PROPERTIES, PORTFOLIO_HOLDINGS, DISTRIBUTIONS } from '../data'
import { TrendingUp, IndianRupee, BarChart2, Layers } from 'lucide-react'

export default function Portfolio() {
  const totalInvested = PORTFOLIO_HOLDINGS.reduce((s, h) => s + h.invested, 0)
  const totalNav = PORTFOLIO_HOLDINGS.reduce((s, h) => s + h.currentNav, 0)
  const totalIncome = PORTFOLIO_HOLDINGS.reduce((s, h) => s + h.income, 0)
  const totalUnits = PORTFOLIO_HOLDINGS.reduce((s, h) => s + h.units, 0)

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Invested', value: `₹${(totalInvested/100000).toFixed(0)}L`, sub: `${PORTFOLIO_HOLDINGS.length} properties`, icon: IndianRupee },
          { label: 'Current NAV', value: `₹${(totalNav/100000).toFixed(2)}L`, sub: `+${(((totalNav-totalInvested)/totalInvested)*100).toFixed(1)}% total`, icon: TrendingUp, subColor: 'text-teal-600' },
          { label: 'Income received', value: `₹${(totalIncome/100000).toFixed(2)}L`, sub: '5 distributions', icon: BarChart2 },
          { label: 'Units held', value: totalUnits, sub: `across ${PORTFOLIO_HOLDINGS.length} SPVs`, icon: Layers },
        ].map(({ label, value, sub, icon: Icon, subColor }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Icon size={13} className="text-gray-400" />
              <p className="text-xs text-gray-400">{label}</p>
            </div>
            <p className="text-xl font-semibold text-gray-900">{value}</p>
            <p className={`text-xs mt-0.5 ${subColor || 'text-gray-400'}`}>{sub}</p>
          </div>
        ))}
      </div>

      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Your holdings</p>

      {PORTFOLIO_HOLDINGS.map(h => {
        const prop = PROPERTIES.find(p => p.id === h.propertyId)
        if (!prop) return null
        const gain = ((h.currentNav - h.invested) / h.invested * 100).toFixed(1)
        return (
          <div key={h.propertyId} className="bg-white border border-gray-100 rounded-xl p-5 mb-3">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{prop.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {h.units} units · {prop.spv}
                </p>
              </div>
              <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium">Active</span>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {[
                ['Invested', `₹${(h.invested/100000).toFixed(0)}L`],
                ['Current NAV', `₹${(h.currentNav/100000).toFixed(2)}L`],
                ['Income earned', `₹${h.income.toLocaleString('en-IN')}`],
                ['XIRR', `+${h.xirr}%`],
              ].map(([l,v]) => (
                <div key={l} className="text-center bg-gray-50 rounded-lg p-2.5">
                  <p className={`text-sm font-semibold ${l === 'XIRR' ? 'text-teal-600' : 'text-gray-900'}`}>{v}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-teal-400 rounded-full" style={{width:`${(h.currentNav/h.invested*100).toFixed(0)}%`}} />
            </div>
            <p className="text-xs text-gray-400">
              Next distribution: ₹{(h.units * prop.distPerUnit).toLocaleString('en-IN')} on {prop.nextDist} · quarterly
            </p>
          </div>
        )
      })}

      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 mt-6">Distribution history</p>
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Date', 'Property', 'Amount', 'Type', 'Status'].map(h => (
                <th key={h} className="text-left text-xs text-gray-400 font-medium px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DISTRIBUTIONS.map((d, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-600">{d.date}</td>
                <td className="px-4 py-3 text-gray-900">{d.property}</td>
                <td className="px-4 py-3 font-medium text-teal-600">₹{d.amount.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{d.type}</td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium">Paid</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
