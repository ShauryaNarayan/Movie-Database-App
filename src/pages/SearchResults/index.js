import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import MoviesList from '../../components/MoviesList'
import Pagination from '../../components/Pagination'
import './index.css'

const API_KEY = '2c79426a2b832caaad04c209b1b8f3d2'

const useQuery = () => new URLSearchParams(useLocation().search)

const SearchResults = () => {
  const query = useQuery()
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(Number(query.get('page')) || 1)
  const [totalPages, setTotalPages] = useState(1)
  const searchTerm = query.get('query') || ''

  useEffect(() => {
    if (searchTerm) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}`,
      )
        .then(res => res.json())
        .then(data => {
          setMovies(data.results || [])
          setTotalPages(data.total_pages)
        })
    }
  }, [searchTerm, page])

  if (!searchTerm)
    return <div className="no-search">Enter a search term above.</div>

  return (
    <div className="page">
      <h2>Search Results for "{searchTerm}"</h2>
      {movies.length > 0 ? (
        <>
          <MoviesList movies={movies} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className="no-results">No movies found.</div>
      )}
    </div>
  )
}

export default SearchResults
