import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function* moveTowardsTarget(entityName, entity, delta) {
    let timestep: number = 1000 / 60; //todo get from somewhere
    var target = entity.target;

    if (typeof (target) == 'string') {
        var entities = yield select(s => s.entities);
        target = entities[target];
    }

    if (target && target.x) {
        var dX = target.x - entity.x;
        var dY = target.y - entity.y;

        var dC = Math.round(Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)));

        var update = {};
        update.rotation = (Math.atan2(dY, dX) * 180 / Math.PI) + 90;

        if (!(dC < (entity.radius + target.radius + 10) || dC < 3)) {

            //normalise
            dX /= dC;
            dY /= dC;

            //proportion of max velocity
            var velocityX = dX * 0.2 * delta * (20 / entity.radius);
            var velocityY = dY * 0.2 * delta * (20 / entity.radius);

            update.x = Math.round(entity.x + velocityX);
            update.y = Math.round(entity.y + velocityY);

        }

        if(update.x || update.y || update.rotation != entity.rotation) {
            yield put({ type: 'ENTITY_UPDATE', name: entityName, payload: update });
        }

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