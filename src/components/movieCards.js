import React, { useState, useEffect } from "react";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import Card from "./Card/Card";
import styles from "../styles/jss/sectionCards";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "./Grid/GridItem";
import axios from "axios";
import Button from "./CustomButtons/Button";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import history from "../api/history";
// material-ui component
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import selectStyles from "../styles/jss/customSelectStyle.js";

const useStyles = makeStyles(styles);
const SelectStyles = makeStyles(selectStyles);

function MovieCards() {
  const classes = useStyles();
  const select_classes = SelectStyles();
  const [movie, setMovie] = React.useState([]);
  const [category, setCategory] = React.useState("now_playing");
  const [simpleSelect, setSimpleSelect] = React.useState("1");

  useEffect(() => {
    axios.get(API).then((res) => {
      setMovie(res.data.results);
    });
  }, [category]);
  const API = `https://api.themoviedb.org/3/movie/${category}?api_key=69da287f8d942bd5ac2693404c94e0da&language=en-US&page=1`;

  var changeCategory = (TAG) => {
    setCategory(TAG);
    console.log(TAG);
  };

  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
  };

  let test = movie.map((data) => {
    const backgroundcolor = `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`;

    return (
      <div>
        <GridItem>
          <Card blog color="dark" className="cards">
            <CardHeader image>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  src={`https://image.tmdb.org/t/p/w1280/${data.poster_path}`}
                  alt="..."
                />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${backgroundcolor})`,
                  opacity: "1",
                }}
              />
            </CardHeader>
            <CardBody>
              <h3 className="movieButton">
                <a color="info">{data.title}</a>
                <Button
                  color="info"
                  round
                  onClick={(e) => history.push(`/MovieDetails/${data.id}`)}
                >
                  <LocalMoviesIcon /> Watch Trailer{" "}
                </Button>
              </h3>
            </CardBody>
          </Card>
        </GridItem>
      </div>
    );
  });

  return (
    <div className="movieContainer">
      <h2>Choose a category</h2>
      <FormControl
        fullWidth
        className={select_classes.selectFormControl}
        id="category"
      >
        
        <InputLabel
          htmlFor="simple-select"
          className={select_classes.selectLabel}
        ></InputLabel>
        <Select
      
          MenuProps={{
            className: select_classes.selectMenu,
          }}
          classes={{
            select: select_classes.select,
          }}
          value={simpleSelect}
          onChange={handleSimple}
          name={category}
          inputProps={{
            id: "simple-select",
          }}
        >
          <MenuItem
            classes={{
              root: select_classes.selectMenuItem,
              selected: select_classes.selectMenuItemSelected,
            }}
            value="1"
            onClick={() => changeCategory("now_playing")}
          >
            Now Playing
          </MenuItem>
          <MenuItem
            classes={{
              root: select_classes.selectMenuItem,
              selected: select_classes.selectMenuItemSelected,
            }}
            value="3"
            onClick={() => changeCategory("popular")}
            name="popular"
          >
            Popular
          </MenuItem>
          <MenuItem
            classes={{
              root: select_classes.selectMenuItem,
              selected: select_classes.selectMenuItemSelected,
            }}
            value="4"
            name="Upcoming Titles"
            onClick={() => changeCategory("upcoming")}
          >
            Upcoming Titles
          </MenuItem>
        </Select>
      </FormControl>
     <div className="movies"> {[test]}</div>
    </div>
  );
}

export default MovieCards;

/**
 *
 */
