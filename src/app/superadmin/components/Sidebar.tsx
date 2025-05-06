'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  ShoppingCart,
  Boxes,
  Users,
  Settings,
  LogOut,
  UserCog,
  Truck,
  Camera,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/superadmin/dashboard' },
  { name: 'Stores', icon: Store, href: '/superadmin/stores' },
  { name: 'Orders', icon: ShoppingCart, href: '/superadmin/orders' },
  { name: 'Stocks', icon: Boxes, href: '/superadmin/stocks' },
  { name: 'Customers', icon: Users, href: '/superadmin/customers' },
  { name: 'Users & Roles', icon: Users, href: '/superadmin/users' },
  { name: 'Settings', icon: Settings, href: '/superadmin/settings' },
];

const bdeItems = [
  { name: 'BDA Management', icon: UserCog, href: '/superadmin/bdes' },
  { name: 'Store Management', icon: Store, href: '/superadmin/stores' },
  { name: 'Studio Management', icon: Camera, href: '/superadmin/studios' },
  { name: 'Delhivey Management', icon: Truck, href: '/superadmin/delhivery' },
];

const delhiveryItems = [
  { name: 'Delhivery Partners', icon: Truck, href: '/superadmin/delhivery/partners' },
  { name: 'Add Partner', icon: Truck, href: '/superadmin/delhivery/add' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderSection = (title: string, items: typeof navItems) => (
    <div className="mt-6">
      <h3 className="text-xs text-gray-400 uppercase px-4 mb-2">{title}</h3>
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
              isActive
                ? 'bg-[#23DDC4] text-black font-semibold'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside className="bg-[#111827] text-white h-screen w-64 fixed left-0 top-0 border-r border-gray-700">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        BlinkBeat Admin
      </div>
      <nav className="p-4 space-y-2">
        {renderSection('Main', navItems)}
        {renderSection('Partner Management', bdeItems)}
        {/* {renderSection('Delhivery Management', delhiveryItems)} */}
      </nav>
      <div className="absolute bottom-4 w-full px-4">
       
      </div>
    </aside>
  );
}
