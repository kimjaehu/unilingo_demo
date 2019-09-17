import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { approveVideo, disapproveVideo } from '../../actions/auth';

export class VideoCard extends Component {
  onClickApprove = e => {
    this.props.approveVideo(e.target.id);
  };
  onClickDisapprove = e => {
    this.props.disapproveVideo(e.target.id);
  };

  render() {
    const { video, approvedVideos } = this.props;
    let button = '';
    if (approvedVideos.includes(video.snippet.resourceId.videoId)) {
      button = (
        <button
          id={video.snippet.resourceId.videoId}
          onClick={this.onClickDisapprove}
          className='btn btn-outline-danger'
        >
          Disapprove
        </button>
      );
    } else {
      button = (
        <button
          id={video.snippet.resourceId.videoId}
          onClick={this.onClickApprove}
          className='btn btn-outline-success'
        >
          Approve
        </button>
      );
    }

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
              {moment(video.snippet.publishedAt).format('MMM DD, YYYY')}
            </small>
          </p>
        </div>
        <div className='card-footer'>{button}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    approvedVideos: state.auth.approvedVideos
  };
};

export default connect(
  mapStateToProps,
  { approveVideo, disapproveVideo }
)(VideoCard);
