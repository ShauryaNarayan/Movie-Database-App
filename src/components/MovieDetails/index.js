import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import CastList from '../CastList'
import './index.css'

const API_KEY = '2c79426a2b832caaad04c209b1b8f3d2'
const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

const MovieDetails = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL)

  useEffect(() => {
    const fetchData = async () => {
      setApiStatus(apiStatusConstants.LOADING)

      try {
        // Fetch Movie Details
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
        )
        const movieData = await movieRes.json()

        // Fetch Cast Details
        const castRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
        )
        const castData = await castRes.json()

        if (movieData && movieData.id) {
          setMovie(movieData)
          setCast(castData.cast || [])
          setApiStatus(apiStatusConstants.SUCCESS)
        } else {
          setApiStatus(apiStatusConstants.FAILURE)
        }
      } catch (error) {
        console.error('Failed to fetch:', error)
        setApiStatus(apiStatusConstants.FAILURE)
      }
    }

    fetchData()
  }, [id])

  // Rendering Functions
  const renderLoadingView = () => (
    <div className="loading">
      <p>Loading Movie Details...</p>
    </div>
  )

  const renderFailureView = () => (
    <div className="error">
      <h3>Something went wrong!</h3>
      <p>Unable to load movie details. Please try again later.</p>
    </div>
  )

  const renderSuccessView = () => {
    const {backdropPath, runtime} = movie
    const hours = Math.floor(runtime / 60)
    const minutes = runtime - hours * 60

    const background = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${backdropPath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
    }

    return (
      <div className="single-popular-container" style={background}>
        <div className="MoviesDetailsSection">
          <div className="movie-details">
            <div className="movie-info">
              <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
              <div className="info-text">
                <h2>{movie.title}</h2>
                <p>⭐ {movie.vote_average}</p>
                <p>
                  Duration: {hours}h {minutes}m
                </p>
                <p>Genre: {movie.genres?.map(g => g.name).join(', ')}</p>
                <p>Release: {movie.release_date}</p>
                <p>{movie.overview}</p>
              </div>
            </div>
            <h3>Cast</h3>
            <CastList cast={cast} />
          </div>
        </div>
      </div>
    )
  }

  const renderMovieDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.LOADING:
        return renderLoadingView()
      case apiStatusConstants.SUCCESS:
        return renderSuccessView()
      case apiStatusConstants.FAILURE:
        return renderFailureView()
      default:
        return null
    }
  }

  return <>{renderMovieDetails()}</>
}

export default MovieDetails
