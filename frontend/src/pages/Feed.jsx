import { useEffect, useState } from 'react'
import './Feed.css'
import { getFoods } from '../api/food'
import FoodCard from '../components/FoodCard'

function Feed() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getFoods()
      .then((res) => setFoods(res.data))
      .catch(() => setError('Could not load feed. Make sure the server is running.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="feed-state">
        <p>Loading reels…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="feed-state">
        <p>{error}</p>
      </div>
    )
  }

  if (foods.length === 0) {
    return (
      <div className="feed-state">
        <p>No food reels yet. Be the first to post!</p>
      </div>
    )
  }

  return (
    <div className="feed">
      {foods.map((food) => (
        <FoodCard key={food._id} food={food} />
      ))}
    </div>
  )
}

export default Feed
