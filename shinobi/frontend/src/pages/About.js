import React from 'react';
import { Award, Target, Users, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Award size={40} />,
      title: 'Quality First',
      description: 'We never compromise on quality. Every product undergoes rigorous testing.'
    },
    {
      icon: <Users size={40} />,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We listen, adapt, and deliver.'
    },
    {
      icon: <Target size={40} />,
      title: 'Innovation',
      description: 'Constantly evolving to bring you the latest in home technology.'
    },
    {
      icon: <Shield size={40} />,
      title: 'Reliability',
      description: 'Backed by comprehensive warranties and dedicated support.'
    }
  ];

  const timeline = [
    { year: '2020', event: 'SHINOBI founded with a vision to transform smart living' },
    { year: '2021', event: 'Launched first product line - Coffee & Kitchen series' },
    { year: '2022', event: 'Expanded to Home Appliances, reached 10,000+ customers' },
    { year: '2023', event: 'Introduced Accessories line, expanded across UAE' },
    { year: '2024', event: 'Achieved excellence in quality and customer satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="about-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-shinobi-dark to-gray-800 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="about-title">
            About SHINOBI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bringing premium quality and modern design to every home
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-shinobi-dark mb-6" data-testid="brand-story-title">
                Our Story
              </h2>
              <div className="space-y-4 text-shinobi-gray">
                <p>
                  SHINOBI was born from a simple belief: everyone deserves access to premium quality home appliances that combine functionality, style, and reliability.
                </p>
                <p>
                  We started our journey with a passion for innovation and a commitment to excellence. Today, we're proud to serve thousands of customers across the UAE, bringing smart solutions to modern living.
                </p>
                <p>
                  Every SHINOBI product is carefully designed and tested to ensure it meets our high standards. From coffee machines to home appliances, we believe in creating products that make your daily life better.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" 
                alt="SHINOBI Products" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-shinobi-dark mb-4">Our Mission & Values</h2>
            <div className="w-24 h-1 bg-shinobi-gold mx-auto"></div>
          </div>
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg mb-12">
            <h3 className="text-2xl font-bold text-shinobi-dark mb-4">Our Mission</h3>
            <p className="text-shinobi-gray text-lg">
              To empower homes with innovative, high-quality appliances that enhance daily living while maintaining affordability and exceptional customer service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow text-center"
                data-testid={`value-${index}`}
              >
                <div className="text-shinobi-red mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-shinobi-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-shinobi-gray">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support & Warranty */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-shinobi-red to-red-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6" data-testid="warranty-title">Warranty & Support</h2>
                <div className="space-y-4">
                  <p className="text-lg">
                    All SHINOBI products come with a comprehensive 2-year warranty covering manufacturing defects and performance issues.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>24/7 customer support via email and phone</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Free replacement for defective products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Expert technical assistance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Easy return and exchange policy</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Shield size={180} className="text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Customers Trust Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-shinobi-dark mb-12 text-center" data-testid="trust-title">
            Why Customers Trust Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-5xl font-bold text-shinobi-red mb-2">10,000+</h3>
              <p className="text-shinobi-gray">Happy Customers</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-5xl font-bold text-shinobi-red mb-2">4.8/5</h3>
              <p className="text-shinobi-gray">Average Rating</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-5xl font-bold text-shinobi-red mb-2">2 Years</h3>
              <p className="text-shinobi-gray">Warranty Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-shinobi-dark mb-12 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-8 mb-8" data-testid={`timeline-${index}`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-shinobi-red rounded-full flex items-center justify-center text-white font-bold">
                    {item.year}
                  </div>
                  {index !== timeline.length - 1 && (
                    <div className="w-1 h-full bg-shinobi-red/30 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-shinobi-gray text-lg">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
