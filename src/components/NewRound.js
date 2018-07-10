import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Col, Row } from 'react-bootstrap';


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
    };
      console.log(this.props)
  }



  handleAddPlayer = () => {
      this.props.history.push('/players');
  };

  handleSelectCourse = () =>  {
      this.props.history.push('/course');    
  }


  render() {
    return (
      <div className="newRound">

          <h2>New Round</h2>

          <Grid>
            <SectionPlayers players={this.props.players} addPlayerHandler={this.handleAddPlayer} />
            <SectionCourse courseName={this.props.courseName} selectCourseHandler={this.handleSelectCourse} />

        </Grid>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  players: state.newround.players,
  courseName: state.newround.course.name,
})

export default connect(mapStateToProps)(NewRound);

