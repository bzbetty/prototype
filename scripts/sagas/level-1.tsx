import { delay, takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

import mapObject from '../utils/map-object.tsx';
import Action from '../utils/action.tsx'

import gameLoop from './game-loop.tsx';
import recorder from './action-recorder.tsx';
import spawner from './spawner.tsx';

import moveTowardsTarget from './behaviours/moveTowardsTarget.tsx';

function* behaviours() {
  yield takeLatest('GAMELOOP_UPDATE', function* (action) {
    var entities = yield select(s => s.box);

    for (var e in Object.keys(entities)) {
      let entity = entities[e];
      if (entity && entity.behaviours) {
        for (var b = 0; b < entity.behaviours.length; b++) {
          yield fork(entity.behaviours[b], b, entity);
          //next?
          //todo break out
        }
      }
    }
  });
}


//level ideas
//hit until dead
//heal self
//taunt
//require heal empty space
//fire - require move boss
//drag through fire
//spawn mobs
//spawner different locations
//spawner has health?
//spawner is a behavior?
//projectile
//get over here
//ranged mob
//silence/interrupts
//switch main
//delay input


export default function* level1() {
  let recording: Array<Action> = [];
  let playerDefaults = {
    x: 200,
    y: 400,
    team: 0,
    spawn: 30,
    size: 40,
    health: 100,
    behaviours: [
      moveTowardsTarget
    ]
  };

  yield fork(gameLoop);
  yield fork(recorder, recording);
  yield fork(spawner, playerDefaults, recording);
  yield fork(behaviours);

  //spawn mobs
  yield put({ type: 'SPAWN', name: 'mob', payload: { x: 200, y: 200, size: 100, team: 1, health: 100 } });


  //take('WIN'); // wait for win condition?
}

