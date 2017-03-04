import level1 from './level-1.tsx';
import fps from './fps.tsx';
import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select, cancel } from 'redux-saga/effects'


var levels = [level1];

export default function* game() {
  yield fork(fps);
  for (var levelIndex = 0; levelIndex < levels.length; levelIndex++) {
    yield put({ type: 'CLEAR' });
    var level = yield fork(levels[levelIndex]);

    var result = yield take(['WIN', 'LOSE']);
    yield cancel(level);

    if (result.type == 'LOSE') {
      levelIndex = -1;
    }

  }

  yield put({ type: 'CLEAR' });
  //todo win message

}

