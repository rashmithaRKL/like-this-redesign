
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-script mb-4">About Our Company</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Get in best Us For The Best high Quality Cake Ingredients and Tools.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-script text-gray-800 mb-6">Mission</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                What you do now fro whom how you do it what this achievement.
              </p>
              
              <h2 className="text-3xl font-script text-gray-800 mb-6">Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Wherever you go, whatever you need to succeed at the end of your mission, 
                you can get from us.
              </p>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=500&fit=crop" 
                alt="Elegant cakes display" 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Collection Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-script text-gray-800 mb-4">Our Collection</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover Our Stunning Image Collection. Find the Perfect Visuals for Every Occasion!
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
                <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={image} 
                    alt={`Collection item ${index + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
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
