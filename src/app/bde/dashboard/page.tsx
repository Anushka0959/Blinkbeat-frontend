'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Topbar from '../components/Topbar';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export default function BDEDashboard() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('bdeToken');
    const userData = localStorage.getItem('bdeUser');

    if (!token || !userData) {
      toast.error('Session expired. Please login again.');
      window.location.href = '/bde/login';
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    fetchReferrals(parsedUser._id, token);
  }, []);

  const fetchReferrals = async (bdeId: string, token: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/bde/direct-referrals/${bdeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setReferrals(data.referrals || []);
      } else {
        toast.error(data.message || 'Failed to load referrals');
      }
    } catch (error) {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: referrals.length,
    approved: referrals.filter(r => r.kyc?.status === 'approved').length,
    pending: referrals.filter(r => r.kyc?.status === 'pending').length,
    rejected: referrals.filter(r => r.kyc?.status === 'rejected').length,
    earnings: referrals.filter(r => r.kyc?.status === 'approved').length * 100  // ₹100 per approval (example)
  };
  

  return (
    <>
    <Topbar/>
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-2">
        Welcome{user?.name ? `, ${user.name}` : ''} 👋
      </h1>
      <p className="text-gray-400 mb-6">Here’s a summary of your referrals</p>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {Object.entries(stats).map(([key, value]) => (
  <div key={key} className="bg-[#1e293b] rounded-lg p-4 shadow">
    <h2 className="text-sm text-gray-400 capitalize">{key === 'earnings' ? 'Total Earnings' : `${key} referrals`}</h2>
    <p className="text-2xl font-semibold mt-1">{key === 'earnings' ? `₹${value}` : value}</p>
  </div>
))}

      </div>

      {/* Referral Tree Button */}
      <div className="mb-6">
        <a
          href="/bde/referral-tree"
          className="inline-block bg-[#23DDC4] text-black px-4 py-2 rounded hover:bg-[#19bda8] transition"
        >
          View Referral Tree
        </a>
      </div>

      {/* Referral Table */}
      <div className="bg-[#1e293b] rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left bg-[#334155] text-gray-300">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Level</th>
              <th className="p-3">KYC Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-center" colSpan={5}>
                  Loading...
                </td>
              </tr>
            ) : referrals.length > 0 ? (
              referrals.map((r) => (
                <tr key={r._id} className="border-t border-gray-700 hover:bg-[#2c3e50]">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.phoneNumber}</td>
                  <td className="p-3">{r.level || 0}</td>
                  <td className="p-3 capitalize">{r.kyc?.status || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center" colSpan={5}>
                  No referrals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
