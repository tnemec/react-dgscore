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
      showModal: false
    };



  }
  componentDidMount() {
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
    this.props.setDefaultStrokes(this.state.currentHole)
    this.props.viewHole(nextHoleNum)
    this.props.history.push('/play/' + (nextHoleNum +1) );
    this.lock();
  };  
  handleFinish = () => {

  };


  unlock = () => {
    this.setState({unlockEdit: true});
    this.handleClose();
  };
  lock = () => {
    this.setState({unlockEdit: false});
  };
  openModal = () => {
    this.setState({showModal: true})
  };
  handleClose = () => {
    this.setState({showModal: false})
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
        <div onClick={this.handleFinish} className="nav"><Glyphicon glyph="check"   /></div>
        )
      }  
      return null    
    }

    const playerCards =  this.props.players.map((item) => 
      <PlayerCard player={item} par={this.props.holeData(this.state.currentHole).par} index={0} hole={this.props.round.currentHole} key={item.uid} openModal={this.openModal} unlockEdit={this.state.unlockEdit} />
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


          <Modal show={this.state.showModal}>
            <Modal.Header>
              <Modal.Title>Edit Score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              This hole has been played. Do you want to edit the score?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose} bsStyle="link">Cancel</Button>
              <Button bsStyle="primary" type="submit" onClick={this.unlock}>OK</Button>
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
    return {
      num: (state.round.course.num && state.round.course.num[i]) || i +1,
      dist: (state.round.course.dist && state.round.course.dist[i]) || '',
      par: (state.round.course.par && state.round.course.par[i]) || state.prefs.defaultPar
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

