# SHINOBI Appliances Website

Premium multi-product brand website for SHINOBI consumer electronics and home appliances.

## 🌟 Features

### Pages
- **Home**: Hero section, new launches, featured products, why SHINOBI, featured categories
- **Products**: Grid view with filters (category), search functionality
- **Product Detail**: Dynamic pages with image gallery, specs, buy links, FAQ
- **About Us**: Brand story, mission, values, warranty info, timeline
- **Contact**: Contact form with validation
- **Privacy Policy**: Basic privacy policy
- **Terms of Service**: Basic terms and conditions

### Product Management
Products are managed through a simple JSON file: `/frontend/src/data/products.json`

#### Adding New Products
1. Open `/frontend/src/data/products.json`
2. Copy the `_template` object at the bottom of the file
3. Fill in all required fields:
   - `id`: Unique identifier (e.g., "product-name-001")
   - `slug`: URL-friendly name (e.g., "product-name")
   - `name`: Display name
   - `category`: One of "kitchen-coffee", "home-appliances", "accessories"
   - `categoryLabel`: Display label for category
   - `shortDescription`: Brief description for product cards
   - `longDescription`: Detailed description for product detail page
   - `images`: Array of image URLs (3-6 images recommended)
   - `highlights`: Array of key features
   - `specs`: Object with specification key-value pairs
   - `buyLinks`: Object with store URLs (amazon, noon, shopify, carrefour)
   - `faq`: Array of question/answer objects
   - `featured`: true/false (shows on homepage)
   - `newLaunch`: true/false (shows "NEW" badge)

4. Add the new product object to the `products` array
5. Save the file - changes will be reflected immediately

### Buy Links
- Amazon, Noon, Shopify, and Carrefour buttons are available
- Buttons only appear if a URL is provided in the product's `buyLinks`
- Leave empty string ("") for stores where product is not available

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.8+ (for backend)

### Frontend Setup
```bash
cd /app/shinobi/frontend
yarn install
yarn start
```
Frontend will run on http://localhost:3000

### Backend Setup
```bash
cd /app/shinobi/backend
pip install -r requirements.txt
python server.py
```
Backend will run on http://localhost:8002

## 📁 Project Structure

```
/app/shinobi/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js       # Navigation header
│   │   │   └── Footer.js       # Site footer
│   │   ├── pages/
│   │   │   ├── Home.js         # Homepage
│   │   │   ├── Products.js     # Products grid
│   │   │   ├── ProductDetail.js # Dynamic product page
│   │   │   ├── About.js        # About page
│   │   │   ├── Contact.js      # Contact form
│   │   │   ├── Privacy.js      # Privacy policy
│   │   │   └── Terms.js        # Terms of service
│   │   ├── data/
│   │   │   └── products.json   # Product data (EDIT THIS TO ADD PRODUCTS)
│   │   ├── App.js              # Main app with routing
│   │   ├── index.js            # Entry point
│   │   └── index.css           # Global styles
│   ├── public/
│   └── package.json
│
└── backend/
    ├── server.py               # FastAPI backend
    ├── requirements.txt
    └── .env

```

## 🎨 Design System

### Colors
- **Primary Red**: #DC143C (SHINOBI brand color)
- **Gold Accent**: #D4AF37 (for highlights and accents)
- **Dark**: #1a1a1a (text)
- **Gray**: #6b7280 (secondary text)
- **White**: #ffffff (background)

### Typography
- Font Family: Inter
- Headings: Bold (600-800)
- Body: Regular (400)

### Components
All styled with Tailwind CSS:
- `btn-primary`: Red button
- `btn-secondary`: White button with border
- `btn-outline`: Outlined red button
- `card`: White card with shadow
- `input-field`: Form input styling

## 📱 Mobile Responsive
The entire website is optimized for mobile devices with:
- Responsive navigation (hamburger menu on mobile)
- Flexible grid layouts
- Touch-friendly buttons and links
- Optimized images

## 🔧 Customization

### Update Logo
The logo is currently text-based (SHINOBI APPLIANCES) with red background.
To use an image logo:
1. Add logo image to `/frontend/public/`
2. Update `Header.js` and `Footer.js` to use `<img>` tag

### Update Colors
Edit `/frontend/tailwind.config.js` to change brand colors

### Update Contact Info
Edit:
- Email: Search for "info@shinobi-appliances.com" and replace
- Phone: Search for "+971 XX XXX XXXX" and replace
- Social links: Update in `Footer.js`

### SEO Optimization
- Meta tags are in `/frontend/public/index.html`
- Update title, description, and keywords
- Each page has semantic HTML for better SEO

## 📦 Product Categories

Current categories:
1. **Kitchen / Coffee**: Coffee machines, vacuum jars, hand press
2. **Home Appliances**: Fans, refrigerators, air fryers
3. **Accessories**: Power stations, filters

To add new categories:
1. Add products with new category value in `products.json`
2. Update category filter in `Products.js`
3. Add category card in `Home.js` featured categories section

## 🚨 Contact Form

The contact form includes:
- Name (required)
- Email (required, validated)
- Phone (optional)
- Message (required)
- Success confirmation message
- Error validation

Backend API endpoint: `POST /api/contact`

## 🔍 SEO Features

- Clean URLs: `/products/{slug}`
- Semantic HTML5 tags
- Meta descriptions
- Alt text on all images
- Fast loading times
- Mobile-first responsive design

## 📧 Support

For questions or issues:
- Email: info@shinobi-appliances.com
- Check the `/contact` page for form submission

---

Built with ❤️ for SHINOBI Appliances
