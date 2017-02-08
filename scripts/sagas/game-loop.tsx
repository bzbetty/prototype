import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga';
import { race, fork, take, call, put, select } from 'redux-saga/effects';
import animationFrame from '../utils/animation-frame.tsx';

export default function* gameLoop() {
  let lastFrameTimeMs: number = 0;
  let delta: number = 0;
  let timestep: number = 1000 / 60;

  while (1) {
    var timestamp = yield call(animationFrame);

    // Throttle the frame rate.    
    if (timestamp >= lastFrameTimeMs + timestep) {
      delta += timestamp - lastFrameTimeMs;
      lastFrameTimeMs = timestamp;

      yield put({ type: 'GAMELOOP_TICK', payload: { timestamp: timestamp, delta: delta } });

      //perform updates
      var numUpdateSteps = 0;
      while (delta >= timestep) {
        yield put({ type: 'GAMELOOP_UPDATE', payload: { timestamp: timestamp, delta: delta, timestep: timestep } });
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
          debugger;
          break;
        }

      }
    }
  }
}