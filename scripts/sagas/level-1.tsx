import { delay, takeEvery, takeLatest, eventChannel, END, channel, buffers } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

import mapObject from '../utils/map-object.tsx';
import Action from '../utils/action.tsx'

import recorder from './action-recorder.tsx';
import behaviours from './behaviours.tsx';
import collisionDetection from './collisionDetection.tsx';

import pickATarget from './behaviours/pickATarget.tsx';
import moveTowardsTarget from './behaviours/moveTowardsTarget.tsx';
import hurtEnemiesInRange from './behaviours/hurtEnemiesInRange.tsx';
import playback from './behaviours/playback.tsx';
import spawn from './behaviours/spawn.tsx';
import die from './behaviours/die.tsx';


import cooldown from './behaviours/conditionals/cooldown.tsx';
import keyDown from './behaviours/conditionals/keyDown.tsx'
import atHealth from './behaviours/conditionals/atHealth.tsx'


import every from './behaviours/util/every.tsx';


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
  yield fork(recorder, recording);
  yield fork(behaviours);
  yield fork(collisionDetection);

  let playerDefaults = function() {
      return {
        x: 200,
        y: 400,
        team: 0,
        radius: 20,
        rotation: 0,
        health: 100,
        behaviour: every([
          playback(recording),
          moveTowardsTarget,
          atHealth(0, die('LOSE')),
          keyDown('1', cooldown(1, hurtEnemiesInRange(40)))
        ])
    }
  };

   let spawner = function() {
      return {
        x: 200,
        y: 400,
        team: 0,
        radius: 2,        
        behaviour: cooldown(10, spawn(playerDefaults)),                  
    }
  };

   yield put({ type: 'SPAWN', payload: spawner(), name: 'spawner' });

  //spawn mobs
  yield put({
    type: 'SPAWN',
    name: 'mob',
    payload: {
      x: 200,
      y: 200,
      radius: 50,
      rotation: 180,
      team: 1,
      health: 100,
      behaviour: every([
        pickATarget,
        moveTowardsTarget,
        atHealth(0, die('WIN')),
        cooldown(1, hurtEnemiesInRange(5)),
      ])
    }
  });
}

