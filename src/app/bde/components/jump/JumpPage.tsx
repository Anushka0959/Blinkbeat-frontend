'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Megaphone, Globe, CalendarCheck, Star } from 'lucide-react';
import Navbar from '../../../components/Layouts/Navbar';
import CategorySection from '../../../components/category/CategorySection';

export default function Home() {
  const [quoteModal, setQuoteModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Quote Request Submitted:', form);
    setQuoteModal(false);
    setForm({ name: '', email: '', service: '', message: '' });
  };
  

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-white text-[#1d1d1f] font-sans">
        {/* Hero Section */}
        <section className="relative text-white overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden h-full w-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/hero-bg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-[#9333ea]/60 to-[#ec4899]/40 z-10"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 text-center py-32 px-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight max-w-5xl mx-auto tracking-tight">
              Digital Media Solutions That <span className="text-[#23DDC4]">Scale</span> Your Brand
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-200">
              Performance-first advertising, branding, and media execution — everything your business needs to grow.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <button
                onClick={() => setQuoteModal(true)}
                className="bg-[#23DDC4] hover:bg-[#0bae98] text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:scale-105"
              >
                Get a Quote
              </button>
              <a
                href="#services"
                className="border border-white hover:border-[#23DDC4] px-6 py-3 rounded-full text-white hover:text-[#23DDC4] transition-all duration-300 hover:bg-white"
              >
                Explore Services
              </a>
            </div>
          </motion.div>
        </section>

        {/* Core Services */}
        <section id="services" className="py-24 px-6 bg-[#F0FDFD]">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-[#0f172a] tracking-tight">
            Our Core Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {[
              { title: 'Media & Advertising', desc: 'Maximize reach with Google, Meta, and programmatic ad strategies.', icon: <Megaphone size={36} strokeWidth={2.2} /> },
              { title: 'Sales & Marketing', desc: 'Modern, high-converting websites and digital marketing funnels.', icon: <Globe size={36} strokeWidth={2.2} /> },
              { title: 'Events & Entertainment', desc: 'Engage audiences through curated influencer & experiential campaigns.', icon: <CalendarCheck size={36} strokeWidth={2.2} /> },
              { title: 'Branding & Promotions', desc: 'Craft impactful brand identities and drive awareness across channels.', icon: <Star size={36} strokeWidth={2.2} /> }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-[#A0F2EA] shadow-sm hover:shadow-xl transition-all duration-300 group text-center"
              >
                <div className="flex justify-center items-center mb-6">
                  <div className="bg-gradient-to-br from-[#23DDC4] to-[#1FC4B0] p-4 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300 text-white">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

       {/* Horizontal Category Sections */}
<CategorySection
  title="Spotlight"
  buttonLabel="Explore"
  buttonStyle="bg-[#23DDC4] text-white"
  categories={[
    { title: 'Media', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d' },
    { title: 'Marketing', image: 'https://images.unsplash.com/photo-1559526324-593bc073d938' },
    { title: 'Advertising', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d' },
    { title: 'Events', image: 'https://images.unsplash.com/photo-1503424886300-4e72e1f5c49e' },
    { title: 'Entertainment', image: 'https://images.unsplash.com/photo-1596079890747-cb70c1ee8c5f' }
  ]}
/>

<CategorySection
  title="E-Mail"
  buttonLabel="Buy Now"
  buttonStyle="bg-[#23DDC4] text-white"
  categories={[
    { title: 'Fashion', image: 'https://images.unsplash.com/photo-1520975698519-59a9333f4e20' },
    { title: 'Food', image: 'https://images.unsplash.com/photo-1555992336-03a23c36b5c6' },
    { title: 'Makeup', image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6' },
    { title: 'Travel', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
    { title: 'Health', image: 'https://images.unsplash.com/photo-1579154204601-015d289f9c5c' }
  ]}
/>

<CategorySection
  title="Studio"
  buttonLabel="Watch Now"
  buttonStyle="bg-[#23DDC4] text-white"
  categories={[
    { title: 'Podcast', image: 'https://images.unsplash.com/photo-1593642532871-8b12e02d091c' },
    { title: 'Shows', image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33' },
    { title: 'Web Series', image: 'https://images.unsplash.com/photo-1611224885990-4c3e5dc52f9b' },
    { title: 'Shorts', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809' },
    { title: 'Film', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d' }
  ]}
/>

<CategorySection
  title="Trending"
  buttonLabel="Explore"
  buttonStyle="bg-[#10B981] text-white"
  categories={[
    { title: 'Fashion & Lifestyles', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c' },
    { title: 'Food & Beverages', image: 'https://images.unsplash.com/photo-1546069901-eacef0df6022' },
    { title: 'Makeup & Beauties', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796' },
    { title: 'Travel & Hospitality', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764ce7' },
    { title: 'Health & Wellness', image: 'https://images.unsplash.com/photo-1571019613571-9b9a99708262' }
  ]}
/>


        {/* Clients */}
        <section className="py-20 px-6 bg-gray-100">
          <h2 className="text-3xl font-semibold text-center mb-10">Trusted by Leading Brands</h2>
          <div className="flex justify-center flex-wrap gap-8 max-w-5xl mx-auto">
            {["nike.jpg", "zomato.jpg", "swiggy.png", "groww.jpg", "nike.jpg"].map((logo, i) => (
              <Image key={i} src={`/logos/${logo}`} alt={logo} width={120} height={60} className="grayscale hover:grayscale-0 transition-all" />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0f172a] text-white py-10 px-6 text-center">
          <p className="text-sm mb-4">© {new Date().getFullYear()} Blink Beat — All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Contact</Link>
          </div>
        </footer>

        {/* Modal */}
        {quoteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
              <button
                onClick={() => setQuoteModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4">Request a Quote</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <input type="text" name="service" placeholder="Service Required" value={form.service} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <textarea name="message" rows={4} placeholder="Message..." value={form.message} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <button type="submit" className="bg-[#ec4899] text-white px-6 py-2 rounded-md hover:bg-[#db2777]">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
