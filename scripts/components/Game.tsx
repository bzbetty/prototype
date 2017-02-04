
import React, { Component, PropTypes } from 'react';
import GameLoop from '../utils/main-loop.tsx';


export default class Game extends Component {
    static propTypes = {
        children: PropTypes.any,
        style: PropTypes.object,
    };

    static childContextTypes = {
        loop: PropTypes.object,
    };



    loop: GameLoop = new GameLoop();

    componentDidMount() {
        this.loop.start();
    }


    componentWillUnmount() {
        this.loop.stop();
    }

    getChildContext() {
        return {
            loop: this.loop,
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

