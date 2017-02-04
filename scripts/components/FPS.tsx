import React, { Component, PropTypes } from 'react';

export default class FPS extends React.Component {
    static contextTypes = {
        loop: PropTypes.object
    };

    loopId: number = null;
    fps: number = 60;
    framesThisSecond: number = 0;
    lastFpsUpdate:number = 0;
    
    componentDidMount() {
        this.setState({ fps: 0 });
        this.loopId = this.context.loop.subscribe(this);        
    }

    componentWillUnmount() {
        if (this.loopId) {
            this.context.loop.unsubscribe(this.loopId);
        }
    }

    begin(timestamp, delta) {
        //  calculate the FPS
        if (timestamp > this.lastFpsUpdate + 1000) {
            this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
        }
        this.framesThisSecond++;
    }

    update(delta) {
        
    }

    draw(interp) {
        this.setState({ fps: this.fps });
    }

    render() {
        return (
            <div>
                {Math.round(this.fps)}
            </div>
        );
    }
}