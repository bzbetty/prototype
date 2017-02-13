import { delay, takeEvery, takeLatest, eventChannel, END, channel, buffers } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import gameLoop from './game-loop.tsx';

//seems to slow down when split out for each entity
export default function* fps() {
  let chan = yield call(gameLoop);
  let lastFpsUpdate: number = 0;
  let framesThisSecond: number = 60;
  let fps: number = 60;

  while (true) {
    var action = yield take(chan, 'GAMELOOP_TICK');

    if (action.payload.timestamp > lastFpsUpdate + 1000) {
      fps = 0.25 * framesThisSecond + 0.75 * fps;
      lastFpsUpdate = action.payload.timestamp;
      framesThisSecond = 0;
      yield put({ type: 'UPDATE_FPS', payload: fps });
    }

    framesThisSecond++;
  }
}

