'use client';

import { useEffect, useState } from 'react';
import KYCModal from '../components/KYCModal';
import axiosInstance from '@/app/lib/axiosInstance';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface BDE {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  kyc?: {
    status: 'pending' | 'approved' | 'rejected';
  };
}

export default function BDEManagementPage() {
  const [bdes, setBDEs] = useState<BDE[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BDE | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchBDEs = async () => {
    try {
      const token = localStorage.getItem('superadminToken');
      const res = await axiosInstance.get('/api/superadmin/bdes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setBDEs(res.data);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching BDEs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBDEs();
  }, []);

  const filteredBDEs = bdes.filter((bde) =>
    statusFilter === 'all' ? true : bde.kyc?.status === statusFilter
  );

  const total = {
    all: bdes.length,
    pending: bdes.filter(b => b.kyc?.status === 'pending').length,
    approved: bdes.filter(b => b.kyc?.status === 'approved').length,
    rejected: bdes.filter(b => b.kyc?.status === 'rejected').length,
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">BDE Management</h1>

      <div className="flex gap-4 mb-4">
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded ${statusFilter === status ? 'bg-[#23DDC4] text-black' : 'bg-gray-700'}`}
            onClick={() => setStatusFilter(status)}
          >
            {status.toUpperCase()} ({total[status as keyof typeof total]})
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBDEs.map((bde) => (
                <tr key={bde._id} className="border-t border-gray-700">
                  <td className="p-2">{bde.name}</td>
                  <td className="p-2">{bde.email}</td>
                  <td className="p-2">{bde.mobile}</td>
                  <td className="p-2 capitalize">{bde.kyc?.status || 'pending'}</td>
                  <td className="p-2 flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelected(bde)}
                      className="bg-blue-600 px-2 py-1 rounded"
                    >
                      View KYC
                    </button>
                  </td>
                </tr>
              ))}
              {!filteredBDEs.length && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-400">
                    No BDEs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <KYCModal
          partner={selected}
          role="bdes"
          refresh={fetchBDEs}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
