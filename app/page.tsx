"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Leaf, 
  ChevronRight,
  Star,
  Users,
  Zap
} from 'lucide-react';

const Landing: React.FC = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Investing with Renewz has been amazing. I'm earning ₹2,500 monthly from just 3kW!",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Amit Patel",
      location: "Ahmedabad", 
      rating: 5,
      text: "Transparent platform, steady returns, and I'm contributing to clean energy. Perfect!",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Rajesh Kumar",
      location: "Bangalore",
      rating: 5,
      text: "14% ROI with zero maintenance. Best investment decision I've made in years.",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  const partners = [
    { name: "MSME", logo: "MSME" },
    { name: "Startup India", logo: "STARTUP" },
    { name: "SEBI", logo: "SEBI" },
    { name: "Clean Energy", logo: "CLEAN" }
  ];

  const stats = [
    { value: "₹20L+", label: "Invested", icon: TrendingUp },
    { value: "10+", label: "Investors", icon: Users },
    { value: "50KW", label: "Solar Capacity", icon: Zap },
    { value: "15%", label: "Avg. Returns", icon: Star }
  ];

  return (
    <div className="w-full">
      {/* Hero Section - Full Screen with proper mobile spacing */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Solar panels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Invest in the sun.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500">
                Earn every month.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Own virtual solar panel shares, earn guaranteed monthly returns, 
              and power India&apos;s renewable energy future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/projects" className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                Explore Projects
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 text-lg">
                Watch Demo
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <ChevronRight className="w-6 h-6 rotate-90" />
        </motion.div>
      </section>

      {/* USP Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Renewz?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We make solar investing simple, transparent, and profitable for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Zero Maintenance",
                description: "We handle everything - installation, maintenance, monitoring. You just earn.",
                color: "text-blue-600"
              },
              {
                icon: TrendingUp,
                title: "Steady Income",
                description: "Earn monthly payouts based on actual solar generation. Average 12-15% ROI.",
                color: "text-green-600"
              },
              {
                icon: Leaf,
                title: "Eco Impact",
                description: "Every kW you invest prevents 1.5 tons of CO2 annually. Profit with purpose.",
                color: "text-green-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-6 ${feature.color} bg-opacity-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Investors Say
            </h2>
            <p className="text-xl text-slate-600">
              Join thousands of satisfied investors earning from solar energy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 italic">
                  &quot;{testimonial.text}&quot;
                </p>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-lg font-semibold text-slate-600 mb-8">
              Trusted by leading organizations
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center h-16 px-8 bg-slate-100 rounded-lg"
                >
                  <span className="font-bold text-slate-700">
                    {partner.logo}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-green-600 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Solar Investment Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of investors earning steady returns from clean energy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/projects" 
                className="bg-white text-green-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Investing
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 font-medium px-8 py-4 rounded-lg transition-all duration-200"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;