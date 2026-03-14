import { useRef, useState } from 'react'
import './FoodCard.css'

function FoodCard({ food }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="food-card" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={food.video}
        loop
        muted
        playsInline
        className="food-card-video"
      />

      {!playing && (
        <div className="food-card-play-icon">&#9654;</div>
      )}

      <div className="food-card-info">
        <p className="food-card-name">{food.name}</p>
        {food.description && (
          <p className="food-card-description">{food.description}</p>
        )}
        <p className="food-card-partner">
          by {food.foodpartner?.fullname ?? 'Unknown'}
        </p>
      </div>
    </div>
  )
}

export default FoodCard
