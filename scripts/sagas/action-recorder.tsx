import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import Action from '../utils/action.tsx';

export default function* actionRecorder(gameLoop, recording: Array<Action>) {
  let timestamp: number = 0;
  let chan = yield call(gameLoop);

  var emitter = function (event) {
    recording.push({ ...event, timestamp: timestamp });
  };

  window.addEventListener('keypress', e => emitter({ type: 'KEYPRESS', payload: { key: e.key } }));
  window.addEventListener('click', e => emitter({ type: 'CLICK', payload: { x: e.clientX, y: e.clientY, button: e.which } }));

  while (true) {
    var event = yield take(chan, 'GAMELOOP_TICK');
    timestamp = event.payload.timestamp;
  }
}