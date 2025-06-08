'use client';

import { useEffect, useRef, useState } from 'react';
import { getPremieresByYear  } from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function PremieresAndAnnouncements() {
  const [items, setItems] = useState<any[]>([]);
  const scrollContainer = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchData = async () => {
      const data = await getPremieresByYear(2025);
      const filtered = data.filter((item: any) => item.release_date?.startsWith('2025'));
      setItems([...filtered, ...filtered]);
    };
    fetchData();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainer.current;
    if (!container) return;

    const scrollAmount = 400;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    if (scrollLeft + clientWidth >= scrollWidth - scrollAmount) {
      container.scrollTo({ left: 0 });
    } else if (scrollLeft <= scrollAmount) {
      container.scrollTo({ left: scrollWidth / 2 });
    }
  };

  return (
    <section className="mt-16 px-8 w-full">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Premieres and Announcements</h2>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full"
        >
          <Image src="/arrow-icon.svg" alt="Scroll left" width={24} height={24} className="rotate-180" />
        </button>

        <div
          ref={scrollContainer}
          className="flex overflow-x-auto space-x-4 pb-4 px-12 scrollbar-hide"
        >
          {items.map((item, index) => (
           <Link key={`$(item.id)-${index}`}
           href={`/movie/${item.id}`}
           className="min-w-[200px] bg-gray-800 rounded-lg overflow-hidden relative block">
            <Image src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || 'No title'} width={200} height={300}
            className="w-full h-auto object-cover"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
              <Image src="/star-icon.svg" alt="Rating" width={12} height={12} />
              <span>{item.vote_average?.toFixed(1)}</span>
            </div>
            <div className="p-2">
              <h3 className="text-white text-sm font-semibold truncate">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.release_date?.split('-')[0] || '—'}</p>
            </div>
           </Link>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full"
        >
          <Image src="/arrow-icon.svg" alt="Scroll right" width={24} height={24} />
        </button>
      </div>
    </section>
  );
}
