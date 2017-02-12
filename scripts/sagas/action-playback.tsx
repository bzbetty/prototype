import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import Action from '../utils/action.tsx'


export default function* playback(gameLoop, loop: number, initialTimestamp: number, recording: Array<Action>) {
  let index: number = 0;
  let timestamp: number = 0;
  let chan = yield call(gameLoop);

  while (true) {
    var tick: Action = yield take(chan, 'GAMELOOP_TICK');
    timestamp = tick.payload.timestamp;
    while (index < recording.length && (timestamp - initialTimestamp) > recording[index].timestamp) {
      yield put({ ...recording[index], name: loop });
      index++;
    }
  };
}
