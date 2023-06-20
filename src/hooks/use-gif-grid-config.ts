import { useEffect, useState } from 'react';

export function useGifGridConfig() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setWindowWidth(entries[0].contentRect.width);
    });
    resizeObserver.observe(window.document.body);
    return () => {
      resizeObserver.unobserve(window.document.body);
    };
  }, []);

  const width = Math.min(windowWidth, 1248) - 16 * 2;

  // Workaround to force trigger intersection-observer when grid items are too few (can't scroll to trigger)
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    if (isFetched) {
      const timeoutRef = window.setTimeout(() => {
        setIsFetched(false);
      }, 1000);
      return () => {
        window.clearTimeout(timeoutRef);
      };
    }
    return () => {};
  }, [isFetched]);

  return {
    width,
    columns: Math.ceil(width / 360),
    limit: width < 768 ? 10 : 16,
    isFetched,
    setIsFetched,
  };
}
