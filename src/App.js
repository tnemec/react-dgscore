import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Home from './components/Home.js';
import NewRound from './components/NewRound.js';
import SelectPlayers from './components/SelectPlayers.js';
import SelectCourse from './components/SelectCourse.js';
import Round from './components/Round.js';
import Scorecard from './components/Scorecard.js';
import NewCourse from './components/NewCourse.js';

import LocalStore from './utilities/localStore'


import './App.css';
import './bootstrap.min.css';
import './bootstrap-theme.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <LocalStore />      
          <Switch>
             <Route exact path='/' component={Home}/>
             <Route path='/new' component={NewRound}/>
             <Route path='/players' component={SelectPlayers}/>
             <Route path='/course' component={SelectCourse}/>   
             <Route path='/addcourse' component={NewCourse}/>  
             <Route path='/play/:hole?' component={Round}/>    
            <Route path='/scorecard/:alt?' component={Scorecard}/>                      
          </Switch>

      </div>
    );
  }
}

export default App;

