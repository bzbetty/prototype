var framesThisSecond: Number = 0;

export default function boxReducer(state = [], action) {
    switch (action.type) {
        case 'GAMELOOP_UPDATE':    
            var newState = [];     
            for(var i = 0; i <  state.length; i++)
            {

                let x = Math.round(state[i].x + state[i].velocityX * action.payload.timestep);
                if(x > 400) x = 400;
                if(x < 0) x = 0;
                newState.push({ ...state[i], x: x});
            }
            return newState;
          
        case 'SPAWN':
            // if(action.payload.key == '3')
            // {                
                 return [...state, { x: 0, y: state.length * 50, velocityX: 0.08 }];
            // }
 case 'INPUT':
            if(action.payload.key == ' ') {
                var newState = [...state];
                let i = action.loop;

                newState[i] = { ...newState[i], velocityX : -newState[i].velocityX}

                return newState;
            }
            
    }
    return state;
}