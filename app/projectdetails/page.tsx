'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  MapPin, 
  Zap, 
  TrendingUp, 
  Activity, 
  Building,
  Award,
  ArrowLeft,
  Loader2,
  Sun,
  Battery,
  Users,
  Calendar,
  CheckCircle,
  X
} from 'lucide-react';

// Types
interface ProjectDetails {
  id: number;
  title: string;
  location: string;
  totalCapacity: number;
  availableCapacity: number;
  costPerKw: number;
  ratePerUnitInvestor: number;
  ratePerUnitHost: number;
  status: string;
  bannerUrl: string;
  roi: number;
  subscriptions: number;
  totalSubscribedKw: number;
  unitsGenerated: number;
  avgDailyGeneration: number;
  isLive: boolean;
  createdAt: string;
  hostInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    type: string;
    established: string;
  };
}

// Investment Calculator Component
interface InvestmentCalculatorProps {
  costPerKw: number;
  ratePerUnitInvestor: number;
  roi: number;
  minKW: number;
  maxKW: number;
  projectId: number;
  onInvestmentSuccess: () => void;
}

// Confirmation Modal Component
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  investment: number;
  totalCost: number;
  monthlyPayout: number;
  projectTitle: string;
  loading: boolean;
}

// Success Modal Component
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  investment: number;
  totalCost: number;
  monthlyPayout: number;
  projectTitle: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  investment,
  totalCost,
  monthlyPayout,
  projectTitle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl border border-white/20 dark:border-slate-700/50"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-full"
          >
            <CheckCircle className="w-full h-full text-green-600 dark:text-green-400" />
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-slate-900 dark:text-white mb-2"
          >
            Investment Application Successful!
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 dark:text-slate-300 mb-6"
          >
            You have successfully applied to invest in &quot;{projectTitle}&quot;. Your application is being processed.
          </motion.p>


          {/* Investment Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6 text-left"
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Investment Amount:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{investment} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total Cost:</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Expected Monthly Returns:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">₹{monthlyPayout.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 rounded-lg transition-colors duration-200 font-medium"
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  investment,
  totalCost,
  monthlyPayout,
  projectTitle,
  loading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl border border-white/20 dark:border-slate-700/50"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          disabled={loading}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
            <TrendingUp className="w-full h-full text-green-600 dark:text-green-400" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Confirm Investment
          </h3>
          
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            You are applying to invest in &quot;{projectTitle}&quot;. Are you sure you want to proceed?
          </p>


          {/* Investment Details */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6 text-left">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Investment Amount:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{investment} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total Cost:</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Expected Monthly Returns:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">₹{monthlyPayout.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Confirm Investment'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({
  costPerKw,
  ratePerUnitInvestor,
  minKW,
  maxKW,
  projectId,
  onInvestmentSuccess
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [investment, setInvestment] = useState(minKW);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const totalCost = investment * costPerKw;
  const monthlyUnits = investment * 120; // Assuming 120 units per kW per month
  const monthlyPayout = monthlyUnits * ratePerUnitInvestor;

  const handleInvestClick = () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      router.push('/auth/login');
      return;
    }
    
    setError(null);
    setShowConfirmation(true);
  };

  const handleConfirmInvestment = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/invest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.uid,
          project_id: projectId,
          subscribed_kw: investment,
          amount_paid: totalCost
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Investment failed');
      }

      setShowConfirmation(false);
      setShowSuccess(true);
      
      // Call the success callback without refreshing
      onInvestmentSuccess();

    } catch (err) {
      console.error('Investment error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
          Investment Calculator
        </h3>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Investment Amount Slider */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Investment Amount: {investment} kW
            </label>
            <input
              type="range"
              min={minKW}
              max={maxKW}
              step={0.1}
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span>{minKW} kW</span>
              <span>{maxKW} kW</span>
            </div>
          </div>

          {/* Investment Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-100 dark:border-blue-800/50">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                ₹{totalCost.toLocaleString()}
              </div>
              <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">Total Investment</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-100 dark:border-green-800/50">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {monthlyUnits.toLocaleString()}
              </div>
              <div className="text-xs text-green-600/70 dark:text-green-400/70 font-medium">Average units/month</div>
            </div>
          </div>

          {/* Monthly Returns */}
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl border border-yellow-100 dark:border-yellow-800/50">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              ₹{monthlyPayout.toLocaleString()}
            </div>
            <div className="text-sm text-yellow-600/70 dark:text-yellow-400/70 font-medium">
             Average Monthly returns
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleInvestClick}
            disabled={loading || maxKW <= 0}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!user ? (
              'Login to Invest'
            ) : loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Processing...
              </span>
            ) : maxKW <= 0 ? (
              'No Capacity Available'
            ) : (
              `Invest ₹${totalCost.toLocaleString()}`
            )}
          </motion.button>

          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            * Returns are estimates based on average generation
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmInvestment}
        investment={investment}
        totalCost={totalCost}
        monthlyPayout={monthlyPayout}
        projectTitle={`Project ${projectId}`}
        loading={loading}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        investment={investment}
        totalCost={totalCost}
        monthlyPayout={monthlyPayout}
        projectTitle={`Project ${projectId}`}
      />
    </>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-4"
      >
        <Sun className="w-full h-full text-blue-600" />
      </motion.div>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Loading Project Details...
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Fetching the latest information
        </p>
      </motion.div>
    </div>
  </div>
);

// Main Component that uses search params
const ProjectDetailContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('about');

  const projectId = searchParams.get('id');

  // Fetch project details
  const fetchProjectDetails = async () => {
    if (!projectId) {
      setError('Project ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/project-details?id=${projectId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch project details');
      }

      if (result.success) {
        setProject(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch project details');
      }
    } catch (err) {
      console.error('Error fetching project details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInvestmentSuccess = () => {
    // Just a placeholder - no longer refreshes the page
    console.log('Investment successful, but not refreshing page');
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
            <Zap className="w-full h-full text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Project Not Found
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            {error || 'The project you are looking for does not exist.'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/projects')}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Back to Projects
          </motion.button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About Project', icon: Building },
    { id: 'host', label: 'Host Information', icon: Award }
  ];

  const progressPercentage = project.totalCapacity > 0 
    ? (project.totalSubscribedKw / project.totalCapacity) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
      </div>

      {/* Back Button */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/projects')}
          className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white mb-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </motion.button>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 rounded-2xl overflow-hidden mb-8"
        >
          {project.bannerUrl ? (
            <img 
              src={project.bannerUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
              <Zap className="w-24 h-24 text-white opacity-60" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Project Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center mb-4">
              {project.isLive && (
                <div className="flex items-center bg-green-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mr-4">
                  <Activity className="w-4 h-4 mr-2 animate-pulse" />
                  Live Generation
                </div>
              )}
              <div className="flex items-center text-white/90">
                <MapPin className="w-4 h-4 mr-2" />
                {project.location}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {project.title}
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {project.availableCapacity.toFixed(1)} kW
                </div>
                <div className="text-white/80 text-sm">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  ₹{project.ratePerUnitInvestor}
                </div>
                <div className="text-white/80 text-sm">Per Unit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {project.roi}%
                </div>
                <div className="text-white/80 text-sm">ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {project.unitsGenerated.toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">Units Generated</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                Project Statistics
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-100 dark:border-green-800/50">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {(project.unitsGenerated / 1000).toFixed(1)}k
                  </div>
                  <div className="text-sm text-green-600/70 dark:text-green-400/70 font-medium">
                    Total Units
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-100 dark:border-blue-800/50">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {project.totalCapacity}
                  </div>
                  <div className="text-sm text-blue-600/70 dark:text-blue-400/70 font-medium">
                    Total kW
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl border border-yellow-100 dark:border-yellow-800/50">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                    {progressPercentage.toFixed(0)}%
                  </div>
                  <div className="text-sm text-yellow-600/70 dark:text-yellow-400/70 font-medium">
                    Subscribed
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-100 dark:border-purple-800/50">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {project.subscriptions}
                  </div>
                  <div className="text-sm text-purple-600/70 dark:text-purple-400/70 font-medium">
                    Investors
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
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
                      transition={{ duration: 1.5, delay: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 dark:border-slate-700/50"
            >
              {/* Tab Headers */}
              <div className="flex border-b border-slate-200 dark:border-slate-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'text-green-600 border-b-2 border-green-600 bg-green-50 dark:bg-green-900/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Project Overview
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      This solar project is strategically located in {project.location} with a total capacity of {project.totalCapacity} kW. 
                      The project offers competitive returns with a {project.roi}% ROI and is designed to provide clean, sustainable energy 
                      while generating consistent returns for investors.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                          Technical Specifications
                        </h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• Total Capacity: {project.totalCapacity} kW</li>
                          <li>• Available for Investment: {project.availableCapacity.toFixed(1)} kW</li>
                          <li>• Expected Annual Generation: {(project.totalCapacity * 1200).toLocaleString()} kWh</li>
                          <li>• Technology: Monocrystalline Silicon</li>
                          <li>• Status: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                          Investment Details
                        </h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• Cost per kW: ₹{project.costPerKw.toLocaleString()}</li>
                          <li>• Minimum Investment: 0.5 kW</li>
                          <li>• Maximum Investment: 10 kW</li>
                          <li>• Payout Schedule: Monthly</li>
                          <li>• Contract Duration: 25 years</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'host' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                      Host Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                          Host Details
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Host Name:</span>
                            <span className="ml-2 font-medium text-slate-900 dark:text-white">
                              {project.hostInfo.name}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Installation Type:</span>
                            <span className="ml-2 font-medium text-slate-900 dark:text-white">
                              {project.hostInfo.type}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Established:</span>
                            <span className="ml-2 font-medium text-slate-900 dark:text-white">
                              {project.hostInfo.established}
                            </span>
                          </div>
                          {project.hostInfo.phone && (
                            <div>
                              <span className="text-slate-600 dark:text-slate-400">Contact:</span>
                              <span className="ml-2 font-medium text-slate-900 dark:text-white">
                                {project.hostInfo.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                          Certifications & Compliance
                        </h4>
                        <div className="space-y-2 text-slate-600 dark:text-slate-300">
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-green-600 mr-2" />
                            ISO 14001 Environmental Management
                          </div>
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-green-600 mr-2" />
                            MNRE Approved Vendor
                          </div>
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-green-600 mr-2" />
                            IEC 61215 Module Certification
                          </div>
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-green-600 mr-2" />
                            Grid Connected Solar PV System
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                      <h5 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Project Timeline
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">Project Start</div>
                            <div className="text-slate-600 dark:text-slate-400">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 text-green-600 mr-2" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">Current Status</div>
                            <div className="text-slate-600 dark:text-slate-400 capitalize">
                              {project.status}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-purple-600 mr-2" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">Investors</div>
                            <div className="text-slate-600 dark:text-slate-400">
                              {project.subscriptions} Active
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Investment Calculator */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <InvestmentCalculator
                costPerKw={project.costPerKw}
                ratePerUnitInvestor={project.ratePerUnitInvestor}
                roi={project.roi}
                minKW={0.5}
                maxKW={Math.min(10, project.availableCapacity)}
                projectId={project.id}
                onInvestmentSuccess={handleInvestmentSuccess}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main exported component with Suspense wrapper
const ProjectDetails: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectDetailContent />
    </Suspense>
  );
};

export default ProjectDetails;