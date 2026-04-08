import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const CONTACT_TO_EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL;
const hasEmailJsConfig = Boolean(
  EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && CONTACT_TO_EMAIL
);

if (hasEmailJsConfig) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export const sendContactForm = async (formData) => {
  if (!hasEmailJsConfig) {
    throw new Error('EmailJS is not configured. Set the VITE_EMAILJS_* and VITE_CONTACT_TO_EMAIL variables.');
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: CONTACT_TO_EMAIL,
        selected_date: formData.selectedDate,
        selected_time: formData.selectedTime,
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        monthly_revenue: formData.monthlyRevenue,
        business_type: formData.businessType,
        service: formData.selectedService,
        budget: formData.budget,
        timeline: formData.timeline,
        contact_method: formData.preferredContact,
        current_challenges: formData.currentChallenges,
        message: formData.projectDetails,
      }
    );
    return response;
  } catch (error) {
    console.error('EmailJS error:', error);
    throw error;
  }
};

export { hasEmailJsConfig };
export const EMAILJS_CONFIG_ERROR = 'EmailJS is not configured. Set the VITE_EMAILJS_* and VITE_CONTACT_TO_EMAIL variables.';
