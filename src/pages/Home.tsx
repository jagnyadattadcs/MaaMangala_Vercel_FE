import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Settings,
  Battery,
  Wrench,
  Car,
  Shield,
  Clock,
  Users,
  Award,
  Star,
  ArrowRight,
  PhoneCall
} from 'lucide-react';

const Home: React.FC = () => {
  const services = [
    { icon: Settings, title: 'Engine Repair', description: 'Complete engine diagnostics and repair' },
    { icon: Car, title: 'AC Service', description: 'Air conditioning maintenance and repair' },
    { icon: Wrench, title: 'Brake Service', description: 'Brake pad replacement and maintenance' },
    { icon: Battery, title: 'Battery Service', description: 'Battery testing and replacement' },
    { icon: Car, title: 'Tyre Service', description: 'Tyre rotation, balancing, and replacement' },
    { icon: Settings, title: 'Oil Change', description: 'Engine oil and filter replacement' },
  ];

  const features = [
    { icon: Shield, title: 'Certified Technicians', description: 'Expert mechanics with years of experience' },
    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance for emergencies' },
    { icon: Award, title: 'Quality Parts', description: 'Genuine and high-quality replacement parts' },
    { icon: Users, title: 'Customer First', description: 'Dedicated to exceptional customer service' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar Pradhan',
      rating: 5,
      comment: 'Excellent service! My car runs like new after the engine repair. Highly recommended!',
      location: 'Bhubaneswar'
    },
    {
      name: 'Priya Sharma Das',
      rating: 5,
      comment: 'Professional staff and transparent pricing. Got my AC fixed in no time.',
      location: 'Cuttack'
    },
    {
      name: 'Amit Behera',
      rating: 5,
      comment: 'Great experience! They explained everything clearly and completed work on time.',
      location: 'Puri'
    }
  ];

  const brands = [
    { name: "Maruti", logo: "https://static.cdnlogo.com/logos/m/85/maruti-suzuki.svg" },
    { name: "Tata", logo: "https://static.cdnlogo.com/logos/t/26/tata.svg" },
    { name: "Hyundai", logo: "https://static.cdnlogo.com/logos/h/41/hyundai-motor-company.svg" },
    { name: "Mahindra", logo: "https://static.cdnlogo.com/logos/m/57/mahindra-last-mile-mobility-limited.svg" },
    { name: "Toyota", logo: "https://static.cdnlogo.com/logos/t/85/toyota.svg" },
    { name: "Honda", logo: "https://static.cdnlogo.com/logos/h/85/honda.svg" },
    { name: "Kia", logo: "https://static.cdnlogo.com/logos/k/16/kia-motors-black_800.png" },
    { name: "BMW", logo: "https://static.cdnlogo.com/logos/b/85/bmw.svg" },
    { name: "Mercedes", logo: "https://static.cdnlogo.com/logos/m/20/mercedes.svg" },
    { name: "Audi", logo: "https://static.cdnlogo.com/logos/a/90/audi-black_800.png" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTJA43LDt7VHbhaF68DxBVVmpGWAq-5TH29g&s")'
          }}
        ></div> */}

        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/public/Maa-Mangala.mp4" type="video/mp4" />
        </video>


        <div className="relative z-10 text-center text-blue-500 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Expert{" "}
            <span className="animate-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-200 bg-clip-text text-transparent font-extrabold">
              Car Repair
            </span>
            <br />
            Services
          </motion.h1>


          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Professional auto repair with certified technicians and quality parts
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Book Service</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:+91 98765 43210"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Call Now</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-red-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive car care solutions for all your automotive needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
              >
                <div className="bg-red-600 p-3 rounded-lg inline-block mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              <span>View All Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-red-600">Maa Mangala?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're committed to providing exceptional service and building lasting relationships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-red-600 p-4 rounded-full inline-block mb-4 group-hover:bg-red-700 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Brands Marquee */}
      <section className="py-12 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            We Service All <span className="text-red-600">Major Brands</span>
          </h2>
        </div>

        <div className="relative">
          <div className="flex animate-marquee space-x-8 items-center">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 px-8 py-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap flex flex-col items-center gap-2">
                  <img src={brand.logo} alt={brand.name} className="h-8 w-auto" />
                  <span>{brand.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our <span className="text-red-600">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Your Car Fixed?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Book your service appointment today and get back on the road safely
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center space-x-2 bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
            >
              <span>Get Instant Estimate</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;