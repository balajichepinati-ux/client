import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Products from '@/components/sections/Products';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Industries from '@/components/sections/Industries';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Sticky navigation header */}
      <Navbar />

      {/* Main landing container */}
      <main className="flex-1">
        {/* Hero Section containing Three.js visual network background */}
        <Hero />

        {/* Products Showcase */}
        <Products />

        {/* Services Showcase */}
        <Services />

        {/* Why Choose Us details */}
        <WhyChooseUs />

        {/* Industries Served */}
        <Industries />

        {/* Step-by-Step Implementation Process */}
        <Process />

        {/* Client Testimonials Slider */}
        <Testimonials />

        {/* Contact Form, WhatsApp CTA and Map */}
        <Contact />
      </main>

      {/* Large corporate footer */}
      <Footer />
    </div>
  );
}
