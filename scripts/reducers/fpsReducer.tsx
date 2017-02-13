var framesThisSecond : number = 0;

export default function fpsReducer(state = 60, action) {
    switch(action.type) {        
        case 'UPDATE_FPS':
            return action.payload;            
    }
    return state;
}
