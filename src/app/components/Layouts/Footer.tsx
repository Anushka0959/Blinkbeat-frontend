'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Left */}
        <div>
          <h4 className="text-lg font-semibold">Blink Beat</h4>
          <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} Blink Beat — All rights reserved.
          </p>
        </div>

        {/* Center (links) */}
        <div className="flex gap-6 text-sm">
          <Link href="#" className="hover:text-primary transition">
            Privacy
          </Link>
          <Link href="#" className="hover:text-primary transition">
            Terms
          </Link>
          <Link href="#" className="hover:text-primary transition">
            Contact
          </Link>
        </div>

        {/* Right (CTA Button) */}
        <div>
          <Link href="#quote">
            <button className="bg-primary hover:bg-[#0bae98] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300">
              Get a Quote
            </button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
