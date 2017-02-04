import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';

import MainLoop from './MainLoop.tsx';
import Box from './box.tsx';


render(
  <MainLoop>
    <Box />
  </MainLoop>,
  document.getElementById('root')
);



