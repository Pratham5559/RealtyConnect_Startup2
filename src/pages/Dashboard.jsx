import { useOutletContext } from 'react-router-dom'
import { TrendingUp, IndianRupee, Calendar, Activity, AlertTriangle } from 'lucide-react'
import { PROPERTIES, PORTFOLIO_HOLDINGS, IOT_DATA } from '../data'
import PropertyCard from '../components/PropertyCard'

const metrics = [
  { label: 'Total invested', value: '₹30L', sub: '2 properties', icon: IndianRupee },
  { label: 'Returns earned', value: '₹2.34L', sub: '+7.8% XIRR', icon: TrendingUp, subColor: 'text-teal-600' },
  { label: 'Next distribution', value: '₹54,750', sub: 'Due Jul 1', icon: Calendar },
  { label: 'Portfolio yield', value: '8.3%', sub: 'vs FD 7.0%', icon: Activity, subColor: 'text-teal-600' },
]

export default function Dashboard() {
  const { lang } = useOutletContext()
  const openProps = PROPERTIES.filter(p => p.status === 'open')

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {metrics.map(({ label, value, sub, icon: Icon, subColor }) => (
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

      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Open for investment</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {openProps.map(p => <PropertyCard key={p.id} property={p} />)}
      </div>

      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Building health — IoT live</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {IOT_DATA.map(d => (
          <div key={d.property} className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-medium text-gray-900">{d.property}</p>
              {d.alert && (
                <span className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                  <AlertTriangle size={10} /> Alert
                </span>
              )}
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className={`text-3xl font-semibold ${d.healthScore >= 80 ? 'text-teal-500' : 'text-amber-500'}`}>
                {d.healthScore}
              </span>
              <span className="text-xs text-gray-400 mb-1">/ 100 health score</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full ${d.healthScore >= 80 ? 'bg-teal-400' : 'bg-amber-400'}`}
                style={{width:`${d.healthScore}%`}}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[['HVAC', d.hvac], ['Electrical', d.electrical], ['Fire safety', d.fire]].map(([sys, val]) => (
                <div key={sys} className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-sm font-medium text-gray-900">{val}%</p>
                  <p className="text-xs text-gray-400">{sys}</p>
                </div>
              ))}
            </div>
            {d.alert && (
              <p className="text-xs text-amber-600 mt-3 bg-amber-50 rounded-lg p-2">{d.alertMsg}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
