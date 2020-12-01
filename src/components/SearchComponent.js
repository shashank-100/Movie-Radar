import React, { useState } from "react";
import axios from "axios";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import People from "@material-ui/icons/People";
// core components
import CustomInput from "./CustomInput/CustomInput";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import Card from "./Card/Card";
import styles from "../styles/jss/sectionCards";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "./Grid/GridItem";
import Button from "./CustomButtons/Button";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import history from "../api/history";

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
    this.cancel = "";
  }

  fetchSearchResults = (updatedPageNo = "", query) => {
    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    // By default the limit of results is 20
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=69da287f8d942bd5ac2693404c94e0da&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`;
    //

    if (this.cancel) {
      // Cancel the previous request before making a new request
      this.cancel.cancel();
    }
    // Create a new CancelToken
    this.cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data.results.length
          ? "There are no more search results. Please try a new search."
          : "";
        this.setState({
          results: res.data.results,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch results.Please check network",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    console.log("Click");
    console.log(event.target.value);
    if (!query) {
      this.setState({ query, results: {}, message: "" });
    } else {
      this.setState({ query, loading: true, message: "" }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  renderSearchResults = () => {
    const { results } = this.state;
    if (Object.keys(results).length && results.length) {
      return (
        <div className="searchContainer">
          {results.map((result) => {
            return (
              <Card blog color="dark" className="cards">
                <CardHeader image>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      src={`https://image.tmdb.org/t/p/w1280/${result.poster_path}`}
                      alt="..."
                    />
                  </a>
                </CardHeader>
                <CardBody>
                  <h3 className="movieButton">
                    <a color="info">{result.title}</a>
                    <Button
                      color="info"
                      round
                      onClick={(e) =>
                        history.push(`/MovieDetails/${result.id}`)
                      }
                    >
                      <LocalMoviesIcon /> Watch Trailer{" "}
                    </Button>
                  </h3>
                </CardBody>
              </Card>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const { query } = this.state;

    return (
      <div>
        <div className="input">
          <CustomInput
            labelText="Click here to search for a movie!"
            id="material"
            type="text"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <People />
                </InputAdornment>
              ),
              onChange: this.handleOnInputChange,
              value: query,
            }}
          />
        </div>
      {this.renderSearchResults()}
      </div>
    );
  }
}

export default SearchComponent;
