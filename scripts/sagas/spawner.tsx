import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

import Action from '../utils/action.tsx'
import gameLoop from './game-loop.tsx';

//todo behaviour

export default function* spawner(playerDefaults: Object) {
  let spawn: number = 0;
  var MAX_SPAWNS = 10;
  
  //todo spawner props - x, y, currentCooldown, currentCooldown
  //todo draw on map?

  while (true) {    
    yield put({ type: 'SPAWN', payload: playerDefaults(), name: spawn++ });
   
    if(spawn >= MAX_SPAWNS)
      return;
    
    yield delay(10000);
  }
}

