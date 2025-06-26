
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "5000+" },
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: Clock, label: "Years Experience", value: "8+" },
    { icon: Star, label: "Average Rating", value: "4.9" }
  ];

  const team = [
    {
      name: "Sarah Martinez",
      role: "Head Pastry Chef",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "With over 12 years of experience in pastry arts, Sarah leads our creative team in crafting extraordinary cakes."
    },
    {
      name: "Michael Chen",
      role: "Cake Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Michael specializes in custom cake designs and has won multiple awards for his innovative creations."
    },
    {
      name: "Emma Thompson",
      role: "Quality Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Emma ensures every product meets our highest standards of quality and freshness."
    }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We use only the finest ingredients sourced from trusted suppliers to ensure exceptional taste and quality.",
      icon: "🏆"
    },
    {
      title: "Customer Satisfaction",
      description: "Your happiness is our priority. We go above and beyond to exceed your expectations with every order.",
      icon: "❤️"
    },
    {
      title: "Innovation",
      description: "We constantly innovate our recipes and designs to bring you the latest trends in cake artistry.",
      icon: "💡"
    },
    {
      title: "Sustainability",
      description: "We're committed to environmentally friendly practices in our sourcing and packaging processes.",
      icon: "🌱"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-script mb-4">About CakesRBakes</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Crafting Sweet Memories Since 2016. Discover the passion and dedication behind every delicious creation.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-pink-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Badge variant="outline" className="mb-4 text-pink-500 border-pink-500">Our Story</Badge>
              <h2 className="text-3xl font-script text-gray-800 mb-6">How It All Started</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                CakesRBakes began as a small family business in 2016, born from our founder's passion for creating 
                exceptional cakes that bring joy to life's most precious moments. What started as a home-based 
                operation has grown into a beloved bakery serving thousands of satisfied customers.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our journey has been filled with sweet successes, from our first birthday cake order to becoming 
                the go-to destination for wedding cakes, corporate events, and special celebrations. Every cake 
                tells a story, and we're honored to be part of yours.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to uphold the same values that started it all: quality ingredients, 
                exceptional craftsmanship, and a commitment to making every celebration unforgettable.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=500&fit=crop" 
                alt="Our bakery kitchen" 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-pink-50 border-pink-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-script text-pink-600 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To create exceptional cakes and provide premium baking ingredients that bring sweetness 
                  to life's most important moments. We strive to exceed expectations through quality, 
                  creativity, and personalized service that makes every celebration memorable.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-script text-blue-600 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be the leading destination for custom cakes and baking supplies, known for our 
                  innovation, quality, and commitment to customer satisfaction. We envision expanding 
                  our reach while maintaining the personal touch that makes us special.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-pink-500 border-pink-500">Our Values</Badge>
              <h2 className="text-3xl font-script text-gray-800 mb-4">What Drives Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our core values guide everything we do, from ingredient selection to customer service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-pink-500 border-pink-500">Our Team</Badge>
              <h2 className="text-3xl font-script text-gray-800 mb-4">Meet the Masters</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Behind every perfect cake is a team of passionate professionals dedicated to their craft.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-pink-200">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-pink-500 border-pink-500">Our Process</Badge>
              <h2 className="text-3xl font-script text-gray-800 mb-4">From Concept to Creation</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every cake goes through our carefully crafted process to ensure perfection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Consultation", description: "We discuss your vision, preferences, and requirements in detail." },
                { step: "02", title: "Design", description: "Our team creates a custom design that brings your vision to life." },
                { step: "03", title: "Creation", description: "Expert bakers craft your cake using premium ingredients and techniques." },
                { step: "04", title: "Delivery", description: "We ensure your cake arrives fresh and beautiful for your special moment." }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="bg-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collection Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-pink-500 border-pink-500">Our Gallery</Badge>
              <h2 className="text-4xl font-script text-gray-800 mb-4">Sweet Inspirations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our stunning collection of cake creations that showcase our artistry and attention to detail.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop"
              ].map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
                  <img 
                    src={image} 
                    alt={`Gallery item ${index + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
