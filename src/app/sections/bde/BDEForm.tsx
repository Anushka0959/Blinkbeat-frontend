'use client';

import Footer from '@/app/components/Layouts/Footer';
import Navbar from '@/app/components/Layouts/Navbar';
import { useState } from 'react';
import { toast } from 'sonner';

export default function BDEForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    whyJoin: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bde/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Something went wrong');

      toast.success('Registration successful!');
      setForm({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        whyJoin: '',
      });
    } catch (error) {
      toast.error('Failed to register. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <> 
    <Navbar/>
    <section className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111827] to-[#1f2937] text-white py-20 px-6">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          BDE Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: 'fullName', label: 'Full Name', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'phone', label: 'Phone', type: 'text' },
            { id: 'city', label: 'City', type: 'text' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-300">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={form[id]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#23DDC4]"
              />
            </div>
          ))}

          <div>
            <label htmlFor="whyJoin" className="block text-sm font-medium mb-1 text-gray-300">
              Why do you want to join?
            </label>
            <textarea
              id="whyJoin"
              name="whyJoin"
              rows={4}
              value={form.whyJoin}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#23DDC4]"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#23DDC4] hover:bg-[#0bae98] text-black font-semibold px-8 py-3 rounded-full transition disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
            <p className="text-gray-400 text-sm">
    Already registered?{' '}
    <a href="/bde/login" className="text-[#23DDC4] hover:underline">
      Login here
    </a>
  </p>
          </div>
        </form>
      </div>
    </section>
    <Footer/>
    </>
  );
}
