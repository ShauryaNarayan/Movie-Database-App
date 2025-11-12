import React from 'react'
import CastCard from '../CastCard'
import './index.css'

const CastList = ({cast}) => {
  if (!cast || cast.length === 0) {
    return <div className="no-cast">No cast information available.</div>
  }

  return (
    <div className="cast-grid">
      {cast.map(member => (
        <CastCard key={member.id} cast={member} />
      ))}
    </div>
  )
}

export default CastList
