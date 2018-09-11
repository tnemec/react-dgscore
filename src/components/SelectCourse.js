import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Col, Row, ListGroup, ListGroupItem, Modal, Form, ControlLabel, FormGroup, FormControl, Glyphicon  } from 'react-bootstrap';


import localCourses from '../utilities/localCourses.js'



const CourseList = (props) => {
  let savedCourses = localCourses.getCourseList();
  if(Array.isArray(savedCourses)) {
    return savedCourses.map((item, index) => 
      <ListGroupItem  key={item.uuid} onClick={() => props.handleSelectCourse(item)}>{item.name}</ListGroupItem>
    );
  }
  return null
}


class SelectCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  
  }


    handleBack = () => {
      this.props.history.push('/new');
    };
    handleAdd = () => {
      this.props.history.push('/addcourse');
    };
    handleSelectCourse = (course) => {
      this.props.select(course);
      this.props.history.push('/new');
    };


  

  render() {



    return (
      <div>
        <Grid>
          <Row>
            <Col md={2}></Col>
            <Col md={8}><h3>Select Course</h3></Col>
            <Col md={2} className="right-align">
              <div className="add-player" onClick={this.handleAdd} title="Add Course"><Glyphicon glyph="plus-sign" /></div>
              </Col>
          </Row>
        </Grid>

        <ListGroup>
          <CourseList savedCourses={this.props.savedCourses} handleSelectCourse={this.handleSelectCourse} /> 
        </ListGroup>

        <Grid className="fixed">
          <Row>
            <div className="right-align"><Button size="lg" bsStyle="link" onClick={this.handleBack}>Back</Button></div>
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


export default connect(mapStateToProps, mapDispatchToProps)(SelectCourse);

