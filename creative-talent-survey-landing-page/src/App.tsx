import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Opportunities from "./components/Opportunities";
import Survey from "./components/Survey";
import Privacy from "./components/Privacy";
import Footer from "./components/Footer";
import { COUNTRIES, type CountryData } from "./data/countries";
import { Moon, Sun } from "lucide-react"; // Importing the pro icons!

export default function App() {
  // 1. Existing User Preference: Country Selection
  const [country, setCountry] = useState<CountryData>(COUNTRIES[0]);

  // 2. NEW User Preference: Visual Theme (Light/Dark Mode)
  const [theme, setTheme] = useState(() => {
    // Check if the user has a saved preference from a previous visit
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  // 3. Effect hook to apply the user's preference to the entire app
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save their choice so it remembers them next time
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    // We added a dark mode background color to the main wrapper
    <div className="min-h-screen bg-orama-cream dark:bg-[#050d18] transition-colors duration-300">
      
      {/* Floating User Preference Button */}
      <button 
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-orama-navy dark:bg-orama-orange text-white shadow-xl hover:scale-110 transition-transform"
        aria-label="Toggle user preference"
      >
        {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </button>

      <Navbar />
      <Hero />
      <Opportunities country={country} onCountryChange={setCountry} />
      <Survey country={country} />
      <Privacy />
      <Footer />
    </div>
  );
}