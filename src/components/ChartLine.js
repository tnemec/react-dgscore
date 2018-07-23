import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';




class ChartLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

  }


  cls = (props,item,index) => {
    let str = 's' + item.s + ' p' + props.hole.par;
    if(item.p) {
      str += ' pn'
    }

    return str
  }






  render() {


   const MidRoundTotal = (props) => {
      if(props.index == props.totals.midpoint && props.totals.midRoundStroke) {
        return <div className="total"><b>{props.totals.midRoundStrokes}</b></div>
      }
      return null;
    }

    const Total = (props) => {
      if(props.index == props.totals.holes -1) {
        return <div className="total"><b>{props.totals.totalStrokes}</b></div>
      }

    }

    const ScoreBox = (props) => {
        props.scores.map( (item, index) => {
        return (
              <div  key={index} className={(props.currentHole == index) ? 'cur' : ''}>
                <div><b className="cls(this.props,item,index)">{ (item.s != 0) ? item.s : '-' }</b></div>
                <MidRoundTotal index={index} totals={props.totals} />
                <Total index={index} totals={props.totals} />
              </div>
          )
      });
      return null
    }


    return (

          <div className="score-chart">
            <ScoreBox scores={this.props.scores} currentHole={this.props.currentHole} totals={this.props.totals} />
            <div className="par-calc"><div><b>{this.props.totals.currentPar}</b></div></div>
          </div>
      );
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    totals : Object.assign({}, ownProps.totals, {midpoint: Math.floor(state.round.course.holes/2) - 1, holes: state.round.course.holes}),
    currentHole : state.round.currentHole
  }

};



export default connect(mapStateToProps)(ChartLine);

