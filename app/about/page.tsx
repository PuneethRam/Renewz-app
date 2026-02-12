'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Sun, 
  Heart, 
  Users, 
  Zap,
  TrendingUp,
  Leaf,
  ArrowRight,
  Sparkles,
  Shield,
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Mission />
      <Story />
      <Values />
      <Impact />
      <Team />
      <CTA />
    </div>
  );
};

/* HERO SECTION */
const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 px-6 bg-gradient-to-b from-teal-50 via-cyan-50/30 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
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

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span className="text-teal-700 font-semibold text-sm">About Renewz</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Making solar accessible
          <br />
          <span className="bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            for everyone
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          We&apos;re democratizing clean energy by letting anyone own solar panels without the hassle of installation
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-12 mt-12"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">2024</div>
            <div className="text-gray-600 font-medium">Founded</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">10+</div>
            <div className="text-gray-600 font-medium">Panel Owners</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">50+ kW</div>
            <div className="text-gray-600 font-medium">Capacity</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">45T</div>
            <div className="text-gray-600 font-medium">CO₂ Saved</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* MISSION & VISION */
const Mission: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Our <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Commitment</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 rounded-3xl p-10 text-white relative overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="inline-block mb-4">
                  <div className="text-sm font-bold tracking-widest uppercase opacity-90">Mission</div>
                </div>
                <p className="text-xl leading-relaxed font-medium">
                  To install zero-cost solar on institutional and commercial rooftops, convert generation into virtual energy credits, and enable households to offset bills or trade power transparently through a digital marketplace.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-3xl p-10 text-white relative overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="inline-block mb-4">
                  <div className="text-sm font-bold tracking-widest uppercase opacity-90">Vision</div>
                </div>
                <p className="text-xl leading-relaxed font-medium">
                  To build India&apos;s largest decentralized clean-energy network where every individual and institution can generate, share, and benefit from solar power — regardless of rooftop, location, or income.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* THE STORY */
const Story: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-teal-50 rounded-full mb-4">
            <span className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Our Story</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why we started Renewz
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* The Problem - Natural storytelling */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Most Indians live in apartments or rented homes. They watch electricity bills climb every month—₹3,000, ₹4,000, sometimes ₹5,000—while solar panel owners with rooftops are cutting their bills by 70%.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              The gap felt unfair. Installing solar panels costs ₹70,000-₹1,00,000 per kW upfront, and without a rooftop, it&apos;s simply impossible. Meanwhile, thousands of commercial buildings have empty roofs gathering dust.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We asked ourselves: <strong className="text-teal-600">What if we could connect these two worlds?</strong>
            </p>
          </div>

          {/* How It Works - Simple explanation */}
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-6">Here&apos;s what we built</h3>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                We install solar panels on commercial and institutional rooftops at <strong>zero cost</strong> to the building owners. They earn lease income, and we own the infrastructure.
              </p>
              <p>
                Then, anyone—whether you live in an apartment, rent a home, or just don&apos;t have rooftop access—can <strong>reserve virtual solar capacity</strong>. You own 1 kW, 2 kW, or however much you need.
              </p>
              <p>
                Every month, you earn energy credits based on what your panels generate. Use those credits to offset your electricity bill, or sell them to others on our peer-to-peer marketplace at better rates than the grid.
              </p>
              <p className="text-2xl font-bold pt-4 border-t border-white/30">
                Virtual solar for real savings. That&apos;s Renewz.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* VALUES */
const Values: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Heart,
      title: "People First",
      description: "We put our users at the heart of everything we do, making solar accessible and affordable for all.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Complete visibility into your solar generation, earnings, and environmental impact. No hidden fees.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to accelerating India's transition to clean energy and reducing carbon emissions.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously improving our platform to make virtual solar ownership simpler and more rewarding.",
      color: "from-amber-500 to-orange-500"
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-teal-50 rounded-full mb-4">
            <span className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Our Values</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What we stand for
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These principles guide every decision we make
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-teal-200 hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* IMPACT METRICS */
const Impact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-teal-50 rounded-full mb-4">
            <span className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our community impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real numbers, real change
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Sun, value: "50+", unit: "kW", label: "Solar Capacity", color: "from-amber-500 to-orange-500" },
            { icon: TrendingUp, value: "₹1.6L", unit: "", label: "Earnings Generated", color: "from-teal-500 to-cyan-500" },
            { icon: Leaf, value: "45", unit: "tons", label: "CO₂ Avoided", color: "from-green-500 to-emerald-500" },
          ].map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all"
            >
              <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <metric.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {metric.value}
                {metric.unit && <span className="text-2xl text-teal-600 ml-1">{metric.unit}</span>}
              </div>
              <div className="text-gray-600 font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* TEAM SECTION */
const Team: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const founders = [
    { 
      name: "Puneeth Ram P", 
      role: "Co-Founder & CEO", 
      expertise: "Clean Energy & Strategy",
      gradient: "from-teal-400 to-cyan-500"
    },
    { 
      name: "Sunil B", 
      role: "Co-Founder & CTO", 
      expertise: "Technology & Innovation",
      gradient: "from-blue-400 to-sky-500"
    },
    { 
      name: "Yashwant B", 
      role: "Co-Founder & COO", 
      expertise: "Operations & Growth",
      gradient: "from-cyan-400 to-teal-500"
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-teal-50 rounded-full mb-4">
            <span className="text-sm font-semibold text-teal-700 uppercase tracking-wider">The Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet the founders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three visionaries on a mission to democratize clean energy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {founders.map((founder, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <div className={`w-full aspect-square bg-gradient-to-br ${founder.gradient} group-hover:scale-110 transition-transform duration-500`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="w-24 h-24 text-white/80" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-teal-600 font-semibold mb-2">{founder.role}</p>
                <p className="text-sm text-gray-600">{founder.expertise}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Phone</div>
                  <div className="text-gray-900 font-semibold">+91 7358241952</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Email</div>
                  <div className="text-gray-900 font-semibold">puneethram.p@renewz.in</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Address</div>
                  <div className="text-gray-900 font-semibold">No. 67/1, 8th Street, Baba Nagar</div>
                  <div className="text-gray-600 text-sm">Villivakkam, Chennai 600049</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* CTA SECTION */
const CTA: React.FC = () => {
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
          Join the solar revolution
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/90 mb-12"
        >
          Be part of the movement making clean energy accessible to everyone
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/projects"
            className="group px-10 py-5 bg-white text-teal-700 rounded-xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center justify-center"
          >
            Browse Projects
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/calculator"
            className="px-10 py-5 bg-white/10 backdrop-blur text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
          >
            Calculate Savings
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;