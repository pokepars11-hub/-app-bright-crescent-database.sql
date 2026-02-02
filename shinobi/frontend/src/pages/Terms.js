import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50" data-testid="terms-page">
      <div className="bg-white border-b">
        <div className="container-custom py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-shinobi-dark" data-testid="terms-title">
            Terms of Service
          </h1>
          <p className="text-shinobi-gray mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-shinobi-dark mb-4">Agreement to Terms</h2>
            <p className="text-shinobi-gray mb-6">
              By accessing or using the SHINOBI Appliances website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Products and Services</h2>
            <p className="text-shinobi-gray mb-4">
              SHINOBI Appliances offers a range of home and kitchen appliances through our website and authorized retailers. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-shinobi-gray space-y-2 mb-6">
              <li>Modify or discontinue products without prior notice</li>
              <li>Limit quantities of products available for purchase</li>
              <li>Refuse service or orders at our discretion</li>
            </ul>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Pricing and Payment</h2>
            <p className="text-shinobi-gray mb-6">
              All prices are subject to change without notice. We strive to provide accurate pricing information, but errors may occur. In the event of a pricing error, we reserve the right to cancel any orders placed for incorrectly priced products.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Orders and Shipping</h2>
            <p className="text-shinobi-gray mb-4">
              Order acceptance and shipping terms:
            </p>
            <ul className="list-disc pl-6 text-shinobi-gray space-y-2 mb-6">
              <li>Orders are subject to availability and acceptance</li>
              <li>We will notify you of order confirmation and shipping status</li>
              <li>Delivery times are estimates and may vary</li>
              <li>Risk of loss and title pass to you upon delivery</li>
            </ul>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Returns and Refunds</h2>
            <p className="text-shinobi-gray mb-6">
              We offer a 30-day return policy for unused products in original packaging. Refunds will be issued to the original payment method within 7-10 business days of receiving the returned item. Shipping costs are non-refundable except in cases of defective products.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Warranty</h2>
            <p className="text-shinobi-gray mb-6">
              All SHINOBI products come with a 2-year limited warranty covering manufacturing defects. The warranty does not cover damage from misuse, accidents, or normal wear and tear. Warranty claims must be submitted with proof of purchase.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Intellectual Property</h2>
            <p className="text-shinobi-gray mb-6">
              All content on this website, including text, images, logos, and designs, is the property of SHINOBI Appliances and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Limitation of Liability</h2>
            <p className="text-shinobi-gray mb-6">
              To the fullest extent permitted by law, SHINOBI Appliances shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Governing Law</h2>
            <p className="text-shinobi-gray mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Changes to Terms</h2>
            <p className="text-shinobi-gray mb-6">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after changes constitutes acceptance of the modified Terms.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Contact Information</h2>
            <p className="text-shinobi-gray mb-6">
              For questions about these Terms, please contact us at:
              <br />
              <a href="mailto:legal@shinobi-appliances.com" className="text-shinobi-red hover:underline">
                legal@shinobi-appliances.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
