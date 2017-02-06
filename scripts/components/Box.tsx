import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Box extends React.Component {   
    render() {
        return (
            <div style={{ position: 'absolute', left: this.props.box.x, top: this.props.box.y, width: 50, height: 50, backgroundColor: 'green' }}>
                {this.props.children}
            </div>
        );
    }
}


export default connect(state => state)(Box);