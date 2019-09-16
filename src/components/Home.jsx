import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  authInit,
  login,
  loadClient,
  loadClientAnalytics,
  execute,
  getVideos,
  executeAnalytics,
  signOut
} from '../actions/auth';
import { ChannelInfo } from './ChannelInfo';
import { VideosContainer } from './Videos/VideosContainer';
import { ApprovedVideosContainer } from './Videos/ApprovedVideosContainer';

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
    const { videos, isAuthenticated, playlistId, approvedVideos } = this.props;
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
        {/* <div className='row'>
          <h5>Approved Videos</h5>
        </div>
        <div className='card-deck'>
          <div className='row'>
            <ApprovedVideosContainer approvedVideos={approvedVideos} />
          </div>
        </div> */}
        <div className='row'>
          <h5>Videos for Approval</h5>
        </div>
        <div className='card-deck'>
          <div className='row'>
            <VideosContainer videos={videos} />
            {/* 
        <div className='card-deck'>
          <div className='row'>
            {videos && videos.length
              ? videos.map(video => {
                  return (
                    <div
                      key={video.snippet.resourceId.videoId}
                      className='card'
                      style={{ width: '18rem' }}
                    >
                      <iframe
                        title={`youtube${video.snippet.resourceId.videoId}`}
                        className='embed-responsive-item'
                        src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      ></iframe>

                      <div className='card-body'>
                        <h5 className='card-title'>{video.snippet.title}</h5>
                        <p className='card-text text-truncate'>
                          {video.snippet.description}
                          <small className='text-muted'>
                            {moment(video.snippet.publishedAt).format(
                              'MMM DD, YYYY'
                            )}
                          </small>
                        </p>
                      </div>
                      <div className='card-footer'>
                        <button
                          className='btn btn-outline-success'
                          onClick={() => {}}
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div> */}
          </div>
        </div>
        <div className='row'>
          <button type='submit' className='btn btn-outline-primary'>
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
