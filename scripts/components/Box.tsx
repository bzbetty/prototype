import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Box extends React.Component {   
    render() {
        var x =  this.props.x;
        var y = this.props.y;

        return (
            <div style={{ position: 'absolute', left: x, top: y, width: 50, height: 50, backgroundColor: 'green' }}>
                {this.props.children}
            </div>
        );
    }
}

export default Box;