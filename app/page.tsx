"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { ArrowRight, Check, X, Smartphone, CreditCard, Zap, Shield, TrendingUp, Sun, BarChart3, ChevronRight, Play } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="w-full bg-white">
      <Hero />
      <TrustBar />
      <ThreeValueProps />
      <ComparisonTable />
      <HowItWorksSteps />
      <LiveImpactNumbers />
      <Testimonials />
      <FAQ />
      <SimpleCTA />
    </div>
  );
};

/* HERO - Enhanced with better animations */
const Hero: React.FC = () => {
  const [count, setCount] = useState({ earnings: 0, owners: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const earningsTarget = 160000;
    const ownersTarget = 10;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount({
        earnings: Math.floor((earningsTarget / steps) * currentStep),
        owners: Math.floor((ownersTarget / steps) * currentStep),
      });
      
      if (currentStep >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-40 pb-24 px-6 bg-gradient-to-b from-teal-50/50 via-white to-white relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Headline */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-teal-600" />
            <span className="text-teal-700 font-semibold text-sm">Solar beyond rooftops</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight"
          >
            Save on power bills with
            <br />
            <span className="bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Virtual Solar
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Own solar panels on real farms. No rooftop needed. Start earning from day one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="/projects"
              className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all text-lg inline-flex items-center justify-center"
            >
              Browse Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-teal-600 hover:bg-teal-50 transition-all text-lg inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <Play className="w-5 h-5 text-teal-600 ml-0.5" fill="currentColor" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-8 flex-wrap text-sm"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">No installation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">Start from ₹10K</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">24/7 monitoring</span>
            </div>
          </motion.div>
        </div>

        {/* NARRATIVE HOOK SECTION - Scroll-triggered story */}
        <NarrativeHook />

        {/* Enhanced Dashboard Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl opacity-20 blur-3xl" />
          
          {/* Browser Window */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Browser Chrome */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-lg px-4 py-2 text-sm text-gray-500 flex items-center gap-2 shadow-sm">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  app.renewz.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
              
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, Priya</h3>
                  <p className="text-gray-500">Here's your solar performance today</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-green-700">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Card 1 */}
                <motion.div 
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Your Capacity</span>
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Sun className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">3.0 kW</div>
                  <div className="text-sm text-gray-500 mb-3">Reserved solar</div>
                  <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full w-fit">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-medium">+2kW available</span>
                  </div>
                </motion.div>

                {/* Card 2 - Featured */}
                <motion.div 
                  className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl p-6 shadow-lg text-white relative overflow-hidden"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium opacity-90">This Month</span>
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">₹2,840</div>
                    <div className="text-sm opacity-90 mb-3">From 156 kWh generated</div>
                    <div className="flex items-center gap-2 text-xs bg-white/20 px-3 py-1.5 rounded-full w-fit">
                      <span>+12% vs last month</span>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Generating</span>
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">2.4 kW</div>
                  <div className="text-sm text-green-600 mb-3">Live generation</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Efficiency</span>
                      <span className="font-semibold">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '80%' }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900">Generation This Week</h4>
                    <p className="text-sm text-gray-500 mt-0.5">Daily kWh output</p>
                  </div>
                  <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                </div>
                <div className="h-40 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        className="w-full bg-gradient-to-t from-teal-600 to-cyan-400 rounded-t-lg relative group cursor-pointer"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                        whileHover={{ opacity: 0.8 }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {(height * 0.3).toFixed(1)} kWh
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-xs text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <span key={day} className="flex-1 text-center">{day}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animated stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 flex items-center justify-center gap-12 flex-wrap"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-gray-600">
              <strong className="text-teal-600 font-bold">₹{count.earnings.toLocaleString('en-IN')}</strong> earned by panel owners
            </span>
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 border-2 border-white" />
              ))}
            </div>
            <span className="text-gray-600">
              <strong className="text-teal-600 font-bold">{count.owners}+</strong> active members
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* NARRATIVE HOOK - Cinematic storytelling with stunning visuals */
const NarrativeHook: React.FC = () => {
  return (
    <div className="my-40 space-y-32">
      {/* Scene 1: The Problem */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px", amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Visual */}
          <div className="relative">
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              {/* Building illustration with gradient */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 overflow-hidden">
                {/* Animated building grid */}
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="aspect-square bg-gray-300 rounded-lg"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </div>
                {/* Floating "NO SOLAR" badge */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-2xl border-4 border-white text-lg">
                    NO SOLAR ACCESS
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block mb-4 px-4 py-2 bg-gray-100 rounded-full">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">The Problem</span>
              </div>
              <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Locked out of
                <br />
                <span className="text-gray-400">solar savings</span>
              </h3>
              <div className="space-y-4 text-xl text-gray-600">
                <div className="flex items-start gap-3">
                  <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <span>No rooftop access in your apartment</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <span>Can't install panels as a renter</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <span>Miss out on 70% savings</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scene 2: The Frustration - Animated bill growing */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px", amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block mb-4 px-4 py-2 bg-red-50 rounded-full">
                <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">The Cost</span>
              </div>
              <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your bills keep
                <br />
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  climbing higher
                </span>
              </h3>
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Every month, the same story. Your electricity bill arrives, and it's higher than last time.
                </p>
                <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200">
                  <p className="text-2xl font-bold text-red-900 mb-2">
                    Meanwhile, solar owners save ₹2,000-3,000/month
                  </p>
                  <p className="text-gray-700">
                    It doesn't seem fair, does it?
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual - Animated growing bills */}
          <div className="relative order-1 md:order-2">
            <div className="relative bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-12 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, #ef4444 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
              </div>

              {/* Animated bill stack */}
              <div className="relative space-y-4">
                {[
                  { month: 'Jan', amount: 2800 },
                  { month: 'Feb', amount: 3100 },
                  { month: 'Mar', amount: 3500 },
                  { month: 'Apr', amount: 3800 },
                ].map((bill, i) => (
                  <motion.div
                    key={i}
                    className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500 font-medium">{bill.month} 2024</div>
                        <div className="text-xs text-gray-400 mt-1">Electricity Bill</div>
                      </div>
                      <motion.div
                        className="text-3xl font-bold text-red-600"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      >
                        ₹{bill.amount.toLocaleString()}
                      </motion.div>
                    </div>
                    {/* Progress bar showing increase */}
                    <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-400 to-red-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(bill.amount / 4000) * 100}%` }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trending up arrow */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-16 h-16 text-red-500" strokeWidth={3} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scene 3: The Solution - Dramatic reveal with particles */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px", amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="relative">
          {/* Gradient background with animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl overflow-hidden">
            {/* Animated particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative p-12 md:p-16 text-center text-white">
            {/* Animated sun icon */}
            <motion.div
              className="inline-block mb-8"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl" />
                <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <Sun className="w-16 h-16 text-teal-600" />
                </div>
              </div>
            </motion.div>

            <motion.h3
              className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              Until now.
            </motion.h3>

            <motion.p
              className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              Own solar panels on <strong>real farms</strong>.
              <br />
              No installation. No limits.
              <br />
              Just <strong>your panels, your earnings</strong>.
            </motion.p>

            {/* Animated stats reveal */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.7 }}
            >
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/30">
                <div className="text-sm font-semibold opacity-90 mb-1">This Month Generated</div>
                <CountingNumber end={156} className="text-4xl font-bold" suffix=" kWh" />
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-white/30" />
              
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/30">
                <div className="text-sm font-semibold opacity-90 mb-1">You Earned</div>
                <CountingNumber end={2840} className="text-4xl font-bold" prefix="₹" />
              </div>
            </motion.div>

            {/* Arrow pointing down */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block"
            >
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>See it in action</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Counting number animation component
const CountingNumber: React.FC<{ end: number; className?: string; prefix?: string; suffix?: string }> = ({ 
  end, 
  className = "", 
  prefix = "", 
  suffix = "" 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};

/* TRUST BAR */
const TrustBar: React.FC = () => {
  return (
    <div className="py-12 border-y border-gray-100 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm text-gray-500 mb-6 font-medium">TRUSTED BY</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 hover:opacity-70 transition-opacity">
          {['MSME', 'Startup India', 'NABARD', 'Clean Energy Fund'].map((partner) => (
            <div key={partner} className="text-lg font-bold text-gray-700 tracking-tight">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* THREE VALUE PROPS */
const ThreeValueProps: React.FC = () => {
  const props = [
    { 
      title: "Zero installation", 
      desc: "No panels on your roof. No permits. No hassle. Just reserve capacity online.", 
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Start in 3 minutes", 
      desc: "Browse projects, reserve panels, and start generating—all from your phone.", 
      icon: Zap,
      color: "from-teal-500 to-green-500"
    },
    { 
      title: "Track everything live", 
      desc: "Real-time dashboard shows every kWh generated and rupee earned.", 
      icon: BarChart3,
      color: "from-cyan-500 to-blue-500"
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl border border-gray-100 hover:border-teal-200 transition-all hover:shadow-lg bg-white">
                <div className={`w-14 h-14 bg-gradient-to-br ${prop.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <prop.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{prop.title}</h3>
                <p className="text-gray-600 leading-relaxed">{prop.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* COMPARISON TABLE */
const ComparisonTable: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-600 font-semibold mb-4 text-sm uppercase tracking-wider"
          >
            Why Choose Virtual
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Virtual solar vs traditional rooftop
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All the benefits of solar, none of the hassle
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Virtual Solar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-4 py-1 bg-teal-500 text-white text-xs font-bold rounded-bl-lg">
              RECOMMENDED
            </div>
            <div className="flex items-center gap-3 mb-6 mt-2">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Virtual Solar</h3>
            </div>

            <ul className="space-y-4">
              {[
                "Perfect for apartments & renters",
                "Zero installation needed",
                "Start from just ₹10,000",
                "Monitor panels 24/7 online",
                "Keep panels when you move",
                "Scale up anytime"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600 stroke-[3]" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Rooftop Solar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-md border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Rooftop Solar</h3>
            </div>

            <ul className="space-y-4">
              {[
                "Requires owned rooftop space",
                "Installation takes 3-6 months",
                "Upfront cost: ₹3-5 lakhs",
                "Tied to one property",
                "You handle maintenance",
                "Limited by roof size"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-500 stroke-[3]" />
                  </div>
                  <span className="text-gray-400 font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* HOW IT WORKS */
const HowItWorksSteps: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Browse solar projects",
      desc: "Explore active solar farms across India. Each project shows location, capacity, and availability in real-time.",
      detail: "1 credit = ₹1 offset on your power bill",
      visual: <ProjectCardsPreview />,
    },
    {
      step: "02",
      title: "Link your power provider",
      desc: "Connect your electricity account securely. We support 70+ providers across India including BESCOM, MSEDCL, and TPDDL.",
      detail: "Link multiple accounts if needed",
      visual: <PowerProviderPreview />,
    },
    {
      step: "03",
      title: "Start saving automatically",
      desc: "Your solar credits are applied when you pay bills through Renewz. Watch your electricity costs drop month after month.",
      detail: "Credits never expire—carry forward unlimited",
      visual: <BillPaymentPreview />,
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-600 font-semibold mb-4 text-sm uppercase tracking-wider"
          >
            Simple Process
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Renewz works
          </h2>
          <p className="text-xl text-gray-600 mb-8">Get started in 3 simple steps</p>
          <button className="px-8 py-3.5 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all hover:shadow-lg inline-flex items-center gap-2">
            Check Availability
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-24">
          {steps.map((item, i) => (
            <EnhancedStepRow key={i} step={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EnhancedStepRow: React.FC<{ step: any; index: number }> = ({ step, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
    >
      {/* Content */}
      <div className="flex-1">
        <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-bold text-sm mb-4">
          {step.step}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {step.title}
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          {step.desc}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700 font-semibold">
          <Check className="w-4 h-4" />
          {step.detail}
        </div>
      </div>

      {/* Visual */}
      <div className="flex-1 w-full">
        {step.visual}
      </div>
    </motion.div>
  );
};

// Project Cards Preview
const ProjectCardsPreview: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 shadow-xl border border-teal-100">
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-900 text-lg">Solar Farm Pune</h4>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Operational
          </span>
        </div>
        <div className="aspect-video bg-gradient-to-br from-teal-200 to-amber-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative group">
          <Sun className="w-16 h-16 text-teal-600 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="space-y-3 text-sm mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Location</span>
            <span className="font-semibold text-gray-900">Pune, Maharashtra</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Capacity</span>
            <span className="font-semibold text-gray-900">100 kW</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Available</span>
            <span className="font-semibold text-green-600">25 kW</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Credit Rate</span>
            <span className="font-bold text-teal-600">₹8/kWh</span>
          </div>
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
          Reserve Capacity
        </button>
      </div>
    </div>
  );
};

// Power Provider Preview
const PowerProviderPreview: React.FC = () => {
  const providers = ['BESCOM', 'TPDDL', 'BSES', 'MSEDCL', 'TNEB', 'KSEB'];
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl border border-blue-100">
      <div className="bg-white rounded-2xl p-6">
        <h4 className="font-bold text-gray-900 mb-2 text-lg">Link your provider</h4>
        <p className="text-sm text-gray-600 mb-6">Choose from 70+ power companies across India</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {providers.map((provider, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer text-center font-bold text-gray-700"
            >
              {provider}
            </motion.div>
          ))}
        </div>
        <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all hover:shadow-lg">
          Add Provider
        </button>
      </div>
    </div>
  );
};

// Bill Payment Preview
const BillPaymentPreview: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-xl border border-green-100">
      <div className="bg-white rounded-2xl p-6">
        <h4 className="font-bold text-gray-900 mb-6 text-lg">Monthly bill summary</h4>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-gray-600 font-medium">Original Bill</span>
            <span className="text-2xl font-bold text-gray-900">₹3,500</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-teal-50 rounded-xl border-2 border-teal-200">
            <span className="text-teal-700 font-semibold">Solar Credits</span>
            <span className="text-2xl font-bold text-teal-600">-₹2,840</span>
          </div>
          
          <div className="h-px bg-gray-200 my-2" />
          
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
            <span className="text-green-700 font-bold">You Pay</span>
            <span className="text-3xl font-bold text-green-600">₹660</span>
          </div>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <CreditCard className="w-5 h-5" />
          Pay Now
        </button>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-700 text-center font-semibold">
            🎉 You saved 81% this month!
          </p>
        </div>
      </div>
    </div>
  );
};

/* LIVE IMPACT */
const LiveImpactNumbers: React.FC = () => {
  const metrics = [
    { value: "50+", unit: "kW", label: "Solar Capacity", icon: Sun },
    { value: "75K", unit: "kWh", label: "Clean Energy", icon: Zap },
    { value: "₹1.6L", unit: "", label: "Earned", icon: TrendingUp },
    { value: "45", unit: "tons", label: "CO₂ Avoided", icon: Shield },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-teal-50/50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-600 font-semibold mb-4 text-sm uppercase tracking-wider"
          >
            Community Impact
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Making a real difference
          </h2>
          <p className="text-xl text-gray-600">
            Together we're building a cleaner future
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all text-center">
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {metric.value}
                  {metric.unit && <span className="text-xl text-teal-600 ml-1">{metric.unit}</span>}
                </div>
                <p className="text-gray-600 font-medium">{metric.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* TESTIMONIALS */
const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Solar ≠ Rooftops. Now I offset my apartment's power bill without installing anything. Zero hassles, zero fossils.",
      name: "Sandeep Kumar",
      role: "Software Engineer",
      location: "Bangalore",
      rating: 5,
      savings: "₹2,400/mo"
    },
    {
      quote: "Living in Mumbai, I never thought I could own solar. Now I track my 3kW generation daily. It's addictive!",
      name: "Priya Sharma",
      role: "Product Manager",
      location: "Mumbai",
      rating: 5,
      savings: "₹2,840/mo"
    },
    {
      quote: "Solar over the internet—what a concept! I'm producing clean energy miles away and my bills are 70% lower.",
      name: "Amit Patel",
      role: "Business Owner",
      location: "Ahmedabad",
      rating: 5,
      savings: "₹3,200/mo"
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-600 font-semibold mb-4 text-sm uppercase tracking-wider"
          >
            Success Stories
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by panel owners
          </h2>
          <p className="text-xl text-gray-600">
            Real people earning from virtual solar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-teal-200 hover:shadow-xl transition-all h-full flex flex-col">
                {/* Quote icon */}
                <div className="mb-4">
                  <svg className="w-10 h-10 text-teal-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-600">{t.role}</p>
                      <p className="text-xs text-gray-400 mt-1">{t.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="px-3 py-1.5 bg-teal-50 rounded-lg">
                        <p className="text-sm font-bold text-teal-700">{t.savings}</p>
                        <p className="text-xs text-teal-600">saved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 border border-green-200 rounded-full">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 border-2 border-white" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Join <strong className="text-green-700">10+ happy members</strong> earning daily
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* FAQ SECTION */
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How is this different from rooftop solar?",
      a: "Virtual solar lets you own panels on remote farms—no installation, no property requirements. Perfect for apartment dwellers and renters."
    },
    {
      q: "Do I actually own the solar panels?",
      a: "Yes! You reserve specific capacity on real solar farms. You monitor generation 24/7 and earn from every kWh produced."
    },
    {
      q: "What if I move to another city?",
      a: "Your panels stay yours. Simply update your power provider in the app and keep earning from your solar capacity."
    },
    {
      q: "How quickly do credits get applied?",
      a: "Credits are generated daily and applied automatically when you pay bills through Renewz. They never expire."
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently asked
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-teal-200 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === i ? 'rotate-90' : ''}`} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* SIMPLE CTA */
const SimpleCTA: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-br from-teal-600 to-cyan-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Ready to go solar?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/90 mb-12"
        >
          Join 10+ panel owners earning from clean energy
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/projects"
            className="group px-10 py-5 bg-white text-teal-700 rounded-xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center justify-center"
          >
            Browse Projects
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/auth/signup"
            className="px-10 py-5 bg-white/10 backdrop-blur text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
          >
            Create Account
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-white/80"
        >
          From ₹10,000 • Zero installation • Monitor 24/7
        </motion.p>
      </div>
    </section>
  );
};

export default Landing;