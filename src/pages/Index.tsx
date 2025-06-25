
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
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Autoplay from "embla-carousel-autoplay";

const Index = () => {
  const featuredCakes = [
    {
      id: 1,
      name: "Sutin Martin Cake",
      price: "Rs. 7500.00",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      category: "Cakes"
    },
    {
      id: 2,
      name: "Vanilla Car Design",
      price: "Rs. 6500.00",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      category: "Cakes"
    },
    {
      id: 3,
      name: "Engagement Cake",
      price: "Rs. 10000.00",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop",
      category: "Cakes"
    },
    {
      id: 4,
      name: "Vanilla Cake",
      price: "Rs. 4500.00",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop",
      category: "Cakes"
    }
  ];

  const heroSlides = [
    {
      id: 1,
      title: "Sweet Joy",
      subtitle: "Fresh Cakes",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
      description: "Delicious Chocolate Cake"
    },
    {
      id: 2,
      title: "Pure Delight",
      subtitle: "Artisan Baking",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&h=500&fit=crop",
      description: "Vanilla Dream Cake"
    },
    {
      id: 3,
      title: "Special Moments",
      subtitle: "Custom Creations",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=500&fit=crop",
      description: "Elegant Wedding Cake"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with 3D Slider */}
      <section className="relative min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-white rounded-t-[100px]"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <Carousel 
            className="w-full h-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent className="perspective-1000">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={slide.id} className="transform-gpu">
                  <div className="flex items-center justify-between min-h-[80vh]">
                    <div className="max-w-2xl text-white animate-fade-in transform transition-all duration-700 hover:scale-105">
                      <p className="text-lg mb-4 font-medium opacity-90 transform translate-y-4 animate-fade-in" 
                         style={{ animationDelay: '0.2s' }}>
                        {slide.subtitle}
                      </p>
                      <h1 className="text-6xl md:text-8xl font-script mb-8 leading-tight transform translate-y-4 animate-fade-in" 
                          style={{ animationDelay: '0.4s' }}>
                        {slide.title}
                      </h1>
                      <div className="w-16 h-0.5 bg-white mb-8 transform scale-x-0 animate-scale-in" 
                           style={{ animationDelay: '0.6s', transformOrigin: 'left' }}></div>
                      <div className="transform translate-y-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <Button 
                          asChild
                          className="bg-white text-pink-500 hover:bg-pink-50 px-8 py-3 rounded-full font-medium transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                        >
                          <Link to="/shop">Shop Now</Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="hidden lg:block perspective-1000">
                      <div className="transform transition-all duration-1000 hover:rotate-y-12 hover:scale-110 animate-scale-in" 
                           style={{ 
                             animationDelay: '0.5s',
                             transformStyle: 'preserve-3d'
                           }}>
                        <img 
                          src={slide.image}
                          alt={slide.description}
                          className="w-96 h-96 object-cover rounded-full shadow-2xl transform transition-all duration-500 hover:shadow-pink-500/25 relative z-10"
                          style={{
                            filter: 'drop-shadow(0 25px 50px rgba(236, 72, 153, 0.3))'
                          }}
                        />
                        {/* 3D Ring Effect */}
                        <div className="absolute inset-0 w-96 h-96 rounded-full border-4 border-white/30 transform rotate-x-75 scale-110 -z-10" 
                             style={{ 
                               transformStyle: 'preserve-3d',
                               animation: 'spin 8s linear infinite' 
                             }}></div>
                        <div className="absolute inset-0 w-96 h-96 rounded-full border-2 border-pink-200/50 transform rotate-y-45 scale-125 -z-20" 
                             style={{ 
                               transformStyle: 'preserve-3d',
                               animation: 'spin 12s linear infinite reverse' 
                             }}></div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-8 bg-white/20 border-white/30 text-white hover:bg-white/30 transform transition-all duration-300 hover:scale-110" />
            <CarouselNext className="right-8 bg-white/20 border-white/30 text-white hover:bg-white/30 transform transition-all duration-300 hover:scale-110" />
          </Carousel>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-script text-gray-800 mb-6">About Our Company</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                CakesRBakes brings you the finest quality cakes made with love and care. 
                Our expert bakers use only the finest ingredients to create delicious treats 
                that make every celebration special. From custom wedding cakes to birthday 
                surprises, we craft each cake to perfection.
              </p>
              <Button 
                asChild
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full"
              >
                <Link to="/about">Read More</Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=400&fit=crop" 
                alt="Our Bakery" 
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-script text-gray-800 mb-4">Delicious Cake Creations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore Our Wide Range of Flavors and Designs. Discover the Perfect Cake for Every Occasion!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCakes.map((cake) => (
              <Card key={cake.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={cake.image} 
                    alt={cake.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-0">
                  <div className="bg-pink-400 text-white p-4">
                    <p className="text-sm opacity-90 mb-1">{cake.category}</p>
                    <h3 className="text-lg font-semibold mb-2">{cake.name}</h3>
                    <p className="text-xl font-bold">{cake.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full"
            >
              <Link to="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-pink-400 text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-white rounded-t-[100px]"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-script mb-8">What our Customers Say</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-0 text-white">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">
                  "Bringing sweetness to your celebrations with love and care. 
                  CakesRBakes, where every bite is crafted to be a delightful experience!"
                </p>
                <div className="flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" 
                    alt="Customer" 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm opacity-80">Happy Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
