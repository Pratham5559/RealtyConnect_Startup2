import { useState } from 'react'
import { PROPERTIES } from '../data'
import PropertyCard from '../components/PropertyCard'

export default function Properties() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? PROPERTIES : PROPERTIES.filter(p => p.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">All properties</p>
        <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
          {[['all','All'],['open','Open'],['funded','Funded'],['coming','Coming soon']].map(([val,label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${filter===val?'bg-white text-gray-900 shadow-sm':'text-gray-500 hover:text-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
      </div>
    </div>
  )
}
