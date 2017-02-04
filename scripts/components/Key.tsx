import React, { Component, PropTypes } from 'react';

export default class Box extends React.Component {
    static contextTypes = {
        loop: PropTypes.object,
        keys: PropTypes.object,
    };

    loopId: number = null;
    down: boolean;
    lastChange: number = 0;

    componentDidMount() {
        this.loopId = this.context.loop.subscribe(this);
    }

    componentWillUnmount() {
        if (this.loopId) {
            this.context.loop.unsubscribe(this.loopId);
        }
    }

    begin() {
        
    }

    update(delta) {
        if(this.lastChange > 200) {
            this.down = this.context.keys.isDown(32);
            this.lastChange = 0;
        }
        this.lastChange += delta;
    }

    draw(interp) {
        this.setState({
            down: this.down
        });
    }

    render() {
        return (<span>{this.down ? 'Down' : 'Up'}</span>);
    }
}