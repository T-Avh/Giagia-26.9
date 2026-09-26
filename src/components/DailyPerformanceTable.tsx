import React, { useState, useMemo } from 'react';
import { DailyRecord } from '../data/tiktokData';
import { Search, ArrowUpDown, ChevronUp, ChevronDown, Flame, Filter, Calendar, ExternalLink } from 'lucide-react';

interface DailyPerformanceTableProps {
  data: DailyRecord[];
  onSelectDay: (day: DailyRecord) => void;
}

type SortField = 'date' | 'videoCount' | 'totalViews' | 'avgViews' | 'totalInteractions' | 'erPercent';
type SortDirection = 'asc' | 'desc';

export const DailyPerformanceTable: React.FC<DailyPerformanceTableProps> = ({ data, onSelectDay }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<'all' | 'T9' | 'T8' | 'T7_T6'>('all');
  const [selectedCadenceTier, setSelectedCadenceTier] = useState<'all' | 'high' | 'medium' | 'low' | 'spikes'>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // Sorting handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search term matching
      const matchesSearch =
        searchTerm === '' ||
        item.displayDate.includes(searchTerm) ||
        item.campaignTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.highlightNotes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.topVideoRef && item.topVideoRef.toLowerCase().includes(searchTerm.toLowerCase()));

      // Month filtering
      let matchesMonth = true;
      if (selectedMonth === 'T9') matchesMonth = item.month === 'T9';
      else if (selectedMonth === 'T8') matchesMonth = item.month === 'T8';
      else if (selectedMonth === 'T7_T6') matchesMonth = item.month === 'T7' || item.month === 'T6';

      // Cadence tier filtering
      let matchesCadence = true;
      if (selectedCadenceTier === 'high') matchesCadence = item.videoCount >= 20;
      else if (selectedCadenceTier === 'medium') matchesCadence = item.videoCount >= 10 && item.videoCount < 20;
      else if (selectedCadenceTier === 'low') matchesCadence = item.videoCount < 10;
      else if (selectedCadenceTier === 'spikes') matchesCadence = !!item.isSpikeDay;

      return matchesSearch && matchesMonth && matchesCadence;
    });
  }, [data, searchTerm, selectedMonth, selectedCadenceTier]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aVal = a[sortField] ?? 0;
      let bVal = b[sortField] ?? 0;

      if (sortField === 'date') {
        return sortDirection === 'asc'
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = pageSize === -1 ? 1 : Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    if (pageSize === -1) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Aggregate stats for filtered data
  const aggregates = useMemo(() => {
    const totalVids = filteredData.reduce((acc, curr) => acc + curr.videoCount, 0);
    const totalViews = filteredData.reduce((acc, curr) => acc + curr.totalViews, 0);
    const totalInteractions = filteredData.reduce((acc, curr) => acc + curr.totalInteractions, 0);
    const avgViewsOverall = totalVids > 0 ? Math.round(totalViews / totalVids) : 0;
    const avgEROverall = filteredData.length > 0 ? (filteredData.reduce((acc, curr) => acc + curr.erPercent, 0) / filteredData.length).toFixed(2) : '0';

    return { totalVids, totalViews, totalInteractions, avgViewsOverall, avgEROverall };
  }, [filteredData]);

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-300 group-hover:text-slate-500 inline ml-1" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-slate-900 inline ml-1" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-slate-900 inline ml-1" />
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
      {/* Header & Controls Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Bảng Thống Kê Từng Ngày Đăng Video & Hiệu Suất</span>
              <span className="text-xs font-normal font-mono text-slate-400">({filteredData.length} ngày hiển thị)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Phân tích chi tiết tần suất đăng (output cadence), tổng views, views trung bình mỗi clip và tỷ lệ tương tác (ER)
            </p>
          </div>

          {/* Quick Search */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm ngày, chiến dịch, quà tặng..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-400 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
          {/* Month Segmented Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => { setSelectedMonth('all'); setCurrentPage(1); }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedMonth === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất Cả (T6 - T9)
            </button>
            <button
              onClick={() => { setSelectedMonth('T9'); setCurrentPage(1); }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedMonth === 'T9' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tháng 9 (9.9 & Capy)
            </button>
            <button
              onClick={() => { setSelectedMonth('T8'); setCurrentPage(1); }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedMonth === 'T8' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tháng 8 (Thùng đá & 1M View)
            </button>
            <button
              onClick={() => { setSelectedMonth('T7_T6'); setCurrentPage(1); }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedMonth === 'T7_T6' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tháng 7 & 6 (Khởi chạy)
            </button>
          </div>

          {/* Cadence Tier Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] text-slate-400 font-medium">Lọc tần suất:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => { setSelectedCadenceTier('all'); setCurrentPage(1); }}
                className={`px-2 py-0.5 text-xs rounded-md ${
                  selectedCadenceTier === 'all' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Mọi mức
              </button>
              <button
                onClick={() => { setSelectedCadenceTier('high'); setCurrentPage(1); }}
                className={`px-2 py-0.5 text-xs rounded-md ${
                  selectedCadenceTier === 'high' ? 'bg-white font-medium text-rose-700 shadow-xs' : 'text-slate-600'
                }`}
                title="≥ 20 video/ngày (Dễ dẫm chân thuật toán)"
              >
                ≥ 20 vid/ngày
              </button>
              <button
                onClick={() => { setSelectedCadenceTier('medium'); setCurrentPage(1); }}
                className={`px-2 py-0.5 text-xs rounded-md ${
                  selectedCadenceTier === 'medium' ? 'bg-white font-medium text-amber-700 shadow-xs' : 'text-slate-600'
                }`}
                title="10 - 19 video/ngày"
              >
                10-19 vid/ngày
              </button>
              <button
                onClick={() => { setSelectedCadenceTier('low'); setCurrentPage(1); }}
                className={`px-2 py-0.5 text-xs rounded-md ${
                  selectedCadenceTier === 'low' ? 'bg-white font-medium text-emerald-700 shadow-xs' : 'text-slate-600'
                }`}
                title="< 10 video/ngày (ER cao)"
              >
                &lt; 10 vid/ngày
              </button>
              <button
                onClick={() => { setSelectedCadenceTier('spikes'); setCurrentPage(1); }}
                className={`px-2 py-0.5 text-xs rounded-md flex items-center gap-1 ${
                  selectedCadenceTier === 'spikes' ? 'bg-white font-medium text-rose-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                <Flame className="w-3 h-3 text-rose-500" />
                <span>Ngày Nổ Views</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Bar for Current Selection */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 font-mono">
        <div className="flex items-center gap-4">
          <span>Tổng video: <strong className="text-slate-900">{aggregates.totalVids}</strong></span>
          <span aria-hidden="true" className="text-slate-300">|</span>
          <span>Tổng views: <strong className="text-slate-900">{aggregates.totalViews.toLocaleString('vi-VN')}</strong></span>
          <span aria-hidden="true" className="text-slate-300">|</span>
          <span>Views TB/video: <strong className="text-slate-900">{aggregates.avgViewsOverall.toLocaleString('vi-VN')}</strong></span>
          <span aria-hidden="true" className="text-slate-300">|</span>
          <span>ER TB: <strong className="text-slate-900">{aggregates.avgEROverall}%</strong></span>
        </div>
        <div className="text-[11px] text-slate-400 font-sans">
          Bấm vào hàng để xem chẩn đoán thuật toán của ngày đó
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-600 font-semibold select-none">
              <th
                onClick={() => handleSort('date')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-100 transition-colors w-28 whitespace-nowrap"
              >
                <span>Ngày Đăng</span>
                {renderSortIndicator('date')}
              </th>
              <th
                onClick={() => handleSort('videoCount')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right w-24 whitespace-nowrap"
              >
                <span>Số Video</span>
                {renderSortIndicator('videoCount')}
              </th>
              <th
                onClick={() => handleSort('totalViews')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right w-28 whitespace-nowrap"
              >
                <span>Tổng Views</span>
                {renderSortIndicator('totalViews')}
              </th>
              <th
                onClick={() => handleSort('avgViews')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right w-28 whitespace-nowrap"
              >
                <span>Views TB/clip</span>
                {renderSortIndicator('avgViews')}
              </th>
              <th
                onClick={() => handleSort('totalInteractions')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right w-24 whitespace-nowrap"
              >
                <span>Tương Tác</span>
                {renderSortIndicator('totalInteractions')}
              </th>
              <th
                onClick={() => handleSort('erPercent')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right w-20 whitespace-nowrap"
              >
                <span>ER (%)</span>
                {renderSortIndicator('erPercent')}
              </th>
              <th className="py-3 px-3.5 whitespace-nowrap">Chiến Dịch & Điểm Nhấn Nội Dung</th>
              <th className="py-3 px-3 text-center w-14">Chi Tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  Không tìm thấy ngày đăng nào phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                // Color formatting for videoCount cadence
                let cadenceStyle = 'text-slate-800';
                if (row.videoCount >= 25) cadenceStyle = 'text-rose-600 font-bold';
                else if (row.videoCount >= 15) cadenceStyle = 'text-amber-600 font-semibold';
                else if (row.videoCount <= 5) cadenceStyle = 'text-emerald-600';

                // ER styling
                let erStyle = 'text-slate-700';
                if (row.erPercent >= 1.0) erStyle = 'text-emerald-600 font-semibold';
                else if (row.erPercent < 0.25) erStyle = 'text-slate-400';

                return (
                  <tr
                    key={row.date}
                    onClick={() => onSelectDay(row)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    {/* Date */}
                    <td className="py-2.5 px-3.5 font-medium text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono">{row.displayDate}</span>
                        {row.isSpikeDay && (
                          <span title="Ngày nổ view lớn" className="inline-flex">
                            <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          </span>
                        )}
                        {row.isMegaSale && (
                          <span className="text-[10px] text-blue-600 font-mono">D-Day</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">{row.dayOfWeek}</div>
                    </td>

                    {/* Video Count */}
                    <td className={`py-2.5 px-3 text-right font-mono tabular-nums ${cadenceStyle}`}>
                      {row.videoCount}
                    </td>

                    {/* Total Views */}
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-900 font-semibold">
                      {row.totalViews.toLocaleString('vi-VN')}
                    </td>

                    {/* Avg Views */}
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                      {row.avgViews.toLocaleString('vi-VN')}
                    </td>

                    {/* Interactions */}
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-600">
                      {row.totalInteractions.toLocaleString('vi-VN')}
                    </td>

                    {/* ER % */}
                    <td className={`py-2.5 px-3 text-right font-mono tabular-nums ${erStyle}`}>
                      {row.erPercent.toFixed(2)}%
                    </td>

                    {/* Highlights / Notes */}
                    <td className="py-2.5 px-3.5 max-w-md">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 shrink-0">{row.campaignTag}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-600 truncate">{row.highlightNotes}</span>
                      </div>
                    </td>

                    {/* Action Icon */}
                    <td className="py-2.5 px-3 text-center text-slate-400 group-hover:text-slate-700">
                      <ExternalLink className="w-3.5 h-3.5 mx-auto" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 sm:px-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Hiển thị</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-hidden"
          >
            <option value={10}>10 ngày / trang</option>
            <option value={20}>20 ngày / trang</option>
            <option value={50}>50 ngày / trang</option>
            <option value={-1}>Tất cả ({sortedData.length})</option>
          </select>
          <span>trên tổng {sortedData.length} ngày</span>
        </div>

        {pageSize !== -1 && totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            <span className="px-2 font-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
