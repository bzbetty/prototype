import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Store from './store.tsx';


import Game from './game.tsx';
import Box from './components/Box.tsx';

//lots of code/inspiration taken from
//https://github.com/FormidableLabs/react-game-kit
//https://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing

render(
  <Provider store={Store}>
      <Game />
  </Provider>,
  document.getElementById('root')
);





