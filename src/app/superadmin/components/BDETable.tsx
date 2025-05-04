'use client';

import { useState } from 'react';
import KYCModal from './KYCModal';

export default function BDETable({ bdes, refresh }: { bdes: any[]; refresh: () => void }) {
  const [selectedBDE, setSelectedBDE] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const perPage = 10;
  const filtered = bdes.filter((bde) =>
    bde.name.toLowerCase().includes(search.toLowerCase()) ||
    bde.email.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <>
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="text-sm text-gray-300">
          Showing {paginated.length} of {filtered.length} BDEs
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">KYC Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((bde) => (
              <tr key={bde._id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2">{bde.name}</td>
                <td className="px-4 py-2">{bde.email}</td>
                <td className="px-4 py-2">{bde.mobile}</td>
                <td className="px-4 py-2">{bde.level || 0}</td>
                <td className="px-4 py-2 capitalize text-yellow-400">{bde.kyc?.status || 'N/A'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedBDE(bde)}
                    className="text-sm bg-[#23DDC4] text-black px-3 py-1 rounded"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-300">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedBDE && (
        <KYCModal bde={selectedBDE} onClose={() => setSelectedBDE(null)} refresh={refresh} />
      )}
    </>
  );
}
