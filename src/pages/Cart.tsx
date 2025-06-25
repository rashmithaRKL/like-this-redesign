
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "CHOCOLATE GATEAU",
      price: 1990.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      name: "CHOCOLATE GATEAU",
      price: 1990.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      name: "CHOCOLATE GATEAU",
      price: 1990.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=150&fit=crop"
    },
    {
      id: 4,
      name: "CHOCOLATE GATEAU",
      price: 1990.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=150&fit=crop"
    }
  ]);

  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal; // Add tax, shipping, etc. here if needed

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-script text-gray-800 mb-8">Shopping cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Header */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                  <div>PRODUCT</div>
                  <div className="text-center">QUANTITY</div>
                  <div className="text-center">TOTAL</div>
                  <div></div>
                </div>
                
                {/* Cart Items */}
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">Rs. {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-center font-medium">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </div>
                      
                      <div className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link to="/shop">CONTINUE SHOPPING</Link>
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              {/* Discount Codes */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">DISCOUNT CODES</h3>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button className="bg-black hover:bg-gray-800 text-white px-6">
                      APPLY
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Cart Total */}
              <Card className="bg-pink-100">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">CART TOTAL</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>Rs. {total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button 
                    asChild
                    className="w-full bg-black hover:bg-gray-800 text-white"
                  >
                    <Link to="/checkout">PROCEED TO CHECKOUT</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
