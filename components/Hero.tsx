import React from 'react';
import { motion } from 'framer-motion';
import { Image } from './ui/Image';
import { ArrowRight, Image as ImageIcon, FileText } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-emerald-50/50 to-white pt-20">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-6"
          >
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-emerald-800 font-medium text-lg font-arabic"
            >
              বিসমিল্লাহির রাহমানির রাহিম
            </motion.p>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.15] tracking-tight">
              আগামীর ঢাকা-১৪ গড়তে, <br />
              <span className="text-emerald-600 inline-block mt-2">ধানের শীষেই আস্থা</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto lg:mx-0">
              ইঞ্জিনিয়ার সানজিদা ইসলাম তুলি <br className="hidden md:inline" />
              <span className="text-emerald-700">- পরিবর্তনের অঙ্গীকার।</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-emerald-200 transition-all flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                <ImageIcon className="w-6 h-6 animate-pulse" />
                <span>ক্যাম্পেইন ফটোফ্রেম বানাই</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2"
              >
                <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                ইশতেহার দেখুন
              </motion.button>
            </div>
          </motion.div>

          {/* Image/Visual Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
             <div className="relative w-full max-w-md aspect-[4/5]">
                {/* Abstract framing elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-3xl transform rotate-3 opacity-10"></div>
                <div className="absolute inset-0 bg-emerald-100 rounded-3xl transform -rotate-3 border border-emerald-200"></div>
                
                {/* Candidate Image Placeholder */}
                <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="https://picsum.photos/800/1000?grayscale" 
                        alt="Engr. Sanjida Islam Tuli"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border-l-4 border-emerald-600">
                        <p className="text-sm text-gray-500 font-semibold">প্রতীক</p>
                        <p className="text-xl font-bold text-emerald-800">ধানের শীষ</p>
                    </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-emerald-400"
      >
        <ArrowRight className="rotate-90 w-6 h-6" />
      </motion.div>
    </section>
  );
};