import { useState, useEffect } from 'react';
import { GenreResponseProps } from './SideBar';
import { MovieCard } from './MovieCard';
import { api } from '../services/api';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenreId: number
}

export function Content({ selectedGenreId }: ContentProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
    .then(response => setMovies(response.data));

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`)
    .then(response => setSelectedGenre(response.data))
  }, [selectedGenreId]);

  return  <div className="container">
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>

    <main>
      <div className="movies-list">
        {Array.isArray(movies) && movies.map(movie => (
          <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  </div>
}