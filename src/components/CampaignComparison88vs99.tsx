import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Flame, Award, Zap, TrendingUp, BarChart3, HelpCircle } from 'lucide-react';

export const CampaignComparison88vs99: React.FC = () => {
  const [viewScope, setViewScope] = useState<'d_day' | 'three_days'>('d_day');

  // Historical data for 8.8
  const data88 = {
    dDay: {
      date: '08/08/2026',
      videoCount: 21,
      totalViews: 51696,
      avgViews: 2462,
      totalInteractions: 125,
      likes: 99,
      comments: 10,
      shares: 6,
      saves: 10,
      erPercent: 0.39,
      gwp: 'Thùng đá mini 1L - 2L & Deal 1K',
      topVideo: '#698 (~12.5k views)',
      highlight: 'Giựt deal 1K, tặng thùng đá miniice',
    },
    threeDays: {
      range: '07/08 – 09/08/2026 (Hâm nóng - D-Day - Hậu sale)',
      videoCount: 45, // 21 + 21 + 3
      totalViews: 101127, // 38307 + 51696 + 11124
      avgViews: 2247,
      totalInteractions: 292, // 126 + 125 + 41
      erPercent: 0.38,
      gwp: 'Thùng đá mini 1L - 2L',
    },
  };

  // Historical data for 9.9
  const data99 = {
    dDay: {
      date: '09/09/2026',
      videoCount: 36,
      totalViews: 141228,
      avgViews: 3923,
      totalInteractions: 231,
      likes: 185,
      comments: 18,
      shares: 11,
      saves: 17,
      erPercent: 0.65,
      gwp: 'Bánh Trung Thu Kinh Đô 0Đ & 10k Gấu Capybara',
      topVideo: '#299 (23.4k views), #289 (20.8k), #303 (20.8k)',
      highlight: 'Kỷ lục 36 video, Bánh Kinh Đô & Capy bùng nổ',
    },
    threeDays: {
      range: '08/09 – 10/09/2026 (Hâm nóng - D-Day - Hậu sale)',
      videoCount: 73, // 22 + 36 + 15
      totalViews: 274408, // 73080 + 141228 + 60100
      avgViews: 3759,
      totalInteractions: 517, // 149 + 231 + 137
      erPercent: 0.43,
      gwp: 'Bánh Trung Thu Kinh Đô 0Đ + Gấu Capybara',
    },
  };

  // Deltas calculation
  const current88 = viewScope === 'd_day' ? data88.dDay : data88.threeDays;
  const current99 = viewScope === 'd_day' ? data99.dDay : data99.threeDays;

  const avgViewsDelta = ((current99.avgViews - current88.avgViews) / current88.avgViews) * 100;
  const erDelta = ((current99.erPercent - current88.erPercent) / current88.erPercent) * 100;
  const totalViewsDelta = ((current99.totalViews - current88.totalViews) / current88.totalViews) * 100;
  const interactionsDelta = ((current99.totalInteractions - current88.totalInteractions) / current88.totalInteractions) * 100;

  // 3-day progression points for the progression curve chart
  const progressionData = [
    {
      phase: 'Hâm Nóng (Pre-sale)',
      date88: '07/08',
      views88: 38307,
      avg88: 1824,
      er88: 0.48,
      vids88: 21,
      date99: '08/09',
      views99: 73080,
      avg99: 3322,
      er99: 0.29,
      vids99: 22,
    },
    {
      phase: 'D-Day Siêu Sale',
      date88: '08/08',
      views88: 51696,
      avg88: 2462,
      er88: 0.39,
      vids88: 21,
      date99: '09/09',
      views99: 141228,
      avg99: 3923,
      er99: 0.65,
      vids99: 36,
    },
    {
      phase: 'Hậu Sale (Post-sale)',
      date88: '09/08',
      views88: 11124,
      avg88: 3708,
      er88: 0.28,
      vids88: 3,
      date99: '10/09',
      views99: 60100,
      avg99: 4007,
      er99: 0.35,
      vids99: 15,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-2xs">
      {/* Header & Scope Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-rose-500" />
              <span>Đối Đầu Mega Sale: Chiến Dịch 8.8 vs 9.9</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
              9.9 Chiến Thắng Áp Đảo
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            So sánh trực quan sự phân hóa về Lượt xem trung bình/clip và Tỷ lệ tương tác (ER) dựa trên dữ liệu 903 video
          </p>
        </div>

        {/* View Scope Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setViewScope('d_day')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewScope === 'd_day' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chính Ngày D-Day (08/08 vs 09/09)
          </button>
          <button
            onClick={() => setViewScope('three_days')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewScope === 'three_days' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chu Kỳ 3 Ngày (Pre - D-Day - Post)
          </button>
        </div>
      </div>

      {/* Two Key Metrics Hero Battle (Average Views & ER%) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        {/* Metric 1: Average Views per Video */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700 uppercase tracking-wider">
              1. Lượt Xem Trung Bình / Clip (Avg Views)
            </span>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              +{avgViewsDelta.toFixed(1)}% Tăng Trưởng
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {/* 8.8 */}
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <span className="text-[11px] font-mono text-slate-400 block">Mega Sale 8.8</span>
              <div className="text-2xl font-bold font-mono text-slate-700 mt-0.5 tabular-nums">
                {current88.avgViews.toLocaleString('vi-VN')}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">views / video</span>
            </div>

            {/* 9.9 */}
            <div className="bg-white border-2 border-rose-400 rounded-lg p-3 shadow-xs">
              <span className="text-[11px] font-mono text-rose-600 font-semibold block flex items-center justify-between">
                <span>Mega Sale 9.9</span>
                <Flame className="w-3 h-3 text-rose-500" />
              </span>
              <div className="text-2xl font-bold font-mono text-rose-600 mt-0.5 tabular-nums">
                {current99.avgViews.toLocaleString('vi-VN')}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">
                views / video (<strong>+{(current99.avgViews - current88.avgViews).toLocaleString('vi-VN')}</strong>)
              </span>
            </div>
          </div>

          {/* Visual comparative bar */}
          <div className="mt-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Tỷ lệ phân phối views TB:</span>
              <span>8.8 (38.5%) vs 9.9 (61.5%)</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200">
              <div
                className="bg-slate-400 h-full transition-all"
                style={{ width: `${(current88.avgViews / (current88.avgViews + current99.avgViews)) * 100}%` }}
                title="8.8"
              />
              <div
                className="bg-rose-500 h-full transition-all"
                style={{ width: `${(current99.avgViews / (current88.avgViews + current99.avgViews)) * 100}%` }}
                title="9.9"
              />
            </div>
          </div>
        </div>

        {/* Metric 2: Engagement Rate (ER%) */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700 uppercase tracking-wider">
              2. Tỷ Lệ Tương Tác (ER %)
            </span>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              +{erDelta.toFixed(1)}% Tăng Trưởng
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {/* 8.8 */}
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <span className="text-[11px] font-mono text-slate-400 block">Mega Sale 8.8</span>
              <div className="text-2xl font-bold font-mono text-slate-700 mt-0.5 tabular-nums">
                {current88.erPercent.toFixed(2)}%
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Like + Cmt + Share / View</span>
            </div>

            {/* 9.9 */}
            <div className="bg-white border-2 border-emerald-500 rounded-lg p-3 shadow-xs">
              <span className="text-[11px] font-mono text-emerald-600 font-semibold block flex items-center justify-between">
                <span>Mega Sale 9.9</span>
                <TrendingUp className="w-3 h-3 text-emerald-500" />
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-600 mt-0.5 tabular-nums">
                {current99.erPercent.toFixed(2)}%
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">
                Cao hơn <strong>+{(current99.erPercent - current88.erPercent).toFixed(2)}%</strong>
              </span>
            </div>
          </div>

          {/* Visual comparative bar */}
          <div className="mt-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Tỷ lệ chia sẻ & tương tác:</span>
              <span>8.8 ({current88.erPercent}%) vs 9.9 ({current99.erPercent}%)</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200">
              <div
                className="bg-slate-400 h-full transition-all"
                style={{ width: `${(current88.erPercent / (current88.erPercent + current99.erPercent)) * 100}%` }}
                title="8.8"
              />
              <div
                className="bg-emerald-500 h-full transition-all"
                style={{ width: `${(current99.erPercent / (current88.erPercent + current99.erPercent)) * 100}%` }}
                title="9.9"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Metric Comparison Table */}
      <div className="overflow-x-auto my-5">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <th className="py-2.5 px-3">Chỉ Số Đánh Giá</th>
              <th className="py-2.5 px-3 text-right">Chiến Dịch 8.8</th>
              <th className="py-2.5 px-3 text-right">Chiến Dịch 9.9</th>
              <th className="py-2.5 px-3 text-right">Mức Độ Chênh Lệch (Delta)</th>
              <th className="py-2.5 px-3">Đánh Giá Hiệu Quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {/* Row 1: Avg Views */}
            <tr className="hover:bg-slate-50">
              <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">Lượt xem trung bình / clip</td>
              <td className="py-2.5 px-3 text-right text-slate-700">{current88.avgViews.toLocaleString('vi-VN')} views</td>
              <td className="py-2.5 px-3 text-right text-rose-600 font-bold">{current99.avgViews.toLocaleString('vi-VN')} views</td>
              <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">+{avgViewsDelta.toFixed(1)}%</td>
              <td className="py-2.5 px-3 text-slate-600 font-sans">9.9 đột phá nhờ có 3 video vượt 20k views</td>
            </tr>

            {/* Row 2: ER */}
            <tr className="hover:bg-slate-50">
              <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">Tỷ lệ tương tác (ER %)</td>
              <td className="py-2.5 px-3 text-right text-slate-700">{current88.erPercent.toFixed(2)}%</td>
              <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">{current99.erPercent.toFixed(2)}%</td>
              <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">+{erDelta.toFixed(1)}%</td>
              <td className="py-2.5 px-3 text-slate-600 font-sans">Khán giả bình luận hỏi nhận bánh Trung Thu rất nhiều</td>
            </tr>

            {/* Row 3: Total Views */}
            <tr className="hover:bg-slate-50">
              <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">Tổng lượt xem kênh (Total Views)</td>
              <td className="py-2.5 px-3 text-right text-slate-700">{current88.totalViews.toLocaleString('vi-VN')}</td>
              <td className="py-2.5 px-3 text-right text-slate-900 font-bold">{current99.totalViews.toLocaleString('vi-VN')}</td>
              <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">+{totalViewsDelta.toFixed(1)}%</td>
              <td className="py-2.5 px-3 text-slate-600 font-sans">Gấp gần 2.7 lần quy mô lượt xem</td>
            </tr>

            {/* Row 4: Video Output */}
            <tr className="hover:bg-slate-50">
              <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">Số video đã đăng tải (Cadence)</td>
              <td className="py-2.5 px-3 text-right text-slate-700">{current88.videoCount} video</td>
              <td className="py-2.5 px-3 text-right text-amber-600 font-bold">{current99.videoCount} video</td>
              <td className="py-2.5 px-3 text-right text-slate-800">+{current99.videoCount - current88.videoCount} video</td>
              <td className="py-2.5 px-3 text-slate-600 font-sans">9.9 đẩy tần suất cực đại 36 clip trong 24h</td>
            </tr>

            {/* Row 5: Total Interactions */}
            <tr className="hover:bg-slate-50">
              <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">Tổng tương tác (Likes+Cmt+Share+Save)</td>
              <td className="py-2.5 px-3 text-right text-slate-700">{current88.totalInteractions.toLocaleString('vi-VN')}</td>
              <td className="py-2.5 px-3 text-right text-slate-900 font-bold">{current99.totalInteractions.toLocaleString('vi-VN')}</td>
              <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">+{interactionsDelta.toFixed(1)}%</td>
              <td className="py-2.5 px-3 text-slate-600 font-sans">Lượng Save và Share tăng gần gấp đôi</td>
            </tr>

            {/* Row 6: Primary GWP Offer */}
            <tr className="hover:bg-slate-50">
              <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">Quà tặng đính kèm chủ lực (GWP)</td>
              <td className="py-2.5 px-3 text-right text-slate-700 font-sans">{viewScope === 'd_day' ? data88.dDay.gwp : data88.threeDays.gwp}</td>
              <td className="py-2.5 px-3 text-right text-emerald-700 font-bold font-sans">{viewScope === 'd_day' ? data99.dDay.gwp : data99.threeDays.gwp}</td>
              <td className="py-2.5 px-3 text-right text-slate-400 font-sans">—</td>
              <td className="py-2.5 px-3 text-slate-600 font-sans">Thương hiệu Kinh Đô tạo độ tin tưởng áp đảo</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3-Stage Progression SVG Chart: Pre-sale -> D-Day -> Post-sale */}
      <div className="border border-slate-200 rounded-xl p-4 my-5 bg-white">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
          <span>Hành Trình Diễn Biến 3 Giai Đoạn (Hâm Nóng → D-Day → Hậu Sale)</span>
          <span className="font-mono text-[11px] text-slate-400 font-normal">Đơn vị: Views TB và ER</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {progressionData.map((stage, idx) => {
            const isDDay = idx === 1;
            return (
              <div
                key={stage.phase}
                className={`border rounded-lg p-3 ${
                  isDDay ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                    {isDDay && <Flame className="w-3.5 h-3.5 text-rose-500" />}
                    {stage.phase}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Giai đoạn {idx + 1}</span>
                </div>

                <div className="space-y-2 font-mono">
                  {/* 8.8 Row */}
                  <div className="p-2 bg-white rounded border border-slate-200/80">
                    <div className="flex justify-between text-slate-500 text-[11px] mb-0.5">
                      <span>Đợt 8.8 ({stage.date88})</span>
                      <span>{stage.vids88} vids</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-800 text-sm">{stage.avg88.toLocaleString('vi-VN')} views/clip</span>
                      <span className="text-slate-600 text-xs">ER: {stage.er88}%</span>
                    </div>
                  </div>

                  {/* 9.9 Row */}
                  <div className="p-2 bg-white rounded border border-rose-200">
                    <div className="flex justify-between text-rose-600 text-[11px] mb-0.5 font-medium">
                      <span>Đợt 9.9 ({stage.date99})</span>
                      <span className="font-bold">{stage.vids99} vids</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-rose-600 text-sm">{stage.avg99.toLocaleString('vi-VN')} views/clip</span>
                      <span className="text-emerald-600 font-bold text-xs">ER: {stage.er99}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-slate-500 font-sans">
                  {idx === 0 && 'Giai đoạn hâm nóng 9.9 đạt 73k views nhờ tung teaser Bánh Kinh Đô.'}
                  {idx === 1 && 'D-Day 9.9 bùng nổ 141k views và ER 0.65%, vượt xa 51k views của 8.8.'}
                  {idx === 2 && 'Hậu sale 9.9 vẫn giữ mức 4.007 views/clip xả kho bánh còn lại.'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Core Analytical Reasons Why 9.9 Outperformed 8.8 */}
      <div className="border-t border-slate-200 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Tại Sao 9.9 Lại Thắng Lớn Cả Về Views Trung Bình (+59.3%) Lẫn Tương Tác (+66.7%)?</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Reason 1 */}
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
            <span className="font-bold text-slate-900 block mb-1.5 flex items-center gap-1 text-slate-800">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Đòn Bẩy Đồng Thương Hiệu (Kinh Đô Co-branding)</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              Chiến dịch 8.8 dùng Thùng đá mini — dù viral vào tháng 7 nhưng đến 8.8 đã có phần hạ nhiệt. Trong khi đó, chiến dịch 9.9 đánh trúng <strong>Bánh Trung Thu Kinh Đô 0Đ</strong>. Thương hiệu quốc dân Kinh Đô đóng vai trò là "chứng chỉ niềm tin", khách hàng tin tưởng tuyệt đối vào giá trị quà tặng và chủ động tag bạn bè vào bình luận để săn quà, đẩy ER lên <strong>0.65%</strong>.
            </p>
          </div>

          {/* Reason 2 */}
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
            <span className="font-bold text-slate-900 block mb-1.5 flex items-center gap-1 text-slate-800">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Sự Xuất Hiện Của Các Video Đột Phá (Outliers)</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              Vào ngày 8.8, video cao nhất chỉ đạt ~12.5k views, phần lớn video quanh mức 1k-2.5k. Ngược lại, ngày 9.9 dù đăng tới 36 video, kênh đã tạo ra <strong>3 video đột phá cùng đạt trên 20.000 views</strong> (#299 23.4k views, #289 20.8k, #303 20.8k). Ba video này gánh toàn bộ lượt xem trung bình của cả ngày lên <strong>3.923 views/clip</strong>.
            </p>
          </div>

          {/* Reason 3 */}
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
            <span className="font-bold text-slate-900 block mb-1.5 flex items-center gap-1 text-slate-800">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Hiệu Ứng Kèm Trend Gấu Capybara</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              Ngày 07/09 ngay trước thềm 9.9, kênh công bố <strong>"Cập bến 10.000 gấu bông Capybara"</strong>. Cơn sốt Capybara đang thống trị TikTok Việt Nam kết hợp cùng Bánh Trung Thu đã tạo nên bộ đôi quà tặng "Song Kiếm Hợp Bích" kích thích người xem không chỉ bấm mua mà còn nhấn Lưu (Save: 17) và Chia sẻ (Share: 11) kỷ lục.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
