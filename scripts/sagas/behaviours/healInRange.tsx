import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function healInRange(damage = 10, range = 10) {
    return function* (entityName, entity) {
        var entities = yield select(s => s.entities);
        var entity = entities[entityName];

        if (entity.collisions) {
            for (var key in entity.collisions) {
                var distance = entity.collisions[key];
                if (distance < range) {
                    yield put({ type: 'ENTITY_UPDATE', name: key, payload: { health: Math.min(100, entities[key].health + damage) } });
                }
            }
        }
    };
}