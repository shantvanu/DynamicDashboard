'use client';

import { SectorSummary } from '@/types/portfolio';

export default function SectorSummaryCard({
  sectors
}: {
  sectors: SectorSummary[];
}) {
  return (
    <div className="border rounded-md px-6 py-4">
      <div className="space-y-6">
        {sectors.map(sec => {
          const isProfit = sec.totalGainLoss >= 0;

          return (
            <div key={sec.sector} className="pb-4 border-b last:border-b-0">
              {/* Sector title */}
              <h3 className="text-lg font-semibold mb-2 ml-2">
                {sec.sector}
              </h3>

              {/* Sector values */}
              <div className="space-y-1 text-sm ml-4">
                <p>
                  <span className="font-medium">Investment:</span>{' '}
                  ₹{sec.totalInvestment.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Present Value:</span>{' '}
                  ₹{sec.totalPresentValue.toFixed(2)}
                </p>
                <p
                  className={
                    isProfit
                      ? 'text-green-600 font-semibold'
                      : 'text-red-600 font-semibold'
                  }
                >
                  Gain / Loss: ₹{sec.totalGainLoss.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
