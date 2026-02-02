import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // In a real app, send to backend API
    // For now, just show success message
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="contact-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-shinobi-dark to-gray-800 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="contact-title">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-shinobi-dark mb-6">Send us a Message</h2>
              
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6" data-testid="success-message">
                  <p className="font-semibold">Thank you for contacting us!</p>
                  <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} data-testid="contact-form">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-shinobi-dark font-medium mb-2">
                    Name <span className="text-shinobi-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Your full name"
                    data-testid="name-input"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1" data-testid="name-error">{errors.name}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-shinobi-dark font-medium mb-2">
                    Email <span className="text-shinobi-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="your.email@example.com"
                    data-testid="email-input"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1" data-testid="email-error">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-shinobi-dark font-medium mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+971 XX XXX XXXX"
                    data-testid="phone-input"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-shinobi-dark font-medium mb-2">
                    Message <span className="text-shinobi-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`input-field resize-none ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                    placeholder="How can we help you?"
                    data-testid="message-input"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1" data-testid="message-error">{errors.message}</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full flex items-center justify-center"
                  data-testid="submit-button"
                >
                  Send Message
                  <Send size={18} className="ml-2" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-shinobi-dark mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                  <div className="bg-shinobi-red/10 p-3 rounded-lg">
                    <Mail className="text-shinobi-red" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-shinobi-dark mb-1">Email</h3>
                    <a 
                      href="mailto:info@shinobi-appliances.com" 
                      className="text-shinobi-gray hover:text-shinobi-red transition-colors"
                      data-testid="contact-email"
                    >
                      info@shinobi-appliances.com
                    </a>
                    <p className="text-sm text-shinobi-gray mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                  <div className="bg-shinobi-red/10 p-3 rounded-lg">
                    <Phone className="text-shinobi-red" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-shinobi-dark mb-1">Phone</h3>
                    <p className="text-shinobi-gray">+971 XX XXX XXXX</p>
                    <p className="text-sm text-shinobi-gray mt-1">Mon-Sat: 9AM - 6PM</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                  <div className="bg-shinobi-red/10 p-3 rounded-lg">
                    <MapPin className="text-shinobi-red" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-shinobi-dark mb-1">Location</h3>
                    <p className="text-shinobi-gray">United Arab Emirates</p>
                    <p className="text-sm text-shinobi-gray mt-1">Serving customers across UAE</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-shinobi-red to-red-700 rounded-xl p-6 text-white mt-6">
                <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
