
import { useRef,useState,useEffect } from 'react';  
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { searchMovies } from '../../lib/api';
import { useQuery } from '@tanstack/react-query';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const{
    data: results = [],
    isLoading,
    isError,
  } = useQuery<SearchResult[]>({
    queryKey: ['search', query],
    queryFn: () => searchMovies(query),
    enabled: query.trim().length > 0,
    select: (data) => data.slice(0, 5), 
    staleTime: 1000 * 60
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2">
        <Image src="/search-icon.svg" alt="Search" width={24} height={24} className="mr-2" />
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-gray-700"
        />
      </div>

      {showDropdown && !isError && (isLoading || results.length> 0) && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
          {isLoading
            ? <li className="px-4 py-2 text-sm text-gray-500">Searching...</li>
            : results.map((movie) => (
              <li
                key={movie.id}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  router.push(`/movie/${movie.id}`);
                  setShowDropdown(false);
                }}
          >
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                width={40}
                height={60}
                className="mr-3 rounded"
              />
            )}
            <div className="text-sm text-gray-800">
              <p className="font-medium">{movie.title}</p>
              <p className="text-gray-500 text-xs">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                {movie.original_language && ` · ${movie.original_language.toUpperCase()}`}
              </p>
            </div>
          </li>
          ))}
        </ul>
      )}
    </div>
  );
}
