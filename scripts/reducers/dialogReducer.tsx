

export default function dialogReducer(state = null, action) {
    switch (action.type) {
        case 'DISMISS_DIALOG':
            return null;

        case 'SHOW_DIALOG':
            return action.payload;
    }
    return state;
}