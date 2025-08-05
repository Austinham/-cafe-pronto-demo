import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle, Star, Coffee, Cake } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const Catering = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    eventType: '',
    requirements: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Catering inquiry submitted:', formData);
    toast({
      title: "Catering Inquiry Sent!",
      description: "Thank you for your interest. Our catering team will contact you within 24 hours.",
    });
    setFormData({
      name: '', email: '', phone: '', eventDate: '', 
      guestCount: '', eventType: '', requirements: ''
    });
  };

  const packages = [
    {
      title: "Coffee Break Package",
      description: "Perfect for meetings and small gatherings",
      price: "Starting at $8/person",
      features: [
        "Premium coffee and tea selection",
        "Fresh pastries and muffins",
        "Seasonal fruit display",
        "Setup and cleanup included"
      ],
      icon: Coffee,
      minGuests: "10-25 guests"
    },
    {
      title: "Executive Package",
      description: "Ideal for corporate events and conferences",
      price: "Starting at $15/person",
      features: [
        "Gourmet coffee bar with barista",
        "Assorted sandwiches and wraps",
        "Fresh smoothie station",
        "Premium dessert selection",
        "Professional service staff"
      ],
      icon: Users,
      minGuests: "25-100 guests"
    },
    {
      title: "Premium Celebration",
      description: "Perfect for special occasions and large events",
      price: "Starting at $25/person",
      features: [
        "Full beverage service",
        "Artisanal cheesecake bar",
        "Custom coffee blends",
        "Dedicated event coordinator",
        "Complete table service"
      ],
      icon: Cake,
      minGuests: "50+ guests"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl font-bold text-amber-800 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Professional Catering Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bring the Cafe Pronto experience to your next event. From intimate meetings to large celebrations, 
            we provide exceptional coffee, fresh food, and professional service that will impress your guests.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Clock, title: "Quick Setup", desc: "Professional setup in under 30 minutes" },
            { icon: CheckCircle, title: "Quality Guaranteed", desc: "Same premium quality as our cafe" },
            { icon: Users, title: "Any Size Event", desc: "From 10 to 500+ guests" },
            { icon: Star, title: "5-Star Service", desc: "Dedicated event coordinators" }
          ].map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-amber-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Packages */}
        <div className="mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-amber-800 text-center mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Catering Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <Card 
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-amber-200"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <CardTitle 
                      className="text-2xl text-amber-800 mb-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {pkg.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                    <p className="text-2xl font-bold text-amber-600">{pkg.price}</p>
                    <p className="text-sm text-amber-700 font-medium">{pkg.minGuests}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle 
                className="text-2xl text-amber-800"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Request a Quote
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-2">
                      Contact Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-amber-800 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-amber-200 focus:border-amber-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-amber-800 mb-2">
                      Event Date *
                    </label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium text-amber-800 mb-2">
                      Number of Guests *
                    </label>
                    <Input
                      id="guestCount"
                      name="guestCount"
                      type="number"
                      required
                      min="10"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-500"
                      placeholder="e.g., 50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-amber-800 mb-2">
                    Event Type
                  </label>
                  <Input
                    id="eventType"
                    name="eventType"
                    type="text"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="border-amber-200 focus:border-amber-500"
                    placeholder="e.g., Corporate meeting, wedding, birthday party"
                  />
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-amber-800 mb-2">
                    Special Requirements
                  </label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={handleInputChange}
                    className="border-amber-200 focus:border-amber-500"
                    placeholder="Tell us about dietary restrictions, setup preferences, or any special requests..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-medium"
                >
                  Request Quote
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="space-y-8">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle 
                  className="text-2xl text-amber-800"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Why Choose Our Catering?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-amber-600 pl-4">
                  <h4 className="font-semibold text-amber-800 mb-1">Fresh & Fast</h4>
                  <p className="text-gray-600 text-sm">
                    Everything is prepared fresh on-site or delivered hot from our kitchen within hours of your event.
                  </p>
                </div>
                <div className="border-l-4 border-amber-600 pl-4">
                  <h4 className="font-semibold text-amber-800 mb-1">Professional Service</h4>
                  <p className="text-gray-600 text-sm">
                    Our trained staff handles setup, service, and cleanup so you can focus on your guests.
                  </p>
                </div>
                <div className="border-l-4 border-amber-600 pl-4">
                  <h4 className="font-semibold text-amber-800 mb-1">Flexible Options</h4>
                  <p className="text-gray-600 text-sm">
                    From drop-off service to full-service events, we customize our offerings to fit your needs and budget.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-amber-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-amber-800 mb-4">Need It Fast?</h3>
                <p className="text-amber-700 mb-6">
                  For last-minute events or urgent catering needs, call us directly. 
                  We often accommodate same-day requests for smaller groups.
                </p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-amber-800">(555) 123-CAFE</p>
                  <p className="text-sm text-amber-600">Available 7 days a week</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catering;