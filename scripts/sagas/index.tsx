import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

import GameLoop from './game-loop.tsx';
import Recorder from './action-recorder.tsx';
import Spawner from './spawner.tsx';

let recording: Array<Action> = [];

export default function* rootSaga() {
  yield fork(GameLoop);
  yield fork(Recorder, recording);
  yield fork(Spawner, recording);
};

