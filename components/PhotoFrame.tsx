import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, Image as ImageIcon, ZoomIn, ZoomOut, Move } from 'lucide-react';

export const PhotoFrame = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Canvas State for manipulation
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
           setImage(img);
           // Reset transforms on new image
           setZoom(1);
           setPan({ x: 0, y: 0 });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- DRAW USER IMAGE WITH TRANSFORMS ---
    ctx.save();
    
    // Translate to center to apply zoom/pan from center
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(pan.x, pan.y);

    // Calculate "cover" dimensions
    const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
    const w = image.width * scale;
    const h = image.height * scale;

    // Draw image centered at (0,0) in transformed space
    ctx.drawImage(image, -w / 2, -h / 2, w, h);
    
    ctx.restore();

    // --- DRAW OVERLAY (Fixed on top) ---
    // Draw Gradient Overlay (Bottom)
    const gradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.6, 'rgba(6, 78, 59, 0.8)'); // emerald-900
    gradient.addColorStop(1, 'rgba(6, 78, 59, 1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);

    // Draw Text
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    
    // Title
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('I Support', canvas.width / 2, canvas.height - 100);
    
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('Engr. Sanjida Tuli', canvas.width / 2, canvas.height - 60);

    // Subtitle
    ctx.font = '500 24px sans-serif';
    ctx.fillStyle = '#fbbf24'; // amber-400
    ctx.fillText('Dhaka-14 | ধানের শীষ', canvas.width / 2, canvas.height - 25);
    
    // Draw Icon (Symbolic 🌾)
    ctx.font = '40px serif';
    ctx.fillText('🌾', 50, canvas.height - 40);
    ctx.fillText('🌾', canvas.width - 50, canvas.height - 40);
    
    // Add Border
    ctx.strokeStyle = '#10b981'; // emerald-500
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (image) {
      drawCanvas();
    }
  }, [image, zoom, pan]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'sanjida-tuli-support-poster.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  // Mouse/Touch Handlers for Panning
  const handleMouseDown = (e: React.MouseEvent) => {
     setIsDragging(true);
     setDragStart({ x: e.clientX - pan.x * zoom, y: e.clientY - pan.y * zoom }); // Adjust for zoom
  };

  const handleMouseMove = (e: React.MouseEvent) => {
     if (!isDragging) return;
     const newX = (e.clientX - dragStart.x) / zoom;
     const newY = (e.clientY - dragStart.y) / zoom;
     setPan({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
     setIsDragging(false);
  };

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x * zoom, y: touch.clientY - pan.y * zoom });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const newX = (touch.clientX - dragStart.x) / zoom;
      const newY = (touch.clientY - dragStart.y) / zoom;
      setPan({ x: newX, y: newY });
      // Prevent scrolling while dragging image
      if(e.cancelable) e.preventDefault(); 
  };

  return (
    <section id="photoframe" className="py-24 bg-emerald-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-400 rounded-full blur-[100px]"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-100 text-sm font-semibold mb-4 border border-emerald-700">
            <ImageIcon size={16} />
            <span>ক্যাম্পেইন</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
             আপনার ছবিতে <span className="text-emerald-400">ধানের শীষের ফ্রেম</span>
          </h2>
          <p className="text-emerald-200 max-w-2xl mx-auto">
            আপনার ছবি আপলোড করে সমর্থন জানান। ছবিটি জুম এবং মুভ করে এডজাস্ট করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Controls */}
          <div className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="space-y-4">
                <label className="block text-sm font-medium text-emerald-200">১. আপনার ছবি সিলেক্ট করুন</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-600 hover:border-emerald-400 rounded-xl p-8 text-center cursor-pointer transition-colors group relative overflow-hidden"
                >
                    <Upload className="mx-auto h-12 w-12 text-emerald-500 group-hover:text-emerald-300 mb-3 relative z-10" />
                    <p className="text-sm text-gray-300 group-hover:text-white relative z-10">
                        {image ? "ছবি পরিবর্তন করতে ক্লিক করুন" : "Click to upload image"}
                    </p>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                </div>
             </div>

             {image && (
               <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  
                  {/* Zoom Control */}
                  <div className="space-y-2">
                     <div className="flex justify-between text-sm text-emerald-200">
                        <span className="flex items-center gap-1"><ZoomOut size={14}/> জুম আউট</span>
                        <span className="flex items-center gap-1">জুম ইন <ZoomIn size={14}/></span>
                     </div>
                     <input 
                       type="range" 
                       min="1" 
                       max="3" 
                       step="0.05"
                       value={zoom}
                       onChange={(e) => setZoom(parseFloat(e.target.value))}
                       className="w-full h-2 bg-emerald-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                     />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-800/50 p-3 rounded-lg border border-emerald-700">
                     <Move size={14} />
                     <span>ছবির উপর ক্লিক করে ড্র্যাগ করে পজিশন ঠিক করুন</span>
                  </div>

                  <div className="pt-2 space-y-3">
                    <label className="block text-sm font-medium text-emerald-200">২. পোস্টার ডাউনলোড করুন</label>
                    <button 
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-emerald-500/20 transition-all transform hover:scale-[1.02]"
                    >
                      <Download size={20} />
                      ডাউনলোড পোস্টার
                    </button>
                    <button 
                      onClick={() => { 
                          setImage(null); 
                          setZoom(1);
                          setPan({x:0, y:0});
                          if(fileInputRef.current) fileInputRef.current.value = ''; 
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-emerald-200 py-3 rounded-xl font-medium transition-all"
                    >
                      <RefreshCw size={16} />
                      রিসেট করুন
                    </button>
                  </div>
               </div>
             )}
          </div>

          {/* Preview Area */}
          <div className="flex justify-center">
            <div className="relative rounded-lg shadow-2xl overflow-hidden ring-8 ring-white/10 bg-emerald-950 cursor-move touch-none">
               {!image ? (
                 <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex flex-col items-center justify-center text-emerald-700/50">
                    <ImageIcon size={64} className="mb-4" />
                    <p>প্রিভিউ এখানে দেখা যাবে</p>
                 </div>
               ) : (
                 <canvas 
                    ref={canvasRef} 
                    width={500} 
                    height={500} 
                    className="w-full max-w-[400px] h-auto touch-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseUp}
                 />
               )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};