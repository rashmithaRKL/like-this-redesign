
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const CustomFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full border border-pink-500/20 animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-32 w-64 h-64 rounded-full border border-pink-400/10 animate-float"></div>
      </div>

      {/* Newsletter Section */}
      <AnimatedSection animation="fadeIn">
        <div className="bg-gradient-to-r from-pink-600/10 to-pink-500/5 py-12 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-script text-pink-400 mb-2">Stay Sweet with Our Newsletter</h3>
                <p className="text-gray-300">Get the latest cake recipes, baking tips, and exclusive offers!</p>
              </div>
              <div className="flex w-full lg:w-auto max-w-md">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="rounded-r-none bg-white/10 text-white border-gray-700 placeholder:text-gray-400 focus:border-pink-500"
                />
                <Button className="rounded-l-none bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-8 transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Footer */}
      <div className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <AnimatedSection animation="slideUp" delay={100}>
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-xl">CR</span>
                  </div>
                  <span className="text-2xl font-script text-pink-400">CakesRBakes</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Crafting memorable moments with delicious cakes and premium baking ingredients. 
                  Your celebration deserves the sweetest touch!
                </p>
                <div className="flex items-start text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-pink-400 flex-shrink-0 mt-1" />
                  <span>123 Baker Street, Sweet City, SC 12345</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Get in Touch */}
            <AnimatedSection animation="slideUp" delay={200}>
              <div className="space-y-6">
                <h4 className="text-xl font-script text-pink-400 mb-6">Get in Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                    <Phone className="w-5 h-5 mr-4 text-pink-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium">+94 70 558 8789</p>
                      <p className="text-sm text-gray-400">Mon-Fri 9AM-6PM</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                    <Mail className="w-5 h-5 mr-4 text-pink-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium">hello@cakesrbakes.com</p>
                      <p className="text-sm text-gray-400">24/7 Email Support</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h5 className="text-white font-medium mb-3">Business Hours</h5>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Monday - Friday: 8AM - 8PM</p>
                    <p>Saturday: 9AM - 6PM</p>
                    <p>Sunday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Quick Links */}
            <AnimatedSection animation="slideUp" delay={300}>
              <div className="space-y-6">
                <h4 className="text-xl font-script text-pink-400 mb-6">Quick Links</h4>
                <div className="space-y-3">
                  <Link to="/" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      Home
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link to="/about" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      About Us
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link to="/shop" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      Our Products
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link to="/shop/cakes" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      Custom Cakes
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link to="/contact" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      Contact
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Product Categories */}
            <AnimatedSection animation="slideUp" delay={400}>
              <div className="space-y-6">
                <h4 className="text-xl font-script text-pink-400 mb-6">Product Categories</h4>
                <div className="space-y-3">
                  <Link to="/shop/cakes" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      Birthday Cakes
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link to="/shop/cakes" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      Wedding Cakes
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link to="/shop/ingredients" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      Baking Ingredients
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link to="/shop/decorations" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      Cake Decorations
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link to="/shop" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 group">
                    <span className="relative">
                      Baking Tools
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Social Media Section */}
          <AnimatedSection animation="fadeIn" delay={500}>
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h5 className="text-lg font-script text-pink-400 mb-2">Follow Us</h5>
                  <p className="text-gray-400 text-sm">Stay connected for sweet updates!</p>
                </div>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110">
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110">
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Copyright */}
      <AnimatedSection animation="fadeIn" delay={600}>
        <div className="border-t border-gray-800 py-6 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 CakesRBakes. All Rights Reserved. Made with ❤️ by RK Software Technologies
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors relative group">
                  Privacy Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors relative group">
                  Terms of Service
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors relative group">
                  Cookie Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
};

export default CustomFooter;
