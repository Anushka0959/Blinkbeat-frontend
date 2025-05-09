'use client';

import { useEffect, useState } from 'react';
import KYCModal from '../components/KYCModal';
import axiosInstance from '@/app/lib/axiosInstance';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function StoreManagement() {
  const [stores, setStores] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/api/superadmin/stores`);
      setStores(res.data?.list || []);
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await axiosInstance.put(`${BASE_URL}/api/superadmin/stores/${id}/kyc/approve`);
      fetchStores();
    } catch (err) {
      console.error('Approve error:', err);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    try {
      await axiosInstance.put(`${BASE_URL}/api/superadmin/stores/${id}/kyc/reject`, { rejectionReason: reason });
      fetchStores();
    } catch (err) {
      console.error('Reject error:', err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Store Partner Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Contact Person</th>
              <th className="p-2">Email</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store._id} className="border-t border-gray-700">
                <td className="p-2">{store.name}</td>
                <td className="p-2">{store.contactPerson}</td>
                <td className="p-2">{store.contactEmail}</td>
                <td className="p-2">{store.contactMobile}</td>
                <td className="p-2 capitalize">{store.kyc?.status || 'pending'}</td>
                <td className="p-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelected(store)}
                    className="bg-blue-600 px-2 py-1 rounded"
                  >
                    View KYC
                  </button>
                  {store.kyc?.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(store._id)}
                        className="bg-green-600 px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(store._id)}
                        className="bg-red-600 px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {!stores.length && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  No store partners found.
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
          refresh={fetchStores}
          role="stores"
        />
      )}
    </div>
  );
}
