import { delay, takeEvery, takeLatest, eventChannel, END, channel, buffers } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import gameLoop from './gameLoopEventChannel.tsx';

export default function* collisionDetection() {
  let chan = yield call(gameLoop);
  while (true) {
    var action = yield take(chan, 'GAMELOOP_UPDATE');

    var distances = {};
    var entities = yield select(s => s.entities);

    if (entities) {
      var keys = Object.keys(entities);

      for (var entityIndex = 0; entityIndex < keys.length - 1; entityIndex++) {
        for (var targetIndex = entityIndex + 1; targetIndex < keys.length; targetIndex++) {

          var entityKey = keys[entityIndex];
          var targetKey = keys[targetIndex];

          var entity = entities[entityKey];
          var target = entities[targetKey];

          var sumR = entity.radius + target.radius;

          var dX = target.x - entity.x;
          var dY = target.y - entity.y;

          var dC = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

          distances[entityKey] = (distances[entityKey] || {});
          distances[entityKey][targetKey] = dC - sumR;
          distances[targetKey] = (distances[targetKey] || {});
          distances[targetKey][entityKey] = dC - sumR;
        }
      }

      yield put({ type: 'COLLISIONS', payload: distances });
    }
  }
}

