'use client';

import { useState } from 'react';
import axiosInstance from '@/app/lib/axiosInstance';
import KYCModal from '../components/KYCModal';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function DeliveryTable({ partners, refresh }: { partners: any[]; refresh: () => void }) {
  const [selectedKYC, setSelectedKYC] = useState<any>(null);

  const handleApprove = async (id: string) => {
    try {
      await axiosInstance.put(`${BASE_URL}/api/superadmin/delivery-partners/${id}/kyc/approve`);
      refresh();
    } catch (err) {
      console.error('Approval error:', err);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    try {
      await axiosInstance.put(`${BASE_URL}/api/superadmin/delivery-partners/${id}/kyc/reject`, {
        rejectionReason: reason,
      });
      refresh();
    } catch (err) {
      console.error('Rejection error:', err);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Address</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner._id} className="border-t border-gray-700">
                <td className="p-2">{partner.name}</td>
                <td className="p-2">{partner.email}</td>
                <td className="p-2">{partner.contactNumber}</td>
                <td className="p-2">{partner.address}</td>
                <td className="p-2 capitalize">{partner.kyc?.status || 'pending'}</td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedKYC(partner)}
                    className="bg-blue-600 px-2 py-1 rounded"
                  >
                    View KYC
                  </button>
                  {partner.kyc?.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(partner._id)}
                        className="bg-green-600 px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(partner._id)}
                        className="bg-red-600 px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {!partners.length && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  No delivery partners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedKYC && (
        <KYCModal
          partner={selectedKYC}
          onClose={() => setSelectedKYC(null)}
        />
      )}
    </>
  );
}
