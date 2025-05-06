'use client';

import { useEffect, useState } from 'react';
import DeliveryTable from '../components/DeliveryTable';

export default function DelhiveryManagementPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchPartners = async () => {
    try {
      const token = localStorage.getItem('superadminToken');
      const res = await fetch('http://localhost:5000/api/superadmin/delivery-partners', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setPartners(data.deliveryPartners || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching delivery partners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const filteredPartners = partners.filter((p) =>
    statusFilter === 'all' ? true : p.kyc?.status === statusFilter
  );

  const total = {
    all: partners.length,
    pending: partners.filter(p => p.kyc?.status === 'pending').length,
    approved: partners.filter(p => p.kyc?.status === 'approved').length,
    rejected: partners.filter(p => p.kyc?.status === 'rejected').length,
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Delivery Partner Management</h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        {['all', 'pending', 'approved', 'rejected'].map(status => (
          <button
            key={status}
            className={`px-4 py-1 rounded ${
              statusFilter === status
                ? 'bg-[#23DDC4] text-black font-semibold'
                : 'bg-gray-800 text-white'
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({total[status as keyof typeof total]})
          </button>
        ))}
      </div>

      {/* Table View */}
      {loading ? <p>Loading...</p> : <DeliveryTable partners={filteredPartners} refresh={fetchPartners} />}
    </div>
  );
}
