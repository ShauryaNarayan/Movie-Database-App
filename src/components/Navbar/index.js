import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import './index.css'

const Navbar = () => {
  const [term, setTerm] = useState('')
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    const q = term.trim()
    if (q) {
      history.push(`/search?query=${encodeURIComponent(q)}&page=1`)
      setTerm('')
    }
  }

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <h1>movieDB</h1>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>
        </nav>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  )
}

export default Navbar
