import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import Action from '../utils/action.tsx'


export default function* playback(loop: number, initialTimestamp: number, recording : Array<Action>) {
  let index: number = 0;
  let timestamp: number = 0;

  yield put({ type: 'SPAWN', payload: loop });

  while (true) {
    var tick: Action = yield take('GAMELOOP_TICK');
    timestamp = tick.payload.timestamp;
    while (index < recording.length && (timestamp - initialTimestamp) > recording[index].timestamp) {
      yield put({ ...recording[index], loop: loop });
      index++;
    } 
  };
}
