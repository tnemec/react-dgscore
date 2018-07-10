import React, { Component } from 'react';
import { connect } from 'react-redux'


// when the store state changes, update the local storage object

class LocalStore extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	loaded: false
    };
  }


  componentDidMount() {
  	let localState = window.localStorage.getItem('dg-score-rx-state');
  	if(localState && ! this.state.loaded) {
  		try {
  			this.setState({loaded: true})
	    	this.props.restoreState(JSON.parse(localState))  		
	    } catch(e) {
	    	console.log('Failed to load from localStorage: ' + e)
	    }
  	}

  }



	render() {

		if(this.state.loaded) {

			try {
				window.localStorage.setItem('dg-score-rx-state', JSON.stringify(this.props.appState));
				console.log('save to local')
			} catch(e) {
				console.log('Failed to save to localStorage: ' + e)
			}
		}


		return null;

	}

};


const mapStateToProps = (state, ownProps) => {
  return {
    appState: state
  }
};


const mapDispatchToProps = dispatch => {
  return {
    restoreState: (state) => {
      dispatch({type:'RESTORE_STATE', payload: state});
    }
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(LocalStore);