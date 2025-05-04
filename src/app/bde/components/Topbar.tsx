'use client';

import { useRouter } from 'next/navigation';

export default function Topbar() {
  const router = useRouter();
  const bde = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('bdeUser') || '{}') : {};

  const handleLogout = () => {
    localStorage.removeItem('bdeUser');
    localStorage.removeItem('bdeToken');
    localStorage.removeItem('bdeId');
    router.push('/bde/login');
  };

  return (
    <div className="bg-[#1e293b] p-4 flex justify-between items-center text-white shadow-md rounded-md mb-6">
      <h2 className="text-lg font-semibold">Welcome, {bde?.name || 'BDE'}!</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
