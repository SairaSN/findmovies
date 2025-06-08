export async function searchMoviesAndSeries(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=es-ES`);
  const data = await res.json();
  return data.results?.slice(0, 5) || [];
}
