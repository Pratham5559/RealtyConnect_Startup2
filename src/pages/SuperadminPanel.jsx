import AdminWaitlist from './AdminWaitlist';

const SuperadminPanel = () => (
  <AdminWaitlist
    title="Superadmin Waitlist Console"
    badgeLabel="Superadmin"
    description="Review live waitlist signups, inspect captured lead records, and manage the highest-visibility intake list in the same RealtyConnect admin style."
    accessLabel='Preferred access comes from `VITE_SUPERADMIN_EMAILS` or a Firestore profile with `role: "superadmin"`. Admin accounts can also open this console in the current build.'
  />
);

export default SuperadminPanel;
