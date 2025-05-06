'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/app/lib/axiosInstance';
import KYCModal from '../components/KYCModal'; // optional if you want View KYC
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function StudioManagement() {
  const [studios, setStudios] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStudios();
  }, []);

  const fetchStudios = async () => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/api/superadmin/studios`);
      setStudios(res.data?.studios || []);
    } catch (err) {
      console.error('Failed to fetch studios', err);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await axiosInstance.put(`${BASE_URL}/api/superadmin/studios/${id}/kyc/approve`);
      fetchStudios();
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    try {
      await axiosInstance.put(`${BASE_URL}/api/superadmin/studios/${id}/kyc/reject`, {
        rejectionReason: reason,
      });
      fetchStudios();
    } catch (err) {
      console.error('Rejection failed:', err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Studio Partner Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Studio Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studios.map((studio) => (
              <tr key={studio._id} className="border-t border-gray-700">
                <td className="p-2">{studio.name}</td>
                <td className="p-2">{studio.studioName}</td>
                <td className="p-2">{studio.email}</td>
                <td className="p-2">{studio.contactNumber}</td>
                <td className="p-2 capitalize">{studio.kyc?.status || 'pending'}</td>
                <td className="p-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelected(studio)}
                    className="bg-blue-600 px-2 py-1 rounded"
                  >
                    View KYC
                  </button>
                  {studio.kyc?.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(studio._id)}
                        className="bg-green-600 px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(studio._id)}
                        className="bg-red-600 px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {!studios.length && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-400">
                  No studio partners yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <KYCModal
          partner={selected}
          onClose={() => setSelected(null)}
          refresh={fetchStudios}
          role="studios"
        />
      )}
    </div>
  );
}
