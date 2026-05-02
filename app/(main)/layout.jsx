import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
