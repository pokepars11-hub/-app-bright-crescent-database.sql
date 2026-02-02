import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import productsData from '../data/products.json';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [filteredProducts, setFilteredProducts] = useState(productsData.products);

  const categories = [
    { label: 'All Products', value: 'all' },
    { label: 'Kitchen / Coffee', value: 'kitchen-coffee' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Accessories', value: 'accessories' }
  ];

  useEffect(() => {
    let results = productsData.products;

    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      results = results.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(results);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category !== 'all') {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="products-page">
      {/* Page Header */}
      <section className="bg-white py-12 border-b">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-shinobi-dark mb-4" data-testid="products-title">
            Our Products
          </h1>
          <p className="text-shinobi-gray text-lg">
            Explore our complete range of premium appliances
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-shinobi-gray" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shinobi-red focus:border-transparent outline-none"
                data-testid="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={20} className="text-shinobi-gray" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === cat.value
                        ? 'bg-shinobi-red text-white shadow-md'
                        : 'bg-white text-shinobi-dark border border-gray-300 hover:border-shinobi-red'
                    }`}
                    data-testid={`category-filter-${cat.value}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20" data-testid="no-products">
              <p className="text-shinobi-gray text-xl">No products found matching your criteria</p>
            </div>
          ) : (
            <>
              <p className="text-shinobi-gray mb-8" data-testid="product-count">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="card overflow-hidden group"
                    data-testid={`product-card-${product.slug}`}
                  >
                    <div className="overflow-hidden relative">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.newLaunch && (
                        <span className="absolute top-4 right-4 bg-shinobi-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-shinobi-gray uppercase tracking-wider">
                        {product.categoryLabel}
                      </span>
                      <h3 className="text-xl font-semibold text-shinobi-dark mt-2 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-shinobi-gray mb-4 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <Link 
                        to={`/products/${product.slug}`} 
                        className="btn-outline w-full text-center inline-block"
                        data-testid={`view-details-${product.slug}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
