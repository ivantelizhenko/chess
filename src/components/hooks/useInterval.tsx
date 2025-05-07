import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Оновлюємо посилання на callback, щоб брати найсвіжішу версію
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = window.setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => window.clearInterval(id);
  }, [delay]);
}

export default useInterval;
