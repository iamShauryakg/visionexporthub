#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# ANSI escape codes for colored terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting Production Build & Packaging Process ===${NC}"

# 1. Clean previous build artifacts
echo -e "${BLUE}[1/4] Cleaning previous builds...${NC}"
rm -rf dist build.zip
echo -e "${GREEN}✓ Cleaned successfully.${NC}"

# 2. Run Vite production build
echo -e "${BLUE}[2/4] Compiling and optimizing React application...${NC}"
npm run build
echo -e "${GREEN}✓ Build compiled successfully inside 'dist/' directory.${NC}"

# 3. Create build.zip of the dist/ directory contents
echo -e "${BLUE}[3/4] Creating deployment zip file...${NC}"
if command -v zip >/dev/null 2>&1; then
    # Change directory to dist so we zip the contents directly, not the dist folder itself
    (cd dist && zip -r ../build.zip ./* .htaccess)
    echo -e "${GREEN}✓ Successfully created 'build.zip' in the root directory!${NC}"
else
    echo -e "${YELLOW}⚠️ 'zip' utility is not installed in your shell environment.${NC}"
    echo -e "${YELLOW}Please compress the contents of the 'dist/' folder manually to 'build.zip'.${NC}"
fi

# 4. Create or update README.md with clear shared hosting instructions
echo -e "${BLUE}[4/4] Creating/updating README.md...${NC}"
cat << 'EOF' > README.md
# Vision Export - Premium React Single Page Application (SPA)

This is a premium, high-performance web platform optimized for B2B search engines and global biological material supply chains. It is built using **React 18**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Shared Hosting Deployment Guide (e.g., Hostinger, cPanel)

### Step 1: Generate the Build File
Run the automatic packaging script in your local development environment:
```bash
chmod +x zip_build.sh
./zip_build.sh
```
This script will:
1. Compile and optimize all source code using Vite.
2. Output a super-minified static site inside the `dist/` folder.
3. Automatically bundle all static files, `.htaccess` caching rules, and SEO configurations into a single **`build.zip`** in the project root.

### Step 2: Upload to Shared Hosting (hPanel/cPanel)
1. Log in to your **Hostinger hPanel** or custom hosting control panel.
2. Go to the **File Manager** and open your domain's root folder (usually **`public_html`**).
3. Delete any default file (like `default.php` or `index.php`) if present.
4. Upload **`build.zip`** to the root of your `public_html` folder.
5. Right-click the uploaded zip file and select **Extract**. Use `.` (root directory) as the destination.
6. Delete the uploaded `build.zip` file to keep your server clean.

### Step 3: Check `.htaccess` and Router configuration
We have pre-configured a `.htaccess` file inside your build. This file guarantees:
- **No 404 on Refresh**: All client-side SPA routes (like `/products`) resolve correctly.
- **Auto HTTP-to-HTTPS Redirection**: Forces encrypted SSL for buyer credibility.
- **LiteSpeed & Apache Caching**: Stores images and assets in the user's browser for instant subsequent page loading.

---

## 🖼️ How to Customize Photos, Logos, & Products

To change visual assets, modify the designated files listed below:

### 1. Change Corporate Logo
- **File**: `/src/components/Header.tsx` (around line 82)
- **Method**: Place your custom logo in `public/assets/logo.png`, then replace the navbar logo SVG medallion with an `<img>` tag:
  ```tsx
  <img src="/assets/logo.png" alt="Company Logo" className="w-10 h-10 object-contain" />
  ```

### 2. Change Product Listings & Photos
- **File**: `/src/data/products.ts`
- **Method**: Edit the `PRODUCTS` list array. Replace the placeholder Unsplash URLs inside `slides` with custom local relative paths (e.g., `/assets/products/your_item_photo.jpg`), and save those photos inside the `/public/assets/products/` folder.

### 3. Change Raw Material Photos
- **File**: `/src/components/sections/RawButtonsSection.tsx` (lines 35-100)
- **Method**: Modify the category configurations and replace the static placeholder URLs with your raw specimen photo paths.

---

## ⚙️ Development & Local Testing
- **Install dependencies**: `npm install`
- **Run development server**: `npm run dev`
- **Lint check**: `npm run lint`
- **Optimized build**: `npm run build`
EOF

echo -e "${GREEN}✓ README.md updated with deployment instructions.${NC}"
echo -e "${GREEN}=== Build and Deployment packaging completed successfully! ===${NC}"
