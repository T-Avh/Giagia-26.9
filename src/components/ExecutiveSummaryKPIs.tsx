import React from 'react';
import { CHANNEL_OVERVIEW } from '../data/tiktokData';
import { Eye, Video, Flame, TrendingUp, Users, PackageCheck } from 'lucide-react';

export const ExecutiveSummaryKPIs: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* Metric 1: Total Videos */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium">Tổng Video Đã Đăng</span>
          <Video className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
          {CHANNEL_OVERVIEW.totalVideos}
        </div>
        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
          <span>TB 9.7 vid/ngày</span>
          <span aria-hidden="true">·</span>
          <span>Max 36/ngày</span>
        </div>
      </div>

      {/* Metric 2: Total Views */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium">Tổng Lượt Xem (Views)</span>
          <Eye className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
          {(CHANNEL_OVERVIEW.totalViews / 1000000).toFixed(2)}M
        </div>
        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
          <span className="text-emerald-600 font-medium">+104k/ngày TB</span>
          <span aria-hidden="true">·</span>
          <span>93 ngày</span>
        </div>
      </div>

      {/* Metric 3: Top Viral Video */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium">Kỷ Lục View (Outlier)</span>
          <Flame className="w-3.5 h-3.5 text-rose-500" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-rose-600 font-mono tabular-nums">
          1.000.000
        </div>
        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
          <span className="font-semibold text-slate-700">#724</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">Em Intern chạy sales</span>
        </div>
      </div>

      {/* Metric 4: Average Engagement Rate */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium">Tỷ Lệ Tương Tác (ER)</span>
          <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
          {CHANNEL_OVERVIEW.overallER}%
        </div>
        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
          <span>Tháng 7: ~1.8%</span>
          <span aria-hidden="true">·</span>
          <span>Tháng 9: ~0.25%</span>
        </div>
      </div>

      {/* Metric 5: Live Feeder Ratio */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium">Tỷ Trọng Mồi Live</span>
          <Users className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-amber-600 font-mono tabular-nums">
          75%
        </div>
        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
          <span className="text-amber-700 font-medium">Dẫm chân phân phối</span>
          <span aria-hidden="true">·</span>
          <span>Cần giảm</span>
        </div>
      </div>

      {/* Metric 6: Top GWP Campaign */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium">Chiến Dịch Quà Đỉnh</span>
          <PackageCheck className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums truncate">
          Thùng Đá 2L
        </div>
        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
          <span className="font-semibold text-slate-700">1.24M views</span>
          <span aria-hidden="true">·</span>
          <span>Đợt hè T8</span>
        </div>
      </div>
    </div>
  );
};
