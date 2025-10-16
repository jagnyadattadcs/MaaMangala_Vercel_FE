import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Car,
  CheckCircle
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
  const API_BASE = import.meta.env.VITE_CONTACT_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Parse response safely depending on content type
      const contentType = response.headers.get('content-type') || '';
      const payload = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const errorMsg = typeof payload === 'string' ? payload.slice(0, 200) : payload?.error || 'Request failed';
        throw new Error(`HTTP ${response.status} - ${errorMsg}`);
      }

      alert('Thank you for your message! We will get back to you within 24 hours.');
      reset();
    } catch (error) {
      alert('Error submitting message: ' + error.message);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 94371 42013', '+91 79789 33702'],
      description: '24/7 Emergency Support'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['maamangalaautoworks5@gmail.com'],
      description: 'We respond within 2 hours'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Near Symphony Mall, Rudrapur, Hanspal, Bhubaneswar, Odisha 752101'],
      description: 'Easy parking available'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon-Sat: 8:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      description: 'Emergency services 24/7'
    }
  ];

  const quickActions = [
    {
      icon: Car,
      title: 'Book Service',
      description: 'Schedule your car service appointment',
      action: 'Book Now',
      link: '/booking',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Chat with us instantly on WhatsApp',
      action: 'Chat Now',
      link: 'https://wa.me/919438142013',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: Phone,
      title: 'Call Emergency',
      description: 'Need immediate roadside assistance?',
      action: 'Call Now',
      link: 'tel:+917978933702',
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

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
              Contact <span className="text-red-200">Maa Mangala</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Get in touch with our expert team for any automotive needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.a
                key={action.title}
                href={action.link}
                target={action.link.startsWith('http') ? '_blank' : '_self'}
                rel={action.link.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${action.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 block`}
              >
                <div className="flex items-center space-x-4">
                  <action.icon className="h-8 w-8" />
                  <div>
                    <h3 className="text-lg font-semibold">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <span className="text-sm font-medium">{action.action} →</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Get in <span className="text-red-600">Touch</span>
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-600 p-3 rounded-lg">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 dark:text-gray-400">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-red-600 mt-2">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a <span className="text-red-600">Message</span>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Please enter a valid 10-digit phone number'
                          }
                        })}
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your phone number"
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Service Booking">Service Booking</option>
                      <option value="Emergency Support">Emergency Support</option>
                      <option value="Quote Request">Quote Request</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                    {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Find <span className="text-red-600">Our Location</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Visit our modern workshop facility with ample parking
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="h-96 relative">
              {/* Placeholder for Google Maps */}
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                  {/* <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Interactive Map
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Service Road, Maa Mangala<br />
                    Bhubaneswar, Odisha 751028
                  </p> */}
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119735.41745082382!2d85.76543980774478!3d20.31136572319549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190a51a86565af%3A0xe3c595512f373bf8!2sMaa%20Mangala%20Auto%20Works!5e0!3m2!1sen!2sin!4v1760334256119!5m2!1sen!2sin"
                    width="1196"
                    height="360"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <p className="text-gray-600 dark:text-gray-400">
                    Open in Google Maps
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Quick <span className="text-red-600">Answers</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Common questions about contacting us
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'How quickly do you respond to inquiries?',
                answer: 'We typically respond to all inquiries within 2 hours during business hours. For emergency situations, we provide immediate assistance 24/7.'
              },
              {
                question: 'Can I schedule a service appointment via phone?',
                answer: 'Yes! You can call us at +91 79789 33702 or use the "Book Now" button on our website to schedule your appointment. Our online booking system is also available 24/7 for your convenience.'
              },
              {
                question: 'Do you provide pickup and delivery services?',
                answer: 'Yes, we offer complimentary pickup and delivery services within a 15km radius of our workshop for major repairs and services.'
              },
              {
                question: 'What should I do in case of an emergency breakdown?',
                answer: 'Call our 24/7 emergency hotline immediately. We provide roadside assistance and can arrange towing to our workshop if needed.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;