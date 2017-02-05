import React, { Component, PropTypes } from 'react';
import KeyListener from '../utils/key-listener.tsx';

export default class Box extends React.Component {
    static contextTypes = {
        loop: PropTypes.object
    };

    static childContextTypes = {
        keys: PropTypes.object,
    };

    loopId: number = null;
    lastChange: number = 0;
    
    keyListener: KeyListener = new KeyListener();
    history: Object = {};

    getChildContext() {
        return {
            keys: this.history,
        };
    }

    componentDidMount() {
        this.loopId = this.context.loop.subscribe(this);
        this.keyListener.subscribe();

    }

    componentWillUnmount() {
        if (this.loopId) {
            this.context.loop.unsubscribe(this.loopId);
        }
        this.keyListener.unsubscribe();
    }

    begin(timestamp, delta) {
        if (this.lastChange > 200) {
            var index = Math.round(timestamp / 200);
            if (Object.keys(this.keyListener.keys).length > 0) {
                this.history[index] = { ...this.keyListener.keys };
            }
            this.lastChange = 0;
        }
        this.lastChange += delta;
    }

    update(delta) {

    }

    draw(interp) {

    }

    render() {
        return null;
    }
}