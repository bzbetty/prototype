import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Box from './components/Box.tsx';
import FPS from './components/FPS.tsx';

class Game extends React.Component {   
    render() {
        return (
            <div>
                <FPS />
                {this.props.box.map((box, idx) => <Box key={idx} {...box} />)}                
            </div>
        );
    }
}


export default connect(state => state)(Game);