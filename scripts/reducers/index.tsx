import { combineReducers } from 'redux';

 import fps  from './fpsReducer.tsx';
 import entities  from './entityReducer.tsx';
  import dialog  from './dialogReducer.tsx';

export default combineReducers({
     fps,
     entities,
     dialog
}); 
