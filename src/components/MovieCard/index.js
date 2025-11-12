import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

const MovieCard = ({movie}) => (
  <div className="movie-card">
    <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
    <h3>{movie.title}</h3>
    <p>⭐ {movie.vote_average}</p>
    <Link to={`/movie/${movie.id}`} className="details-btn">
      View Details
    </Link>
  </div>
)

export default MovieCard
