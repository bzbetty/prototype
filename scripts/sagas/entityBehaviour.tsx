import { delay, takeEvery, takeLatest, eventChannel, END, channel, buffers } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import gameLoop from './gameLoopEventChannel.tsx';

export default function* entity() {
  yield takeEvery('SPAWN', function* (spawnMessage) {
    let chan = yield call(gameLoop);

    while (true) {
      var action = yield take(chan, 'GAMELOOP_UPDATE');
      
      var entities = yield select(store => store.entities);
      var entity = entities[spawnMessage.name];

      if (!entity)
        return;

      yield* entity.behaviour(spawnMessage.name, entity, action.payload.timestep, action.payload.timestamp);

    }
  });
}
