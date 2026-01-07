'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { LiveStock } from '@/types/portfolio';

const columns: ColumnDef<LiveStock>[] = [
  { accessorKey: 'name', header: 'Particulars' },
  { accessorKey: 'purchasePrice', header: 'Purchase Price' },
  { accessorKey: 'quantity', header: 'Qty' },
  { accessorKey: 'investment', header: 'Investment' },
  { accessorKey: 'portfolioPercent', header: 'Portfolio %' },
  { accessorKey: 'exchange', header: 'NSE/BSE' },
  { accessorKey: 'cmp', header: 'CMP' },
  { accessorKey: 'presentValue', header: 'Present Value' },
  {
    accessorKey: 'gainLoss',
    header: 'Gain / Loss',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return (
        <span className={value >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          ₹{value.toFixed(2)}
        </span>
      );
    }
  },
  { accessorKey: 'peRatio', header: 'P/E Ratio' },
  { accessorKey: 'earnings', header: 'Latest Earnings' }
];

export default function PortfolioTable({ data }: { data: LiveStock[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-3 py-2 text-center font-semibold text-gray-700 border border-gray-300"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-3 py-2 text-gray-700 border border-gray-300 text-center whitespace-nowrap"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
