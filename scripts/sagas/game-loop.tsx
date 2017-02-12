import { delay, takeEvery, takeLatest, eventChannel, END, channel } from 'redux-saga';
import { race, fork, take, call, put, select } from 'redux-saga/effects';

export default function gameLoop() {
  let lastFrameTimeMs: number = 0;
  let delta: number = 0;
  let timestep: number = 1000 / 60;

  return eventChannel(emitter => {
    var fu = timestamp => {
      // Throttle the frame rate.    
      if (timestamp >= lastFrameTimeMs + timestep) {
        delta += timestamp - lastFrameTimeMs;
        lastFrameTimeMs = timestamp;

        emitter({ type: 'GAMELOOP_TICK', payload: { timestamp: timestamp } });

        //perform updates
        var numUpdateSteps = 0;
        while (delta >= timestep) {
          emitter({ type: 'GAMELOOP_UPDATE', payload: { timestamp: timestamp, delta: delta, timestep: timestep } });
          delta -= timestep;
          if (++numUpdateSteps >= 240) {
            break;
          }
        }
      }
      window.requestAnimationFrame(fu);
    };

    window.requestAnimationFrame(fu);

    return () => { }; //unsubscribe
  });

}