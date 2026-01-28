import React from 'react';
import { motion } from 'framer-motion';
import { Image } from './ui/Image';
import { CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 skew-x-12 translate-x-20 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Image Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="group relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
              {/* Image that turns color on hover */}
              <Image 
                src="https://picsum.photos/600/800" 
                alt="Sanjida Tuli Portrait"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium tracking-wider uppercase mb-1 text-emerald-300">কো-অর্ডিনেটর</p>
                <h3 className="text-2xl font-bold">মায়ের ডাক</h3>
              </div>
            </div>
            
            {/* Offset decorative box */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-600 rounded-2xl -z-10 flex items-center justify-center">
               <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <div className="lg:col-span-7 space-y-8 pt-4">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-4">
                    <CheckCircle2 size={16} />
                    <span>সংক্ষিপ্ত পরিচিতি</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    সংগ্রাম থেকে জনসেবায়
                </h2>
                <div className="h-1.5 w-24 bg-emerald-500 rounded-full mb-8"></div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose prose-lg text-gray-600 space-y-6 leading-relaxed text-justify"
            >
                <p>
                    ইঞ্জিনিয়ার সানজিদা ইসলাম তুলি একজন নিবেদিতপ্রাণ সমাজকর্মী এবং রাজনীতিবিদ। কম্পিউটার ইঞ্জিনিয়ারিং-এ উচ্চশিক্ষা গ্রহণ করেও তিনি নিজেকে নিয়োজিত করেছেন দেশের মানুষের অধিকার আদায়ের সংগ্রামে। প্রযুক্তিগত জ্ঞান এবং মানবিক মূল্যবোধের এক অনন্য সমন্বয় ঘটিয়ে তিনি আগামীর আধুনিক ও মানবিক ঢাকা-১৪ গড়ার স্বপ্ন দেখেন। তারুণ্যের শক্তি আর অভিজ্ঞতার আলোকে তিনি এলাকার অবকাঠামোগত উন্নয়ন ও ডিজিটাল সেবা নিশ্চিত করতে বদ্ধপরিকর।
                </p>
                <p>
                    তিনি মানবাধিকার সংগঠন 'মায়ের ডাক'-এর অন্যতম সমন্বয়ক হিসেবে দীর্ঘদিন ধরে গুম ও বিচারবহির্ভূত হত্যার শিকার পরিবারগুলোর পাশে দাঁড়িয়েছেন। রাজপথের আন্দোলন থেকে শুরু করে আন্তর্জাতিক অঙ্গনে তিনি নির্যাতিত মানুষের কণ্ঠস্বর হিসেবে পরিচিত। স্বৈরাচার বিরোধী আন্দোলনে তার সাহসী ভূমিকা তাকে সাধারণ মানুষের কাছে এক আস্থার প্রতীকে পরিণত করেছে। তার নেতৃত্বেই গড়ে উঠবে একটি নিরাপদ, সন্ত্রাসমুক্ত ও জবাবদিহিতামূলক সমাজব্যবস্থা।
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-6 border-t border-gray-100 flex items-center gap-4"
            >
                <div>
                   <p className="text-gray-900 font-bold text-lg">ইঞ্জিঃ সানজিদা ইসলাম তুলি</p>
                   <p className="text-emerald-600 text-sm">মনোনীত প্রার্থী, ঢাকা-১৪</p>
                </div>
                {/* Signature Placeholder */}
                <div className="ml-auto opacity-70">
                   <div className="font-handwriting text-3xl text-emerald-800 italic font-bold">Sanjida Tuli</div>
                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};