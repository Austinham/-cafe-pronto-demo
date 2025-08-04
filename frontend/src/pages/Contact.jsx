import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { mockData } from '../mock';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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
    // Mock form submission
    console.log('Form submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting Cafe Pronto. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl font-bold text-amber-800 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our menu, catering services, or want to provide feedback? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-800 font-serif">Visit Our Cafe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Address</h4>
                    <p className="text-gray-600">{mockData.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Phone</h4>
                    <p className="text-gray-600">{mockData.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Email</h4>
                    <p className="text-gray-600">{mockData.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Hours</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>{mockData.contact.hours.weekdays}</p>
                      <p>{mockData.contact.hours.weekends}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Services */}
            <Card className="border-amber-200 shadow-lg bg-gradient-to-br from-amber-50 to-white">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-800 font-serif">Special Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-amber-600 pl-4">
                    <h4 className="font-semibold text-amber-800">Corporate Catering</h4>
                    <p className="text-gray-600 text-sm">
                      Perfect for meetings, conferences, and office events. 
                      We deliver fresh coffee and treats right to your workplace.
                    </p>
                  </div>
                  <div className="border-l-4 border-amber-600 pl-4">
                    <h4 className="font-semibold text-amber-800">Event Planning</h4>
                    <p className="text-gray-600 text-sm">
                      Let us help make your special occasions memorable with our 
                      premium beverages and dessert platters.
                    </p>
                  </div>
                  <div className="border-l-4 border-amber-600 pl-4">
                    <h4 className="font-semibold text-amber-800">Bulk Orders</h4>
                    <p className="text-gray-600 text-sm">
                      Need coffee for a large group? We offer special pricing 
                      for bulk orders and regular customers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-800 font-serif">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    placeholder="Enter your full name"
                  />
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
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-amber-800 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 resize-none"
                    placeholder="Tell us about your inquiry, catering needs, feedback, or any questions you may have..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  We typically respond within 2-4 hours during business hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;