import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Shield, GraduationCap, HeartHandshake, Users, ChevronDown, Download } from 'lucide-react';

const manifestoItems = [
  {
    id: 1,
    icon: Droplets,
    title: "জলাবদ্ধতা নিরসন ও আধুনিক ড্রেনেজ ব্যবস্থা",
    detail: "মিরপুরের দীর্ঘদিনের প্রধান সমস্যা জলাবদ্ধতা। নির্বাচিত হলে আধুনিক ড্রেনেজ মাস্টারপ্ল্যান বাস্তবায়নের মাধ্যমে বৃষ্টির পানি দ্রুত নিষ্কাশনের ব্যবস্থা করা হবে। বেদখল হয়ে যাওয়া খালগুলো পুনরুদ্ধার করে পানির প্রবাহ স্বাভাবিক রাখা হবে।"
  },
  {
    id: 2,
    icon: Shield,
    title: "নিরাপদ ও সন্ত্রাসমুক্ত জনপদ",
    detail: "মাদক, চাঁদাবাজি এবং কিশোর গ্যাং কালচার কঠোর হস্তে দমন করা হবে। এলাকার প্রতিটি গলি ও মোড়ে সিসি ক্যামেরা স্থাপন এবং কমিউনিটি পুলিশিং জোরদার করার মাধ্যমে নারী, শিশু ও বয়স্কদের জন্য একটি নিরাপদ ও অভয়ারণ্য গড়ে তোলা হবে।"
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "তারুণ্যের কর্মসংস্থান ও ফ্রিল্যান্সিং হাব",
    detail: "বেকার সমস্যা সমাধানে যুবকদের জন্য কারিগরি প্রশিক্ষণের ব্যবস্থা করা হবে। মিরপুরে একটি আধুনিক 'আইটি ইনকিউবেটর' বা ফ্রিল্যান্সিং হাব স্থাপন করা হবে, যেখানে তরুণরা প্রযুক্তিগত দক্ষতা কাজে লাগিয়ে ঘরে বসেই বৈদেশিক মুদ্রা অর্জন করতে পারবে।"
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "নারী ও শিশু সুরক্ষা এবং শিক্ষা",
    detail: "নারীদের জন্য নিরাপদ যাতায়াত ব্যবস্থা নিশ্চিত করা হবে। শিক্ষাপ্রতিষ্ঠানগুলোর মান উন্নয়ন এবং ঝরে পড়া রোধে বিশেষ বৃত্তি চালু করা হবে। কর্মজীবী মায়েদের সুবিধার্থে এলাকায় মানসম্মত 'ডে-কেয়ার সেন্টার' স্থাপন করা হবে।"
  },
  {
    id: 5,
    icon: Users,
    title: "স্মার্ট নাগরিক সেবা ও বর্জ্য ব্যবস্থাপনা",
    detail: "নাগরিক সেবা (যেমন: ট্রেড লাইসেন্স, জন্ম নিবন্ধন) প্রাপ্তি সহজ ও দুর্নীতিমুক্ত করতে ডিজিটালাইজেশন করা হবে। আধুনিক বর্জ্য ব্যবস্থাপনা নিশ্চিত করে যত্রতত্র ময়লা ফেলার সংস্কৃতি দূর করা হবে এবং পরিবেশবান্ধব গ্রিন জোন গড়ে তোলা হবে।"
  }
];

interface ManifestoProps {
  pdfLink: string;
}

export const Manifesto: React.FC<ManifestoProps> = ({ pdfLink }) => {
  const [activeId, setActiveId] = useState<number | null>(1);

  return (
    <section id="manifesto" className="py-24 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          
          {/* Left: Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              আমার ইশতেহার <br/>
              <span className="text-emerald-600">ভিশন ২০৩০</span>
            </h2>
            <p className="text-gray-600 text-lg">
              একটি আধুনিক, নিরাপদ এবং মানবিক ঢাকা-১৪ গড়ার লক্ষ্যে আমার সুনির্দিষ্ট পরিকল্পনা।
            </p>
            <a 
              href={pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <Download size={20} />
              সম্পূর্ণ পিডিএফ ডাউনলোড
            </a>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8 space-y-4">
            {manifestoItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};