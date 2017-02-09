function mapObject(object, callback) {
    var idx = 0;
    return Object.keys(object).map(function (key) {
        return callback(object[key], idx++);
    });
}

export default function boxReducer(state = {}, action) {
    switch (action.type) {
        case 'GAMELOOP_UPDATE':
            var newState = {...state};
            mapObject(newState, (entity, idx) => {
                if (entity.destX) {
                    var dX = entity.destX - entity.x;
                    var dY = entity.destY - entity.y;

                    var dC = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

                    if (dC < 3) {
                        entity.destX = null;
                        return;
                    }
                    //normalise
                    dX /= dC;
                    dY /= dC;

                    //proportion of max velocity
                    var velocityX = dX * 0.2 * action.payload.timestep;
                    var velocityY = dY * 0.2 * action.payload.timestep;

                    let x = Math.round(entity.x + velocityX);
                    let y = Math.round(entity.y + velocityY);

                    entity.x = x;
                    entity.y = y;
                }
            });

            return newState;

        case 'SPAWN':
            var newState = {...state};
            newState[action.name] = {...action.payload};
            return newState;

        case 'CLICK':
            var newState = {...state};
            newState[action.name].destX = action.payload.x;
            newState[action.name].destY = action.payload.y;
            return newState;
    }
    return state;
}