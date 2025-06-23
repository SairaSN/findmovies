const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function searchMovies(query: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.statusText}`);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    throw error;
  }
}

export async function getFeaturedMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch featured movies');
  const data = await res.json();
  return data.results.slice(0, 20); 
}

export async function getFeaturedSeries() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch featured series');
  const data = await res.json();
  return data.results.slice(0, 20);
}

export async function getPremieresByYear(year: number) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_year=${year}&sort_by=popularity.desc`
    );

    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.statusText}`);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching premieres for ${year}:`, error);
    throw error;
  }
}

const BASE_URL = 'https://api.themoviedb.org/3';

export async function getMovieDetails(id: string) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}

export async function getTVDetails(id: string) {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error('Failed to fetch TV details');
  return res.json(); 
}
