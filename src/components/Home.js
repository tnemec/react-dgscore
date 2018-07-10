import React, { Component } from 'react';
import { Button } from 'react-bootstrap';



const Previous = (props) => {
	return (
    <div className="section" v-if="inProgress">
      <h4>Round in progress:</h4>
      <p>{props.courseName}</p>
      <p><Button onClick={props.resumeHandler} bsStyle="primary">Resume Round</Button></p>

    </div>
	);
}

const NewRound = (props) => {
	return (
		<div className="section">
	      <p><Button onClick={props.newRoundHandler} bsStyle="primary">Start New Round</Button></p>
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

    handleNewRound = () => {
      this.props.history.push('/new');
    }

    handleResume = () => {
      this.props.history.push('/play');
    }


  render() {
    return (
  		<div className="home">
    		<h1>DG Score</h1>

    		<Previous courseName={this.state.round.course.name} resumeHandler={this.handleResume}  />    

    		<NewRound newRoundHandler={this.handleNewRound}/>		
    	</div>

    );
  }
}

export default Home;

