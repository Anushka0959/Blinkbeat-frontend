'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/superadmin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-[#0f172a] text-white">
        <TopNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
