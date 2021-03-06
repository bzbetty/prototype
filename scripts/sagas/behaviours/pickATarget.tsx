import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function* pickATarget(entityName, entity) {
   if(!entity.target)
   {
        var entities = yield select(s => s.entities);
        for(var i in entities)
        {
            if(i != entityName && entities[i].team != entity.team && entity.collisions && entity.collisions[i] < 90)
            {
                yield put({ type: 'ENTITY_UPDATE', name: entityName, payload: { target: i }});
            }
        }
   }
}
