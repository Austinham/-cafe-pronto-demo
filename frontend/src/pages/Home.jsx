import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, GlassWater, Cake, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { mockData } from '../mock';

const Home = () => {
  const categoriesRef = useRef(null);
  const testimonialRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const sections = [categoriesRef, testimonialRef];
    sections.forEach(ref => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = 'translateY(50px)';
        ref.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Gradient Overlay - More opaque on left, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        
        {/* Left-aligned Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Welcome Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-white/90 text-sm font-medium">Welcome to Cafe Pronto</span>
            </div>

            {/* Main Headline */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Quality Coffee{' '}
              <span className="text-white/70">Served Quickly</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light leading-relaxed">
              Experience the perfect balance of speed and excellence. Where premium coffee meets efficient service in the heart of your neighborhood.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/menu">
                <Button 
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  View Our Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/catering">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-medium transition-all duration-300"
                >
                  Catering Services
                </Button>
              </Link>
            </div>

            {/* Glass Morphism Catering Callout */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-lg">
              <h3 
                className="text-2xl font-semibold mb-3 text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Professional Catering
              </h3>
              <p className="text-white/90 mb-4 leading-relaxed">
                Perfect for corporate events, meetings, and special occasions. 
                We bring the Cafe Pronto experience directly to you.
              </p>
              <div className="text-white/80 text-sm">
                <span className="inline-flex items-center">
                  ✓ Same-day service available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-24" style={{ backgroundColor: '#F5F1E8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#5A3921' }}
            >
              Our Specialties
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#8B614D' }}>
              Discover our carefully curated selection of premium beverages and artisanal desserts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coffee Card */}
            <Card 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 overflow-hidden"
              style={{ backgroundColor: '#5A3921' }}
            >
              <CardContent className="p-8 text-center text-white">
                <div className="mb-6 flex justify-center">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Coffee className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Coffee
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Premium coffee blends crafted by expert baristas using carefully sourced beans from around the world
                </p>
              </CardContent>
            </Card>

            {/* Smoothies Card */}
            <Card 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 overflow-hidden"
              style={{ backgroundColor: '#D1D9CE' }}
            >
              <CardContent className="p-8 text-center" style={{ color: '#5A3921' }}>
                <div className="mb-6 flex justify-center">
                  <div className="bg-white/30 p-4 rounded-full">
                    <GlassWater className="h-12 w-12" style={{ color: '#5A3921' }} />
                  </div>
                </div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Smoothies
                </h3>
                <p className="opacity-80 leading-relaxed">
                  Fresh fruit smoothies made with organic ingredients and natural sweeteners for a healthy boost
                </p>
              </CardContent>
            </Card>

            {/* Cheesecakes Card */}
            <Card 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 overflow-hidden"
              style={{ backgroundColor: '#8B614D' }}
            >
              <CardContent className="p-8 text-center text-white">
                <div className="mb-6 flex justify-center">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Cake className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Cheesecakes
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Artisanal cheesecakes baked fresh daily with premium ingredients and creative seasonal flavors
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section ref={testimonialRef} className="py-24" style={{ backgroundColor: '#5A3921' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
              ))}
            </div>
            <blockquote 
              className="text-3xl md:text-4xl font-bold text-white mb-8 leading-relaxed"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              "The perfect blend of speed and quality. I get my daily coffee fix in under 3 minutes without compromising on taste. Cafe Pronto has revolutionized my morning routine."
            </blockquote>
            <div className="text-white/80">
              <p className="font-semibold text-xl mb-1" style={{ color: '#F5F1E8' }}>Sarah Johnson</p>
              <p className="text-white/70">Daily Customer & Downtown Professional</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#F5F1E8' }}>1000+</div>
              <p className="text-white/80">Daily Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#F5F1E8' }}>3 min</div>
              <p className="text-white/80">Average Service Time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#F5F1E8' }}>200+</div>
              <p className="text-white/80">Events Catered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;