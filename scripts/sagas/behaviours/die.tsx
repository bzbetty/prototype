import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function* (entityName, entity, timestep, timestamp) {
    yield put({ type: 'DIE', name: entityName});
}
