import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import abandonWorkflowImg from '../assets/abandon-workflow.png';
import abandonCartImg from '../assets/abandone-cart-automation.png';
import design1 from '../assets/design-1.png';
import design2 from '../assets/design-2.png';
import heroImg from '../assets/hero.png';
import monthlyStatsImg from '../assets/monthly-campaign-stats.png';
import popup1Img from '../assets/pop-up-form.png';
import popup2Img from '../assets/pop-up-form-2.png';
import welcomeWorkflowImg from '../assets/welcome-mail-workflow.png';

const portfolioItems = [
  {
    title: 'Email Template Design',
    description: 'Builds enchantment with magical type, colors, and responsive layout for every device.',
    details: [
      'Fully responsive HTML templates with fallbacks for major clients',
      'Brand color palette and typography system',
      'Mobile-first designs and AMP for email support',
      'Clickable CTA sections and content blocks for testing',
    ],
    image: design1,
  },
  {
    title: 'Interactive Campaign Layout',
    description: 'Use artful animation and storytelling to make each message feel like fantasy chapter.',
    details: [
      'Story-driven narrative sequences with flow charts',
      'Gamified content sections and reward incentives',
      'Personalization tokens for dynamic data injection',
    ],
    image: heroImg,
  },
  {
    title: 'Email Automation Saga',
    description: 'Auto-flow campaigns: welcome journey, nurture sequences, and win-back quests.',
    details: [
      'Multi-step workflows for onboarding, retention, and long-term engagement',
      'Behavior triggers based on clicks, opens, and purchase history',
      'Personalized branching and drip schedule optimization',
    ],
    image: welcomeWorkflowImg,
  },
  {
    title: 'Cart Abandonment Magic',
    description: 'Retrieve lost treasure with cart automation and white-glow triggered reminders.',
    details: [
      '3x cart recovery sequences with discount/urgency hooks',
      'Realtime product data sync and dynamic product blocks',
      'A/B tested subject lines and incentive combinations',
    ],
    image: abandonCartImg,
  },
  {
    title: 'Abandoned Workflow Alchemy',
    description: 'Revive dormant prospects through multi-step, scenario-driven workflows.',
    details: [
      'Dynamic cadence and content based on behavior and recency',
      'Cross-channel orchestration: email, push, SMS reminders',
      'Lead scoring and requalification triggers',
    ],
    image: abandonWorkflowImg,
  },
  {
    title: 'Popup & Lead Castles',
    description: 'Capture new subscribers inside dynamic popups with mythical offers.',
    details: [
      'Custom entry/exit intent triggers with time delays',
      'Designed to reduce friction and increase subscriber trust',
      'Integration with CRM and e-mail lists for instant sync',
    ],
    image: popup1Img,
  },
  {
    title: 'Popup 2.0: Storybook Edition',
    description: 'A/B tested pop-up designs that read like invitation cards and boost opt-ins.',
    details: [
      'Variant testing of CTAs, images, and microcopy for max conversions',
      'Infusing brand storytelling with urgency and social proof',
      'Lead capture forms optimized for minimal friction and GDPR ease',
    ],
    image: popup2Img,
  },
  {
    title: 'Analytics Crystal Ball',
    description: 'Visualize performance with crystal-clear charts and metrics to guide strategy.',
    details: [
      'Dashboard reporting for opens, clicks, deliverability, and conversions',
      'Heatmaps and engagement segment breakdowns',
      'Recommendations to boost campaign efficiency and ROI',
    ],
    image: monthlyStatsImg,
  },
  {
    title: 'UX & Conversion Enchantments',
    description: 'Design systems combining high-impact visuals and UX wizardry.',
    details: [
      'Conversion-focused layout patterns and CTAs',
      'Accessibility, readability, and dark/light theming',
      'User feedback loops and iteration cycles',
    ],
    image: design2,
  }
];

export default function Portfolio({ isFullPage = false }) {
  const { isDarkMode } = useDarkMode();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section
      id="portfolio"
      className={`py-20 px-4 ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900'}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className={`text-5xl font-extrabold tracking-tight mb-4 ${isDarkMode ? 'text-emerald-300' : 'text-indigo-900'}`}>
            {isFullPage ? 'Full Portfolio Showcase' : 'Portfolio'}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A fantastical gallery of email marketing wizardry: templates, automation tales, segmentation realms, and performance prophecy.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedItem(item)}
              className={`cursor-pointer rounded-2xl overflow-hidden border-2 shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-105 ${isDarkMode ? 'border-purple-600 bg-gray-900' : 'border-indigo-100 bg-white'}`}
            >
              <div className="relative">
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-cyan-200' : 'text-blue-900'}`}>
                  {item.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {isFullPage && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Explore more in the Services section and contact us for a custom spellbinding campaign.
            </p>
          </motion.div>
        )}

        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img src={selectedItem.image} alt={selectedItem.title} className="h-64 w-full object-cover" />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-white hover:bg-black"
                >
                  ✕ Close
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-3">{selectedItem.title}</h3>
                <p className="mb-4 text-gray-500 dark:text-gray-300">{selectedItem.description}</p>
                <h4 className="font-semibold mb-2">Core Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  {(selectedItem.details ?? [selectedItem.description]).map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

