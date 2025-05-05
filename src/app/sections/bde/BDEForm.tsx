'use client';

import Footer from '@/app/components/Layouts/Footer';
import Navbar from '@/app/components/Layouts/Navbar';
import { useState } from 'react';
import { toast } from 'sonner';

export default function BDEForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    referredBy: '',
    kyc: {
      aadhaarNumber: '',
      panNumber: '',
      aadhaarFile: null,
      panFile: null,
      photo: null,
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (['aadhaarFile', 'panFile', 'photo'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        kyc: {
          ...prev.kyc,
          [name]: files?.[0] || null,
        }
      }));
    } else if (['aadhaarNumber', 'panNumber'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        kyc: {
          ...prev.kyc,
          [name]: value
        }
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep = () => {
    const { name, email, mobile, password, referredBy, kyc } = form;
    const aadhaarRegex = /^\d{12}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (step === 1) {
      if (!name || !email || !mobile || !password) {
        toast.error("Please fill all required fields.");
        return false;
      }
      if (!mobileRegex.test(mobile)) {
        toast.error("Invalid mobile number.");
        return false;
      }
      if (!emailRegex.test(email)) {
        toast.error("Invalid email format.");
        return false;
      }
    } else if (step === 2) {
      if (!aadhaarRegex.test(kyc.aadhaarNumber)) {
        toast.error("Invalid Aadhaar number.");
        return false;
      }
      if (!panRegex.test(kyc.panNumber)) {
        toast.error("Invalid PAN number.");
        return false;
      }
    } else if (step === 3) {
      if (!kyc.aadhaarFile || !kyc.panFile || !kyc.photo) {
        toast.error("Please upload all KYC documents.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);

    try {
      const formData = new FormData();
      const { kyc } = form;
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('mobile', form.mobile);
      formData.append('password', form.password);
      if (form.referredBy) formData.append('referredBy', form.referredBy);
      formData.append('kyc[aadhaarNumber]', kyc.aadhaarNumber);
      formData.append('kyc[panNumber]', kyc.panNumber);
      formData.append('kyc[aadhaarFile]', kyc.aadhaarFile!);
      formData.append('kyc[panFile]', kyc.panFile!);
      formData.append('kyc[photo]', kyc.photo!);

      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      const res = await fetch(`${BASE_URL}/api/bde/register`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Registration failed.');
        return;
      }

      toast.success('Registration successful!');
      setForm({
        name: '',
        email: '',
        mobile: '',
        password: '',
        referredBy: '',
        kyc: {
          aadhaarNumber: '',
          panNumber: '',
          aadhaarFile: null,
          panFile: null,
          photo: null,
        }
      });
      setStep(1);
    } catch (err) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <section className="min-h-screen bg-gradient-to-br from-black via-[#111827] to-[#1f2937] text-white py-20 px-6">
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">BDE Registration</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">

          {/* Step Indicators */}
          <div className="flex justify-center space-x-4 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-3 w-3 rounded-full ${s === step ? 'bg-[#23DDC4]' : 'bg-gray-500'}`}
              />
            ))}
          </div>

          {step === 1 && (
            <>
              {['name', 'email', 'mobile', 'password'].map((field) => (
                <div key={field}>
                  <label className="block text-sm mb-1 capitalize">{field}</label>
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md bg-white/5 border border-gray-600 text-white focus:ring-[#23DDC4]"
                  />
                </div>
              ))}
              <div>
              <label className="block text-sm mb-1">Referral Email or ID (optional)</label>
<input
  name="referredBy"
  value={form.referredBy}
  onChange={handleChange}
  placeholder="e.g. john@blinkbeat.com or referral ID"
  className="w-full p-3 rounded-md bg-white/5 border border-gray-600 text-white"
/>

              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm mb-1">Aadhaar Number</label>
                <input
                  name="aadhaarNumber"
                  value={form.kyc.aadhaarNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-white/5 border border-gray-600 text-white focus:ring-[#23DDC4]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">PAN Number</label>
                <input
                  name="panNumber"
                  value={form.kyc.panNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-white/5 border border-gray-600 text-white focus:ring-[#23DDC4]"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm mb-1">Aadhaar File</label>
                <input type="file" name="aadhaarFile" onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm mb-1">PAN File</label>
                <input type="file" name="panFile" onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm mb-1">Photo</label>
                <input type="file" name="photo" onChange={handleChange} required />
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="text-gray-300 hover:text-white underline">
                Back
              </button>
            )}

            {step < 3 ? (
              <button type="button" onClick={handleNext} className="bg-[#23DDC4] text-black px-6 py-2 rounded-full">
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="bg-[#23DDC4] text-black px-6 py-2 rounded-full disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>

          <p className="text-center text-gray-400 text-sm pt-4">
            Already registered? <a href="/bde/login" className="text-[#23DDC4] underline">Login here</a>
          </p>
        </form>
      </div>
    </section>
    <Footer/>
    </>
  );
}
