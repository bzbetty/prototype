import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function hurtEnemiesInRange() {
    return function* (entityName, entity) {
        var entities = yield select(s => s.entities);
        var entity = entities[entityName];

        yield put({ type: 'ENTITY_UPDATE', name: entityName, payload: { health: 100 } });

    };
}