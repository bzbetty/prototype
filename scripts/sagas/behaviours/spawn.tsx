import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function spawn(playerDefaults) {
  let spawn: number = 0;
  var MAX_SPAWNS = 10;

  return function* (entityName, entity, timestep, timestamp) {
    if (spawn >= MAX_SPAWNS)
      return;

    yield put({ type: 'SPAWN', payload: playerDefaults(), name: spawn++ });
  };
}

