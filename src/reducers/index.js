

const initialState = {
  	prefs: {
  		defaultPar: 3,
  		maxPlayers : 6,
		strokeLimit : 9,
  	},
    user : {
    	name: 'Tony', uid: 100, img: '', icon: ''
    },
    round : {
    	started: false,
    	finished: false,
    	startTime: '',
    	finishTime: '',
    	course: {},
    	startingHole: 0,
    	currentHole: 0,
    	players: [
    	],
    	holesPlayed: []

    },
    newround : {
    	course: {},
    	players: []
    },
    savedPlayers : [
		{name: 'Steve', uid: 101, img: '', icon: ''}, 
		{name: 'Andrew', uid: 102, img: '', icon: ''}, 
	],
	tempPlayers : []
};



export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}