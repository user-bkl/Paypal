'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const NAV_DATA = {
  personal: {
    label: 'Personal',
    columns: [
      {
        title: 'Shopping & Rewards',
        links: ['Buy Now, Pay Later', 'Rewards', 'PayPal credit and cards', 'PayPal Debit Card', 'Paying with PayPal']
      },
      {
        title: 'Send & Receive',
        links: ['Send money', 'Request money', 'Pool money', 'Donate', 'Start selling']
      },
      {
        title: 'Manage Your Money',
        links: ['Add cards and banks', 'Security and safety', 'Set up Direct Deposit', 'Add cash', 'Subscriptions', 'Savings and goals', 'Cryptocurrency']
      }
    ],
    sidebarButtons: ['Get the App', 'How PayPal Works', 'Money Hub']
  },
  business: {
    label: 'Business',
    columns: [
      {
        title: 'Business Types',
        links: ['Enterprises', 'Small Businesses', 'Solopreneurs', 'Partners', 'Platforms', 'Industries', 'Developers', 'Advertisers']
      },
      {
        title: 'Accept Payments',
        links: ['Online Checkout', 'Installment Payments', 'Guest Checkout', 'Accept Venmo', 'POS System', 'Invoicing', 'Payment Links', 'Enterprise Payments']
      },
      {
        title: 'Risk & Operations',
        links: ['Make Payments', 'Risk Management', 'Reporting Tools', 'Shipping', 'Agentic Commerce']
      },
      {
        title: 'Financial Services',
        links: ['Working Capital Loan', 'Business Loan', 'Business Debit Card']
      }
    ],
    sidebarButtons: ['Get Started', 'Fees'],
    sidebarLinks: ['Payment Methods', '3rd Party Integrations', 'Business Resource Center', 'Events']
  },
  advertiser: {
    label: 'Advertiser',
    columns: [
      {
        title: 'PayPal Ads',
        links: ['About PayPal Ads', 'PayPal Ads Solutions', 'PayPal Ads Resources']
      }
    ]
  }
};

export default function Header() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <header className="sticky top-0 w-full z-50 font-sans">
      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-[#E2E4E6] relative z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Navigation Menu */}
          <div className="flex items-center gap-8 h-full">
            {/* Logo */}
            <a href="/" className="flex-shrink-0 relative h-10 w-32">
              <Image src="/logo.jpeg" alt="PayPal Logo" fill className="object-contain object-left" priority />
            </a>

            {/* Nav Menu Links */}
            <nav className="hidden lg:flex items-center h-full">
              {['personal', 'business', 'advertiser'].map((key) => {
                const menu = NAV_DATA[key as keyof typeof NAV_DATA];
                return (
                  <div 
                    key={key} 
                    className="h-full flex items-center"
                    onMouseEnter={() => setHoveredNav(key)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <button className="flex items-center gap-1.5 px-4 focus:outline-none hover:text-[#0079C1] transition-colors cursor-pointer text-[0.95rem] font-semibold text-[#2C2E2F] h-full">
                      {menu.label}
                      <motion.div
                        animate={{ rotate: hoveredNav === key ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} className="text-[#003087]" />
                      </motion.div>
                    </button>
                  </div>
                );
              })}
              <div className="h-full flex items-center">
                <a href="#" className="px-4 text-[0.95rem] font-semibold text-[#2C2E2F] hover:text-[#0079C1] transition-colors h-full flex items-center">Developer</a>
              </div>
            </nav>
          </div>

          {/* Right Area Controls */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a href="#" className="hidden sm:block text-[#2C2E2F] hover:text-[#0079C1] text-[0.95rem] font-semibold transition-colors">
              Help
            </a>
            <a
              href="https://example.com"
              className="text-[#003087] border-[1.5px] border-[#003087] hover:border-[#0079C1] hover:text-[#0079C1] rounded-full px-5 py-2 text-sm font-bold transition-all cursor-pointer"
            >
              Download
            </a>
            <a
              href="https://example.com"
              className="bg-[#003087] text-white hover:bg-[#0079C1] rounded-full px-5 py-2.5 text-sm font-bold transition-all shadow-sm cursor-pointer"
            >
              2FA Download
            </a>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {hoveredNav && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border-b border-[#E2E4E6] shadow-xl z-30"
            onMouseEnter={() => setHoveredNav(hoveredNav)}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
              
              {hoveredNav === 'personal' && (
                <div className="flex gap-8">
                  {/* Left content (columns) */}
                  <div className="flex-1 flex gap-12">
                    {NAV_DATA.personal.columns.map((col, idx) => (
                      <div key={idx} className="flex-1">
                        <h3 className="font-bold text-lg text-[#2C2E2F] mb-6 flex items-center group cursor-pointer hover:text-[#0079C1] transition-colors">
                          {idx === 0 ? "PayPal for You" : col.title}
                          {idx !== 0 && <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                          {idx === 0 && <ArrowRight size={18} className="ml-2" />}
                        </h3>
                        <ul className="space-y-4">
                          {col.links.map((link, lidx) => (
                            <li key={lidx}>
                              <a href="#" className="text-[#2C2E2F] text-[0.95rem] hover:underline hover:text-[#0079C1]">{link}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {/* Right Sidebar */}
                  <div className="w-[300px] bg-[#F5F7FA] rounded-3xl p-8 flex flex-col gap-4">
                    {NAV_DATA.personal.sidebarButtons.map((btn, idx) => (
                      <a key={idx} href="#" className="bg-[#2C2E2F] text-white hover:bg-black rounded-full px-6 py-3 font-bold text-sm flex items-center justify-between transition-colors">
                        {btn} <ArrowRight size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {hoveredNav === 'business' && (
                <div className="flex gap-8">
                  <div className="flex-1 flex gap-8">
                    {NAV_DATA.business.columns.map((col, idx) => (
                      <div key={idx} className="flex-1">
                        <h3 className="font-bold text-lg text-[#2C2E2F] mb-1 flex items-center group cursor-pointer hover:text-[#0079C1] transition-colors">
                          {idx === 0 ? "PayPal Open" : col.title}
                          {idx !== 0 && <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                          {idx === 0 && <ArrowRight size={18} className="ml-2" />}
                        </h3>
                        {idx === 0 && <p className="text-sm text-[#6C7378] mb-6">The platform for all business</p>}
                        {idx !== 0 && <div className="h-5 mb-6"></div>}
                        <ul className="space-y-4">
                          {col.links.map((link, lidx) => (
                            <li key={lidx}>
                              <a href="#" className="text-[#2C2E2F] text-[0.95rem] hover:underline hover:text-[#0079C1]">{link}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="w-[300px] bg-[#F5F7FA] rounded-3xl p-8 flex flex-col gap-4">
                    {NAV_DATA.business.sidebarButtons.map((btn, idx) => (
                      <a key={idx} href="#" className="bg-[#2C2E2F] text-white hover:bg-black rounded-full px-6 py-3 font-bold text-sm flex items-center justify-between transition-colors">
                        {btn} <ArrowRight size={16} />
                      </a>
                    ))}
                    <div className="mt-4 flex flex-col gap-3">
                      {NAV_DATA.business.sidebarLinks?.map((link, idx) => (
                         <a key={idx} href="#" className="text-[#2C2E2F] text-sm hover:underline hover:text-[#0079C1]">{link}</a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {hoveredNav === 'advertiser' && (
                <div className="flex">
                  <div className="w-[300px]">
                     <h3 className="font-bold text-xl text-[#2C2E2F] mb-6 flex items-center group cursor-pointer hover:text-[#0079C1] transition-colors">
                        PayPal Ads <ArrowRight size={20} className="ml-2" />
                     </h3>
                     <ul className="space-y-5">
                        {NAV_DATA.advertiser.columns[0].links.map((link, idx) => (
                          <li key={idx}>
                             <a href="#" className="text-[#2C2E2F] font-semibold hover:underline hover:text-[#0079C1]">{link}</a>
                          </li>
                        ))}
                     </ul>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
