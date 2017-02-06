var framesThisSecond: Number = 0;

export default function boxReducer(state = { x: 0, y: 0, velocityX: 0.08 }, action) {
    switch (action.type) {
        case 'GAMELOOP_UPDATE':
             var velocityX = state.x >= 480 || state.x < 0 ? -state.velocityX : state.velocityX;

            return { x: Math.round(state.x + state.velocityX * action.payload.delta), y: state.y, velocityX: velocityX };
    }
    return state;
}