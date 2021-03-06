'use strict';

import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/constants';
import EventEmitter from 'events';
import assign from 'object-assign';

const ActionType = Constants.ActionTypes;
const CHANGE_EVENT = 'change';

var AuthModalStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT)
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
})

AuthModalStore.dispatchToken = Dispatcher.register(function(payload) {
  switch(payload.type) {
    case ActionType.OPEN_LOGIN_REMIND_MODAL:
      AuthModalStore.emitChange();
      break;

    default:
      break;
  }

});

export default AuthModalStore;