import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Shield, GraduationCap, HeartHandshake, Users, ChevronDown, Download } from 'lucide-react';

const manifestoItems = [
  {
    id: 1,
    icon: Droplets,
    title: "জলাবদ্ধতা নিরসন",
    detail: "Recovery of canals in Mirpur and modern drainage system."
  },
  {
    id: 2,
    icon: Shield,
    title: "নিরাপদ জনপদ",
    detail: "CCTV coverage in every ward and community policing."
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "তারুণ্যের কর্মসংস্থান",
    detail: "Freelancing hubs and IT training centers."
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "নারী ও শিশু সুরক্ষা",
    detail: "Zero tolerance against harassment."
  },
  {
    id: 5,
    icon: Users,
    title: "জনতার মুখোমুখি",
    detail: "Quarterly public hearings to ensure accountability."
  }
];

export const Manifesto = () => {
  const [activeId, setActiveId] = useState<number | null>(1);

  return (
    <section id="manifesto" className="py-24 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              আমার ইশতেহার <br/>
              <span className="text-emerald-600">রূপকল্প ২০৩০</span>
            </h2>
            <p className="text-gray-600 text-lg">
              একটি আধুনিক, নিরাপদ এবং মানবিক ঢাকা-১৪ গড়ার লক্ষ্যে আমার সুনির্দিষ্ট পরিকল্পনা।
            </p>
            <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg">
              <Download size={20} />
              সম্পূর্ণ পিডিএফ ডাউনলোড
            </button>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8 space-y-4">
            {manifestoItems.map((item) => (
              <div 
                key={item.id}
                className={`bg-white rounded-xl overflow-hidden border transition-all duration-300 ${activeId === item.id ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'border-gray-200 hover:border-emerald-300'}`}
              >
                <button
                  onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full transition-colors duration-300 ${activeId === item.id ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                      <item.icon size={24} />
                    </div>
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${activeId === item.id ? 'text-gray-900' : 'text-gray-600'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-300 ${activeId === item.id ? 'rotate-180 text-emerald-600' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {activeId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:pl-[6rem] text-gray-600 leading-relaxed text-lg">
                        {item.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};