import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import Playback from './action-playback.tsx';

export default function* spawner(recording) {
  let loops: number = 0;
  while (true) {
    var tick: Action = yield take('GAMELOOP_TICK');
    yield fork(Playback , loops++, tick.payload.timestamp, recording)
    yield delay(10000);
  }
}
