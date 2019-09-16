import React, { Component } from 'react';

import ApprovedVideoCard from './ApprovedVideoCard';

export class ApprovedVideosContainer extends Component {
  render() {
    const { approvedVideos } = this.props;
    console.log('videos container', approvedVideos);
    let content = '';

    if (approvedVideos && approvedVideos.length) {
      content = approvedVideos.map(approvedVideo => (
        <ApprovedVideoCard
          key={approvedVideo.snippet.resourceId.videoId}
          approvedVideo={approvedVideo}
        />
      ));
    }

    return <div className='row'>{content}</div>;
  }
}

export default ApprovedVideosContainer;
