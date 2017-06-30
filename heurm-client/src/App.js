import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth } from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';

class App extends Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <Route exact path="/" component={Home}/>
                <Route path="/auth" component={Auth}/>
            </div>
        );
    }
}

export default App;