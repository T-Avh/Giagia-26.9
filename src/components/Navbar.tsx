import React from 'react';
import { BarChart3, TrendingUp, Sparkles, Layers, Sliders, Download, Calendar, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: 'table' | 'charts' | 'compare8899' | 'viral' | 'pillars' | 'simulator';
  setActiveTab: (tab: 'table' | 'charts' | 'compare8899' | 'viral' | 'pillars' | 'simulator') => void;
  onExportCSV: () => void;
  totalVideos: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onExportCSV,
  totalVideos,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark / brand zone */}
          <div className="flex items-center gap-3">
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('table');
              }}
              className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span>Gia Gia TikTok Intelligence</span>
              <span className="text-xs font-normal text-slate-400 font-mono">@giagia.vietnam</span>
            </a>
          </div>

          {/* Zone 2: 4-6 clean text navigation links with subtle underline/highlight */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 text-sm font-medium">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'table'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Bảng Ngày & Hiệu Quả</span>
            </button>

            <button
              onClick={() => setActiveTab('compare8899')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'compare8899'
                  ? 'bg-slate-100 text-rose-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4 text-rose-500" />
              <span>So Sánh 8.8 vs 9.9</span>
            </button>

            <button
              onClick={() => setActiveTab('charts')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'charts'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-slate-500" />
              <span>Tương Quan & Xu Hướng</span>
            </button>

            <button
              onClick={() => setActiveTab('viral')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'viral'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-slate-500" />
              <span>Video Viral</span>
            </button>

            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'pillars'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Trụ Cột & GWP</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sliders className="w-4 h-4 text-slate-500" />
              <span>Mô Phỏng Tần Suất</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs whitespace-nowrap"
              title="Xuất dữ liệu 903 video ra file CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Xuất CSV</span>
              <span className="font-mono text-slate-400 text-[11px]">({totalVideos})</span>
            </button>

            <div className="hidden xl:flex items-center text-xs text-slate-500 border-l border-slate-200 pl-3 py-1">
              <span>93 ngày theo dõi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="md:hidden flex overflow-x-auto py-2 px-3 border-t border-slate-100 gap-1.5 bg-slate-50/80">
        <button
          onClick={() => setActiveTab('compare8899')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'compare8899' ? 'bg-white text-rose-700 shadow-2xs font-bold' : 'text-slate-700'
          }`}
        >
          So Sánh 8.8 vs 9.9
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'table' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
          }`}
        >
          Bảng Dữ Liệu
        </button>
        <button
          onClick={() => setActiveTab('charts')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'charts' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
          }`}
        >
          Biểu Đồ Xu Hướng
        </button>
        <button
          onClick={() => setActiveTab('viral')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'viral' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
          }`}
        >
          Video Viral
        </button>
        <button
          onClick={() => setActiveTab('pillars')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'pillars' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
          }`}
        >
          Trụ Cột & GWP
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'simulator' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
          }`}
        >
          Mô Phỏng Tần Suất
        </button>
      </div>
    </header>
  );
};

