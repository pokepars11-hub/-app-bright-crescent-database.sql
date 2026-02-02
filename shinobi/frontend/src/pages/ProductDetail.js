import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const product = productsData.products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-shinobi-dark mb-4">Product Not Found</h2>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const buyButtons = [
    { name: 'Amazon', key: 'amazon', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { name: 'Noon', key: 'noon', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Shopify', key: 'shopify', color: 'bg-green-600 hover:bg-green-700' },
    { name: 'Carrefour', key: 'carrefour', color: 'bg-red-600 hover:bg-red-700' }
  ];

  const availableBuyLinks = buyButtons.filter(btn => product.buyLinks[btn.key]);

  return (
    <div className="min-h-screen bg-gray-50" data-testid="product-detail-page">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-shinobi-gray hover:text-shinobi-red transition-colors"
            data-testid="back-button"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Product Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="card overflow-hidden mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover"
                  data-testid="main-product-image"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`card overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-shinobi-red' : 'border-transparent'
                    }`}
                    data-testid={`thumbnail-${index}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <span className="text-sm text-shinobi-gold uppercase font-semibold tracking-wider">
                {product.categoryLabel}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-shinobi-dark mt-2 mb-4" data-testid="product-name">
                {product.name}
              </h1>
              <p className="text-shinobi-gray text-lg mb-6" data-testid="product-description">
                {product.longDescription}
              </p>

              {/* Key Highlights */}
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-shinobi-dark mb-4">Key Highlights</h3>
                <ul className="space-y-2">
                  {product.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start" data-testid={`highlight-${index}`}>
                      <span className="text-shinobi-red mr-2">✓</span>
                      <span className="text-shinobi-gray">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buy Now Section */}
              <div className="bg-gradient-to-br from-shinobi-red to-red-700 rounded-xl p-6 text-white mb-6">
                <h3 className="text-xl font-semibold mb-4">Available at:</h3>
                {availableBuyLinks.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {availableBuyLinks.map((btn) => (
                      <a
                        key={btn.key}
                        href={product.buyLinks[btn.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${btn.color} text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all shadow-lg hover:shadow-xl`}
                        data-testid={`buy-${btn.key}`}
                      >
                        {btn.name}
                        <ExternalLink size={18} className="ml-2" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/90">Coming soon to online stores</p>
                )}
              </div>

              {/* Contact Support */}
              <Link 
                to="/contact" 
                className="btn-secondary w-full text-center"
                data-testid="contact-support-btn"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-shinobi-dark mb-8">Specifications</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-4" data-testid={`spec-${key.toLowerCase().replace(/\s+/g, '-')}`}>
                    <dt className="font-semibold text-shinobi-dark mb-1">{key}</dt>
                    <dd className="text-shinobi-gray">{value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          {product.faq && product.faq.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-shinobi-dark mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {product.faq.map((faqItem, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden" data-testid={`faq-${index}`}>
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      data-testid={`faq-question-${index}`}
                    >
                      <span className="font-semibold text-shinobi-dark">{faqItem.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp size={20} className="text-shinobi-red" />
                      ) : (
                        <ChevronDown size={20} className="text-shinobi-gray" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4 text-shinobi-gray" data-testid={`faq-answer-${index}`}>
                        {faqItem.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
