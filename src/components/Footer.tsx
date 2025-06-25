
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">Subscribe to our newsletter</h3>
            <div className="flex w-full md:w-auto max-w-md">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="rounded-r-none bg-white text-black"
              />
              <Button className="rounded-l-none bg-pink-500 hover:bg-pink-600 px-6">
                Subscribe
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-pink-400">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-pink-400">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-pink-400">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">CR</span>
                </div>
                <span className="text-xl font-script text-pink-400">CakesRBakes</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                "Bringing sweetness to your celebrations with love and care. 
                CakesRBakes, where every bite is crafted to be a delightful experience!"
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-script text-pink-400 mb-6">Company</h4>
              <div className="space-y-3">
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
                <Link to="/shop" className="block text-gray-400 hover:text-white transition-colors">Chocolates</Link>
                <Link to="/shop/ingredients" className="block text-gray-400 hover:text-white transition-colors">Ingredients</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact us</Link>
              </div>
            </div>

            {/* Menu Links */}
            <div>
              <h4 className="text-lg font-script text-pink-400 mb-6">Menu</h4>
              <div className="space-y-3">
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
                <Link to="/shop" className="block text-gray-400 hover:text-white transition-colors">Chocolates</Link>
                <Link to="/shop/ingredients" className="block text-gray-400 hover:text-white transition-colors">Ingredients</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact us</Link>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-script text-pink-400 mb-6">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-3 text-pink-400" />
                  <span>Location</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-3 text-pink-400" />
                  <span>Call +9470 558 8789</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-3 text-pink-400" />
                  <span>rksoftwaretechnologies@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 All Rights Reserved By RK Software Technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
