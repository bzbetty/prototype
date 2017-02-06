import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { fork, take, call, put, select } from 'redux-saga/effects'
import throttler from 'throttled-event-listener'

function input(secs) {
  return eventChannel(emitter => {
    throttler.add('keypress', 50, emitter);
    throttler.add('mousemove', 50, function(event) { if(event.buttons) { emitter(event); }});
    throttler.add('mousedown', 50, emitter);    
    throttler.add('mouseup', 50, emitter);

    return () => {
      //todo unsubscribe
    }
  }
  )
}

function* userInput() {
  const chan = yield call(input);
  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      let event = yield take(chan);
      console.log(event);
      //todo put event - filter recordable
    }
  } finally {
    console.log('userInput terminated');
  }
}

async function animationFrame() {
  let resolve = null;
  const promise = new Promise(r => resolve = r);
  window.requestAnimationFrame(resolve);
  return await promise;
}

function* gameLoop() {
  var lastFrameTimeMs: number = 0;
  var delta: number = 0;
  var timestep: number = 1000 / 60;

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
        yield put({ type: 'GAMELOOP_UPDATE', payload: { timestamp: timestamp, delta: delta } });

        delta -= timestep;
        if (++numUpdateSteps >= 240) {
          debugger;
          break;
        }
      }

      //draw the update
      //this.draw(this.delta / this.timestep);
    }
  }
}

// function* playback() {  
//     yield takeLatest('GAMELOOP_UPDATE', function*() {
//         if(timestamp > nextACtion)
//         {
//           put(recordings[nextAction]);
//           nextAction++;
//         }
//     }); 
// }


// function* recorder() {
//     yield takeEvery("*", function*(action){
//         if(action.record == 1)
//         {
//           recordings[frame] = action;
//         }

//         if(action.type == 'loop')
//         {
//           fork(playback);
//         }
//     });
// }

export default function* rootSaga() {
  yield fork(gameLoop);
  yield fork(userInput);  
};

