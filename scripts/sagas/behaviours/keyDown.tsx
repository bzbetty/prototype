import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function kwyDown(key: string, behaviour) {
    let initialTimestamp: number = 0;

    return function* (entityName, entity, timestemp, timestamp) {
        if (entity.keyDown != key) {
            return;                        
        }

        yield* behaviour(entityName, entity, timestemp, timestamp);        
    };
    
}
