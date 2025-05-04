'use client';

export default function AnalyticsGrid() {
  const metrics = [
    { title: 'Total BDEs', value: 128 },
    { title: 'Pending KYCs', value: 14 },
    { title: 'Total Revenue', value: '₹8.2L' },
    { title: 'Active Partners', value: 6 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-8">
      {metrics.map((m, idx) => (
        <div key={idx} className="bg-white/10 p-6 rounded-lg text-white shadow">
          <h3 className="text-sm font-medium text-gray-400">{m.title}</h3>
          <p className="text-2xl font-semibold">{m.value}</p>
        </div>
      ))}
    </div>
  );
}
