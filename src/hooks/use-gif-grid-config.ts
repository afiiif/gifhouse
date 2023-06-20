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

  return {
    width,
    columns: Math.ceil(width / 360),
    limit: width < 768 ? 10 : 16,
  };
}
