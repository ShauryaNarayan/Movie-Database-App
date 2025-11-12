import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import CastList from '../CastList'
import './index.css'

const API_KEY = '2c79426a2b832caaad04c209b1b8f3d2'
const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

const MovieDetails = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])

  useEffect(() => {
    const getMovieData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
      )
      const data = await res.json()
      setMovie(data)
    }

    const getCast = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
      )
      const data = await res.json()
      setCast(data.cast)
    }

    getMovieData()
    getCast()
  }, [id])

  if (!movie) return <div className="loading">Loading...</div>

  return (
    <div className="movie-details">
      <div className="movie-info">
        <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
        <div className="info-text">
          <h2>{movie.title}</h2>
          <p>⭐ {movie.vote_average}</p>
          <p>Duration: {movie.runtime} mins</p>
          <p>Genre: {movie.genres?.map(g => g.name).join(', ')}</p>
          <p>Release: {movie.release_date}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
      <h3>Cast</h3>
      <CastList cast={cast} />
    </div>
  )
}

export default MovieDetails
