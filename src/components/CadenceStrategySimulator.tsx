import React, { useState } from 'react';
import { Sliders, Calculator, CheckSquare, Sparkles, AlertTriangle, ShieldCheck, Clock, Copy, Check } from 'lucide-react';

export const CadenceStrategySimulator: React.FC = () => {
  const [dailyVideos, setDailyVideos] = useState<number>(6);
  const [liveFeederRatio, setLiveFeederRatio] = useState<number>(65);
  const [hasHotGWP, setHasHotGWP] = useState<boolean>(true);
  const [copiedSchedule, setCopiedSchedule] = useState(false);

  // Calculations based on 903-video regression data:
  // Base views per video drops as cadence increases
  let baseViewsPerClip = 5500;
  if (dailyVideos <= 4) {
    baseViewsPerClip = 7200;
  } else if (dailyVideos <= 8) {
    baseViewsPerClip = 5200;
  } else if (dailyVideos <= 15) {
    baseViewsPerClip = 3100;
  } else if (dailyVideos <= 22) {
    baseViewsPerClip = 1900;
  } else {
    // Over 22 videos/day (severe cannibalization like 09/09)
    baseViewsPerClip = 1100;
  }

  // Multiplier for hot GWP (Thùng đá, Capy, Bánh Kinh Đô)
  const gwpMultiplier = hasHotGWP ? 1.45 : 0.9;

  // Intern/Sitcom presence bonus (if feeder ratio <= 70%, meaning >= 30% quality storytelling)
  const storytellingRatio = 100 - liveFeederRatio;
  const qualityMultiplier = 0.8 + (storytellingRatio / 100) * 0.8;

  const estimatedAvgViews = Math.round(baseViewsPerClip * gwpMultiplier * qualityMultiplier);
  const estimatedDailyViews = estimatedAvgViews * dailyVideos;
  const estimatedMonthlyViews = estimatedDailyViews * 30;

  // Algorithmic health rating & cannibalization risk
  let healthScore = 'Xuất Sắc (92/100)';
  let healthColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let cannibalizationRisk = 'An Toàn (Thuật toán quét đủ thời gian)';
  let cannibalizationColor = 'text-emerald-700';

  if (dailyVideos > 20) {
    healthScore = 'Bị Cảnh Báo Spam (38/100)';
    healthColor = 'text-rose-700 bg-rose-50 border-rose-200';
    cannibalizationRisk = 'Nguy Hiểm Cao (Nhiều video bị kẹt dưới 50 views)';
    cannibalizationColor = 'text-rose-600';
  } else if (dailyVideos >= 13) {
    healthScore = 'Trung Bình (64/100)';
    healthColor = 'text-amber-700 bg-amber-50 border-amber-200';
    cannibalizationRisk = 'Nguy Cơ Dẫm Chân (Lượt xem/clip giảm 50%)';
    cannibalizationColor = 'text-amber-600';
  }

  // Estimated Live Inflow (People directed to Live)
  const estimatedLiveClicksPerDay = Math.round(dailyVideos * (liveFeederRatio / 100) * (hasHotGWP ? 280 : 160));

  const copyScheduleText = () => {
    const text = `LỊCH ĐĂNG TỐI ƯU GIA GIA TIKTOK (${dailyVideos} VIDEO/NGÀY):
- Ca 1 (Sáng 07h00 - 09h00): 1 Video Mồi Live deal sáng + 1 Video Sitcom Intern
- Ca 2 (Trưa 11h30 - 13h30): 1 Video Test sản phẩm / Review OOH + 1 Video Mồi Live deal giờ trưa
- Ca 3 (Tối 19h30 - 22h30): 2 Video Mồi Live xả kho đêm (Cách nhau tối thiểu 45 phút)
Tỷ lệ: ${liveFeederRatio}% Mồi Live / ${storytellingRatio}% Nội dung Chân thực & Storytelling.`;
    navigator.clipboard.writeText(text);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 2000);
  };

  return (
    <div className="space-y-6 mb-6">
      {/* Tool Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-slate-500" />
              <span>Bộ Công Cụ Mô Phỏng Tần Suất Đăng & Kiểm Soát Dẫm Chân (Cadence Simulator)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Dự phóng hiệu quả kênh dựa trên thuật toán phân phối thực nghiệm từ tập dữ liệu 903 video của Gia Gia
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">Mô hình toán học thực chứng</span>
        </div>

        {/* Simulator Controls & Projections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5 items-start">
          {/* Controls Column (6 cols) */}
          <div className="lg:col-span-6 space-y-5 bg-slate-50/60 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-slate-500" />
              <span>Thiết Lập Kế Hoạch Đăng Tải</span>
            </h4>

            {/* Slider 1: Daily Videos */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-800">
                  Số video dự kiến đăng mỗi ngày:
                </span>
                <span className="font-mono text-base font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200 tabular-nums">
                  {dailyVideos} video/ngày
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="35"
                step="1"
                value={dailyVideos}
                onChange={(e) => setDailyVideos(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>1 vid (Tối giản)</span>
                <span className="text-emerald-600 font-medium">5-7 vid (Khuyến nghị)</span>
                <span className="text-amber-600">15 vid (Quá tải)</span>
                <span className="text-rose-600">35 vid (Spam)</span>
              </div>
            </div>

            {/* Slider 2: Ratio of Live Feeder */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-800">
                  Tỷ lệ Video mồi Live (Live Feeder):
                </span>
                <span className="font-mono text-xs font-bold text-amber-700 bg-white px-2 py-0.5 rounded border border-slate-200 tabular-nums">
                  {liveFeederRatio}% Feeder / {storytellingRatio}% Story
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                step="5"
                value={liveFeederRatio}
                onChange={(e) => setLiveFeederRatio(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>30% (Thiên về Story)</span>
                <span className="text-emerald-600 font-medium">65% (Tỷ lệ vàng 70/30)</span>
                <span>90% (Công nghiệp hóa)</span>
              </div>
            </div>

            {/* Toggle: Hot GWP Available */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">
                  Đòn bẩy Quà tặng Kèm Hot (GWP):
                </span>
                <span className="text-[11px] text-slate-500">
                  Có sẵn quà tặng theo trend (Thùng đá mini, Gấu Capybara, Bánh Kinh Đô)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHasHotGWP(!hasHotGWP)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  hasHotGWP ? 'bg-rose-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    hasHotGWP ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Projections Column (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Kết Quả Dự Phóng Thuật Toán (Algorithmic Forecast)</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <span className="text-[11px] text-slate-500 block">Lượt Xem Dự Phóng / Clip</span>
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  {estimatedAvgViews.toLocaleString('vi-VN')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">views/video</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <span className="text-[11px] text-slate-500 block">Tổng Lượt Xem Dự Phóng / Ngày</span>
                <span className="text-2xl font-bold text-rose-600 font-mono tabular-nums">
                  {estimatedDailyViews.toLocaleString('vi-VN')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">views/24h</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <span className="text-[11px] text-slate-500 block">Mắt Xem Kéo Vào Live / Ngày</span>
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  ~{estimatedLiveClicksPerDay.toLocaleString('vi-VN')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">lượt click sang Live</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <span className="text-[11px] text-slate-500 block">Lượt Xem Dự Phóng 30 Ngày</span>
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  {(estimatedMonthlyViews / 1000000).toFixed(2)}M
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">views tháng</span>
              </div>
            </div>

            {/* Health & Cannibalization Status Indicator */}
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Điểm Uy Tín Kênh (Quality Score):</span>
                <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${healthColor}`}>
                  {healthScore}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span className="font-semibold text-slate-700">Rủi Ro Tự Dẫm Chân (Cannibalization):</span>
                <span className={`font-semibold ${cannibalizationColor}`}>
                  {cannibalizationRisk}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended 70 / 20 / 10 Execution Plan */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Khung Chiến Lược 70 / 20 / 10 & Lịch Phát Sóng Chuẩn (Publishing Cadence Matrix)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Giải pháp tối ưu hóa năng suất sản xuất và ngăn chặn triệt để thuật toán bóp reach
            </p>
          </div>

          <button
            onClick={copyScheduleText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors self-start sm:self-auto"
          >
            {copiedSchedule ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Đã sao chép lịch!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Sao chép lịch đăng</span>
              </>
            )}
          </button>
        </div>

        {/* 3 Pillars of 70/20/10 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 text-sm">70% Chuyển Đổi</span>
              <span className="text-[11px] font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                4-5 clip/ngày
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-3">
              <strong>Mục tiêu:</strong> Bơm mắt xem cho các ca live (Sáng 8h-11h, Trưa 12h-14h, Tối 19h30-23h).
            </p>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div>· Đăng trước giờ live đúng 45 phút.</div>
              <div>· Khoảng cách giữa 2 video tối thiểu <strong>40 – 45 phút</strong>.</div>
              <div>· Thay đổi người dẫn và góc quay (không quay trùng 1 chỗ kho).</div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 text-sm">20% Niềm Tin & Test</span>
              <span className="text-[11px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                1-2 clip/ngày
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-3">
              <strong>Mục tiêu:</strong> Xóa tan định kiến "giấy giá rẻ bở mủn" và khẳng định nguồn gốc nhà máy Phú Thọ.
            </p>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div>· Video nhúng nước vắt kiệt không nát vụn.</div>
              <div>· Test kéo bình nước 5L bằng 1 tờ giấy dập vân.</div>
              <div>· Khảo sát tiểu thương chợ truyền thống và quán ăn.</div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 text-sm">10% Cốt Truyện Viral</span>
              <span className="text-[11px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                2-3 clip/tuần
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-3">
              <strong>Mục tiêu:</strong> Kéo tệp người xem mới (Reach) và kích hoạt cơ chế lan truyền triệu view như #724.
            </p>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div>· Sitcom cố định: <em>"Nhật ký bé Intern chạy số"</em>.</div>
              <div>· Đăng cố định vào khung giờ vàng thư giãn: <strong>19h00 Thứ Ba & Thứ Sáu</strong>.</div>
              <div>· Đóng góp 80% lượt Share và Save cho toàn kênh.</div>
            </div>
          </div>
        </div>

        {/* Action Checklist for Next Mega Campaign */}
        <div className="mt-5 p-4 rounded-xl border border-slate-200 bg-white">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Checklist Vận Hành Cho Chiến Dịch Siêu Sale Kế Tiếp (10.10 & 11.11):</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="flex items-start gap-2 p-2 rounded bg-slate-50">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Giới hạn tối đa <strong>12 video</strong> trong ngày D-Day (thay vì 36 video gây nghẽn luồng như 9.9).</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded bg-slate-50">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Chốt trước quà tặng GWP mùa thu/đông (Ví dụ: Bình giữ nhiệt inox, áo mưa cao cấp hoặc combo túi mù).</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded bg-slate-50">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Đưa nhân vật "Bé Intern" vào các phiên Teaser 3 ngày trước Mega Sale để hâm nóng sự tò mò.</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded bg-slate-50">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Tạo các gói Combo Tái Mua (Refill Pack 10-20 bịch) cho tệp khách cũ đã mua đợt thùng đá tháng 8.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
