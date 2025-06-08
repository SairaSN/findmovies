import { getTVDetails } from '../../../../lib/api'
import Image from 'next/image';

export default async function TVPage({ params }: { params: { id: string } }) {
  const tv = await getTVDetails(params.id);

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