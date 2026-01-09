'use client';

import { useEffect, useState } from 'react';
import { PortfolioResponse } from '@/types/portfolio';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

export function usePortfolioSocket() {
  const [data, setData] = useState<PortfolioResponse | null>(null);
  const [error, setError] = useState<string | null>(
    !WS_URL ? 'WebSocket configuration missing' : null
  );

  useEffect(() => {
    if (!WS_URL) return;

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

    return () => {
      ws.close();
    };
  }, []);

  return { data, error };
}
