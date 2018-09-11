

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
	let newCourses = savedCourses.concat(course);
	let status = false;
	try {
		window.localStorage.setItem('dg-score-saved-courses', JSON.stringify(newCourses));
		status = true;
	} catch(e) {
		console.log('Failed to save course ' + e);
	}
	return {status: status, courses: getCourseList()}
}


export default {
	getCourseList,
	saveCourse
}