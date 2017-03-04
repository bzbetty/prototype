import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function atHealth(health: number, behaviour) {
    return function* (entityName, entity, timestep, timestamp) {
        if(entity.health <= health) {debugger;
            yield* behaviour(entityName, entity, timestep, timestamp)
        }
    };
}
