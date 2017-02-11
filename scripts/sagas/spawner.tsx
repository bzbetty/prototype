import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import playback from './action-playback.tsx';
import Action from '../utils/action.tsx'

export default function* spawner(playerDefaults: Object, recording: Array<Action>) {
  let loops: number = 0;

  while (true) {
    var tick: Action = yield take('GAMELOOP_TICK');
    yield put({ type: 'SPAWN', payload: playerDefaults, name: loops });

    yield fork(playback, loops++, tick.payload.timestamp, recording)
    yield delay(10000);
  }
}
