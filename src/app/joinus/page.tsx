'use client';

import Link from 'next/link';
import Navbar from '../components/Layouts/Navbar';
import Footer from '../components/Layouts/Footer';
import { Wallet, Globe, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JumpPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-[#000000] via-[#111827] to-[#1f2937] text-white min-h-screen py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join the BlinkBeat BDE Program
          </motion.h1>
          <p className="text-lg text-gray-300 mb-12">
            Earn commissions, grow your network, and work flexibly with one of the fastest expanding brands!
          </p>

          {/* Cards Section */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <motion.div
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-[1.02] transition"
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-3 text-[#23DDC4]">
                <Wallet /> Why Join?
              </h2>
              <ul className="text-left list-disc list-inside text-gray-200 space-y-1">
                <li>High Commissions per referral</li>
                <li>Work from anywhere, anytime</li>
                <li>Exclusive access to training & resources</li>
                <li>Opportunity to grow into leadership roles</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-[1.02] transition"
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-3 text-[#23DDC4]">
                <Globe /> How it Works?
              </h2>
              <p className="text-left text-gray-200">
                Refer clients, get them onboarded, and earn commissions for every successful sale.
                Track everything inside your personalized dashboard.
              </p>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Link href="/bde/register">
              <button className="bg-[#23DDC4] hover:bg-[#0bae98] text-black font-semibold px-10 py-4 rounded-full text-lg shadow-xl transition-all">
                Join Now
              </button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
