'use client';

import { useState } from 'react';
import axios from 'axios';

interface Props {
  partnerType: 'stores' | 'studios' | 'delivery';
  additionalFields: { name: string; label: string }[];
}

export default function PartnerRegisterForm({ partnerType, additionalFields }: Props) {
  const [form, setForm] = useState<any>({});
  const [kyc, setKyc] = useState({
    aadhaarNumber: '',
    panNumber: '',
    aadhaarFile: null,
    panFile: null,
    photo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKycChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setKyc({ ...kyc, [name]: files[0] });
    } else {
      setKyc({ ...kyc, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append dynamic form fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append KYC fields
    formData.append('kyc[aadhaarNumber]', kyc.aadhaarNumber);
    formData.append('kyc[panNumber]', kyc.panNumber);
    if (kyc.aadhaarFile) formData.append('kyc[aadhaarFile]', kyc.aadhaarFile);
    if (kyc.panFile) formData.append('kyc[panFile]', kyc.panFile);
    if (kyc.photo) formData.append('kyc[photo]', kyc.photo);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${partnerType}/register`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      alert(`${partnerType} registered successfully`);
      setForm({});
      setKyc({
        aadhaarNumber: '',
        panNumber: '',
        aadhaarFile: null,
        panFile: null,
        photo: null,
      });
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        Register {partnerType.replace('-', ' ')} Partner
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {additionalFields.map(({ name, label }) => (
          <div key={name}>
            <label className="block capitalize mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name] || ''}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              required
            />
          </div>
        ))}

        {/* KYC Section */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <h2 className="text-lg font-semibold mb-2">KYC Information</h2>

          <label className="block mb-1">Aadhaar Number</label>
          <input
            type="text"
            name="aadhaarNumber"
            value={kyc.aadhaarNumber}
            onChange={handleKycChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            required
          />

          <label className="block mt-4 mb-1">PAN Number</label>
          <input
            type="text"
            name="panNumber"
            value={kyc.panNumber}
            onChange={handleKycChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            required
          />

          <label className="block mt-4 mb-1">Aadhaar File</label>
          <input type="file" name="aadhaarFile" onChange={handleKycChange} required />

          <label className="block mt-4 mb-1">PAN File</label>
          <input type="file" name="panFile" onChange={handleKycChange} required />

          <label className="block mt-4 mb-1">Photo</label>
          <input type="file" name="photo" onChange={handleKycChange} required />
        </div>

        <button
          type="submit"
          className="bg-[#23DDC4] text-black font-bold px-6 py-2 rounded mt-6"
        >
          Register
        </button>
      </form>
    </div>
  );
}
