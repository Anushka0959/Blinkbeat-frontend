'use client';

import Link from 'next/link';

export default function JumpPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Join the BlinkBeat BDE Program</h1>
      
      <p className="text-lg text-gray-600 mb-8 text-center">
        Earn commissions, grow your network, and work flexibly with one of the fastest expanding brands!
      </p>

      <div className="space-y-6 mb-10">
        <div className="bg-gray-50 p-5 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Why Join?</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>High Commissions per referral</li>
            <li>Work from anywhere, anytime</li>
            <li>Exclusive access to training & resources</li>
            <li>Opportunity to grow into leadership roles</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">How it Works?</h2>
          <p className="text-gray-700">
            Refer clients, get them onboarded, and earn commissions for every successful sale. Track everything inside your personalized dashboard.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <Link href="/bde/register">
          <button className="bg-[#23DDC4] hover:bg-[#0bae98] text-white px-8 py-3 rounded-full text-lg transition">
            Join Now
          </button>
        </Link>
      </div>
    </div>
  );
}
