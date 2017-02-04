
import React, { Component, PropTypes } from 'react';
import GameLoop from '../utils/main-loop.tsx';
import KeyListener from '../utils/key-listener.tsx';


export default class Game extends Component {
    static propTypes = {
        children: PropTypes.any,
        style: PropTypes.object,
    };

    static childContextTypes = {
        loop: PropTypes.object,
        keys: PropTypes.object,
    };

    loop: GameLoop = new GameLoop();
    keys: KeyListener = new KeyListener();

    componentDidMount() {
        this.loop.start();
        this.keys.subscribe();
    }

    componentWillUnmount() {
        this.loop.stop();
        this.keys.unsubscribe();
    }

    getChildContext() {
        return {
            loop: this.loop,
            keys: this.keys,
        };
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}


