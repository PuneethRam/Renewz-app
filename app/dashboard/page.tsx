'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, TrendingUp, Zap, DollarSign, MapPin, Eye} from 'lucide-react';

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
  const { user } = useAuth(); // Use your existing AuthContext
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscriptions when user changes
  useEffect(() => {
    if (user) {
      // User is signed in, fetch their subscriptions
      fetchSubscriptions(user.uid);
    } else {
      // User is signed out
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
      case 'applied': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'approved': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'over': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
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
      case 'upcoming': return 'bg-orange-100 text-orange-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Show sign-in prompt if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <CardTitle>Solar Dashboard</CardTitle>
            <CardDescription>Please sign in to view your solar subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => window.location.href = '/signin'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => fetchSubscriptions(user.uid)} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
       
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
                  <p className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {subscriptions.reduce((sum, sub) => sum + sub.subscribed_kw, 0).toFixed(1)} kW
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {subscriptions.filter(sub => sub.status === 'active').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Investment</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(subscriptions.reduce((sum, sub) => sum + sub.amount_paid, 0))}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions List */}
        {subscriptions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Subscriptions Yet</h3>
              <p className="text-gray-600 mb-6">Start your solar journey by subscribing to your first project</p>
              <Button>Browse Projects</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((subscription) => (
              <Card key={subscription.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-yellow-400 to-orange-500 relative">
                  {subscription.project.banner_url ? (
                    <img 
                      src={subscription.project.banner_url} 
                      alt={subscription.project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Zap className="h-12 w-12 text-white" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge className={getProjectStatusColor(subscription.project.status)}>
                      {subscription.project.status}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {subscription.project.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {subscription.project.location}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Subscribed: {subscription.subscribed_kw} kW</span>
                      <Badge className={getStatusColor(subscription.status)}>
                        {subscription.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Investment:</span>
                      <span className="font-medium">{formatCurrency(subscription.amount_paid)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate per unit:</span>
                      <span className="font-medium">₹{subscription.project.rate_per_unit_investor}/kWh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">{formatDate(subscription.start_date)}</span>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        onClick={() => fetchSubscriptionDetails(subscription.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{subscription.project.title} - Subscription Details</DialogTitle>
                        <DialogDescription>
                          Detailed view of your subscription performance and payouts
                        </DialogDescription>
                      </DialogHeader>
                      
                      {detailLoading ? (
                        <div className="p-8">
                          <div className="animate-pulse space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-32 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ) : selectedSubscription ? (
                        <div className="space-y-6">
                          {/* Key Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card>
                              <CardContent className="p-4">
                                <div className="text-center">
                                  <p className="text-sm text-gray-600">Subscribed Capacity</p>
                                  <p className="text-lg font-bold">{selectedSubscription.subscribed_kw} kW</p>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="text-center">
                                  <p className="text-sm text-gray-600">Avg Monthly Generation</p>
                                  <p className="text-lg font-bold">{selectedSubscription.avgMonthlyGeneration.toFixed(1)} kWh</p>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="text-center">
                                  <p className="text-sm text-gray-600">Avg Monthly Payout</p>
                                  <p className="text-lg font-bold">{formatCurrency(selectedSubscription.avgMonthlyPayout)}</p>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="text-center">
                                  <p className="text-sm text-gray-600">Last Month Payout</p>
                                  <p className="text-lg font-bold">{formatCurrency(selectedSubscription.lastMonthPayout)}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Recent Payouts Table */}
                          <Card>
                            <CardHeader>
                              <CardTitle>Payout History</CardTitle>
                              <CardDescription>Your recent monthly payouts</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="text-left p-2">Month</th>
                                      <th className="text-left p-2">Units Generated</th>
                                      <th className="text-left p-2">Payout Amount</th>
                                      <th className="text-left p-2">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedSubscription.payouts.slice(-6).map((payout) => (
                                      <tr key={payout.id} className="border-b">
                                        <td className="p-2">
                                          {new Date(payout.payout_month).toLocaleDateString('en-IN', { 
                                            month: 'long', 
                                            year: 'numeric' 
                                          })}
                                        </td>
                                        <td className="p-2">{payout.units_generated_kwh} kWh</td>
                                        <td className="p-2 font-medium">{formatCurrency(payout.payout_amount)}</td>
                                        <td className="p-2">
                                          <Badge className={payout.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
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
                        <div className="p-8 text-center">
                          <p className="text-gray-600">Failed to load subscription details</p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;