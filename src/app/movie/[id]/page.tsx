// src/app/movie/[id]/page.tsx
'use client';  
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../../../../lib/api';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function MoviePage() {
  const { id } = useParams();

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => getMovieDetails(id as string),
    staleTime: 1000 * 60,
  });

  if (isLoading) return <p className="text-center text-yellow-400">Loading...</p>;
  if (isError || !movie) return <p className="text-center text-red-500">Error loading movie.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">{movie.title}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
        className="rounded shadow-lg mb-4"
      />
      <p className="text-gray-300">{movie.overview}</p>
    </div>
  );
}
