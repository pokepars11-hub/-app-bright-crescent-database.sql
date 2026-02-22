import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import re
import json

print("=" * 60)
print("BIG 5 GLOBAL 2025 - COMPREHENSIVE EXHIBITOR EXTRACTOR")
print("=" * 60)

# Base URL and headers
base_url = "https://exhibitors.big5global.com/Big-5-Global-2025/Exhibitor"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
}

exhibitors_data = []
processed_urls = set()

# Function to clean text
def clean_text(text):
    if not text:
        return ""
    return ' '.join(text.split()).strip()

# Function to extract exhibitor details from detail page
def extract_exhibitor_details(url):
    try:
        time.sleep(2)  # Be respectful
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        exhibitor = {
            'Company Name': '',
            'Country': '',
            'Stand Number': '',
            'Website': '',
            'Email': '',
            'Phone': '',
            'Address': '',
            'Product Category': '',
            'Products/Services': '',
            'Description': '',
            'Contact Person': ''
        }
        
        # Extract company name from title or h1
        title = soup.find('title')
        if title:
            exhibitor['Company Name'] = clean_text(title.get_text()).replace(' | Big 5 Global', '').replace(' - Big 5 Global', '')
        
        h1 = soup.find('h1')
        if h1 and not exhibitor['Company Name']:
            exhibitor['Company Name'] = clean_text(h1.get_text())
        
        # Extract all text content
        page_text = soup.get_text()
        
        # Extract country
        countries = [
            'United Arab Emirates', 'Saudi Arabia', 'China', 'India', 'Germany', 'Italy', 
            'United Kingdom', 'France', 'Spain', 'Turkey', 'Egypt', 'Brazil', 'Canada',
            'Australia', 'Japan', 'South Korea', 'Netherlands', 'Belgium', 'Switzerland',
            'Austria', 'Poland', 'Czech Republic', 'Russia', 'Ukraine', 'Pakistan',
            'Bangladesh', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Singapore',
            'Hong Kong', 'Taiwan', 'Lebanon', 'Jordan', 'Kuwait', 'Qatar', 'Bahrain',
            'Oman', 'Palestine', 'Morocco', 'Algeria', 'Tunisia', 'Greece', 'Portugal',
            'Romania', 'Bulgaria', 'Serbia', 'Croatia', 'Denmark', 'Norway', 'Sweden',
            'Finland', 'Ireland', 'New Zealand', 'South Africa', 'Nigeria', 'Kenya'
        ]
        for country in countries:
            if country in page_text:
                exhibitor['Country'] = country
                break
        
        # Extract stand number with various patterns
        stand_patterns = [
            r'Stand\s+(?:No[:\.\-\s]+)?([A-Z]{1,3}\s*[A-Z]?\d{1,4})',
            r'Hall\s+(\d+[A-Z]?)',
            r'Concourse\s+(\d+)',
            r'(?:Arena|Plaza)\s+([A-Z]?\d+)'
        ]
        for pattern in stand_patterns:
            match = re.search(pattern, page_text, re.IGNORECASE)
            if match:
                exhibitor['Stand Number'] = match.group(1).strip()
                break
        
        # Extract contact information
        # Email
        emails = re.findall(r'\b[\w\.-]+@[\w\.-]+\.\w{2,}\b', page_text)
        if emails:
            # Filter out common non-contact emails
            valid_emails = [e for e in emails if 'big5global.com' not in e and 'dmgevents.com' not in e]
            if valid_emails:
                exhibitor['Email'] = valid_emails[0]
        
        # Phone numbers
        phone_patterns = [
            r'\+\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{4,9}',
            r'\(\d{3}\)\s?\d{3}[\s\-]?\d{4}',
            r'\d{3}[\s\-]\d{3}[\s\-]\d{4}'
        ]
        for pattern in phone_patterns:
            phones = re.findall(pattern, page_text)
            if phones:
                # Filter out years that look like phone numbers
                valid_phones = [p for p in phones if '2024' not in p and '2025' not in p and '2026' not in p]
                if valid_phones:
                    exhibitor['Phone'] = valid_phones[0]
                    break
        
        # Extract website
        links = soup.find_all('a', href=True)
        for link in links:
            href = link.get('href', '')
            if href.startswith('http') and 'big5global.com' not in href and 'dmgevents.com' not in href:
                # Filter social media to get actual website
                if not any(social in href for social in ['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com']):
                    if 'linkedin.com' not in href or not exhibitor['Website']:
                        exhibitor['Website'] = href
                        if 'linkedin.com' not in href:
                            break  # Prefer non-LinkedIn website
        
        # Extract product categories
        category_keywords = ['HVAC', 'MEP', 'Construction', 'Building', 'Steel', 'Concrete', 'Glass',
                            'Tools', 'Machinery', 'Equipment', 'Materials', 'Technology', 'Smart',
                            'Digital', 'Solar', 'Electrical', 'Plumbing', 'Finishing', 'Interiors']
        found_categories = []
        for keyword in category_keywords:
            if keyword.lower() in page_text.lower():
                found_categories.append(keyword)
        if found_categories:
            exhibitor['Product Category'] = ', '.join(found_categories[:5])
        
        # Extract description
        desc_divs = soup.find_all(['div', 'p'], class_=re.compile(r'(description|about|profile|overview)', re.I))
        for div in desc_divs[:3]:
            text = clean_text(div.get_text())
            if len(text) > 50 and len(text) < 1000:
                exhibitor['Description'] = text[:500]
                break
        
        return exhibitor
        
    except Exception as e:
        print(f"    Error extracting details: {str(e)}")
        return None

print("\n[1] Fetching main exhibitor page...")
try:
    response = requests.get(base_url, headers=headers, timeout=30)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all exhibitor links
    exhibitor_links = set()
    for link in soup.find_all('a', href=True):
        href = link.get('href', '')
        if '/Exhibitor/ExbDetails/' in href:
            full_url = href if href.startswith('http') else f"https://exhibitors.big5global.com{href}"
            exhibitor_links.add(full_url)
    
    print(f"[2] Found {len(exhibitor_links)} exhibitor links on first page")
    
    # Extract details from each exhibitor
    print(f"[3] Extracting detailed information...\n")
    for idx, url in enumerate(sorted(exhibitor_links), 1):
        if url in processed_urls:
            continue
        
        print(f"    Processing [{idx}/{len(exhibitor_links)}]: ", end='', flush=True)
        exhibitor_data = extract_exhibitor_details(url)
        
        if exhibitor_data and exhibitor_data['Company Name']:
            exhibitors_data.append(exhibitor_data)
            processed_urls.add(url)
            print(f"✓ {exhibitor_data['Company Name']}")
        else:
            print(f"✗ Failed")
    
    # Create DataFrame
    print(f"\n[4] Creating Excel file...")
    df = pd.DataFrame(exhibitors_data)
    
    # Sort by company name
    df = df.sort_values('Company Name').reset_index(drop=True)
    
    # Save to Excel with formatting
    output_file = '/app/Big5_Global_2025_Exhibitors_Complete.xlsx'
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Exhibitors')
        
        # Auto-adjust column widths
        worksheet = writer.sheets['Exhibitors']
        for idx, col in enumerate(df.columns):
            max_length = max(
                df[col].astype(str).apply(len).max(),
                len(col)
            )
            worksheet.column_dimensions[chr(65 + idx)].width = min(max_length + 2, 50)
    
    print(f"\n{'=' * 60}")
    print(f"✅ SUCCESS! Extracted {len(exhibitors_data)} exhibitors")
    print(f"📁 File saved: {output_file}")
    print(f"{'=' * 60}\n")
    
    # Display summary
    print("SUMMARY:")
    print(f"  • Total Exhibitors: {len(exhibitors_data)}")
    print(f"  • With Email: {df['Email'].notna().sum()}")
    print(f"  • With Phone: {df['Phone'].notna().sum()}")
    print(f"  • With Website: {df['Website'].notna().sum()}")
    print(f"  • Countries: {df['Country'].nunique()}")
    
    print(f"\n\nSAMPLE DATA (First 5 exhibitors):")
    print(df[['Company Name', 'Country', 'Email', 'Phone']].head(10).to_string())
    
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")
    import traceback
    traceback.print_exc()

print(f"\n{'=' * 60}")
print("NOTE: This extracts exhibitors visible on the main page.")
print("The full exhibitor database may require login or may be")
print("loaded dynamically via JavaScript.")
print(f"{'=' * 60}")
