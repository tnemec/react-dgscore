import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';




class Round extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHole: 0
    };

  }
  componentDidMount() {
    const holeIndex = parseInt(this.props.match.params.hole) -1;
    if(holeIndex != undefined && ! Number.isNaN(holeIndex)) {
      this.setState({currentHole: holeIndex})
      this.props.viewHole(holeIndex)   
    }

  };

  handlePrev = () => {

  };
  handleNext = () => {

  };  
  handleFinish = () => {

  };




  render() {

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

    	</div>

    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  players: state.round.players,
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
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Round);

