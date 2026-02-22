"""
Big 5 Global 2025 Exhibitor Scraper using Playwright
This script handles JavaScript-rendered content
"""

# This script will be run by playwright
import asyncio
import json

async def scrape_exhibitors(page):
    """Scrape exhibitors from the page"""
    
    # Navigate to exhibitors page
    url = "https://exhibitors.big5global.com/Big-5-Global-2025/Exhibitor"
    print(f"Navigating to: {url}")
    
    await page.goto(url, wait_until="networkidle", timeout=60000)
    await page.wait_for_timeout(5000)
    
    # Scroll to load more exhibitors
    print("Scrolling to load all exhibitors...")
    for i in range(20):  # Scroll 20 times to load more
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(2000)
        print(f"  Scroll {i+1}/20")
    
    # Extract exhibitor data
    print("\nExtracting exhibitor data...")
    exhibitors = await page.evaluate('''() => {
        const exhibitors = [];
        
        // Find all exhibitor cards/containers
        const cards = document.querySelectorAll('.exhibitor-card, .exb-list-item, [class*="exhibitor"]');
        
        cards.forEach((card, index) => {
            const exhibitor = {
                name: '',
                country: '',
                standNo: '',
                website: '',
                email: '',
                phone: '',
                description: ''
            };
            
            // Extract name
            const nameEl = card.querySelector('h1, h2, h3, h4, h5, .exhibitor-name, .company-name, [class*="name"]');
            if (nameEl) exhibitor.name = nameEl.textContent.trim();
            
            // Extract country
            const text = card.textContent;
            const countries = ['United Arab Emirates', 'Saudi Arabia', 'China', 'India', 'Germany', 'Italy', 
                             'United Kingdom', 'France', 'Spain', 'Turkey', 'Egypt', 'Brazil'];
            for (const country of countries) {
                if (text.includes(country)) {
                    exhibitor.country = country;
                    break;
                }
            }
            
            // Extract stand number
            const standMatch = text.match(/Stand No[:\-\s]+([A-Z0-9\s]+)/i);
            if (standMatch) exhibitor.standNo = standMatch[1].trim();
            
            // Extract website
            const links = card.querySelectorAll('a[href^="http"]');
            for (const link of links) {
                const href = link.href;
                if (!href.includes('big5global.com') && !href.includes('dmgevents.com')) {
                    exhibitor.website = href;
                    break;
                }
            }
            
            // Extract email
            const emailMatch = text.match(/[\w\.-]+@[\w\.-]+\.\w+/);
            if (emailMatch) exhibitor.email = emailMatch[0];
            
            // Extract phone
            const phoneMatch = text.match(/\+\d{1,4}[\s\-]?\d{1,4}[\s\-]?\d{4,}/);
            if (phoneMatch) exhibitor.phone = phoneMatch[0];
            
            if (exhibitor.name && exhibitor.name !== 'Big 5 Global') {
                exhibitors.push(exhibitor);
            }
        });
        
        return exhibitors;
    }''')
    
    print(f"Found {len(exhibitors)} exhibitors")
    
    # Save to file
    with open('/tmp/exhibitors_data.json', 'w') as f:
        json.dump(exhibitors, f, indent=2)
    
    print("Data saved to /tmp/exhibitors_data.json")
    return exhibitors

# The actual scraping will be done by the screenshot tool
print("This will be executed by Playwright")
