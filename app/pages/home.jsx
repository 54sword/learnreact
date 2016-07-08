import React from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/// ---

import Nav from '../components/nav';
import Questions from '../components/questions';


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div id="main">
          <div className="container">
            <Questions />
          </div>
        </div>
      </div>
    );
  }
}
