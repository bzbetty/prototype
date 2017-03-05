import React, { Component, PropTypes } from 'react';


import fps from './fps.tsx';
import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select, cancel } from 'redux-saga/effects'


import level1 from './levels/level-1.tsx';
import level2 from './levels/level-2.tsx';
import level3 from './levels/level-3.tsx';


var levels = [level1, level2, level3];

export default function* game() {
  yield fork(fps);
  for (var levelIndex = 0; levelIndex < levels.length; levelIndex++) {
    yield put({ type: 'CLEAR' });
    var level = yield fork(levels[levelIndex]);

    var result = yield take(['WIN', 'LOSE']);
    yield cancel(level);

    if (result.type == 'LOSE') {
      yield put({ type: 'SHOW_DIALOG', payload: <div>You died</div> });
      yield take('DISMISS_DIALOG');  
      levelIndex--;    
    }

  }

  yield put({ type: 'CLEAR' });
  yield put({ type: 'SHOW_DIALOG', payload: <div>such winner</div> });
  yield take('DISMISS_DIALOG');

}

