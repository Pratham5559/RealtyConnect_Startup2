import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { PROPERTIES } from '../data';
import { useTranslation } from 'react-i18next';

const Properties = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'IT Parks', 'Warehouses', 'Retail', 'Healthcare', 'Co-working'];

  const filteredProperties = PROPERTIES.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || p.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-navy)] font-serif">Invest in Commercial Properties</h1>
        <p className="text-gray-600 mt-2">SEBI SM-REIT regulated | Pre-leased | Minimum ₹10,00,000</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by city, tenant, or type..." 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select className="border border-gray-200 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]">
            <option>Yield (High→Low)</option>
            <option>Min Investment</option>
            <option>City</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeFilter === f ? 'bg-[var(--color-navy)] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <div key={property.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-blue)] relative">
               <div className="absolute top-4 right-4">
                 {property.status === 'OPEN' && <span className="bg-[var(--color-green)] text-white text-xs font-bold px-3 py-1 rounded-full">OPEN</span>}
                 {property.status === 'FUNDED' && <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">FUNDED</span>}
                 {property.status === 'COMING SOON' && <span className="bg-[var(--color-blue)] text-white text-xs font-bold px-3 py-1 rounded-full">COMING SOON</span>}
               </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{property.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{property.city} • {property.type}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">{property.tenant}</span>
                <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded">{property.rating}</span>
              </div>
              
              <div className="mb-4">
                <div className="text-[var(--color-green)] text-3xl font-bold font-serif">{property.net_yield}%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Net Yield p.a.</div>
              </div>
              
              <div className="text-sm font-medium text-gray-900 mb-4">
                {t('Minimum Investment')}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{property.funded_percent}% funded</span>
                  <span className="text-gray-700 font-medium">₹{(property.total_value * property.funded_percent / 1000000000).toFixed(2)}Cr of ₹{(property.total_value/10000000).toFixed(0)}Cr</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${property.status === 'OPEN' ? 'bg-[var(--color-blue)]' : property.status === 'FUNDED' ? 'bg-gray-500' : 'bg-gray-300'}`} style={{ width: `${property.funded_percent}%` }}></div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-6">
                Lease: {property.lease_end} | {property.lock_in} lock-in
              </div>
              
              <Link 
                to={`/properties/${property.slug}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-[var(--color-navy)] text-[var(--color-navy)] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
