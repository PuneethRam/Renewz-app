'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Zap, TrendingUp, Activity, ChevronDown, X, Sparkles, Sun, Battery } from 'lucide-react';
import Link from 'next/link';

// Types
interface Project {
  id: number;
  title: string;
  location: string;
  totalCapacity: number;
  availableCapacity: number;
  costPerKw: number;
  roi: number;
  avgMonthlyUnits: number;
  payoutPerUnit: number;
  ratePerUnitInvestor: number;
  ratePerUnitHost: number;
  status: string;
  bannerUrl: string;
  subscriptions: number;
  unitsGenerated?: number;
  isLive?: boolean;
}

interface ProjectStats {
  totalProjects: number;
  totalCapacity: number;
  availableCapacity: number;
  averageROI: number;
  totalRegions: number;
  regions: string[];
}

// Custom Dropdown Component
interface DropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const CustomDropdown: React.FC<DropdownProps> = ({ label, value, options, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 text-left text-slate-900 dark:text-white shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group"
        >
          <div className="flex items-center">
            {icon && <span className="mr-3 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors">{icon}</span>}
            <span className="truncate">{selectedOption?.label}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border border-slate-200 dark:border-slate-600 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto"
              >
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                      value === option.value ? 'bg-blue-50 dark:bg-slate-700/50 text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Enhanced ProjectCard Component
interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const progressPercentage = project.totalCapacity > 0 
    ? ((project.totalCapacity - project.availableCapacity) / project.totalCapacity) * 100 
    : 0;

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, rotateY: 2 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl" />
      
      <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50">
        {/* Project Image */}
        <div className="relative h-56 overflow-hidden">
          {!imageError && project.bannerUrl ? (
            <img 
              src={project.bannerUrl} 
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
            <Zap className="w-16 h-16 text-white opacity-60" />
          </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Live badge with pulse effect */}
          {(project.isLive || project.status === 'active') && (
            <motion.div 
              className="absolute top-4 right-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse" />
                <Activity className="w-3 h-3 mr-1" />
                LIVE
              </div>
            </motion.div>
          )}

          {/* ROI Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                {Number(project.roi).toFixed(1)}% ROI
              </div>
            </div>
          </div>

          {/* Project title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.h3 
              className="text-white font-bold text-xl mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {project.title}
            </motion.h3>
            <div className="flex items-center text-white/90 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              {project.location}
            </div>
          </div>
        </div>

        {/* Project details */}
        <div className="p-6">
          {/* Capacity info with enhanced styling */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-100 dark:border-blue-800/50">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {Number(project.availableCapacity).toFixed(1)}
              </div>
              <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">kW Available</div>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-100 dark:border-green-800/50">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                ₹{Number(project.payoutPerUnit).toLocaleString()}
              </div>
              <div className="text-xs text-green-600/70 dark:text-green-400/70 font-medium">/month</div>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-100 dark:border-purple-800/50">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {Number(project.totalCapacity).toFixed(1)}
              </div>
              <div className="text-xs text-purple-600/70 dark:text-purple-400/70 font-medium">kW Total</div>
            </div>
          </div>

          {/* Enhanced Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 mb-3">
              <span className="flex items-center">
                <Battery className="w-4 h-4 mr-2 text-blue-500" />
                Investment Progress
              </span>
              <span className="font-semibold">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="relative">
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-3 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Stats with icons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 mr-3">
                <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {Number(project.unitsGenerated || project.avgMonthlyUnits || 0).toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Units Generated</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 mr-3">
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  ₹{(Number(project.payoutPerUnit) * 12).toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Annual Returns</div>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <Link href={`/projectdetails?id=${project.id}`}>
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="relative group cursor-pointer"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
    <div className="relative bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
      <span className="flex items-center justify-center">
        View Details
        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2"
        >
          →
        </motion.div>
      </span>
    </div>
  </motion.div>
</Link>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedROI, setSelectedROI] = useState('all');
  const [sortBy, setSortBy] = useState('roi');

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const roiRanges = [
    { value: 'all', label: 'All ROI Ranges' },
    { value: '10-12', label: '10-12% Returns' },
    { value: '12-15', label: '12-15% Returns' },
    { value: '15+', label: '15%+ Premium Returns' }
  ];

  const sortOptions = [
    { value: 'roi', label: 'Highest ROI First' },
    { value: 'capacity', label: 'Most Available Capacity' },
    { value: 'payout', label: 'Highest Monthly Payout' }
  ];

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        search: searchTerm,
        region: selectedRegion,
        roiRange: selectedROI,
        sortBy: sortBy
      });

      const response = await fetch(`/api/projects?${params}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch projects');
      }

      if (result.success) {
        setProjects(result.data || []);
      } else {
        throw new Error(result.error || 'Failed to fetch projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch project statistics
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/project-stats');
      const result = await response.json();

      if (response.ok && result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch projects when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProjects();
    }, 300); // Debounce API calls

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedRegion, selectedROI, sortBy]);

  // Calculate filtered stats for display
  const filteredStats = useMemo(() => {
    if (!projects.length) return { availableCapacity: 0, averageROI: 0, projectCount: 0 };

    const totalAvailable = projects.reduce((acc, p) => acc + (Number(p.availableCapacity) || 0), 0);
    const totalROI = projects.reduce((acc, p) => acc + (Number(p.roi) || 0), 0);
    const avgROI = projects.length > 0 ? totalROI / projects.length : 0;

    return {
      availableCapacity: totalAvailable,
      averageROI: avgROI,
      projectCount: projects.length
    };
  }, [projects]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Sun className="w-full h-full text-blue-600" />
          </motion.div>
          <p className="text-slate-600 dark:text-slate-300 font-medium">Loading Solar Projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-full border border-blue-200 dark:border-blue-700/50">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Premium Solar Investments</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6">
            Explore Solar Projects
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover profitable solar investments across India. Start earning monthly returns from 
            <span className="text-green-600 font-semibold"> clean energy</span> with guaranteed ROI.
          </p>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Enhanced Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Search Projects
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              {/* Custom Dropdowns */}
              <CustomDropdown
                label="Region"
                value={selectedRegion}
                options={[
                  { value: 'all', label: 'All Regions' },
                  ...(stats?.regions?.map(region => ({ value: region, label: region })) || [])
                ]}
                onChange={setSelectedRegion}
                icon={<MapPin className="w-4 h-4" />}
              />

              <CustomDropdown
                label="ROI Range"
                value={selectedROI}
                options={roiRanges}
                onChange={setSelectedROI}
                icon={<TrendingUp className="w-4 h-4" />}
              />

              <CustomDropdown
                label="Sort By"
                value={sortBy}
                options={sortOptions}
                onChange={setSortBy}
                icon={<Filter className="w-4 h-4" />}
              />
            </div>
          </div>
        </motion.div>

        {/* Enhanced Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl" />
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
                  <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {Number(filteredStats.availableCapacity).toFixed(0)} kW
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium">Available Capacity</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl" />
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                  <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {Number(filteredStats.averageROI).toFixed(1)}%
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium">Average ROI</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl" />
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-6 h-6 text-blue-500" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {filteredStats.projectCount}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium">Active Projects</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Results Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="w-16 h-16 mb-6"
              >
                <Sun className="w-full h-full text-blue-600" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Loading Amazing Projects...
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Finding the best solar investments for you
                </p>
              </motion.div>
            </div>
          ) : error ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto backdrop-blur-sm">
                <div className="w-16 h-16 mx-auto mb-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <X className="w-full h-full text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">
                  Oops! Something went wrong
                </h3>
                <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchProjects}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          ) : projects.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50"
              >
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {projects.length} Premium Projects Found
                  </h2>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Filter className="w-4 h-4 mr-2" />
                    <span>Sorted by {sortBy === 'roi' ? 'ROI' : sortBy === 'capacity' ? 'Available Capacity' : 'Monthly Payout'}</span>
                  </div>
                </div>
                <motion.div
                  
                  className="mt-4 sm:mt-0"
                >
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full border border-green-200 dark:border-green-700/50">
                    <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                      Verified Projects
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                  />
                ))}
              </div>

              {/* Call to Action Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 text-center"
              >
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
                  {/* Background effects */}
                  <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        animate={{
                          x: [0, 100, 0],
                          y: [0, -50, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 4 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Ready to Start Your Solar Journey?
                    </h3>
                    <p className="text-lg mb-6 opacity-90">
                      Join thousands of investors earning monthly returns from clean energy
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get Started Today
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-20 h-20 mx-auto mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-full"
                >
                  <Filter className="w-full h-full text-slate-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  No projects match your criteria
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Try adjusting your search filters or explore different regions to discover amazing solar investment opportunities.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedRegion('all');
                    setSelectedROI('all');
                    setSortBy('roi');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  Reset Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;