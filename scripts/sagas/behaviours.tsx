import { delay, takeEvery, takeLatest, eventChannel, END, channel, buffers } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import gameLoop from './game-loop.tsx';

//seems to slow down when split out for each entity
export default function* behaviours() {
  let chan = yield call(gameLoop);

  while (true) {

    var action = yield take(chan, 'GAMELOOP_UPDATE');

    var entities = yield select(s => s.entities);
    if (entities) {
      for (var e in entities) {
        let entity = entities[e];
        if (entity && entity.behaviours) {
          for (var b = 0; b < entity.behaviours.length; b++) {
            yield fork(entity.behaviours[b], e, entity, action.payload.timestep);
          }
        }
      }
    }
  }
}

