import React, { Component } from "react";
import FetchRender from "./presentational";

/**
 * Fetches an API request from NASA's APOD
 * and displays the data
 */
export default class Fetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      date: "",
      description: "",
      hdurl: "",
      isLoaded: false,
      title: "",
      url: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /** Fetches today's APOD */
  componentDidMount() {
    this.setState({ isLoaded: false });
    const apiKey = process.env.REACT_APP_API_KEY;
    var fetchUrl = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          author: data.copyright,
          date: this.formatDate(new Date()),
          description: data.explanation,
          hdurl: data.hdurl,
          isLoaded: true,
          title: data.title,
          url: data.url,
        });
      });
  }

  /**
   * Checks if the new random date is equal to the previous one to avoid
   * re-rendering the component
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.date === nextState.date && !(this.state.date === "")) {
      return false;
    } else {
      return true;
    }
  }

  /** Builds fetch URL and retrieves the data */
  fetchData() {
    var random = this.randomDate(new Date(2012, 0, 1), new Date());

    if (random === this.state.date) {
      return;
    }

    this.setState({ isLoaded: false });
    const apiKey = process.env.REACT_APP_API_KEY;
    var fetchUrl =
      "https://api.nasa.gov/planetary/apod?date=" +
      random +
      "&api_key=" +
      apiKey;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          url: data.url,
          title: data.title,
          author: data.copyright,
          description: data.explanation,
          date: random,
          isLoaded: true,
          hdurl: data.hdurl,
        });
      });
  }

  /** Calls fetcher method on button click */
  handleClick() {
    this.fetchData();
  }

  /** Returns a random date with format YYYY-MM-DD */
  randomDate(start, end) {
    var d = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      ),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  /** Returns today's date with format YYYY-MM-DD */
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  render() {
    return <FetchRender data={this.state} handle={this.handleClick} />;
  }
}
