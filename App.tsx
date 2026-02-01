import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Manifesto } from './components/Manifesto';
import { Schedule } from './components/Schedule';
import { PhotoFrame } from './components/PhotoFrame';
import { ComplaintBox } from './components/ComplaintBox';
import { VoterBadge } from './components/VoterBadge';
import { Footer } from './components/Footer';
import { Loader2 } from 'lucide-react';

// Config Sheet URL
const CONFIG_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9us586xY7VMS2hipRpKqIkzc6wpEE7hpzkJj7RRgU5OU6v1Bh9wlrTEzFdeO6GmGtXXFObyAWWuD_/pub?gid=1619778978&single=true&output=csv';

interface SiteConfig {
  manifesto_link: string;
  polling_link: string;
  youtube_video_id: string;
}

function App() {
  const [config, setConfig] = useState<SiteConfig>({
    manifesto_link: '#',
    polling_link: '#',
    youtube_video_id: 'dQw4w9WgXcQ' // Default placeholder
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(CONFIG_SHEET_URL);
        if (!response.ok) throw new Error('Failed to fetch config');
        const text = await response.text();

        // Parse CSV (Key,Value format)
        const rows = text.split('\n');
        const newConfig: any = {};

        rows.forEach(row => {
          // Split by comma, handling potential quotes if simple
          const [key, ...valueParts] = row.split(',');
          if (key && valueParts.length > 0) {
             // Rejoin value parts in case the URL had commas
             let value = valueParts.join(',').trim();
             // Remove wrapping quotes if present
             if (value.startsWith('"') && value.endsWith('"')) {
               value = value.slice(1, -1);
             }
             newConfig[key.trim()] = value;
          }
        });

        setConfig(prev => ({
          ...prev,
          ...newConfig
        }));

      } catch (error) {
        console.error('Error loading site config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Manifesto pdfLink={config.manifesto_link} />
        <Schedule />
        <PhotoFrame />
        <ComplaintBox videoId={config.youtube_video_id} />
        <VoterBadge pollingLink={config.polling_link} />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;