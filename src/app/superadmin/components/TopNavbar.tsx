'use client';

import { useEffect, useState } from 'react';
import { Bell, LogOut } from 'lucide-react';

export default function TopNav() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('superadminToken');
      window.location.href = '/superadmin/login';
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-[#111827] border-b border-gray-700">
      <h1 className="text-xl font-bold text-white">BlinkBeat SuperAdmin</h1>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-300 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">3</span>
        </button>

        <div className="flex items-center gap-2">
          <img
            src="/admin.png"
            alt="Admin"
            className="w-8 h-8 rounded-full border border-gray-400"
          />
          <button
            onClick={handleLogout}
            className="text-sm text-gray-300 hover:text-red-400 flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
