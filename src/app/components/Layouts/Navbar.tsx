'use client';

import { useState, useEffect } from 'react';
import { Menu, X, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HighlighterIcon,
  Mail,
  MonitorSmartphone,
  Building2,
  UserPlus,
  LifeBuoy,
  Contact,
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('Detecting...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
        );
        const data = await res.json();
        setLocation(data.address.city || data.address.town || 'Unknown');
      });
    }
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-6 min-w-[180px]">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#0f172a]">
            <Image src="/logos/blinkbeat.png" alt="Logo" width={36} height={36} />
            Blink Beat
          </Link>
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <MapPin size={18} />
            <span>{location}</span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23DDC4]"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* Right: Menu + CTA */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
          <Link href="#services" className="hover:text-[#23DDC4] transition flex items-center gap-1">
            <HighlighterIcon size={18} /> Spotlight
          </Link>
          <Link href="/emall" className="hover:text-[#23DDC4] transition flex items-center gap-1">
            <Mail size={18} /> E-Mall
          </Link>
          <Link href="#about" className="hover:text-[#23DDC4] transition flex items-center gap-1">
            <MonitorSmartphone size={18} /> Studio
          </Link>
          <Link href="#contact" className="hover:text-[#23DDC4] transition flex items-center gap-1">
            <Building2 size={18} /> Company
          </Link>
          <Link href="/joinus" className="hover:text-[#23DDC4] transition flex items-center gap-1">
            <UserPlus size={18} /> Join Us
          </Link>
          <Link href="#contact" className="hover:text-[#23DDC4] transition flex items-center gap-1">
            <LifeBuoy size={18} /> Help
          </Link>

          <Link href="#quote">
            <button className="bg-[#23DDC4] text-white px-5 py-2 rounded-full hover:bg-[#0bae98] transition">
              Get a Quote
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          {/* Location */}
          <div className="flex items-center gap-2 mb-4 text-gray-700">
            <MapPin size={18} />
            <span>{location}</span>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23DDC4]"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-4 text-gray-700 font-medium">
            <Link href="#services" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
              <HighlighterIcon size={18} /> Spotlight
            </Link>
            <Link href="/emall" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
              <Mail size={18} /> E-Mall
            </Link>
            <Link href="#about" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
              <MonitorSmartphone size={18} /> Studio
            </Link>
            <Link href="#contact" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
              <Building2 size={18} /> Company
            </Link>
            <Link href="/joinus" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
              <UserPlus size={18} /> Join Us
            </Link>
            <Link href="#contact" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
              <LifeBuoy size={18} /> Help
            </Link>
            <Link href="#quote" onClick={() => setIsOpen(false)}>
              <button className="bg-[#23DDC4] text-white w-full py-2 rounded-full hover:bg-[#0bae98] transition flex items-center justify-center gap-2">
                <Contact size={18} /> Get a Quote
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
