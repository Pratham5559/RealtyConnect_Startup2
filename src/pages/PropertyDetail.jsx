import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Download, CheckCircle, AlertTriangle, TrendingDown } from 'lucide-react';
import { PROPERTIES } from '../data';
import TrustBar from '../components/TrustBar';
import YieldCalculator from '../components/YieldCalculator';
import InvestNowModal from '../components/InvestNowModal';

const PropertyDetail = () => {
  const { slug } = useParams();
  const property = PROPERTIES.find(p => p.slug === slug);
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!property) return <div className="p-8 text-center">Property not found</div>;

  const docs = [
    "Registered Lease Deed",
    "Occupancy Certificate (OC)",
    "Encumbrance Certificate (30 years)",
    "CBRE Independent Valuation Report",
    "MahaRERA Registration",
    "SPV Incorporation Certificate",
    "Quarterly Audit Report (Q3 FY25)",
    "CRISIL Tenant Rating Certificate"
  ];

  const systems = [
    { name: "HVAC System", health: 86, color: "bg-[var(--color-amber)]" },
    { name: "Electrical", health: 97, color: "bg-[var(--color-green)]" },
    { name: "Plumbing", health: 94, color: "bg-[var(--color-green)]" },
    { name: "Fire Safety", health: 98, color: "bg-[var(--color-green)]" },
    { name: "Elevators", health: 91, color: "bg-[var(--color-green)]" },
    { name: "Access Control", health: 99, color: "bg-[var(--color-green)]" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-8">
      {/* Header Image */}
      <div className="h-64 md:h-80 bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-blue)] relative flex flex-col justify-end p-6">
        <Link to="/properties" className="absolute top-6 left-6 text-white flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-5 h-5" /> Back
        </Link>
        <div className="max-w-7xl mx-auto w-full text-white">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${property.status === 'OPEN' ? 'bg-[var(--color-green)]' : property.status === 'FUNDED' ? 'bg-gray-500' : 'bg-white text-[var(--color-blue)]'}`}>
                  {property.status}
                </span>
                <span className="bg-white/20 px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {property.city}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-serif">{property.name}</h1>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
              <div className="text-sm text-blue-100 uppercase tracking-wide mb-1">Net Yield p.a.</div>
              <div className="text-3xl font-bold text-white">{property.net_yield}%</div>
            </div>
          </div>
        </div>
      </div>

      <TrustBar />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200 mb-6 no-scrollbar">
              {['overview', 'financials', 'documents', 'building_health'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-[var(--color-navy)] text-[var(--color-navy)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {tab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Net Yield</div>
                      <div className="font-bold text-[var(--color-green)] text-xl">{property.net_yield}%</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Gross Yield</div>
                      <div className="font-bold text-gray-900 text-xl">{property.gross_yield}%</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Min Investment</div>
                      <div className="font-bold text-gray-900 text-xl">₹10,00,000</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Lease Left</div>
                      <div className="font-bold text-gray-900 text-xl">{property.lease_end}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Lock-in</div>
                      <div className="font-bold text-gray-900 text-xl">{property.lock_in}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Total Value</div>
                      <div className="font-bold text-gray-900 text-xl">₹{(property.total_value/10000000).toFixed(0)} Cr</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">About the Property</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Grade A commercial space located in {property.city}. Fully occupied by {property.tenant} {property.listed ? `(Listed: ${property.listed})` : ''}. OC received. Title clear. MahaRERA registered.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="font-bold text-gray-900">Tenant Profile</h3>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                      <div><span className="text-gray-500">Tenant:</span> <span className="font-medium text-gray-900">{property.tenant}</span></div>
                      <div><span className="text-gray-500">Rating:</span> <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded ml-2">{property.rating}</span></div>
                      <div><span className="text-gray-500">Annual Escalation:</span> <span className="font-medium text-gray-900">{property.escalation}</span></div>
                      <div><span className="text-gray-500">Monthly Rent:</span> <span className="font-medium text-gray-900">₹{property.monthly_rent.toLocaleString('en-IN')}</span></div>
                    </div>
                    <div className="bg-blue-50 px-4 py-3 border-t border-blue-100 text-xs text-blue-800">
                      If tenant defaults: 3-month reserve fund covers income. Rental guarantee insurance covers up to 6 months.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'financials' && (
                <div className="animate-in fade-in">
                  <YieldCalculator property={property} />
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="animate-in fade-in">
                  <div className="mb-6 bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
                    All documents verified by RealtyConnect's legal team. Independent valuation by CBRE India. Available to download after KYC verification and account login.
                  </div>
                  <div className="space-y-3">
                    {docs.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-[var(--color-green)]" />
                          <span className="font-medium text-gray-800 text-sm">{doc}</span>
                          <span className="hidden md:inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded">Verified ✓</span>
                        </div>
                        <button className="text-gray-400 cursor-not-allowed flex items-center gap-1 text-sm">
                          <Download className="w-4 h-4" /> <span className="hidden sm:inline">Login to download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'building_health' && (
                <div className="animate-in fade-in space-y-8">
                  <div className="flex items-center justify-center gap-8 md:gap-16">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-navy)" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - property.building_health_score / 100)} className="transition-all duration-1000" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-[var(--color-navy)]">{property.building_health_score}</span>
                        <span className="text-xs text-gray-500">/ 100</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-1">Overall Health</h3>
                      <p className="text-sm text-gray-500 mb-2">Last updated: Today 9:14 AM</p>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">47 Active IoT Sensors</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {systems.map((sys, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{sys.name}</span>
                          <span className={sys.health < 90 ? 'text-amber-600 font-bold' : 'text-gray-500'}>{sys.health}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${sys.color}`} style={{ width: `${sys.health}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <div className="flex gap-2 items-start text-amber-800">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <span className="font-bold block mb-1">HVAC Maintenance Required</span>
                          Compressor on Floor 2 running at 86% efficiency. Scheduled service: 24 March 2025. Est. fix cost: ₹12,000. <strong>Rental income impact: None.</strong>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <div className="flex gap-2 items-start text-green-800">
                        <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <span className="font-bold block mb-1">AI Optimisation Savings</span>
                          ₹18,400 saved this month through automated lighting & HVAC scheduling. Equivalent to +0.18% additional annual yield for investors.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Sticky Sidebar (Desktop only) */}
          <div className="w-full md:w-80 hidden md:block flex-shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-gray-500 text-sm mb-1">Minimum Investment</div>
              <div className="text-2xl font-bold text-gray-900 mb-6">₹10,00,000</div>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Yield p.a.</span>
                  <span className="font-bold text-[var(--color-green)]">{property.net_yield}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distribution</span>
                  <span className="font-medium text-gray-900">Quarterly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-[var(--color-navy)]">{property.status}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                disabled={property.status !== 'OPEN'}
                className={`w-full py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 ${property.status === 'OPEN' ? 'bg-[var(--color-navy)] hover:bg-[#152e55] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
              >
                {property.status === 'OPEN' ? 'Invest Now' : 'Fully Subscribed'}
              </button>
              
              <div className="mt-4 text-xs text-center text-gray-500">
                Funds held in SEBI-registered escrow<br/>HDFC Trusteeship Services
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar (Mobile only) */}
      <div className="fixed bottom-16 md:bottom-0 w-full bg-white border-t border-gray-200 p-4 md:hidden z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <div className="text-xs text-gray-500">Min Investment</div>
            <div className="font-bold text-gray-900">₹10,00,000</div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            disabled={property.status !== 'OPEN'}
            className={`px-8 py-3 rounded-lg font-bold shadow-md active:scale-95 ${property.status === 'OPEN' ? 'bg-[var(--color-navy)] hover:bg-[#152e55] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
          >
            Invest Now
          </button>
        </div>
      </div>

      <InvestNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} property={property} />
    </div>
  );
};

export default PropertyDetail;
