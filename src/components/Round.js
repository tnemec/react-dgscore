import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col, Glyphicon, Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router'

import PlayerCard from '../components/PlayerCard'


class Round extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHole: 0,
      unlockEdit: false,
      showEditModal: false,
      showFinishModal: false
    };



  }
  componentDidMount() {
    if(!this.props.players.length) {
      // invalid round, go back to home
      this.props.history.push('/')
    }
    const holeIndex = parseInt(this.props.match.params.hole) -1;
    if(holeIndex != undefined && ! Number.isNaN(holeIndex) && holeIndex != this.props.round.currentHole) {
      this.setState({currentHole: holeIndex})
      this.props.viewHole(holeIndex)   
    } else {
      this.setState({currentHole: this.props.round.currentHole})
    }
  };

  handlePrev = () => {
    let nextHoleNum = Math.max(this.state.currentHole -1, 0)
    this.setState({currentHole: nextHoleNum});
    this.props.viewHole(nextHoleNum)
    this.props.history.push('/play/' + (nextHoleNum +1) );
    this.lock();
  };
  handleNext = () => {
    let nextHoleNum = Math.min(this.state.currentHole +1, this.props.holes);
    this.setState({currentHole: nextHoleNum});
    if(!this.props.round.finished) {
      this.props.setDefaultStrokes(this.state.currentHole);
    }
    this.props.viewHole(nextHoleNum)
    this.props.history.push('/play/' + (nextHoleNum +1) );
    this.lock();
  }; 
  toHome = () => {
    this.props.history.push('/')
  };
  viewScorecard = () => {
      this.props.history.push('/scorecard')
  };  
  handleFinish = () => {
      this.props.finishRound();
      this.handleFinishClose();
      this.props.history.push('/scorecard')
  };

  unlock = () => {
    this.setState({unlockEdit: true});
    this.handleEditClose();
  };
  lock = () => {
    this.setState({unlockEdit: false});
  };
  openEditModal = () => {
    this.setState({showEditModal: true})
  };
  handleEditClose = () => {
    this.setState({showEditModal: false})
  };
  openFinishModal = () => {
    this.setState({showFinishModal: true})
  };
  handleFinishClose = () => {
    this.setState({showFinishModal: false})
  };


  render() {

    if(! this.props.round.started) {
      return <Redirect to="/" />
    }

    const Prev = () => {
      if (this.state.currentHole -1 >= 0) {
        return (
          <div className="nav" onClick={this.handlePrev}>
            <Glyphicon glyph="menu-left" />
          </div>
          )
      }    
      return null  
    };
    const Next = () => {
      if(this.state.currentHole + 1 < this.props.holes) {
        return (
        <div onClick={this.handleNext} className="nav align-right"><Glyphicon glyph="menu-right"  /></div>
        )
      }
      return null
    };
    const Finish = () => {
      if(this.state.currentHole +1 == this.props.holes) {
        return (
        <div onClick={this.openFinishModal} className="nav"><Glyphicon glyph="check"   /></div>
        )
      }  
      return null    
    }

    const playerCards =  this.props.players.map((item) => 
      <PlayerCard player={item} par={this.props.holeData(this.state.currentHole).par} index={0} hole={this.props.round.currentHole} key={item.uid} openModal={this.openEditModal} unlockEdit={this.state.unlockEdit} />
    );


    return (
  		<div className="round">

        <Grid className="header">
          <Row>
            <Col md={2}>
              <Prev />
            </Col>
            <Col md={2}>
              <span className="hole-num">{this.state.currentHole +1}</span>
            </Col>
            <Col md={6}>
              <div className="course-name">{this.props.courseName}</div>
              <div className="hole-info">{this.props.holeInfo(this.props.holeData(this.state.currentHole))}</div>           
            </Col>
            <Col md={2}>
              <Next />
              <Finish />
            </Col>

          </Row>
        </Grid>    

        {playerCards}


  <Grid className="fixed">
    <Row>
      <Col md={6}><Button onClick={this.toHome} bsStyle="link" bsSize="lg">Home</Button></Col>
      <Col md={6} className="right-align"><Button onClick={this.viewScorecard} bsStyle="link"  bsSize="lg">View Scorecard</Button></Col>
    </Row>
  </Grid>


          <Modal show={this.state.showEditModal}>
            <Modal.Header>
              <Modal.Title>Edit Score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              This hole has been played. Do you want to edit the score?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleEditClose} bsStyle="link">Cancel</Button>
              <Button bsStyle="primary" type="submit" onClick={this.unlock}>OK</Button>
            </Modal.Footer>
          </Modal>


          <Modal show={this.state.showFinishModal}>
            <Modal.Header>
              <Modal.Title>Finish Round</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You can continue to edit after you finish the round.
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleFinishClose} bsStyle="link">Cancel</Button>
              <Button bsStyle="primary" type="submit" onClick={this.handleFinish}>View Scorecard</Button>
            </Modal.Footer>
          </Modal>          


    	</div>

    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  players: state.round.players || [{name: 'null'}],
  courseName: state.round.course.name,
  round: state.round,
  holes: state.round.course.holes || 18,
  holeData: (i) => {
    if(i == undefined) {
      i = this.currentHole;
    }
    let holeData = state.round.course.holeData;
    return {
      num: (holeData && holeData[i] && holeData[i].n) || i +1,
      dist: (holeData && holeData[i] && holeData[i].d) || '',
      par: (holeData && holeData[i] && holeData[i].p) || state.prefs.defaultPar
    }
  },
  holeInfo: (data) => {
    let par = 'Par ' + data.par + ' - ';
    let dist = data.dist + ' ft.';
    return  par + dist
  }
});

const mapDispatchToProps = dispatch => {
  return {
    viewHole: (hole) => {
      dispatch({type:'VIEW_HOLE', payload: hole});
    },
    setDefaultStrokes: (hole) => {
      dispatch({type:'SET_DEFAULT_STROKES', payload: hole})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Round);

