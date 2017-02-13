import { delay, takeEvery, takeLatest, eventChannel, END, channel, buffers } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

import mapObject from '../utils/map-object.tsx';
import Action from '../utils/action.tsx'

import recorder from './action-recorder.tsx';
import spawner from './spawner.tsx';
import behaviours from './behaviours.tsx';
import collisionDetection from './collisionDetection.tsx';

import pickATarget from './behaviours/pickATarget.tsx';
import moveTowardsTarget from './behaviours/moveTowardsTarget.tsx';


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
    radius: 20,
    health: 100,
    behaviours: [
      moveTowardsTarget
    ]
  };

  yield fork(recorder, recording);
  yield fork(spawner, playerDefaults, recording);
  yield fork(behaviours);
  yield fork(collisionDetection);

  //spawn mobs
  yield put({
    type: 'SPAWN',
    name: 'mob',
    payload: {
      x: 200,
      y: 200,
      radius: 50,
      team: 1,
      health: 100,
      behaviours: [
        pickATarget,
        moveTowardsTarget
      ]
    }
  });

  //take('WIN'); // wait for win condition?
}

