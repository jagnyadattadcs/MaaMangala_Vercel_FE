import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, HelpCircle, Clock, DollarSign, Wrench, Shield } from 'lucide-react';

const FAQs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'services', name: 'Services', icon: Wrench },
    { id: 'pricing', name: 'Pricing', icon: DollarSign },
    { id: 'appointments', name: 'Appointments', icon: Clock },
    { id: 'warranty', name: 'Warranty', icon: Shield },
  ];

  const faqs = {
    general: [
      {
        question: 'What makes Maa Mangala different from other car service centers?',
        answer: 'Maa Mangala stands out with our certified technicians, transparent pricing, genuine parts guarantee, and comprehensive warranty on all services. We also offer pickup and delivery services, making car maintenance convenient for our customers.'
      },
      {
        question: 'Do you service all car brands and models?',
        answer: 'Yes, we service all major car brands including Maruti, Tata, Hyundai, Honda, Toyota, BMW, Mercedes, Audi, and many more. Our technicians are trained to work on both domestic and imported vehicles.'
      },
      {
        question: 'What are your operating hours?',
        answer: 'We are open Monday to Saturday from 8:00 AM to 8:00 PM, and Sunday from 10:00 AM to 6:00 PM. We also provide 24/7 emergency roadside assistance for breakdown situations.'
      },
      {
        question: 'Where is Maa Mangala located?',
        answer: 'Our main workshop is located at 123 Service Road, Auto Hub, Mumbai, Maharashtra 400001. We have ample parking space and easy accessibility from major roads.'
      }
    ],
    services: [
      {
        question: 'What services do you offer?',
        answer: 'We offer comprehensive automotive services including engine repair, AC service, brake service, battery replacement, tyre service, oil changes, transmission repair, electrical diagnostics, paint and body work, and periodic maintenance.'
      },
      {
        question: 'Do you use genuine parts for repairs?',
        answer: 'Yes, we exclusively use genuine OEM parts or high-quality OES parts. We never compromise on quality and all parts come with manufacturer warranties.'
      },
      {
        question: 'How long does a typical service take?',
        answer: 'Service time varies depending on the work required. Basic services like oil change take 30-45 minutes, while comprehensive services can take 2-4 hours. Major repairs may require 1-2 days. We always provide estimated completion times upfront.'
      },
      {
        question: 'Do you provide pickup and delivery services?',
        answer: 'Yes, we offer complimentary pickup and delivery services within a 15km radius of our workshop for services above ₹2,000. For other areas, nominal charges may apply.'
      },
      {
        question: 'Can you handle insurance claims?',
        answer: 'Absolutely! We are empaneled with all major insurance companies and can handle the entire insurance claim process on your behalf, making it hassle-free for you.'
      }
    ],
    pricing: [
      {
        question: 'How is your pricing structured?',
        answer: 'Our pricing is transparent with no hidden charges. We provide detailed estimates before starting any work. Prices are competitive and include labor, parts, and applicable taxes.'
      },
      {
        question: 'Do you offer any discounts or packages?',
        answer: 'Yes, we offer various packages for regular maintenance and seasonal discounts. We also have loyalty programs for repeat customers and special offers for multiple services.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, all major credit/debit cards, UPI payments, net banking, and mobile wallets. We also offer EMI options for major repairs through partner banks.'
      },
      {
        question: 'Can I get a quote before visiting?',
        answer: 'Yes, you can get an estimated quote by calling us or using our online booking system. For accurate pricing, we recommend a physical inspection of your vehicle.'
      }
    ],
    appointments: [
      {
        question: 'How can I book an appointment?',
        answer: 'You can book appointments through our website, mobile app, phone call, or by visiting our workshop. Online booking is available 24/7 for your convenience.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'For regular services, we recommend booking 2-3 days in advance. However, we do accommodate same-day appointments based on availability. Emergency services are always prioritized.'
      },
      {
        question: 'Can I reschedule or cancel my appointment?',
        answer: 'Yes, you can reschedule or cancel your appointment up to 2 hours before the scheduled time without any charges. You can do this through our website, app, or by calling us.'
      },
      {
        question: 'What if I\'m late for my appointment?',
        answer: 'We understand traffic and other delays. Please call us if you\'re running late. We\'ll try our best to accommodate you, though there might be a slight delay in service depending on our schedule.'
      },
      {
        question: 'Do you offer emergency services?',
        answer: 'Yes, we provide 24/7 emergency roadside assistance for breakdowns, flat tires, battery issues, and lockouts. Call our emergency hotline for immediate assistance.'
      }
    ],
    warranty: [
      {
        question: 'What warranty do you provide on services?',
        answer: 'We provide a comprehensive 6-month warranty on all repairs and services. Parts warranty varies by manufacturer, typically ranging from 6 months to 2 years.'
      },
      {
        question: 'What does the warranty cover?',
        answer: 'Our warranty covers the specific service performed and parts replaced. It includes free re-service if the same issue occurs within the warranty period due to our workmanship.'
      },
      {
        question: 'How do I claim warranty?',
        answer: 'To claim warranty, simply visit our workshop with your service receipt. Our team will inspect and provide free re-service if the issue is covered under warranty terms.'
      },
      {
        question: 'Are there any warranty exclusions?',
        answer: 'Warranty doesn\'t cover normal wear and tear, damage due to accidents, misuse, or modifications done elsewhere. Detailed warranty terms are provided with your service receipt.'
      },
      {
        question: 'Do you honor manufacturer warranties?',
        answer: 'Yes, we are authorized to perform warranty services for multiple car manufacturers. Your vehicle\'s manufacturer warranty remains valid when serviced at Maa Mangala.'
      }
    ]
  };

  const filteredFAQs = faqs[activeCategory as keyof typeof faqs].filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-red-200">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Find answers to common questions about our services and policies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-6 w-6 text-red-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-red-600 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="px-6 py-4">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No FAQs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try searching with different keywords or browse other categories
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Can't find the answer you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 inline-flex items-center justify-center space-x-2"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Contact Support</span>
              </a>
              <a
                href="tel:+919876543210"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 inline-flex items-center justify-center space-x-2"
              >
                <Clock className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;