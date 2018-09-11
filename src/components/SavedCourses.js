import React, { Component } from 'react';
import { connect } from 'react-redux'


class SavedCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  
  }


  componentDidMount() {



  }


  const CourseList = (props) => {
    return props.savedCourses.map((item, index) => 
      <ListGroupItem  key={item.uuid} onClick={() => props.handleSelectCourse(item)}>{item.name}</ListGroupItem>
    );
  }



  render() {


    return (
      <div>


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

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedCourses);

