import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadClient,
  loadClientAnalytics,
  execute,
  getVideos,
  executeAnalytics
} from '../actions/auth';

export class Home extends Component {
  async componentDidMount() {
    if (this.props.isAuthenticated) {
      loadClient()
        .then(this.props.execute)
        .then(this.props.getVideos);
      loadClientAnalytics().then(this.props.executeAnalytics);
    }
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to='/login' />;
    }
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
    videos: state.auth.videos,
    playlistId: state.auth.playlistId
  };
};

export default connect(
  mapStateToProps,
  {
    execute,
    executeAnalytics,
    getVideos
  }
)(Home);
