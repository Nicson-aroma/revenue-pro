# MailRevenuePro - Quick Start Guide for Developers

## Getting Started in 5 Minutes

### 1. Installation (2 minutes)

```bash
# Navigate to project
cd mailrevenuepro

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` - Your app is now running! 🎉

### 2. Making Your First Change (3 minutes)

#### Change the Company Name

**File**: `src/components/Navigation.jsx`

Find this line:
```javascript
<span className="text-xl font-bold text-gray-900">MailRevenuePro</span>
```

Change to:
```javascript
<span className="text-xl font-bold text-gray-900">Your Company Name</span>
```

Save and the change appears instantly (Hot Module Replacement)!

#### Update Pricing

**File**: `src/data/services.js`

Find the service you want to update:
```javascript
{
  id: 1,
  name: 'Email Campaign',
  price: 299,  // ← Change this
  pricing: [
    { tier: 'Starter', contacts: 'Up to 5K', price: 29 },  // ← Or this
    { tier: 'Professional', contacts: 'Up to 25K', price: 79 },
    // ... more tiers
  ]
}
```

#### Add a New Testimonial

**File**: `src/data/services.js`

Find the `testimonials` array and add:
```javascript
{
  name: 'Your Customer',
  company: 'Their Company',
  text: 'Their testimonial about your amazing service!',
  rating: 5
}
```

## Project Structure Overview

```
📁 src/
  📁 components/       ← React components
    Navigation.jsx      - Top navigation bar
    Hero.jsx            - Welcome section
    Services.jsx        - Service cards
    ServiceModal.jsx    - Service details popup
    Features.jsx        - Why choose us
    Testimonials.jsx    - Customer reviews
    Contact.jsx         - Inquiry form
    Footer.jsx          - Bottom section
  
  📁 data/            ← Data & content
    services.js         - All services, pricing, testimonials
  
  📁 assets/          ← Images, fonts
  
  App.jsx             - Main app component
  App.css             - Custom styles & animations
  index.css           - Global styles (Tailwind)
  main.jsx            - Entry point
```

## Common Customizations

### 1. Update Colors

The app uses blue as the primary color. To change it:

**Find all**:
- `bg-blue-600` → Change to your color
- `text-blue-600` → Change to your color
- `border-blue-600` → Change to your color

Example - Change to green:
```javascript
// Old
<button className="bg-blue-600 text-white...">

// New
<button className="bg-green-600 text-white...">
```

Available Tailwind colors:
- `blue`, `red`, `green`, `purple`, `pink`, `yellow`, `indigo`, `cyan`, `teal`, `orange`

Append with intensity: `-50`, `-100`, `-200`, ..., `-900`

### 2. Change Fonts

In `index.css`, modify the font family stack:
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...;
}
```

### 3. Add Your Logo

1. Place logo in `public/` folder
2. Update Navigation.jsx:
```javascript
import logo from '../public/my-logo.png';

<img src={logo} alt="Logo" width="32" height="32" />
```

### 4. Update Contact Information

**File**: `src/components/Footer.jsx`

Find and update:
```javascript
<a href="mailto:info@mailrevenuepro.com">
  info@mailrevenuepro.com
</a>

<a href="tel:+1234567890">
  +1 (234) 567-890
</a>
```

### 5. Add a New Service

**File**: `src/data/services.js`

```javascript
export const services = [
  // ... existing services
  {
    id: 7,  // New ID
    name: 'SMS Marketing',
    title: 'SMS Marketing Setup',
    shortDesc: 'Reach customers via SMS',
    description: 'Professional SMS marketing...',
    features: [
      'Feature 1',
      'Feature 2',
      // ... 8+ features
    ],
    price: 199,
    pricing: [
      { tier: 'Starter', contacts: 'Up to 5K', price: 19 },
      { tier: 'Professional', contacts: 'Up to 25K', price: 59 },
      // ... more tiers
    ],
    image: '📱',
    icon: '💬'
  }
];
```

Done! The new service appears automatically on your site.

## Form Submission Setup

Currently, the contact form just shows a success message locally.

### Connect to Your Email Service

**Example with EmailJS**:

1. Install provider:
```bash
npm install @emailjs/browser
```

2. Update `src/components/Contact.jsx`:

```javascript
import emailjs from '@emailjs/browser';

// Initialize (get your IDs from emailjs.com)
emailjs.init('YOUR_PUBLIC_KEY');

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        to_email: 'your-email@company.com',
        from_name: formData.fullName,
        from_email: formData.email,
        message: formData.projectDetails,
        phone: formData.phone,
        company: formData.company,
        service: formData.selectedService
      }
    );
    
    setSubmitted(true);
  } catch (error) {
    console.error('Email send failed:', error);
    alert('Error sending message. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

### Connect to Your Own API

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('https://your-api.com/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) throw new Error('Failed to submit');
    
    setSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};
```

## Styling Deep Dive

### How Tailwind Works

Instead of writing CSS, you use utility classes:

```html
<!-- Bad - Writing CSS -->
<style>
  .button {
    background: blue;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
  }
</style>
<button class="button">Click me</button>

<!-- Good - Tailwind utilities -->
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
  Click me
</button>
```

### Common Tailwind Classes

```
Spacing:
  p-4         → padding: 1rem
  m-4         → margin: 1rem
  px-4        → padding: horizontal
  py-4        → padding: vertical

Colors:
  bg-blue-600 → background color
  text-white  → text color
  border-gray-300 → border color

Layout:
  flex        → flexbox
  grid        → css grid
  block       → display: block
  hidden      → display: none

Responsive:
  md:px-8     → apply at 768px+ width

Hover effects:
  hover:bg-blue-700 → change on hover
  transition  → smooth transition
```

## Responsive Design

The layout adapts to different screen sizes:

```
Mobile (< 640px)   │  Tablet (768px)      │  Desktop (1024px+)
─────────────────  │  ─────────────────  │  ──────────────────
Single column      │  Two columns         │  Three+ columns
Large buttons      │  Medium buttons      │  Standard buttons
Stacked layout     │  Separated layout    │  Full layout
```

To test:
1. Open DevTools (F12)
2. Click device icon (top left)
3. Select device size

## Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Create optimized build
npm run preview          # Preview production build

# Linting
npm run lint             # Check code quality

# Clean
rm -rf node_modules     # Remove dependencies
npm install             # Reinstall dependencies
npm cache clean --force # Clear npm cache
```

## Debugging Tips

### View Your Data

Add this to any component:
```javascript
useEffect(() => {
  console.log('FormData:', formData);
  console.log('Selected Service:', selectedService);
}, [formData, selectedService]);
```

Open DevTools (F12) → Console tab to see output.

### Test Form Submission

In Browser Console:
```javascript
// Test without sending
fetch('https://your-api.com/inquiries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: 'data' })
})
.then(r => r.json())
.then(d => console.log('Response:', d))
.catch(e => console.error('Error:', e));
```

### Update Styling in Real-Time

1. Open DevTools
2. Find the element (Inspector tab)
3. Edit classes in the `class` attribute
4. If you like it, update the component

## File Locations Quick Reference

| Task | File |
|------|------|
| Change company name | `Navigation.jsx`, `Footer.jsx` |
| Update pricing | `data/services.js` |
| Add testimonial | `data/services.js` |
| Change colors | All components (search `blue-600`) |
| Update contact info | `Footer.jsx` |
| Modify hero message | `Hero.jsx` |
| Add form field | `Contact.jsx` |
| Change layout | Components & `App.css` |
| Global styles | `index.css` |

## Performance Tips

### Images
- Keep images under 100KB
- Use modern formats (WebP)
- Lazy load with `loading="lazy"`

### Code
- Keep components small
- Use `React.memo()` for expensive components
- Remove unused dependencies

### CSS
- Tailwind only loads classes you use
- Tree-shaking removes unused code
- Production builds are automatically minified

## Next Steps

1. ✅ Customized with your company info
2. ✅ Updated pricing and services
3. ✅ Changed colors and styling
4. ✅ Connected form submission
5. ✅ Added analytics (optional)
6. ✅ Deployed to production (see DEPLOYMENT.md)

## Getting Help

**Common Issues**:
- Can't find file? Use Ctrl+P (Cmd+P) to search
- Styling not working? Check spelling & capitalization
- Form not submitting? Check console (F12) for errors

**Resources**:
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev)

**Stack Overflow Tags**:
- `reactjs`, `tailwindcss`, `vite`

## Summary

You now have a professional email marketing website that you can:
- ✅ Customize colors and branding
- ✅ Update services and pricing
- ✅ Manage testimonials and content
- ✅ Integrate with your backend
- ✅ Deploy to production

Happy coding! 🚀

---

**Questions?** Check DOCUMENTATION.md for detailed information.
