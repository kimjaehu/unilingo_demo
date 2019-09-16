import React, { Component } from 'react';
import moment from 'moment';

export class ApprovedVideoCard extends Component {
  render() {
    const { approvedVideo } = this.props;
    console.log('each video', approvedVideo);
    return (
      <div
        key={approvedVideo.snippet.resourceId.videoId}
        className='card'
        style={{ width: '18rem' }}
      >
        <iframe
          title={`youtube${approvedVideo.snippet.resourceId.videoId}`}
          className='embed-responsive-item'
          src={`https://www.youtube.com/embed/${approvedVideo.snippet.resourceId.videoId}`}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>

        <div className='card-body'>
          <h5 className='card-title'>{approvedVideo.snippet.title}</h5>
          <p className='card-text text-truncate'>
            {approvedVideo.snippet.description}
            <small className='text-muted'>
              {moment(approvedVideo.snippet.publishedAt).format('MMM DD, YYYY')}
            </small>
          </p>
        </div>
        <div className='card-footer'>
          <button className='btn btn-outline-success' type='submit' onSubmit={() => {}}>
            Disapprove
          </button>
        </div>
      </div>
    );
  }
}

export default ApprovedVideoCard;
