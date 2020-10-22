import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

/**
 * Fetches an API request from NASA's APOD
 * and displays the data
 */
export default class Fetch extends Component {
  constructor (props) {
    super (props)
    this.state = { author: '', date: '', description: '', hdurl: '',
      isLoaded: false, title: '', url: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  /** Fetches today's APOD */
  componentDidMount () {
    this.setState({isLoaded: false})
    const apiKey = process.env.REACT_APP_API_KEY
    var fetchUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey

    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({ author: data.copyright, date: this.formatDate(new Date()),
        description: data.explanation, hdurl: data.hdurl, isLoaded: true,
        title: data.title, url: data.url
      })
    })
  }

  /**
    * Checks if the new random date is equal to the previous one to avoid
    * re-rendering the component
    */
  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.date === nextState.date && !(this.state.date === "")){
      return false
    } else {
      return true
    }
  }

  /** Builds fetch URL and retrieves the data */
  fetchData () {
    var random = this.randomDate(new Date(2012, 0, 1), new Date())

    if (random === this.state.date) {
      return
    }

    this.setState({isLoaded: false})
    const apiKey = process.env.REACT_APP_API_KEY
    var fetchUrl = 'https://api.nasa.gov/planetary/apod?date=' +
      random + '&api_key=' + apiKey

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ url: data.url, title: data.title, author: data.copyright,
           description: data.explanation, date: random, isLoaded: true,
           hdurl: data.hdurl })
      })
  }

  /** Calls fetcher method on button click */
  handleClick () {
    this.fetchData()
  }

  /** Returns a random date with format YYYY-MM-DD */
  randomDate (start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  /** Returns today's date with format YYYY-MM-DD */
  formatDate (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  }

  render () {
    if (!this.state.isLoaded) {
      return (
        <Container ><h1>Loading...</h1></Container>
      )
    } else {
      return (
        <Container>
          <h1>NASA Astronomy Picture Of the Day</h1>
          <Card className="mx-auto" style={{ width: '36rem' }}>
            <Card.Img alt="nasa-apod" variant="top" src={ this.state.url } />
            <Card.Body>
              <p><strong> { this.state.title }</strong></p>
              { this.state.author && <p><small>Author: { this.state.author }</small></p> }
              { this.state.date && <p><small>Date: { this.state.date }</small></p> }
              <p><em>{ this.state.description }</em></p>
              <p><Button className="mr-2" variant="primary" onClick={ this.handleClick }>Random APOD</Button>
              <Button href={ this.state.hdurl } target="_blank" variant="primary">View HD version</Button></p>
            </Card.Body>
          </Card>
        </Container>
      )
    }
  }
}
