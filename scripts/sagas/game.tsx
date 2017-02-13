import level1 from './level-1.tsx';
import fps from './fps.tsx';
import { race, fork, take, call, put, select } from 'redux-saga/effects'

export default function* game() {
  yield fork(fps);
  yield* level1();
}

