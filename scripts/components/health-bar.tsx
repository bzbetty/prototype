import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Color from 'color';

class HealthBar extends React.Component {
    render() {
        var health = this.props.health;
        var size = this.props.size;

        if(health == 100)
            return null;
        
        return (
            <div style={{
                position: 'absolute',
                left: 0,
                top: -15,
                width: size,
                height: 3,
                border: '2px solid black',
            }}>
                <div style={{ width: size * health / 100, height: '100%', backgroundColor: 'lightgreen' }} />
            </div>
        );
    }
}

export default HealthBar;