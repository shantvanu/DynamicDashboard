'use client';

import { useEffect, useState } from 'react';
import { PortfolioResponse } from '@/types/portfolio';

export function usePortfolioSocket() {
  const [data, setData] = useState<PortfolioResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

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
