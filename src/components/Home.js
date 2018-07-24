import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';



const Previous = (props) => {
  if(props.round.started && ! props.round.finished) {
  	return (
      <div className="section" v-if="inProgress">
        <h4>Round in progress:</h4>
        <p>{props.courseName}</p>
        <p><Button onClick={props.resumeHandler} bsStyle="primary">Resume Round</Button></p>

      </div>
  	)
  }
  return null
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
  componentDidMount() {


  };

  handleNewRound = () => {
    this.props.history.push('/new');
  };

  handleResume = () => {
    this.props.history.push('/play/' + (this.props.round.currentHole -1));
  };


  render() {
    return (
  		<div className="home">
    		<h1>DG Score</h1>

    		<Previous round={this.props.round} courseName={this.props.round.course.name} resumeHandler={this.handleResume}  />    

    		<NewRound newRoundHandler={this.handleNewRound}/>		
    	</div>

    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    round: state.round
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);


