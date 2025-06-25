
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
      title: "Sweet Delights",
      subtitle: "Fresh Cakes",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
      description: "Delicious Chocolate Cake",
      gradient: "from-pink-400 via-rose-300 to-pink-500",
      bgColor: "bg-pink-400"
    },
    {
      id: 2,
      title: "Golden Treats",
      subtitle: "Artisan Baking",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop",
      description: "Vanilla Dream Cake",
      gradient: "from-yellow-400 via-orange-300 to-yellow-500",
      bgColor: "bg-yellow-400"
    },
    {
      id: 3,
      title: "Fresh Creations",
      subtitle: "Custom Designs",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop",
      description: "Elegant Wedding Cake",
      gradient: "from-green-400 via-emerald-300 to-green-500",
      bgColor: "bg-green-400"
    },
    {
      id: 4,
      title: "Blue Berry Bliss",
      subtitle: "Seasonal Specials",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&h=600&fit=crop",
      description: "Berry Special Cake",
      gradient: "from-blue-400 via-cyan-300 to-blue-500",
      bgColor: "bg-blue-400"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Organic Design */}
      <section className="relative min-h-screen overflow-hidden">
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
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={slide.id}>
                <div className={`relative min-h-screen bg-gradient-to-br ${slide.gradient} overflow-hidden`}>
                  {/* Organic Background Shapes */}
                  <div className="absolute inset-0">
                    <div className={`absolute top-0 right-0 w-96 h-96 ${slide.bgColor} opacity-30 rounded-full transform translate-x-32 -translate-y-32`}></div>
                    <div className={`absolute bottom-0 left-0 w-full h-2/3 ${slide.bgColor} opacity-20`} 
                         style={{
                           clipPath: 'ellipse(80% 60% at 20% 100%)',
                         }}></div>
                    <div className={`absolute top-1/4 left-0 w-3/4 h-3/4 ${slide.bgColor} opacity-15`}
                         style={{
                           clipPath: 'ellipse(70% 80% at 0% 50%)',
                         }}></div>
                  </div>
                  
                  <div className="relative container mx-auto px-4 py-20 flex items-center min-h-screen">
                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                      {/* Left Content */}
                      <div className="text-white space-y-6 animate-fade-in">
                        <div className="space-y-2">
                          <h3 className="text-xl font-medium opacity-90">{slide.subtitle}</h3>
                          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                            {slide.title}
                          </h1>
                        </div>
                        
                        <p className="text-lg opacity-80 max-w-md leading-relaxed">
                          Cakes are so healthy, refreshing and the perfect way to pack some extra sweetness into your celebrations.
                        </p>
                        
                        {/* Small Product Previews */}
                        <div className="flex space-x-4 py-4">
                          {featuredCakes.slice(0, 4).map((cake, idx) => (
                            <div key={idx} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/60 transition-all cursor-pointer">
                              <img src={cake.image} alt={cake.name} className="w-full h-full object-cover" />
                            </div>
                          ))}
                          <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                            <span className="text-xs text-white">+</span>
                          </div>
                        </div>
                        
                        <Button 
                          asChild
                          className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                          <Link to="/shop">Order Now</Link>
                        </Button>
                      </div>
                      
                      {/* Right Content - Product Image */}
                      <div className="flex justify-center lg:justify-end">
                        <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
                          <div className="w-80 h-80 md:w-96 md:h-96 relative">
                            <img 
                              src={slide.image}
                              alt={slide.description}
                              className="w-full h-full object-cover rounded-full shadow-2xl transform transition-all duration-500 hover:scale-105"
                              style={{
                                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))'
                              }}
                            />
                            {/* Decorative elements around the image */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute top-1/3 -left-8 w-6 h-6 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-8 bg-white/20 border-white/30 text-white hover:bg-white/30" />
          <CarouselNext className="right-8 bg-white/20 border-white/30 text-white hover:bg-white/30" />
        </Carousel>
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
                <Link to={`/product/${cake.id}`}>
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
                </Link>
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
