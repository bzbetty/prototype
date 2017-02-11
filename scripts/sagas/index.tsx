import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select, cancel } from 'redux-saga/effects'

import game from './game.tsx';

export default function* rootSaga() {
  var g = yield fork(game);
  // takeEvery('DIE', function* (die)
  // {
  //     yield cancel(g);
  // })

  //takeLatest('START', game);

};

