import React, { Component } from 'react';
import moment from 'moment';

export class VideoCard extends Component {
  render() {
    const { video } = this.props;
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
          <button className='btn btn-outline-success' onClick={() => {}}>
            Approve
          </button>
        </div>
      </div>
    );
  }
}

export default VideoCard;
