import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Manifesto } from './components/Manifesto';
import { Schedule } from './components/Schedule';
import { PhotoFrame } from './components/PhotoFrame';
import { ComplaintBox } from './components/ComplaintBox';
import { VoterBadge } from './components/VoterBadge';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Manifesto />
        <Schedule />
        <PhotoFrame />
        <ComplaintBox />
        <VoterBadge />
      </main>
      
      <footer className="bg-emerald-900 text-white py-12 text-center border-t border-emerald-800">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-2xl font-bold mb-4">Engr. Sanjida Islam Tuli</p>
          <p className="opacity-70 mb-8">ঢাকা-১৪ আসনের জনগণের সেবক</p>
          <p className="opacity-60 text-sm border-t border-emerald-800 pt-8">© 2024 Election Campaign. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;