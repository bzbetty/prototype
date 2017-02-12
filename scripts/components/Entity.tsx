import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Color from 'color';
import HealthBar from './health-bar.tsx';

class Entity extends React.Component {
    render() {
        var x = this.props.x;
        var y = this.props.y;
        var radius = this.props.radius;
        var rotation = this.props.rotation;

        var colors = ['green', 'red'];
        var color = colors[this.props.team || 0];
        var backgroundColor = Color(color).lighten(0.8);
        var size = radius * 2;

        return (
            <div style={{
                position: 'absolute',
                left: x - radius,
                top: y - radius,
                width: size,
                height: size,
            }}>
                <div style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    borderRadius: '50%', 
                    transform: `rotate(${rotation}deg)`,
                    border: '2px solid',
                    borderColor: `${color}`,
                    backgroundColor: `${backgroundColor}`
                }}>
                    {this.props.children}
                  
                    <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            height: '50%',
                            width: 2,
                            backgroundColor: `${color}`,
                        }}>
                    </div>

                </div>
                <HealthBar {...this.props} size={size} />
            </div>

        );
    }
}

export default Entity;