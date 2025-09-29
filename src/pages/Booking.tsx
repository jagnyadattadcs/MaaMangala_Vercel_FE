import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Car,
  Settings,
  User,
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  MapPin,
  Phone
} from 'lucide-react';

interface BookingFormData {
  // Car Details
  brand: string;
  model: string;
  fuel: string;
  year: string;
  registrationNumber: string;

  // Issues
  services: string[];
  description: string;

  // Customer Info
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;

  // Schedule
  date: string;
  time: string;
  serviceType: string;
}

const Booking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BookingFormData>>({});
  const { register, handleSubmit, formState: { errors }, watch } = useForm<BookingFormData>();

  const totalSteps = 5;

  const carBrands = [
    'Maruti Suzuki', 'Tata', 'Hyundai', 'Mahindra', 'Toyota', 'Honda',
    'Kia', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Skoda'
  ];

  const services = [
    'Engine Repair', 'AC Service', 'Brake Service', 'Battery Service',
    'Tyre Service', 'Oil Change', 'Transmission', 'Suspension',
    'Electrical', 'Paint & Body', 'Interior Cleaning', 'General Checkup'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setFormData({ ...formData, ...data });
    if (currentStep === totalSteps) {
      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, ...data }),
        });
        const result = await response.json();
        if (response.ok) {
          alert('Booking submitted successfully! We will contact you soon.');
        } else {
          alert('Failed to submit booking: ' + result.error);
        }
      } catch (error) {
        alert('Error submitting booking: ' + error.message);
      }
    } else {
      nextStep();
    }
  };

  const stepIcons = [Car, Settings, User, Calendar, CheckCircle];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Book Your <span className="text-red-600">Service</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Complete the form below to schedule your car service appointment
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: totalSteps }, (_, i) => {
              const step = i + 1;
              const Icon = stepIcons[i];
              const isActive = step === currentStep;
              const isCompleted = step < currentStep;

              return (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${isCompleted
                        ? 'bg-green-600 text-white'
                        : isActive
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all duration-300 ${isCompleted ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </motion.div>

        {/* Form Steps */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Car Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Car Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Brand *
                    </label>
                    <select
                      {...register('brand', { required: 'Brand is required' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Brand</option>
                      {carBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    {errors.brand && <p className="text-red-600 text-sm mt-1">{errors.brand.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Model *
                    </label>
                    <input
                      {...register('model', { required: 'Model is required' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., Swift, i20, City"
                    />
                    {errors.model && <p className="text-red-600 text-sm mt-1">{errors.model.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fuel Type *
                    </label>
                    <select
                      {...register('fuel', { required: 'Fuel type is required' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    {errors.fuel && <p className="text-red-600 text-sm mt-1">{errors.fuel.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year *
                    </label>
                    <input
                      {...register('year', { required: 'Year is required' })}
                      type="number"
                      min="1990"
                      max={new Date().getFullYear()}   // ✅ dynamic max
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., 2020"
                    />

                    {errors.year && <p className="text-red-600 text-sm mt-1">{errors.year.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Registration Number *
                    </label>
                    <input
                      {...register('registrationNumber', { required: 'Registration number is required' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., MH12AB1234"
                      style={{ textTransform: 'uppercase' }}
                    />
                    {errors.registrationNumber && <p className="text-red-600 text-sm mt-1">{errors.registrationNumber.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Service Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Select Services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map(service => (
                    <label
                      key={service}
                      className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                    >
                      <input
                        {...register('services', { required: 'At least one service must be selected' })}
                        type="checkbox"
                        value={service}
                        className="text-red-600 focus:ring-red-600"
                      />
                      <span className="text-gray-900 dark:text-white">{service}</span>
                    </label>
                  ))}
                </div>
                {errors.services && <p className="text-red-600 text-sm mt-1">{errors.services.message}</p>}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Describe the Issue
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Please describe the problem you're experiencing with your car..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Customer Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
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
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter 10-digit phone number"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      {...register('email', {
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email address (optional)"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address *
                    </label>
                    <textarea
                      {...register('address', { required: 'Address is required' })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your complete address"
                    />
                    {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      {...register('city', { required: 'City is required' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your city"
                    />
                    {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pincode *
                    </label>
                    <input
                      {...register('pincode', {
                        required: 'Pincode is required',
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: 'Please enter a valid 6-digit pincode'
                        }
                      })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter 6-digit pincode"
                    />
                    {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Schedule */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Schedule Appointment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      {...register('date', { required: 'Date is required' })}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      {...register('time', { required: 'Time is required' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Service Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                      <input
                        {...register('serviceType', { required: 'Service type is required' })}
                        type="radio"
                        value="pickup"
                        className="text-red-600 focus:ring-red-600"
                      />
                      <div className="flex items-center space-x-2">
                        <Car className="h-5 w-5 text-red-600" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Pickup & Drop</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">We'll pick up your car</p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                      <input
                        {...register('serviceType', { required: 'Service type is required' })}
                        type="radio"
                        value="workshop"
                        className="text-red-600 focus:ring-red-600"
                      />
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-red-600" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Drop at Workshop</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Visit our workshop</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  {errors.serviceType && <p className="text-red-600 text-sm mt-1">{errors.serviceType.message}</p>}
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Booking Confirmation
                </h2>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Review Your Booking Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Car:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {watch('brand')} {watch('model')} ({watch('year')})
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Registration:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {watch('registrationNumber')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Services:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {watch('services')?.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Date & Time:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {watch('date')} at {watch('time')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Contact:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {watch('name')} - {watch('phone')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Service Type:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {watch('serviceType') === 'pickup' ? 'Pickup & Drop' : 'Workshop Visit'}
                      </span>
                    </div>
                  </div>

                  {watch('description') && (
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Description:</span>
                      <p className="text-gray-900 dark:text-white mt-1">{watch('description')}</p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">
                      Booking Confirmation
                    </span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 mt-2">
                    By submitting this booking, you agree to our terms and conditions.
                    We will contact you within 2 hours to confirm your appointment.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${currentStep === 1
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i + 1 === currentStep
                        ? 'bg-red-600'
                        : i + 1 < currentStep
                          ? 'bg-green-600'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <span>{currentStep === totalSteps ? 'Submit Booking' : 'Continue'}</span>
                {currentStep === totalSteps ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;