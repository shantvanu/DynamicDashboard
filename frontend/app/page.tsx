'use client';

import { usePortfolioSocket } from '@/hooks/usePortfolioSocket';
import PortfolioTable from '@/components/PortfolioTable';
import SectorSummaryCard from '@/components/SectorSummary';

export default function Dashboard() {
  const { data, error } = usePortfolioSocket();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading portfolio…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* ===== Header ===== */}
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Dynamic Portfolio Dashboard
          </h1>

          <p className="text-gray-600 text-center mt-3">
            Real-time portfolio tracking with live market data
          </p>
        </div>

        {/* ===== Sector Summary ===== */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Sector Summary
            </h2>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <SectorSummaryCard sectors={data.sectors} />
        </div>

        {/* ===== Portfolio Table ===== */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Portfolio Holdings
          </h2>

          <PortfolioTable data={data.stocks} />
        </div>

      </div>
    </div>
  );
}
