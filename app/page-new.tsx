"use client";

import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import About from "../src/components/About";
import Lineup from "../src/components/Lineup";
import Schedule from "../src/components/Schedule";
import Tickets from "../src/components/Tickets";
import Gallery from "../src/components/Gallery";
import Location from "../src/components/Location";
import Sponsors from "../src/components/Sponsors";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <main className='relative'>
      <Header />
      <Hero />
      <About />
      <Lineup />
      <Schedule />
      <Tickets />
      <Gallery />
      <Location />
      <Sponsors />
      <Footer />
    </main>
  );
}
