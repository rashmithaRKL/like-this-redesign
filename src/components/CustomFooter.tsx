
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";

const CustomFooter = () => {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Stay Sweet with Our Newsletter</h3>
              <p className="text-gray-400 text-sm">Get the latest cake recipes, baking tips, and exclusive offers!</p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="rounded-r-none bg-white text-black border-0"
              />
              <Button className="rounded-l-none bg-pink-500 hover:bg-pink-600 px-6">
                Subscribe
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-pink-400 hover:bg-gray-800">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-pink-400 hover:bg-gray-800">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-pink-400 hover:bg-gray-800">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-pink-400 hover:bg-gray-800">
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
              <p className="text-gray-400 leading-relaxed mb-4">
                Crafting memorable moments with delicious cakes and premium baking ingredients. 
                Your celebration deserves the sweetest touch!
              </p>
              <div className="flex items-center text-gray-400 mb-2">
                <MapPin className="w-4 h-4 mr-3 text-pink-400" />
                <span>123 Baker Street, Sweet City, SC 12345</span>
              </div>
            </div>

            {/* Get in Touch */}
            <div>
              <h4 className="text-lg font-script text-pink-400 mb-6">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-3 text-pink-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium">+94 70 558 8789</p>
                    <p className="text-sm">Mon-Fri 9AM-6PM</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-3 text-pink-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium">hello@cakesrbakes.com</p>
                    <p className="text-sm">24/7 Email Support</p>
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-2">Business Hours</h5>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Monday - Friday: 8AM - 8PM</p>
                    <p>Saturday: 9AM - 6PM</p>
                    <p>Sunday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-script text-pink-400 mb-6">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">Home</Link>
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">About Us</Link>
                <Link to="/shop" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">Our Products</Link>
                <Link to="/shop/cakes" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">Custom Cakes</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">Contact</Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-script text-pink-400 mb-6">Product Categories</h4>
              <div className="space-y-3">
                <Link to="/shop/cakes" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">Birthday Cakes</Link>
                <Link to="/shop/cakes" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">Wedding Cakes</Link>
                <Link to="/shop/ingredients" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">Baking Ingredients</Link>
                <Link to="/shop/decorations" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">Cake Decorations</Link>
                <Link to="/shop" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">Baking Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 CakesRBakes. All Rights Reserved. Made with ❤️ by RK Software Technologies
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
