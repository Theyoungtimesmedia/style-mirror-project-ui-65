
import Header from '../components/Header';
import Hero from '../components/Hero';
import LatestReleases from '../components/LatestReleases';
import About from '../components/About';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LatestReleases />
      <About />
    </div>
  );
};

export default Index;
