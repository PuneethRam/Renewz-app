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
  Home
} from 'lucide-react';

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
      // Formula: ₹6 per unit, 1 kW = 120 units/month, ₹50,000 per kW
      const unitsNeeded = savings / 6.5; // ₹6 per unit
      const capacityKW = unitsNeeded / 120; // 120 units per kW per month
      const investmentAmount = capacityKW * 55000; // ₹50,000 per kW
      
      setResults({
        capacity: Math.round(capacityKW * 10) / 10, // Round to 1 decimal
        investment: Math.round(investmentAmount), // Convert to lakhs, 1 decimal
        monthlyCredits: Math.round(unitsNeeded)
      });
    } else {
      setResults({ capacity: 0, investment: 0, monthlyCredits: 0 });
    }
  }, [monthlySavings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setMonthlySavings(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-xl">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Renewz</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </a>
              <a href="#" className="text-emerald-600 font-medium">Savings Calculator</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calculator className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How Much Can You{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Save?
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your desired monthly savings to see your recommended solar capacity and investment details
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-8">
          {/* Input Section */}
          <div className="mb-12">
            <label className="block text-lg font-semibold text-gray-900 mb-4 text-center">
              How much do you want to save per month?
            </label>
            <div className="relative max-w-md mx-auto">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <IndianRupee className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={monthlySavings}
                onChange={handleInputChange}
                placeholder="2500"
                className="w-full pl-12 pr-6 py-6 text-2xl font-bold text-center border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none transition-all"
              />
            </div>
            <p className="text-center text-gray-500 mt-2">Enter amount in rupees</p>
          </div>

          {/* Results Section */}
          {monthlySavings && results.capacity > 0 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Solar Plan</h2>
                <p className="text-gray-600">Based on ₹{monthlySavings} monthly savings target</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Solar Capacity */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 text-center border border-yellow-100">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sun className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {results.capacity} kW
                  </div>
                  <div className="text-yellow-700 font-semibold mb-1">Recommended Capacity</div>
                  <div className="text-sm text-gray-600">Solar panel system size</div>
                </div>

                {/* Investment */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 text-center border border-emerald-100">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    ₹{results.investment.toLocaleString("en-IN")}
                  </div>
                  <div className="text-emerald-700 font-semibold mb-1">Total Investment</div>
                  <div className="text-sm text-gray-600">One-time setup cost</div>
                </div>

                {/* Monthly Credits */}
                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 text-center border border-blue-100">
                  <div className="bg-gradient-to-r from-blue-500 to-sky-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {results.monthlyCredits}
                  </div>
                  <div className="text-blue-700 font-semibold mb-1">Monthly Credits</div>
                  <div className="text-sm text-gray-600">Units per month</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mt-8">
                <div className="flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
                  <span className="font-semibold text-gray-900">Environmental Impact</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(results.capacity * 1.2 * 12)} kg
                    </div>
                    <div className="text-sm text-gray-600">CO₂ saved annually</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(results.monthlyCredits * 12)}
                    </div>
                    <div className="text-sm text-gray-600">Units generated yearly</div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center pt-8">
                <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto group">
                  Reserve My Slot
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-gray-500 mt-4 text-sm">
                  Join 2,000+ people already saving with solar
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!monthlySavings && (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calculator className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                Enter your desired monthly savings to see your personalized solar plan
              </p>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How We Calculate</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-emerald-600 font-bold">₹6</span>
              </div>
              <div className="font-semibold text-gray-900">Per Unit Rate</div>
              <div className="text-sm text-gray-600">Average electricity cost</div>
            </div>
            <div className="space-y-2">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-yellow-600 font-bold">120</span>
              </div>
              <div className="font-semibold text-gray-900">Units per kW</div>
              <div className="text-sm text-gray-600">Monthly generation</div>
            </div>
            <div className="space-y-2">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">50K</span>
              </div>
              <div className="font-semibold text-gray-900">Cost per kW</div>
              <div className="text-sm text-gray-600">Setup investment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsEstimator;