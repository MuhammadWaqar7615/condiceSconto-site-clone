import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Banner from "@/components/Banner";
import MosaicGrid from "@/components/MosaicGrid";
import SecondaryOffers from "@/components/SecondaryOffers";
import PromoBanner from "@/components/PromoBanner";
import CodeLists from "@/components/CodeLists";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <Banner />
        <MosaicGrid />
        <SecondaryOffers />
        <PromoBanner />
        <CodeLists />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
