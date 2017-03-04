import level1 from './level-1.tsx';
import fps from './fps.tsx';
import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select, cancel } from 'redux-saga/effects'


var levels = [level1];

export default function* game() {
  yield fork(fps);
  while (true) {
    yield put({ type: 'CLEAR' });
    var level = yield fork(level1);
    yield take(['WIN', 'LOSE']);
    yield cancel(level);
  }
}

