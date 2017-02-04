import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';

import Game from './components/Game.tsx';
import Box from './components/Box.tsx';
import FPS from './components/FPS.tsx';
import Key from './components/Key.tsx';

//lots of code/inspiration taken from
//https://github.com/FormidableLabs/react-game-kit
//https://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing

render(
  <Game>
    <FPS />
    <Key />
    <Box />
  </Game>,
  document.getElementById('root')
);



