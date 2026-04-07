import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// Get your PUBLIC KEY from emailjs.com dashboard
const EMAILJS_PUBLIC_KEY = 'tJjg1g9Fqb8yFklRw';
const EMAILJS_SERVICE_ID = 'service_iqzzw7z';
const EMAILJS_TEMPLATE_ID = 'template_0asbruo';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendContactForm = async (formData) => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: 'newjhsayem@gmail.com',
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
