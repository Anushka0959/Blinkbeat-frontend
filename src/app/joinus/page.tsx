'use client';

import Link from 'next/link';
import Navbar from '../components/Layouts/Navbar';
import Footer from '../components/Layouts/Footer';
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
            className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Partner with <span className="text-[#23DDC4]">BlinkBeat</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Whether you're a marketer, entrepreneur, or freelancer — BlinkBeat offers flexible partner programs designed for growth and reward.
          </motion.p>
        </div>
      </section>

      {/* Partner Types Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">Choose Your Partnership Role</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'BDA Partner',
                icon: 'fa-building',
                color: 'purple',
                items: [
                  'Earn up to 25% commission',
                  'Exclusive training programs',
                  'Build your own team',
                ],
                link: '/bde/register',
              },
              {
                title: 'Store Partner',
                icon: 'fa-store',
                color: 'purple',
                items: [
                  'Premium store location',
                  'Complete business setup',
                  'Marketing support',
                ],
                link: '/storepartner',
              },
              {
                title: 'Studio Partner',
                icon: 'fa-camera',
                color: 'red',
                items: [
                  'Professional equipment',
                  'Expert training',
                  'Booking platform access',
                ],
              },
              {
                title: 'Delivery Partner',
                icon: 'fa-truck',
                color: 'green',
                items: [
                  'Flexible schedule',
                  'Weekly payments',
                  'Bonus incentives',
                ],
              },
            ].map((role, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <div
                  className={`flex justify-center items-center w-14 h-14 mx-auto bg-${role.color}-100 text-${role.color}-600 rounded-full mb-4`}
                >
                  <i className={`fas ${role.icon} text-xl`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{role.title}</h3>
                <ul className="text-left text-gray-600 space-y-1 mb-5 text-sm">
                  {role.items.map((point, i) => (
                    <li key={i}>✅ {point}</li>
                  ))}
                </ul>
                {role.link ? (
                  <Link href={role.link}>
                    <button
                      className={`w-full bg-${role.color}-600 hover:bg-${role.color}-700 text-white px-4 py-2 rounded-full font-semibold transition`}
                    >
                      Join as {role.title} →
                    </button>
                  </Link>
                ) : (
                  <button
                    className={`w-full bg-${role.color}-600 hover:bg-${role.color}-700 text-white px-4 py-2 rounded-full font-semibold transition`}
                  >
                    Join as {role.title} →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#f9fafb] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'Register', desc: 'Fill the online form and upload your KYC documents.' },
              { title: 'Refer', desc: 'Start sharing BlinkBeat’s services with your network.' },
              { title: 'Earn', desc: 'Receive commissions for each successful client referral.' },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <h4 className="text-xl font-semibold mb-2">{index + 1}. {step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
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
          <button className="bg-black text-white hover:bg-gray-800 px-10 py-3 rounded-full text-lg font-bold transition">
            Join as BDE Partner
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
