import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'
import Action from '../../utils/action.tsx'

export default function playback(recording: Array<Action>) {
  let index: number = 0;
  let initialTimestamp: number = 0;

  return function* (entityName, entity, timestep, timestamp) {
    
    if(initialTimestamp == 0)
    {
      initialTimestamp = timestamp;
    }

    while (index < recording.length && (timestamp - initialTimestamp) > recording[index].timestamp) {
      
      yield put({ ...recording[index], name: entityName });

      index++;

    }
  };
}
