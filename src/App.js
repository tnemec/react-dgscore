import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Home from './components/Home.js';
import NewRound from './components/NewRound.js';
import SelectPlayers from './components/SelectPlayers.js';



import './App.css';
import './bootstrap.min.css';
import './bootstrap-theme.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
             <Route exact path='/' component={Home}/>
             <Route path='/new' component={NewRound}/>
             <Route path='/player' component={SelectPlayers}/>
          </Switch>
      </div>
    );
  }
}

export default App;

