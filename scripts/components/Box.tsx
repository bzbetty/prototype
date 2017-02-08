import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Box extends React.Component {   
    render() {
        var x =  this.props.x;
        var y = this.props.y;
        var size = 40;

        return (
            <div style={{ position: 'absolute', left: x-(size/2), top: y-(size/2), width: size, height: size, borderRadius: '50%', border: '3px solid green', backgroundColor: 'lightGreen' }}>
                {this.props.children}
            </div>
        );
    }
}

export default Box;