import React, {useEffect, useState} from 'react'
import MoviesList from '../../components/MoviesList'
import Pagination from '../../components/Pagination'
import './index.css'

const API_KEY = '2c79426a2b832caaad04c209b1b8f3d2'

const Upcoming = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`,
    )
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || [])
        setTotalPages(data.total_pages)
      })
  }, [page])

  return (
    <div className="page">
      <h2>Upcoming Movies</h2>
      <MoviesList movies={movies} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}

export default Upcoming
