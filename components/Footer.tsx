import React from 'react';
import { Facebook, Youtube, Twitter, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white pt-16 pb-8 border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-12"
        >
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Engr. Sanjida Islam Tulee</h3>
              <p className="text-emerald-400 font-medium">ঢাকা-১৪ আসনের জনগণের সেবক</p>
            </div>
            <p className="text-emerald-200/80 leading-relaxed text-sm">
              আগামীর আধুনিক, নিরাপদ ও মানবিক ঢাকা-১৪ গড়ার লক্ষ্যে আপনার পাশে। পরিবর্তনের অঙ্গীকার নিয়ে আমরা এগিয়ে চলেছি।
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
              গুরুত্বপূর্ণ লিংক
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'হোম', href: '#home' },
                { name: 'ইশতেহার', href: '#manifesto' },
                { name: 'কর্মসূচি শিডিউল', href: '#schedule' },
                { name: 'ভলান্টিয়ার হোন', href: '#volunteer' },
                { name: 'অভিযোগ জানান', href: '#complaint' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="group flex items-center gap-2 text-emerald-200/80 hover:text-white transition-colors"
                  >
                    <ArrowRight size={14} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div>
             <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
              যোগাযোগ
            </h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-emerald-200/90 text-sm">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Ruhani Super Market, Mirpur, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-emerald-200/90 text-sm">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>+8801713-481243</span>
              </li>
              <li className="flex items-center gap-3 text-emerald-200/90 text-sm">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>sanjida_tulee@yahoo.com</span>
              </li>
            </ul>

            <div className="flex gap-4">
              <a href="#" className="bg-emerald-800 hover:bg-emerald-600 p-3 rounded-lg transition-all hover:-translate-y-1">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="#" className="bg-emerald-800 hover:bg-emerald-600 p-3 rounded-lg transition-all hover:-translate-y-1">
                <Youtube size={20} className="text-white" />
              </a>
              <a href="#" className="bg-emerald-800 hover:bg-emerald-600 p-3 rounded-lg transition-all hover:-translate-y-1">
                <Twitter size={20} className="text-white" />
              </a>
            </div>
          </div>

        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="pt-8 border-t border-emerald-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
          <p className="text-emerald-400/60 text-sm">
            © 2026 Engr. Sanjida Islam Tulee. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-emerald-400/60">
            <a href="#" className="hover:text-emerald-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-200 transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};