import level1 from './level-1.tsx';

export default function* game() {
  yield* level1();
}

