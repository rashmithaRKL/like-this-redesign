
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, ShoppingBag, MapPin, CreditCard } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15"
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true
    },
    {
      id: 2,
      type: "Work",
      street: "456 Business Ave",
      city: "New York",
      state: "NY", 
      zipCode: "10002",
      isDefault: false
    }
  ]);

  const orderHistory = [
    {
      id: "ORD-001",
      date: "2024-06-20",
      status: "Delivered",
      total: 45.99,
      items: 3
    },
    {
      id: "ORD-002", 
      date: "2024-06-15",
      status: "Processing",
      total: 32.50,
      items: 2
    },
    {
      id: "ORD-003",
      date: "2024-06-10", 
      status: "Delivered",
      total: 78.25,
      items: 5
    }
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log("Profile updated:", profileData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-script text-pink-600 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-600">Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          className="border-pink-200 focus:border-pink-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          className="border-pink-200 focus:border-pink-400"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="border-pink-200 focus:border-pink-400"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="border-pink-200 focus:border-pink-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                          className="border-pink-200 focus:border-pink-400"
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white">
                      Update Profile
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-600">Order History</CardTitle>
                  <CardDescription>View and track your previous orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="border border-pink-200 rounded-lg p-4 bg-white/50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">Order {order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">{order.items} items</p>
                          <p className="font-semibold text-pink-600">${order.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-600">Saved Addresses</CardTitle>
                  <CardDescription>Manage your delivery addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-pink-200 rounded-lg p-4 bg-white/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-800">{address.type}</h3>
                              {address.isDefault && (
                                <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded">Default</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{address.street}</p>
                            <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-pink-300 text-pink-600 hover:bg-pink-50">
                      Add New Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-600">Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-pink-200 rounded-lg p-4 bg-white/50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            VISA
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-600">Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-pink-300 text-pink-600 hover:bg-pink-50">
                      Add New Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
