import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga';
import { race, fork, take, call, put, select } from 'redux-saga/effects';

export default function inputChannel() {
  return eventChannel(emitter => {
    window.addEventListener('keypress', e => emitter({ type: 'KEYPRESS', payload: { key: e.key }}) );
    window.addEventListener('click', e => emitter({ type: 'CLICK', payload: { x: e.clientX, y: e.clientY, button: e.which }}) );

    return () => {
      //todo unsubscribe
    }
  }
  )
}