import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function every(behaviours : []) {
    return function* (entityName, entity, timestep, timestamp) {
         for (var b = 0; b < behaviours.length; b++) {
            yield* behaviours[b](entityName, entity, timestep, timestamp);
        }
    };    
}
