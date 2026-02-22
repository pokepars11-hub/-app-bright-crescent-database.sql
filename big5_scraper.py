import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import re

# Base URL
base_url = "https://exhibitors.big5global.com/Big-5-Global-2025/Exhibitor"

print("Starting Big 5 Global Exhibitor Data Extraction...")

# Initialize lists to store data
exhibitors_data = []

# Fetch the main page
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

try:
    print(f"Fetching: {base_url}")
    response = requests.get(base_url, headers=headers, timeout=30)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all exhibitor cards/links
    exhibitor_links = []
    
    # Look for exhibitor detail links
    for link in soup.find_all('a', href=True):
        href = link.get('href', '')
        if '/Exhibitor/ExbDetails/' in href:
            full_url = href if href.startswith('http') else f"https://exhibitors.big5global.com{href}"
            if full_url not in exhibitor_links:
                exhibitor_links.append(full_url)
    
    print(f"Found {len(exhibitor_links)} exhibitor links")
    
    # Extract data from each exhibitor page
    for idx, exhibitor_url in enumerate(exhibitor_links[:50], 1):  # Limit to first 50 for testing
        print(f"Processing {idx}/{min(50, len(exhibitor_links))}: {exhibitor_url}")
        
        try:
            time.sleep(1)  # Be polite to the server
            
            detail_response = requests.get(exhibitor_url, headers=headers, timeout=30)
            detail_response.raise_for_status()
            detail_soup = BeautifulSoup(detail_response.content, 'html.parser')
            
            # Extract exhibitor information
            exhibitor = {
                'Name': '',
                'Country': '',
                'Stand No': '',
                'Website': '',
                'Email': '',
                'Phone': '',
                'Address': '',
                'Product Sector': '',
                'Products': '',
                'Description': ''
            }
            
            # Extract company name
            name_elem = detail_soup.find('h1') or detail_soup.find('h2', class_='company-name')
            if name_elem:
                exhibitor['Name'] = name_elem.get_text(strip=True)
            
            # Extract country and stand info
            info_section = detail_soup.find('div', class_='exhibitor-info') or detail_soup.find('div', class_='company-details')
            if info_section:
                text = info_section.get_text()
                
                # Look for country
                countries = ['United Arab Emirates', 'Saudi Arabia', 'China', 'India', 'Germany', 'Italy', 
                           'United Kingdom', 'United States', 'France', 'Spain', 'Turkey', 'Egypt']
                for country in countries:
                    if country in text:
                        exhibitor['Country'] = country
                        break
                
                # Look for stand number
                stand_match = re.search(r'Stand No[:\-\s]+([A-Z0-9\s]+)', text, re.IGNORECASE)
                if stand_match:
                    exhibitor['Stand No'] = stand_match.group(1).strip()
            
            # Extract contact information
            contact_section = detail_soup.find('div', class_='contact-info') or detail_soup.find_all(['p', 'div'])
            
            for elem in detail_soup.find_all(['a', 'p', 'div', 'span']):
                text = elem.get_text(strip=True)
                
                # Extract email
                email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
                if email_match and not exhibitor['Email']:
                    exhibitor['Email'] = email_match.group(0)
                
                # Extract phone
                phone_match = re.search(r'\+?\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,9}', text)
                if phone_match and not exhibitor['Phone']:
                    exhibitor['Phone'] = phone_match.group(0)
                
                # Extract website
                if elem.name == 'a' and elem.get('href', '').startswith('http'):
                    href = elem.get('href')
                    if 'big5global.com' not in href and not exhibitor['Website']:
                        exhibitor['Website'] = href
            
            # Extract product sectors
            sector_elem = detail_soup.find('div', class_='product-sector') or detail_soup.find('div', class_='categories')
            if sector_elem:
                exhibitor['Product Sector'] = sector_elem.get_text(strip=True)
            
            # Extract description
            desc_elem = detail_soup.find('div', class_='description') or detail_soup.find('div', class_='about')
            if desc_elem:
                exhibitor['Description'] = desc_elem.get_text(strip=True)[:500]  # Limit to 500 chars
            
            exhibitors_data.append(exhibitor)
            print(f"  ✓ Extracted: {exhibitor['Name']}")
            
        except Exception as e:
            print(f"  ✗ Error processing {exhibitor_url}: {str(e)}")
            continue
    
    # Create DataFrame
    df = pd.DataFrame(exhibitors_data)
    
    # Save to Excel
    output_file = '/app/Big5_Global_2025_Exhibitors.xlsx'
    df.to_excel(output_file, index=False, engine='openpyxl')
    
    print(f"\n✅ Successfully created Excel file: {output_file}")
    print(f"Total exhibitors extracted: {len(exhibitors_data)}")
    print(f"\nPreview of data:")
    print(df.head())
    
except Exception as e:
    print(f"❌ Error: {str(e)}")
    import traceback
    traceback.print_exc()
