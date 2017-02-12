

export default function entitiesReducer(state = {}, action) {
    switch (action.type) {
        case 'ENTITY_UPDATE':
            var newState = {...state};
            newState[action.name] = {...newState[action.name], ...action.payload};
            return newState;

        case 'SPAWN':
            var newState = {...state};
            newState[action.name] = {...action.payload};
            return newState;

        case 'CLICK':
            var newState = {...state};
            newState[action.name].target = {...action.payload};
            return newState;
    }
    return state;
}