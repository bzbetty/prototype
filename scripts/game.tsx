import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Entity from './components/Entity.tsx';
import FPS from './components/FPS.tsx';
import Dialog from './components/Dialog.tsx';


import mapObject from './utils/map-object.tsx';

class Game extends React.Component {   
    render() {
        return (
            <div>                
                <FPS />
                <Dialog />
                { mapObject(this.props.entities, (entity, idx) => <Entity key={idx} {...entity} />)}                
            </div>
        );
    }
}


export default connect(state => state)(Game);