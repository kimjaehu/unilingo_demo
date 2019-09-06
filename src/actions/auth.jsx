import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FETCH_ANALYTICS,
  FETCH_CHANNEL
} from './types';

const SCOPE_YOUTUBE = 'https://www.googleapis.com/auth/youtube.readonly';
const SCOPE_YT_ANALYTICS =
  'https://www.googleapis.com/auth/yt-analytics.readonly';
const CHANNEL_ID = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';

export const login = () => dispatch => {
  return window.gapi.auth2
    .getAuthInstance()
    .signIn({ scope: SCOPE_YOUTUBE + ' ' + SCOPE_YT_ANALYTICS })
    .then(
      function() {
        console.log('Sign-in successful');
        dispatch({
          type: LOGIN_SUCCESS
        });
      },
      function(err) {
        console.error('Error signing in', err);
        dispatch({
          type: LOGIN_FAIL
        });
      }
    );
};

export const loadClient = () => {
  window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  return window.gapi.client.load(
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  );
};

export const loadClientAnalytics = () => {
  window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  return window.gapi.client.load(
    'https://youtubeanalytics.googleapis.com/$discovery/rest?version=v2'
  );
};

export const execute = () => dispatch => {
  return window.gapi.client.youtube.channels
    .list({
      part: 'snippet,contentDetails,statistics',
      id: CHANNEL_ID
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log('Response youtube', response);
        dispatch({
          type: FETCH_CHANNEL,
          payload: response.result
        });
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
};

export const executeAnalytics = () => dispatch => {
  return window.gapi.client.youtubeAnalytics.reports
    .query({
      ids: 'channel==MINE',
      startDate: '2019-01-01',
      endDate: '2019-12-31',
      metrics:
        'views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage',
      dimensions: 'day',
      sort: 'day'
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log('Response analytics', response);
        dispatch({
          type: FETCH_ANALYTICS,
          payload: response.result
        });
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
};

export const executePlaylist = () => {
  console.log(this.props);
  return window.gapi.client.youtube.playlistItems
    .list({
      part: 'snippet,contentDetails',
      maxResults: 25,
      playlistId: 'playlistId'
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log('Response', response);
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
};
