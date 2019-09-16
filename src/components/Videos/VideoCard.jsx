import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { approveVideo } from '../../actions/auth';

export class VideoCard extends Component {
  onClick = e => {
    this.props.approveVideo(e.target.id);

    // this.props.approveVideo(this.props.text);
  };

  render() {
    const { video, channel } = this.props;
    console.log('each video', video);
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
        <div className='card-footer'>
          <button
            id={video.snippet.resourceId.videoId}
            onClick={this.onClick}
            className='btn btn-outline-success'
          >
            Approve
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channel: state.auth.channel
  };
};

export default connect(
  mapStateToProps,
  { approveVideo }
)(VideoCard);
