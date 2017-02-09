import { combineReducers } from 'redux';

 import fps  from './fpsReducer.tsx';
 import box  from './boxReducer.tsx';

export default combineReducers({
     fps,
     box
}); 
