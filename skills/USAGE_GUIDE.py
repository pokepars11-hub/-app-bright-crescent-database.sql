"""
USAGE GUIDE - Exhibition Data Extractor
========================================

This guide shows how to use the Exhibition Data Extractor skill
to extract exhibitor data from any exhibition website.

"""

# ============================================================================
# METHOD 1: Using Playwright Screenshot Tool (Recommended)
# ============================================================================

"""
Use this method with the mcp_screenshot_tool to handle JavaScript-heavy sites
and sites that require login.

Example script for screenshot tool:
"""

PLAYWRIGHT_SCRIPT_TEMPLATE = '''
# Import the extraction functions
import sys
sys.path.append('/app/skills')
from exhibition_data_extractor import ExhibitionDataExtractor
import json

# Initialize extractor
extractor = ExhibitionDataExtractor()

# Set viewport
await page.set_viewport_size({"width": 1920, "height": 1080})

print("="*70)
print("EXHIBITION DATA EXTRACTION")
print("="*70)

# STEP 1: Navigate to login page (if required)
LOGIN_REQUIRED = {login_required}
if LOGIN_REQUIRED:
    print("\\n🔐 STEP 1: Logging in...")
    login_url = "{login_url}"
    username = "{username}"
    password = "{password}"
    
    success = await extractor.login_to_website(
        page=page,
        url=login_url,
        username=username,
        password=password
    )
    
    if not success:
        print("❌ Login failed! Cannot proceed.")
        raise Exception("Login failed")
    
    # Wait after login
    await page.wait_for_timeout(3000)

# STEP 2: Navigate to exhibitor list page
print("\\n📋 STEP 2: Navigating to exhibitor list...")
exhibitor_url = "{exhibitor_url}"
await page.goto(exhibitor_url, wait_until="networkidle", timeout=60000)
await page.wait_for_timeout(5000)

# STEP 3: Extract all exhibitors with pagination
print("\\n📊 STEP 3: Extracting exhibitor data...")
all_exhibitors = await extractor.navigate_pagination(page, max_pages={max_pages})

print(f"\\n✅ Extraction complete! Found {{len(all_exhibitors)}} exhibitors")

# STEP 4: Save to JSON temporarily
json_file = "/tmp/exhibitors_extracted.json"
with open(json_file, 'w') as f:
    json.dump(all_exhibitors, f, indent=2)
print(f"📁 Saved to: {{json_file}}")

# STEP 5: Create Excel file (will be done after this script)
print("\\n📊 Excel file will be created next...")
'''

# ============================================================================
# METHOD 2: Direct Python Usage (For simple sites without JavaScript)
# ============================================================================

import sys
sys.path.append('/app/skills')
from exhibition_data_extractor import ExhibitionDataExtractor
import json

def extract_simple_exhibition(url, output_file, event_name):
    """
    For simple sites that don't require JavaScript rendering
    """
    import requests
    from bs4 import BeautifulSoup
    
    print(f"Extracting from: {url}")
    
    # Fetch page
    response = requests.get(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract exhibitor links
    exhibitor_links = []
    for link in soup.find_all('a', href=True):
        if '/exhibitor' in link['href'].lower():
            exhibitor_links.append(link['href'])
    
    print(f"Found {len(exhibitor_links)} exhibitor links")
    
    # Extract data from each
    exhibitors = []
    for link in exhibitor_links[:50]:  # Limit for testing
        # Add extraction logic here
        pass
    
    # Create Excel
    extractor = ExhibitionDataExtractor()
    extractor.create_excel_file(exhibitors, output_file, event_name)


# ============================================================================
# USAGE EXAMPLES FOR DIFFERENT EXHIBITION SITES
# ============================================================================

EXAMPLES = {
    "big5_global": {
        "name": "Big 5 Global 2025",
        "url": "https://exhibitors.big5global.com/Big-5-Global-2025/Exhibitor",
        "login_required": True,
        "login_url": "https://exhibitors.big5global.com/login",
        "username": "your_email@example.com",
        "password": "your_password",
        "max_pages": 100
    },
    
    "gitex": {
        "name": "GITEX Technology Week",
        "url": "https://www.gitex.com/exhibitors",
        "login_required": False,
        "max_pages": 50
    },
    
    "arab_health": {
        "name": "Arab Health 2025",
        "url": "https://www.arabhealthonline.com/en/Exhibitors.html",
        "login_required": False,
        "max_pages": 80
    },
    
    "gulfood": {
        "name": "Gulfood 2025",
        "url": "https://www.gulfood.com/exhibitor-list",
        "login_required": False,
        "max_pages": 100
    }
}


# ============================================================================
# STEP-BY-STEP INSTRUCTIONS
# ============================================================================

INSTRUCTIONS = """
STEP-BY-STEP GUIDE TO EXTRACT EXHIBITION DATA
==============================================

STEP 1: Prepare Your Information
---------------------------------
✓ Exhibition website URL
✓ Login credentials (if required)
✓ Event name for Excel file
✓ Output file name

STEP 2: Choose Extraction Method
---------------------------------
• For JavaScript-heavy sites → Use Playwright (mcp_screenshot_tool)
• For simple HTML sites → Use Python requests

STEP 3: Run the Extraction
---------------------------
A. Using Playwright:
   1. Call mcp_screenshot_tool with the page URL
   2. Use the PLAYWRIGHT_SCRIPT_TEMPLATE above
   3. Replace placeholders with your values
   4. Script will save JSON to /tmp/exhibitors_extracted.json

B. Using Python:
   1. Use extract_simple_exhibition() function
   2. Provide URL and output file name

STEP 4: Create Excel File
--------------------------
After extraction, run:

```python
import sys
sys.path.append('/app/skills')
from exhibition_data_extractor import ExhibitionDataExtractor
import json

# Load extracted data
with open('/tmp/exhibitors_extracted.json', 'r') as f:
    exhibitors = json.load(f)

# Create Excel
extractor = ExhibitionDataExtractor()
extractor.create_excel_file(
    exhibitors=exhibitors,
    output_file='/app/EventName_Exhibitors.xlsx',
    event_name='Event Name 2025'
)
```

STEP 5: Download and Use
-------------------------
✓ Excel file will be at /app/EventName_Exhibitors.xlsx
✓ Contains all exhibitor details
✓ Professional formatting
✓ Ready to use!


TROUBLESHOOTING
===============

Problem: Login fails
Solution: Check credentials, try manual login first to verify

Problem: No exhibitors extracted
Solution: Website might use different HTML structure, may need customization

Problem: Missing contact details
Solution: Some sites don't display emails/phones publicly, only after login

Problem: 403 Forbidden error
Solution: Website blocks automated access, may need to register as attendee


CUSTOMIZATION
=============

To customize for a specific website, modify:

1. Extraction selectors in extract_exhibitors_from_page()
2. Login form selectors in login_to_website()
3. Pagination selectors in navigate_pagination()


SUPPORTED FEATURES
==================

✓ Automatic login handling
✓ JavaScript rendering support
✓ Pagination navigation
✓ Email extraction
✓ Phone number extraction
✓ Website extraction
✓ Logo/image extraction
✓ Multi-page scraping
✓ Professional Excel formatting
✓ Duplicate removal
✓ Data cleaning and normalization


EXCEL FILE FEATURES
===================

✓ Professional header with event name
✓ Color-coded columns
✓ Auto-sized columns
✓ Wrapped text
✓ Frozen header rows
✓ Statistics summary
✓ Extraction timestamp
✓ Borders and formatting


CONTACT
=======

For issues or customization requests, provide:
• Exhibition website URL
• Login page URL (if applicable)
• Sample exhibitor page URL
• Specific fields you need extracted
"""

if __name__ == "__main__":
    print(INSTRUCTIONS)
