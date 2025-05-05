'use client';

import Link from 'next/link';
import Navbar from '../components/Layouts/Navbar';
import Footer from '../components/Layouts/Footer';
import { Wallet, Globe, CheckCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JoinUsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/bde-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4 text-white">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Partner with BlinkBeat
          </motion.h1>
          <p className="text-lg md:text-xl max-w-3xl text-gray-300">
            Whether you're a marketer, entrepreneur, or freelancer — BlinkBeat offers flexible partner programs designed for growth and reward.
          </p>
        </div>
      </section>

{/* Partner Types Section */}
<section className="bg-white py-20 px-6">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-12 text-gray-800">Choose Your Partnership Role</h2>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      
      {/* BDA Partner */}
      <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
        <div className="flex justify-center items-center w-14 h-14 mx-auto bg-purple-100 text-purple-700 rounded-full mb-4">
          <i className="fas fa-building text-xl" />
        </div>
        <h3 className="text-xl font-semibold mb-3">BDA Partner</h3>
        <ul className="text-left text-gray-600 space-y-1 mb-5">
          <li>✅ Earn up to 25% commission</li>
          <li>✅ Exclusive training programs</li>
          <li>✅ Build your own team</li>
        </ul>
        <Link href="/bde/register">
          <button className="w-full bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-full font-medium transition">
            Join as BDA Partner →
          </button>
        </Link>
      </div>

      {/* Store Partner */}
      <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
        <div className="flex justify-center items-center w-14 h-14 mx-auto bg-purple-100 text-purple-700 rounded-full mb-4">
          <i className="fas fa-store text-xl" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Store Partner</h3>
        <ul className="text-left text-gray-600 space-y-1 mb-5">
          <li>✅ Premium store location</li>
          <li>✅ Complete business setup</li>
          <li>✅ Marketing support</li>
        </ul>
        <Link href="/storepartner">
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-medium transition">
          Join as Store Partner →
        </button>
        </Link>
      </div>

      {/* Studio Partner */}
      <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
        <div className="flex justify-center items-center w-14 h-14 mx-auto bg-red-100 text-red-600 rounded-full mb-4">
          <i className="fas fa-camera text-xl" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Studio Partner</h3>
        <ul className="text-left text-gray-600 space-y-1 mb-5">
          <li>✅ Professional equipment</li>
          <li>✅ Expert training</li>
          <li>✅ Booking platform access</li>
        </ul>
        <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium transition">
          Join as Studio Partner →
        </button>
      </div>

      {/* Delivery Partner */}
      <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
        <div className="flex justify-center items-center w-14 h-14 mx-auto bg-green-100 text-green-600 rounded-full mb-4">
          <i className="fas fa-truck text-xl" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Delivery Partner</h3>
        <ul className="text-left text-gray-600 space-y-1 mb-5">
          <li>✅ Flexible schedule</li>
          <li>✅ Weekly payments</li>
          <li>✅ Bonus incentives</li>
        </ul>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition">
          Join as Delivery Partner →
        </button>
      </div>
    </div>
  </div>
</section>


      {/* How It Works */}
      <section className="bg-[#f9fafb] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Register", desc: "Fill the online form and upload your KYC documents." },
              { title: "Refer", desc: "Start sharing BlinkBeat’s services with your network." },
              { title: "Earn", desc: "Receive commissions for each successful client referral." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2">{i + 1}. {item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-[#111827] py-20 text-white px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Eligibility & Documents</h2>
          <ul className="space-y-4 text-lg text-gray-300">
            <li>📍 Minimum age: <strong>18 years</strong></li>
            <li>🪪 Documents required:
              <ul className="list-disc ml-6">
                <li>Aadhaar Card</li>
                <li>PAN Card</li>
                <li>Passport-size photo</li>
              </ul>
            </li>
            <li>📞 Must have a valid phone number and email</li>
            <li>💬 Basic communication skills preferred</li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#23DDC4] text-black py-20 text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Excited to Partner with Us?</h2>
        <p className="mb-6 text-lg">Click below to register as a BlinkBeat BDE Partner and start earning from your network today.</p>
        <Link href="/bde/register">
          <button className="bg-black text-white hover:bg-gray-800 px-10 py-3 rounded-full text-lg font-bold">
            Join as BDE Partner
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
