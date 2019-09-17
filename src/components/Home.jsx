import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadClient,
  loadClientAnalytics,
  execute,
  getVideos,
  executeAnalytics,
  signOut
} from '../actions/auth';
import { ChannelInfo } from './ChannelInfo';
import { VideosContainer } from './Videos/VideosContainer';

export class Home extends Component {
  async componentDidMount() {
    if (this.props.isAuthenticated) {
      loadClient()
        .then(this.props.execute)
        .then(this.props.getVideos);
      loadClientAnalytics().then(this.props.executeAnalytics);
    }
  }

  onClick = e => {
    if (this.props.approvedVideos.length) {
      alert(
        `the following (${this.props.approvedVideos.length}) videos are approved and submitted! ${this.props.approvedVideos}`
      );
    } else {
      alert('Please approve videos!');
    }
  };

  render() {
    const { videos, isAuthenticated, playlistId } = this.props;
    if (!isAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <div className='container'>
        <div className='row'>
          <button
            type='button'
            className='btn btn-outline-secondary'
            onClick={this.props.signOut}
          >
            Sign Out
          </button>
        </div>
        <div className='row'>
          <h5>Channel Info</h5>
        </div>
        <div className='row'>
          <ChannelInfo channelInfo={playlistId} />
        </div>
        <div className='row'>
          <h5>Videos for Approval</h5>
        </div>
        <div className='card-deck'>
          <div className='row'>
            <VideosContainer videos={videos} />
          </div>
        </div>
        <div className='row'>
          <button
            type='button'
            onClick={this.onClick}
            className='btn btn-outline-primary'
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    videos: state.auth.videos,
    playlistId: state.auth.playlistId,
    approvedVideos: state.auth.approvedVideos
  };
};

export default connect(
  mapStateToProps,
  {
    execute,
    executeAnalytics,
    getVideos,
    signOut
  }
)(Home);
