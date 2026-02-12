'use client';
import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Zap, 
  IndianRupee, 
  Sun, 
  ArrowRight,
  TrendingUp,
  Leaf,
  Sparkles,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';

const SavingsEstimator = () => {
  const [monthlySavings, setMonthlySavings] = useState<string>('');
  const [results, setResults] = useState({
    capacity: 0,
    investment: 0,
    monthlyCredits: 0
  });

  // Calculation logic
  useEffect(() => {
    const savings = parseFloat(monthlySavings) || 0;
    if (savings > 0) {
      // Formula: ₹6.5 per unit, 120 units/month per kW, ₹55,000 per kW
      const unitsNeeded = savings / 6.5;
      const capacityKW = unitsNeeded / 120;
      const investmentAmount = capacityKW * 55000;
      
      setResults({
        capacity: Math.round(capacityKW * 10) / 10,
        investment: Math.round(investmentAmount),
        monthlyCredits: Math.round(unitsNeeded)
      });
    } else {
      setResults({ capacity: 0, investment: 0, monthlyCredits: 0 });
    }
  }, [monthlySavings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setMonthlySavings(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Calculate Your{' '}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Solar Savings
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Enter your desired monthly savings and see exactly how much solar capacity you need—and what you&apos;ll earn
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 mb-8 border border-gray-100"
        >
          {/* Input Section */}
          <div className="mb-12">
            <label className="block text-xl font-bold text-gray-900 mb-6 text-center">
              How much do you want to save per month?
            </label>
            <div className="relative max-w-md mx-auto">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
                <IndianRupee className="h-7 w-7 text-teal-600" />
              </div>
              <input
                type="text"
                value={monthlySavings}
                onChange={handleInputChange}
                placeholder="2500"
                className="w-full pl-16 pr-6 py-7 text-3xl font-bold text-center border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none transition-all"
              />
            </div>
            <p className="text-center text-gray-500 mt-3 font-medium">Enter your target monthly savings</p>
          </div>

          {/* Results Section */}
          {monthlySavings && results.capacity > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-teal-700">Your Personalized Plan</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Here&apos;s what you need</h2>
                <p className="text-gray-600">To save ₹{monthlySavings} every month</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Solar Capacity */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center border-2 border-amber-200 hover:border-amber-300 transition-all hover:shadow-lg"
                >
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Sun className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                    {results.capacity}
                    <span className="text-2xl text-amber-600 ml-1">kW</span>
                  </div>
                  <div className="text-amber-700 font-bold mb-1">Solar Capacity</div>
                  <div className="text-sm text-gray-600">Recommended system size</div>
                </motion.div>

                {/* Investment */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 text-center border-2 border-teal-200 hover:border-teal-300 transition-all hover:shadow-lg"
                >
                  <div className="bg-gradient-to-br from-teal-600 to-cyan-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                    ₹{(results.investment / 1000).toFixed(0)}K
                  </div>
                  <div className="text-teal-700 font-bold mb-1">Investment</div>
                  <div className="text-sm text-gray-600">One-time setup cost</div>
                </motion.div>

                {/* Monthly Credits */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 text-center border-2 border-blue-200 hover:border-blue-300 transition-all hover:shadow-lg"
                >
                  <div className="bg-gradient-to-br from-blue-600 to-sky-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                    {results.monthlyCredits}
                  </div>
                  <div className="text-blue-700 font-bold mb-1">Monthly Units</div>
                  <div className="text-sm text-gray-600">Credits generated</div>
                </motion.div>
              </div>

              {/* ROI Timeline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm font-semibold opacity-90 mb-1">Return on Investment</div>
                      <div className="text-4xl font-bold">
                        {Math.round(results.investment / parseFloat(monthlySavings))} months
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold opacity-90 mb-1">Annual Savings</div>
                      <div className="text-4xl font-bold">
                        ₹{(parseFloat(monthlySavings) * 12).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="bg-white h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                  <p className="text-sm opacity-90 mt-3">
                    Your investment pays for itself in under {Math.ceil(results.investment / parseFloat(monthlySavings) / 12)} years
                  </p>
                </div>
              </motion.div>

              {/* Environmental Impact */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-3">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Environmental Impact</span>
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="p-4 bg-white rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {Math.round(results.capacity * 1.2 * 12).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">kg CO₂ saved yearly</div>
                  </div>
                  <div className="p-4 bg-white rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {Math.round(results.monthlyCredits * 12).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">kWh clean energy/year</div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center pt-8 border-t border-gray-200"
              >
                <button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-12 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto group">
                  Reserve Your Solar Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>No installation hassle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Start earning day 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>24/7 monitoring</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Empty State */}
          {!monthlySavings && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Calculator className="h-14 w-14 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                Enter your target monthly savings above to see your personalized solar plan with ROI breakdown
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
                <span>Popular: ₹2,000</span>
                <span>•</span>
                <span>₹3,000</span>
                <span>•</span>
                <span>₹5,000</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-2 bg-teal-50 rounded-full mb-3">
              <span className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Calculation Method</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">How we calculate</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-teal-700 font-bold text-xl">₹6.5</span>
              </div>
              <div className="font-bold text-gray-900 text-lg mb-2">Per Unit Rate</div>
              <div className="text-sm text-gray-600">Average electricity cost in India</div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-amber-700 font-bold text-xl">120</span>
              </div>
              <div className="font-bold text-gray-900 text-lg mb-2">Units per kW</div>
              <div className="text-sm text-gray-600">Average monthly generation</div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-blue-700 font-bold text-xl">₹55K</span>
              </div>
              <div className="font-bold text-gray-900 text-lg mb-2">Cost per kW</div>
              <div className="text-sm text-gray-600">All-inclusive setup investment</div>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-10 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Why Renewz?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold">10+</div>
              <div className="text-sm opacity-90">Happy Panel Owners</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">₹1.6L</div>
              <div className="text-sm opacity-90">Total Earnings Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">45T</div>
              <div className="text-sm opacity-90">CO₂ Avoided</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SavingsEstimator;