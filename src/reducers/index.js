

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
    case 'RESTORE_STATE' : // restore state from localStorage
    	return action.payload

    case 'NEWROUND_PLAYERS': // replace newround.players array
    	let newround = Object.assign({}, state.newround, {players: action.payload});
    	return Object.assign({}, state, { newround : newround });

    case 'SAVE_PLAYER': // add player to saved players list
    	return Object.assign({}, state, {savedPlayers: state.savedPlayers.concat(action.payload)});

    case 'SELECT_COURSE': // add player to saved players list
    	newround = Object.assign({}, state.newround, {course: action.payload});
    	return Object.assign({}, state, { newround : newround });

    case 'START_ROUND':  // payload is the starting hole index
		// reset scorecards
		let players = state.newround.players.slice(0);
		for(let player of players) {
			let ar = new Array(state.newround.course.holes);
			for(let i = 0; i < ar.length; i++) {
				ar[i] = {s:0}
			}
			player.scorecard = ar;
		}    
    	let round = Object.assign({}, state, {
    		course: state.newround.course,
    		players: players,
			finished: false,
			started: true,
			startTime: new Date(),
			currentHole: action.payload
    	});
    	newround = Object.assign({}, state.newround, {course: {}, players: []});
    	return Object.assign({}, state, { newround : newround, round: round });
    case 'VIEW_HOLE' : // changes the current hole
        const holeIndex = action.payload;
        console.log(holeIndex)
        if(Number.isNaN(holeIndex)) {
            round = Object.assign({}, state, {currentHole: 0})
        } else {
            round = Object.assign({}, state, {currentHole: Math.max(0, Math.min(holeIndex, state.round.course.holes))})            
        }
        return Object.assign({}, state, { round: round });

    default:
    	return state
  }
}