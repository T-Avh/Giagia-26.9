import React, { useState } from 'react';
import { CONTENT_PILLARS, GWP_CAMPAIGNS, ContentPillar } from '../data/tiktokData';
import { Layers, Gift, CheckCircle, AlertTriangle, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';

export const ContentPillarsAndGWP: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<ContentPillar>(CONTENT_PILLARS[0]);

  return (
    <div className="space-y-6 mb-6">
      {/* Part 1: Content Pillars Overview */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Cơ Cấu 4 Trụ Cột Nội Dung (Content Pillars Allocation)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Đánh giá vai trò, tỷ trọng sản lượng, hiệu suất tương tác và đề xuất điều chỉnh cơ cấu nội dung
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">Mô hình hiện tại: 75 / 10 / 8 / 7</span>
        </div>

        {/* Visual Share Proportion Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>Tỷ trọng sản lượng video phân bổ theo từng trụ cột:</span>
            <span className="font-mono text-slate-700 font-semibold">100% (903 video)</span>
          </div>

          <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 p-0.5 border border-slate-200">
            <div
              className="bg-amber-500 h-full rounded-l-full cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '75%' }}
              title="Mồi Phễu Live: 75%"
              onClick={() => setSelectedPillar(CONTENT_PILLARS[0])}
            />
            <div
              className="bg-rose-500 h-full cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '10%' }}
              title="Intern & Văn Phòng: 10%"
              onClick={() => setSelectedPillar(CONTENT_PILLARS[1])}
            />
            <div
              className="bg-blue-500 h-full cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '8%' }}
              title="Thử Thách Thực Tế: 8%"
              onClick={() => setSelectedPillar(CONTENT_PILLARS[2])}
            />
            <div
              className="bg-emerald-500 h-full rounded-r-full cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '7%' }}
              title="Bắt Trend & Lễ Hội: 7%"
              onClick={() => setSelectedPillar(CONTENT_PILLARS[3])}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
            {CONTENT_PILLARS.map((pillar) => {
              const isSelected = selectedPillar.id === pillar.id;
              let dotColor = 'bg-amber-500';
              if (pillar.id === 'workplace_humor') dotColor = 'bg-rose-500';
              if (pillar.id === 'street_challenge') dotColor = 'bg-blue-500';
              if (pillar.id === 'realtime_trends') dotColor = 'bg-emerald-500';

              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`} />
                    <span className="font-semibold text-slate-900 truncate">{pillar.name.split('(')[0]}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono font-bold text-slate-800">{pillar.sharePercent}% sản lượng</span>
                    <span className="font-mono">ER: {pillar.avgER}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Pillar Diagnostic Card */}
        <div className="mt-5 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-mono text-slate-400">Trụ Cột Đang Xem:</span>
              <h4 className="text-base font-bold text-slate-900">{selectedPillar.name}</h4>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700">
                Views TB: <strong>{selectedPillar.avgViews}</strong>
              </span>
              <span className="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700">
                Độ dài: <strong>{selectedPillar.typicalLength}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
            <div>
              <h5 className="font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ưu Điểm & Đóng Góp</span>
              </h5>
              <ul className="space-y-1.5 text-slate-600">
                {selectedPillar.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-400">·</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>Hạn Chế & Rủi Ro</span>
              </h5>
              <ul className="space-y-1.5 text-slate-600">
                {selectedPillar.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-400">·</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Strategic Recommendation */}
          <div className="mt-4 pt-3 border-t border-slate-200 text-xs flex items-start gap-2 text-slate-800">
            <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong>Đề xuất tối ưu hóa: </strong>
              <span>{selectedPillar.recommendation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: GWP (Gift With Purchase) Strategy Analysis */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Gift className="w-4 h-4 text-rose-500" />
              <span>Chiến Lược Quà Tặng Đính Kèm (GWP - Gift With Purchase)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Phân tích các đòn bẩy quà tặng tạo doanh số lớn nhất từ cuối tháng 6 đến cuối tháng 9/2026
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 4 đợt chiến dịch quà tặng lớn
          </span>
        </div>

        {/* GWP Campaigns Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-3">Tên Chiến Dịch Quà Tặng</th>
                <th className="py-2.5 px-3">Thời Gian</th>
                <th className="py-2.5 px-3">Vật Phẩm Quà Tặng (GWP)</th>
                <th className="py-2.5 px-3 text-right">Tổng Views Kéo Về</th>
                <th className="py-2.5 px-3 text-right">Peak Views Ngày</th>
                <th className="py-2.5 px-3">Mức Độ Viral</th>
                <th className="py-2.5 px-3">Video Tiêu Biểu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {GWP_CAMPAIGNS.map((camp, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {camp.name}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono">
                    {camp.period}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    <span className="font-medium text-emerald-700">{camp.giftItem}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                    {(camp.totalCampaignViews / 1000).toFixed(0)}k
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-rose-600 font-semibold tabular-nums">
                    {camp.peakDailyViews.toLocaleString('vi-VN')}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-mono text-[11px] font-semibold ${
                      camp.viralityIndex === 'Rất Cao' ? 'text-rose-600' : 'text-blue-600'
                    }`}>
                      {camp.viralityIndex}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {camp.keyVideo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Psychological Insight Box */}
        <div className="mt-5 p-4 rounded-xl border border-amber-200/80 bg-amber-50/50">
          <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Tâm Lý Học Hành Vi: "Cơn Nghiện Quà Tặng" & Cảnh Báo Khách Hàng Rời Bỏ</span>
          </h4>
          <p className="text-xs text-amber-900 leading-relaxed mb-3">
            Khách hàng trên TikTok Shop quyết định mua combo khăn giấy Gia Gia phần lớn bắt nguồn từ <strong>giá trị cảm nhận của món quà kèm theo</strong> (Thùng đá mini 2L, Bánh Kinh Đô, Gấu Capybara). Chiếc thùng đá ngoài thị trường có giá 70k - 90k, khi được tặng miễn phí cùng combo giấy 120k tạo ra tỷ số hời (Surplus Value) cực lớn.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 pt-2 border-t border-amber-200/60">
            <div className="bg-white/80 p-2.5 rounded border border-amber-200/60">
              <span className="font-semibold text-slate-900 block mb-1">Rủi ro ngắn hạn:</span>
              <span>Khi thương hiệu ngừng tặng quà lớn hoặc quà hạ giá trị, tỷ lệ chuyển đổi trên live có xu hướng tụt từ 30% đến 50%. Khách hàng không nhớ đến chất lượng bột gỗ giấy mà chỉ nhớ món quà.</span>
            </div>
            <div className="bg-white/80 p-2.5 rounded border border-amber-200/60">
              <span className="font-semibold text-slate-900 block mb-1">Giải pháp vòng lặp mua lại (Repeat Purchase):</span>
              <span>Phát triển các gói combo Refill (bịch ruột giấy thay thế) với giá rẻ hơn 20% cho khách cũ. Sử dụng video test độ thấm dầu mỡ, độ bền giấy khi lau bàn bếp để chuyển hóa khách hàng "mua vì quà" thành "khách hàng trung thành vì chất lượng".</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
