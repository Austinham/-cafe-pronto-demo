import React, { useEffect, useState } from 'react';
import { Coffee, GlassWater, Cake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Menu = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Calculate total images for loading state
    const total = menuCategories.reduce((sum, category) => sum + category.items.length, 0);
    setTotalImages(total);
  }, []);

  // Optimized image URLs with smaller sizes and better compression
  const menuCategories = [
    {
      title: "Coffee & Espresso",
      icon: Coffee,
      items: [
        { 
          name: "Signature Espresso", 
          description: "Our house blend with rich, bold flavors", 
          price: "$4.50",
          image: "https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Caramel Macchiato", 
          description: "Espresso with steamed milk and caramel drizzle", 
          price: "$5.25",
          image: "https://images.unsplash.com/photo-1559001724-fbad036dbc9e?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Vanilla Latte", 
          description: "Smooth espresso with vanilla and steamed milk", 
          price: "$4.75",
          image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Cappuccino", 
          description: "Classic Italian espresso with frothed milk", 
          price: "$4.25",
          image: "https://images.unsplash.com/photo-1608070734668-e74dc3dda037?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Americano", 
          description: "Bold espresso shots with hot water", 
          price: "$3.75",
          image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Mocha", 
          description: "Espresso with chocolate and whipped cream", 
          price: "$5.00",
          image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400&h=300&fit=crop&crop=center&q=60"
        }
      ]
    },
    {
      title: "Fresh Smoothies",
      icon: GlassWater,
      items: [
        { 
          name: "Mango Paradise", 
          description: "Fresh mango, pineapple, and coconut milk", 
          price: "$6.75",
          image: "https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Berry Blast", 
          description: "Mixed berries, banana, and yogurt", 
          price: "$6.50",
          image: "https://images.unsplash.com/photo-1590301157284-ab2f8707bdc1?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Green Goddess", 
          description: "Spinach, apple, cucumber, and lime", 
          price: "$7.00",
          image: "https://images.unsplash.com/photo-1557568951-a691f75c810f?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Tropical Fusion", 
          description: "Pineapple, mango, and passion fruit", 
          price: "$6.75",
          image: "https://images.unsplash.com/photo-1621797350487-c8996f886ab1?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Protein Power", 
          description: "Banana, peanut butter, and protein powder", 
          price: "$7.25",
          image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Antioxidant Boost", 
          description: "Acai, blueberries, and pomegranate", 
          price: "$7.50",
          image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop&crop=center&q=60"
        }
      ]
    },
    {
      title: "Artisanal Cheesecakes",
      icon: Cake,
      items: [
        { 
          name: "Classic NY Cheesecake", 
          description: "Creamy cheesecake with graham cracker crust", 
          price: "$5.25",
          image: "https://images.unsplash.com/photo-1716579866950-54abe7d4286f?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Strawberry Swirl", 
          description: "Vanilla cheesecake with fresh strawberry ribbons", 
          price: "$5.75",
          image: "https://images.unsplash.com/photo-1716579870046-878e4d3f7c28?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Chocolate Decadence", 
          description: "Rich chocolate cheesecake with cocoa crust", 
          price: "$6.00",
          image: "https://images.unsplash.com/photo-1707528903686-91cbbe2f2985?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Blueberry Lemon", 
          description: "Tangy lemon cheesecake with blueberry compote", 
          price: "$5.75",
          image: "https://images.unsplash.com/photo-1710362778452-07fabf048bb1?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Salted Caramel", 
          description: "Creamy cheesecake with salted caramel topping", 
          price: "$6.25",
          image: "https://images.pexels.com/photos/9009967/pexels-photo-9009967.jpeg?w=400&h=300&fit=crop&crop=center&q=60"
        },
        { 
          name: "Seasonal Special", 
          description: "Ask about our rotating seasonal flavor", 
          price: "$6.50",
          image: "https://images.pexels.com/photos/29653155/pexels-photo-29653155.jpeg?w=400&h=300&fit=crop&crop=center&q=60"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: '#F5F1E8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#5A3921' }}
          >
            Our Menu
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-4" style={{ color: '#8B614D' }}>
            Discover our carefully crafted selection of premium beverages and artisanal desserts, 
            made fresh daily with the finest ingredients.
          </p>
          
          {/* Loading Indicator */}
          {imagesLoaded < totalImages && totalImages > 0 && (
            <div className="flex items-center justify-center space-x-2 text-amber-700">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
              <span className="text-sm">Loading menu items... ({imagesLoaded}/{totalImages})</span>
            </div>
          )}
        </div>

        {/* Menu Categories */}
        <div className="space-y-20">
          {menuCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex} className="relative">
                <div className="flex items-center justify-center mb-12">
                  <div className="flex items-center space-x-4">
                    <Icon className="h-10 w-10" style={{ color: '#8B614D' }} />
                    <h2 
                      className="text-3xl md:text-4xl font-bold"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#5A3921' }}
                    >
                      {category.title}
                    </h2>
                    <Icon className="h-10 w-10" style={{ color: '#8B614D' }} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <Card 
                      key={itemIndex}
                      className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white overflow-hidden"
                    >
                      {/* Item Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          loading="lazy"
                          onLoad={() => setImagesLoaded(prev => prev + 1)}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4">
                          <span 
                            className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-lg font-bold shadow-lg"
                            style={{ color: '#5A3921' }}
                          >
                            {item.price}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 
                          className="text-xl font-semibold mb-3 leading-tight"
                          style={{ fontFamily: 'Playfair Display, serif', color: '#5A3921' }}
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: '#8B614D' }}>
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center rounded-2xl p-12" style={{ backgroundColor: '#5A3921' }}>
          <h3 
            className="text-3xl font-bold mb-4 text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Can't Decide?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F1E8' }}>
            Visit us in-store and let our expert baristas recommend the perfect drink or treat for you. 
            We're always happy to customize your order to your taste preferences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div style={{ color: '#F5F1E8' }}>
              <span className="font-semibold">Open Daily:</span><br />
              Mon-Fri: 6AM-9PM | Sat-Sun: 7AM-10PM
            </div>
            <div style={{ color: '#F5F1E8' }}>
              <span className="font-semibold">Phone:</span><br />
              (555) 123-CAFE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;