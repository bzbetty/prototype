import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

import gameLoop from './game-loop.tsx';
import recorder from './action-recorder.tsx';
import spawner from './spawner.tsx';

let recording: Array<Action> = [];


function* game() {
  yield delay(200); // allow for other sagas to start
  yield put({ type: 'CLEAR'});
  yield put({ type: 'PLAYER_DEFAULTS', payload: { x: 200, y: 400, team: 0, spawn: 30, size: 40, health: 100}});
  yield put({ type: 'SPAWN', name: 'mob', payload: { x: 200, y: 200, size: 100, team: 1, health: 100}});
  yield put({ type: 'DIALOG'});
  //yield take("DISMISS");
  yield put({ type: 'START' });
  yield put({ type: 'START' });
}



export default function* rootSaga() {  
  yield fork(gameLoop);
  yield fork(recorder, recording);
  yield fork(spawner, recording);
  yield fork(game);
};

