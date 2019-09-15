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
import moment from 'moment';

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
    console.log('videos in home', this.props.videos);
    return (
      <div className='container'>
        <div className='card-deck'>
          <div className='row'>
            {this.props.videos
              ? this.props.videos.map(video => {
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
                        <p className='card-text'>{video.snippet.publishedAt}</p>
                        <a href='/' className='btn btn-primary'>
                          Go somewhere
                        </a>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
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
