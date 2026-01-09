'use client';

import { useEffect, useState } from 'react';
import { PortfolioResponse } from '@/types/portfolio';

export function usePortfolioSocket() {
  const [data, setData] = useState<PortfolioResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://dynamicdashboard-cg3t.onrender.com';

if (!WS_URL) {
  throw new Error('NEXT_PUBLIC_WS_URL is not defined');
}

const ws = new WebSocket(WS_URL);


    ws.onmessage = (event) => {
      try {
        setData(JSON.parse(event.data));
      } catch {
        setError('Invalid data received from server');
      }
    };

    ws.onerror = () => {
      setError('WebSocket connection error');
    };

    return () => ws.close();
  }, []);

  return { data, error };
}
