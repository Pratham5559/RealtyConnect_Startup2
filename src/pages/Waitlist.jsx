import { useState } from 'react';
import { ShieldCheck, ChevronRight, ChevronDown, Gamepad2, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden mb-3">
      <button 
        className="w-full flex justify-between items-center text-left p-5 focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-800 text-sm md:text-base">{question}</span>
        {isOpen ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && <div className="px-5 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-50">{answer}</div>}
    </div>
  );
};

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'waitlist'), {
        email,
        createdAt: serverTimestamp(),
        source: 'landing-page',
      });
      setSubmitted(true);
    } catch (firebaseError) {
      console.error('Waitlist signup failed:', firebaseError);
      setError('Could not join the waitlist right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dark Hero Section */}
      <div className="bg-[var(--color-navy)] text-white pt-12 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="w-14 h-14 rounded-full bg-white text-[var(--color-navy)] flex items-center justify-center font-bold text-2xl mb-4 font-serif">
              RC
            </div>
            <h2 className="font-serif text-2xl font-bold mb-1">RealtyConnect</h2>
            <p className="text-blue-200 text-sm">SEBI SM-REIT Fractional Real Estate Platform</p>
          </div>

          {/* Main Copy */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight">
              Earn 9–12% annual returns from commercial real estate
            </h1>
            <p className="text-base md:text-lg text-white font-semibold max-w-2xl mx-auto leading-relaxed">
              Pre-leased Grade A properties. Quarterly rental income. SEBI SM-REIT regulated. Minimum investment ₹10 lakh.
            </p>
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
              {error ? (
                <div className="mb-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white px-4 py-3.5 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-[var(--color-blue)] hover:bg-blue-600 text-white font-medium px-8 py-3.5 rounded-md transition-colors whitespace-nowrap flex items-center justify-center gap-2"
              >
                {submitting ? 'Joining...' : <>Join Waitlist <ChevronRight className="w-4 h-4" /></>}
              </button>
              </div>
            </form>
          ) : (
            <div className="bg-white/10 border border-white/10 rounded-xl p-8 max-w-3xl mx-auto shadow-xl mb-12 animate-in fade-in zoom-in duration-300">
              <div className="text-center mb-8 border-b border-white/10 pb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-400/20 text-green-400 mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                <p className="text-white font-bold text-lg">You are #248 on the waitlist. We will notify you when RealtyConnect launches.</p>
              </div>

              <div className="flex items-center justify-center gap-2 mb-3">
                <Gamepad2 className="w-6 h-6 text-gray-300" />
                <h3 className="font-bold text-xl">Demo Investor Portal</h3>
              </div>
              <p className="text-center text-sm md:text-base text-white font-bold mb-8">While you wait, experience the SM-REIT investment platform simulation.</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-[#152e55] rounded-lg p-4 text-center">
                  <div className="text-green-400 font-bold text-lg md:text-xl mb-1">₹30L</div>
                  <div className="text-[10px] md:text-xs text-blue-200 uppercase tracking-wider">Portfolio Value</div>
                </div>
                <div className="bg-[#152e55] rounded-lg p-4 text-center">
                  <div className="text-green-400 font-bold text-lg md:text-xl mb-1">2</div>
                  <div className="text-[10px] md:text-xs text-blue-200 uppercase tracking-wider">Properties</div>
                </div>
                <div className="bg-[#152e55] rounded-lg p-4 text-center">
                  <div className="text-green-400 font-bold text-lg md:text-xl mb-1">8.4%</div>
                  <div className="text-[10px] md:text-xs text-blue-200 uppercase tracking-wider">Avg Yield</div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/login')}
                className="w-full bg-[var(--color-blue)] hover:bg-blue-600 text-white font-medium py-4 rounded-lg transition-colors text-base"
              >
                Enter Prototype Simulation
              </button>
            </div>
          )}

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs md:text-sm text-blue-50 transition-colors hover:bg-white/10">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-400" /> SEBI SM-REIT Regulated
            </div>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs md:text-sm text-blue-50 transition-colors hover:bg-white/10">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-400" /> Pre-leased Properties Only
            </div>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs md:text-sm text-blue-50 transition-colors hover:bg-white/10">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-400" /> AAA Tenants
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            <div className="bg-white/10 border border-white/10 rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-400 mb-1">9–12%</div>
              <div className="text-sm text-blue-100">net annual yield</div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-400 mb-1">Quarterly</div>
              <div className="text-sm text-blue-100">income distribution</div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-400 mb-1">₹5.4T</div>
              <div className="text-sm text-blue-100">Indian CRE market</div>
            </div>
          </div>

        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-navy)] font-serif">How it works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-5xl font-serif text-gray-200 mb-4">01</div>
              <h3 className="font-bold text-[var(--color-navy)] text-lg mb-3">Find Pre-Leased Property</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We find a pre-leased commercial property with a AAA tenant like TCS, Amazon, or HDFC Bank already paying rent.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-5xl font-serif text-gray-200 mb-4">02</div>
              <h3 className="font-bold text-[var(--color-navy)] text-lg mb-3">Invest via SM-REIT</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                RealtyConnect creates an SM-REIT scheme. You invest minimum ₹10 lakh and receive units. Funds go to SEBI-registered escrow.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-5xl font-serif text-gray-200 mb-4">03</div>
              <h3 className="font-bold text-[var(--color-navy)] text-lg mb-3">Earn Quarterly Income</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tenant pays rent every month to the SPV. RealtyConnect distributes 90%+ to investors every quarter — directly to your bank.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          
          {/* Trust Bar (simple text version) */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 mb-16 font-medium">
            <div className="flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-[var(--color-green)]" /> SEBI SM-REIT Regulated</div>
            <div className="flex items-center"><Lock className="w-5 h-5 mr-2 text-[var(--color-green)]" /> Funds in Escrow</div>
            <div className="flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-[var(--color-green)]" /> CBRE Verified</div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-navy)] font-serif">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <FAQItem 
              question="What is the minimum investment?" 
              answer="₹10,00,000 (₹10 lakh) as mandated by SEBI SM-REIT Regulations 2024. This applies to all investors — resident Indians, HNIs, and NRIs." 
            />
            <FAQItem 
              question="Is my money safe if RealtyConnect shuts down?" 
              answer="Yes. Your funds are held in a SEBI-registered escrow account controlled by an independent trustee — not by RealtyConnect. The property is owned by a separate SPV. Your units are in your demat account. Even if RealtyConnect closes, your ownership continues." 
            />
            <FAQItem 
              question="Who are the tenants?" 
              answer="We only work with AAA and AA-rated tenants — BSE/NSE-listed large companies like TCS, Infosys, HDFC Bank, Amazon India, D-Mart. These companies have 30+ year track records and cannot default without major legal consequences." 
            />
            <FAQItem 
              question="How do I exit my investment?" 
              answer="Two ways: (1) Sell your units on RealtyConnect's secondary market to another verified investor after the lock-in period. Settlement in 3–5 days. (2) Hold until the property is sold by the SPV (typically 5–7 years) and receive your share of capital appreciation." 
            />
            <FAQItem 
              question="What returns can I expect?" 
              answer="Net yield of 7–10% per year from rental income, paid quarterly. Plus capital appreciation of 6–8% per year on average when the property is sold. Combined XIRR of 13–16% over a 5-year hold." 
            />
            <FAQItem 
              question="Is this better than an FD?" 
              answer="SBI FD gives 6.8% per year, taxable, no capital gain. RealtyConnect targets 7–10% net yield plus 6–8% capital gain — with a physical Grade A building as the underlying asset. The risk is higher than an FD but significantly lower than stocks." 
            />
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-gray-50 py-20 px-4 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-[var(--color-navy)] font-serif">SM REITs vs Regular REITs</h2>
          <p className="text-center text-gray-900 font-semibold mb-12 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            SM REITs have a focussed single asset investment model that generates risk-adjusted returns while allowing investors to choose cities and micro markets.
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm md:text-base min-w-[600px]">
                <thead className="bg-white border-b border-gray-200">
                  <tr>
                    <th className="py-6 px-6 font-semibold text-gray-900 w-1/4">Investment Metric</th>
                    <th className="py-6 px-6 font-bold text-[var(--color-navy)] w-3/8 text-center text-lg">SM REITs (Small & Medium)</th>
                    <th className="py-6 px-6 font-bold text-gray-700 w-3/8 text-center text-lg">Regular REITs (Traditional)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-6 font-bold text-gray-900">Capital Requirement</td>
                    <td className="py-6 px-6 text-gray-800 text-center font-medium">₹10 Lakhs (Minimum)</td>
                    <td className="py-6 px-6 text-gray-600 text-center">~₹300 - ₹1,500 (Price of 1 Unit)</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-6 font-bold text-gray-900">Asset Concentration</td>
                    <td className="py-6 px-6 text-gray-800 text-center font-medium">High. Usually focused on a single property or a small cluster.</td>
                    <td className="py-6 px-6 text-gray-600 text-center">Low. Diversified across multiple cities and sectors (Office, Retail, Industrial).</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-6 font-bold text-gray-900">Development Risk</td>
                    <td className="py-6 px-6 text-gray-800 text-center font-medium">Zero to Minimal. 95% of assets must be fully completed and rent-yielding.</td>
                    <td className="py-6 px-6 text-gray-600 text-center">Moderate. Up to 20% of the portfolio value can be in under-construction projects.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-6 font-bold text-gray-900">Liquidity Level</td>
                    <td className="py-6 px-6 text-gray-800 text-center font-medium">Lower. Traded on exchanges, but smaller pool of buyers due to the ₹10L entry bar.</td>
                    <td className="py-6 px-6 text-gray-600 text-center">High. High trading volumes on NSE/BSE; easy to entry/exit daily.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-6 font-bold text-gray-900">Yield Potential</td>
                    <td className="py-6 px-6 text-gray-800 text-center font-medium">Potentially higher, as you can pick high-growth specific micro-markets.</td>
                    <td className="py-6 px-6 text-gray-600 text-center">Stable and predictable, but capped by the performance of the entire portfolio.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-6 font-bold text-gray-900">Management Fee</td>
                    <td className="py-6 px-6 text-gray-800 text-center font-medium">Usually a percentage of the specific scheme's NAV.</td>
                    <td className="py-6 px-6 text-gray-600 text-center">Integrated into the overall trust management structure.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0f2344] text-white font-bold text-sm text-center py-6 px-4">
        <p>RealtyConnect v0.1 Prototype | Minimum investment ₹10,00,000 (SEBI SM-REIT 2024) | Simulated data only | Not for real investment</p>
      </div>
    </div>
  );
};

export default Waitlist;
