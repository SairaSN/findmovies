// src/app/movie/[id]/page.tsx
import { getMovieDetails } from '../../../../lib/api'

import Image from 'next/image';

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);

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
