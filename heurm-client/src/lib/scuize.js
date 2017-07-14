import React, { Component } from 'react';

export default (FunctionalComponent, shouldComponentUpdate) => class extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate.bind(this)(nextProps, nextState);
    }

    render() {
        return <FunctionalComponent {...this.props}/>
    }
};


// usage
/*
    export default scuize(EpisodeList, function(nextProps, nextState) {
        return true;
    });
*/