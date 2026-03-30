# MailRevenuePro - Deployment Guide

This guide provides detailed instructions for deploying MailRevenuePro to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Local Build Verification](#local-build-verification)
3. [Deployment Platforms](#deployment-platforms)
4. [Environment Configuration](#environment-configuration)
5. [Post-Deployment Testing](#post-deployment-testing)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

## Pre-Deployment Checklist

### Code Quality
- [ ] All components have proper error handling
- [ ] No console errors or warnings
- [ ] ESLint passes: `npm run lint`
- [ ] All imports are correct
- [ ] No unused dependencies

### Testing
- [ ] All pages load correctly
- [ ] Forms submit without errors
- [ ] Navigation works smoothly
- [ ] Responsive design tested on mobile/tablet
- [ ] Contact form validation works
- [ ] Modal opens/closes properly

### Configuration
- [ ] Contact form endpoint configured
- [ ] Analytics ID set (if using)
- [ ] Environment variables created
- [ ] Error tracking configured (optional)
- [ ] Privacy policy added (if required)

### Content
- [ ] All service information accurate
- [ ] Pricing information current
- [ ] Contact information correct
- [ ] Testimonials complete
- [ ] Links tested

## Local Build Verification

### 1. Create Production Build

```bash
npm run build
```

This creates an optimized `dist/` folder with minified assets.

### 2. Test Production Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173` and verify:
- All pages load correctly
- Styling is intact
- No JavaScript errors
- Navigation works
- Modal functionality works
- Form submission

### 3. Check Build Output

```bash
# Check build size
ls -lh dist/

# Check generated files
ls -R dist/
```

Expected structure:
```
dist/
├── index.html
├── assets/
│   ├── main-xxxxx.js
│   ├── main-xxxxx.css
│   └── ...
└── (other static files)
```

## Deployment Platforms

### Option 1: Vercel (Recommended)

**Advantages**:
- Zero-config deployment
- Free tier available
- Automatic HTTPS
- Edge functions support
- Analytics included

**Steps**:

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Configuration** (vercel.json):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Option 2: Netlify

**Advantages**:
- Git integration
- Form handling
- Free SSL
- Generous free tier
- Easy rollbacks

**Steps**:

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Netlify**:
- Visit [netlify.com](https://netlify.com)
- Click "New site from Git"
- Select repository
- Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`

3. **Configuration** (netlify.toml):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Option 3: GitHub Pages

**Advantages**:
- Free hosting
- GitHub integration
- Simple setup

**Steps**:

1. **Update vite.config.js**:
```javascript
export default {
  base: '/mailrevenuepro/',  // Repository name
  // ... other config
}
```

2. **Add GitHub Actions** (.github/workflows/deploy.yml):
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Option 4: Traditional Hosting (Apache/Nginx)

**Apache Configuration** (.htaccess):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/mailrevenuepro/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Don't cache HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "public, must-revalidate, proxy-revalidate";
    }
}
```

## Environment Configuration

### Create Environment Files

**.env.production**:
```
VITE_API_URL=https://api.mailrevenuepro.com
VITE_GA_ID=G-XXXXXXXXXX
VITE_CONTACT_EMAIL=info@mailrevenuepro.com
VITE_ENV=production
```

**.env.development**:
```
VITE_API_URL=http://localhost:3000
VITE_GA_ID=G-DEV-ID
VITE_CONTACT_EMAIL=dev@mailrevenuepro.com
VITE_ENV=development
```

### Use Environment Variables

```javascript
// Access in components
const apiUrl = import.meta.env.VITE_API_URL;
const gaId = import.meta.env.VITE_GA_ID;

// Example: Contact form submission
const submitForm = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/submit-inquiry`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  );
  return response.json();
};
```

## Post-Deployment Testing

### 1. Functionality Testing

```
Navigation
- [ ] All links work
- [ ] Smooth scrolling
- [ ] Mobile menu works
- [ ] Logo links to home

Hero Section
- [ ] Headline displays correctly
- [ ] CTA buttons work
- [ ] Statistics visible
- [ ] Responsive on mobile

Services
- [ ] All 6 services display
- [ ] Service cards clickable
- [ ] Modal opens on click
- [ ] Modal closes properly
- [ ] Pricing tiers display

Contact Form
- [ ] All fields present
- [ ] Form submits
- [ ] Success message shows
- [ ] Validation works
- [ ] Mobile responsive

Footer
- [ ] Links work
- [ ] Social links present
- [ ] Contact info displays
- [ ] Copyright shows
```

### 2. Performance Testing

**Using Lighthouse**:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Target scores:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

**Using WebPageTest**:
- Visit [webpagetest.org](https://webpagetest.org)
- Enter your domain
- Check metrics:
  - First Contentful Paint < 1s
  - Largest Contentful Paint < 2.5s
  - Cumulative Layout Shift < 0.1

### 3. Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### 4. Security Testing

```bash
# Check for security headers
curl -i https://your-domain.com

# Test SSL
openssl s_client -connect your-domain.com:443

# Check Content Security Policy
```

Headers to include:
```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

## Monitoring & Maintenance

### Setup Monitoring

**Google Analytics**:
1. Create GA4 property
2. Get measurement ID
3. Add to `.env.production`
4. Install gtag script:

```javascript
// src/App.jsx
useEffect(() => {
  if (import.meta.env.VITE_GA_ID) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', import.meta.env.VITE_GA_ID);
  }
}, []);
```

### Uptime Monitoring

Services:
- [UptimeRobot](https://uptimerobot.com) - Free tier available
- [Pingdom](https://tools.pingdom.com)
- [StatusPage.io](https://statuspage.io)

### Error Tracking

**Sentry Setup**:
```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://your-sentry-dsn@sentry.io/project-id",
  tracesSampleRate: 1.0,
});
```

### Regular Maintenance

**Weekly**:
- [ ] Check error logs
- [ ] Verify form submissions
- [ ] Monitor uptime

**Monthly**:
- [ ] Update dependencies
- [ ] Review analytics
- [ ] Check performance
- [ ] Test functionality
- [ ] Backup data

**Quarterly**:
- [ ] Security audit
- [ ] Performance optimization
- [ ] Content review
- [ ] User feedback analysis

## Troubleshooting

### Issue: Build Fails

**Solutions**:
```bash
# Clear cache and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Issue: Assets Not Loading

**Solutions**:
1. Check base path in vite.config.js
2. Verify static files in public/
3. Check asset references

```javascript
// vite.config.js
export default {
  base: '/',  // Or '/subdirectory/'
}
```

### Issue: Form Submission Not Working

**Solutions**:
1. Check API endpoint
2. Verify CORS settings
3. Check browser console for errors
4. Test with curl:

```bash
curl -X POST https://your-api.com/submit-inquiry \
  -H "Content-Type: application/json" \
  -d '{"test":"data"}'
```

### Issue: Slow Performance

**Solutions**:
1. Enable compression (gzip)
2. Add caching headers
3. Optimize images
4. Use CDN
5. Enable lazy loading

### Issue: Mobile Not Responsive

**Solutions**:
1. Add viewport meta tag
2. Check media queries
3. Test breakpoints
4. Clear browser cache

```html
<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Domain & SSL Setup

### DNS Configuration

```dns
A Record
Host: @
Value: Your server IP or CDN IP

CNAME (for subdomain)
Host: www
Value: your-domain.com
```

### SSL Certificate

**Automatic** (Recommended):
- Vercel: Automatic with free cert
- Netlify: Automatic with free cert
- Let's Encrypt: Free automated certs

**Manual**:
```bash
# Certbot (Let's Encrypt)
sudo certbot certonly --webroot -w /var/www/mailrevenuepro -d your-domain.com
```

## Workflow Summary

1. **Development**
   - Edit components
   - Test locally
   - Commit changes

2. **Staging**
   - Deploy to staging
   - Full testing
   - Performance check

3. **Production**
   - Deploy to production
   - Monitor metrics
   - Handle issues

4. **Maintenance**
   - Regular updates
   - Performance monitoring
   - Security patches

## Quick Deploy Commands

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# GitHub Pages
git push origin main

# FTP Upload
lftp -u user,password ftp.host.com
mput dist/*
exit
```

---

**Last Updated**: March 24, 2026
**Version**: 1.0.0
