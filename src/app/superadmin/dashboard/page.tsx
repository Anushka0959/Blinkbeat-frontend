import TopNavbar from '../components/TopNavbar';
import AnalyticsGrid from '../components/AnalyticsGrid';
import SectionCards from '../components/SectionCards';

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <TopNavbar />
      <main className="p-6">
        <AnalyticsGrid />
        <SectionCards />
      </main>
    </div>
  );
}
