# SHINOBI Website - Quick Start Guide

## 🚀 Access Your Website

**Frontend**: http://localhost:3001
**Backend API**: http://localhost:8002

## ✅ Services Running

Both services are running in the background:
- ✅ SHINOBI Frontend (React) - Port 3001
- ✅ SHINOBI Backend (FastAPI) - Port 8002

## 📝 How to Manage Products

### Add a New Product

1. Open `/app/shinobi/frontend/src/data/products.json`

2. Copy the `_template` object at the bottom

3. Fill in all fields:
```json
{
  "id": "unique-id",
  "slug": "product-url-name",
  "name": "Product Name",
  "category": "kitchen-coffee",
  "categoryLabel": "Kitchen / Coffee",
  "shortDescription": "Brief description",
  "longDescription": "Detailed description",
  "images": ["image-url-1", "image-url-2"],
  "highlights": ["Feature 1", "Feature 2"],
  "specs": {
    "Power": "1450W",
    "Voltage": "220V"
  },
  "buyLinks": {
    "amazon": "https://amazon.ae/...",
    "noon": "",
    "shopify": "",
    "carrefour": ""
  },
  "faq": [
    {"question": "Q?", "answer": "A"}
  ],
  "featured": true,
  "newLaunch": false
}
```

4. Add to the `products` array
5. Save - changes reflect immediately!

### Categories Available
- `kitchen-coffee` - Kitchen / Coffee
- `home-appliances` - Home Appliances
- `accessories` - Accessories

### Buy Links
Only add URL if product is available on that store. Leave empty ("") if not available.

## 🎨 Customization

### Update Logo
Currently using text-based logo. To use image:
1. Add image to `/app/shinobi/frontend/public/logo.png`
2. Edit `src/components/Header.js` and `Footer.js`

### Update Colors
Edit `/app/shinobi/frontend/tailwind.config.js`

### Update Contact Info
Search and replace in all files:
- Email: `info@shinobi-appliances.com`
- Phone: `+971 XX XXX XXXX`

### Update Meta Tags
Edit `/app/shinobi/frontend/public/index.html`

## 🔄 Restart Services

If you need to restart:
```bash
# Kill processes
pkill -f "shinobi"

# Start backend
cd /app/shinobi/backend && python server.py &

# Start frontend
cd /app/shinobi/frontend && yarn start &
```

## 📱 Pages Available

1. **Home** (`/`) - Hero, new launches, featured products, categories
2. **Products** (`/products`) - All products with filters & search
3. **Product Detail** (`/products/:slug`) - Dynamic product pages
4. **About** (`/about`) - Brand story, mission, values
5. **Contact** (`/contact`) - Contact form
6. **Privacy** (`/privacy`) - Privacy policy
7. **Terms** (`/terms`) - Terms of service

## 🛒 Sample Products Included

### Kitchen / Coffee
- Coffee Espresso Machine (flagship)
- Vacuum Jar for Coffee Storage
- Hand Press Coffee Maker

### Home Appliances
- Fan with Heating & Cooling
- Small Mini Refrigerator
- Digital Air Fryer

### Accessories
- Portable Power Box
- Replacement Fan Filter

## 📞 Contact Form

The contact form is fully functional:
- Name (required)
- Email (required, validated)
- Phone (optional)
- Message (required)
- Shows success confirmation
- Backend: `POST /api/contact`

## 🌐 SEO Features

✅ Clean URLs
✅ Meta descriptions
✅ Semantic HTML
✅ Mobile responsive
✅ Fast loading
✅ Alt text on images

## 🎯 What's Next?

1. **Replace placeholder images** with your actual product photos
2. **Update contact information** (email, phone, social links)
3. **Add your logo image** (optional)
4. **Customize colors** if needed
5. **Add more products** using the template
6. **Test on mobile** device

## 📝 Notes

- Products data is in: `/app/shinobi/frontend/src/data/products.json`
- All source code is in: `/app/shinobi/`
- Separate from MoltBot (runs on different ports)
- Fully mobile responsive
- Premium minimal design

---

🎉 Your SHINOBI website is ready! Visit http://localhost:3001
