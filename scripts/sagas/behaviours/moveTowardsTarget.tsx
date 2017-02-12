import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function* moveTowardsTarget(entityName, entity) {
    let timestep: number = 1000 / 60; //todo get from somewhere
    var target = entity.target;

    if(typeof(target) == 'string')
    {
        var entities = yield select(s => s.entities);
        target = entities[target];
    }

    if (target && target.x) {
        var dX = target.x - entity.x;
        var dY = target.y - entity.y;

        var dC = Math.round(Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)));

        if (dC < 3) {
            //todo agro list?
          //  yield put({ type: 'ENTITY_UPDATE', name: entity.name, payload: { target: null } });
            return;
        }

        //normalise
        dX /= dC;
        dY /= dC;

        //proportion of max velocity
        var velocityX = dX * 0.2 * timestep * (40 / entity.size);
        var velocityY = dY * 0.2 * timestep * (40 / entity.size);

        let x = Math.round(entity.x + velocityX);
        let y = Math.round(entity.y + velocityY);

        yield put({ type: 'ENTITY_UPDATE', name: entityName, payload: { x: x, y: y } });
    }
}

//behaviour

//pick a target (agro / distance?)
//hit target - ability?

//cooldown
//global cooldown





//abilities?

// projectile
// damageAoE, moveTowardsTarget, selectTarget, die --would that reselect?

//heal
// healAoe, die

//heal HOT
// repeat?, healAoe, die

//spawn(heal, x, y);