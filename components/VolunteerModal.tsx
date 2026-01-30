import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, UserPlus, CheckCircle, Loader2, MapPin, Phone, Mail, User } from 'lucide-react';

// Using the existing script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzhv6U5qwl-sO7uLQ-9RB3po2DX_7mtfVY1VXgHU4nYgk35SQaHqfFqTS5DoCy006m5Vw/exec';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Send data to Google Apps Script with explicit formType
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          ...formData, 
          formType: 'volunteer' // Explicitly marks this as volunteer data
        }),
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setStatus('success');
      setFormData({ name: '', phone: '', email: '', address: '', message: '' });
      
      // Close modal automatically after 3 seconds of success
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3000);

    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-white">
                  <UserPlus size={24} className="text-emerald-100" />
                  <h3 className="text-xl font-bold">ভলান্টিয়ার হিসেবে যোগ দিন</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="text-emerald-100 hover:text-white hover:bg-emerald-700/50 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                      <CheckCircle size={40} />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">অভিনন্দন!</h4>
                    <p className="text-gray-600">
                      আমাদের টিমে যোগ দেওয়ার আগ্রহ প্রকাশ করার জন্য ধন্যবাদ। <br/>
                      আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                    </p>
                    <button 
                      onClick={onClose}
                      className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-2 rounded-lg transition-colors"
                    >
                      বন্ধ করুন
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-gray-600 text-sm mb-4">
                      পরিবর্তনের যাত্রায় অংশ নিতে নিচের ফর্মটি পূরণ করুন। আপনার তথ্য গোপন রাখা হবে।
                    </p>

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <User size={14} /> আপনার নাম <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Phone size={14} /> মোবাইল নম্বর <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="017XXXXXXXX"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>

                    {/* Email (Optional) */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Mail size={14} /> ইমেইল (অপশনাল)
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="example@gmail.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <MapPin size={14} /> ঠিকানা / এলাকা <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        type="text"
                        placeholder="মিরপুর, সেকশন-১..."
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">কেন ভলান্টিয়ার হতে চান?</label>
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="ছোট করে আপনার আগ্রহের কারণ লিখুন..."
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                      />
                    </div>

                    {status === 'error' && (
                       <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
                         দুঃখিত, সাবমিট করা সম্ভব হয়নি। ইন্টারনেট কানেকশন চেক করে আবার চেষ্টা করুন।
                       </p>
                    )}

                    <button
                      disabled={status === 'submitting'}
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
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
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};