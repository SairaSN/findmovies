interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

interface SearchResult {
  id: number;
  title: string;
  poster_path: string;
  release_date?: string;
  original_language?: string;
}