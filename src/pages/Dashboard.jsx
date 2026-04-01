import { Link } from 'react-router-dom';
import { useUser } from '@clerk/react';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();


  if (!isLoaded) {
    return <div className="py-20 px-4 min-h-screen text-center">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <section className="py-20 px-4 min-h-screen bg-gray-100">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in</h2>
          <p className="mb-4">You need to sign in to access the dashboard.</p>
          <Link to="/login" className="text-blue-600 underline">Go to Login</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 min-h-screen bg-indigo-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">Welcome, {user?.primaryEmailAddress?.emailAddress || user?.firstName || 'User'}</h2>
            <p className="text-gray-600 mt-1">Status: Signed in</p>
          </div>
        </div>

        {user?.publicMetadata?.role === 'admin' ? (
          <>
            <h3 className="text-2xl font-semibold mb-3">Admin Panel</h3>
            <p className="text-gray-600 mb-4">
              Manage platform-wide settings, review users and see prime analytics.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl">
                <h4 className="font-bold">User Management</h4>
                <p className="text-gray-600 text-sm">See all registered clients and admins (future feature).</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h4 className="font-bold">Service Pricing</h4>
                <p className="text-gray-600 text-sm">Edit pricing options and promotional offers.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-3">Client Dashboard</h3>
            <p className="text-gray-600 mb-4">Access your saved quotes, requests, and campaign status.</p>
            <Link to="/services" className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg">
              Browse Services
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
