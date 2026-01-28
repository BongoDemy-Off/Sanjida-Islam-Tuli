import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, FileDown } from 'lucide-react';

export const VoterBadge = () => {
  const [pledged, setPledged] = useState(false);

  return (
    <section className="bg-white py-16 border-t border-gray-100">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 shadow-sm border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
             <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-200/50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                   তরুণ ভোটার
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                   আমি নতুন ভোটার, <br/> আমি <span className="text-emerald-600">পরিবর্তনের</span> পক্ষে।
                </h3>
                <p className="text-gray-600 font-medium">
                   আপনার প্রথম ভোট হোক দেশের উন্নয়নের জন্য। আজই শপথ নিন।
                </p>
             </div>

             <div className="flex flex-col gap-4 items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPledged(true)}
                  disabled={pledged}
                  className={`px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all flex items-center gap-2 ${
                    pledged 
                      ? 'bg-emerald-100 text-emerald-700 cursor-default' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200'
                  }`}
                >
                   {pledged ? (
                     <>
                        <Award size={24} />
                        অভিনন্দন! আপনি গর্বিত ভোটার 🎉
                     </>
                   ) : (
                     "শপথ নিন"
                   )}
                </motion.button>
             </div>
          </div>

          {/* Polling Center Link */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-medium transition-colors border-b-2 border-transparent hover:border-emerald-200 pb-1">
               <FileDown size={18} />
               ভোটকেন্দ্রের তালিকা ডাউনলোড করুন (PDF)
            </button>
          </div>

       </div>
    </section>
  );
};