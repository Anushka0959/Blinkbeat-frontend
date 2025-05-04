'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
    HighlighterIcon,
    Mail,
    MonitorSmartphone,
    Building2,
    UserPlus,
    LifeBuoy,
    Contact
  } from 'lucide-react';
  
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#0f172a]">
          <Image src="/logos/blinkbeat.png" alt="Logo" width={36} height={36} />
          Blink Beat
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700 items-center">
  <Link href="#services" className="flex items-center gap-1 hover:text-[#23DDC4] transition">
    <HighlighterIcon size={18} /> Spotlight
  </Link>
  <Link href="#clients" className="flex items-center gap-1 hover:text-[#23DDC4] transition">
    <Mail size={18} /> Email
  </Link>
  <Link href="#about" className="flex items-center gap-1 hover:text-[#23DDC4] transition">
    <MonitorSmartphone size={18} /> Studio
  </Link>
  <Link href="#contact" className="flex items-center gap-1 hover:text-[#23DDC4] transition">
    <Building2 size={18} /> Company
  </Link>
  <Link href="#contact" className="flex items-center gap-1 hover:text-[#23DDC4] transition">
    <UserPlus size={18} /> Join Us
  </Link>
  <Link href="#contact" className="flex items-center gap-1 hover:text-[#23DDC4] transition">
    <LifeBuoy size={18} /> Help
  </Link>
</nav>


        {/* CTA */}
        <div className="hidden md:block">
          <Link href="#quote">
            <button className="bg-[#23DDC4] text-white px-5 py-2 rounded-full hover:bg-[#23DDC3] transition">
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
        <nav className="flex flex-col gap-4 text-gray-700 font-medium">
          <Link href="#services" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
            < HighlighterIcon size={18} /> Spotlight
          </Link>
          <Link href="#clients" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
            <Mail size={18} /> Email
          </Link>
          <Link href="#about" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
            <MonitorSmartphone size={18} /> Studio
          </Link>
          <Link href="#contact" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#23DDC4] transition">
            <Building2 size={18} /> Company
          </Link>
          <Link href="#contact" className="flex items-center gap-2 hover:text-[#23DDC4] transition">
            <UserPlus size={18} /> Join Us
          </Link>
          <Link href="#contact" className="flex items-center gap-2 hover:text-[#23DDC4] transition">
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
