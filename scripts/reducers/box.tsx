var framesThisSecond: Number = 0;

export default function boxReducer(state = [], action) {
    switch (action.type) {
        case 'GAMELOOP_UPDATE':
            var newState = [...state];
            for (var i = 0; i < state.length; i++) {
                var entity = state[i];
                if (entity.destX) {
                    var dX = entity.destX - entity.x;
                    var dY = entity.destY - entity.y;

                    var dC = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

                    if (dC < 3) {
                        entity.destX = null;
                        break;
                    }
                    //normalise
                    dX /= dC;
                    dY /= dC;

                    //proportion of max velocity
                    var velocityX = dX * 0.2 * action.payload.timestep;
                    var velocityY = dY * 0.2 * action.payload.timestep;

                    let x = Math.round(state[i].x + velocityX);
                    let y = Math.round(state[i].y + velocityY);

                    entity.x = x;
                    entity.y = y;
                }
            }
            return newState;

        case 'SPAWN':
            return [...state, { x: 0, y: state.length * 50, velocityX: 0, velocityY: 0 }];

        case 'CLICK':
            var newState = [...state];

            newState[action.loop].destX = action.payload.x;
            newState[action.loop].destY = action.payload.y;

            return newState;
    }
    return state;
}