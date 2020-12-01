import { context } from "./Context";
import axios from "axios";
import React, { useEffect, createContext, useReducer } from "react";

const GlobalProvider = ({ children }) => {
  const [movie, setMovie] = React.useState([]);
  const initialState = movie;

  useEffect(() => {
    axios.get(API).then((res) => {
      setMovie(res.data.results);
    });
  }, []);

  function selectMovie(id) {
    dispatchEvent({
      type: "SELECT_MOVIE",
      payload: id,
    });
  }

  const API =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=69da287f8d942bd5ac2693404c94e0da&language=en-US&page=1";

  const { Provider } = context;
  return <Provider value={movie}>{children}</Provider>;
};

export default GlobalProvider;
