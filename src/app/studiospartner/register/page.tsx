'use client';

import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Layouts/Navbar';
import Footer from '@/app/components/Layouts/Footer';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function StudioRegisterPage() {
  const [form, setForm] = useState({
    name: '',
    studioName: '',
    address: '',
    contactNumber: '',
    email: '',
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
    setKyc({ ...kyc, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('kyc[aadhaarNumber]', kyc.aadhaarNumber);
    formData.append('kyc[panNumber]', kyc.panNumber);
    if (kyc.aadhaarFile) formData.append('kyc[aadhaarFile]', kyc.aadhaarFile);
    if (kyc.panFile) formData.append('kyc[panFile]', kyc.panFile);
    if (kyc.photo) formData.append('kyc[photo]', kyc.photo);

    try {
      await axios.post(`${BASE_URL}/api/studios/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Studio partner registered successfully');
      setForm({
        name: '',
        studioName: '',
        address: '',
        contactNumber: '',
        email: '',
      });
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
    <>
    <Navbar/>
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-[#111827] text-white">

      <h1 className="text-2xl font-bold mb-4">Register Studio Partner</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
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

        <hr className="my-6 border-gray-700" />
        <h2 className="text-lg font-semibold">KYC Information</h2>

        <label className="block mb-1">Aadhaar Number</label>
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
    <Footer/>
    </>
  );

}
