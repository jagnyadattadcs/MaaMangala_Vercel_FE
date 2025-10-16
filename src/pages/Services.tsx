import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Settings,
  Battery,
  Wrench,
  Car,
  Zap,
  Gauge,
  PaintBucket,
  Shield,
  ArrowRight,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';

const Services: React.FC = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping
  const iconMap = {
    Settings,
    Battery,
    Wrench,
    Car,
    Zap,
    Gauge,
    PaintBucket,
    Shield,
    CheckCircle
  };

  // Fallback data
  const fallbackServices = [
    {
      _id: '1',
      icon: 'Settings',
      title: 'Engine Repair',
      description: 'Complete engine diagnostics, repair, and maintenance services',
      features: ['Engine diagnostics', 'Oil change', 'Tune-up', 'Performance optimization'],
      price: 'From ₹2,000',
      duration: '2-4 hours',
      rating: 4.8
    },
    {
      _id: '2',
      icon: 'Car',
      title: 'AC Service',
      description: 'Air conditioning system repair and maintenance',
      features: ['AC gas refill', 'Filter replacement', 'Compressor repair', 'Temperature control'],
      price: 'From ₹1,500',
      duration: '1-2 hours',
      rating: 4.9
    },
    {
      _id: '3',
      icon: 'Wrench',
      title: 'Brake Service',
      description: 'Complete brake system inspection and repair',
      features: ['Brake pad replacement', 'Brake fluid change', 'Disc/drum service', 'ABS repair'],
      price: 'From ₹1,200',
      duration: '2-3 hours',
      rating: 4.7
    },
    {
      _id: '4',
      icon: 'Battery',
      title: 'Battery Service',
      description: 'Battery testing, maintenance, and replacement',
      features: ['Battery testing', 'Terminal cleaning', 'Battery replacement', 'Charging system check'],
      price: 'From ₹800',
      duration: '30 minutes',
      rating: 4.9
    },
    {
      _id: '5',
      icon: 'Car',
      title: 'Tyre Service',
      description: 'Complete tyre care and replacement services',
      features: ['Tyre rotation', 'Balancing & alignment', 'Puncture repair', 'Tyre replacement'],
      price: 'From ₹500',
      duration: '1 hour',
      rating: 4.8
    },
    {
      _id: '6',
      icon: 'Gauge',
      title: 'Transmission Service',
      description: 'Manual and automatic transmission repair',
      features: ['Transmission fluid change', 'Clutch repair', 'Gear box service', 'CVT maintenance'],
      price: 'From ₹3,000',
      duration: '4-6 hours',
      rating: 4.6
    },
    {
      _id: '7',
      icon: 'Zap',
      title: 'Electrical Service',
      description: 'Electrical system diagnostics and repair',
      features: ['Wiring inspection', 'Light replacement', 'Starter/alternator service', 'ECU diagnostics'],
      price: 'From ₹1,000',
      duration: '1-3 hours',
      rating: 4.7
    },
    {
      _id: '8',
      icon: 'Shield',
      title: 'Suspension Service',
      description: 'Suspension system repair and maintenance',
      features: ['Shock absorber replacement', 'Spring service', 'Strut repair', 'Steering alignment'],
      price: 'From ₹2,500',
      duration: '3-5 hours',
      rating: 4.8
    },
    {
      _id: '9',
      icon: 'PaintBucket',
      title: 'Paint & Body',
      description: 'Complete paint job and body repair services',
      features: ['Dent removal', 'Paint touch-up', 'Full body paint', 'Scratch repair'],
      price: 'From ₹5,000',
      duration: '1-3 days',
      rating: 4.5
    },
    {
      _id: '10',
      icon: 'Car',
      title: 'Interior Cleaning',
      description: 'Deep cleaning and detailing services',
      features: ['Seat cleaning', 'Dashboard polish', 'Carpet wash', 'Odor removal'],
      price: 'From ₹1,500',
      duration: '2-3 hours',
      rating: 4.8
    },
    {
      _id: '11',
      icon: 'CheckCircle',
      title: 'General Checkup',
      description: 'Comprehensive vehicle health inspection',
      features: ['Multi-point inspection', 'Diagnostic scan', 'Safety check', 'Performance report'],
      price: 'From ₹500',
      duration: '1 hour',
      rating: 4.9
    },
    {
      _id: '12',
      icon: 'Settings',
      title: 'Periodic Maintenance',
      description: 'Scheduled maintenance as per manufacturer guidelines',
      features: ['Service reminder', 'Warranty maintenance', 'Genuine parts', 'Service history'],
      price: 'From ₹2,000',
      duration: '2-4 hours',
      rating: 4.8
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          // Fallback to hardcoded data if API fails
          setServices(fallbackServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices(fallbackServices);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

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
              Our <span className="animate-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-200 bg-clip-text text-transparent font-extrabold">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Comprehensive car care solutions with expert technicians and quality parts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon];
                return (
                  <motion.div
                    key={service._id || service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-600 p-3 rounded-lg">
                          {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                        </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {service.rating}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        {service.price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                  </div>


                  <Link
                    to="/booking"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                     </div>
                   </motion.div>
                 );
               })}
             </div>
           )}
         </div>
     </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-red-600">Maa Mangala</span> Services?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're committed to providing the highest quality service with transparent pricing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'We Keep You Moving',
                description: 'Fast, Affordable & Hassle-Free Car Service'
              },
              {
                icon: CheckCircle,
                title: 'Certified Technicians',
                description: 'ASE certified mechanics with years of experience'
              },
              {
                icon: Clock,
                title: 'Quick Service',
                description: 'Most services completed within the same day'
              },
              {
                icon: Star,
                title: 'Quality Parts',
                description: 'Only genuine and high-quality replacement parts'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-red-600 p-4 rounded-full inline-block mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Expert Car Service?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Book your service appointment today and experience the Maa Mangala difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Book Service Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:+919876543210"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
              >
                Call for Emergency
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;