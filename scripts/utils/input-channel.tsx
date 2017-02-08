import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga';
import { race, fork, take, call, put, select } from 'redux-saga/effects';

export default function inputChannel() {
  return eventChannel(emitter => {
    window.addEventListener('keypress', emitter);
    window.addEventListener('mousemove', function (event) { if (event.buttons) { emitter(event); } });
    window.addEventListener('mousedown', emitter);
    window.addEventListener('mouseup', emitter);

    return () => {
      //todo unsubscribe
    }
  }
  )
}