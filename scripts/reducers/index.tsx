import { combineReducers } from 'redux';

 import fps  from './fpsReducer.tsx';
 import entities  from './entityReducer.tsx';

export default combineReducers({
     fps,
     entities
}); 
