import React from 'react'
import MovieCard from '../MovieCard'
import './index.css'

const MoviesList = ({movies}) => {
  if (!movies || movies.length === 0) {
    return <p style={{textAlign: 'center', color: '#ccc'}}>No movies found.</p>
  }

  return (
    <div className="movies-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MoviesList
