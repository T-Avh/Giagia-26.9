import React, { useState } from 'react';
import { DAILY_RECORDS, DailyRecord } from './data/tiktokData';
import { Navbar } from './components/Navbar';
import { ExecutiveSummaryKPIs } from './components/ExecutiveSummaryKPIs';
import { DailyPerformanceTable } from './components/DailyPerformanceTable';
import { CadenceCorrelationCharts } from './components/CadenceCorrelationCharts';
import { CampaignComparison88vs99 } from './components/CampaignComparison88vs99';
import { ViralCaseStudies } from './components/ViralCaseStudies';
import { ContentPillarsAndGWP } from './components/ContentPillarsAndGWP';
import { CadenceStrategySimulator } from './components/CadenceStrategySimulator';
import { DayDetailModal } from './components/DayDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'table' | 'charts' | 'compare8899' | 'viral' | 'pillars' | 'simulator'>('compare8899');
  const [selectedDay, setSelectedDay] = useState<DailyRecord | null>(null);

  // CSV Export utility with Vietnamese UTF-8 BOM
  const handleExportCSV = () => {
    const headers = [
      'Ngày',
      'Thứ',
      'Số Video Đăng',
      'Tổng Views',
      'Views TB / Clip',
      'Tổng Tương Tác',
      'Likes',
      'Comments',
      'Shares',
      'Saves',
      'ER (%)',
      'Chiến Dịch / Quà Tặng',
      'Ghi Chú Nổi Bật',
    ];

    const rows = DAILY_RECORDS.map((r) => [
      `"${r.displayDate}/2026"`,
      `"${r.dayOfWeek}"`,
      r.videoCount,
      r.totalViews,
      r.avgViews,
      r.totalInteractions,
      r.likes,
      r.comments,
      r.shares,
      r.saves,
      `"${r.erPercent}%"`,
      `"${r.campaignTag.replace(/"/g, '""')}"`,
      `"${r.highlightNotes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `GiaGia_TikTok_Cadence_Report_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportCSV={handleExportCSV}
        totalVideos={903}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Editorial Subtitle & Context Banner (Quiet, no pills) */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Báo Cáo Hiệu Suất Kênh TikTok Shop</span>
              <span aria-hidden="true">·</span>
              <span>Giai đoạn 25/06/2026 – 26/09/2026 (93 ngày)</span>
              <span aria-hidden="true">·</span>
              <span>Mẫu phân tích: 903 video</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Phân Tích Tần Suất Đăng Video, Tương Tác & Chiến Lược Quà Tặng Gia Gia
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Thương hiệu: <strong className="text-slate-800">Gia Gia & Mino Tissue</strong>
          </div>
        </div>

        {/* Executive Summary Metrics Bar */}
        <ExecutiveSummaryKPIs />

        {/* Tab: 8.8 vs 9.9 Mega Sale Head-to-Head Comparison */}
        {activeTab === 'compare8899' && <CampaignComparison88vs99 />}

        {/* Tab 1: Daily Performance Ledger */}
        {activeTab === 'table' && (
          <DailyPerformanceTable
            data={DAILY_RECORDS}
            onSelectDay={(day) => setSelectedDay(day)}
          />
        )}

        {/* Tab 2: Cadence & Correlation Charts */}
        {activeTab === 'charts' && <CadenceCorrelationCharts />}

        {/* Tab 3: Viral Breakouts & Case Studies */}
        {activeTab === 'viral' && <ViralCaseStudies />}

        {/* Tab 4: Content Pillars & GWP Matrix */}
        {activeTab === 'pillars' && <ContentPillarsAndGWP />}

        {/* Tab 5: Cadence Simulator & Strategy */}
        {activeTab === 'simulator' && <CadenceStrategySimulator />}
      </main>

      {/* Day Inspection Modal */}
      <DayDetailModal day={selectedDay} onClose={() => setSelectedDay(null)} />

      {/* Clean Footer (No ornamental engine tickers, quiet copyright) */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Gia Gia TikTok Analytics</span>
            <span aria-hidden="true">·</span>
            <span>Bản quyền dữ liệu vận hành thương mại điện tử 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>903 video được phân tích</span>
            <span aria-hidden="true">·</span>
            <span>Nhà máy Phú Thọ 10.000m²</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
