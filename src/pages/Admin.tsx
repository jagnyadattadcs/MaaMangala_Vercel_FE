import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Settings,
  Battery,
  Wrench,
  Car,
  Zap,
  Gauge,
  PaintBucket,
  Shield,
  CheckCircle,
  LogOut,
  Images,
  ImagePlus,
  UploadCloud,
  Tag,
  Camera,
  ClipboardList
} from 'lucide-react';
import type { GalleryImage } from '../types/gallery';

interface Service {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  rating: number;
}

interface Booking {
  _id: string;
  brand: string;
  model: string;
  year?: string;
  registrationNumber?: string;
  fuel?: string;
  services: string[];
  description?: string;
  date?: string;
  time?: string;
  serviceType?: string;
  name: string;
  phone: string;
  address?: string;
  city?: string;
  pincode?: string;
  email?: string;
  status: 'pending' | 'accepted' | 'cancelled';
  createdAt?: string;
}

interface GalleryFormState {
  title: string;
  description: string;
  tags: string;
  isFeatured: boolean;
  order: number;
  imageFile: File | null;
  previewUrl: string | null;
}

const initialGalleryFormState: GalleryFormState = {
  title: '',
  description: '',
  tags: '',
  isFeatured: false,
  order: 0,
  imageFile: null,
  previewUrl: null
};

const Admin: React.FC = () => {
  const API_URL = import.meta.env.VITE_CONTACT_API_URL || 'http://localhost:5000';
  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || 'Admin';
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@2000';

  const authHeader = useMemo(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    try {
      return 'Basic ' + window.btoa(`${adminUsername}:${adminPassword}`);
    } catch (error) {
      console.error('Error generating authorization header:', error);
      return '';
    }
  }, [adminUsername, adminPassword]);

  const [activeTab, setActiveTab] = useState<'services' | 'gallery' | 'bookings'>('services');

  // Service management state
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [serviceSaving, setServiceSaving] = useState(false);
  const [serviceForm, setServiceForm] = useState<Service>({
    icon: 'Settings',
    title: '',
    description: '',
    features: [''],
    price: '',
    duration: '',
    rating: 4.5
  });

  // Gallery management state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galleryForm, setGalleryForm] = useState<GalleryFormState>(initialGalleryFormState);
  const [gallerySaving, setGallerySaving] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingActionLoadingId, setBookingActionLoadingId] = useState<string | null>(null);
  const [bookingStatusFilter, setBookingStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'cancelled'>('all');

  const iconOptions = [
    { value: 'Settings', label: 'Settings', icon: Settings },
    { value: 'Battery', label: 'Battery', icon: Battery },
    { value: 'Wrench', label: 'Wrench', icon: Wrench },
    { value: 'Car', label: 'Car', icon: Car },
    { value: 'Zap', label: 'Zap', icon: Zap },
    { value: 'Gauge', label: 'Gauge', icon: Gauge },
    { value: 'PaintBucket', label: 'Paint Bucket', icon: PaintBucket },
    { value: 'Shield', label: 'Shield', icon: Shield },
    { value: 'CheckCircle', label: 'Check Circle', icon: CheckCircle }
  ];

  const tabCopy = activeTab === 'services'
    ? {
        title: 'Admin Panel - Services Management',
        subtitle: 'Manage your car service offerings'
      }
    : activeTab === 'gallery'
      ? {
          title: 'Admin Panel - Gallery Management',
          subtitle: 'Upload, organise, and curate your photo gallery'
        }
      : {
          title: 'Admin Panel - Bookings',
          subtitle: 'Review customer bookings and manage responses'
        };

  useEffect(() => {
    fetchServices();
    fetchGalleryImages();
    fetchBookings();
  }, []);

  useEffect(() => {
    return () => {
      if (galleryForm.previewUrl) {
        URL.revokeObjectURL(galleryForm.previewUrl);
      }
    };
  }, [galleryForm.previewUrl]);

  const fallbackServices: Service[] = [
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

  const fetchServices = async () => {
    setLoadingServices(true);

    try {
      const response = await fetch(`${API_URL}/api/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
        setIsUsingFallback(false);
      } else {
        setServices(fallbackServices);
        setIsUsingFallback(true);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices(fallbackServices);
      setIsUsingFallback(true);
    } finally {
      setLoadingServices(false);
    }
  };

  const fetchGalleryImages = async () => {
    setLoadingGallery(true);
    setGalleryError(null);

    try {
      const url = `${API_URL}/api/gallery?limit=200`;
      const response = await fetch(url);
      if (!response.ok) {
        const text = await response.text().catch(() => 'Unable to read response body');
        throw new Error(`Failed to load gallery images: ${response.status} ${response.statusText} - ${text}`);
      }
      const data = await response.json();
      setGalleryImages(data.data || []);
    } catch (error: unknown) {
      console.error('Error loading gallery images:', error);
      setGalleryError(error instanceof Error ? error.message : 'Unable to load gallery images');
    } finally {
      setLoadingGallery(false);
    }
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    setBookingError(null);

    try {
      const query = bookingStatusFilter === 'all' ? '' : `?status=${bookingStatusFilter}`;
      const response = await fetch(`${API_URL}/api/bookings${query}`);
      if (!response.ok) {
        const text = await response.text().catch(() => 'Unable to read response body');
        throw new Error(`Failed to load bookings: ${response.status} ${response.statusText} - ${text}`);
      }
      const data = await response.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error: unknown) {
      console.error('Error loading bookings:', error);
      setBookingError(error instanceof Error ? error.message : 'Unable to load bookings');
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleServiceSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isUsingFallback) {
      alert('Cannot save changes in preview mode. Please connect to MongoDB to enable full functionality.');
      return;
    }

    setServiceSaving(true);

    try {
      const url = editingService
        ? `${API_URL}/api/services/${editingService._id}`
        : `${API_URL}/api/services`;
      const method = editingService ? 'PUT' : 'POST';

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (authHeader) {
        headers.Authorization = authHeader;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(serviceForm)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error saving service');
      }

      await fetchServices();
      resetServiceForm();
    } catch (error: unknown) {
      console.error('Error saving service:', error);
      alert(error instanceof Error ? error.message : 'Error saving service');
    } finally {
      setServiceSaving(false);
    }
  };

  const handleServiceEdit = (service: Service) => {
    setEditingService(service);
    setServiceForm({ ...service, features: [...service.features] });
    setShowServiceForm(true);
  };

  const handleServiceDelete = async (id: string | undefined) => {
    if (!id) return;

    if (isUsingFallback) {
      alert('Cannot delete services in preview mode. Please connect to MongoDB to enable full functionality.');
      return;
    }

    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      const headers: Record<string, string> = {};
      if (authHeader) {
        headers.Authorization = authHeader;
      }

      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error deleting service');
      }

      await fetchServices();
    } catch (error: unknown) {
      console.error('Error deleting service:', error);
      alert(error instanceof Error ? error.message : 'Error deleting service');
    }
  };

  const resetServiceForm = () => {
    setServiceForm({
      icon: 'Settings',
      title: '',
      description: '',
      features: [''],
      price: '',
      duration: '',
      rating: 4.5
    });
    setEditingService(null);
    setShowServiceForm(false);
  };

  const addFeature = () => {
    setServiceForm((previous) => ({
      ...previous,
      features: [...previous.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setServiceForm((previous) => ({
      ...previous,
      features: previous.features.map((feature, featureIndex) => (featureIndex === index ? value : feature))
    }));
  };

  const removeFeature = (index: number) => {
    setServiceForm((previous) => ({
      ...previous,
      features: previous.features.filter((_, featureIndex) => featureIndex !== index)
    }));
  };

  const handleGalleryInputChange = (
    key: keyof Pick<GalleryFormState, 'title' | 'description' | 'tags' | 'isFeatured' | 'order'>,
    value: string | boolean
  ) => {
    setGalleryForm((previous) => ({
      ...previous,
      [key]: key === 'order' ? Number(value) : value
    }));
  };

  const handleGalleryFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    setGalleryForm((previous) => {
      if (previous.previewUrl) {
        URL.revokeObjectURL(previous.previewUrl);
      }

      return {
        ...previous,
        imageFile: file,
        previewUrl: file ? URL.createObjectURL(file) : null
      };
    });
  };

  const resetGalleryForm = () => {
    setGalleryForm((previous) => {
      if (previous.previewUrl) {
        URL.revokeObjectURL(previous.previewUrl);
      }
      return { ...initialGalleryFormState };
    });
    setEditingImage(null);
    setShowGalleryForm(false);
  };

  const handleGallerySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!editingImage && !galleryForm.imageFile) {
      alert('Image file is required for new gallery entries.');
      return;
    }

    const url = editingImage
      ? `${API_URL}/api/gallery/${editingImage._id}`
      : `${API_URL}/api/gallery`;
    const method = editingImage ? 'PUT' : 'POST';

    const payload = new FormData();
    payload.append('title', galleryForm.title);
    payload.append('description', galleryForm.description);
    payload.append('isFeatured', String(galleryForm.isFeatured));
    payload.append('order', String(galleryForm.order));

    if (galleryForm.tags.trim().length > 0) {
      payload.append('tags', galleryForm.tags);
    }

    if (galleryForm.imageFile) {
      payload.append('image', galleryForm.imageFile);
    }

    setGallerySaving(true);

    try {
      const headers: Record<string, string> = {};
      if (authHeader) {
        headers.Authorization = authHeader;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: payload
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error saving gallery image');
      }

      await fetchGalleryImages();
      resetGalleryForm();
    } catch (error: unknown) {
      console.error('Error saving gallery image:', error);
      alert(error instanceof Error ? error.message : 'Error saving gallery image');
    } finally {
      setGallerySaving(false);
    }
  };

  const handleGalleryEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setShowGalleryForm(true);
    setGalleryForm((previous) => {
      if (previous.previewUrl) {
        URL.revokeObjectURL(previous.previewUrl);
      }
      return {
        title: image.title,
        description: image.description || '',
        tags: image.tags.join(', '),
        isFeatured: image.isFeatured,
        order: image.order || 0,
        imageFile: null,
        previewUrl: null
      };
    });
  };

  const handleGalleryDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery image?')) {
      return;
    }

    try {
      const headers: Record<string, string> = {};
      if (authHeader) {
        headers.Authorization = authHeader;
      }

      const response = await fetch(`${API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error deleting gallery image');
      }

      await fetchGalleryImages();
    } catch (error: unknown) {
      console.error('Error deleting gallery image:', error);
      alert(error instanceof Error ? error.message : 'Error deleting gallery image');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.dispatchEvent(new Event('adminLoginChange'));
  };

  const handleAddGalleryClick = () => {
    setEditingImage(null);
    resetGalleryForm();
    setShowGalleryForm(true);
  };

  const handleBookingAction = async (id: string, action: 'accept' | 'cancel') => {
    setBookingActionLoadingId(id);

    try {
      const response = await fetch(`${API_URL}/api/bookings/${id}/${action}`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        const text = await response.text().catch(() => 'Unable to read response body');
        throw new Error(`Failed to ${action} booking: ${response.status} ${response.statusText} - ${text}`);
      }

      await fetchBookings();
    } catch (error: unknown) {
      console.error(`Error performing booking ${action}:`, error);
      alert(error instanceof Error ? error.message : `Unable to ${action} booking`);
    } finally {
      setBookingActionLoadingId(null);
    }
  };

  // New function to handle booking deletion
  const handleBookingDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return;
    }

    setBookingActionLoadingId(id);

    try {
      const headers: Record<string, string> = {};
      if (authHeader) {
        headers.Authorization = authHeader;
      }

      const response = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!response.ok) {
        const text = await response.text().catch(() => 'Unable to read response body');
        throw new Error(`Failed to delete booking: ${response.status} ${response.statusText} - ${text}`);
      }

      await fetchBookings();
    } catch (error: unknown) {
      console.error('Error deleting booking:', error);
      alert(error instanceof Error ? error.message : 'Unable to delete booking');
    } finally {
      setBookingActionLoadingId(null);
    }
  };

  const isInitialLoading = loadingServices && loadingGallery;

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{tabCopy.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{tabCopy.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 ${
                activeTab === 'services'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-red-50 dark:bg-gray-800 dark:text-gray-200'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Services</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 ${
                activeTab === 'gallery'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-red-50 dark:bg-gray-800 dark:text-gray-200'
              }`}
            >
              <Images className="h-4 w-4" />
              <span>Gallery</span>
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 ${
                activeTab === 'bookings'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-red-50 dark:bg-gray-800 dark:text-gray-200'
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              <span>Bookings</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {activeTab === 'services' && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-2"
            >
              <button
                onClick={() => setShowServiceForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-300"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Service</span>
              </button>
            </motion.div>

            {showServiceForm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editingService ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <button
                    onClick={resetServiceForm}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleServiceSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Icon
                      </label>
                      <select
                        value={serviceForm.icon}
                        onChange={(event) =>
                          setServiceForm((previous) => ({ ...previous, icon: event.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {iconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={serviceForm.title}
                        onChange={(event) =>
                          setServiceForm((previous) => ({ ...previous, title: event.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price
                      </label>
                      <input
                        type="text"
                        value={serviceForm.price}
                        onChange={(event) =>
                          setServiceForm((previous) => ({ ...previous, price: event.target.value }))
                        }
                        placeholder="From ₹1,000"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={serviceForm.duration}
                        onChange={(event) =>
                          setServiceForm((previous) => ({ ...previous, duration: event.target.value }))
                        }
                        placeholder="2-4 hours"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rating
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={serviceForm.rating}
                        onChange={(event) =>
                          setServiceForm((previous) => ({
                            ...previous,
                            rating: parseFloat(event.target.value)
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={serviceForm.description}
                      onChange={(event) =>
                        setServiceForm((previous) => ({ ...previous, description: event.target.value }))
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Features
                      </label>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        + Add Feature
                      </button>
                    </div>
                    {serviceForm.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(event) => updateFeature(index, event.target.value)}
                          placeholder="Enter feature"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          required
                        />
                        {serviceForm.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={serviceSaving}
                      className={`bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-300 ${
                        serviceSaving ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      <Save className="h-4 w-4" />
                      <span>{serviceSaving ? 'Saving...' : editingService ? 'Update Service' : 'Add Service'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetServiceForm}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Current Services ({services.length})
                  </h2>
                  {isUsingFallback && (
                    <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-lg text-sm">
                      Preview Mode - Connect MongoDB to save changes
                    </div>
                  )}
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {loadingServices ? (
                  <div className="px-6 py-12 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                  </div>
                ) : services.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No services found. Add your first service!</p>
                  </div>
                ) : (
                  services.map((service, index) => {
                    const IconComponent = iconOptions.find((option) => option.value === service.icon)?.icon;
                    return (
                      <motion.div
                        key={service._id || service.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-red-600 p-2 rounded-lg">
                              {IconComponent && <IconComponent className="h-5 w-5 text-white" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {service.price} • {service.duration} • ⭐ {service.rating}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleServiceEdit(service)}
                              className="text-blue-600 hover:text-blue-700 p-2"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleServiceDelete(service._id)}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <select
                  value={bookingStatusFilter}
                  onChange={(event) => {
                    const value = event.target.value as 'all' | 'pending' | 'accepted' | 'cancelled';
                    setBookingStatusFilter(value);
                    setTimeout(() => {
                      fetchBookings();
                    }, 0);
                  }}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={fetchBookings}
                  className="px-4 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                >
                  Refresh
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total: {bookings.length}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bookings</h2>
                {bookingError && <span className="text-sm text-red-500">{bookingError}</span>}
              </div>

              {loadingBookings ? (
                <div className="px-6 py-12 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No bookings found.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings.map((booking) => {
                    const servicesDisplay = booking.services?.length ? booking.services.join(', ') : 'Not specified';
                    const addressDisplay = [booking.address, booking.city, booking.pincode].filter(Boolean).join(', ');
                    const serviceTypeLabel = booking.serviceType === 'pickup' ? 'Pickup & Drop' : 'Workshop Visit';
                    return (
                      <div key={booking._id} className="px-6 py-4">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-lg font-semibold text-gray-900 dark:text-white">{booking.name}</span>
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                booking.status === 'accepted'
                                  ? 'bg-green-100 text-green-700'
                                  : booking.status === 'cancelled'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {booking.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Vehicle</p>
                                <p>{booking.brand} {booking.model}</p>
                                {booking.year && <p>Year: {booking.year}</p>}
                                {booking.registrationNumber && <p>Reg: {booking.registrationNumber}</p>}
                                {booking.fuel && <p>Fuel: {booking.fuel}</p>}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Service Details</p>
                                <p>{servicesDisplay}</p>
                                <p>Date: {booking.date || 'Not specified'}</p>
                                <p>Time: {booking.time || 'Not specified'}</p>
                                <p>Type: {serviceTypeLabel}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Customer</p>
                                <p>{booking.phone}</p>
                                {booking.email && <p>{booking.email}</p>}
                                {addressDisplay && <p>{addressDisplay}</p>}
                              </div>
                              {booking.description && (
                                <div className="md:col-span-2">
                                  <p className="font-medium text-gray-900 dark:text-white">Issue Description</p>
                                  <p>{booking.description}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleBookingAction(booking._id, 'accept')}
                              disabled={booking.status === 'accepted' || bookingActionLoadingId === booking._id}
                              className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${
                                booking.status === 'accepted' || bookingActionLoadingId === booking._id
                                  ? 'bg-green-400 cursor-not-allowed'
                                  : 'bg-green-600 hover:bg-green-700'
                              }`}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking._id, 'cancel')}
                              disabled={booking.status === 'cancelled' || bookingActionLoadingId === booking._id}
                              className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${
                                booking.status === 'cancelled' || bookingActionLoadingId === booking._id
                                  ? 'bg-red-400 cursor-not-allowed'
                                  : 'bg-red-600 hover:bg-red-700'
                              }`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleBookingDelete(booking._id)}
                              disabled={bookingActionLoadingId === booking._id}
                              className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${
                                bookingActionLoadingId === booking._id
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : 'bg-gray-600 hover:bg-gray-700'
                              }`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <button
                onClick={handleAddGalleryClick}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-300"
              >
                <ImagePlus className="h-5 w-5" />
                <span>Add Gallery Image</span>
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                <Camera className="h-4 w-4" />
                <span>Total Images: {galleryImages.length}</span>
              </div>
            </motion.div>

            {showGalleryForm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editingImage ? 'Edit Gallery Image' : 'Add Gallery Image'}
                  </h2>
                  <button
                    onClick={resetGalleryForm}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleGallerySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={galleryForm.title}
                        onChange={(event) => handleGalleryInputChange('title', event.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags (comma separated)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={galleryForm.tags}
                          onChange={(event) => handleGalleryInputChange('tags', event.target.value)}
                          placeholder="e.g. service, team, event"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <Tag className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={galleryForm.order}
                        onChange={(event) => handleGalleryInputChange('order', event.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center space-x-3 mt-6 md:mt-8">
                      <input
                        id="isFeatured"
                        type="checkbox"
                        checked={galleryForm.isFeatured}
                        onChange={(event) => handleGalleryInputChange('isFeatured', event.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mark as Featured Image
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={galleryForm.description}
                      onChange={(event) => handleGalleryInputChange('description', event.target.value)}
                      rows={3}
                      placeholder="Describe what's in the image"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {editingImage ? 'Replace Image (optional)' : 'Upload Image'}
                    </label>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <label className="flex items-center justify-center w-full md:w-auto px-6 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-red-500 transition-colors duration-300">
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                          <UploadCloud className="h-5 w-5" />
                          <span>Choose Image</span>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleGalleryFileChange} />
                      </label>
                      {(galleryForm.previewUrl || editingImage?.imageUrl) && (
                        <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                          <img
                            src={galleryForm.previewUrl || editingImage?.imageUrl}
                            alt={galleryForm.title || editingImage?.title || 'Preview'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={gallerySaving}
                      className={`bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-300 ${
                        gallerySaving ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      <Save className="h-4 w-4" />
                      <span>{gallerySaving ? 'Saving...' : editingImage ? 'Update Image' : 'Add Image'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetGalleryForm}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gallery Images</h2>
                {galleryError && <span className="text-sm text-red-500">{galleryError}</span>}
              </div>

              {loadingGallery ? (
                <div className="px-6 py-12 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                </div>
              ) : galleryImages.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No gallery images yet. Upload your first photo!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {galleryImages.map((image) => (
                    <motion.div
                      key={image._id}
                      whileHover={{ scale: 1.01 }}
                      className="relative group bg-gray-50 dark:bg-gray-900/40 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{image.title}</h3>
                            {image.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{image.description}</p>
                            )}
                          </div>
                          {image.isFeatured && (
                            <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Order: {image.order ?? 0}</span>
                          <span>Size: {image.width || '--'}×{image.height || '--'}</span>
                        </div>
                        {image.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {image.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center space-x-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full"
                              >
                                <Tag className="h-3 w-3" />
                                <span>{tag}</span>
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleGalleryEdit(image)}
                            className="text-blue-600 hover:text-blue-700 p-2"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleGalleryDelete(image._id)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;