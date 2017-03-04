

export default function entitiesReducer(state = {}, action) {
    switch (action.type) {
        case 'CLEAR':
            return {};

        case 'SPAWN':
            var newState = { ...state };
            newState[action.name] = { ...action.payload };
            return newState;

        case 'ENTITY_UPDATE':
            var newState = { ...state };
            newState[action.name] = { ...newState[action.name], ...action.payload };
            return newState;

        case 'CLICK':
            var newState = { ...state };
            newState[action.name].target = { ...action.payload };
            return newState;

        case 'KEYDOWN':
            var newState = { ...state };
            newState[action.name].keyDown = action.payload.key;
            return newState;

        case 'KEYREPEAT':
        case 'KEYUP':
            var newState = { ...state };
            newState[action.name].keyDown = null;
            return newState;

        case 'DIE':
            var newState = { ...state };
            delete newState[action.name];
            return newState;

        case 'COLLISIONS':
            var newState = { ...state };

            for (var key in state) {
                newState[key] = { ...newState[key], collisions: action.payload[key] };
            }

            return newState;
    }
    return state;
}