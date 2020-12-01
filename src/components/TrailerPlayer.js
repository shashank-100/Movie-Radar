import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

function TrailerPlayer(props) {
  const [movie, setMovie] = React.useState([]);
  console.log(props);

  useEffect(() => {
    axios.get(API).then((res) => {
      setMovie(res.data);
    });
  }, []);
  const API = `https://api.themoviedb.org/3/movie/${props.match.params.id}/videos?api_key=69da287f8d942bd5ac2693404c94e0da&language=en-US`;

  var list;

  if (movie.results && movie.results.length) {
    list = movie.results[0].key;
  }

  console.log(list);
  return (
    <div>
      <ReactPlayer
        width="100%"
        height="69em"
        url={`https://www.youtube.com/watch?v=${list}`}
      />
    </div>
  );
}

export default TrailerPlayer;
