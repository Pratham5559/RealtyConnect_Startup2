import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CalendarClock,
  ChevronRight,
  Home,
  Landmark,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { DEMO_USER, PROPERTIES, INCOME_HISTORY } from '../data';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  const openProperties = PROPERTIES.filter((property) => property.status === 'OPEN').slice(0, 3);
  const topProperty = openProperties[0];
  const quickLinks = [
    { icon: Home, label: t('Dashboard'), to: '/dashboard' },
    { icon: Building2, label: t('Properties'), to: '/properties' },
    { icon: Briefcase, label: t('My Portfolio'), to: '/portfolio' },
    { icon: BarChart3, label: t('Secondary Market'), to: '/market' },
    { icon: Settings2, label: 'Profile', to: '/profile' },
  ];

  const incomePoints = [42, 68, 92, 76, 58, 66];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="rounded-[32px] border border-blue-100 bg-gradient-to-br from-[#eef5ff] via-white to-[#f7fbff] p-3 shadow-[0_24px_70px_rgba(27,58,107,0.08)]">
        <div className="grid gap-3 lg:grid-cols-[164px_minmax(0,1fr)]">
          <aside className="hidden lg:flex flex-col rounded-[28px] bg-gradient-to-b from-[var(--color-blue)] to-[var(--color-navy)] px-5 py-6 text-white">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/14 text-lg font-bold shadow-lg">
              RC
            </div>

            <nav className="space-y-2">
              {quickLinks.map(({ icon: Icon, label, to }, index) => (
                <Link
                  key={to}
                  to={to}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-colors ${
                    index === 0 ? 'bg-white/16 text-white' : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/12">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="leading-tight break-words">{label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto rounded-2xl border border-white/10 bg-white/8 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-blue-100">Status</div>
              <div className="mt-2 text-sm font-medium">Investor account secured</div>
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-blue-100">
                <ShieldCheck className="w-4 h-4" />
                KYC verified
              </div>
            </div>
          </aside>

          <section className="rounded-[28px] bg-white px-4 py-4 lg:px-7 lg:py-6">
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-blue)]">
                  {t('Welcome back')}
                </div>
                <h1 className="mt-2 text-3xl font-serif text-[var(--color-navy)]">
                  Hi, {DEMO_USER.name.split(' ')[0]}
                </h1>
                <p className="mt-1 text-sm text-gray-500">{t('Your commercial real estate portfolio')}</p>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative min-w-[220px]">
                  <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 focus:border-[var(--color-blue)] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-3 py-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[var(--color-blue)] shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-blue)]">
                      {t('Alerts synced')}
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-navy)]">3 live notices</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <section className="rounded-[26px] bg-gradient-to-br from-[var(--color-blue)] via-[#4e96ea] to-[var(--color-navy)] p-5 text-white shadow-[0_18px_45px_rgba(37,99,235,0.24)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-blue-100">{t('Total Invested')}</div>
                        <div className="mt-3 text-3xl font-bold">₹{DEMO_USER.total_invested.toLocaleString('en-IN')}</div>
                      </div>
                      <span className="rounded-2xl bg-white/12 px-3 py-2 text-xs font-medium">2 assets</span>
                    </div>

                    <div className="mt-8 flex items-end justify-between gap-3">
                      {incomePoints.map((point, index) => (
                        <div key={index} className="flex flex-1 flex-col items-center gap-2">
                          <div
                            className="w-full rounded-full bg-white/85"
                            style={{ height: `${point}px`, opacity: 0.35 + index * 0.09 }}
                          />
                          <span className="text-[10px] text-blue-100">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-gray-500">Income Yield</div>
                        <div className="mt-2 text-3xl font-bold text-[var(--color-navy)]">8.4%</div>
                      </div>
                      <div className="rounded-2xl bg-green-50 p-3 text-[var(--color-green)]">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Rental income earned</span>
                          <span className="font-semibold text-gray-900">₹{DEMO_USER.total_income_earned.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-gray-100">
                          <div className="h-2 rounded-full bg-[var(--color-green)]" style={{ width: '72%' }} />
                        </div>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-4">
                        <div className="text-xs uppercase tracking-[0.16em] text-gray-500">Next Distribution</div>
                        <div className="mt-2 flex items-end justify-between gap-3">
                          <div>
                            <div className="text-lg font-bold text-[var(--color-navy)]">₹{DEMO_USER.next_distribution_amount.toLocaleString('en-IN')}</div>
                            <div className="text-xs text-gray-500">{DEMO_USER.next_distribution_date}</div>
                          </div>
                          <CalendarClock className="w-5 h-5 text-[var(--color-blue)]" />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="grid gap-4 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <section className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-gray-500">{t('Open Properties')}</div>
                        <h2 className="mt-2 text-2xl font-serif text-[var(--color-navy)]">Investment Pipeline</h2>
                      </div>
                      <Link to="/properties" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-blue)]">
                        {t('View All')} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <div className="mt-5 space-y-3">
                      {openProperties.map((property) => (
                        <Link
                          key={property.id}
                          to={`/properties/${property.slug}`}
                          className="flex items-center gap-4 rounded-2xl border border-gray-100 px-4 py-4 transition hover:border-blue-100 hover:bg-blue-50/40"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[var(--color-blue)]">
                            <Landmark className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-gray-900">{property.name}</div>
                            <div className="mt-1 text-xs text-gray-500">{property.city} • {property.tenant}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-[var(--color-green)]">{property.net_yield}%</div>
                            <div className="text-[11px] text-gray-500">net yield</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-gray-500">Primary Asset</div>
                        <h2 className="mt-2 text-2xl font-serif text-[var(--color-navy)]">
                          {topProperty?.name.split(',')[0] || 'Portfolio Asset'}
                        </h2>
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--color-blue)]">
                        {topProperty?.rating || 'AAA'}
                      </span>
                    </div>

                    <div className="mt-5 rounded-[24px] bg-gradient-to-br from-[#f3f8ff] to-[#edf5ff] p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.16em] text-gray-500">Occupancy</div>
                          <div className="mt-2 text-2xl font-bold text-[var(--color-navy)]">{topProperty?.funded_percent || 0}%</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.16em] text-gray-500">Health Score</div>
                          <div className="mt-2 text-2xl font-bold text-[var(--color-navy)]">{topProperty?.building_health_score || 0}</div>
                        </div>
                      </div>

                      <div className="mt-5 h-2 rounded-full bg-white">
                        <div className="h-2 rounded-full bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-navy)]" style={{ width: `${topProperty?.funded_percent || 0}%` }} />
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
                      <div className="flex gap-3">
                        <div className="rounded-xl bg-white p-2 text-amber-700 shadow-sm">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-amber-900">{t('AI Building Alert')}</div>
                          <div className="mt-1 text-sm leading-5 text-amber-800">
                            HVAC system on Pune IT Park is scheduled for service. No impact on rental income.
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="grid gap-4">
                <section className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-gray-500">{t('Recent Income')}</div>
                      <h2 className="mt-2 text-2xl font-serif text-[var(--color-navy)]">Quarterly Cash Flow</h2>
                    </div>
                    <Link to="/portfolio" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-blue)]">
                      {t('Full History')} <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="mt-5 space-y-3">
                    {INCOME_HISTORY.slice(0, 4).map((record, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 px-4 py-4">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-gray-900">
                            {PROPERTIES.find((property) => property.id === record.propertyId)?.name.split(',')[0]}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">{record.date} • {record.status}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-[var(--color-green)]">+₹{record.net.toLocaleString('en-IN')}</div>
                          <div className="text-[11px] text-gray-500">net credited</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[26px] border border-gray-200 bg-gradient-to-br from-[var(--color-navy)] to-[#244b88] p-5 text-white shadow-[0_18px_45px_rgba(27,58,107,0.18)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-blue-100">Investor Profile</div>
                      <h2 className="mt-2 text-2xl font-serif">Readiness</h2>
                    </div>
                    <ShieldCheck className="w-6 h-6 text-blue-100" />
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-white/10 px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-blue-100">Investor Type</div>
                      <div className="mt-2 text-lg font-semibold">{DEMO_USER.investor_type}</div>
                    </div>

                    <div className="rounded-2xl bg-white/10 px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-blue-100">KYC Status</div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-semibold">{DEMO_USER.kyc_status}</span>
                        <span className="rounded-full bg-green-400/20 px-3 py-1 text-xs font-semibold text-green-200">
                          verified
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
