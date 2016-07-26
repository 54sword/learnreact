import React from 'react';
import ReactDOM from 'react-dom';

import Nav from '../../components/nav'


class Topic extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav />
        主题123
      </div>
    );
  }
}

export default Topic
