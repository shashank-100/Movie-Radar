import React from "react";
import Header from "./Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import navbarsStyle from "../styles/jss/navbarsStyle";
import Button from "./CustomButtons/Button";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import Explore from "@material-ui/icons/Explore";
import history from "../api/history";

export default function NavBar(props) {
  const useStyles = makeStyles(navbarsStyle);
  const classes = useStyles();

  return (
    <Header
      className="mainNavBar"
      brand="Movie Radar"
      color="info"
      links={
        <List className={classes.list + " " + classes.mlAuto}>
          <ListItem className={classes.listItem}>
            <Button
              href="#pablo"
              className={classes.navLink}
              onClick={(e) => history.push(`/`)}
              color="transparent"
            >
              <HomeIcon /> Home
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              href="#pablo"
              className={classes.navLink}
              onClick={(e) => history.push(`/SearchMovies`)}
              color="transparent"
            >
              <SearchIcon /> Search
            </Button>
          </ListItem>
        </List>
      }
    />
  );
}
