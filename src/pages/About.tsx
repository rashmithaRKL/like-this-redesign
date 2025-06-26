
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedStats from "@/components/AnimatedStats";
import AnimatedSection from "@/components/AnimatedSection";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Sparkles } from "lucide-react";

const About = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <AnimatedSection animation="fadeIn">
        <section className="relative py-20 bg-gradient-to-br from-pink-100 to-purple-100 pt-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                About CakesRBakes
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Learn more about our story, values, and team.
              </p>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                Explore
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Animated Statistics */}
      <AnimatedStats />

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection animation="slideRight" className="lg:w-1/2">
              <h2 className="text-4xl font-script text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                CakesRBakes started as a small family bakery with a passion for creating delicious and beautiful cakes. Over the years, we've grown into a beloved local brand, known for our quality ingredients, creative designs, and exceptional customer service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that every cake should be a masterpiece, and we pour our hearts into every creation. From birthdays to weddings, we're honored to be a part of your special moments.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="slideLeft" className="lg:w-1/2">
              <LazyImage 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop" 
                alt="Our Bakery" 
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeIn" className="text-center mb-12">
            <h2 className="text-4xl font-script text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do, from baking the perfect cake to serving our community.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="scaleIn" delay={100}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Heart className="w-10 h-10 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Passion</h3>
                  <p className="text-gray-600">We are passionate about creating delicious cakes that bring joy to our customers.</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="scaleIn" delay={200}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-10 h-10 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-gray-600">We are committed to serving our community and building lasting relationships.</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="scaleIn" delay={300}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-10 h-10 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-gray-600">We strive for excellence in everything we do, from our ingredients to our service.</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeIn" className="text-center mb-12">
            <h2 className="text-4xl font-script text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of talented bakers and designers are dedicated to creating the perfect cake for you.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="slideUp" delay={100}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <LazyImage 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
                    alt="Team Member" 
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                  <p className="text-gray-600">Head Baker</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={200}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <LazyImage 
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?w=150&h=150&fit=crop&crop=face" 
                    alt="Team Member" 
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">Michael Smith</h3>
                  <p className="text-gray-600">Cake Designer</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={300}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <LazyImage 
                    src="https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?w=150&h=150&fit=crop&crop=face" 
                    alt="Team Member" 
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">Emily Davis</h3>
                  <p className="text-gray-600">Customer Service</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <AnimatedSection animation="fadeIn">
        <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-4xl font-script mb-8">Ready to Order?</h2>
              <p className="text-lg mb-8">
                Contact us today to discuss your custom cake needs.
              </p>
              <Button className="bg-white text-pink-600 hover:bg-pink-100">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default About;
