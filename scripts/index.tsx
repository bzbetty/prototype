import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';

import Game from './components/Game.tsx';
import Box from './components/Box.tsx';


render(
  <Game>
    <Box />
  </Game>,
  document.getElementById('root')
);



