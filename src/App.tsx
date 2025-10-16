import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Loader from './components/Loader';
import Home from './pages/Home';
import Services from './pages/Services';
import Brands from './pages/Brands';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import ProtectedAdmin from './components/ProtectedAdmin';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Adjust time as needed for loader animation

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/admin" element={<ProtectedAdmin />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;