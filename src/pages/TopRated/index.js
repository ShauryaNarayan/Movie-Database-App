import React, {useEffect, useState} from 'react'
import MoviesList from '../../components/MoviesList'
import Pagination from '../../components/Pagination'
import Navbar from '../../components/Navbar'
import './index.css'

const API_KEY = '2c79426a2b832caaad04c209b1b8f3d2'

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

const TopRated = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL)

  useEffect(() => {
    const fetchMovies = async () => {
      setApiStatus(apiStatusConstants.LOADING)
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
        )
        const data = await res.json()
        if (data.results) {
          setMovies(data.results)
          setTotalPages(data.total_pages)
          setApiStatus(apiStatusConstants.SUCCESS)
        } else {
          setApiStatus(apiStatusConstants.FAILURE)
        }
      } catch (error) {
        console.error('Failed to fetch top-rated movies:', error)
        setApiStatus(apiStatusConstants.FAILURE)
      }
    }

    fetchMovies()
  }, [page])

  const renderLoadingView = () => (
    <div className="loading">
      <p>Loading Top Rated Movies...</p>
    </div>
  )

  const renderFailureView = () => (
    <div className="error">
      <h3>Failed to load movies!</h3>
      <p>Please try again later.</p>
    </div>
  )

  const renderSuccessView = () => (
    <>
      <h2>Top Rated Movies</h2>
      <MoviesList movies={movies} />
    </>
  )

  const renderPageContent = () => {
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

  return (
    <div className="page">
    <Navbar/>
      {renderPageContent()}{' '}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}

export default TopRated
