import abandonWorkflowImg from '../assets/abandon-workflow.png';
import abandonCartImg from '../assets/abandone-cart-automation.png';
import design1 from '../assets/design-1.png';
import heroImg from '../assets/hero.png';
import monthlyStatsImg from '../assets/monthly-campaign-stats.png';
import welcomeWorkflowImg from '../assets/welcome-mail-workflow.png';

export const caseStudies = [
  {
    slug: 'abandoned-cart-recovery-boost',
    result: '$120,000',
    resultLabel: 'generated in 60 days',
    headline: 'Generated $120,000 in 60 Days from Abandoned Cart Optimization',
    client: 'Mid-size Shopify fashion brand',
    industry: 'Fashion / Shopify',
    heroDescription:
      'A structured recovery flow replaced a single reminder email and unlocked materially higher abandoned cart revenue.',
    stats: [
      { value: '$120K', label: 'Revenue Generated' },
      { value: '5% to 18%', label: 'Recovery Rate' },
      { value: '42%', label: 'Average Open Rate' },
    ],
    problems: [
      'Abandoned cart recovery was sitting under 5%.',
      'The brand had only one basic reminder email live.',
      'There was no urgency, social proof, or personalization inside the flow.',
    ],
    missing:
      'The account was missing a true recovery sequence, dynamic merchandising, and testing discipline around subject lines and timing.',
    strategy: [
      'Built a 3-email abandoned cart flow with escalating conversion intent.',
      'Added limited-stock urgency messaging to push hesitant shoppers to act.',
      'Used product reviews and customer proof to strengthen trust.',
      'Inserted dynamic product blocks so each email reflected the shopper’s actual cart.',
      'Ran A/B tests on subject lines to improve opens and recovery volume.',
    ],
    execution: [
      {
        image: abandonCartImg,
        title: 'Abandoned Cart Automation Map',
        description: 'The flow introduced spaced reminders, urgency layers, and dynamic cart content instead of one generic follow-up.',
      },
      {
        image: monthlyStatsImg,
        title: 'Performance Tracking',
        description: 'Recovery metrics were tracked daily so subject line and cadence adjustments could be made quickly.',
      },
    ],
    results: [
      { value: '$120,000', label: 'Revenue Generated in 60 Days' },
      { value: '18%', label: 'Recovered Cart Rate After Optimization' },
      { value: '42%', label: 'Average Open Rate Across the Flow' },
    ],
    beforeAfter: [
      { before: '1 email', after: '3 emails', label: 'Cart Recovery Sequence' },
      { before: 'Under 5%', after: '18%', label: 'Recovery Rate' },
      { before: 'No testing', after: 'Ongoing A/B tests', label: 'Optimization Process' },
    ],
    takeaways: [
      'Most of the recovered revenue came from the second and third emails, not the first reminder.',
      'Urgency messaging worked best when paired with dynamic product reminders rather than discount-heavy copy.',
      'Social proof helped close the gap for shoppers who needed reassurance before purchasing.',
    ],
  },
  {
    slug: 'full-email-system-setup',
    result: '38%',
    resultLabel: 'email revenue increase',
    headline: 'Increased Email Revenue by 38% in 90 Days',
    client: 'Health & wellness eCommerce brand',
    industry: 'Health & Wellness',
    heroDescription:
      'A fragmented email setup was replaced with a complete revenue system covering flows, campaigns, and segmentation.',
    stats: [
      { value: '38%', label: 'Email Revenue Increase' },
      { value: '$85K', label: 'Generated in 3 Months' },
      { value: '22%', label: 'Repeat Purchase Lift' },
    ],
    problems: [
      'There were no properly built lifecycle flows in the account.',
      'The brand relied on occasional campaigns without a consistent system.',
      'Segmentation was weak, so sends were broad and under-personalized.',
    ],
    missing:
      'What was missing was a complete lifecycle structure, weekly campaign rhythm, and customer behavior-based segmentation.',
    strategy: [
      'Built a full welcome flow to convert new subscribers faster.',
      'Launched abandoned cart, post-purchase, and win-back automations.',
      'Created a weekly campaign strategy with more intentional promotions and content themes.',
      'Segmented audiences by behavior, engagement, and purchase stage.',
      'Aligned campaign planning with lifecycle data so sends were more relevant.',
    ],
    execution: [
      {
        image: welcomeWorkflowImg,
        title: 'Lifecycle Flow Buildout',
        description: 'Welcome, post-purchase, and retention workflows were mapped and deployed as a connected system.',
      },
      {
        image: heroImg,
        title: 'Campaign and Segment Dashboard',
        description: 'The operating view combined campaign planning with audience behavior so offers reached the right segments.',
      },
    ],
    results: [
      { value: '38%', label: 'Increase in Total Email Revenue' },
      { value: '$85,000', label: 'Generated in 90 Days' },
      { value: '22%', label: 'Increase in Repeat Purchases' },
    ],
    beforeAfter: [
      { before: 'Occasional campaigns', after: 'Weekly strategy', label: 'Campaign Cadence' },
      { before: 'Minimal flows', after: '4 core automations', label: 'Lifecycle Coverage' },
      { before: 'Broad sending', after: 'Behavior-based segments', label: 'Audience Targeting' },
    ],
    takeaways: [
      'Segmentation alone increased campaign revenue by 2.3x because the offers became more relevant.',
      'The post-purchase and win-back flows materially improved repeat purchase behavior over time.',
      'System consistency mattered more than isolated one-off campaign wins.',
    ],
  },
  {
    slug: 'campaign-optimization',
    result: '2x',
    resultLabel: 'campaign revenue growth',
    headline: 'Doubled Campaign Revenue with Better Strategy & Copy',
    client: 'Beauty brand (DTC)',
    industry: 'Beauty / DTC',
    heroDescription:
      'The brand was already sending campaigns, but weak offer structure and generic messaging were suppressing performance.',
    stats: [
      { value: '2x', label: 'Campaign Revenue' },
      { value: '18% to 36%', label: 'Open Rate' },
      { value: '+70%', label: 'CTR Increase' },
    ],
    problems: [
      'Campaigns were going out regularly but revenue stayed flat.',
      'Messaging was generic and lacked persuasive structure.',
      'Offers were unclear, so emails did not create enough action.',
    ],
    missing:
      'The missing layer was sharper copy strategy, better offer presentation, and more deliberate send timing and frequency.',
    strategy: [
      'Rewrote campaign copy around clearer offer framing and direct purchase motivation.',
      'Introduced urgency and scarcity where the product and inventory supported it.',
      'Used story-based email angles to make launches and promotions more memorable.',
      'Optimized send timing and frequency using engagement data.',
      'Adjusted campaign hierarchy so the CTA and value proposition appeared earlier.',
    ],
    execution: [
      {
        image: design1,
        title: 'Campaign Creative Refresh',
        description: 'The layout stayed clean, but the messaging hierarchy and offer clarity were rebuilt for conversion.',
      },
      {
        image: abandonWorkflowImg,
        title: 'Send Timing and Performance Review',
        description: 'Timing, sequencing, and campaign structure were reviewed against click and revenue patterns.',
      },
    ],
    results: [
      { value: '2x', label: 'Campaign Revenue Increase' },
      { value: '36%', label: 'Open Rate After Optimization' },
      { value: '+70%', label: 'CTR Improvement' },
    ],
    beforeAfter: [
      { before: '18%', after: '36%', label: 'Open Rate' },
      { before: 'Generic copy', after: 'Offer-led messaging', label: 'Campaign Positioning' },
      { before: 'Low CTR', after: '+70%', label: 'Click Performance' },
    ],
    takeaways: [
      'Copywriting had a larger revenue impact than visual design changes alone.',
      'The strongest lifts came from clearer offers and faster value communication near the top of the email.',
      'Better timing improved results, but messaging strategy drove the largest performance gains.',
    ],
  },
];

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
