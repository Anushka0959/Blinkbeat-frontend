'use client';

import { useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function DelhiveryRegisterPage() {
  const [form, setForm] = useState({
    name: '',
    contactNumber: '',
    email: '',
    address: '',
  });

  const [kyc, setKyc] = useState({
    aadhaarNumber: '',
    panNumber: '',
    aadhaarFile: null as File | null,
    panFile: null as File | null,
    photo: null as File | null,
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

    // Append base fields
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
      await axios.post(`${BASE_URL}/api/delivery/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Delhivery partner registered successfully');
      setForm({ name: '', contactNumber: '', email: '', address: '' });
      setKyc({ aadhaarNumber: '', panNumber: '', aadhaarFile: null, panFile: null, photo: null });
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-[#111827] text-white">
      <h1 className="text-2xl font-bold mb-4">Register Delhivery Partner</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

        {/* Basic Info */}
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="block capitalize mb-1">{key}</label>
            <input
              type="text"
              name={key}
              value={form[key as keyof typeof form]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              required
            />
          </div>
        ))}

        {/* KYC Info */}
        <hr className="my-6 border-gray-700" />
        <h2 className="text-lg font-semibold">KYC Information</h2>

        <label className="block mb-1 mt-4">Aadhaar Number</label>
        <input
          type="text"
          name="aadhaarNumber"
          value={kyc.aadhaarNumber}
          onChange={handleKycChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          required
        />

        <label className="block mb-1 mt-4">PAN Number</label>
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

        <button type="submit" className="bg-[#23DDC4] px-4 py-2 rounded text-black font-bold mt-6">
          Register
        </button>
      </form>
    </div>
  );
}
