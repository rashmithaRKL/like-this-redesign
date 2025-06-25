
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Product = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, this would come from API
  const product = {
    id: parseInt(id || "1"),
    name: "Sutin Martin Cake",
    price: "Rs. 7500.00",
    originalPrice: "Rs. 8500.00",
    rating: 4.8,
    reviewCount: 24,
    description: "A luxurious chocolate cake with layers of rich ganache and fresh berries. Perfect for special celebrations and memorable moments. Handcrafted with premium Belgian chocolate and the finest ingredients.",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&h=600&fit=crop"
    ],
    category: "Premium Cakes",
    tags: ["Chocolate", "Birthday", "Premium", "Handmade"],
    ingredients: ["Premium Belgian Chocolate", "Fresh Cream", "Organic Eggs", "Pure Vanilla", "Fresh Berries"],
    allergens: ["Eggs", "Dairy", "Gluten"],
    weight: "1 kg",
    servings: "8-10 people"
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely delicious! The cake was perfect for my daughter's birthday. The chocolate flavor was rich and the decoration was beautiful.",
      images: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      date: "1 week ago",
      comment: "Outstanding quality and taste. Will definitely order again for future celebrations!",
      images: []
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      rating: 4,
      date: "2 weeks ago",
      comment: "Great cake, loved the presentation. The delivery was on time and the cake was fresh.",
      images: [
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200&h=200&fit=crop"
      ]
    }
  ];

  const qnaData = [
    {
      id: 1,
      question: "How long does this cake stay fresh?",
      answer: "Our cakes stay fresh for 2-3 days when stored in the refrigerator. For best taste, we recommend consuming within 24 hours.",
      author: "CakesRBakes Team",
      date: "3 days ago"
    },
    {
      id: 2,
      question: "Can you customize the message on the cake?",
      answer: "Yes! We can add custom messages and decorations. Please mention your requirements in the special instructions when placing your order.",
      author: "CakesRBakes Team",
      date: "1 week ago"
    },
    {
      id: 3,
      question: "Is this cake suitable for vegetarians?",
      answer: "Yes, this cake is vegetarian-friendly. However, it contains eggs and dairy products.",
      author: "CakesRBakes Team",
      date: "2 weeks ago"
    }
  ];

  const similarProducts = [
    {
      id: 2,
      name: "Vanilla Car Design",
      price: "Rs. 6500.00",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=300&fit=crop",
      rating: 4.7
    },
    {
      id: 3,
      name: "Engagement Cake",
      price: "Rs. 10000.00",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=300&fit=crop",
      rating: 4.9
    },
    {
      id: 4,
      name: "Vanilla Cake",
      price: "Rs. 4500.00",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=300&h=300&fit=crop",
      rating: 4.6
    }
  ];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-pink-600">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-pink-600">Shop</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      selectedImageIndex === index ? 'ring-2 ring-pink-500' : ''
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover hover:scale-110 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-pink-600">{product.price}</span>
                  <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                  <Badge variant="destructive">12% OFF</Badge>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-500">Weight:</span>
                  <p className="text-gray-900">{product.weight}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Servings:</span>
                  <p className="text-gray-900">{product.servings}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-pink-500 hover:bg-pink-600">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                  <p className="text-gray-600 leading-relaxed">
                    Our {product.name} is carefully crafted by our expert bakers using traditional techniques 
                    combined with modern innovation. Each cake is made to order ensuring maximum freshness 
                    and quality. Perfect for birthdays, anniversaries, or any special celebration.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 mb-3">{review.comment}</p>
                          {review.images.length > 0 && (
                            <div className="flex space-x-2">
                              {review.images.map((image, index) => (
                                <img 
                                  key={index}
                                  src={image} 
                                  alt={`Review image ${index + 1}`}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="qa" className="mt-6">
              <div className="space-y-6">
                {qnaData.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Q: {item.question}</h4>
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Answered by {item.author}</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                      <ul className="space-y-2">
                        {product.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Allergen Information</h3>
                      <div className="space-y-2">
                        <p className="text-gray-600">Contains:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.allergens.map((allergen) => (
                            <Badge key={allergen} variant="secondary">{allergen}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Similar Products */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProducts.map((item) => (
                <Card key={item.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <Link to={`/product/${item.id}`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-pink-600">{item.price}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">{item.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Product;
