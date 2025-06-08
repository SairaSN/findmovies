import { RefObject } from 'react';

export function useInfiniteScroll(containerRef: RefObject<HTMLDivElement>) {
  return (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 400;

    // Scroll básico
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    // Lógica de duplicación de scroll infinito
    const { scrollLeft, scrollWidth, clientWidth } = container;
    if (scrollLeft + clientWidth >= scrollWidth - scrollAmount) {
      container.scrollTo({ left: 0 });
    } else if (scrollLeft <= scrollAmount) {
      container.scrollTo({ left: scrollWidth / 2 });
    }
  };
}
