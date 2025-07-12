# Deployment Issue Troubleshooting Guide - www.vid30.fr

## Problem Description
CSS, JavaScript, and images are not loading on www.vid30.fr, causing the website to display without styling or functionality.

## Root Cause Analysis
Your HTML files use **relative paths** to reference assets:
- `assets/css/bootstrap.min.css`
- `assets/js/main.js`
- `assets/img/hero/01.jpg`
- etc.

When deployed to www.vid30.fr, browsers try to load these from:
- `https://www.vid30.fr/assets/css/bootstrap.min.css`
- `https://www.vid30.fr/assets/js/main.js`
- `https://www.vid30.fr/assets/img/hero/01.jpg`

## Asset Structure Found
Your local project has the following structure:
```
/
├── index.html
├── index-2.html
├── contact.php
├── MovieAI/
└── assets/
    ├── css/
    │   ├── bootstrap.min.css
    │   ├── main.css
    │   ├── all.min.css
    │   └── [other CSS files]
    ├── js/
    │   ├── jquery-3.7.1.min.js
    │   ├── main.js
    │   ├── bootstrap.bundle.min.js
    │   └── [other JS files]
    ├── img/
    │   ├── hero/
    │   ├── movie/
    │   ├── tv-shows/
    │   └── [other image directories]
    └── webfonts/
```

## Solution Steps

### Step 1: Verify File Upload
1. **Check if all files are uploaded** to your web server
2. **Ensure the folder structure is identical** on the server
3. **Verify the assets folder** and all its contents are present

### Step 2: Test Asset URLs Directly
Open these URLs in your browser to check if assets are accessible:
- `https://www.vid30.fr/assets/css/main.css`
- `https://www.vid30.fr/assets/js/main.js`
- `https://www.vid30.fr/assets/img/hero/01.jpg`

**If these return 404 errors**, the assets are not uploaded correctly.

### Step 3: Common Deployment Issues

#### Issue A: Files Not Uploaded
**Solution**: Re-upload the entire `assets/` folder to your web server

#### Issue B: Incorrect Directory Structure
**Solution**: Ensure your server directory structure matches:
```
public_html/ (or www/ or htdocs/)
├── index.html
├── index-2.html
├── contact.php
└── assets/
    ├── css/
    ├── js/
    ├── img/
    └── webfonts/
```

#### Issue C: File Permissions
**Solution**: Set correct permissions (usually 644 for files, 755 for directories)

#### Issue D: Server Configuration
**Solution**: Ensure your web server is configured to serve static files

### Step 4: Test with Browser Developer Tools
1. Open www.vid30.fr in browser
2. Open Developer Tools (F12)
3. Check the **Network** tab for 404 errors
4. Look for failed asset requests

### Step 5: Alternative Solutions

#### Option A: Use Absolute Paths
If relative paths continue to fail, you can modify the HTML files to use absolute paths:

**Change from:**
```html
<link rel="stylesheet" href="assets/css/main.css">
```

**Change to:**
```html
<link rel="stylesheet" href="https://www.vid30.fr/assets/css/main.css">
```

#### Option B: Use CDN for External Libraries
Replace local copies of common libraries with CDN versions:

**Bootstrap CSS:**
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

**jQuery:**
```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

### Step 6: FTP/File Manager Checklist
When uploading files, ensure:
- [ ] All files in `assets/css/` are uploaded
- [ ] All files in `assets/js/` are uploaded
- [ ] All files in `assets/img/` and subdirectories are uploaded
- [ ] All files in `assets/webfonts/` are uploaded
- [ ] File permissions are set correctly
- [ ] Directory structure matches exactly

### Step 7: Web Server Configuration
If using Apache, create/check `.htaccess` file:
```apache
# Enable static file serving
<IfModule mod_mime.c>
    AddType text/css .css
    AddType application/javascript .js
    AddType image/jpeg .jpg .jpeg
    AddType image/png .png
    AddType image/gif .gif
    AddType image/svg+xml .svg
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE text/html
</IfModule>
```

### Step 8: Debugging Commands
If you have server access, run these commands:
```bash
# Check if files exist
ls -la assets/css/
ls -la assets/js/
ls -la assets/img/

# Check file permissions
find assets/ -type f -exec ls -la {} \;

# Check if web server can access files
curl -I https://www.vid30.fr/assets/css/main.css
```

## Quick Fix for Testing
To quickly test if this is the issue, you can temporarily modify one HTML file to use absolute paths for a few assets and see if they load correctly.

## Contact Your Web Host
If none of the above solutions work, contact your web hosting provider with these details:
- Static files (CSS, JS, images) are not being served
- Files are uploaded but return 404 errors
- Ask them to verify server configuration for static file serving

## Expected Result
After fixing the asset paths, your website should:
- Display proper styling and layout
- Have functional JavaScript interactions
- Show all images correctly
- Match the appearance of your local development version