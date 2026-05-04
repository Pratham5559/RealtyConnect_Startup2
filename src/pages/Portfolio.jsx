import { ShieldCheck, Download, Activity } from 'lucide-react';
import { DEMO_USER, PROPERTIES, INCOME_HISTORY } from '../data';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      {/* KYC Banner */}
      <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center justify-between text-sm text-green-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span className="font-bold">KYC Verified</span>
          <span className="hidden sm:inline">| SEBI SM-REIT Investor | PAN: ABCDE1234F</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-[var(--color-navy)] font-serif mb-6">{t('My Portfolio')}</h1>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-xs text-gray-500 mb-1">{t('Total Invested')}</div>
          <div className="font-bold text-xl text-gray-900">₹{DEMO_USER.total_invested.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Current Value</div>
          <div className="font-bold text-xl text-[var(--color-navy)]">₹32,04,000 <span className="text-xs text-[var(--color-green)] font-normal ml-1">+6.8%</span></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Total Income</div>
          <div className="font-bold text-xl text-[var(--color-green)]">₹{DEMO_USER.total_income_earned.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Next Income ({DEMO_USER.next_distribution_date})</div>
          <div className="font-bold text-xl text-gray-900">₹{DEMO_USER.next_distribution_amount.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Holdings */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Holdings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_USER.investments.map((inv, idx) => {
            const property = PROPERTIES.find(p => p.id === inv.propertyId);
            const currentNAV = inv.face_value * (idx === 0 ? 1.072 : 1.06);
            const currentValue = currentNAV * inv.units;
            const gain = currentValue - inv.total;
            const incomeEarned = idx === 0 ? 117000 : 67000;
            const nextIncome = idx === 0 ? 13000 : 8900;
            
            return (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{property.name}</h3>
                  <div className="text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100 flex justify-between">
                    <span>Units owned: <span className="font-bold text-gray-900">{inv.units}</span></span>
                    <span>Current NAV: <span className="font-bold text-[var(--color-navy)]">₹{currentNAV.toLocaleString('en-IN')}</span></span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 text-sm mb-4">
                    <div>
                      <div className="text-gray-500 text-xs">Invested</div>
                      <div className="font-medium">₹{inv.total.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Current Value</div>
                      <div className="font-medium text-[var(--color-navy)]">₹{currentValue.toLocaleString('en-IN')} <span className="text-[var(--color-green)] text-xs">(+₹{gain.toLocaleString('en-IN')})</span></div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Income Earned</div>
                      <div className="font-medium text-[var(--color-green)]">₹{incomeEarned.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Net Yield p.a.</div>
                      <div className="font-medium">{property.net_yield}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Next Income</div>
                      <div className="font-medium">15 Apr 2025 → ₹{nextIncome.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Health Check</div>
                      <div className="flex items-center gap-1 text-[var(--color-green)] text-xs font-bold">
                        <Activity className="w-3 h-3" /> {property.building_health_score}/100
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <Link to={`/properties/${property.slug}`} className="flex-1 text-center py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded font-medium transition-colors text-sm">
                      View Property
                    </Link>
                    <Link to="/market" className="flex-1 text-center py-2 bg-white border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-blue-50 rounded font-medium transition-colors text-sm">
                      Sell on Market
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Income History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-gray-900">Income History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50/50 uppercase border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Property</th>
                <th className="px-6 py-3">Units</th>
                <th className="px-6 py-3 text-right">Gross</th>
                <th className="px-6 py-3 text-right">TDS (10%)</th>
                <th className="px-6 py-3 text-right">Net</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {INCOME_HISTORY.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{row.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{PROPERTIES.find(p=>p.id===row.propertyId).name.split(',')[0]}</td>
                  <td className="px-6 py-4">{row.units}</td>
                  <td className="px-6 py-4 text-right text-gray-500">₹{row.gross.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-right text-red-500">-₹{row.tds.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-right font-bold text-[var(--color-green)]">₹{row.net.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-[var(--color-green)] font-medium text-xs">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Documents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-900">Tax Documents</h2>
        </div>
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <button onClick={() => alert('Prototype only')} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Generate Form 16A — FY 2024-25
          </button>
          <button onClick={() => alert('Prototype only')} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Download Capital Gains Statement
          </button>
        </div>
      </div>

    </div>
  );
};

export default Portfolio;
