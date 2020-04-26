import React, { Component } from 'react';
import { Viewings } from './components/Viewings';
import { Container } from 'reactstrap';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Container>
        <p></p>
        <h1>Welcome to Berra's Bio!</h1>
        <Viewings />
      </Container>
    );
  }
}
