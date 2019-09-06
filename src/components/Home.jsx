import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h2> Lots of youtube videos</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    videos: state.videos.videos
  };
};

export default connect(mapStateToProps)(Home);
