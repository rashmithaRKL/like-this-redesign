
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import LazyImage from "@/components/LazyImage";
import ParallaxScroll from "@/components/ParallaxScroll";
import Autoplay from "embla-carousel-autoplay";

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredCakes = [
    {
      id: 1,
      name: "Chocolate Layer Cake",
      price: "Rs. 7500.00",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      category: "Cakes"
    },
    {
      id: 2,
      name: "Vanilla Dream Cake",
      price: "Rs. 6500.00",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      category: "Cakes"
    },
    {
      id: 3,
      name: "Rainbow Layer Cake",
      price: "Rs. 10000.00",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop",
      category: "Cakes"
    },
    {
      id: 4,
      name: "Berry Special Cake",
      price: "Rs. 4500.00",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop",
      category: "Cakes"
    }
  ];

  const heroSlides = [
    {
      id: 1,
      title: "Rich Chocolate Heaven",
      subtitle: "Decadent & Luxurious",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
      description: "Premium Chocolate Layer Cake",
      gradient: "from-amber-900 via-orange-800 to-yellow-700",
      bgColor: "bg-amber-900",
      smallImages: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1549312811-ef8c6b8b8e5b?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=80&h=80&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Vanilla Elegance",
      subtitle: "Classic & Timeless",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop",
      description: "Elegant Vanilla Dream Cake",
      gradient: "from-yellow-300 via-orange-200 to-amber-300",
      bgColor: "bg-yellow-300",
      smallImages: [
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1549312811-ef8c6b8b8e5b?w=80&h=80&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Rainbow Celebration",
      subtitle: "Vibrant & Joyful",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop",
      description: "Colorful Rainbow Layer Cake",
      gradient: "from-pink-500 via-purple-400 to-blue-500",
      bgColor: "bg-pink-500",
      smallImages: [
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&h=80&fit=crop"
      ]
    },
    {
      id: 4,
      title: "Berry Paradise",
      subtitle: "Fresh & Natural",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&h=600&fit=crop",
      description: "Fresh Berry Special Cake",
      gradient: "from-red-400 via-pink-300 to-purple-400",
      bgColor: "bg-red-400",
      smallImages: [
        "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=80&h=80&fit=crop"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Enhanced Animations */}
      <section className="relative min-h-screen overflow-hidden pt-16">
        <Carousel 
          className="w-full h-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={slide.id}>
                <div className={`relative min-h-screen bg-gradient-to-br ${slide.gradient} overflow-hidden`}>
                  {/* Enhanced Floating Elements */}
                  <div className="absolute inset-0">
                    <div className={`absolute top-0 right-0 w-96 h-96 ${slide.bgColor} opacity-20 rounded-full transform translate-x-32 -translate-y-32 animate-pulse`}></div>
                    <div className={`absolute bottom-0 left-0 w-full h-2/3 ${slide.bgColor} opacity-15 animate-pulse`} 
                         style={{
                           clipPath: 'ellipse(80% 60% at 20% 100%)',
                           animationDelay: '1s'
                         }}></div>
                    <div className={`absolute top-1/4 left-0 w-3/4 h-3/4 ${slide.bgColor} opacity-10 animate-pulse`}
                         style={{
                           clipPath: 'ellipse(70% 80% at 0% 50%)',
                           animationDelay: '2s'
                         }}></div>
                    
                    {/* Floating Particles */}
                    <div className="absolute top-20 left-10 w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-40 right-20 w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
                  </div>
                  
                  <div className="relative container mx-auto px-4 py-20 flex items-center min-h-screen">
                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                      {/* Left Content with Staggered Animations */}
                      <div className="text-white space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-medium opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            {slide.subtitle}
                          </h3>
                          <h1 className="text-6xl md:text-7xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            {slide.title}
                          </h1>
                        </div>
                        
                        <p className="text-lg opacity-80 max-w-md leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
                          Indulge in our premium cake collection, crafted with the finest ingredients and designed to make every celebration extraordinary.
                        </p>
                        
                        {/* Animated Product Previews */}
                        <div className="flex space-x-4 py-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                          {slide.smallImages.map((img, idx) => (
                            <div 
                              key={idx} 
                              className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/60 transition-all duration-300 cursor-pointer hover:scale-110 animate-scale-in"
                              style={{ animationDelay: `${1 + idx * 0.1}s` }}
                            >
                              <LazyImage src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                          <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer hover:scale-110 animate-scale-in" style={{ animationDelay: '1.4s' }}>
                            <span className="text-xs text-white">+</span>
                          </div>
                        </div>
                        
                        <Button 
                          asChild
                          className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
                          style={{ animationDelay: '1.2s' }}
                        >
                          <Link to="/shop">Order Now</Link>
                        </Button>
                      </div>
                      
                      {/* Right Content - Enhanced Product Image */}
                      <div className="flex justify-center lg:justify-end">
                        <div className="relative animate-scale-in" style={{ animationDelay: '0.6s' }}>
                          <div className="w-80 h-80 md:w-96 md:h-96 relative">
                            <LazyImage 
                              src={slide.image}
                              alt={slide.description}
                              className="w-full h-full object-cover rounded-full shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-3"
                            />
                            {/* Enhanced Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute top-1/3 -left-8 w-6 h-6 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute bottom-1/4 -right-6 w-4 h-4 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                            
                            {/* Floating Ring Animation */}
                            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-8 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300" />
          <CarouselNext className="right-8 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300" />
        </Carousel>
      </section>

      {/* About Section with Parallax */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection animation="slideLeft" className="lg:w-1/2">
              <h2 className="text-4xl font-script text-gray-800 mb-6">About Our Company</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                CakesRBakes brings you the finest quality cakes made with love and care. 
                Our expert bakers use only the finest ingredients to create delicious treats 
                that make every celebration special. From custom wedding cakes to birthday 
                surprises, we craft each cake to perfection.
              </p>
              <Button 
                asChild
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link to="/about">Read More</Link>
              </Button>
            </AnimatedSection>
            <AnimatedSection animation="slideRight" delay={200} className="lg:w-1/2">
              <ParallaxScroll speed={0.3}>
                <LazyImage 
                  src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=400&fit=crop" 
                  alt="Our Bakery" 
                  className="w-full h-80 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
              </ParallaxScroll>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Products with Enhanced Animations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeIn" className="text-center mb-12">
            <h2 className="text-4xl font-script text-gray-800 mb-4">Delicious Cake Creations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore Our Wide Range of Flavors and Designs. Discover the Perfect Cake for Every Occasion!
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCakes.map((cake, index) => (
              <AnimatedSection 
                key={cake.id}
                animation="scaleIn"
                delay={index * 100}
              >
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-3 hover:rotate-1">
                  <Link to={`/product/${cake.id}`}>
                    <div className="relative overflow-hidden">
                      <LazyImage 
                        src={cake.image} 
                        alt={cake.name}
                        className="w-full h-64 object-cover group-hover:scale-125 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        View Details
                      </div>
                    </div>
                    <CardContent className="p-0">
                      <div className="bg-pink-400 text-white p-4 group-hover:bg-pink-500 transition-colors duration-300">
                        <p className="text-sm opacity-90 mb-1">{cake.category}</p>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-100 transition-colors duration-300">{cake.name}</h3>
                        <p className="text-xl font-bold">{cake.price}</p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection animation="fadeIn" delay={400} className="text-center mt-12">
            <Button 
              asChild
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link to="/shop">View All Products</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Enhanced Testimonials with Parallax Background */}
      <section className="py-20 bg-pink-400 text-white relative overflow-hidden">
        <ParallaxScroll speed={0.2} className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-white rounded-t-[100px]"></div>
        </ParallaxScroll>
        
        <div className="relative container mx-auto px-4">
          <AnimatedSection animation="fadeIn" className="text-center mb-12">
            <h2 className="text-4xl font-script mb-8">What our Customers Say</h2>
          </AnimatedSection>
          
          <AnimatedSection animation="scaleIn" delay={200} className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-0 text-white hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" 
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">
                  "Bringing sweetness to your celebrations with love and care. 
                  CakesRBakes, where every bite is crafted to be a delightful experience!"
                </p>
                <div className="flex items-center justify-center">
                  <LazyImage 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" 
                    alt="Customer" 
                    className="w-12 h-12 rounded-full mr-4 hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm opacity-80">Happy Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
