import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function* hurtEnemiesInRange(entityName, entity) {
    var entities = yield select(s => s.entities);
    var entity = entities[entityName];
    
   if(entity.collisions)
   {
        for(var key in entity.collisions)
        {            
            var distance = entity.collisions[key];
            if(entity.team != entities[key].team && distance < 10)
            {
                yield put({ type: 'ENTITY_UPDATE', name: key, payload: { health: entities[key].health - 10 }});
            }
        }
   }
}
