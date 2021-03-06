import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/constants';

let ActionType = Constants.ActionTypes;

export default {
  storeRouterTransitionPath(path) {
    Dispatcher.dispatch({
      type: ActionType.ROUTER_NEXT_TRANSITION_PATH,
      path: path
    })
  },

  openLoginRemindModal() {
    Dispatcher.dispatch({
      type: ActionType.OPEN_LOGIN_REMIND_MODAL
    })
  },

  openLoginModal() {
    Dispatcher.dispatch({
      type: ActionType.OPEN_LOGIN_MODAL
    })
  },

  closeLoginModal(){
    Dispatcher.dispatch({
      type: ActionType.CLOSE_LOGIN_MODAL
    })
  },

  openUserActionModal(event) {
    Dispatcher.dispatch({
      type: ActionType.OPEN_USER_ACTION_MODAL,
      event: event
    })
  },

  createSong(songData) {
    Dispatcher.dispatch({
      type: ActionType.CREATE_SONG,
      song: songData
    })
  }
}