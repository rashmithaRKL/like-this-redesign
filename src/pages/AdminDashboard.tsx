
import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  TrendingUp, 
  ShoppingCart, 
  Truck, 
  DollarSign,
  LogOut
} from "lucide-react";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminCustomers from "@/components/admin/AdminCustomers";
import AdminInventory from "@/components/admin/AdminInventory";
import AdminReports from "@/components/admin/AdminReports";
import AdminTracking from "@/components/admin/AdminTracking";
import AnimatedStatsCard from "@/components/admin/AnimatedStatsCard";
import EnhancedChart from "@/components/admin/EnhancedChart";
import ScrollAnimationWrapper from "@/components/admin/ScrollAnimationWrapper";

const AdminDashboard = () => {
  const { user, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState("overview");

  // Enhanced mock data for dashboard
  const stats = [
    { title: "Total Orders", value: 156, icon: ShoppingCart, color: "text-blue-600", trend: 12.5 },
    { title: "Active Products", value: 24, icon: Package, color: "text-green-600", trend: 8.3 },
    { title: "Customers", value: 89, icon: Users, color: "text-purple-600", trend: 15.7 },
    { title: "Revenue Today", value: "$1,234", icon: DollarSign, color: "text-yellow-600", trend: 5.2 },
    { title: "Pending Shipments", value: 12, icon: Truck, color: "text-red-600", trend: -2.1 },
    { title: "Growth Rate", value: "+12%", icon: TrendingUp, color: "text-emerald-600", trend: 18.9 },
  ];

  // Chart data
  const revenueChartData = [
    { date: '2024-01-01', revenue: 1200, orders: 15 },
    { date: '2024-01-02', revenue: 1500, orders: 18 },
    { date: '2024-01-03', revenue: 1100, orders: 12 },
    { date: '2024-01-04', revenue: 1800, orders: 22 },
    { date: '2024-01-05', revenue: 1650, orders: 20 },
    { date: '2024-01-06', revenue: 2100, orders: 25 },
    { date: '2024-01-07', revenue: 1900, orders: 23 },
  ];

  const categoryData = [
    { name: 'Cakes', value: 45 },
    { name: 'Cupcakes', value: 25 },
    { name: 'Pastries', value: 20 },
    { name: 'Cookies', value: 10 },
  ];

  const monthlyOrdersData = [
    { month: 'Jan', orders: 65 },
    { month: 'Feb', orders: 78 },
    { month: 'Mar', orders: 82 },
    { month: 'Apr', orders: 95 },
    { month: 'May', orders: 88 },
    { month: 'Jun', orders: 156 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with animation */}
      <ScrollAnimationWrapper animation="slideUp">
        <header className="bg-white shadow-sm border-b backdrop-blur-sm bg-white/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  CakesRBakes Admin
                </h1>
                <Badge variant="secondary" className="ml-3 animate-pulse">
                  Welcome, {user?.username}
                </Badge>
              </div>
              <Button onClick={logout} variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>
      </ScrollAnimationWrapper>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <ScrollAnimationWrapper animation="slideUp" delay={200}>
            <TabsList className="grid w-full grid-cols-7 bg-white shadow-sm">
              <TabsTrigger value="overview" className="transition-all hover:scale-105">Overview</TabsTrigger>
              <TabsTrigger value="products" className="transition-all hover:scale-105">Products</TabsTrigger>
              <TabsTrigger value="orders" className="transition-all hover:scale-105">Orders</TabsTrigger>
              <TabsTrigger value="customers" className="transition-all hover:scale-105">Customers</TabsTrigger>
              <TabsTrigger value="inventory" className="transition-all hover:scale-105">Inventory</TabsTrigger>
              <TabsTrigger value="tracking" className="transition-all hover:scale-105">Tracking</TabsTrigger>
              <TabsTrigger value="reports" className="transition-all hover:scale-105">Reports</TabsTrigger>
            </TabsList>
          </ScrollAnimationWrapper>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards with staggered animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <ScrollAnimationWrapper key={index} animation="scaleIn" delay={index * 100}>
                  <AnimatedStatsCard
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    trend={stat.trend}
                    delay={index * 150}
                  />
                </ScrollAnimationWrapper>
              ))}
            </div>

            {/* Enhanced Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollAnimationWrapper animation="slideLeft" delay={400}>
                <EnhancedChart
                  title="Revenue Trend"
                  description="Daily revenue over the last 7 days"
                  data={revenueChartData}
                  type="area"
                  dataKey="revenue"
                  xAxisKey="date"
                  colors={['#3B82F6']}
                  showTrend={true}
                  trendValue={12.5}
                />
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper animation="slideRight" delay={400}>
                <EnhancedChart
                  title="Sales by Category"
                  description="Product category distribution"
                  data={categoryData}
                  type="pie"
                  dataKey="value"
                  colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
                />
              </ScrollAnimationWrapper>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollAnimationWrapper animation="slideUp" delay={600}>
                <EnhancedChart
                  title="Monthly Orders"
                  description="Order volume by month"
                  data={monthlyOrdersData}
                  type="bar"
                  dataKey="orders"
                  xAxisKey="month"
                  colors={['#10B981']}
                  showTrend={true}
                  trendValue={8.7}
                />
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper animation="fadeIn" delay={600}>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start hover:scale-105 transition-transform"
                        onClick={() => setActiveTab("products")}
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Add New Product
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start hover:scale-105 transition-transform"
                        onClick={() => setActiveTab("orders")}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        View Recent Orders
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start hover:scale-105 transition-transform"
                        onClick={() => setActiveTab("inventory")}
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Check Inventory
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>
            </div>

            {/* Recent Activity */}
            <ScrollAnimationWrapper animation="slideUp" delay={800}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((order) => (
                        <div key={order} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div>
                            <p className="font-medium">Order #{order}00{order}</p>
                            <p className="text-sm text-gray-600">Customer {order}</p>
                          </div>
                          <Badge variant="outline" className="animate-pulse">Processing</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Low Stock Items</CardTitle>
                    <CardDescription>Products that need restocking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                          <div>
                            <p className="font-medium">Product {item}</p>
                            <p className="text-sm text-red-600">Only {item} left in stock</p>
                          </div>
                          <Badge variant="destructive" className="animate-pulse">Low Stock</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimationWrapper>
          </TabsContent>

          <TabsContent value="products">
            <ScrollAnimationWrapper animation="fadeIn">
              <AdminProducts />
            </ScrollAnimationWrapper>
          </TabsContent>

          <TabsContent value="orders">
            <ScrollAnimationWrapper animation="fadeIn">
              <AdminOrders />
            </ScrollAnimationWrapper>
          </TabsContent>

          <TabsContent value="customers">
            <ScrollAnimationWrapper animation="fadeIn">
              <AdminCustomers />
            </ScrollAnimationWrapper>
          </TabsContent>

          <TabsContent value="inventory">
            <ScrollAnimationWrapper animation="fadeIn">
              <AdminInventory />
            </ScrollAnimationWrapper>
          </TabsContent>

          <TabsContent value="tracking">
            <ScrollAnimationWrapper animation="fadeIn">
              <AdminTracking />
            </ScrollAnimationWrapper>
          </TabsContent>

          <TabsContent value="reports">
            <ScrollAnimationWrapper animation="fadeIn">
              <AdminReports />
            </ScrollAnimationWrapper>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
