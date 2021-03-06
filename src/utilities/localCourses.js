

const genericCourses = [
  {
      "name": "Generic 9 Holes",
      "holes": 9,
      "defaultPar": 3,
      "uuid": "0",
      "generic": true
  },
  {
      "name": "Generic 18 Holes",
      "holes": 18,
      "defaultPar": 3,
      "uuid": "1",
      "generic": true
  }
];


const getSavedCourses = () => {
    let localState = window.localStorage.getItem('dg-score-saved-courses');
    if(localState) {
      try {
        return  JSON.parse(localState);
      } catch(e) {
        console.log('Failed to load from localStorage: ' + e);
        //window.localStorage.removeItem('dg-score-saved-courses');
      }
    }   
}

const getCourseList = () => {
	let savedCourses = getSavedCourses();
	if(savedCourses) {
		return  genericCourses.concat(savedCourses);
	}
	return genericCourses
}


const saveCourse = (course) => {
	let savedCourses = getSavedCourses() || [];
  course.name = (course.name.length) ? course.name : 'Untitled';
	let newCourses = savedCourses.concat(course);
	let status = false;
	try {
		window.localStorage.setItem('dg-score-saved-courses', JSON.stringify(newCourses));
		status = true;
    console.log('saved new course')
	} catch(e) {
		console.log('Failed to save course ' + e);
	}
	return {status: status, courses: getCourseList()}
}

const coursePar = (course) => {
  if(course.holeData && course.holeData.length) {
    return course.holeData.reduce( (tot, obj) => { return tot + (obj.p)}, 0)
  } else {
    return course.holes * course.defaultPar;
  }
}


export default {
	getCourseList,
	saveCourse,
  coursePar
}