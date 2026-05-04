import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Bell, CheckCircle2, Crown, LogOut, Shield, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const { user, profile, isAdmin, isSuperadmin, logout } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = useMemo(
    () => [
      {
        id: 'income',
        title: t('Rental payout scheduled'),
        body: t('Your next distribution is queued for 15 April 2025.'),
        time: t('2m ago'),
        tone: 'text-green-700 bg-green-50',
        icon: CheckCircle2,
      },
      {
        id: 'kyc',
        title: t('KYC review complete'),
        body: t('Your investor profile is verified and ready for new allocations.'),
        time: t('1h ago'),
        tone: 'text-blue-700 bg-blue-50',
        icon: Shield,
      },
      {
        id: 'building',
        title: t('Building efficiency notice'),
        body: t('Pune IT Park HVAC service is scheduled. No impact on rental income.'),
        time: t('Today'),
        tone: 'text-amber-700 bg-amber-50',
        icon: Sparkles,
      },
    ],
    [t]
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-[var(--color-navy)] text-white flex items-center justify-center font-bold text-sm">
            RC
          </div>
          <span className="font-serif text-xl text-[var(--color-navy)] font-bold">RealtyConnect</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="hidden md:flex items-center text-sm text-gray-600">
              {profile?.name || user.email}
            </div>
          ) : null}

          {isAdmin ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/admin"
                title={t('Open admin workspace')}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-[var(--color-navy)] hover:bg-gray-50"
              >
                <Shield className="w-4 h-4" />
                {t('Admin')}
              </Link>
              {isSuperadmin ? (
                <Link
                  to="/superadmin"
                  title={t('Open superadmin workspace')}
                  className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-amber-700 hover:bg-amber-50"
                >
                  <Crown className="w-4 h-4" />
                  {t('Superadmin')}
                </Link>
              ) : null}
            </div>
          ) : null}

          <button 
            onClick={toggleLanguage}
            title={t('Language')}
            className="text-sm font-medium border border-gray-300 rounded px-2 py-1 text-gray-700 hover:bg-gray-50"
          >
            {language === 'en' ? 'EN / हिं' : 'हिं / EN'}
          </button>
          
          <div className="relative">
            <button
              type="button"
              title={t('Notifications')}
              onClick={() => setIsNotificationsOpen((open) => !open)}
              className="relative rounded-full p-1.5 text-gray-600 hover:bg-gray-100"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 bg-[var(--color-amber)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {isNotificationsOpen ? (
              <div className="absolute right-0 top-12 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t('Notifications')}</div>
                    <div className="text-xs text-gray-500">{t('Alerts synced')}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {notifications.length ? (
                  <div className="max-h-[420px] overflow-y-auto">
                    {notifications.map(({ id, title, body, time, tone, icon: Icon }) => (
                      <div key={id} className="flex gap-3 px-4 py-4 border-b border-gray-100 last:border-b-0">
                        <div className={`mt-0.5 rounded-xl p-2 ${tone}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="text-sm font-semibold text-gray-900">{title}</div>
                            <div className="whitespace-nowrap text-[11px] text-gray-400">{time}</div>
                          </div>
                          <p className="mt-1 text-sm leading-5 text-gray-600">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-10 text-center text-sm text-gray-500">
                    {t('No new notifications')}
                  </div>
                )}

                <div className="border-t border-gray-100 px-4 py-3">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    {t('View all alerts')}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {user ? (
            <button
              type="button"
              onClick={logout}
              className="text-sm font-medium border border-gray-300 rounded px-2 py-1 text-gray-700 hover:bg-gray-50 inline-flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              {t('Logout')}
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
