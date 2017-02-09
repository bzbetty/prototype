import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import playback from './action-playback.tsx';
import Action from '../utils/action.tsx'

export default function* spawner(recording) {
  let loops: number = 0;
   
  var tick : Action = yield take('GAMELOOP_TICK'); //for some reason we need to get initial tick before player defaults or live with a 100ms lag on first player
  var defaults = yield take('PLAYER_DEFAULTS');

  while (true) {
    yield fork(playback, defaults, loops++, tick.payload.timestamp, recording)
    yield delay(10000);
    tick = yield take('GAMELOOP_TICK');
  }
}
