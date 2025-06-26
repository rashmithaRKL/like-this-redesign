
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("featured");

  const products = [
    {
      id: 1,
      name: "Sutin Martin Cake",
      price: "Rs. 7500.00",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      category: "cakes",
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      name: "Vanilla Car Design",
      price: "Rs. 6500.00",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      category: "cakes",
      rating: 4.7,
      reviews: 18
    },
    {
      id: 3,
      name: "Engagement Cake",
      price: "Rs. 10000.00",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop",
      category: "cakes",
      rating: 4.9,
      reviews: 32
    },
    {
      id: 4,
      name: "Vanilla Cake",
      price: "Rs. 4500.00",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop",
      category: "cakes",
      rating: 4.6,
      reviews: 15
    },
    {
      id: 5,
      name: "EDP Gold Color",
      price: "Rs. 350.00",
      image: "https://images.unsplash.com/photo-1587736149250-04c3b1edf0f0?w=400&h=300&fit=crop",
      category: "ingredients",
      rating: 4.5,
      reviews: 8
    },
    {
      id: 6,
      name: "EDP Silver Color",
      price: "Rs. 350.00",
      image: "https://images.unsplash.com/photo-1587736149250-04c3b1edf0f0?w=400&h=300&fit=crop",
      category: "ingredients",
      rating: 4.4,
      reviews: 6
    },
    {
      id: 7,
      name: "Birthday Cake Topper",
      price: "Rs. 350.00",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      category: "decorations",
      rating: 4.3,
      reviews: 12
    }
  ];

  const filteredProducts = products.filter(product => {
    return selectedCategory === "all" || product.category === selectedCategory;
  });

  const categories = [
    { id: "all", name: "All Items", count: products.length, icon: "🎂" },
    { id: "cakes", name: "Cakes", count: products.filter(p => p.category === "cakes").length, icon: "🧁" },
    { id: "ingredients", name: "Ingredients", count: products.filter(p => p.category === "ingredients").length, icon: "🥄" },
    { id: "decorations", name: "Decorations", count: products.filter(p => p.category === "decorations").length, icon: "🎀" }
  ];

  const weights = ["200g", "500g", "1 Kg", "1.5 Kg", "2 Kg", "2.5 Kg", "3 Kg"];

  const handleWeightChange = (weight: string, checked: boolean) => {
    if (checked) {
      setSelectedWeights([...selectedWeights, weight]);
    } else {
      setSelectedWeights(selectedWeights.filter(w => w !== weight));
    }
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedWeights([]);
    setPriceRange({ min: "", max: "" });
    setSortBy("featured");
  };

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
          {/* Categories Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                    selectedCategory === category.id
                      ? 'border-pink-500 bg-pink-50 shadow-lg'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} items</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Improved Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg border p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-pink-500" />
                    Filters
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                </div>
                
                {/* Sort By */}
                <div className="mb-6">
                  <Label className="text-base font-medium mb-3 block">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Weight Filter */}
                <div className="mb-6">
                  <Label className="text-base font-medium mb-3 block">Weight</Label>
                  <div className="space-y-3">
                    {weights.map((weight) => (
                      <div key={weight} className="flex items-center space-x-3">
                        <Checkbox 
                          id={weight} 
                          checked={selectedWeights.includes(weight)}
                          onCheckedChange={(checked) => handleWeightChange(weight, checked as boolean)}
                          className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                        />
                        <Label 
                          htmlFor={weight} 
                          className="text-sm font-medium cursor-pointer flex-1 hover:text-pink-600"
                        >
                          {weight}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <Label className="text-base font-medium mb-3 block">Price Range</Label>
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        placeholder="Min price"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rs.</span>
                    </div>
                    <div className="relative">
                      <Input
                        placeholder="Max price"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rs.</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <Label className="text-base font-medium mb-3 block">Minimum Rating</Label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <Checkbox id={`rating-${rating}`} />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">& above</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-0">
                        <div className="bg-white p-4">
                          <p className="text-sm text-pink-500 mb-1 capitalize font-medium">{product.category}</p>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-pink-600 transition-colors">{product.name}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-pink-600">{product.price}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">({product.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
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
