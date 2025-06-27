
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Navigation from "@/components/Navigation";
import CustomFooter from "@/components/CustomFooter";
import AnimatedSection from "@/components/AnimatedSection";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempt:", formData);
    // Add authentication logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <Navigation />
      
      <div className="pt-20 pb-12 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="scaleIn">
            <Card className="max-w-md mx-auto shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-script text-pink-600 mb-2">
                  Welcome Back
                </CardTitle>
                <CardDescription>
                  Sign in to your CakesRBakes account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatedSection animation="slideUp" delay={200}>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </AnimatedSection>
                  
                  <AnimatedSection animation="slideUp" delay={300}>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="slideUp" delay={400}>
                    <div className="flex items-center justify-between">
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-pink-600 hover:text-pink-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="slideUp" delay={500}>
                    <Button 
                      type="submit" 
                      className="w-full bg-pink-500 hover:bg-pink-600"
                    >
                      Sign In
                    </Button>
                  </AnimatedSection>

                  <AnimatedSection animation="fadeIn" delay={600}>
                    <div className="text-center">
                      <span className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link 
                          to="/signup" 
                          className="text-pink-600 hover:text-pink-500 font-medium"
                        >
                          Sign up
                        </Link>
                      </span>
                    </div>
                  </AnimatedSection>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
      
      <CustomFooter />
    </div>
  );
};

export default SignIn;
