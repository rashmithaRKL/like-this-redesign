
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-script text-pink-600">CakesRBakes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors">
              HOME
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors">
              ABOUT
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-pink-600 transition-colors">
              SHOP
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">
              CONTACT US
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/cart")}
              className="text-gray-700 hover:text-pink-600"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-pink-600">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/signin">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/signup">Sign Up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white rounded-lg shadow-lg mt-2">
            <div className="flex flex-col space-y-4 px-4">
              <Link to="/" className="text-gray-700 hover:text-pink-600">HOME</Link>
              <Link to="/about" className="text-gray-700 hover:text-pink-600">ABOUT</Link>
              <Link to="/shop" className="text-gray-700 hover:text-pink-600">SHOP</Link>
              <Link to="/contact" className="text-gray-700 hover:text-pink-600">CONTACT US</Link>
              <Link to="/profile" className="text-gray-700 hover:text-pink-600">PROFILE</Link>
              <div className="flex space-x-4 pt-4 border-t">
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild className="flex-1 bg-pink-500 hover:bg-pink-600">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
