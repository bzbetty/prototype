import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
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
  let recordingFrame : number = 0;
  let recording : Object = {};
 
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      let event = yield race({msg: take('GAMELOOP_TICK'), input:take(chan)});

      if(event.msg)
      {
        recordingFrame = Math.round(event.msg.payload.timestamp / 5);
      } else {
        recording[recordingFrame] = event.input;
      console.log(event.msg, event.input);
        if(event.input.key == "1") //loop
        {
          yield fork(playback,recording)
        }
        
      }
    }
}


function* playback(recording : Object) {  
  let recordingFrame : number = 0;
    var t = Object.keys(recording);

    yield takeLatest('GAMELOOP_TICK', function*() {
    yield put({ type: 'n', payload: recording[t[recordingFrame++]] });
        // if(timestamp > nextACtion)
        // {
        //   put(recordings[nextAction]);
        //   nextAction++;
        // }
    }); 
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


export default function* rootSaga() {
  yield fork(gameLoop);
  yield fork(userInput);  
};

