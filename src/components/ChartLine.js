import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';




class ChartLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

  }


  cls = (props,item) => {
    let par = (props.coursePar && props.coursePar[props.currentHole]) || props.defaultPar
    let str = 's' + item.s + ' p' + par
    if(item.p) {
      str += ' pn'
    }
    return str
  }

  render() {


   const MidRoundTotal = (props) => {
      if(props.index == props.totals.midpoint && props.totals.midRoundStrokes) {
        return <div className="total"><b>{props.totals.midRoundStrokes}</b></div>
      }
      return null;
    }

    const Total = (props) => {
      if(props.index == props.totals.holes -1) {
        return <div className="total"><b>{props.totals.totalStrokes}</b></div>
      }
      return null;
    }

    const ScoreBox = (props) => {
        return props.scores.map( (item, index) => 
        <div  key={index} className={(props.currentHole == index) ? 'cur' : ''}>
          <div><b className={this.cls(props,item)}>{ (item.s != 0) ? item.s : '-' }</b></div>
          <MidRoundTotal index={index} totals={props.totals} />
          <Total index={index} totals={props.totals} />
        </div>
        );
    };


    return (

          <div className="score-chart">
            <ScoreBox scores={this.props.scores} currentHole={this.props.currentHole} totals={this.props.totals} coursePar={this.props.coursePar} defaultPar={this.props.defaultPar} />
            <div className="par-calc"><div><b>{this.props.totals.currentPar}</b></div></div>
          </div>
      );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    totals : Object.assign({}, ownProps.totals, {midpoint: Math.floor(state.round.course.holes/2) - 1, holes: state.round.course.holes}),
    currentHole : state.round.currentHole,
    coursePar: state.round.course.par,
    defaultPar: state.prefs.defaultPar
  }

};



export default connect(mapStateToProps)(ChartLine);

