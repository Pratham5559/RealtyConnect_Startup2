import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, TrendingUp, Building2, ArrowRight, Check, Lock, Users, IndianRupee } from 'lucide-react'

const stats = [
  { value: '₹5.4T', label: 'Indian CRE market' },
  { value: '8–11%', label: 'Commercial yield' },
  { value: '7.0%', label: 'FD rate today' },
  { value: '₹10L', label: 'Min investment' },
]

const properties = [
  { name: 'Persistent Systems IT Park', city: 'Pune', yield: '7.8%', tenant: 'AA+', pct: 73 },
  { name: 'Amazon Fulfillment Warehouse', city: 'Nagpur', yield: '8.9%', tenant: 'AAA', pct: 91 },
  { name: 'D-Mart Retail Plaza', city: 'Coimbatore', yield: '9.6%', tenant: 'AA+', pct: 0, soon: true },
]

const trust = [
  { icon: ShieldCheck, title: 'SEBI SM-REIT 2024', desc: 'Fully regulated. Your money stays in SEBI-registered escrow — never touches our operations account.' },
  { icon: Building2, title: 'AAA/AA tenants only', desc: 'TCS, Amazon, HDFC Bank, D-Mart. Lease locked 5–9 years. Rent comes from Fortune 500 subsidiaries.' },
  { icon: TrendingUp, title: 'Independent valuation', desc: 'CBRE or JLL values each property every 6 months. Your NAV is never self-reported.' },
  { icon: Lock, title: 'LTCG at 12.5%', desc: 'Units listed on BSE. 1-year holding = LTCG. Dividend income is tax-free in your hands.' },
]

export default function Waitlist() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState('en')

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 font-semibold text-gray-900">
          <span className="w-2 h-2 rounded-full bg-teal-400 inline-block"></span>
          RealtyConnect
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
            {['en','hi'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${lang===l?'bg-white text-gray-900 shadow-sm':'text-gray-500'}`}>
                {l==='en'?'EN':'हिं'}
              </button>
            ))}
          </div>
          <span className="hidden sm:flex items-center gap-1 text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium">
            <ShieldCheck size={11} /> SEBI SM-REIT
          </span>
          <button
            onClick={() => navigate('/app/dashboard')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            View prototype →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full font-medium mb-6">
              <ShieldCheck size={12} />
              {lang==='en' ? 'India\'s first Tier 2-focused SM-REIT platform' : 'भारत का पहला टियर-2 SM-REIT प्लेटफ़ॉर्म'}
            </div>

            <h1 className="text-4xl font-semibold text-gray-900 leading-tight mb-4">
              {lang==='en'
                ? <>Your FD earns 7%.<br /><span className="text-teal-500">Commercial real estate</span><br />earns 8–11%.</>
                : <>आपका FD 7% देता है।<br /><span className="text-teal-500">कमर्शियल रियल एस्टेट</span><br />8–11% देता है।</>}
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-8">
              {lang==='en'
                ? 'Invest in pre-leased commercial properties — IT parks, warehouses, bank branches — with AAA/AA tenants like Amazon and HDFC Bank. SEBI SM-REIT regulated. ₹10,00,000 minimum.'
                : 'Amazon, HDFC Bank जैसे AAA किरायेदारों के साथ IT पार्क, वेयरहाउस में निवेश करें। SEBI SM-REIT नियमित। न्यूनतम ₹10,00,000।'}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map(s => (
                <div key={s.value} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xl font-semibold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {['SEBI-registered escrow — your money never touches us', 'Quarterly distributions, 90%+ of rent passed through', 'BSE-listed units — exit anytime on secondary market', 'Hindi + English platform — built for all of India'].map(item => (
                <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Waitlist form */}
          <div className="lg:sticky lg:top-24">
            {!submitted ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base font-semibold text-gray-900">
                    {lang==='en' ? 'Join the waitlist' : 'वेटलिस्ट में जुड़ें'}
                  </h2>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Users size={11} /> 847 joined
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-5">
                  {lang==='en'
                    ? 'Get early access to Pune and Nagpur properties before public launch.'
                    : 'पब्लिक लॉन्च से पहले पुणे और नागपुर प्रॉपर्टी का अर्ली एक्सेस पाएं।'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      {lang==='en' ? 'Full name' : 'पूरा नाम'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang==='en' ? 'Rahul Sharma' : 'राहुल शर्मा'}
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      {lang==='en' ? 'Email address' : 'ईमेल'} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      {lang==='en' ? 'Mobile number' : 'मोबाइल नंबर'}
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      {lang==='en' ? 'Your city' : 'आपका शहर'}
                    </label>
                    <select
                      value={form.city}
                      onChange={e => setForm({...form, city: e.target.value})}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 transition-colors bg-white text-gray-700"
                    >
                      <option value="">{lang==='en' ? 'Select city' : 'शहर चुनें'}</option>
                      {['Pune','Nagpur','Mumbai','Delhi','Bengaluru','Hyderabad','Chennai','Ahmedabad','Surat','Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-teal-400 hover:bg-teal-600 disabled:bg-teal-200 text-white font-medium rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    {loading ? 'Joining...' : (
                      <>{lang==='en' ? 'Get early access' : 'अर्ली एक्सेस पाएं'} <ArrowRight size={15} /></>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-400 mt-3 text-center">
                  {lang==='en' ? 'No spam. No commitment. Unsubscribe anytime.' : 'कोई स्पैम नहीं। कोई प्रतिबद्धता नहीं।'}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate('/app/dashboard')}
                    className="w-full text-center text-xs text-teal-600 hover:text-teal-700 font-medium"
                  >
                    {lang==='en' ? 'Or explore the live prototype →' : 'या लाइव प्रोटोटाइप देखें →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={22} className="text-teal-500" />
                </div>
                <h2 className="text-base font-semibold text-gray-900 mb-2">You're on the list</h2>
                <p className="text-sm text-gray-500 mb-6">
                  We'll notify you when {form.city || 'your city'}'s first SM-REIT property goes live. You're in the first 1,000.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 mb-5 text-left">
                  <p className="text-xs font-medium text-gray-700 mb-2">Move up the waitlist — share with 2 friends:</p>
                  <div className="text-xs text-gray-500 bg-white border border-gray-100 rounded-lg p-3 select-all">
                    Yaar, ek interesting startup mila — RealtyConnect. Commercial real estate mein ₹10L se invest kar sakte hain, SEBI regulated, 8-9% yield. FD se zyada. Waitlist join karo: realty-connect-startup2.vercel.app
                  </div>
                </div>
                <button
                  onClick={() => navigate('/app/dashboard')}
                  className="w-full py-2.5 bg-teal-400 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Explore the platform <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Properties preview */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Live properties</p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {lang==='en' ? 'Currently open for investment' : 'अभी निवेश के लिए खुला'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {properties.map(p => (
              <div key={p.name} className={`bg-white border border-gray-100 rounded-xl p-5 ${p.soon ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <p className="text-sm font-medium text-gray-900 leading-snug">{p.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 whitespace-nowrap ${p.soon ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'}`}>
                    {p.soon ? 'Aug 2026' : 'Open'}
                  </span>
                </div>
                <div className="flex gap-4 mb-3">
                  <div><p className="text-xs text-gray-400">Net yield</p><p className="text-lg font-semibold text-gray-900">{p.yield}</p></div>
                  <div><p className="text-xs text-gray-400">Tenant</p><p className="text-lg font-semibold text-gray-900">{p.tenant}</p></div>
                </div>
                {!p.soon && (
                  <div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-400 rounded-full" style={{width:`${p.pct}%`}} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{p.pct}% funded · {p.city}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Why trust us</p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          {lang==='en' ? 'Built for investors who\'ve seen platforms fail' : 'उन निवेशकों के लिए बनाया जो प्लेटफॉर्म को फेल होते देख चुके हैं'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trust.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className="text-teal-500" />
                <p className="text-sm font-medium text-gray-900">{title}</p>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-3">
            {lang==='en' ? 'Stop letting your FD win' : 'अपने FD को जीतने देना बंद करें'}
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            {lang==='en'
              ? '300 million Indians invest in FDs. Zero have access to commercial real estate. RealtyConnect changes that.'
              : '30 करोड़ भारतीय FD में निवेश करते हैं। किसी के पास कमर्शियल रियल एस्टेट तक पहुंच नहीं। RealtyConnect यह बदलता है।'}
          </p>
          <button
            onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
            className="px-6 py-3 bg-teal-400 hover:bg-teal-500 text-white font-medium rounded-lg text-sm transition-colors"
          >
            {lang==='en' ? 'Join the waitlist' : 'वेटलिस्ट में जुड़ें'}
          </button>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-6 px-6 text-xs text-gray-400 text-center bg-white">
        RealtyConnect Pvt Ltd · SEBI SM-REIT Regulations 2024 · Minimum investment ₹10,00,000 · This is a prototype. No real money accepted.
      </footer>
    </div>
  )
}
