import { delay, takeEvery, takeLatest, eventChannel, END, channel, buffers } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function* collisionDetection(gameLoop) {
  let chan = yield call(gameLoop);
  while (true) {

    var action = yield take(chan, 'GAMELOOP_UPDATE');

    var entities = yield select(s => s.entities);

    if (entities) {
      var keys = Object.keys(entities);

      for (var i = 0; i < keys.length - 1; i++) {
        for (var j = i + 1; j < keys.length; j++) {

          var entity = entities[keys[i]];
          var target = entities[keys[j]];

          var sumR = entity.radius + target.radius;
          if (entity.x + sumR > target.x
            && entity.x < target.x + sumR
            && entity.y + sumR > target.y
            && entity.y < target.y + sumR) {

            var dX = target.x - entity.x;
            var dY = target.y - entity.y;

            var dC = Math.pow(dX, 2) + Math.pow(dY, 2);
            var sumR = Math.pow(entity.radius + target.radius, 2);

            if (dC < sumR) {
              console.log('col', keys[i], keys[j]);              
              if (entity.team != target.team) {
                yield put({ type: 'ENTITY_UPDATE', name: keys[i], payload: { health: entity.health - 1 } });
                yield put({ type: 'ENTITY_UPDATE', name: keys[j], payload: { health: target.health - 1 } });
              }
            }
          }

        }
      }
    }
  }
}

