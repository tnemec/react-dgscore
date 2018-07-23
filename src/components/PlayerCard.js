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
  subStroke = (props) => {
    if(this.props.played && ! this.props.unlockEdit) {
      this.props.openModal();
    } else {
      let payload = {
        player: props.player.uid,
        hole: props.hole,
        strokes: Math.max(props.currentStrokes -1, 1)
      }
      props.setStrokes(payload) 
    }
  };
  addStroke = (props) => {
    if(this.props.played && ! this.props.unlockEdit) {
      this.props.openModal();
    } else {
      let payload = {
        player: props.player.uid,
        hole: props.hole,
        strokes: Math.min(props.currentStrokes + 1, props.strokesLimit)
      }
      props.setStrokes(payload)  
    }   
  };



  render() {


    return (

        <div className="player-card">
          <div className="label-bar">
            <div className="player-label">{this.props.player.name}</div>
            <div className="round-score-label">Current Score</div>
            <div className="round-score-value">{this.props.score().totalStrokes}</div>
            <div className="round-par-value">{this.props.score().currentPar}</div>
          </div>
          <div className="player-grid">
            <div className="player-picture"></div>
            <div className="strokes" className={this.props.played ?  'played strokes' : 'strokes' }>
              <div className="strokes-label">Strokes</div>
              <div className="minus" onClick={() => this.subStroke(this.props)}>
                <Glyphicon glyph="minus-sign" scale="2" />
              </div>
              <div className="stroke-value" >{this.props.currentStrokes}</div>
              <div  className="plus" onClick={() => this.addStroke(this.props)}>
                <Glyphicon glyph="plus-sign" scale="2" />
              </div>
            </div>
          </div>
          <div className="extras-bar"></div>
          <ChartLine scores={this.props.player.scorecard} totals={this.props.score}></ChartLine>

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
    currentStrokes : Math.max(ownProps.player.scorecard[ownProps.hole].s || ownProps.par, 0),
    played: state.round.holesPlayed.indexOf(ownProps.hole) != -1,
    strokesLimit: state.prefs.strokeLimit,
    score: () => {
      let card = ownProps.player.scorecard;

      if(card) {
        let totalStrokes = 0;
        let midRoundStrokes = 0;
        let currentPar = 0;
        for(let i = 0; i < card.length; i++ ){
          if(card[i] && card[i].s != undefined && card[i].s != 0) {
            totalStrokes +=  card[i].s;
            let par = (state.round.course.par && state.round.course.par[i]) || state.prefs.defaultPar;
            currentPar +=  (card[i].s - par);
            if(i < Math.floor(state.round.course.holes/2)) {
              // calculate the mid round total
              midRoundStrokes +=  card[i].s;
            }
          } 
        }
        currentPar = (currentPar > 0) ? '+' + currentPar: currentPar;
        currentPar = (currentPar == 0) ? 'E' : currentPar;
        return {'totalStrokes' : totalStrokes, 'currentPar' : currentPar, 'midRoundStrokes' : midRoundStrokes};
      }
      return {'totalStrokes' : '-', 'currentPar' : '-', 'midRoundStrokes' : 0};
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setStrokes: (payload) => {
      dispatch({type:'SET_STROKES', payload: payload});
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayerCard);

