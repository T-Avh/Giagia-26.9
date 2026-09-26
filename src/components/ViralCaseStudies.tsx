import React, { useState } from 'react';
import { VIRAL_VIDEOS, ViralVideo } from '../data/tiktokData';
import { Sparkles, Heart, MessageCircle, Share2, Bookmark, ShoppingBag, Music, Play, CheckCircle2, AlertCircle } from 'lucide-react';

export const ViralCaseStudies: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<ViralVideo>(VIRAL_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="space-y-6 mb-6">
      {/* Section Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Phân Tích Các Video Triệu View & Điểm Nổ Xu Hướng (Outliers Breakdown)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Giải mã công thức Hook, kịch bản, đòn bẩy quà tặng GWP và yếu tố kích hoạt thuật toán TikTok FYP
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500">
            {VIRAL_VIDEOS.length} video tiêu biểu được phân tích sâu
          </div>
        </div>

        {/* Video Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-4 pt-4 border-t border-slate-100">
          {VIRAL_VIDEOS.map((v) => {
            const isSelected = selectedVideo.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVideo(v)}
                className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-mono font-bold ${isSelected ? 'text-rose-400' : 'text-slate-900'}`}>
                    #{v.videoNum}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                    {v.date.slice(0, 5)}
                  </span>
                </div>
                <div className={`text-xs font-bold font-mono ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {v.views >= 1000000
                    ? `${(v.views / 1000000).toFixed(1)}M`
                    : `${(v.views / 1000).toFixed(0)}k`} views
                </div>
                <div className={`text-[10px] truncate mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {v.pillar.split('/')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage: TikTok Simulator on Left + Deep Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive TikTok Phone Mockup (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[340px] bg-slate-950 rounded-[36px] p-3 shadow-2xl border-4 border-slate-800 relative">
            {/* Camera notch / dynamic island */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2" />

            {/* Screen Viewport */}
            <div className="w-full aspect-9/16 bg-slate-900 rounded-[28px] overflow-hidden relative flex flex-col justify-between p-4 text-white select-none border border-slate-800">
              {/* Background Mock Visual Container */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-800/40 to-slate-950/90 z-0">
                {/* Visual themed illustration */}
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center opacity-40">
                  {selectedVideo.id === 'v724' && (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full bg-rose-500/30 flex items-center justify-center mx-auto text-2xl">
                        👩‍💼
                      </div>
                      <span className="text-xs font-mono text-slate-300">Bé Intern & Núi Giấy Gia Gia</span>
                    </div>
                  )}
                  {selectedVideo.id === 'v552' && (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full bg-blue-500/30 flex items-center justify-center mx-auto text-2xl">
                        🧊
                      </div>
                      <span className="text-xs font-mono text-slate-300">Thùng Đá Mini 2L Trà Sữa</span>
                    </div>
                  )}
                  {selectedVideo.id === 'v355' && (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full bg-amber-500/30 flex items-center justify-center mx-auto text-2xl">
                        🦫
                      </div>
                      <span className="text-xs font-mono text-slate-300">Gấu Bông Capybara Balo Rùa</span>
                    </div>
                  )}
                  {selectedVideo.id === 'v206' && (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full bg-yellow-500/30 flex items-center justify-center mx-auto text-2xl">
                        🥮
                      </div>
                      <span className="text-xs font-mono text-slate-300">Hộp Bánh Trung Thu Kinh Đô 0Đ</span>
                    </div>
                  )}
                  {selectedVideo.id === 'v457' && (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full bg-red-500/30 flex items-center justify-center mx-auto text-2xl">
                        🇻🇳
                      </div>
                      <span className="text-xs font-mono text-slate-300">Việt Nam Vô Địch Bóng Đá</span>
                    </div>
                  )}
                  {!['v724', 'v552', 'v355', 'v206', 'v457'].includes(selectedVideo.id) && (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full bg-indigo-500/30 flex items-center justify-center mx-auto text-2xl">
                        📦
                      </div>
                      <span className="text-xs font-mono text-slate-300">Kho Hàng Khăn Giấy Gia Gia</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Top Bar inside Video: Live Badge & Audio */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="bg-rose-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE DEAL
                </span>
                <span className="text-[11px] font-mono text-slate-300 bg-black/40 px-2 py-0.5 rounded">
                  #{selectedVideo.videoNum} · {selectedVideo.date}
                </span>
              </div>

              {/* Center Screen: Interactive Play State */}
              <div className="relative z-10 my-auto text-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center mx-auto hover:bg-black/60 transition-transform active:scale-95"
                >
                  <Play className={`w-5 h-5 text-white ${isPlaying ? 'opacity-40' : 'opacity-100 fill-white'}`} />
                </button>
                <div className="mt-3 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-[11px] font-medium text-amber-300 border border-amber-500/30">
                  {selectedVideo.hook}
                </div>
              </div>

              {/* Right Action Icons Column */}
              <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-3 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center hover:text-rose-400 cursor-pointer">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </div>
                  <span className="text-[10px] font-mono mt-0.5">{selectedVideo.likes.toLocaleString('vi-VN')}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center hover:text-blue-400 cursor-pointer">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-mono mt-0.5">{selectedVideo.comments}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center hover:text-amber-400 cursor-pointer">
                    <Bookmark className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-mono mt-0.5">{selectedVideo.saves}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center hover:text-emerald-400 cursor-pointer">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-mono mt-0.5">{selectedVideo.shares}</span>
                </div>
              </div>

              {/* Bottom Video Metadata & Shop Yellow Cart Link */}
              <div className="relative z-10 space-y-2">
                {/* Yellow TikTok Shop Cart Link Anchor */}
                <div className="bg-amber-400 text-slate-950 px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs font-semibold shadow-md">
                  <div className="flex items-center gap-1.5 truncate">
                    <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{selectedVideo.productAttached}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded shrink-0 ml-1">
                    MUA
                  </span>
                </div>

                {/* Handle & Title */}
                <div>
                  <div className="font-bold text-xs flex items-center gap-1">
                    <span>@giagia.vietnam</span>
                    <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                  </div>
                  <p className="text-[11px] text-slate-200 line-clamp-2 mt-0.5 leading-tight">
                    {selectedVideo.title} #khangiaygiagia #tiktokshop #sieusale
                  </p>
                </div>

                {/* Sound bar */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                  <Music className="w-3 h-3 text-slate-400 animate-spin" />
                  <span className="truncate">Âm thanh gốc - Gia Gia Khăn Giấy Việt Nam</span>
                </div>

                {/* Video scrubber bar */}
                <div className="w-full bg-white/20 h-0.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Formula & Strategic Diagnostic (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Headline Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-slate-500 font-mono">Video #{selectedVideo.videoNum} · Xuất bản: {selectedVideo.date}</span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">{selectedVideo.title}</h4>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-rose-600 font-mono tabular-nums">
                  {selectedVideo.views.toLocaleString('vi-VN')}
                </span>
                <span className="text-xs text-slate-500 block">lượt xem thực tế</span>
              </div>
            </div>

            {/* Script Breakdown */}
            <div className="my-4 space-y-3 text-xs">
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                <span className="font-semibold text-amber-900 block mb-1">
                  1. Hook 3 Giây Đầu (Điểm Giữ Chân Người Xem):
                </span>
                <p className="text-amber-800 italic leading-relaxed">
                  {selectedVideo.hook}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-semibold text-slate-900 block mb-1">
                  2. Kịch Bản & Trình Diễn Trong Video (Script Flow):
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {selectedVideo.scriptSnippet}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 border border-slate-200 rounded-lg bg-white">
                  <span className="text-[11px] text-slate-500 block">Sản Phẩm Gắn Giỏ Hàng:</span>
                  <span className="font-semibold text-slate-900 block mt-0.5">{selectedVideo.productAttached}</span>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg bg-white">
                  <span className="text-[11px] text-slate-500 block">Quà Tặng Đi Kèm (GWP):</span>
                  <span className="font-semibold text-emerald-700 block mt-0.5">{selectedVideo.giftOffer}</span>
                </div>
              </div>
            </div>

            {/* Why it went Viral Checklist */}
            <div className="pt-2 border-t border-slate-100">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                4 Yếu Tố Giúp Video Kích Hoạt Thuật Toán FYP:
              </h5>
              <div className="space-y-2 text-xs">
                {selectedVideo.viralityFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Takeaway */}
            <div className="mt-4 p-3 bg-slate-900 text-white rounded-lg text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 font-semibold">Bài Học Cho Kênh: </strong>
                <span className="text-slate-200">{selectedVideo.keyTakeaway}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
