import keyMirror from 'keymirror';

let constants = {
    ActionTypes: keyMirror({
      SIGNUP: null,
      LOGIN: null,
      LOGOUT: null,
      RECEIVE_ALL_SONGS: null,
      FORK: null,
      DOWNLOAD: null,
      UPLOAD: null,
      RECEIVE_SONG_TREE: null,
      CREATE_SONG: null,
      SONG_ADD_SUCCESS: null,
      VOTE: null,
      GET_USER_FORKS: null,
      CREATE_FROM_FORKS:null
  })
}

export default constants;
