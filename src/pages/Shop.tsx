
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const products = [
    {
      id: 1,
      name: "Sutin Martin Cake",
      price: "Rs. 7500.00",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      category: "cakes"
    },
    {
      id: 2,
      name: "Vanilla Car Design",
      price: "Rs. 6500.00",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      category: "cakes"
    },
    {
      id: 3,
      name: "Engagement Cake",
      price: "Rs. 10000.00",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop",
      category: "cakes"
    },
    {
      id: 4,
      name: "Vanilla Cake",
      price: "Rs. 4500.00",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop",
      category: "cakes"
    },
    {
      id: 5,
      name: "EDP Gold Color",
      price: "Rs. 350.00",
      image: "https://images.unsplash.com/photo-1587736149250-04c3b1edf0f0?w=400&h=300&fit=crop",
      category: "ingredients"
    },
    {
      id: 6,
      name: "EDP Silver Color",
      price: "Rs. 350.00",
      image: "https://images.unsplash.com/photo-1587736149250-04c3b1edf0f0?w=400&h=300&fit=crop",
      category: "ingredients"
    },
    {
      id: 7,
      name: "Birthday Cake Topper",
      price: "Rs. 350.00",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      category: "decorations"
    }
  ];

  const filteredProducts = products.filter(product => {
    return selectedCategory === "all" || product.category === selectedCategory;
  });

  const categories = [
    { id: "all", name: "All Items", count: products.length },
    { id: "cakes", name: "Cakes", count: products.filter(p => p.category === "cakes").length },
    { id: "ingredients", name: "Ingredients", count: products.filter(p => p.category === "ingredients").length },
    { id: "decorations", name: "Decorations", count: products.filter(p => p.category === "decorations").length }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-script mb-4">Delicious Cake Creations</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Explore Our Wide Range of Flavors and Designs. Discover the Perfect Cake for Every Occasion
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Item</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategory === category.id}
                          onCheckedChange={() => setSelectedCategory(category.id)}
                        />
                        <Label htmlFor={category.id} className="text-sm">
                          {category.name} ({category.count})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weight Filter (for cakes) */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Weight</h4>
                  <div className="space-y-2">
                    {["500g", "1 Kg", "1.5 Kg", "2 Kg", "2.5 Kg"].map((weight) => (
                      <div key={weight} className="flex items-center space-x-2">
                        <Checkbox id={weight} />
                        <Label htmlFor={weight} className="text-sm">{weight}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <Input
                      placeholder="min price"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    />
                    <Input
                      placeholder="max price"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Rating</h4>
                  <div className="flex space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gray-300" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Click a star to rate!</p>
                </div>

                <Button className="w-full bg-pink-500 hover:bg-pink-600">
                  Clear all
                </Button>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-0">
                      <div className="bg-pink-400 text-white p-4">
                        <p className="text-sm opacity-90 mb-1 capitalize">{product.category}</p>
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-xl font-bold">{product.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
