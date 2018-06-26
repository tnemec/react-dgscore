import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Col, Row } from 'react-bootstrap';





  const SectionPlayers = (props) => {

    const playerList = props.players.map((item) =><p key={item.uid}>{item.name}</p>);

    let addEditText = props.players.length ? 'Edit Players' : 'Add Players'

    return (
        <Row className="section">
          <Col md="3"><strong>Players:</strong></Col>
          <Col md="6">{playerList}</Col>
          <Col md="3"><Button click="selectPlayer" bsStyle="link" bsSize="lg" href="/players">{addEditText}</Button></Col>
        </Row>
    );
  };

  const SectionCourse = (props) => {

    return (
            <Row className="section">
              <Col md="3"><strong>Course:</strong></Col>
              <Col md="6"><p>{props.course.name}</p></Col>
              <Col md="3"><Button click="selectCourse" bsStyle="link" bsSize="lg" href="/course">Select Course</Button></Col>
            </Row>
    );
  };


class NewRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div className="newRound">

          <h2>New Round</h2>

          <Grid>
            <SectionPlayers players={this.props.players} />
            <SectionCourse course={this.props.course} />

        </Grid>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  players: state.round.players,
  course: state.round.course
})

export default connect(mapStateToProps)(NewRound);

