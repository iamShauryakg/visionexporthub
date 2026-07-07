# Production Deployment & Customization Guide

This document provides a comprehensive guide for deploying this React + Vite Single Page Application (SPA) to shared hosting environments (like Hostinger, Bluehost, GoDaddy) or custom servers (Apache/Nginx). It also outlines where to locate and replace visual assets (images, logos, product photos) to customize the application.

---

## 🚀 Part 1: Deployment Configuration (Apache & Nginx)

When deploying a React SPA with client-side routing, page refreshes on sub-pages (e.g., `/products`) will result in a **404 Not Found** error unless the server is configured to redirect all requests to `index.html`.

### 1. Apache Configuration (`.htaccess`)
For Apache servers (standard on Hostinger Shared Hosting), use the `.htaccess` file located in the root of your public folder (`public_html`).

We have already created a pre-configured `.htaccess` file inside the `public/` directory (which gets built into the root of `dist/`). Here is the configuration:

```apache
# Force HTTPS Redirection
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Auto-redirect HTTP to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Fallback to index.html for Client-side Routing
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Static Asset Caching for LiteSpeed & Apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 2. Nginx Configuration (`nginx.conf`)
If you are deploying to an Nginx server, add the `try_files` directive to your server block:

```nginx
server {
    listen 80;
    server_name visionexporthub.com www.visionexporthub.com;
    root /var/www/visionexport/dist;
    index index.html;

    # Static asset caching headers
    location ~* \.(?:ico|css|js|gif|jpe?g|png|svg|woff2?|eot|ttf|otf)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Redirect all other requests to index.html for SPA router
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔑 Part 2: Environment Variables

Since this is a client-side Vite application, environment variables must be prefixed with `VITE_` to be bundled into the production code.

1. **Creating the production variables**: Create a `.env` or `.env.production` in your project root before running the build command.
2. **Accessing in Code**: Access them via `import.meta.env.VITE_YOUR_VARIABLE`.
3. **During Build**: Vite injects these values statically during `npm run build`. If you change environment variables, you **must run a fresh build** and upload the new `dist/` files.

---

## 🖼️ Part 3: Customization Guide (Changing Photos, Logo & Products)

Here is exactly where to change the logos, products, and raw materials inside the codebase:

### 1. Changing the Logo (ब्रांड लोगो)
The logo icon in the navbar is designed as a luxury CSS medallion with custom golden overlays.
* **File Location**: `/src/components/Header.tsx` (around line 82).
* **How to change to a custom image**:
  Replace the existing SVG medallion structure with an `<img>` tag pointing to your logo image:
  ```tsx
  <img 
    src="/assets/logo.png" 
    alt="Vision Export Logo" 
    className="w-10 h-10 object-contain" 
  />
  ```
  Make sure to upload your `logo.png` inside the `public/assets/` directory.

### 2. Changing Product Images (प्रोडक्ट के फोटोज)
All products (button blanks, plates, exotic materials) and their corresponding image URLs are defined in a clean data file.
* **File Location**: `/src/data/products.ts`
* **How to change**:
  Find the `PRODUCTS` array. Each product has a `slides` array containing image URLs (which currently point to high-resolution Unsplash design stock placeholders).
  ```typescript
  // Example in src/data/products.ts:
  {
    id: 1,
    name: "Luxury Grade Black Buffalo Horn Plates",
    // Change these URLs to your own image paths
    slides: [
      { id: "1-1", type: "photo", url: "/assets/products/horn_plate_1.jpg", alt: "Matte surface view" },
      { id: "1-2", type: "photo", url: "/assets/products/horn_plate_2.jpg", alt: "High-polish luster view" }
    ],
    ...
  }
  ```
  Simply replace the Unsplash URLs with your local paths (e.g., `/assets/products/your_image.jpg`) and place those image files inside your `public/assets/products/` folder.

### 3. Changing Raw Materials Section Photos (रॉ मटेरियल के फोटोज)
The raw biological materials section displays information about premium horns, bone blanks, etc.
* **File Location**: `/src/components/sections/RawButtonsSection.tsx` (near the top, around lines 35-100).
* **How to change**:
  Look for the categories/materials data array (e.g., `RAW_MATERIALS` or similar categories) and update the `image` URLs to point to your custom uploaded assets.

### 4. Changing Hero Slides (मुख्य बैनर के फोटोज)
The main scrolling background slider on the homepage.
* **File Location**: `/src/data/constants.ts` (look for `HERO_SLIDES` near the top).
* **How to change**:
  Update the `image` fields of the slides to point to your new banners:
  ```typescript
  export const HERO_SLIDES = [
    {
      id: 0,
      title: "PREEMINENT BIOLOGICAL MATERIAL HOUSE",
      image: "/assets/banners/hero_banner_1.jpg", // replace with your banner
      ...
    }
  ];
  ```

---

## 🛠️ Step-by-Step Shared Hosting Deploy Steps (Hostinger/cPanel)

1. Run `npm run build` locally to generate the optimized `dist` folder.
2. Enter the `dist` folder, select all contents (including `.htaccess` and `sitemap.xml`), and zip them into `build.zip`.
3. Upload `build.zip` into your Hostinger `public_html` directory using hPanel File Manager.
4. Extract the zip file directly into the `public_html` root.
5. Your site is now live with automatic HTTPS, asset caching, and SEO router fallback configured!
