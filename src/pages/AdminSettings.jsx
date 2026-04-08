import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getAdminSession } from '../lib/adminAuth';

function SettingCard({ title, value, detail }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
}

export default function AdminSettings() {
  const { submissions } = useOutletContext();
  const adminSession = getAdminSession();
  const storageEstimate = useMemo(() => JSON.stringify(submissions).length, [submissions]);

  return (
    <div className="space-y-6">
      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.94))] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Settings</p>
        <h2 className="mt-3 text-3xl font-bold text-white">Admin environment</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Current admin session and API-backed lead storage details.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SettingCard title="Session" value={adminSession?.email || 'Unknown'} detail="Admin identity stored in a browser session token." />
        <SettingCard title="Lead records" value={String(submissions.length)} detail="Number of lead objects currently loaded from MongoDB." />
        <SettingCard title="Payload size" value={`${storageEstimate} bytes`} detail="Approximate current API payload size for the loaded lead dataset." />
      </div>

      <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-bold text-white">Current state</h3>
        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
          <p>Lead records now belong in the backend database instead of browser-local storage.</p>
          <p>Admin access is handled by a server-issued JWT rather than frontend environment variables.</p>
          <p>The next backend step is adding email delivery, richer dashboard metrics, and real booking availability logic.</p>
        </div>
      </div>
    </div>
  );
}
