import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Button, Grid, Col, Row, Form, ControlLabel, FormGroup, FormControl  } from 'react-bootstrap';

  const SectionPlayers = (props) => {

    const playerList = props.players.map((item) =><p key={item.uid}>{item.name}</p>);

    let addEditText = props.players.length ? 'Edit Players' : 'Add Players'

    return (
        <Row className="section">
          <Col md={3}><strong>Players:</strong></Col>
          <Col md={6} className="player-list">{playerList}</Col>
          <Col md={3}><Button onClick={props.addPlayerHandler} bsStyle="link" bsSize="lg">{addEditText}</Button></Col>
        </Row>
    );
  };

  const SectionCourse = (props) => {

    return (
            <Row className="section">
              <Col md={3}><strong>Course:</strong></Col>
              <Col md={6} className="course-name"><p>{props.courseName}</p></Col>
              <Col md={3}><Button onClick={props.selectCourseHandler} bsStyle="link" bsSize="lg" >Select Course</Button></Col>
            </Row>
    );
  };


class NewRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingHole: 1
    };
  }



  handleAddPlayer = () => {
      this.props.history.push('/players');
  };
  handleSelectCourse = () =>  {
      this.props.history.push('/course');    
  };
  handleCancel = () => {
      this.props.history.push('/');        
  };
  handleFormChange = (evt) => {
    this.setState({startingHole: evt.target.value})
  };
  handleStartRound = () => {
    if(this.isReady(this.props)) {
      this.props.startRound(this.state.startingHole - 1);
      this.props.history.push('/play');         
    }
  };
  isReady = (props) => {
    return props.courseName && props.players.length
  }


  render() {
    return (
      <div className="newRound">

          <h2>New Round</h2>

          <Grid>
            <SectionPlayers players={this.props.players} addPlayerHandler={this.handleAddPlayer} />
            <SectionCourse courseName={this.props.courseName} selectCourseHandler={this.handleSelectCourse} />

          </Grid>


          <Grid>
            <Row className="section">
              <Col>
                  <Form>
                    <FormGroup className="starting-hole">
                      <ControlLabel>Starting Hole:</ControlLabel>
                      <FormControl name="startingHole" type="text" value={this.state.startingHole} onChange={this.handleFormChange} type="number" min="1" max={this.props.holes} />

                    </FormGroup>
                  </Form>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button onClick={this.handleCancel} bsStyle="link" bsSize="large">Cancel</Button>
              </Col>
              <Col md={6}>
                <Button onClick={this.handleStartRound} bsStyle="primary" disabled={!this.isReady(this.props)}>Start Round</Button>
              </Col>              
            </Row>

          </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  players: state.newround.players,
  courseName: state.newround.course.name,
  holes: state.newround.course.holes || 18
});

const mapDispatchToProps = dispatch => {
  return {
    startRound: (hole) => {
      dispatch({type:'START_ROUND', payload: hole});
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewRound);

