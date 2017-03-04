import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Dialog extends React.Component {
    render() {
        
        var text = this.props.dialog;

        if(!text)
            return null;

        return (
            <div>
                {text}
                <button onClick={() => this.props.dispatch({ type: 'DISMISS_DIALOG' })}>OK</button>
            </div>
        );
    }
}

export default connect(s=>s)(Dialog);