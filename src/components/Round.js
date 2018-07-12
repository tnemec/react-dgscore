import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';




class Round extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  handlePrev = () => {

  }





  render() {



    return (
  		<div className="round">

      <Grid className="header">
        <Row>
          <Col md={2}>
            if (this.state.hasPrev) {
            <div class="nav" onClick={handlePrev}>
              <Glyphicon glyph="angle-left" />
            </div>
            }
          </Col>
          <Col md={2}>
            <span class="hole-num">{this.props.round.currentHole +1}</span>
          </Col>
          <Col md={6}>
            <div class="course-name">{this.props.courseName}</div>
            <div class="hole-info">{this.props.holeInfo()}</div>            
          </Col>


        </Row>
      </Grid>



  <b-container class="header">
    <b-row  align-h="between">
      <b-col cols="2"><div @click.capture="prevPage" v-if="hasPrev" class="nav"><icon name="angle-left" scale="3" /></div></b-col>
      <b-col cols="2"><span class="hole-num">{{round.currentHole +1}}</span></b-col>
      <b-col cols="6">
        <div class="course-name">{{round.course.name}}</div>
        <div class="hole-info">{{holeInfo}}</div>
      </b-col>
      <b-col cols="2" class="align-right">
        <div @click.capturet="nextPage" v-if="hasNext"  class="nav"><icon name="angle-right" scale="3"  /></div>
        <div @click.capturet="finish" v-if="round.currentHole +1 == round.course.holes"  class="nav"><icon name="check" scale="3"  />
        </div>
      </b-col>
    </b-row>
  </b-container>      

    	</div>

    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  players: state.newround.players,
  courseName: state.newround.course.name,
  round: state.round,
  holes: state.newround.course.holes || 18,
  holeInfo: () => {
    let data = this.$store.getters.holeData();
    let par = 'Par ' + data.par + ' - ';
    let dist = data.dist + ' ft.';
    return  par + dist
  }
});

const mapDispatchToProps = dispatch => {
  return {
    startRound: (hole) => {
      dispatch({type:'START_ROUND', payload: hole});
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Round);

