import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccessDenied = ({ requireSuperadmin, email }) => (
  <div className="min-h-screen bg-gray-50 px-4 py-12">
    <div className="max-w-2xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-blue)] px-6 py-5 text-white">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
          <ShieldAlert className="w-4 h-4" />
          Access Check
        </div>
        <h1 className="mt-4 text-3xl font-serif">
          {requireSuperadmin ? 'Superadmin Access Needed' : 'Admin Access Needed'}
        </h1>
        <p className="mt-2 text-sm text-blue-100">
          Your current session reached the protected route, but this account has not been recognized for that level yet.
        </p>
      </div>

      <div className="px-6 py-6 space-y-5">
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Signed-in email</div>
          <div className="mt-1 text-sm font-semibold text-gray-900">{email || 'No signed-in email detected'}</div>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <p>
            To open this route, make sure this email is included in the matching Vercel environment variable and that the site has been redeployed.
          </p>
          <p>
            `VITE_ADMIN_EMAILS` controls `/admin`. `VITE_SUPERADMIN_EMAILS` controls `/superadmin`.
          </p>
          <p>
            Firestore user profiles also work: set `role` to `admin` or `superadmin` in the `users` collection.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-navy)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#152e55]"
          >
            Go To Dashboard
          </Link>
          <Link
            to="/admin"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Open Admin
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const AdminRoute = ({ children, requireSuperadmin = false, allowAdminFallback = false }) => {
  const { loading, isAdmin, isSuperadmin, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-4 border-blue-100 border-t-[var(--color-blue)] animate-spin" />
          <p className="mt-4 text-sm text-gray-600">Loading admin access...</p>
        </div>
      </div>
    );
  }

  const hasAccess = requireSuperadmin
    ? (isSuperadmin || (allowAdminFallback && isAdmin))
    : isAdmin;

  if (!hasAccess) {
    return <AccessDenied requireSuperadmin={requireSuperadmin} email={user?.email} />;
  }

  return children;
};

export default AdminRoute;
