import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, FileDown, Share2, Facebook, Download, X, Check, Loader2, Sparkles } from 'lucide-react';

interface VoterBadgeProps {
  pollingLink: string;
}

export const VoterBadge: React.FC<VoterBadgeProps> = ({ pollingLink }) => {
  const [showModal, setShowModal] = useState(false);
  const [badgeUrl, setBadgeUrl] = useState<string | null>(null);
  const [currentBlob, setCurrentBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper to show temporary toast messages
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --- TASK 1: GEN-Z FUSION BADGE DESIGN ---
  const generateBadge = async () => {
    setIsGenerating(true);
    
    // Simulate processing/confetti delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Create high-res canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
        setIsGenerating(false);
        return;
    }

    // 1. Background: Deep Vertical Gradient (Dark Emerald to Black)
    const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
    gradient.addColorStop(0, '#022c22'); // Dark Emerald
    gradient.addColorStop(1, '#000000'); // Black
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // 2. Noise Texture (Optimized: Drawing scattered pixels)
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = '#ffffff';
    // Draw random noise with a larger step for performance
    for (let i = 0; i < 1080; i += 3) {
        for (let j = 0; j < 1080; j += 3) {
            if (Math.random() > 0.8) {
                ctx.fillRect(i, j, 2, 2);
            }
        }
    }
    ctx.restore();

    // 3. Decoration: "Fingerprint" / Organic Lines
    ctx.save();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)'; // Low opacity Emerald
    ctx.lineWidth = 4;
    ctx.translate(540, 540); // Center
    for (let r = 120; r < 700; r += 35) {
        ctx.beginPath();
        // Draw random arcs to look like a fingerprint/verified seal pattern
        const startAngle = Math.random() * Math.PI;
        const endAngle = startAngle + Math.random() * Math.PI + 1;
        ctx.arc(0, 0, r, startAngle, endAngle);
        ctx.stroke();
    }
    ctx.restore();

    // 4. Center Headline (English) - "MY VOTE MY RULES"
    ctx.textAlign = 'center';
    
    // Drop Shadow for Impact
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 15;
    
    ctx.fillStyle = '#ffffff';
    // Use Impact if available, fall back to heavy sans-serif
    ctx.font = '900 150px Impact, "Arial Black", sans-serif'; 
    // Adjust y-positions to center the block of text
    ctx.fillText('MY VOTE', 540, 420);
    ctx.fillText('MY RULES', 540, 570);

    // Reset Shadow for finer text
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // 5. Sub-Headline (Bangla)
    ctx.fillStyle = '#facc15'; // Yellow-400 (Gold)
    ctx.font = '600 60px "Hind Siliguri", sans-serif'; // Ensure Bangla font is used
    ctx.fillText('আগামীর ঢাকা আমার হাতে', 540, 700);

    // 6. Verified Tick Icon
    // Green Circle
    ctx.beginPath();
    ctx.arc(540, 840, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981'; // Emerald-500
    ctx.fill();
    // White Checkmark
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(520, 840);
    ctx.lineTo(535, 855);
    ctx.lineTo(565, 825);
    ctx.stroke();
    
    // "Verified Citizen" text below icon
    ctx.font = '700 24px sans-serif';
    ctx.fillStyle = '#6ee7b7'; // Emerald-300
    ctx.letterSpacing = '4px';
    ctx.fillText('VERIFIED CITIZEN', 540, 920);

    // 7. Footer
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '400 28px sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('Engr. Sanjida Islam Tuli | Dhaka-14', 540, 1020);

    // Convert to Blob & URL
    canvas.toBlob((blob) => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            setBadgeUrl(url);
            setCurrentBlob(blob);
            setShowModal(true); // Open Modal
        }
        setIsGenerating(false);
    }, 'image/png');
  };

  // --- TASK 3: SMART SHARE LOGIC ---
  const handleShare = async () => {
    if (!currentBlob) return;

    // 1. Mobile Native Share
    if (navigator.share) {
        try {
            const file = new File([currentBlob], 'my-vote-my-rules.png', { type: 'image/png' });
            await navigator.share({
                title: 'My Vote, My Rules',
                text: 'আগামীর ঢাকা আমার হাতে! আমি পরিবর্তনের পক্ষে। #Dhaka14 #GenZVote',
                files: [file]
            });
            showToast('শেয়ার সম্পন্ন হয়েছে!');
            return;
        } catch (error) {
            console.log('Native share failed/cancelled, falling back.');
        }
    }

    // 2. Desktop Fallback
    handleDownload(); 
    
    // Open Facebook Sharer (Post Prompt)
    window.open('https://www.facebook.com/sharer/sharer.php?u=https://sanjida-islam-tuli.vercel.app', '_blank', 'noopener,noreferrer');
    
    // Toast
    showToast('ব্যাজটি ডাউনলোড হয়েছে! ফেসবুকে আপলোড করুন।');
  };

  const handleDownload = () => {
    if (badgeUrl) {
        const link = document.createElement('a');
        link.href = badgeUrl;
        link.download = 'my-vote-my-rules.png';
        link.click();
        showToast('ডাউনলোড শুরু হয়েছে...');
    }
  };

  return (
    <section className="bg-white py-16 border-t border-gray-100 relative">
       {/* Toast Notification */}
       <AnimatePresence>
         {toastMessage && (
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2"
            >
                <Check size={18} className="text-emerald-400" />
                <span className="text-sm font-medium">{toastMessage}</span>
            </motion.div>
         )}
       </AnimatePresence>

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

             <div className="flex flex-col items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateBadge}
                  disabled={isGenerating}
                  className="px-8 py-4 rounded-full font-bold text-lg shadow-xl bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200 transition-all flex items-center gap-2 relative overflow-hidden group"
                >
                  {/* Button Content */}
                  {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" />
                        তৈরি হচ্ছে...
                      </>
                  ) : (
                      <>
                        <Sparkles size={20} className="group-hover:animate-pulse" />
                        শপথ নিন
                      </>
                  )}
                </motion.button>
             </div>
          </div>

          <div className="mt-8 text-center">
            <a 
              href={pollingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-medium transition-colors border-b-2 border-transparent hover:border-emerald-200 pb-1"
            >
               <FileDown size={18} />
               ভোটকেন্দ্রের তালিকা ডাউনলোড করুন (PDF)
            </a>
          </div>

       </div>

       {/* --- TASK 2: MODAL PREVIEW --- */}
       <AnimatePresence>
         {showModal && badgeUrl && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Award className="text-emerald-600" size={20} />
                            আপনার ব্যাজ রেডি!
                        </h3>
                        <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Preview Image */}
                    <div className="p-6 bg-gray-100 flex justify-center">
                        <img 
                            src={badgeUrl} 
                            alt="Voter Badge" 
                            className="w-full h-auto rounded-lg shadow-lg border border-gray-200" 
                        />
                    </div>

                    {/* Actions */}
                    <div className="p-6 space-y-3">
                        <button 
                            onClick={handleDownload}
                            className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-bold transition-all"
                        >
                            <Download size={20} />
                            সেভ করুন (Download)
                        </button>
                        
                        <button 
                            onClick={handleShare}
                            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all transform active:scale-95"
                        >
                            <Share2 size={20} />
                            সবার সাথে শেয়ার করুন
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-2">
                            *শেয়ার বাটনে ক্লিক করলে ছবিটি ডাউনলোড হবে এবং আপনি ফেসবুকে পোস্ট করতে পারবেন।
                        </p>
                    </div>
                </motion.div>
            </motion.div>
         )}
       </AnimatePresence>
    </section>
  );
};