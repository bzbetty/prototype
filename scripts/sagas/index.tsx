import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

function inputChannel() {
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

function* actionRecorder() {
  const inputChan = yield call(inputChannel);
  let timestamp: number = 0;
  let loops: number = 0;
  let recording: Array<Action> = [];

  while (true) {    
    let event = yield race({
      input: take(inputChan),
      msg: take('GAMELOOP_TICK')  
    });

    if (event.msg) {
      timestamp = event.msg.payload.timestamp;
    } else {
      var action = { type: 'INPUT', timestamp: timestamp, payload: event.input, loop: 0 };
      recording.push(action); 
      yield put(action);

      if (event.input.key == "1") //loop
      {
        yield fork(playback, ++loops, timestamp, recording)
      }

    }
  }
}

interface Action {
  type: string;
  payload: Object;
}

function* playback(loop: number, initialTimestamp: number, recording: Array<Action>) {
  let index: number = 0;
  let timestamp : number = 0;

  var t = Object.keys(recording);
  
  yield takeLatest('GAMELOOP_TICK', function* (tick : Action) {
    timestamp = tick.payload.timestamp;  
    while (index < recording.length && (timestamp - initialTimestamp) > recording[index].timestamp) {
      yield put({ ...recording[index], loop: recording[index].loop + loop});
      index++;
    }
  });
}



async function animationFrame() {
  let resolve = null;
  const promise = new Promise(r => resolve = r);
  window.requestAnimationFrame(resolve);
  return await promise;
}

function* gameLoop() {
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


export default function* rootSaga() {
  yield fork(gameLoop);
  yield fork(actionRecorder);
};

