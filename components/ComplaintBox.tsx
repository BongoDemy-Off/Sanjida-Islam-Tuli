import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzhv6U5qwl-sO7uLQ-9RB3po2DX_7mtfVY1VXgHU4nYgk35SQaHqfFqTS5DoCy006m5Vw/exec';

interface ComplaintBoxProps {
  videoId: string;
}

export const ComplaintBox: React.FC<ComplaintBoxProps> = ({ videoId }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ward: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Using no-cors mode for Google Apps Script Web App
      // Adding explicit formType: 'complaint'
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          formType: 'complaint'
        }),
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Since no-cors returns opaque response, we assume success if no network error
      setStatus('success');
      setFormData({ name: '', phone: '', ward: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="complaint" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Video & Info */}
          <div className="space-y-8">
            <div>
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                 জনতার মুখোমুখি
               </h2>
               <p className="text-gray-600 text-lg">
                 সরাসরি আপনার অভিযোগ বা পরামর্শ জানান। আমরা প্রতিটি বার্তা গুরুত্বের সাথে দেখি এবং দ্রুত ব্যবস্থা গ্রহণ করি।
               </p>
            </div>

            {/* Video Placeholder */}
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg relative group">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
            </div>

            <div className="bg-emerald-100/50 p-6 rounded-xl border border-emerald-100">
               <h4 className="font-bold text-emerald-900 mb-2">জরুরি প্রয়োজনে:</h4>
               <p className="text-emerald-800">হটলাইন: ০১৭১৩-৪৮১২৪৩ (সকাল ৯টা - রাত ১০টা)</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">আপনার সমস্যা ও পরামর্শ জানান</h3>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">ধন্যবাদ!</h4>
                  <p className="text-gray-600">আপনার অভিযোগ সফলভাবে জমা দেওয়া হয়েছে। <br/> আমরা শীঘ্রই যোগাযোগ করব।</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-emerald-600 font-medium hover:underline"
                  >
                    আরেকটি অভিযোগ করুন
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">আপনার নাম</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                      placeholder="মোঃ রহিম উদ্দিন"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নম্বর</label>
                      <input 
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                        placeholder="017XXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ওয়ার্ড নং</label>
                      <select 
                        required
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white"
                      >
                        <option value="">নির্বাচন করুন</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i+1} value={i+1}>ওয়ার্ড {i+1}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">অভিযোগ বা পরামর্শ</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none resize-none"
                      placeholder="আপনার সমস্যা বিস্তারিত লিখুন..."
                    ></textarea>
                  </div>

                  <button 
                    disabled={status === 'submitting'}
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" />
                        জমা হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        জমা দিন
                      </>
                    )}
                  </button>
                  {status === 'error' && (
                     <p className="text-red-500 text-sm text-center">দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}