import React from 'react'
import './index.css'

const IMG_BASE = 'https://image.tmdb.org/t/p/w300'

const CastCard = ({cast}) => {
  const image = cast.profile_path
    ? `${IMG_BASE}${cast.profile_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  return (
    <div className="cast-card">
      <img src={image} alt={cast.name} className="cast-image" />
      <h4>{cast.name}</h4>
      <p className="character">as {cast.character}</p>
    </div>
  )
}

export default CastCard
