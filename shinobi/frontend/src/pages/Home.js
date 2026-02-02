import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Truck, Shield, Sparkles } from 'lucide-react';
import productsData from '../data/products.json';

const Home = () => {
  const newLaunches = productsData.products.filter(p => p.newLaunch).slice(0, 3);
  const featuredProducts = productsData.products.filter(p => p.featured).slice(0, 4);

  const categories = [
    { name: 'Kitchen / Coffee', slug: 'kitchen-coffee', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80' },
    { name: 'Home Appliances', slug: 'home-appliances', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80' }
  ];

  const benefits = [
    {
      icon: <Award size={40} />,
      title: 'Premium Quality',
      description: 'Every product meets our high standards for durability and performance'
    },
    {
      icon: <Shield size={40} />,
      title: 'Warranty & Support',
      description: '2-year warranty with dedicated customer support'
    },
    {
      icon: <Truck size={40} />,
      title: 'Fast Shipping',
      description: 'Quick delivery across UAE with secure packaging'
    },
    {
      icon: <Sparkles size={40} />,
      title: 'Modern Design',
      description: 'Sleek, contemporary designs that complement any space'
    }
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white section-padding" data-testid="hero-section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-shinobi-dark mb-6 leading-tight" data-testid="hero-headline">
                SHINOBI — Smart Home & Lifestyle Products
              </h1>
              <p className="text-xl text-shinobi-gray mb-8">
                Premium quality. Practical design. Modern living.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn-primary inline-flex items-center justify-center" data-testid="explore-products-btn">
                  Explore Products
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link to="/contact" className="btn-secondary inline-flex items-center justify-center" data-testid="contact-us-btn">
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
                alt="SHINOBI Products" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Launches Section */}
      <section className="section-padding bg-white" data-testid="new-launches-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-shinobi-dark mb-4">New Launches</h2>
            <div className="w-24 h-1 bg-shinobi-gold mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {newLaunches.map((product) => (
              <Link 
                key={product.id} 
                to={`/products/${product.slug}`} 
                className="card overflow-hidden group"
                data-testid={`new-launch-${product.slug}`}
              >
                <div className="overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-shinobi-gold uppercase tracking-wider">
                    New Launch
                  </span>
                  <h3 className="text-xl font-semibold text-shinobi-dark mt-2 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-shinobi-gray mb-4">
                    {product.shortDescription}
                  </p>
                  <button className="text-shinobi-red font-medium inline-flex items-center group-hover:gap-2 transition-all">
                    View Details
                    <ArrowRight className="ml-1 group-hover:ml-2 transition-all" size={18} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why SHINOBI Section */}
      <section className="section-padding bg-gray-50" data-testid="why-shinobi-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-shinobi-dark mb-4">Why SHINOBI</h2>
            <p className="text-shinobi-gray text-lg max-w-2xl mx-auto">
              We're committed to delivering exceptional products and service that exceed your expectations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow text-center"
                data-testid={`benefit-${index}`}
              >
                <div className="text-shinobi-red mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-shinobi-dark mb-3">
                  {benefit.title}
                </h3>
                <p className="text-shinobi-gray">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-padding bg-white" data-testid="featured-categories-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-shinobi-dark mb-4">Featured Categories</h2>
            <div className="w-24 h-1 bg-shinobi-gold mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                to={`/products?category=${category.slug}`}
                className="relative overflow-hidden rounded-xl shadow-lg group h-80"
                data-testid={`category-${category.slug}`}
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white w-full">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <button className="text-shinobi-gold font-medium inline-flex items-center group-hover:gap-2 transition-all">
                      Explore Category
                      <ArrowRight className="ml-1 group-hover:ml-2 transition-all" size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gray-50" data-testid="featured-products-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-shinobi-dark mb-4">Featured Products</h2>
            <p className="text-shinobi-gray text-lg">
              Discover our most popular items
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/products/${product.slug}`}
                className="card overflow-hidden group"
                data-testid={`featured-product-${product.slug}`}
              >
                <div className="overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-shinobi-gray uppercase">
                    {product.categoryLabel}
                  </span>
                  <h3 className="text-lg font-semibold text-shinobi-dark mt-1 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-shinobi-gray line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline" data-testid="view-all-products-btn">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
