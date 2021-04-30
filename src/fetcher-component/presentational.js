import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default class FetchRender extends Component {
  render () {
    if (!this.props.data.isLoaded) {
      return (
        <Container ><h1>Loading...</h1></Container>
      )
    } else {
      return (
        <div>
          <Container>
            <h1>NASA Astronomy Picture Of the Day</h1>
            <Card className="mx-auto" style={{ width: '36rem' }}>
              <Card.Img alt="nasa-apod" variant="top" src={ this.props.data.url } />
              <Card.Body>
                <p><strong> { this.props.data.title }</strong></p>
                { this.props.dataauthor && <p><small>Author: { this.props.data.author }</small></p> }
                { this.props.data.date && <p><small>Date: { this.props.data.date }</small></p> }
                <p><em>{ this.props.data.description }</em></p>
                <p><Button className="mr-2" variant="primary" onClick={ this.props.handle }>Random APOD</Button>
                <Button href={ this.props.data.hdurl } target="_blank" variant="primary">View HD version</Button></p>
              </Card.Body>
            </Card>
          </Container>

          <footer className="footer p-3 mt-3 bg-light">
            <Container>
              <span>Created using <a href="https://reactjs.org/">React </a>
                by <a href="https://github.com/dpMelian">dpMelian</a> using
                <a href="https://api.nasa.gov/"> NASA's public API</a>.</span>
            </Container>
          </footer>
        </div>
      )
    }
  }
}
