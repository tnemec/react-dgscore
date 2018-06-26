import React, { Component } from 'react';
import { Button } from 'react-bootstrap';



const Previous = (props) => {
	return (
    <div className="section" v-if="inProgress">
      <h4>Round in progress:</h4>
      <p>{props.roundName}</p>
      <p><Button onClick={props.resume} bsStyle="primary">Resume Round</Button></p>

    </div>
	);
}

const NewRound = (props) => {
	return (
		<div className="section">
	      <p><Button onClick={props.newRound} bsStyle="primary">Start New Round</Button></p>
	    </div>

	);
}



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: {
      	course: {
      		name : 'Test Name'
      	}
      }
    };
  }

newRound = (e) => {
	e.preventDefault();
	console.log('New Round');
	this.props.history.push('/new');
}

  render() {
    return (
  		<div className="home">
    		<h1>DG Score</h1>

    		<Previous roundName={this.state.round.course.name} />    

    		<NewRound newRound={this.newRound}/>		
    	</div>

    );
  }
}

export default Home;

