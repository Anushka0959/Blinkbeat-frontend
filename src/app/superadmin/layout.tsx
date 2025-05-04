import '../globals.css'; // if needed
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';

export const metadata = {
  title: 'SuperAdmin Panel | BlinkBeat',
  description: 'Manage stores, orders, users, and system settings.',
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="ml-64 w-full min-h-screen bg-[#0f172a] text-white">
        <TopNavbar />

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
