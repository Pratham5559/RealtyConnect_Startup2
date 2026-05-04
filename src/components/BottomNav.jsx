import { NavLink } from 'react-router-dom';
import { Home, Building2, Briefcase, Store, User, Shield, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const { t } = useTranslation();
  const { isAdmin, isSuperadmin } = useAuth();
  
  const navItems = [
    { to: '/dashboard', icon: Home, label: t('Dashboard') },
    { to: '/properties', icon: Building2, label: t('Properties') },
    { to: '/portfolio', icon: Briefcase, label: t('My Portfolio') },
    { to: '/market', icon: Store, label: t('Secondary Market') },
    ...(isAdmin ? [{ to: '/admin', icon: Shield, label: t('Admin') }] : []),
    ...(isSuperadmin ? [{ to: '/superadmin', icon: Crown, label: t('Superadmin') }] : []),
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 pb-safe z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-[var(--color-navy)]' : 'text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-6 h-6 ${isActive ? 'fill-[var(--color-navy)] stroke-[var(--color-navy)] text-white' : ''}`} />
                <span className="text-[10px] font-medium">{label || 'Menu'}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
