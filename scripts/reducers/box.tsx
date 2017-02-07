var framesThisSecond: Number = 0;

export default function boxReducer(state = { x: 0, y: 0, velocityX: 0.08 }, action) {
    switch (action.type) {
        case 'GAMELOOP_UPDATE':             
            let x = Math.round(state.x + state.velocityX * action.payload.delta);
            if(x > 400) x = 400;
            if(x < 0) x = 0;
            return { x: x, y: state.y, velocityX: state.velocityX };
        case 'INPUT':
            if(action.payload.key == '2')
                return { ...state, velocityX: -state.velocityX };
            
    }
    return state;
}