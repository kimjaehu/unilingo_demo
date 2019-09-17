import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  FETCH_ANALYTICS,
  FETCH_VIDEOS,
  APPROVE_VIDEO,
  DISAPPROVE_VIDEO,
  FETCH_PLAYLIST_ID
} from './types';

const SCOPE_YOUTUBE = 'https://www.googleapis.com/auth/youtube.readonly';
const SCOPE_YT_ANALYTICS =
  'https://www.googleapis.com/auth/yt-analytics.readonly';
let playlistId = '';

// let isAuthorized;
// let currentApiRequest;
let GoogleAuth;

export const handleClientLoad = () => {
  window.gapi.load('client:auth2', initClient);
};

export const initClient = () => {
  //initialize google auth
  window.gapi.client
    .init({
      apikey: process.env.REACT_APP_GOOGLE_API_KEY,
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: SCOPE_YOUTUBE + ' ' + SCOPE_YT_ANALYTICS,
      fetch_basic_profile: false
    })
    .then(() => {
      GoogleAuth = window.gapi.auth2.getAuthInstance();
      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen();
    });
};

// export const authInit = () => {
//   //initialize google auth
//   window.gapi.load('client:auth2', function() {
//     window.gapi.auth2.init({
//       client_id: process.env.REACT_APP_CLIENT_ID,
//       scope: SCOPE_YOUTUBE + ' ' + SCOPE_YT_ANALYTICS,
//       fetch_basic_profile: false
//     })
//   });
// };

export const login = () => dispatch => {
  return (GoogleAuth = window.gapi.auth2
    .getAuthInstance()
    .signIn({
      scope: SCOPE_YOUTUBE + ' ' + SCOPE_YT_ANALYTICS,
      prompt: 'select_account'
    })
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
    ));
};

export const getExecute = () => {
  loadClient()
    .then(execute)
    .then(getVideos);
  loadClientAnalytics().then(executeAnalytics);
};

export const loadClient = () => {
  // window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  return window.gapi.client
    .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
    .then(
      function() {
        console.log('GAPI client loaded for API');
      },
      function(err) {
        console.error('Error loading GAPI client for API', err);
      }
    );
};

export const loadClientAnalytics = () => {
  // window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  return window.gapi.client.load(
    'https://youtubeanalytics.googleapis.com/$discovery/rest?version=v2'
  );
};

export const execute = () => dispatch => {
  return window.gapi.client.youtube.channels
    .list({
      part: 'snippet,contentDetails,statistics',
      mine: true
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        playlistId =
          response.result.items[0].contentDetails.relatedPlaylists.uploads;
        dispatch({
          type: FETCH_PLAYLIST_ID,
          payload: response.result.items[0].statistics
        });
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
};

export const getVideos = () => dispatch => {
  return window.gapi.client.youtube.playlistItems
    .list({
      part: 'snippet,contentDetails',
      playlistId: playlistId
    })
    .then(
      function(response) {
        dispatch({
          type: FETCH_VIDEOS,
          payload: response.result.items
        });
        // Handle the results here (response.result has the parsed body).
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

export const signOut = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

export const approveVideo = id => dispatch => {
  dispatch({
    type: APPROVE_VIDEO,
    payload: id
  });
};

export const disapproveVideo = id => dispatch => {
  dispatch({
    type: DISAPPROVE_VIDEO,
    payload: id
  });
};

// Google auth sign in
// export const handleClientLoad = () => {
//   console.log('handleClientLoad');
//   window.gapi.load('client:auth2', initClient);
// };

// export const initClient = () => {
//   //initialize google auth
//   console.log('initClient');
//   window.gapi.client
//     .init({
//       apikey: process.env.REACT_APP_GOOGLE_API_KEY,
//       client_id: process.env.REACT_APP_CLIENT_ID,
//       scope: SCOPE_YOUTUBE + ' ' + SCOPE_YT_ANALYTICS,
//       fetch_basic_profile: false
//     })
//     .then(() => {
//       GoogleAuth = window.gapi.auth2.getAuthInstance();
//       // Listen for sign-in state changes.
//       GoogleAuth.isSignedIn.listen(updateSigninStatus);
//     });
// };

// function sendAuthorizedApiRequest(requestDetails) {
//   console.log('sendAuthorizedApiRequest');
//   currentApiRequest = requestDetails;
//   if (isAuthorized) {
//     console.log('APIREQUEST');
//     // execute.then(getVideos);
//     // loadClientAnalytics().then(executeAnalytics);
//     // currentApiRequest = {};
//   } else {
//     GoogleAuth.signIn({ prompt: 'select_account' });
//   }
// }

// function updateSigninStatus(isSignedIn) {
//   console.log('isSignedIn', isSignedIn);
//   if (isSignedIn) {
//     isAuthorized = true;
//     if (currentApiRequest) {
//       sendAuthorizedApiRequest(currentApiRequest);
//     }
//   } else {
//     isAuthorized = false;
//   }
// }
