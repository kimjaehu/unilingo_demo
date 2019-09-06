import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';

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
  return window.gapi.client
    .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
    .then(
      function() {
        execute();
        loadClientAnalytics();
        console.log('GAPI client loaded for API');
      },
      function(err) {
        console.error('Error loading GAPI client for API', err);
      }
    );
};

const loadClientAnalytics = () => {
  return window.gapi.client
    .load('https://youtubeanalytics.googleapis.com/$discovery/rest?version=v2')
    .then(
      function() {
        executeAnalytics();
        console.log('GAPI client loaded for API');
      },
      function(err) {
        console.error('Error loading GAPI client for API', err);
      }
    );
};

const execute = () => {
  return window.gapi.client.youtube.channels
    .list({
      part: 'snippet,contentDetails,statistics',
      id: CHANNEL_ID
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log('Response youtube', response);
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
};

function executeAnalytics() {
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
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
}
