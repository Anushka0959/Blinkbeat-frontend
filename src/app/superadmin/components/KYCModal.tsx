'use client';

import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export default function KYCModal({ bde, onClose, refresh }: any) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('superadminToken') : '';

  const updateKYC = async (status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`${BASE_URL}/api/superadmin/bdes/${bde._id}/updateKYC`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          aadhaarNumber: bde.kyc?.aadhaarNumber,
          panNumber: bde.kyc?.panNumber,
          status,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`KYC ${status} successfully`);
        refresh();
        onClose();
      } else {
        toast.error(data.message || 'Error updating KYC');
      }
    } catch (error) {
      toast.error('Request failed');
    }
  };

  const renderPreview = (label: string, path: string) => {
    if (!path) return null;

    // Remove double slashes
    const cleanedPath = path.startsWith('/') ? path.slice(1) : path;
    const fullPath = `${BASE_URL}/${cleanedPath}`;
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(path);
    const isPDF = /\.pdf$/i.test(path);

    return (
      <div key={label} className="mb-3">
        <p className="font-semibold mb-1">{label}:</p>

        {isImage && (
          <img
            src={fullPath}
            alt={label}
            className="w-full h-auto max-h-48 object-contain rounded border border-gray-700"
          />
        )}

        {isPDF && (
          <iframe
            src={fullPath}
            className="w-full h-48 rounded border border-gray-700"
            title={label}
          ></iframe>
        )}

        {!isImage && !isPDF && (
          <p className="text-sm text-red-400">Unsupported file format</p>
        )}

        <a
          href={fullPath}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-sm underline mt-1 inline-block"
        >
          Download {label}
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1f2937] p-6 rounded-lg w-full max-w-md text-white relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-2 right-3 text-gray-400" onClick={onClose}>✕</button>
        <h2 className="text-xl font-semibold mb-4">Review KYC</h2>

        <div className="space-y-3 text-sm">
          <p><strong>Aadhaar:</strong> {bde.kyc?.aadhaarNumber}</p>
          <p><strong>PAN:</strong> {bde.kyc?.panNumber}</p>
          <p><strong>Status:</strong> <span className="capitalize">{bde.kyc?.status}</span></p>

          {renderPreview('Aadhaar File', bde.kyc?.aadhaarFile)}
          {renderPreview('PAN File', bde.kyc?.panFile)}
          {renderPreview('Photo', bde.kyc?.photo)}
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={() => updateKYC('approved')} className="bg-green-500 text-white px-4 py-2 rounded">
            Approve
          </button>
          <button onClick={() => updateKYC('rejected')} className="bg-red-500 text-white px-4 py-2 rounded">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
