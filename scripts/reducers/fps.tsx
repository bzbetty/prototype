var framesThisSecond : Number = 0;

export default function fpsReducer(state = { fps: 60, lastFpsUpdate: 0 }, action) {
    switch(action.type) {        
        case 'GAMELOOP_TICK':
             if (action.payload.timestamp > state.lastFpsUpdate + 1000) {
                var fps = 0.25 * framesThisSecond + 0.75 * state.fps;
                var lastFpsUpdate = action.payload.timestamp;
                framesThisSecond = 0;

                return { fps: fps, lastFpsUpdate: lastFpsUpdate };
            }
            framesThisSecond++;
    }
    return state;
}