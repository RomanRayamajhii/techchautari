import Navbar from "@/app/components/home-content/navbar";
import About from "../components/home-content/about";
import Hero from "../components/home-content/hero";
import Categories from "../components/home-content/categories";
import Footer from "../components/home-content/footer";
import Contact from "../components/home-content/contact";
import Feature from "../components/home-content/feature";

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <Navbar />
      <Hero />
      <About />
      <Feature />
      <Categories />
      <Contact />
      <Footer />
    </div>
  );
}
