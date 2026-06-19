import { useState } from 'react'
import { PROPERTIES, ORDER_BOOK } from '../data'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function Secondary() {
  const [activeProperty, setActiveProperty] = useState('pune-persistent')
  const tradableProps = PROPERTIES.filter(p => p.status === 'open' || p.status === 'funded')
  const ob = ORDER_BOOK[activeProperty] || { buys: [], sells: [] }
  const prop = PROPERTIES.find(p => p.id === activeProperty)

  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Secondary market</p>

      <div className="flex gap-2 mb-5">
        {tradableProps.map(p => (
          <button
            key={p.id}
            onClick={() => setActiveProperty(p.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              activeProperty === p.id
                ? 'bg-teal-50 border-teal-200 text-teal-700'
                : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'
            }`}
          >
            {p.ticker}
          </button>
        ))}
      </div>

      {prop && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-base font-semibold text-gray-900">{prop.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{prop.ticker} · Face value ₹1,00,000</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold text-gray-900">₹{prop.navPerUnit.toLocaleString('en-IN')}</p>
              <p className={`text-xs font-medium mt-0.5 flex items-center justify-end gap-1 ${prop.navChange >= 0 ? 'text-teal-600' : 'text-red-500'}`}>
                {prop.navChange >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {prop.navChange >= 0 ? '+' : ''}{prop.navChange}% today
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-teal-600 mb-2 flex items-center gap-1">
                <TrendingUp size={12} /> BUY orders
              </p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-400 font-medium py-1.5">Price</th>
                    <th className="text-center text-gray-400 font-medium py-1.5">Units</th>
                    <th className="text-right text-gray-400 font-medium py-1.5">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {ob.buys.map((b, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 font-medium text-teal-600">₹{b.price.toLocaleString('en-IN')}</td>
                      <td className="py-2 text-center text-gray-600">{b.units}</td>
                      <td className="py-2 text-right text-gray-400">₹{(b.price * b.units / 100000).toFixed(2)}L</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-500 mb-2 flex items-center gap-1">
                <TrendingDown size={12} /> SELL orders
              </p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-400 font-medium py-1.5">Price</th>
                    <th className="text-center text-gray-400 font-medium py-1.5">Units</th>
                    <th className="text-right text-gray-400 font-medium py-1.5">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {ob.sells.map((s, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 font-medium text-red-500">₹{s.price.toLocaleString('en-IN')}</td>
                      <td className="py-2 text-center text-gray-600">{s.units}</td>
                      <td className="py-2 text-right text-gray-400">₹{(s.price * s.units / 100000).toFixed(2)}L</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => alert('Prototype — no real orders accepted.')}
              className="flex-1 py-2.5 bg-teal-400 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Place buy order
            </button>
            <button
              onClick={() => alert('Prototype — no real orders accepted.')}
              className="flex-1 py-2.5 bg-red-400 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Place sell order
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            0.5% platform fee on every trade (buyer + seller) · All settlements via SEBI-registered escrow
          </p>
        </div>
      )}
    </div>
  )
}
