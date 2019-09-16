import React, { Component } from 'react';

import VideoCard from './VideoCard';

export class VideosContainer extends Component {
  render() {
    const { videos } = this.props;
    console.log('videos container', videos);
    let content = '';

    if (videos && videos.length) {
      content = videos.map(video => (
        <VideoCard key={video.snippet.resourceId.videoId} video={video} />
      ));
    }

    return <div className='row'>{content}</div>;
  }
}

export default VideosContainer;
