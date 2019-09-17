import React, { Component } from 'react';

export class ChannelInfo extends Component {
  render() {
    const { channelInfo } = this.props;
    let content = '';
    if (channelInfo) {
      content = (
        <ul className='list-group list-group-horizontal'>
          <li className='list-group-item'>{`Number of Subscribers: ${channelInfo.subscriberCount}`}</li>
          <li className='list-group-item'>{`Number of Vidoes: ${channelInfo.videoCount}`}</li>
          <li className='list-group-item'>{`Number of Views: ${channelInfo.viewCount}`}</li>
        </ul>
      );
    }

    return <div className='row'>{content}</div>;
  }
}

export default ChannelInfo;
