'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'; // ✅ import router

export default function BDELoginPage() {
  const router = useRouter(); // ✅ instantiate router
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bde/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      toast.success('Login successful');

      // ✅ Save session if needed
      localStorage.setItem('bdeToken', data.token);
      localStorage.setItem('bdeUser', JSON.stringify(data.bde));

      // ✅ Redirect using router
      router.push('/bde/dashboard');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#111827] to-[#1f2937] text-white py-20 px-6">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">BDE Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 capitalize">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-white/5 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#23DDC4]"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 capitalize">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-white/5 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#23DDC4]"
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
              <a href="/bde/register" className="text-[#23DDC4] hover:underline">
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
