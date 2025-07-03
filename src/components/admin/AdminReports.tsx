import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, TrendingUp, DollarSign, ShoppingCart, Users, Package, Download, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useToast } from "@/hooks/use-toast";

const AdminReports = () => {
  const [dateRange, setDateRange] = useState("last_7_days");
  const [reportType, setReportType] = useState("revenue");
  const { toast } = useToast();

  // Mock data for charts
  const revenueData = [
    { date: '2024-01-01', revenue: 1200, orders: 15 },
    { date: '2024-01-02', revenue: 1500, orders: 18 },
    { date: '2024-01-03', revenue: 1100, orders: 12 },
    { date: '2024-01-04', revenue: 1800, orders: 22 },
    { date: '2024-01-05', revenue: 1650, orders: 20 },
    { date: '2024-01-06', revenue: 2100, orders: 25 },
    { date: '2024-01-07', revenue: 1900, orders: 23 },
  ];

  const categoryData = [
    { name: 'Cakes', value: 45, color: '#FF6B6B' },
    { name: 'Cupcakes', value: 25, color: '#4ECDC4' },
    { name: 'Pastries', value: 20, color: '#45B7D1' },
    { name: 'Cookies', value: 10, color: '#96CEB4' },
  ];

  const topProducts = [
    { name: 'Chocolate Birthday Cake', sales: 45, revenue: 1350 },
    { name: 'Vanilla Cupcakes (12-pack)', sales: 38, revenue: 912 },
    { name: 'Strawberry Cheesecake', sales: 32, revenue: 1280 },
    { name: 'Chocolate Chip Cookies', sales: 28, revenue: 420 },
    { name: 'Red Velvet Cake', sales: 25, revenue: 1000 },
  ];

  const monthlyStats = {
    totalRevenue: 24567.89,
    totalOrders: 342,
    averageOrderValue: 71.85,
    newCustomers: 89,
    returningCustomers: 156,
    growthRate: 12.5
  };

  const exportRevenueToExcel = () => {
    const csvContent = [
      ['Date', 'Revenue', 'Orders'],
      ...revenueData.map(item => [item.date, item.revenue.toString(), item.orders.toString()])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `revenue_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Excel Export Complete",
      description: "Revenue report has been exported as CSV file",
    });
  };

  const exportRevenueToPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Revenue Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .header { text-align: center; margin-bottom: 20px; }
            .date { color: #666; }
            .stats { display: flex; justify-content: space-around; margin: 20px 0; }
            .stat-card { text-align: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>CakesRBakes - Revenue Report</h1>
            <p class="date">Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="stats">
            <div class="stat-card">
              <h3>Total Revenue</h3>
              <p>$${monthlyStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div class="stat-card">
              <h3>Total Orders</h3>
              <p>${monthlyStats.totalOrders}</p>
            </div>
            <div class="stat-card">
              <h3>Growth Rate</h3>
              <p>+${monthlyStats.growthRate}%</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Revenue</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              ${revenueData.map(item => `
                <tr>
                  <td>${item.date}</td>
                  <td>$${item.revenue}</td>
                  <td>${item.orders}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }

    toast({
      title: "PDF Export Initiated",
      description: "Print dialog opened for PDF export",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-gray-600">Business insights and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_3_months">Last 3 Months</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border shadow-lg z-50">
              <DropdownMenuItem onClick={exportRevenueToExcel}>
                <FileText className="w-4 h-4 mr-2" />
                Export as Excel (CSV)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportRevenueToPDF}>
                <FileText className="w-4 h-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ${monthlyStats.totalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {monthlyStats.totalOrders}
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  ${monthlyStats.averageOrderValue}
                </div>
                <div className="text-sm text-gray-600">Avg Order Value</div>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {monthlyStats.newCustomers}
                </div>
                <div className="text-sm text-gray-600">New Customers</div>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-teal-600">
                  {monthlyStats.returningCustomers}
                </div>
                <div className="text-sm text-gray-600">Returning Customers</div>
              </div>
              <Users className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  +{monthlyStats.growthRate}%
                </div>
                <div className="text-sm text-gray-600">Growth Rate</div>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders Trend</CardTitle>
            <CardDescription>Daily revenue and order count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Best performing products by sales volume and revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.sales} units sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">${product.revenue}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Income Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Income</CardTitle>
            <CardDescription>Today's performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$1,234.56</div>
            <div className="text-sm text-gray-600 mt-2">
              <span className="text-green-600">+8.2%</span> from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Income</CardTitle>
            <CardDescription>This month's total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">$24,567.89</div>
            <div className="text-sm text-gray-600 mt-2">
              <span className="text-green-600">+12.5%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yearly Income</CardTitle>
            <CardDescription>This year's total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">$124,567.89</div>
            <div className="text-sm text-gray-600 mt-2">
              <span className="text-green-600">+18.3%</span> from last year
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
