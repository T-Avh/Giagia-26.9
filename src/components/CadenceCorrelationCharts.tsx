import React, { useState } from 'react';
import { DAILY_RECORDS, DailyRecord } from '../data/tiktokData';
import { TrendingUp, AlertTriangle, Layers, BarChart2, Award } from 'lucide-react';
import { CampaignComparison88vs99 } from './CampaignComparison88vs99';

interface CadenceCorrelationChartsProps {
  initialTab?: 'timeline' | 'cannibalization' | 'tiers' | 'campaign_88_vs_99';
}

export const CadenceCorrelationCharts: React.FC<CadenceCorrelationChartsProps> = ({ initialTab = 'campaign_88_vs_99' }) => {
  const [activeChartTab, setActiveChartTab] = useState<'timeline' | 'cannibalization' | 'tiers' | 'campaign_88_vs_99'>(initialTab);
  const [hoveredDay, setHoveredDay] = useState<DailyRecord | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Chronological ordered records (from June 25 to Sept 26)
  const chronoRecords = [...DAILY_RECORDS].reverse();

  // SVG Dimension Constants for Timeline
  const width = 1000;
  const height = 340;
  const paddingLeft = 55;
  const paddingRight = 60;
  const paddingTop = 30;
  const paddingBottom = 40;
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  // Max values for scales
  // To avoid #724 1M view flattening everything else, we can use log-dampened or clamped scale with an explicit marker
  const maxVideos = 40; // Max was 36 on 09/09
  const maxViewsDisplay = 500000; // Cap visual axis at 500k so other 100k spikes remain visible; #724 marked with crown

  const points = chronoRecords.map((rec, i) => {
    const x = paddingLeft + (i / (chronoRecords.length - 1)) * innerWidth;
    // Bar height for video count (bottom aligned)
    const barHeight = (rec.videoCount / maxVideos) * innerHeight;
    const barY = height - paddingBottom - barHeight;

    // Line Y for total views (clamped for visual smoothness)
    const effectiveViews = Math.min(rec.totalViews, maxViewsDisplay);
    const lineY = height - paddingBottom - (effectiveViews / maxViewsDisplay) * innerHeight;

    return { x, barY, barHeight, lineY, rec };
  });

  // Generate line path
  const linePathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.lineY}` : `${acc} L ${pt.x},${pt.lineY}`;
  }, '');

  // Cannibalization Groups:
  // Group days by videoCount tier to see average views per clip
  const cadenceTiers = [
    { range: '1 - 5 video', min: 1, max: 5, days: 0, totalVids: 0, totalViews: 0, avgPerClip: 0, avgER: 0 },
    { range: '6 - 10 video', min: 6, max: 10, days: 0, totalVids: 0, totalViews: 0, avgPerClip: 0, avgER: 0 },
    { range: '11 - 15 video', min: 11, max: 15, days: 0, totalVids: 0, totalViews: 0, avgPerClip: 0, avgER: 0 },
    { range: '16 - 20 video', min: 16, max: 20, days: 0, totalVids: 0, totalViews: 0, avgPerClip: 0, avgER: 0 },
    { range: '21 - 36 video', min: 21, max: 36, days: 0, totalVids: 0, totalViews: 0, avgPerClip: 0, avgER: 0 },
  ];

  DAILY_RECORDS.forEach(rec => {
    const tier = cadenceTiers.find(t => rec.videoCount >= t.min && rec.videoCount <= t.max);
    if (tier) {
      tier.days += 1;
      tier.totalVids += rec.videoCount;
      tier.totalViews += rec.totalViews;
      tier.avgER += rec.erPercent;
    }
  });

  cadenceTiers.forEach(tier => {
    tier.avgPerClip = tier.totalVids > 0 ? Math.round(tier.totalViews / tier.totalVids) : 0;
    tier.avgER = tier.days > 0 ? Number((tier.avgER / tier.days).toFixed(2)) : 0;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-2xs">
      {/* Chart Navigation & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-slate-500" />
            <span>Phân Tích Tương Quan & Hiện Tượng "Tự Dẫm Chân Lượt Xem"</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            So sánh trực quan giữa Sản Lượng Đăng Tải (Video Cadence) và Sức Hút Thuật Toán (Reach & ER)
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveChartTab('campaign_88_vs_99')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
              activeChartTab === 'campaign_88_vs_99' ? 'bg-white text-rose-700 font-bold shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-rose-500" />
            <span>So Sánh Mega Sale 8.8 vs 9.9</span>
          </button>
          <button
            onClick={() => setActiveChartTab('timeline')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeChartTab === 'timeline' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dòng Thời Gian Kép (Dual Axis)
          </button>
          <button
            onClick={() => setActiveChartTab('cannibalization')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeChartTab === 'cannibalization' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đường Cong Dẫm Chân (Cannibalization)
          </button>
          <button
            onClick={() => setActiveChartTab('tiers')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeChartTab === 'tiers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Phân Tầng Lượt Xem (View Tiers)
          </button>
        </div>
      </div>

      {/* Tab 1: Chronological Dual Axis */}
      {activeChartTab === 'timeline' && (
        <div className="mt-4">
          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 mb-2 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-slate-300 rounded-xs inline-block" />
                <span>Cột: Số Video Đăng / Ngày (Trục Trái: 0 - 40 vid)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-rose-500 rounded-full inline-block" />
                <span className="text-rose-600 font-medium">Đường: Tổng Lượt Xem / Ngày (Trục Phải: 0 - 500k+ views)</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Rê chuột vào điểm dữ liệu để xem chi tiết ngày đó
            </div>
          </div>

          {/* SVG Chart Container */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto min-w-[700px] select-none"
              onMouseLeave={() => {
                setHoveredDay(null);
                setMousePos(null);
              }}
            >
              {/* Background Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = height - paddingBottom - ratio * innerHeight;
                const viewVal = Math.round(ratio * maxViewsDisplay);
                const vidVal = Math.round(ratio * maxVideos);

                return (
                  <g key={ratio}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={width - paddingRight}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="3 3"
                    />
                    {/* Left Axis: Videos */}
                    <text
                      x={paddingLeft - 8}
                      y={y + 3}
                      textAnchor="end"
                      className="text-[10px] fill-slate-400 font-mono"
                    >
                      {vidVal}
                    </text>
                    {/* Right Axis: Views */}
                    <text
                      x={width - paddingRight + 8}
                      y={y + 3}
                      textAnchor="start"
                      className="text-[10px] fill-rose-400 font-mono"
                    >
                      {viewVal >= 1000 ? `${viewVal / 1000}k` : viewVal}
                    </text>
                  </g>
                );
              })}

              {/* Month Phase Markers */}
              <text x={paddingLeft + 40} y={paddingTop - 10} className="text-[11px] fill-slate-400 font-semibold">
                Tháng 7: Khởi chạy (3-8 vid/ngày)
              </text>
              <text x={paddingLeft + innerWidth * 0.45} y={paddingTop - 10} className="text-[11px] fill-slate-400 font-semibold">
                Tháng 8: Bùng nổ Thùng đá & Intern (10-21 vid)
              </text>
              <text x={paddingLeft + innerWidth * 0.8} y={paddingTop - 10} className="text-[11px] fill-slate-400 font-semibold">
                Tháng 9: 9.9 & Capy (15-36 vid)
              </text>

              {/* Bars: Video Output Cadence */}
              {points.map((pt, i) => (
                <rect
                  key={`bar-${i}`}
                  x={pt.x - 3}
                  y={pt.barY}
                  width={6}
                  height={pt.barHeight}
                  fill={pt.rec.videoCount >= 25 ? '#f43f5e' : pt.rec.videoCount >= 15 ? '#cbd5e1' : '#e2e8f0'}
                  rx={1.5}
                  className="transition-opacity hover:opacity-75"
                />
              ))}

              {/* Line: Daily Views */}
              <path
                d={linePathD}
                fill="none"
                stroke="#f43f5e"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points on Line with Spikes */}
              {points.map((pt, i) => {
                const isSpike = pt.rec.isSpikeDay || pt.rec.totalViews > 50000;
                return (
                  <g
                    key={`pt-${i}`}
                    onMouseEnter={(e) => {
                      setHoveredDay(pt.rec);
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMousePos({ x: rect.left, y: rect.top });
                    }}
                    className="cursor-pointer"
                  >
                    {/* Hit area */}
                    <circle cx={pt.x} cy={pt.lineY} r={8} fill="transparent" />
                    
                    {/* Visual dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.lineY}
                      r={isSpike ? 5 : 2.5}
                      fill={isSpike ? '#e11d48' : '#ffffff'}
                      stroke="#f43f5e"
                      strokeWidth={isSpike ? 2.5 : 1.5}
                    />

                    {/* Text Label on Huge Spikes */}
                    {pt.rec.date === '2026-08-06' && (
                      <g>
                        <text
                          x={pt.x}
                          y={pt.lineY - 14}
                          textAnchor="middle"
                          className="text-[10px] fill-rose-700 font-bold font-mono"
                        >
                          👑 1.0M (#724)
                        </text>
                      </g>
                    )}

                    {pt.rec.date === '2026-08-18' && (
                      <g>
                        <text
                          x={pt.x}
                          y={pt.lineY - 12}
                          textAnchor="middle"
                          className="text-[10px] fill-rose-700 font-bold font-mono"
                        >
                          🚀 401k (#552)
                        </text>
                      </g>
                    )}

                    {pt.rec.date === '2026-07-28' && (
                      <g>
                        <text
                          x={pt.x}
                          y={pt.lineY - 12}
                          textAnchor="middle"
                          className="text-[10px] fill-rose-700 font-bold font-mono"
                        >
                          260k (#790)
                        </text>
                      </g>
                    )}

                    {pt.rec.date === '2026-09-09' && (
                      <g>
                        <text
                          x={pt.x}
                          y={pt.lineY - 12}
                          textAnchor="middle"
                          className="text-[10px] fill-slate-800 font-bold font-mono"
                        >
                          36 vids (9.9)
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* X Axis Dates (sample every few points) */}
              {points.map((pt, i) => {
                if (i % 6 === 0 || i === points.length - 1) {
                  return (
                    <text
                      key={`label-${i}`}
                      x={pt.x}
                      y={height - paddingBottom + 18}
                      textAnchor="middle"
                      className="text-[10px] fill-slate-400 font-mono"
                    >
                      {pt.rec.displayDate}
                    </text>
                  );
                }
                return null;
              })}
            </svg>

            {/* Hover Tooltip Box */}
            {hoveredDay && (
              <div className="absolute top-2 right-4 bg-slate-900 text-white rounded-lg p-3 text-xs shadow-lg max-w-xs pointer-events-none z-10 font-sans border border-slate-700">
                <div className="font-semibold text-rose-300 flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
                  <span>Ngày {hoveredDay.displayDate}/2026 ({hoveredDay.dayOfWeek})</span>
                  <span className="font-mono text-slate-300">{hoveredDay.campaignTag}</span>
                </div>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Số video đã đăng:</span>
                    <span className="font-bold text-white">{hoveredDay.videoCount} clip</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Tổng lượt xem:</span>
                    <span className="font-bold text-rose-400">{hoveredDay.totalViews.toLocaleString('vi-VN')} views</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Lượt xem TB / clip:</span>
                    <span className="font-bold text-white">{hoveredDay.avgViews.toLocaleString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Tỷ lệ tương tác (ER):</span>
                    <span className="font-bold text-emerald-400">{hoveredDay.erPercent}%</span>
                  </div>
                </div>
                {hoveredDay.highlightNotes && (
                  <p className="mt-2 pt-1 border-t border-slate-800 text-[11px] text-slate-300 font-sans leading-tight">
                    {hoveredDay.highlightNotes}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Cannibalization Analysis */}
      {activeChartTab === 'cannibalization' && (
        <div className="mt-4 space-y-6">
          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Phát Hiện Thuật Toán: "Nghịch Lý Đăng Nhiều - Lượt Xem Rơi Tự Do"</strong>
              <p className="mt-1 leading-relaxed text-amber-800">
                Khi số lượng video đăng trong ngày vượt quá <strong>15 video/ngày</strong>, lượt xem trung bình trên mỗi video giảm từ <strong>~5.800 views</strong> xuống chỉ còn <strong>~1.400 views (giảm hơn 75%)</strong>. Đặc biệt vào ngày 09/09 khi đăng 36 video, nhiều video liên tiếp chỉ đạt 22 – 45 lượt xem vì bị thuật toán TikTok Shop đánh giá là nội dung spam lặp lại.
              </p>
            </div>
          </div>

          {/* Cannibalization Bar Comparison */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Tương quan giữa Tần suất đăng (Số Video/ngày) và Lượt xem trung bình mỗi clip
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {cadenceTiers.map((tier) => {
                // Calculate relative bar height
                const heightPercent = Math.min(100, Math.round((tier.avgPerClip / 7000) * 100));
                const isHarmful = tier.min >= 21;
                const isOptimal = tier.min >= 6 && tier.max <= 10;

                return (
                  <div
                    key={tier.range}
                    className={`border rounded-lg p-3.5 flex flex-col justify-between ${
                      isHarmful
                        ? 'border-rose-200 bg-rose-50/30'
                        : isOptimal
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-900 mb-1">
                        <span>{tier.range}</span>
                        <span className="text-[10px] font-mono text-slate-400">({tier.days} ngày)</span>
                      </div>
                      <span className="text-[11px] text-slate-500 block mb-3">
                        {isHarmful ? 'Nguy cơ dẫm chân cao' : isOptimal ? 'Điểm cân bằng tốt nhất' : 'Tần suất phổ thông'}
                      </span>
                    </div>

                    <div>
                      <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                        {tier.avgPerClip.toLocaleString('vi-VN')}
                        <span className="text-[11px] font-normal text-slate-500 ml-1">views/clip</span>
                      </div>

                      {/* Visual gauge */}
                      <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isHarmful ? 'bg-rose-500' : isOptimal ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                          style={{ width: `${heightPercent}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-mono">
                        <span>ER: {tier.avgER}%</span>
                        <span>{tier.totalVids} video</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Observations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="border border-slate-200 rounded-lg p-3">
              <span className="font-semibold text-slate-900 block mb-1">1. Tốc độ kiểm duyệt & Phân phối</span>
              <p className="text-slate-600 leading-relaxed">
                TikTok Shop cần tối thiểu 30-45 phút để quét mã giỏ hàng, nhận diện hình ảnh và đưa video qua các bể thử nghiệm ban đầu (Test Pool 100-300 views). Đăng 15 phút/clip khiến video trước bị chặn luồng phân phối sớm.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <span className="font-semibold text-slate-900 block mb-1">2. Mệt mỏi thị giác người theo dõi</span>
              <p className="text-slate-600 leading-relaxed">
                Người theo dõi kênh lướt TikTok thấy 4-5 video cùng 1 khung cảnh kho hàng và cùng 1 câu mời "vào live nhận quà" sẽ chủ động lướt qua cực nhanh, làm tụt tỷ lệ giữ chân (Retention Time) dưới 3 giây.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <span className="font-semibold text-slate-900 block mb-1">3. Khuyến nghị tần suất tối ưu</span>
              <p className="text-slate-600 leading-relaxed">
                Chỉ nên đăng <strong>5 – 7 video/ngày</strong> vào ngày thường và <strong>10 – 12 video/ngày</strong> vào ngày Mega Sale (9.9, 10.10). Chia đều ra 3 ca live (Sáng, Trưa, Tối), mỗi ca tối đa 2 video mồi cách nhau 45 phút.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: View Tiers Breakdown */}
      {activeChartTab === 'tiers' && (
        <div className="mt-4 space-y-5">
          <p className="text-xs text-slate-600">
            Phân bổ 903 video theo các phân tầng lượt xem cho thấy cấu trúc kênh TikTok Shop điển hình: phần lớn video đóng vai trò làm công cụ kéo mắt xem live thay vì lên xu hướng đại trà.
          </p>

          <div className="space-y-3">
            {/* Tier 1: Under 1k */}
            <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-900">
                  Phân tầng 1: Dưới 1.000 views (~76% sản lượng)
                </span>
                <span className="font-mono text-slate-500 font-semibold">686 video</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-1.5">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '76%' }} />
              </div>
              <p className="text-[11px] text-slate-500">
                Chủ yếu là các clip cắt ngắn 5-15s quay tại bàn livestream hô deal hoặc video mồi live vào ban đêm. Không tạo được viral nhưng duy trì lượng mắt xem đều đặn cho giỏ hàng TikTok Shop.
              </p>
            </div>

            {/* Tier 2: 1k - 5k */}
            <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-900">
                  Phân tầng 2: 1.000 – 5.000 views (~16% sản lượng)
                </span>
                <span className="font-mono text-slate-700 font-semibold">145 video</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-1.5">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '16%' }} />
              </div>
              <p className="text-[11px] text-slate-500">
                Các video giới thiệu công năng combo (giấy rút đáy treo tường, can nước giặt 5in1) có kịch bản mở đầu rõ ràng hoặc vào các ngày sale lương về.
              </p>
            </div>

            {/* Tier 3: 5k - 20k */}
            <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-900">
                  Phân tầng 3: 5.000 – 20.000 views (~5.5% sản lượng)
                </span>
                <span className="font-mono text-indigo-700 font-semibold">50 video</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-1.5">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '5.5%' }} />
              </div>
              <p className="text-[11px] text-slate-500">
                Video quà tặng hấp dẫn (tặng bình nước 3.5L, tặng gấu Capybara, tặng bánh Trung Thu set 2 cái) hoặc video thử thách ngoài đường phố Bờ Hồ.
              </p>
            </div>

            {/* Tier 4: 20k - 100k */}
            <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-900">
                  Phân tầng 4: 20.000 – 100.000 views (~1.8% sản lượng)
                </span>
                <span className="font-mono text-amber-700 font-semibold">16 video</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-1.5">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '1.8%' }} />
              </div>
              <p className="text-[11px] text-slate-500">
                Các video bắt trend sự kiện bóng đá Việt Nam (#457 đạt 46.1k views), xả kho bánh Kinh Đô (#288 đạt 39k views), Mua 1 tặng 1 Capy (#355 đạt 57.7k views).
              </p>
            </div>

            {/* Tier 5: Viral Outliers > 100k */}
            <div className="border border-rose-200 bg-rose-50/20 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-rose-700 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-rose-600" />
                  Phân tầng 5: Điểm nổ Viral &gt; 100.000 views (Top 0.4%)
                </span>
                <span className="font-mono text-rose-700 font-bold">4 video đột phá</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-1.5">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '0.4%' }} />
              </div>
              <p className="text-[11px] text-rose-800 font-medium">
                Video #724 (1.000.000 views), Video #552 (401.800 views), Video #790 (259.900 views), Video #206 (53.2k views). Đóng góp hơn 50% tổng lượt tương tác của cả kênh.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 8.8 vs 9.9 Campaign Head-to-Head Comparison */}
      {activeChartTab === 'campaign_88_vs_99' && (
        <div className="mt-4">
          <CampaignComparison88vs99 />
        </div>
      )}
    </div>
  );
};
