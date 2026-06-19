import { useNavigate } from 'react-router-dom'
import { Building2, ShieldCheck } from 'lucide-react'

const statusConfig = {
  open: { label: 'Open', class: 'bg-teal-50 text-teal-700' },
  funded: { label: 'Fully funded', class: 'bg-blue-50 text-blue-700' },
  coming: { label: 'Coming soon', class: 'bg-amber-50 text-amber-700' },
}

export default function PropertyCard({ property, showInvestBtn = true }) {
  const navigate = useNavigate()
  const sc = statusConfig[property.status]
  const fillColor = property.status === 'funded' ? 'bg-blue-400' : property.status === 'coming' ? 'bg-gray-300' : 'bg-teal-400'

  return (
    <div
      className="bg-white border border-gray-100 rounded-xl p-5 cursor-pointer hover:border-gray-200 transition-colors"
      onClick={() => navigate(`/app/properties/${property.id}`)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-2">
          <p className="text-sm font-medium text-gray-900 leading-snug">{property.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{property.location}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${sc.class}`}>
          {sc.label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-400">Gross yield</p>
          <p className="text-base font-semibold text-gray-900">{property.grossYield}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Net yield</p>
          <p className="text-base font-semibold text-gray-900">{property.netYield}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Min invest</p>
          <p className="text-base font-semibold text-gray-900">₹10L</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${fillColor} transition-all`}
            style={{ width: `${property.fundedPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹{property.raised}Cr raised</span>
          <span>{property.fundedPct}% funded</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Building2 size={12} className="text-gray-400" />
          <span className="text-xs text-gray-500">{property.tenant}</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">{property.tenantRating}</span>
        </div>
        {property.rera && (
          <span className="flex items-center gap-1 text-xs text-teal-600">
            <ShieldCheck size={11} />
            RERA
          </span>
        )}
      </div>

      {showInvestBtn && property.status === 'open' && (
        <button
          className="mt-3 w-full py-2 bg-teal-400 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors"
          onClick={e => { e.stopPropagation(); navigate(`/app/properties/${property.id}`) }}
        >
          Invest now — ₹10L min
        </button>
      )}
    </div>
  )
}
