import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col, Button, Alert, Modal } from 'react-bootstrap';
import ChartLine from '../components/ChartLine'



class Scorecard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showSaveModal: false,
        saveSuccess: false,
        saveFailed: false,
        saveModalButtonText: 'Save',
        wasSaved: false
    };

  }
  componentDidMount() {
  if(!this.props.players().length) {
    // invalid round, go back to home
    this.props.history.push('/')
  };
  };
  toHome = () => {
    this.props.history.push('/')
  };
  resume = () => {
    this.props.history.push('/play/' + (this.props.currentHole +1))
  };
  openSaveModal = () => {
    this.setState({showSaveModal: true})
  };
  closeSaveModal = () => {
    this.setState({showSaveModal: false})
  }; 
  resetWarnings = () => {
      this.setState({saveSuccess: false});
      this.setState({saveFailed: false});
  };  
  handleSave = () => {
    if(this.state.wasSaved) {
      this.resetWarnings();
      this.closeSaveModal();
      this.setState({saveModalButtonText: 'Save'});      
    } else {
      console.log('Save Round');
      try {
        let history = JSON.parse(window.localStorage.getItem('dgScoreHistory')) || [];
        history.push(this.props.round);
        window.localStorage.setItem('dgScoreHistory',JSON.stringify(history));
        this.setState({saveSuccess: true});
        this.setState({saveFailed: true});
        this.setState({wasSaved: true});
        this.props.finishRound();
      } 
      catch (e) {
        console.log('Error saving round to localStorage ' + e);
        this.setState({saveSuccess: false});
        this.setState({saveFailed: true});
      }
      this.setState({saveModalButtonText: 'Ok'});      
    }

  };


  render() {

    const playerRows =  this.props.players().map((item, index) => 
      <Row  key={index}>
      <Col md={2} className="player-name">{item.name}</Col>
      <Col md={10} className="grid">
        <ChartLine scores={item.scorecard} totals={item.score}></ChartLine>
      </Col>
      </Row>
    );


    const SaveAlert = () => {
      if(this.state.saveSuccess) {
        return (
          <Alert bsStyle="success">The round has been saved</Alert>
          )
      } else if (this.state.saveFailed) {
        return (
          <Alert bsStyle="danger">There was a problem saving the round!</Alert>
          )
      }
      return null
    };


    return (

          <div className="scorecard">

              <Grid className="header">
                <Row>
                <Col><div className="course-name">{this.props.course.name}</div>
                <div className="course-location">{this.props.course.city}, {this.props.course.state}</div>
                </Col>
              </Row>

              <Row>
                <Col><div className="date">{this.props.roundDate}</div></Col>
                <Col><div className="course-par">{this.props.course.holes} Holes - Par {this.props.coursePar()}</div></Col>
              </Row>
              </Grid>

              <Grid className="chart">
                  {playerRows}
              </Grid>


            <Grid className="fixed">
              <Row>
                <Col md={4}><Button onClick={this.toHome} bsStyle="link"  bsSize="lg">Home</Button></Col>
                <Col md={4} className="center-align"><Button onClick={this.resume}  bsStyle="link" bsSize="lg">Return</Button></Col>
                <Col md={4} className="right-align">
                  {!this.props.round.finished && 
                    <Button onClick={this.openSaveModal}  bsStyle="link" bsSize="lg">Save Round</Button>
                  }
                </Col>
                   
              </Row>
            </Grid>


            <Modal show={this.state.showSaveModal}>
              <Modal.Header>
                <Modal.Title>Save Round</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Verify the scorecard. After you save the round, you will no longer be able to edit it!</p>
                <SaveAlert />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeSaveModal} bsStyle="link">Cancel</Button>
                <Button bsStyle="primary" type="submit" onClick={this.handleSave}>{this.state.saveModalButtonText}</Button>
              </Modal.Footer>
            </Modal>   
          </div>
      );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    round: state.round,
    course: state.round.course,
    currentHole: state.round.currentHole,
    roundDate: new Date(state.round.startTime).toLocaleString(),
    coursePar: () => {
      let total = 0;
      for(let i = 0; i < state.round.course.holes; i++) {
        total += (state.round.course.par && state.round.course.par[i]) || state.prefs.defaultPar;
      }
      return total
    },
    players: () => { 
      return state.round.players.map( (item) => {
          let card = item.scorecard;
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
            item.score =  {'totalStrokes' : totalStrokes, 'currentPar' : currentPar, 'midRoundStrokes' : midRoundStrokes};
          } else {
            item.score = {'totalStrokes' : '-', 'currentPar' : '-', 'midRoundStrokes' : 0};          
          }
          return item;
      });    
    },
  }

};

const mapDispatchToProps = dispatch => {
  return {
    finishRound: () => {
      dispatch({type:'FINISH_ROUND', payload: null})      
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Scorecard);

