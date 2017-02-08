import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import inputChannel from '../utils/input-channel.tsx';
import Action from '../utils/action.tsx';


export default function* actionRecorder(recording : Array<Action>) {
  const inputChan = yield call(inputChannel);
  let timestamp: number = 0;

  while (true) {
    let event = yield race({
      input: take(inputChan),
      msg: take('GAMELOOP_TICK')
    });

    if (event.msg) {
      timestamp = event.msg.payload.timestamp;
    } else {      
      recording.push({ ...event.input, timestamp: timestamp });
    }
  }
}