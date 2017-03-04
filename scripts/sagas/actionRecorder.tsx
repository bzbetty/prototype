import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import Action from '../utils/action.tsx';
import gameLoop from './gameLoopEventChannel.tsx';

export default function* actionRecorder(recording: Array<Action>) {
  let timestamp: number = 0;
  let chan = yield call(gameLoop);

  var event = yield take(chan, 'GAMELOOP_TICK');
  let initialTimestamp : number = event.payload.timestamp;

  let emitter = function (event) {
    recording.push({ ...event, timestamp: timestamp - initialTimestamp });  
  };

  window.addEventListener('keydown', e => {
    if (!e.repeat) {
      return emitter({ type: 'KEYDOWN', payload: { key: e.key } });
    } else {
      emitter({ type: 'KEYREPEAT', payload: { key: e.key } })
    }
  });

  window.addEventListener('keyup', e => emitter({ type: 'KEYUP', payload: { key: e.key } }));

  window.addEventListener('click', e => emitter({ type: 'CLICK', payload: { x: e.clientX, y: e.clientY, button: e.which } }));

  while (true) {
    var event = yield take(chan, 'GAMELOOP_TICK');
    timestamp = event.payload.timestamp;
  }
}
