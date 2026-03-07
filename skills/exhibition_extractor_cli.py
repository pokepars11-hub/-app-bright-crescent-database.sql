#!/usr/bin/env python3
"""
EXHIBITION EXTRACTOR - Command Line Tool
=========================================
Extract exhibitor data from any exhibition website and create Excel files

Usage:
    python exhibition_extractor_cli.py --url <URL> --event <NAME> --output <FILE>
    
    Optional:
    --login-url <URL>       Login page URL (if login required)
    --username <EMAIL>      Username/email for login
    --password <PASS>       Password for login
    --max-pages <NUM>       Maximum pages to scrape (default: 50)
    
Examples:
    # Without login
    python exhibition_extractor_cli.py \\
        --url "https://example.com/exhibitors" \\
        --event "Tech Expo 2025" \\
        --output "/app/TechExpo2025_Exhibitors.xlsx"
    
    # With login
    python exhibition_extractor_cli.py \\
        --url "https://example.com/exhibitors" \\
        --event "Big 5 Global 2025" \\
        --output "/app/Big5_Exhibitors.xlsx" \\
        --login-url "https://example.com/login" \\
        --username "your@email.com" \\
        --password "yourpassword" \\
        --max-pages 100
"""

import argparse
import sys
import os

# Add skills directory to path
sys.path.append('/app/skills')

def generate_playwright_script(config):
    """Generate Playwright script for extraction"""
    
    script = f'''
import sys
sys.path.append('/app/skills')
from exhibition_data_extractor import ExhibitionDataExtractor
import json

# Initialize
extractor = ExhibitionDataExtractor()
await page.set_viewport_size({{"width": 1920, "height": 1080}})

print("="*70)
print("EXHIBITION DATA EXTRACTION - {config["event"]}")
print("="*70)

# Login if required
'''
    
    if config.get('login_required'):
        script += f'''
print("\\n🔐 STEP 1: Logging in...")
success = await extractor.login_to_website(
    page=page,
    url="{config['login_url']}",
    username="{config['username']}",
    password="{config['password']}"
)

if not success:
    print("❌ Login failed!")
    raise Exception("Login failed")

await page.wait_for_timeout(3000)
'''
    
    script += f'''
# Navigate to exhibitor list
print("\\n📋 STEP 2: Navigating to exhibitor list...")
await page.goto("{config['url']}", wait_until="networkidle", timeout=60000)
await page.wait_for_timeout(5000)

# Extract data
print("\\n📊 STEP 3: Extracting exhibitors...")
all_exhibitors = await extractor.navigate_pagination(page, max_pages={config['max_pages']})

print(f"\\n✅ Found {{len(all_exhibitors)}} exhibitors")

# Save temporarily
with open('/tmp/exhibitors_data.json', 'w') as f:
    json.dump(all_exhibitors, f, indent=2)

print("📁 Data saved to /tmp/exhibitors_data.json")
'''
    
    return script


def create_config_from_args(args):
    """Create configuration from command line arguments"""
    
    config = {
        'url': args.url,
        'event': args.event,
        'output': args.output,
        'max_pages': args.max_pages,
        'login_required': bool(args.login_url and args.username and args.password)
    }
    
    if config['login_required']:
        config['login_url'] = args.login_url
        config['username'] = args.username
        config['password'] = args.password
    
    return config


def save_script_for_manual_use(config, script_file='/app/extraction_script.py'):
    """Save the generated script for manual execution"""
    script = generate_playwright_script(config)
    
    with open(script_file, 'w') as f:
        f.write("# Auto-generated Exhibition Extraction Script\n")
        f.write("# Use with: mcp_screenshot_tool\n\n")
        f.write(script)
    
    print(f"\\n📝 Playwright script saved to: {script_file}")
    print("\\n" + "="*70)
    print("NEXT STEPS:")
    print("="*70)
    print("\\n1. Use the mcp_screenshot_tool with this script")
    print("2. After extraction, run this to create Excel:")
    print("\\n" + "-"*70)
    print(f"""
python3 << 'EOF'
import sys
sys.path.append('/app/skills')
from exhibition_data_extractor import ExhibitionDataExtractor
import json

# Load data
with open('/tmp/exhibitors_data.json', 'r') as f:
    exhibitors = json.load(f)

# Create Excel
extractor = ExhibitionDataExtractor()
extractor.create_excel_file(
    exhibitors=exhibitors,
    output_file='{config['output']}',
    event_name='{config['event']}'
)

print("\\n✅ Excel file created: {config['output']}")
EOF
""")
    print("-"*70)
    
    return script_file


def main():
    parser = argparse.ArgumentParser(
        description='Extract exhibitor data from exhibition websites',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    
    # Required arguments
    parser.add_argument('--url', required=True,
                      help='Exhibition exhibitor list URL')
    parser.add_argument('--event', required=True,
                      help='Event name (e.g., "Big 5 Global 2025")')
    parser.add_argument('--output', required=True,
                      help='Output Excel file path')
    
    # Optional arguments
    parser.add_argument('--login-url',
                      help='Login page URL (if login required)')
    parser.add_argument('--username',
                      help='Username/email for login')
    parser.add_argument('--password',
                      help='Password for login')
    parser.add_argument('--max-pages', type=int, default=50,
                      help='Maximum pages to scrape (default: 50)')
    
    args = parser.parse_args()
    
    # Validate
    if (args.login_url or args.username or args.password):
        if not all([args.login_url, args.username, args.password]):
            parser.error("If login is required, must provide --login-url, --username, and --password")
    
    # Create configuration
    config = create_config_from_args(args)
    
    # Generate and save script
    print("\\n" + "="*70)
    print("EXHIBITION DATA EXTRACTOR - Configuration")
    print("="*70)
    print(f"\\nEvent: {config['event']}")
    print(f"URL: {config['url']}")
    print(f"Output: {config['output']}")
    print(f"Login Required: {config['login_required']}")
    print(f"Max Pages: {config['max_pages']}")
    
    script_file = save_script_for_manual_use(config)
    
    print(f"\\n✅ Setup complete!")
    print(f"\\n📋 Script generated: {script_file}")
    print("\\nFollow the NEXT STEPS above to complete the extraction.\\n")


if __name__ == '__main__':
    main()
