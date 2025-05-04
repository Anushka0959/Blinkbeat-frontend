'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import Navbar from '@/app/components/Layouts/Navbar';
import Footer from '@/app/components/Layouts/Footer';

export default function BDELoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bde/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) throw new Error('Invalid credentials');

      toast.success('Login successful');
      // Optionally redirect: window.location.href = '/bde/dashboard';
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <section className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111827] to-[#1f2937] text-white py-20 px-6">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">BDE Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/5 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#23DDC4]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-300">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/5 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#23DDC4]"
            />
          </div>

          <div className="text-center space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#23DDC4] hover:bg-[#0bae98] text-black font-semibold px-8 py-3 rounded-full transition disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link href="/bde/register" className="text-[#23DDC4] hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
    <Footer/>
    </>
  );
}
