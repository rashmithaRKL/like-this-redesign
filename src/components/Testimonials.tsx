
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Birthday Party Host",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      comment: "CakesRBakes made my daughter's 5th birthday absolutely magical! The unicorn cake was not only beautiful but incredibly delicious. Every guest was asking where we got it from. The attention to detail was outstanding!",
      cakeType: "Unicorn Birthday Cake"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Wedding Planner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      comment: "As a wedding planner, I work with many vendors, but CakesRBakes consistently delivers excellence. Their wedding cakes are works of art that taste as amazing as they look. My clients are always thrilled!",
      cakeType: "3-Tier Wedding Cake"
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Corporate Event Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      comment: "We ordered a custom corporate cake for our company's 10th anniversary. The team perfectly captured our brand colors and logo. The cake was the highlight of our celebration and everyone loved it!",
      cakeType: "Corporate Anniversary Cake"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Father of Two",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      comment: "The quality and taste are unmatched! We've ordered multiple cakes for our family celebrations, and each one has been perfect. The kids especially love the creative designs. Highly recommended!",
      cakeType: "Custom Theme Cakes"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Food Blogger",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      comment: "As someone who reviews desserts professionally, I can confidently say CakesRBakes sets the gold standard. The flavors are sophisticated, textures perfect, and presentation is always Instagram-worthy!",
      cakeType: "Gourmet Flavor Collection"
    },
    {
      id: 6,
      name: "Robert Williams",
      role: "Restaurant Owner",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      comment: "We've been sourcing desserts from CakesRBakes for our restaurant's special occasions menu. Their consistency in quality and innovative flavors keep our customers coming back for more!",
      cakeType: "Restaurant Dessert Menu"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-script text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Don't just take our word for it - hear from our delighted customers who've made their celebrations extra sweet with us!
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">4.9/5 from 500+ reviews</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 relative">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-8 h-8 text-pink-500" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Comment */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                
                {/* Cake type badge */}
                <div className="mb-4">
                  <span className="inline-block bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full font-medium">
                    {testimonial.cakeType}
                  </span>
                </div>
                
                {/* Customer info */}
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4 border-2 border-pink-200">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-pink-100 text-pink-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-pink-200">
            <h3 className="text-2xl font-script text-gray-800 mb-4">Ready to Create Your Sweet Memory?</h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of satisfied customers who've made their celebrations unforgettable with our delicious cakes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Order Your Cake
              </button>
              <button className="border border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full font-semibold transition-colors">
                View Our Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
