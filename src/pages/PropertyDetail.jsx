import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2, ShieldCheck, MapPin, Calendar, TrendingUp, Users } from 'lucide-react'
import { PROPERTIES } from '../data'
import InvestModal from '../components/InvestModal'

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [showModal, setShowModal] = useState(false)
  const p = PROPERTIES.find(x => x.id === id)

  if (!p) return <div className="text-center py-20 text-gray-400">Property not found.</div>

  const tabs = ['overview', 'financials', 'documents', 'iot']

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors">
        <ArrowLeft size={15} /> Back to properties
      </button>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{p.name}</h1>
            <p className="flex items-center gap-1 text-sm text-gray-400 mt-1">
              <MapPin size={13} /> {p.location}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {p.rera && <span className="flex items-center gap-1 text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full"><ShieldCheck size={11}/> RERA</span>}
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.status==='open'?'bg-teal-50 text-teal-700':p.status==='funded'?'bg-blue-50 text-blue-700':'bg-amber-50 text-amber-700'}`}>
              {p.status==='open'?'Open':p.status==='funded'?'Fully funded':'Coming soon'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            ['Gross yield', `${p.grossYield}%`],
            ['Net yield', `${p.netYield}%`],
            ['Lease left', `${p.leaseYears} yr`],
            ['Property value', `₹${p.value}Cr`],
          ].map(([l,v]) => (
            <div key={l} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400">{l}</p>
              <p className="text-base font-semibold text-gray-900 mt-0.5">{v}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>₹{p.raised}Cr raised of ₹{p.target}Cr</span>
            <span>{p.fundedPct}% · {p.investors} investors</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${p.status==='funded'?'bg-blue-400':'bg-teal-400'}`} style={{width:`${p.fundedPct}%`}} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <Building2 size={14} className="text-gray-400" />
            <span className="text-sm text-gray-600">{p.tenant}</span>
            <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-medium">{p.tenantRating}</span>
            <span className="text-xs text-gray-400">{p.tenantType}</span>
          </div>
          {p.status === 'open' && (
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 bg-teal-400 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Invest — ₹10L min
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg mb-4 w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-xs rounded-md font-medium capitalize transition-colors ${tab===t?'bg-white text-gray-900 shadow-sm':'text-gray-500'}`}>
            {t === 'iot' ? 'IoT Health' : t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Property details</p>
            {[
              ['Area', `${p.sqft.toLocaleString()} sq ft`],
              ['City', `${p.city}, ${p.state}`],
              ['Tenant type', p.tenantType],
              ['Lease remaining', `${p.leaseYears} years`],
              ['SPV', p.spv],
              ['BSE ticker', p.ticker],
            ].map(([l,v]) => (
              <div key={l} className="flex justify-between py-2 border-b border-gray-50 text-sm last:border-0">
                <span className="text-gray-400">{l}</span>
                <span className="font-medium text-gray-900">{v}</span>
              </div>
            ))}
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Compliance</p>
            {[
              ['Valuation firm', p.valuer],
              ['Last valuation', p.valuationDate],
              ['OC status', p.oc ? 'Obtained' : 'Pending'],
              ['RERA registered', p.rera ? 'Yes' : 'No'],
              ['Escrow', 'IDBI Trusteeship'],
              ['SEBI regulation', 'SM-REIT 2024'],
            ].map(([l,v]) => (
              <div key={l} className="flex justify-between py-2 border-b border-gray-50 text-sm last:border-0">
                <span className="text-gray-400">{l}</span>
                <span className="font-medium text-gray-900">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'financials' && (
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Financial summary</p>
          {[
            ['Face value per unit', '₹1,00,000'],
            ['NAV per unit', `₹${p.navPerUnit.toLocaleString('en-IN')}`],
            ['NAV change today', `+${p.navChange}%`],
            ['Gross yield', `${p.grossYield}%`],
            ['Net yield', `${p.netYield}%`],
            ['Entry fee', '2% of investment'],
            ['Management fee', '1% per year (AUM)'],
            ['Distribution frequency', 'Quarterly'],
            ['Distribution mandate', '90%+ of net income'],
            ['Next distribution', p.nextDist],
            ['Distribution per unit', p.distPerUnit > 0 ? `₹${p.distPerUnit.toLocaleString('en-IN')}` : 'TBD'],
            ['LTCG holding', '1 year (Budget 2024)'],
            ['Tax on dividends', 'Tax-free in investor hands'],
          ].map(([l,v]) => (
            <div key={l} className="flex justify-between py-2 border-b border-gray-50 text-sm last:border-0">
              <span className="text-gray-400">{l}</span>
              <span className={`font-medium ${l.includes('yield') || l.includes('NAV change') ? 'text-teal-600' : 'text-gray-900'}`}>{v}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'documents' && (
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Documents</p>
          {[
            { name: 'CBRE Independent Valuation Report', date: p.valuationDate, status: 'Available' },
            { name: 'Registered Lease Deed', date: 'On record', status: 'Available' },
            { name: 'Occupancy Certificate', date: 'On record', status: p.oc ? 'Available' : 'Pending' },
            { name: 'RERA Certificate', date: 'On record', status: p.rera ? 'Available' : 'Pending' },
            { name: 'SPV Incorporation Certificate', date: 'On record', status: p.spv !== 'TBD' ? 'Available' : 'Pending' },
            { name: 'Q1 2026 Unaudited Financials', date: 'Apr 2026', status: 'Available' },
            { name: 'Annual Audit Report FY 2025', date: 'Aug 2025', status: 'Available' },
          ].map(doc => (
            <div key={doc.name} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{doc.date}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${doc.status==='Available'?'bg-teal-50 text-teal-700':'bg-gray-100 text-gray-500'}`}>
                {doc.status}
              </span>
            </div>
          ))}
          <p className="text-xs text-gray-400 mt-4">Document access available post-KYC verification</p>
        </div>
      )}

      {tab === 'iot' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { sys: 'HVAC system', val: 92, desc: '4 units · last serviced Mar 2026' },
            { sys: 'Electrical', val: 95, desc: 'Main + backup DG online' },
            { sys: 'Fire safety', val: 100, desc: 'Sprinklers + detectors certified' },
            { sys: 'Elevators', val: 88, desc: '2 of 2 operational' },
            { sys: 'Access control', val: 97, desc: 'Biometric + CCTV live' },
            { sys: 'Plumbing', val: 91, desc: 'No active leaks detected' },
          ].map(({ sys, val, desc }) => (
            <div key={sys} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-900">{sys}</p>
                <span className={`text-lg font-semibold ${val >= 90 ? 'text-teal-500' : val >= 75 ? 'text-amber-500' : 'text-red-500'}`}>{val}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className={`h-full rounded-full ${val >= 90 ? 'bg-teal-400' : val >= 75 ? 'bg-amber-400' : 'bg-red-400'}`} style={{width:`${val}%`}} />
              </div>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      )}

      {showModal && <InvestModal property={p} onClose={() => setShowModal(false)} />}
    </div>
  )
}
