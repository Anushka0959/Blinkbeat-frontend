'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

type BDEType = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  level: number;
  kyc?: { status?: string };
  referrals?: BDEType[];
};

function TreeNode({ bde }: { bde: BDEType }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="ml-4 mt-3">
      <div
        className="cursor-pointer p-2 bg-[#1e293b] rounded hover:bg-[#334155]"
        onClick={() => setExpanded(!expanded)}
      >
        <strong>{bde.name}</strong> ({bde.email}) — <span className="capitalize">{bde.kyc?.status || 'N/A'}</span>
      </div>
      {expanded && bde.referrals && (
        <div className="ml-4 border-l border-gray-600 pl-4 mt-2">
          {bde.referrals.map((child) => (
            <TreeNode key={child._id} bde={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReferralTreePage() {
  const [tree, setTree] = useState<BDEType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bdeToken');
    const user = JSON.parse(localStorage.getItem('bdeUser') || '{}');

    if (!user?._id || !token) {
      toast.error('Session expired. Please login again.');
      window.location.href = '/bde/login';
      return;
    }

    fetch(`${BASE_URL}/api/bde/tree/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?._id) setTree(data);
        else toast.error(data.message || 'Tree load failed');
      })
      .catch(() => toast.error('Failed to load referral tree'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Referral Tree</h1>
      <p className="text-gray-400 mb-6">Click on a referral to view their downline.</p>

      {loading ? (
        <p>Loading tree...</p>
      ) : tree ? (
        <TreeNode bde={tree} />
      ) : (
        <p>No referral tree data available.</p>
      )}
    </div>
  );
}
