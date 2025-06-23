
import { useRef, useState } from 'react';
import { getFeaturedMovies, getFeaturedSeries } from '../../lib/api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from './Skeleton';

export default function FeaturedToday() {
  const [activeTab, setActiveTab] = useState<'movie' | 'tv'>('movie');
  
  const scrollContainer = useRef<HTMLDivElement>(null);

  const { data: fetchedItems = [], isLoading } = useQuery<MediaItem[]>({
  queryKey: ['featured', activeTab],
  queryFn: async () =>
    activeTab === 'movie' ? await getFeaturedMovies() : await getFeaturedSeries(),
  staleTime: 1000 * 60,});

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mt-16 px-8 w-full">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Featured Today</h2>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${activeTab === 'movie' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'}`}
          onClick={() => setActiveTab('movie')}
        >
          Movies
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeTab === 'tv' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'}`}
          onClick={() => setActiveTab('tv')}
        >
          Series
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full"
        >
          <Image src="/arrow-icon.svg" alt="Scroll left" width={24} height={24} className="rotate-180" />
        </button>

        <div
          ref={scrollContainer}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide px-12"
        >
        {isLoading ? (
           <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 px-4">
             {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
            </div>
          ) : (fetchedItems || []).map((item) => (
              <Link
                key={item.id}
                href={`/${activeTab}/${item.id}`}
                className="min-w-[200px] bg-gray-900 rounded-lg overflow-hidden relative block"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name || 'No title'}
                  width={200}
                  height={300}
                  className="w-full h-auto object-cover"
                />

                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <Image src="/star-icon.svg" alt="Rating" width={12} height={12} />
                  <span>{item.vote_average?.toFixed(1)}</span>
                </div>
                <div className="p-2">
                  <h3 className="text-white text-sm font-semibold truncate">
                    {item.title || item.name}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {(item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || '—')}
                  </p>
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
