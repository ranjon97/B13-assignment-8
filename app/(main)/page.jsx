import Banner from "@/components/home/Banner";
import MarqueeSection from "@/components/home/MarqueeSection";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import StatsSection from "@/components/home/StatsSection";
import CategorySection from "@/components/home/CategorySection";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Banner />
      <MarqueeSection />
      <FeaturedBooks />
      <StatsSection />
      <CategorySection />
      <Testimonials />
      <CTASection />
    </>
  );
}
