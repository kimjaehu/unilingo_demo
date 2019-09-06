import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadClient,
  loadClientAnalytics,
  execute,
  executeAnalytics,
  executePlaylist
} from '../actions/auth';

export class Home extends Component {
  async componentDidMount() {
    if (this.props.isAuthenticated) {
      loadClient().then(this.props.execute);
      loadClientAnalytics()
        .then(this.props.executeAnalytics)
        .then(this.props.executePlaylist);
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
    videos: state.videos.videos,
    channel: state.auth.channel
  };
};

export default connect(
  mapStateToProps,
  {
    execute,
    executeAnalytics,
    executePlaylist
  }
)(Home);
