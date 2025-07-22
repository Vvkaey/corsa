# Google Search Console Setup Guide for Stroda Club

## Problem Summary
Your website has duplicate content issues:
- `https://www.stroda.club/` (not indexed)
- `https://stroda.club/` (Google's chosen canonical)

## Code Changes Already Implemented

### 1. Updated SEO Configuration
- Changed canonical URLs from `https://www.stroda.club` to `https://stroda.club`
- Updated all page metadata to use non-www version
- Updated robots.txt and sitemap.xml to use non-www version

### 2. Added Middleware Redirect
- Implemented 301 redirect from www to non-www
- This ensures all www traffic is permanently redirected to non-www

## Google Search Console Steps

### Step 1: Add Both Properties
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add both properties:
   - `https://stroda.club` (primary)
   - `https://www.stroda.club` (secondary)

### Step 2: Verify Both Properties
1. For each property, use one of these verification methods:
   - **HTML tag**: Add the verification code to your `<head>` section
   - **HTML file**: Upload the verification file to your domain root
   - **DNS record**: Add the TXT record to your DNS
   - **Google Analytics**: If you have GA4 connected

### Step 3: Set Preferred Domain (Legacy)
1. In the old Search Console interface:
   - Go to Settings → Domain Settings
   - Set preferred domain to: `https://stroda.club`
   - This tells Google which version to index

### Step 4: Submit Updated Sitemap
1. In Search Console for `https://stroda.club`:
   - Go to Sitemaps section
   - Submit: `https://stroda.club/sitemap.xml`
   - This helps Google discover all your pages

### Step 5: Request Indexing
1. For the www version (`https://www.stroda.club`):
   - Use URL Inspection tool
   - Click "Request Indexing" after the redirect is live
   - This will help Google understand the redirect

### Step 6: Monitor the Transition
1. Check these reports regularly:
   - **Coverage Report**: Monitor indexed pages
   - **URL Inspection**: Check individual page status
   - **Performance Report**: Monitor search performance

## Expected Timeline
- **Immediate**: Redirects start working
- **1-2 weeks**: Google starts recognizing the canonical version
- **2-4 weeks**: Duplicate content issues resolve
- **4-8 weeks**: Full indexing of non-www pages

## Additional Recommendations

### 1. Update External Links
- Update any external links pointing to www version
- Contact partners/sites linking to www version
- Update social media profiles and business listings

### 2. Update Analytics
- Ensure Google Analytics is tracking the non-www version
- Update any custom tracking parameters
- Check that goals and conversions are working

### 3. Monitor Search Performance
- Watch for any temporary drops in traffic
- Monitor keyword rankings during transition
- Check that important pages are being indexed

## Verification Checklist

- [ ] Both properties added to Search Console
- [ ] Both properties verified
- [ ] Preferred domain set to non-www
- [ ] Sitemap submitted
- [ ] Redirects working (test manually)
- [ ] Analytics tracking non-www version
- [ ] External links updated where possible
- [ ] Monitoring search performance

## Troubleshooting

### If www version still shows in search results:
1. Wait 2-4 weeks for Google to process changes
2. Use URL Inspection to request indexing of non-www version
3. Check that redirects are working properly

### If traffic drops temporarily:
1. This is normal during domain transitions
2. Monitor for 2-4 weeks
3. Ensure all important pages are accessible via non-www

### If canonical issues persist:
1. Double-check that all canonical tags point to non-www
2. Verify redirects are 301 (permanent) not 302 (temporary)
3. Check that sitemap only includes non-www URLs

## Contact Information
For technical support with these changes, refer to your development team or hosting provider. 