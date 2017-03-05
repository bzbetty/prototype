import React, { Component, PropTypes } from 'react';

import { delay, takeEvery, takeLatest, eventChannel, END, channel, buffers } from 'redux-saga'
import { race, fork, take, call, put, select } from 'redux-saga/effects'

import mapObject from '../../utils/map-object.tsx';
import Action from '../../utils/action.tsx'

import recorder from '../actionRecorder.tsx';
import entityBehaviour from '../entityBehaviour.tsx';
import collisionDetection from '../collisionDetection.tsx';

import pickATarget from '../behaviours/pickATarget.tsx';
import moveTowardsTarget from '../behaviours/moveTowardsTarget.tsx';
import hurtEnemiesInRange from '../behaviours/hurtEnemiesInRange.tsx';
import healInRange from '../behaviours/healInRange.tsx';
import heal from '../behaviours/heal.tsx';
import playback from '../behaviours/playback.tsx';
import spawn from '../behaviours/spawn.tsx';
import die from '../behaviours/die.tsx';


import cooldown from '../behaviours/conditionals/cooldown.tsx';
import keyDown from '../behaviours/conditionals/keyDown.tsx'
import atHealth from '../behaviours/conditionals/atHealth.tsx'


import every from '../behaviours/util/every.tsx';




//level ideas
//heal future self / require heal empty space
//taunt
//fire - require move boss
//drag through fire
//spawn mobs
//spawner different locations
//spawner has health?
//spawner is a behavior?
//projectile
//get over here /  knockback
//ranged mob
//silence/interrupts
//switch main
//delay input
//mob spawner
//control mob
//casting bar?
//linked health



export default function* level1() {
  yield put({ type: 'SHOW_DIALOG', payload: <div>welcome to prototype, click to move, push 1 to hit nearby enemies, 2 to heal</div> });
  yield take('DISMISS_DIALOG');


  let recording: Array<Action> = [];
  yield fork(recorder, recording);
  yield fork(entityBehaviour);
  yield fork(collisionDetection);

  let healer = function () {
    return {
      x: 200,
      y: 400,
      team: 0,
      radius: 20,
      behaviour: every([
        cooldown(3, healInRange(40))
      ])
    };
  };

  let playerDefaults = function () {
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
        keyDown('1', cooldown(1, hurtEnemiesInRange(10))),
        keyDown('2', cooldown(1000, spawn(healer)))
      ])
    }
  };

  yield put({ type: 'SPAWN', payload: playerDefaults(), name: 'spawner' });

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
        cooldown(1, hurtEnemiesInRange(20)),
      ])
    }
  });
}

