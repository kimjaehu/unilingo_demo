import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  FETCH_ANALYTICS,
  FETCH_VIDEOS,
  FETCH_PLAYLIST_ID
} from './types';

const SCOPE_YOUTUBE = 'https://www.googleapis.com/auth/youtube.readonly';
const SCOPE_YT_ANALYTICS =
  'https://www.googleapis.com/auth/yt-analytics.readonly';
let playlistId = '';

export const login = () => dispatch => {
  return (
    window.gapi.auth2
      .getAuthInstance()
      // .signIn({ scope: SCOPE_YOUTUBE + ' ' + SCOPE_YT_ANALYTICS })
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
      )
  );
};

// export const login = () => dispatch => {
//   return (
//     window.gapi.auth2
//       .getAuthInstance()
//       // .signIn({ scope: SCOPE_YOUTUBE + ' ' + SCOPE_YT_ANALYTICS })
//       .signIn({
//         scope: SCOPE_YOUTUBE + ' ' + SCOPE_YT_ANALYTICS,
//         prompt: 'select_account'
//       })
//       .then(
//         function() {
//           console.log('Sign-in successful');
//           dispatch({
//             type: LOGIN_SUCCESS
//           });
//         },
//         function(err) {
//           console.error('Error signing in', err);
//           dispatch({
//             type: LOGIN_FAIL
//           });
//         }
//       )
//   );
// };

export const loadClient = () => {
  window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
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
  window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
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
        console.log('Response channel id', response);
        playlistId =
          response.result.items[0].contentDetails.relatedPlaylists.uploads;
        dispatch({
          type: FETCH_PLAYLIST_ID,
          payload: playlistId
        });
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
};

// export const getVideos = () => dispatch => {
//   return window.gapi.client.youtube.playlistItems
//     .list({
//       part: 'snippet,contentDetails',
//       playlistId: playlistId
//     })
//     .then(
//       function(response) {
//         // Handle the results here (response.result has the parsed body).
//         console.log('Response playlist id', response);
//         dispatch({
//           type: FETCH_CHANNEL,
//           payload: response.result
//         });
//       },
//       function(err) {
//         console.error('Execute error', err);
//       }
//     );
// };

export const getVideos = () => dispatch => {
  console.log('this ran');
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
        console.log('within response', playlistId);
        // Handle the results here (response.result has the parsed body).
        console.log('Response playlist id', response.result.items);
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
};

// const videoSetState = response => dispatch => {
//   console.log('this worked');
//   dispatch({
//     type: FETCH_CHANNEL,
//     payload: response
//   });
// };

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

export const signOut = () => dispatch => {
  const auth = window.gapi.auth2.getAuthInstance();
  auth.signOut().then(() => {
    console.log('User signed out.');
    dispatch({
      type: LOGOUT_SUCCESS
    });
  });
};
