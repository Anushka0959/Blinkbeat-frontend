'use client';

import Link from 'next/link';

const sections = [
  { name: 'BDE Management', href: '/superadmin/bdes' },
  { name: 'CMS Management', href: '/superadmin/cms' },
  { name: 'Delhivery Partners', href: '/superadmin/delhivery' },
  { name: 'Store Management', href: '/superadmin/stores' },
  { name: 'Finance', href: '/superadmin/finance' },
];

export default function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {sections.map((section) => (
        <Link
          href={section.href}
          key={section.name}
          className="bg-[#1f2937] hover:bg-[#111827] text-white rounded-lg p-6 transition-all duration-200 border border-gray-700"
        >
          <h3 className="text-lg font-semibold">{section.name}</h3>
          <p className="text-sm text-gray-400 mt-2">Manage {section.name.toLowerCase()} here</p>
        </Link>
      ))}
    </div>
  );
}
