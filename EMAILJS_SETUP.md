# EmailJS Setup Guide

This project uses **EmailJS** to send contact form submissions to your email: **newjhsayem@gmail.com**

## Setup Steps

### 1. Sign Up at EmailJS
- Go to [emailjs.com](https://emailjs.com)
- Click **Sign Up** and create a free account
- Verify your email

### 2. Get Your Public Key
- In your EmailJS dashboard, go to **Account**
- Copy your **Public Key** (looks like: `abc123def456xyz`)
- Save it for later

### 3. Create Email Service
- Go to **Email Services** section
- Click **Add Service**
- Choose **Gmail** (or your email provider)
- Connect your Gmail account (newjhsayem@gmail.com)
- Name it something like "Gmail Service"
- Copy the **Service ID** (looks like: `service_abc123def456`)

### 4. Create Email Template
- Go to **Email Templates** section
- Click **Create New Template**
- Name it: `contact_form_template`
- Fill in the template:

**Email Settings:**
- To Email: `{{to_email}}`
- From Name: `{{from_name}}`
- Subject: `New Contact Form Submission from {{from_name}}`

**Email Body Template:**
```
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Selected Service: {{service}}
Budget: {{budget}}
Timeline: {{timeline}}
Preferred Contact: {{contact_method}}

Message:
{{message}}
```

- Copy the **Template ID** (looks like: `template_abc123def456`)

### 5. Update Configuration File
Open `src/config/emailjs.js` and replace:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE';
```

With your actual IDs from steps 2-4.

### 6. Test the Form
- Go to your application
- Fill out the contact form
- Submit it
- Check your email (newjhsayem@gmail.com) for the message

## Troubleshooting

**Issue: "Template not found" error**
- Verify the Template ID is correct in `src/config/emailjs.js`
- Make sure the template variable names match ({{from_name}}, {{from_email}}, etc.)

**Issue: Email not sending**
- Check that Gmail service is connected in EmailJS
- Verify your Public Key, Service ID, and Template ID are all correct
- Check browser console for error messages

**Issue: Gmail connection failed**
- Some Gmail accounts require enabling "Less secure app access"
- Or use "App Passwords" if you have 2FA enabled

## EmailJS Limits
- **Free plan**: 200 emails/month
- **Premium**: Unlimited emails

For large-scale production, consider upgrading to a paid plan.
