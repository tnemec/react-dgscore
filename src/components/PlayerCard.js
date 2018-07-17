import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import ChartLine from '../components/ChartLine'




class PlayerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  componentDidMount() {


  };
  subStroke = () => {

  };
  addStroke = () => {

  }


  render() {


    return (

        <div className="player-card">
          <div className="label-bar">
            <div className="player-label">{this.props.player.name}</div>
            <div className="round-score-label">Current Score</div>
            <div className="round-score-value">{this.props.score.totalStrokes}</div>
            <div className="round-par-value">{this.props.score.currentPar}</div>
          </div>
          <div className="player-grid">
            <div className="player-picture"></div>
            <div className="strokes" className={this.props.played ?  'played strokes' : 'strokes' }>
              <div className="strokes-label">Strokes</div>
              <div className="minus" onClick={this.subStroke}>
                <Glyphicon glyph="minus-sign" scale="2" />
              </div>
              <div className="stroke-value" >{this.props.currentStrokes}</div>
              <div  className="plus" onClick={this.addStroke}>
                <Glyphicon glyph="plus-sign" scale="2" />
              </div>
            </div>
          </div>
          <div className="extras-bar"></div>
            <ChartLine scores="player.scorecard" totals="score"></ChartLine>



        </div>
    );
  }
}

/*

          <b-modal ref="warning" size="sm" ok-title="Edit Score" @ok="unlock">
            This hole has been played. Do you want to edit the score?
          </b-modal>

*/


const mapStateToProps = (state, ownProps) => {

  return {
    score: {
      totalStrokes: 0,
      currentPar: 0
    },
    currentStrokes : 0,
    played: state.round.holesPlayed.indexOf(ownProps.hole) != -1 
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayerCard);

