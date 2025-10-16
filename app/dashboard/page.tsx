'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, TrendingUp, Zap, DollarSign, MapPin, Eye, ArrowRight, Activity } from 'lucide-react';

// Firebase imports using your existing AuthContext
import { useAuth } from '@/context/AuthContext';

// Types
interface Project {
  id: number;
  title: string;
  location: string;
  total_capacity_kw: number;
  cost_per_kw: number;
  rate_per_unit_investor: number;
  rate_per_unit_host: number;
  status: 'upcoming' | 'active' | 'closed';
  banner_url: string;
}

interface Subscription {
  id: number;
  user_id: number;
  project_id: number;
  subscribed_kw: number;
  amount_paid: number;
  start_date: string;
  status: 'applied' | 'approved' | 'active' | 'over';
  project: Project;
}

interface PayoutData {
  id: number;
  payout_month: string;
  units_generated_kwh: number;
  payout_amount: number;
  status: 'pending' | 'paid';
}

interface GenerationData {
  date: string;
  units_generated_kwh: number;
}

interface SubscriptionDetail extends Subscription {
  payouts: PayoutData[];
  generationData: GenerationData[];
  avgMonthlyGeneration: number;
  avgMonthlyPayout: number;
  lastMonthPayout: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSubscriptions(user.uid);
    } else {
      setSubscriptions([]);
      setLoading(false);
    }
  }, [user]);

  const fetchSubscriptions = async (userId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/subscriptions?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }
      
      const data = await response.json();
      setSubscriptions(data.subscriptions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptionDetails = async (subscriptionId: number) => {
    try {
      setDetailLoading(true);
      const response = await fetch(`/api/subscription-details?subscriptionId=${subscriptionId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscription details');
      }
      
      const data = await response.json();
      setSelectedSubscription(data);
    } catch (err) {
      console.error('Error fetching subscription details:', err);
      setError(err instanceof Error ? err.message : 'Failed to load details');
    } finally {
      setDetailLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'approved': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'over': return 'bg-slate-50 text-slate-600 border-slate-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-orange-500 text-white';
      case 'active': return 'bg-emerald-500 text-white';
      case 'closed': return 'bg-slate-500 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-base">Sign in to access your solar dashboard</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Button className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium shadow-md" onClick={() => window.location.href = '/signin'}>
              Sign In to Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-slate-200 rounded-lg w-64"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="h-4 bg-slate-200 rounded w-24 mb-3"></div>
                  <div className="h-8 bg-slate-200 rounded w-32"></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="h-48 bg-slate-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Activity className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-red-600 text-center">Something went wrong</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600 text-center text-sm">{error}</p>
            <Button onClick={() => fetchSubscriptions(user.uid)} className="w-full bg-slate-900 hover:bg-slate-800">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">My Solar Portfolio</h1>
            <p className="text-slate-600">Track your renewable energy investments</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-amber-500 to-orange-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium mb-1">Total Subscriptions</p>
                  <p className="text-4xl font-bold">{subscriptions.length}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Zap className="h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">Total Capacity</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {subscriptions.reduce((sum, sub) => sum + sub.subscribed_kw, 0).toFixed(1)}
                    <span className="text-lg font-normal text-slate-600 ml-1">kW</span>
                  </p>
                </div>
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-7 w-7 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">Active Projects</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {subscriptions.filter(sub => sub.status === 'active').length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Calendar className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">Total Investment</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(subscriptions.reduce((sum, sub) => sum + sub.amount_paid, 0))}
                  </p>
                </div>
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <DollarSign className="h-7 w-7 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions List */}
        {subscriptions.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">No Subscriptions Yet</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">Start your renewable energy journey by subscribing to your first solar project</p>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-11 px-8 shadow-md">
                Browse Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Your Subscriptions</h2>
              <span className="text-sm text-slate-600">{subscriptions.length} {subscriptions.length === 1 ? 'project' : 'projects'}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-amber-400 to-orange-500 relative overflow-hidden">
                    {subscription.project.banner_url ? (
                      <img 
                        src={subscription.project.banner_url} 
                        alt={subscription.project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Zap className="h-16 w-16 text-white/80" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
                    <div className="absolute top-3 right-3">
                      <Badge className={`${getProjectStatusColor(subscription.project.status)} border-0 shadow-lg backdrop-blur-sm`}>
                        {subscription.project.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-lg line-clamp-1 drop-shadow-md">
                        {subscription.project.title}
                      </h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="h-4 w-4 mr-1.5 text-slate-400" />
                        <span className="line-clamp-1">{subscription.project.location}</span>
                      </div>
                      <Badge className={`${getStatusColor(subscription.status)} border text-xs`}>
                        {subscription.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">Capacity</p>
                        <p className="font-semibold text-slate-900">{subscription.subscribed_kw} kW</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">Investment</p>
                        <p className="font-semibold text-slate-900 text-sm">{formatCurrency(subscription.amount_paid)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-slate-600">Rate: ₹{subscription.project.rate_per_unit_investor}/kWh</span>
                      <span className="text-slate-600">{formatDate(subscription.start_date)}</span>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white h-10 shadow-sm" 
                          onClick={() => fetchSubscriptionDetails(subscription.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader className="pb-4 border-b">
                          <DialogTitle className="text-2xl">{subscription.project.title}</DialogTitle>
                          <DialogDescription className="text-base">
                            Performance insights and payout history
                          </DialogDescription>
                        </DialogHeader>
                        
                        {detailLoading ? (
                          <div className="p-12">
                            <div className="animate-pulse space-y-6">
                              <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                  <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>
                                ))}
                              </div>
                              <div className="h-64 bg-slate-200 rounded-xl"></div>
                            </div>
                          </div>
                        ) : selectedSubscription ? (
                          <div className="space-y-6 py-4">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                                <CardContent className="p-4 text-center">
                                  <p className="text-xs text-blue-700 font-medium mb-1">Subscribed Capacity</p>
                                  <p className="text-2xl font-bold text-blue-900">{selectedSubscription.subscribed_kw} <span className="text-sm">kW</span></p>
                                </CardContent>
                              </Card>
                              <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100">
                                <CardContent className="p-4 text-center">
                                  <p className="text-xs text-emerald-700 font-medium mb-1">Avg Monthly Gen.</p>
                                  <p className="text-2xl font-bold text-emerald-900">{selectedSubscription.avgMonthlyGeneration.toFixed(0)} <span className="text-sm">kWh</span></p>
                                </CardContent>
                              </Card>
                              <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                                <CardContent className="p-4 text-center">
                                  <p className="text-xs text-purple-700 font-medium mb-1">Avg Monthly Payout</p>
                                  <p className="text-xl font-bold text-purple-900">{formatCurrency(selectedSubscription.avgMonthlyPayout)}</p>
                                </CardContent>
                              </Card>
                              <Card className="border-0 bg-gradient-to-br from-amber-50 to-amber-100">
                                <CardContent className="p-4 text-center">
                                  <p className="text-xs text-amber-700 font-medium mb-1">Last Month</p>
                                  <p className="text-xl font-bold text-amber-900">{formatCurrency(selectedSubscription.lastMonthPayout)}</p>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Recent Payouts Table */}
                            <Card className="border-0 shadow-sm">
                              <CardHeader>
                                <CardTitle className="text-lg">Payout History</CardTitle>
                                <CardDescription>Your recent monthly earnings</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="overflow-x-auto">
                                  <table className="w-full">
                                    <thead>
                                      <tr className="border-b border-slate-200">
                                        <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Month</th>
                                        <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Units Generated</th>
                                        <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Payout</th>
                                        <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedSubscription.payouts.slice(-6).reverse().map((payout) => (
                                        <tr key={payout.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                          <td className="p-3 text-sm text-slate-900">
                                            {new Date(payout.payout_month).toLocaleDateString('en-IN', { 
                                              month: 'short', 
                                              year: 'numeric' 
                                            })}
                                          </td>
                                          <td className="p-3 text-sm text-slate-700">{payout.units_generated_kwh} kWh</td>
                                          <td className="p-3 text-sm font-semibold text-slate-900">{formatCurrency(payout.payout_amount)}</td>
                                          <td className="p-3">
                                            <Badge className={`${payout.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'} border text-xs`}>
                                              {payout.status}
                                            </Badge>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ) : (
                          <div className="p-12 text-center">
                            <p className="text-slate-600">Failed to load subscription details</p>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;