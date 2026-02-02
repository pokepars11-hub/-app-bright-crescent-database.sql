import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50" data-testid="privacy-page">
      <div className="bg-white border-b">
        <div className="container-custom py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-shinobi-dark" data-testid="privacy-title">
            Privacy Policy
          </h1>
          <p className="text-shinobi-gray mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-shinobi-dark mb-4">Introduction</h2>
            <p className="text-shinobi-gray mb-6">
              SHINOBI Appliances ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our products.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Information We Collect</h2>
            <p className="text-shinobi-gray mb-4">
              We may collect information about you in a variety of ways, including:
            </p>
            <ul className="list-disc pl-6 text-shinobi-gray space-y-2 mb-6">
              <li>Personal Data: Name, email address, phone number, and shipping address when you make a purchase or contact us.</li>
              <li>Usage Data: Information about how you use our website, such as pages visited and time spent on pages.</li>
              <li>Device Information: Browser type, IP address, and device identifiers.</li>
            </ul>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">How We Use Your Information</h2>
            <p className="text-shinobi-gray mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-shinobi-gray space-y-2 mb-6">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Data Security</h2>
            <p className="text-shinobi-gray mb-6">
              We use administrative, technical, and physical security measures to protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Third-Party Services</h2>
            <p className="text-shinobi-gray mb-6">
              We may share your information with third-party service providers who perform services on our behalf, such as payment processing, order fulfillment, and marketing. These providers are contractually obligated to protect your information and use it only for the purposes we specify.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Your Rights</h2>
            <p className="text-shinobi-gray mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-shinobi-gray space-y-2 mb-6">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Cookies</h2>
            <p className="text-shinobi-gray mb-6">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Children's Privacy</h2>
            <p className="text-shinobi-gray mb-6">
              Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Changes to This Policy</h2>
            <p className="text-shinobi-gray mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-shinobi-dark mb-4 mt-8">Contact Us</h2>
            <p className="text-shinobi-gray mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@shinobi-appliances.com" className="text-shinobi-red hover:underline">
                privacy@shinobi-appliances.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
