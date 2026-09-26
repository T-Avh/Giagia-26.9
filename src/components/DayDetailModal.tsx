import React from 'react';
import { DailyRecord } from '../data/tiktokData';
import { X, Eye, ThumbsUp, MessageSquare, Share2, Bookmark, Flame, Calendar, ArrowUpRight } from 'lucide-react';

interface DayDetailModalProps {
  day: DailyRecord | null;
  onClose: () => void;
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({ day, onClose }) => {
  if (!day) return null;

  // Compute cannibalization status
  let cadenceAssessment = 'Tần suất tối ưu, thuật toán phân phối đều cho từng video.';
  let cadenceBadgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let cadenceStatus = 'Tần suất Cân Bằng (1 - 8 video)';

  if (day.videoCount > 20) {
    cadenceAssessment = `Cảnh báo dẫm chân phân phối (Cannibalization)! Đăng ${day.videoCount} video/ngày khiến các video cách nhau dưới 30 phút, thuật toán TikTok Shop không kịp quét luồng người xem dẫn đến nhiều video bị kẹt ở mức 20-50 views.`;
    cadenceBadgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
    cadenceStatus = 'Quá Tải / Dẫm Chân (> 20 video)';
  } else if (day.videoCount >= 10) {
    cadenceAssessment = `Tần suất công nghiệp phục vụ giờ livestream. Lượng người đổ vào Live tốt, nhưng điểm tương tác trung bình (ER: ${day.erPercent}%) bị giảm sâu.`;
    cadenceBadgeColor = 'text-amber-700 bg-amber-50 border-amber-200';
    cadenceStatus = 'Mức Độ Cao (10 - 20 video)';
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl shadow-xl max-w-2xl w-full p-6 relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-400" />
                Ngày {day.displayDate}/2026 ({day.dayOfWeek})
              </span>
              {day.isSpikeDay && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  <Flame className="w-3 h-3" /> Điểm Nổ Lượt Xem
                </span>
              )}
              {day.isMegaSale && (
                <span className="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  Mega Sale
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Chiến dịch: <span className="font-semibold text-slate-700">{day.campaignTag}</span> · Ghi chú: {day.highlightNotes}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
            <span className="text-[11px] text-slate-500 block">Số Video Đăng</span>
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">{day.videoCount}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">clip trong 24h</span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
            <span className="text-[11px] text-slate-500 block">Tổng Lượt Xem</span>
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {day.totalViews.toLocaleString('vi-VN')}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">views toàn kênh</span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
            <span className="text-[11px] text-slate-500 block">Lượt Xem TB / Video</span>
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {day.avgViews.toLocaleString('vi-VN')}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">views/clip</span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
            <span className="text-[11px] text-slate-500 block">Tỷ Lệ Tương Tác (ER)</span>
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">{day.erPercent}%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Like+Cmt+Share / View</span>
          </div>
        </div>

        {/* Detailed Engagement Breakdown */}
        <div className="border border-slate-200 rounded-lg p-4 mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">
            Chi Tiết Tương Tác Xã Hội
          </h4>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-slate-50 rounded">
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-1">
                <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />
                <span>Likes</span>
              </div>
              <span className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                {day.likes.toLocaleString('vi-VN')}
              </span>
            </div>

            <div className="p-2 bg-slate-50 rounded">
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                <span>Bình Luận</span>
              </div>
              <span className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                {day.comments.toLocaleString('vi-VN')}
              </span>
            </div>

            <div className="p-2 bg-slate-50 rounded">
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-1">
                <Share2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Chia Sẻ</span>
              </div>
              <span className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                {day.shares.toLocaleString('vi-VN')}
              </span>
            </div>

            <div className="p-2 bg-slate-50 rounded">
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-1">
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>Lưu Video</span>
              </div>
              <span className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                {day.saves.toLocaleString('vi-VN')}
              </span>
            </div>
          </div>
        </div>

        {/* Algorithmic Cadence Assessment */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700">Đánh Giá Tần Suất & Thuật Toán</span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${cadenceBadgeColor}`}>
              {cadenceStatus}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {cadenceAssessment}
          </p>

          {day.topVideoRef && (
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5 text-rose-500" />
                Video Nổi Bật Nhất Ngày: <strong className="font-mono">{day.topVideoRef}</strong>
              </span>
              <span className="font-mono font-bold text-rose-600">
                {day.topVideoViews ? day.topVideoViews.toLocaleString('vi-VN') : ''} views
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Đóng Cửa Sổ
          </button>
        </div>
      </div>
    </div>
  );
};
