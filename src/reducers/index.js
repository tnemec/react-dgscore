

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
	]
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEWROUND_PLAYERS': // replace newround.players array
    	let newRound = Object.assign({}, state.newround, {players: action.payload});
    	return Object.assign({}, state, { newround : newRound });

    case 'SAVE_PLAYER': // add player to saved players list
    	return Object.assign({}, state, {savedPlayers: state.savedPlayers.concat(action.payload)});

    default:
    	return state
  }
}