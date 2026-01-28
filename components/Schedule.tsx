import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, RefreshCw, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScheduleItem {
  time: string;
  location: string;
  event: string;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9us586xY7VMS2hipRpKqIkzc6wpEE7hpzkJj7RRgU5OU6v1Bh9wlrTEzFdeO6GmGtXXFObyAWWuD_/pub?gid=0&single=true&output=csv';

export const Schedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SHEET_URL);
      if (!response.ok) throw new Error('Failed to fetch data');
      const text = await response.text();
      
      // Parse CSV: Skip header, split by comma
      const rows = text.split('\n').slice(1);
      const data: ScheduleItem[] = rows
        .map(row => {
          // Handle simple CSV parsing (splitting by comma)
          const cols = row.split(',');
          // Ensure we have at least 3 columns and they aren't just whitespace
          if (cols.length >= 3 && cols[0].trim()) {
            return {
              time: cols[0].trim(),
              location: cols[1].trim(),
              event: cols.slice(2).join(',').trim() // Join remaining columns in case description has commas
            };
          }
          return null;
        })
        .filter((item): item is ScheduleItem => item !== null);

      setSchedule(data);
    } catch (err) {
      console.error(err);
      setError('শিডিউল লোড করা সম্ভব হয়নি। দয়া করে ইন্টারনেট সংযোগ চেক করুন।');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <section id="schedule" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-4">
            <Calendar size={16} />
            <span>লাইভ আপডেট</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            আজকের কর্মসূচি
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden ring-1 ring-gray-100">
          <div className="p-4 bg-gray-50/50 border-b border-gray-200 flex justify-between items-center backdrop-blur-sm sticky top-0 z-10">
            <span className="font-semibold text-gray-700 pl-2">রিয়েল-টাইম শিডিউল</span>
            <button 
              onClick={fetchSchedule} 
              className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 bg-white border border-gray-200 hover:border-emerald-200 px-3 py-1.5 rounded-full font-medium transition-all shadow-sm hover:shadow"
              disabled={loading}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              {loading ? 'আপডেট হচ্ছে...' : 'রিফ্রেশ'}
            </button>
          </div>
          
          <div className="p-6 md:p-8 min-h-[300px]">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex gap-4">
                    <div className="w-24 h-6 bg-gray-100 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
                <p className="text-gray-800 font-medium">{error}</p>
                <button onClick={fetchSchedule} className="mt-4 text-emerald-600 hover:underline">আবার চেষ্টা করুন</button>
              </div>
            ) : schedule.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>আজকের কোনো কর্মসূচি নেই।</p>
              </div>
            ) : (
              <div className="relative border-l-2 border-emerald-100 ml-3 md:ml-4 space-y-0">
                 {schedule.map((item, index) => (
                   <motion.div 
                     key={index}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1 }}
                     className="relative pl-6 md:pl-8 pb-10 last:pb-0 group"
                   >
                     {/* Timeline Dot */}
                     <div className="absolute -left-[9px] top-1.5 w-[18px] h-[18px] rounded-full bg-emerald-500 border-4 border-white shadow-sm ring-1 ring-emerald-200 group-hover:scale-110 transition-transform"></div>
                     
                     <div className="md:flex md:gap-6 items-start">
                        <div className="min-w-[100px] mb-2 md:mb-0 pt-0.5">
                          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md text-sm border border-emerald-100">
                            <Clock size={14} />
                            {item.time}
                          </span>
                        </div>
                        <div className="flex-1 bg-white hover:bg-gray-50 p-4 -mt-3 rounded-lg border border-transparent hover:border-emerald-100 transition-colors">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{item.event}</h3>
                          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <MapPin size={16} className="text-gray-400" />
                            {item.location}
                          </div>
                        </div>
                     </div>
                   </motion.div>
                 ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};