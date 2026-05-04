import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Download, Mail, RefreshCcw, Search, ShieldCheck, Users, Clock3, Filter, Inbox } from 'lucide-react';
import { db } from '../lib/firebase';

const formatDate = (value) => {
  if (!value?.toDate) {
    return 'Pending timestamp';
  }

  return value.toDate().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatShortDate = (value) => {
  if (!value?.toDate) {
    return 'Not available';
  }

  return value.toDate().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const AdminWaitlist = ({
  title = 'Waitlist Leads',
  badgeLabel = 'Admin Panel',
  description = 'Monitor recent signups, search the pipeline, and export lead data for outreach or onboarding.',
  accessLabel = 'Access is granted when the signed-in email appears in `VITE_ADMIN_EMAILS`, or when the Firestore user profile includes `role: "admin"`.',
}) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadEntries = async () => {
    setLoading(true);
    setError('');

    try {
      const waitlistQuery = query(collection(db, 'waitlist'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(waitlistQuery);
      setEntries(snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      })));
    } catch (firebaseError) {
      console.error('Failed to load waitlist:', firebaseError);
      setError('Could not load waitlist records right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const waitlistQuery = query(collection(db, 'waitlist'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      waitlistQuery,
      (snapshot) => {
        setEntries(snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        })));
        setLoading(false);
      },
      (firebaseError) => {
        console.error('Failed to subscribe to waitlist:', firebaseError);
        setError('Could not load waitlist records right now.');
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const filteredEntries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return entries;
    }

    return entries.filter((entry) => {
      const email = entry.email?.toLowerCase() || '';
      const source = entry.source?.toLowerCase() || '';
      return email.includes(normalizedSearch) || source.includes(normalizedSearch);
    });
  }, [entries, search]);

  const stats = useMemo(() => {
    const landingPageCount = entries.filter((entry) => entry.source === 'landing-page').length;
    const latestEntry = entries[0]?.createdAt;
    const sourceCount = new Set(entries.map((entry) => entry.source || 'unknown')).size;

    return {
      landingPageCount,
      latestEntry,
      sourceCount,
    };
  }, [entries]);

  const exportCsv = () => {
    if (!filteredEntries.length) {
      return;
    }

    const rows = [
      ['Email', 'Source', 'Created At'],
      ...filteredEntries.map((entry) => [
        entry.email || '',
        entry.source || '',
        formatDate(entry.createdAt),
      ]),
    ];

    const csv = rows
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'realtyconnect-waitlist.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-[var(--color-blue)]">
                <ShieldCheck className="w-4 h-4" />
                {badgeLabel}
              </div>
              <h1 className="mt-4 text-3xl font-serif text-[var(--color-navy)]">{title}</h1>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={loadEntries}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <RefreshCcw className="w-4 h-4" />
                Refresh
              </button>
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-navy)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#152e55]"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-gray-100 md:grid-cols-4">
          <div className="bg-white px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 text-[var(--color-blue)]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Total Leads</div>
                <div className="mt-1 text-2xl font-bold text-gray-900">{entries.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-50 p-2 text-[var(--color-green)]">
                <Filter className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Visible</div>
                <div className="mt-1 text-2xl font-bold text-gray-900">{filteredEntries.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Landing Page</div>
                <div className="mt-1 text-2xl font-bold text-gray-900">{stats.landingPageCount}</div>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                <Clock3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Latest Join</div>
                <div className="mt-1 text-sm font-semibold text-gray-900">{formatShortDate(stats.latestEntry)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-navy)]">Lead Directory</h2>
                <p className="mt-1 text-sm text-gray-500">Search and review captured emails from your live waitlist funnel.</p>
              </div>

              <div className="relative w-full lg:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search email or source"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
                />
              </div>
            </div>
          </div>

          {error ? (
            <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="px-6 py-14 text-center text-sm text-gray-500">Loading waitlist data...</div>
          ) : filteredEntries.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-6 py-3 font-semibold">Lead</th>
                    <th className="px-6 py-3 font-semibold">Source</th>
                    <th className="px-6 py-3 font-semibold">Joined At</th>
                    <th className="px-6 py-3 font-semibold">Record</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                            {(entry.email || '?').slice(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{entry.email || 'Unknown email'}</div>
                            <div className="text-xs text-gray-500">Waitlist lead</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
                          {entry.source || 'unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(entry.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs text-gray-500">{entry.id}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Inbox className="w-7 h-7" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">No matching leads</h2>
              <p className="mt-2 text-sm text-gray-500">
                Try a broader search, or collect a few new signups from the landing page and they will appear here.
              </p>
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-[var(--color-navy)]">Collection Summary</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-900">Unique sources</div>
                  <div className="text-xs text-gray-500">How many intake channels are represented</div>
                </div>
                <div className="text-lg font-bold text-gray-900">{stats.sourceCount}</div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-900">Last captured lead</div>
                  <div className="text-xs text-gray-500">Newest timestamp currently in Firestore</div>
                </div>
                <div className="text-right text-sm font-semibold text-gray-900">{formatShortDate(stats.latestEntry)}</div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-[var(--color-navy)]">Admin Access</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {accessLabel}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default AdminWaitlist;
