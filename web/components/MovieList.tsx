import React, { useMemo, useState, useEffect } from "react";
import { useAppDispatch } from "../store";
import { movieActions, movieState } from "../store/movies";
import { MovieItem } from "../hooks/useMovieList";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: MovieItem[];
  title: string;
}

const toMovieState = (movie: MovieItem): movieState => ({
  id: String(movie.id ?? movie._id ?? ""),
  title: movie.title || "",
  description: movie.description || "",
  videoUrl: movie.videoUrl || "",
  thumbnailUrl: movie.thumbnailUrl || "",
  genre: movie.genre || "",
  duration: movie.duration || 0,
  code: movie.code,
  slug: movie.slug,
  studio: movie.studio,
  director: movie.director,
  cast: Array.isArray(movie.cast) ? movie.cast : [],
  status: movie.status,
  ageRating: movie.ageRating,
  releaseDate: movie.releaseDate,
  imageUrl: movie.imageUrl,
  posterUrl: movie.posterUrl,
  backdropUrl: movie.backdropUrl,
  trailerUrl: movie.trailerUrl,
  tags: Array.isArray(movie.tags) ? movie.tags : [],
  subtitles: Array.isArray(movie.subtitles) ? movie.subtitles : [],
  categories: Array.isArray(movie.categories) ? movie.categories : [],
});

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [columns, setColumns] = useState(3); // Default for mobile (grid-cols-3)

  // Cập nhật số cột dựa trên kích thước màn hình để tính toán "4 dòng" chính xác
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) setColumns(7); // xl:grid-cols-7
      else if (width >= 1024) setColumns(6); // lg:grid-cols-6
      else if (width >= 768) setColumns(5); // md:grid-cols-5
      else if (width >= 640) setColumns(4); // sm:grid-cols-4
      else setColumns(3); // default: grid-cols-3
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const itemsPerPage = columns * 4; // 4 dòng
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Lấy danh sách phim cho trang hiện tại
  const displayedMovies = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  // Reset về trang 1 nếu dữ liệu thay đổi
  useEffect(() => {
    setCurrentPage(0);
  }, [data.length]);

  const movieById = useMemo(() => {
    const map = new Map<string, MovieItem>();
    data.forEach((movie) => {
      const id = String(movie.id ?? movie._id ?? "");
      if (!id) return;
      map.set(id, movie);
    });
    return map;
  }, [data]);

  if (!data || data.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    if (!id) return;
    const movie = movieById.get(id);
    if (!movie) return;

    dispatch(movieActions.showModal(toMovieState(movie)));
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="px-4 md:px-12 mt-8 space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
            {title}
          </p>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-4 text-white">
              <button 
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition rounded"
              >
                Trước
              </button>
              <span className="text-sm font-medium">
                {currentPage + 1} / {totalPages}
              </span>
              <button 
                onClick={handleNext}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition rounded"
              >
                Sau
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 md:gap-3 lg:gap-4">
          {displayedMovies.map((movie) => {
            const movieId = String(movie.id ?? movie._id ?? "");
            return <MovieCard key={movieId || movie.title} data={movie} onClick={handleClick} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
