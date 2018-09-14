import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Col, Row, ListGroup, ListGroupItem, Modal, Form, ControlLabel, FormGroup, FormControl, Glyphicon, Checkbox  } from 'react-bootstrap';

import localCourses from '../utilities/localCourses.js';

import constants from '../utilities/constants.js';



class NewCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCourse: {
        "name": "",
        "state": "",
        "city": "",
        "holes": 18,
        "defaultPar": 3,
        "notes": "",
        "holeData": []
      }
    };
  
  }

    totalPar = () => {
      let total = 0;
      if (this.state.newCourse.holeData.length) {
        total = this.state.newCourse.holeData.reduce((acc, item) => {
          acc + (item.p || this.state.newCourse.defaultPar);
        });
      } else {
        total = this.state.newCourse.holes * this.state.newCourse.defaultPar
      }
      return 'Total Par: ' + total;
    }

    handleBack = () => {
      this.props.history.push('/course');
    };
    handleSave = (evt) => {
      evt.preventDefault();

    };
    handleFormChange = (evt) => {
      evt.preventDefault();
      if(evt.target.name === 'useHoleData') {
        console.log(evt.target.checked)
        this.setState({useHoleData: evt.target.checked})
      } else {
        let newCourse = Object.assign({}, this.state.newCourse, { [evt.target.name] : evt.target.value});
        let newState = Object.assign({}, this.state, {newCourse: newCourse});
        this.setState(newState);  
      }

    };


    stateOptionsList = () => {
      let output = [];
      Object.keys(constants.stateList).forEach((key) => 
        output.push(<option value={key} key={key}>{constants.stateList[key]}</option>)
      )
      return output
    }

    holeDataList = () => {
      if(!this.state.newCourse.holeData.length) {
        return Array.from(Array(this.state.newCourse.holes).keys()).map(num =>
          <tr><td>{num+1}</td><td>{this.state.newCourse.defaultPar}</td><td></td></tr>
        )          
      } else {
        return this.state.newCourse.holeData.map((item, index) => 
          <tr><td>{item.n || index}</td><td>{item.p || this.state.newCourse.defaultPar}</td><td>{item.d || ''}</td></tr>
        )        
      }

    }



  render() {



    return (
      <div className="new-course">
        <Form onSubmit={this.handleSave}>
          <Grid>
            <Row>
              <Col md={12}><h3>New Course</h3></Col>  
            </Row>
            

                <FormGroup controlId="name">
                  <ControlLabel>Course Name</ControlLabel>
                  <FormControl name="name" type="text" value={this.state.newCourse.name} onChange={this.handleFormChange} />
                </FormGroup>

            <Row>
              <Col md={7}>
                <FormGroup controlId="city">
                  <ControlLabel>City</ControlLabel>
                  <FormControl name="city" type="text" value={this.state.newCourse.city} onChange={this.handleFormChange} />
                </FormGroup>  
              </Col>
              <Col md={5}>

                <FormGroup controlId="state">
                  <ControlLabel>State</ControlLabel>
                  <FormControl name="state" componentClass="select" value={this.state.newCourse.state} onChange={this.handleFormChange}>
                    {this.stateOptionsList()}
                  </FormControl>
                </FormGroup>       
              </Col>

            </Row>

            <Row>
              <Col md={4}>
               <FormGroup controlId="holes">
                  <ControlLabel>Holes</ControlLabel>
                  <FormControl name="holes" type="number" value={this.state.newCourse.holes} onChange={this.handleFormChange} />
                </FormGroup>               
              </Col>
              <Col md={4}>
               <FormGroup controlId="par">
                  <ControlLabel>Default Par</ControlLabel>
                  <FormControl name="par" type="number" value={this.state.newCourse.defaultPar} onChange={this.handleFormChange} />
                </FormGroup>  
              </Col>
              <Col md={4}>
                  <div className="total-par">
                    {this.totalPar()}
                  </div>
              </Col>
            </Row>

            <hr className="divider"></hr>

            <div className="hole-data-inst">
              Every hole will be the Default Par, or, you can enter individual values for each hole below.<br/><br/>
              You can also enter hole values as you play a round.
            </div>


            <Checkbox name="useHoleData" value={this.state.useHoleData} onChange={this.handleFormChange}>Use individual values</Checkbox>


            {this.state.useHoleData && this.holeDataList && 

              <div className="individual-values">
                <table>
                <tbody>
                  <tr>
                    <th>Hole</th>
                    <th>Par</th>
                    <th>Distance (ft.)</th>
                  </tr>

                  {this.holeDataList()}
                  </tbody>
                </table>
              </div>
            }


            
          </Grid>
        </Form>

        <Grid className="fixed">
          <Row>
            <Col md={6}>
              <div className="left-align"><Button size="lg" bsStyle="link" onClick={this.handleBack}>Cancel</Button></div>
            </Col>
            <Col md={6}>
              <div className="right-align"><Button size="lg" bsStyle="primary" onClick={this.handleSave}>Done</Button></div>
            </Col>
          </Row>
        </Grid>



      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    select: (course) => {
      dispatch({type:'SELECT_COURSE', payload: course});
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewCourse);

