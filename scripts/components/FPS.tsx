import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class FPS extends React.Component {
    render() {
        return (
            <div>
                {Math.round(this.props.fps.fps)}
            </div>
        );
    }
}

export default connect(state => state)(FPS);