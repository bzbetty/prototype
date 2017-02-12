import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import playback from './action-playback.tsx';
import Action from '../utils/action.tsx'

export default function* spawner(chan, playerDefaults: Object, recording: Array<Action>) {
  let loops: number = 0;

  //todo spawner props - x, y, currentCooldown, currentCooldown
  //todo draw on map?

  while (true) {
    var tick: Action = yield take(chan, 'GAMELOOP_TICK');
    yield put({ type: 'SPAWN', payload: playerDefaults, name: loops });

    yield fork(playback, chan, loops++, tick.payload.timestamp, recording)
    
    yield delay(10000);
  }
}

