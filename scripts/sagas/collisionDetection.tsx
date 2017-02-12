import { delay, takeEvery, takeLatest, eventChannel, END, channel, buffers } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function* collisionDetection(chan) {
  return;
  while (true) {

    var action = yield take(chan, 'GAMELOOP_UPDATE');

    var entities = yield select(s => s.entities);

    if (entities) {
      var keys = Object.keys(entities);

      for (var i = 0; i < keys.length - 1; i++) {
        for (var j = i + 1; j < keys.length; j++) {

          var entity = entities[keys[i]];
          var target = entities[keys[j]];

          var dX = target.x - entity.x;
          var dY = target.y - entity.y;

          var dC = Math.round(Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)));
          if (dC < (entity.size /2+ target.size /2)) {
            console.log('col', keys[i], keys[j]);             
          }

        }
      }
    }
  }
}
