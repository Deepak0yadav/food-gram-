import { useEffect, useState } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });

        console.log(response.data); // check full API data
        // response.data.foods is an array
        setVideos(response.data.foods);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="reels-container">
      {videos.map((video) => (
        <div
          key={video._id}
          className="reel">
          <video
            src={video.video}
            className="reel-video"
            loop
            preload="metadata"
            muted
            playsInline
          />
          <div className="overlay">
            <p className="description">{video.description}</p>
           <Link className="visit-btn" to={`/foodpartner/${video.foodpartner}`}>
             Visit Store
           </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
