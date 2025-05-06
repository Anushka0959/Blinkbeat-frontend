// File: src/app/superadmin/layout.tsx
import '../globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'SuperAdmin Panel | BlinkBeat',
  description: 'Manage stores, orders, users, and system settings.',
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
