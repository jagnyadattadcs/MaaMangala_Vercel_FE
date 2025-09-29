import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, ArrowRight, Star, CheckCircle } from 'lucide-react';

const Brands: React.FC = () => {
  const brands = [
    {
      name: 'Maruti Suzuki',
      description: 'Expert service for Swift, Baleno, Dzire, Alto, WagonR, Vitara Brezza, and all Maruti models',
      specializations: ['Engine Service', 'AC Repair', 'Brake Service', 'Transmission'],
      rating: 4.8,
      image: 'https://c.ndtvimg.com/2024-12/3nvb719_maruti-suzuki-dzire_625x300_06_December_24.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738'
    },
    {
      name: 'Tata Motors',
      description: 'Specialized care for Nexon, Harrier, Safari, Altroz, Tigor, and other Tata vehicles',
      specializations: ['Electrical Systems', 'Body Repair', 'Engine Diagnostics', 'Safety Systems'],
      rating: 4.7,
      image: 'https://media.fortuneindia.com/fortune-india/import/2022-11/c541d508-f419-4190-a88d-14a81650b3e7/Tata_Motors_2.jpg?rect=0,0,1908,1073&w=640&auto=format,compress&fit=max&q=50'
    },
    {
      name: 'Hyundai',
      description: 'Professional service for Creta, i20, Verna, Venue, Grand i10, and all Hyundai cars',
      specializations: ['Turbo Engine Service', 'Advanced Electronics', 'Suspension Repair', 'Paint Work'],
      rating: 4.9,
      image: 'https://trident-group.s3.ap-south-1.amazonaws.com/hyundai/models/display_images/1698924149.jpg'
    },
    {
      name: 'Mahindra',
      description: 'Expert repair for XUV700, Scorpio, Thar, Bolero, XUV300, and SUV maintenance',
      specializations: ['4WD Systems', 'Heavy-duty Repair', 'Off-road Maintenance', 'Diesel Engines'],
      rating: 4.6,
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Mahindra_Thar_Photoshoot_At_Perupalem_Beach_%28West_Godavari_District%2CAP%2CIndia_%29_Djdavid.jpg'
    },
    {
      name: 'Toyota',
      description: 'Quality service for Innova, Fortuner, Glanza, Urban Cruiser, and hybrid vehicles',
      specializations: ['Hybrid Technology', 'Reliability Maintenance', 'Engine Longevity', 'Quality Parts'],
      rating: 4.9,
      image: 'https://static.toiimg.com/thumb/msid-114307904,width-1280,height-720,resizemode-4/114307904.jpg'
    },
    {
      name: 'Honda',
      description: 'Professional care for City, Amaze, WR-V, Jazz, CR-V, and all Honda models',
      specializations: ['VTEC Engines', 'CVT Maintenance', 'Fuel Efficiency', 'Advanced Safety'],
      rating: 4.8,
      image: 'https://media.ed.edmunds-media.com/honda/civic/2026/oem/2026_honda_civic_sedan_si_fq_oem_1_1280.jpg'
    },
    {
      name: 'Kia',
      description: 'Expert service for Seltos, Sonet, Carens, and modern Kia technology features',
      specializations: ['Turbo Engines', 'Connected Technology', 'Advanced Safety', 'Performance Tuning'],
      rating: 4.7,
      image: 'https://ymimg1.b8cdn.com/resized/article/8945/pictures/11367924/listing_main_2025-kia-carnival-Facelift-2.jpg'
    },
    {
      name: 'BMW',
      description: 'Premium service for 3 Series, 5 Series, X1, X3, and luxury BMW maintenance',
      specializations: ['Performance Engines', 'Advanced Electronics', 'Luxury Features', 'Precision Engineering'],
      rating: 4.8,
      image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg'
    },
    {
      name: 'Mercedes-Benz',
      description: 'Luxury service for A-Class, C-Class, E-Class, GLA, GLC, and premium features',
      specializations: ['Luxury Systems', 'Advanced Diagnostics', 'Premium Parts', 'Comfort Features'],
      rating: 4.9,
      image: 'https://www.mercedes-benz.co.in/content/dam/hq/passengercars/cars/bodytypes-landingpages/compact-cars/modeloverview/07-2023/images/mercedes-benz-compact-cars-modeloverview-692x392-07-2023.png'
    },
    {
      name: 'Audi',
      description: 'Premium care for A4, Q3, Q5, A6, and Audi\'s advanced technology systems',
      specializations: ['Quattro Systems', 'Advanced Technology', 'Performance Tuning', 'Luxury Maintenance'],
      rating: 4.8,
      image: 'https://img.autocarindia.com/ExtraImages/20200616045058_2020-Audi-RS7-Sportback-front-1.jpg?w=700&c=1'
    },
    {
      name: 'Volkswagen',
      description: 'Quality service for Polo, Vento, Tiguan, and German engineering excellence',
      specializations: ['TSI Engines', 'DSG Transmission', 'German Engineering', 'Build Quality'],
      rating: 4.7,
      image: 'https://imgd-ct.aeplcdn.com/1280x720/n/cw/ec/144691/taigun-right-front-three-quarter-2.jpeg?isig=0&q=80'
    },
    {
      name: 'Skoda',
      description: 'Expert repair for Rapid, Octavia, Superb, Kushaq, and Czech precision',
      specializations: ['Precision Engineering', 'Advanced Safety', 'Build Quality', 'Performance'],
      rating: 4.6,
      image: 'https://www.godigit.com/content/dam/godigit/directportal/en/skoda-slavia-brand.jpg'
    }
  ];

  const stats = [
    { number: '12+', label: 'Brands Serviced' },
    { number: '500+', label: 'Models Supported' },
    { number: '10,000+', label: 'Cars Repaired' },
    { number: '98%', label: 'Customer Satisfaction' }
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
              All <span className="animate-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-200 bg-clip-text text-transparent font-extrabold">Car Brands</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto mb-8">
              We service all major car brands with expertise and genuine parts
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-red-100 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Brands We <span className="text-red-600">Service</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From budget-friendly to luxury vehicles, we have the expertise for all
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {brand.rating}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {brand.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {brand.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Our Specializations:
                    </h4>
                    <div className="space-y-1">
                      {brand.specializations.map((spec, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/booking"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Car className="h-4 w-4" />
                    <span>Book Service</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for All Brands */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us for <span className="text-red-600">All Brands</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our expertise spans across all major automotive brands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Car,
                title: 'Brand Expertise',
                description: 'Specialized knowledge for each car brand and model'
              },
              {
                icon: CheckCircle,
                title: 'Genuine Parts',
                description: 'Only authentic parts specific to your car brand'
              },
              {
                icon: Star,
                title: 'Certified Technicians',
                description: 'Factory-trained mechanics for all major brands'
              },
              {
                icon: ArrowRight,
                title: 'Latest Tools',
                description: 'Brand-specific diagnostic tools and equipment'
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
              Don't See Your Brand? We Still Got You Covered!
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Contact us for specialized service for any car brand
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Book Service</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Brands;