import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Color from 'color';
import HealthBar from './health-bar.tsx';

class Entity extends React.Component {   
    render() {
        var x =  this.props.x;
        var y = this.props.y;
        var size = this.props.size;

        var colors = [ 'green', 'red' ];
        var color = colors[this.props.team || 0];
        var backgroundColor = Color(color).lighten(0.8);

        return (
            <div style={{ 
                        position: 'absolute',
                        left: x-(size/2), 
                        top: y-(size/2), 
                        width: size, 
                        height: size, 
                        borderRadius: '50%', 
                        border: '2px solid', 
                        borderColor: `${color}`,
                        backgroundColor: `${backgroundColor}`
                        }}>
                {this.props.children}

                  <HealthBar {...this.props} />
            </div>
        );
    }
}

export default Entity;