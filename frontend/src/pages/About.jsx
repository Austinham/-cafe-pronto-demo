import React, { useEffect } from 'react';
import { Coffee, Clock, Award, Users, Heart, Leaf } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  const values = [
    {
      icon: Coffee,
      title: "Quality First",
      description: "We source the finest beans from around the world and craft each drink with precision and care."
    },
    {
      icon: Clock,
      title: "Speed Without Compromise",
      description: "Our streamlined processes ensure fast service while maintaining our high quality standards."
    },
    {
      icon: Heart,
      title: "Community Focused",
      description: "We're more than a cafe - we're a gathering place where relationships and ideas flourish."
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "From fair-trade sourcing to eco-friendly packaging, we care about our planet's future."
    }
  ];

  const team = [
    {
      name: "Maria Rodriguez",
      role: "Head Barista & Co-Founder",
      description: "15+ years of coffee expertise, trained in Italy and Colombia. Maria ensures every cup meets our exacting standards."
    },
    {
      name: "James Chen",
      role: "Operations Manager & Co-Founder", 
      description: "Former tech executive who brings efficiency innovation to cafe operations while maintaining the personal touch."
    },
    {
      name: "Sarah Kim",
      role: "Pastry Chef",
      description: "Culinary school graduate specializing in artisanal desserts. Creates our famous cheesecakes and seasonal treats."
    }
  ];

  const milestones = [
    { year: "2018", event: "Cafe Pronto opens its doors with a mission to serve quality coffee quickly" },
    { year: "2019", event: "Launched catering services, serving over 50 corporate clients in first year" },
    { year: "2020", event: "Adapted with contactless ordering and delivery during challenging times" },
    { year: "2022", event: "Expanded menu with fresh smoothies and artisanal cheesecakes" },
    { year: "2024", event: "Serving over 1,000 customers daily and catering 200+ events annually" }
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
            About Cafe Pronto
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Since 2018, we've been revolutionizing the coffee experience by proving that speed and quality 
            can coexist beautifully. Our story is one of passion, innovation, and community.
          </p>
        </div>

        {/* Hero Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold text-amber-800 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Cafe Pronto was born from a simple frustration: why should great coffee take forever? 
                Our founders, Maria and James, combined their expertise in coffee craftsmanship and 
                operational efficiency to create something special.
              </p>
              <p>
                What started as a single location has grown into a beloved community hub, but our 
                core mission remains unchanged - delivering exceptional coffee and treats with the 
                speed that modern life demands, without ever compromising on quality.
              </p>
              <p>
                Today, we're proud to serve over 1,000 customers daily and provide catering services 
                for hundreds of events each year, all while maintaining the personal touch and attention 
                to detail that makes each visit special.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg" 
              alt="Barista crafting coffee"
              className="rounded-lg shadow-lg h-48 w-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1556742526-795a8eac090e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MXwxfHNlYXJjaHwxfHxjb2ZmZWV8ZW58MHx8fHwxNzU0MzM1Njg0fDA&ixlib=rb-4.1.0&q=85" 
              alt="Coffee preparation"
              className="rounded-lg shadow-lg h-48 w-full object-cover mt-8"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 
            className="text-3xl md:text-4xl font-bold text-amber-800 text-center mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-amber-200"
                >
                  <CardContent className="p-6">
                    <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 
                      className="text-xl font-semibold text-amber-800 mb-3"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 
            className="text-3xl md:text-4xl font-bold text-amber-800 text-center mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="hover:shadow-lg transition-shadow duration-300 border-amber-200"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-amber-200 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-amber-700" />
                  </div>
                  <h3 
                    className="text-xl font-semibold text-amber-800 mb-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 
            className="text-3xl md:text-4xl font-bold text-amber-800 text-center mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Journey
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4 mb-8 last:mb-0">
                <div className="bg-amber-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-grow">
                  <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-amber-600">
                    <p className="text-gray-700 leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-12">
          <h3 
            className="text-3xl font-bold text-amber-800 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Join Our Community
          </h3>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you're a coffee connoisseur, a busy professional, or someone who appreciates quality and speed, 
            you'll find your place at Cafe Pronto. Visit us today and become part of our growing family.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <Award className="h-12 w-12 text-amber-600 mx-auto mb-2" />
              <p className="font-semibold text-amber-800">Award-Winning Coffee</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-amber-600 mx-auto mb-2" />
              <p className="font-semibold text-amber-800">3-Minute Promise</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-amber-600 mx-auto mb-2" />
              <p className="font-semibold text-amber-800">Community Driven</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;