import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Opportunities from "./components/Opportunities";
import Survey from "./components/Survey";
import Footer from "./components/Footer";
import { COUNTRIES, type CountryData } from "./data/countries";

export default function App() {
  const [country, setCountry] = useState<CountryData>(COUNTRIES[0]);

  return (
    <div className="min-h-screen bg-orama-cream">
      <Navbar />
      <Hero />
      <Opportunities country={country} onCountryChange={setCountry} />
      <Survey country={country} />
      <Footer />
    </div>
  );
}
