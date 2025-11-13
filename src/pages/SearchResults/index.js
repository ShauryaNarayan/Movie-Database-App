import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
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

const useQuery = () => new URLSearchParams(useLocation().search)

const SearchResults = () => {
  const query = useQuery()
  const searchTerm = query.get('query') || ''
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(Number(query.get('page')) || 1)
  const [totalPages, setTotalPages] = useState(1)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL)

  useEffect(() => {
    if (!searchTerm) return
    const fetchMovies = async () => {
      setApiStatus(apiStatusConstants.LOADING)
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}`,
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
        console.error('Failed to fetch searched movies:', error)
        setApiStatus(apiStatusConstants.FAILURE)
      }
    }
    fetchMovies()
  }, [searchTerm, page])

  const renderLoadingView = () => (
    <div className="loading">
      <p>Searching movies...</p>
    </div>
  )

  const renderFailureView = () => (
    <div className="error">
      <h3>Search Failed!</h3>
      <p>Please try again later.</p>
    </div>
  )

  const renderSuccessView = () => (
    <>
      <h2>Search Results for "{searchTerm}"</h2>
      {movies.length > 0 ? (
        <>
          <MoviesList movies={movies} />
        </>
      ) : (
        <div className="no-results">No movies found.</div>
      )}
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
      <Navbar />
      {renderPageContent()}{' '}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}

export default SearchResults
