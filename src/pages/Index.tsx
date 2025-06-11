
import Header from '../components/Header';
import Hero from '../components/Hero';
import LatestReleases from '../components/LatestReleases';
import About from '../components/About';
import CoreServices from '../components/CoreServices';
import BookingForm from '../components/BookingForm';
import PricingTeaser from '../components/PricingTeaser';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LatestReleases />
      <CoreServices />
      <BookingForm />
      <PricingTeaser />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
