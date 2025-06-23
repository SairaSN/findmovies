// src/app/tv/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getTVDetails } from '../../../../lib/api';
import Image from 'next/image';

export default function TVPage() {
  const { id } = useParams();

  const { data: tv, isLoading, isError } = useQuery({
    queryKey: ['tvDetails', id],
    queryFn: () => getTVDetails(id as string),
    staleTime: 1000 * 60,
  });

  if (isLoading) return <p className="text-center text-yellow-400">Loading...</p>;
  if (isError || !tv) return <p className="text-center text-red-500">Error loading TV series.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">{tv.name}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
        alt={tv.name}
        width={300}
        height={450}
        className="rounded shadow-lg mb-4"
      />
      <p className="text-gray-300">{tv.overview}</p>
    </div>
  );
}
