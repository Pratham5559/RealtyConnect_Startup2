import { X, ShieldCheck } from 'lucide-react'

export default function InvestModal({ property, onClose }) {
  if (!property) return null

  const entryFee = 20000
  const total = 1000000 + entryFee

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Invest in {property.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{property.spv}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {[
            ['Units', '10 units'],
            ['Face value per unit', '₹1,00,000'],
            ['Investment amount', '₹10,00,000'],
            ['Entry fee (2%)', '₹20,000'],
            ['Total payable', `₹${(total).toLocaleString('en-IN')}`],
            ['Expected net yield', `${property.netYield}% p.a.`],
            ['First distribution', property.nextDist],
            ['Escrow', 'IDBI Trusteeship · SEBI registered'],
            ['Valuation', `${property.valuer} · ${property.valuationDate}`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2 border-b border-gray-50 text-sm">
              <span className="text-gray-500">{label}</span>
              <span className={`font-medium ${label === 'Expected net yield' ? 'text-teal-600' : 'text-gray-900'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => alert('Prototype only — no real investment accepted.')}
            className="flex-2 flex-1 py-2.5 bg-teal-400 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
          >
            Proceed to KYC
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
          <ShieldCheck size={11} />
          Prototype only — no real money accepted · SEBI SM-REIT min ₹10,00,000
        </p>
      </div>
    </div>
  )
}
