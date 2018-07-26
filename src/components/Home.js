import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Col, Row, Glyphicon } from 'react-bootstrap';
import moment from 'moment'



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
      prevRounds: [],
      round: {
      	course: {
      		name : 'Test Name'
      	}
      }
    };

  }
  componentDidMount() {
    const history = this.getHistory();
    if(history && history.length) {
      // use last 5, sorted by latest first
      this.setState({prevRounds: history.reverse().slice(0,5)});
    }

  };

  handleNewRound = () => {
    this.props.history.push('/new');
  };

  handleResume = () => {
    this.props.history.push('/play/' + (this.props.round.currentHole -1));
  };

  formatDate = (str) => {
    return moment(str).format('MMM Do, YYYY')
  };

  getHistory = () => {
    if(window.localStorage && window.localStorage.dgScoreHistory) {
      try {
        return JSON.parse(window.localStorage.getItem('dgScoreHistory'))
      } 
      catch (e) {
          console.log('Could not get history data from local storage')
      }
    }
    return undefined
  };


  render() {

    const PrevRounds = () => {
      if(this.state.prevRounds.length) {

        const list = this.state.prevRounds.map( (item) => {
          if(item) {
            return (
              <li key={item.startTime}>
                <Grid><Row>
                  <Col md={6}>{item.course.name}</Col>
                  <Col md={6}>{this.formatDate(item.startTime)} <Glyphicon glyph="eye-open" /></Col>
                  </Row></Grid>
                </li>
            )
          }
        });

        return (
          <div className="section">
            <h4>Previous Rounds:</h4>
            <ul className="prev-round-list">
              {list}
            </ul>
          </div>
        )
      }
      return null
    }

    return (
  		<div className="home">
    		<h1>DG Score</h1>

    		<Previous round={this.props.round} courseName={this.props.round.course.name} resumeHandler={this.handleResume}  />  

        <PrevRounds />  

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


