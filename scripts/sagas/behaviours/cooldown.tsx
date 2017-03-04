import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function cooldown(seconds: number, behaviour) {
    let initialTimestamp: number = 0;

    return function* (entityName, entity, timestemp, timestamp) {
        if (initialTimestamp == 0) {
            initialTimestamp = timestamp;
            yield* behaviour(entityName, entity, timestemp, timestamp);
        }

        if (timestamp - initialTimestamp > seconds * 1000) {
            initialTimestamp = 0;
        }
    };
    
}
