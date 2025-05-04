'use client';

import { useEffect, useState } from 'react';
import BDETable from '../components/BDETable';

export default function BDEManagementPage() {
  const [bdes, setBDEs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBDEs = async () => {
    try {
      const token = localStorage.getItem('superadminToken');
      const res = await fetch('http://localhost:5000/api/superadmin/bdes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setBDEs(data);
      } else {
        console.error(data.message);
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

  const [statusFilter, setStatusFilter] = useState('all');
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
    <div>
      <h1 className="text-2xl font-bold mb-4">BDE Management</h1>
      {loading ? <p>Loading...</p> : <BDETable bdes={bdes} refresh={fetchBDEs} />}
    </div>
    
  );
}
