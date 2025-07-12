# Deployment Checklist - www.vid30.fr

## Pre-Deployment Checklist

### ✅ File Structure Verification
- [ ] All files in `assets/css/` directory exist
- [ ] All files in `assets/js/` directory exist  
- [ ] All files in `assets/img/` directory and subdirectories exist
- [ ] All files in `assets/webfonts/` directory exist
- [ ] HTML files are in root directory
- [ ] `contact.php` file exists (if using PHP functionality)

### ✅ Asset Path Verification
- [ ] All CSS links in HTML use relative paths: `assets/css/filename.css`
- [ ] All JS scripts in HTML use relative paths: `assets/js/filename.js`
- [ ] All image sources in HTML use relative paths: `assets/img/folder/filename.jpg`
- [ ] No hardcoded localhost or absolute paths in HTML

### ✅ File Upload Process
- [ ] Upload entire project folder structure to server
- [ ] Maintain exact same folder hierarchy on server
- [ ] Ensure `assets/` folder is uploaded to correct location
- [ ] Verify all subdirectories within `assets/` are uploaded

### ✅ Server Configuration
- [ ] Files uploaded to correct web directory (public_html, www, htdocs, etc.)
- [ ] File permissions set correctly (644 for files, 755 for directories)
- [ ] Web server configured to serve static files
- [ ] `.htaccess` file configured if using Apache

## Post-Deployment Testing

### ✅ Quick Visual Test
- [ ] Visit www.vid30.fr in browser
- [ ] Check if styling appears correctly
- [ ] Verify images are loading
- [ ] Test JavaScript functionality

### ✅ Manual Asset Testing
Visit these URLs directly in browser:
- [ ] `https://www.vid30.fr/assets/css/main.css`
- [ ] `https://www.vid30.fr/assets/js/main.js`
- [ ] `https://www.vid30.fr/assets/img/hero/01.jpg`

**Expected:** Files should display, not 404 errors

### ✅ Browser Developer Tools Check
- [ ] Open Developer Tools (F12)
- [ ] Check Network tab for any 404 errors
- [ ] Verify all assets are loading successfully
- [ ] Check Console for JavaScript errors

### ✅ Asset Test Page
- [ ] Upload `asset-test.html` to server
- [ ] Visit `https://www.vid30.fr/asset-test.html`
- [ ] Run all tests and verify green checkmarks

## Common Issues & Quick Fixes

### Issue: 404 Errors on Assets
**Fix:** Re-upload the entire `assets/` folder

### Issue: Files Exist but Still 404
**Fix:** Check file permissions and server configuration

### Issue: Some Assets Load, Others Don't
**Fix:** Compare file permissions and verify all files uploaded

### Issue: JavaScript Not Working
**Fix:** Check browser console for errors and verify all JS files uploaded

### Issue: Images Not Loading
**Fix:** Verify image file paths and ensure image subdirectories uploaded

## Emergency Fixes

### If Assets Still Don't Load:
1. **Contact hosting provider** - ask about static file serving
2. **Use CDN versions** for common libraries (Bootstrap, jQuery)
3. **Convert to absolute paths** temporarily for testing
4. **Check server logs** for specific error messages

## File Permissions Reference
- **Files:** 644 (readable by all, writable by owner)
- **Directories:** 755 (readable and executable by all, writable by owner)

## Success Criteria
✅ Website displays with proper styling
✅ All images appear correctly  
✅ JavaScript functionality works
✅ No 404 errors in browser Network tab
✅ All asset URLs return valid files (not 404)

## Next Deployment
- [ ] Follow this checklist completely
- [ ] Test with `asset-test.html` before going live
- [ ] Keep backup of working deployment