import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Col, Row, ListGroup, ListGroupItem, Modal, Form, ControlLabel, FormGroup, FormControl, Glyphicon  } from 'react-bootstrap';

import localCourses from '../utilities/localCourses.js'





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


    handleBack = () => {
      this.props.history.push('/course');
    };
    handleSave = (evt) => {
      evt.preventDefault();



    };
    handleFormChange = (evt) => {

    };


   stateList = {
    "": "<Select One>",
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
    };


    stateOptions = () => {
      let output = [];
      Object.keys(this.stateList).forEach((key) => 
        output.push(<option value={key} key={key}>{this.stateList[key]}</option>)
      )
      return output
    }



  render() {

console.log(this.stateOptions())


    return (
      <div>
        <Grid>
          <Row>
            <Col md={2}></Col>
            <Col md={8}><h3>New Course</h3></Col>
            <Col md={2} className="right-align">
              <div className="add-player" onClick={this.handleAdd} title="Add Course"><Glyphicon glyph="plus-sign" /></div>
              </Col>
          </Row>
          <Form onSubmit={this.handleSave}>

              <FormGroup controlId="name">
                <ControlLabel>Course Name</ControlLabel>
                <FormControl name="name" type="text" value={this.state.newCourse.name} onChange={this.handleFormChange} />
              </FormGroup>

              <FormGroup controlId="city">
                <ControlLabel>City</ControlLabel>
                <FormControl name="city" type="text" value={this.state.newCourse.city} onChange={this.handleFormChange} />
              </FormGroup>  

              <FormGroup controlId="state">
                <ControlLabel>State</ControlLabel>
                <FormControl name="state" componentClass="select" value={this.state.newCourse.state} onChange={this.handleFormChange}>
                  {this.stateOptions()}
                </FormControl>
              </FormGroup>                            


          </Form>
        </Grid>

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

