import { useState } from 'react';
import { Store, TrendingUp, TrendingDown, Info, PackageOpen, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DEMO_USER, PROPERTIES } from '../data';

const Market = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('buy');
  
  const [sellProperty, setSellProperty] = useState(DEMO_USER.investments[0].propertyId);
  const [sellUnits, setSellUnits] = useState(5);
  const [askPrice, setAskPrice] = useState(107200);

  const selectedInv = DEMO_USER.investments.find(i => i.propertyId === Number(sellProperty));
  const currentNAV = selectedInv ? (selectedInv.propertyId === 1 ? 107200 : 106000) : 0;
  const maxSellUnits = selectedInv ? selectedInv.units : 0;

  const listings = [
    {
      id: 1,
      propertyId: 1,
      seller: "Anonymous Investor",
      units: 5,
      askPrice: 109500,
      nav: 109067,
      premium: 0.4,
      yieldAtAsk: 7.7
    },
    {
      id: 2,
      propertyId: 2,
      seller: "Anonymous Investor",
      units: 10,
      askPrice: 107000,
      nav: 106000,
      premium: 0.9,
      yieldAtAsk: 8.6
    },
    {
      id: 3,
      propertyId: 1,
      seller: "Anonymous Investor",
      units: 8,
      askPrice: 108000,
      nav: 109067,
      discount: 1.0,
      yieldAtAsk: 7.9
    }
  ];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-navy)] font-serif flex items-center gap-2">
          <Store className="w-8 h-8" /> {t('Secondary Market')}
        </h1>
        <p className="text-gray-600 mt-2">Buy and sell SM-REIT units between verified investors</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start gap-3 text-sm text-blue-800">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
        <div>
          Units trade at market price based on NAV reference. Minimum trade: 1 unit (₹1,00,000). KYC verification required. Lock-in period applies — check each property before listing.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mt-8">
        <button 
          onClick={() => setActiveTab('buy')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'buy' ? 'border-[var(--color-navy)] text-[var(--color-navy)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Buy Units
        </button>
        <button 
          onClick={() => setActiveTab('sell')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'sell' ? 'border-[var(--color-navy)] text-[var(--color-navy)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Sell Units
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'orders' ? 'border-[var(--color-navy)] text-[var(--color-navy)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          My Orders
        </button>
      </div>

      <div className="pt-6">
        {activeTab === 'buy' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map(listing => {
                const property = PROPERTIES.find(p => p.id === listing.propertyId);
                return (
                  <div key={listing.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    {listing.discount && (
                      <div className="absolute top-4 right-[-30px] bg-red-500 text-white text-[10px] font-bold px-8 py-1 rotate-45">
                        DISCOUNT
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mb-1">{listing.seller}</div>
                    <h3 className="font-bold text-gray-900 mb-4 pr-6">{property.name.split(',')[0]}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">Units</div>
                        <div className="font-bold text-lg">{listing.units}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Ask Price/Unit</div>
                        <div className="font-bold text-lg text-[var(--color-navy)]">₹{listing.askPrice.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reference NAV</span>
                        <span className="font-medium">₹{listing.nav.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Premium/Discount</span>
                        {listing.premium ? (
                          <span className="text-[var(--color-amber)] flex items-center font-medium"><TrendingUp className="w-3 h-3 mr-1" />+{listing.premium}%</span>
                        ) : (
                          <span className="text-[var(--color-green)] flex items-center font-medium"><TrendingDown className="w-3 h-3 mr-1" />-{listing.discount}%</span>
                        )}
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                        <span className="text-gray-900">Total Cost</span>
                        <span className="text-[var(--color-navy)]">₹{(listing.units * listing.askPrice).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Yield at Ask Price</span>
                      <span className="font-bold text-[var(--color-green)]">{listing.yieldAtAsk}% p.a.</span>
                    </div>

                    {listing.discount && (
                      <div className="text-[10px] text-[var(--color-green)] font-medium mb-3 text-center">
                        Below NAV — seller needs quick exit
                      </div>
                    )}
                    
                    <button className="w-full bg-[var(--color-navy)] hover:bg-[#152e55] text-white font-semibold py-2 rounded transition-colors" onClick={() => alert("Prototype only")}>
                      Buy Now
                    </button>
                  </div>
                )
              })}
            </div>
            
            <p className="text-sm text-gray-500 text-center mt-6">
              Buying below NAV = better yield for you. Buying above NAV = you pay a premium for high-demand properties.
            </p>
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="max-w-xl mx-auto animate-in fade-in">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-xl text-[var(--color-navy)] mb-6">List Units for Sale</h2>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Listing created (prototype)"); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Property</label>
                  <select 
                    value={sellProperty}
                    onChange={(e) => setSellProperty(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
                  >
                    {DEMO_USER.investments.map(inv => {
                      const p = PROPERTIES.find(pr => pr.id === inv.propertyId);
                      return <option key={p.id} value={p.id}>{p.name} ({inv.units} units available)</option>;
                    })}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Units to Sell</label>
                    <input 
                      type="number" 
                      min="1" 
                      max={maxSellUnits} 
                      value={sellUnits}
                      onChange={(e) => setSellUnits(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
                    />
                    <div className="text-xs text-gray-500 mt-1">Max available: {maxSellUnits}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ask Price / Unit</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                      <input 
                        type="number" 
                        value={askPrice}
                        onChange={(e) => setAskPrice(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Current NAV: ₹{currentNAV.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-sm">
                  <h4 className="font-medium text-gray-900 mb-3">Preview Order</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Gross Value ({sellUnits} units)</span>
                      <span>₹{(sellUnits * askPrice).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Platform Fee (0.5%)</span>
                      <span>-₹{((sellUnits * askPrice) * 0.005).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
                      <span>You Receive</span>
                      <span className="text-[var(--color-green)]">₹{((sellUnits * askPrice) * 0.995).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 text-blue-800 p-3 rounded text-sm border border-blue-100 flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <strong>Lock-in check:</strong> Property 1 — lock-in ends March 2027. You can list now on the secondary market.
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input required type="checkbox" className="focus:ring-[var(--color-blue)] h-4 w-4 text-[var(--color-blue)] border-gray-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-700">
                      I confirm these units are past the primary lock-in period and authorize this listing.
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[var(--color-navy)] hover:bg-[#152e55] text-white font-semibold py-3 rounded-lg transition-colors">
                  List for Sale
                </button>
                <p className="text-xs text-center text-gray-500 mt-3">Your listing stays active for 30 days. Cancel anytime.</p>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="max-w-2xl mx-auto py-12 flex flex-col items-center justify-center text-center animate-in fade-in">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <PackageOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">No active orders</h3>
            <p className="text-gray-500 mb-6 max-w-sm">Browse listings to buy units from other investors on the secondary market.</p>
            <button 
              onClick={() => setActiveTab('buy')}
              className="bg-[var(--color-navy)] hover:bg-[#152e55] text-white font-semibold px-6 py-2 rounded transition-colors"
            >
              Browse Listings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Market;
