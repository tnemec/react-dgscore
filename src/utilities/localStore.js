import React, { Component } from 'react';
import { connect } from 'react-redux'


// when the store state changes, update the local storage object

class LocalStore extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    let localState = window.localStorage.getItem('dg-score-rx-state');
    if(localState && ! this.props.loaded) {
      try {
        console.log('load from local')
        this.props.restoreState(JSON.parse(localState))     
      } catch(e) {
        console.log('Failed to load from localStorage: ' + e);
        window.localStorage.removeItem('dg-score-rx-state');
      }
    }    
  }


  componentDidMount() {


  }



	render() {

			try {
				window.localStorage.setItem('dg-score-rx-state', JSON.stringify(this.props.appState));
				console.log('save to local')
			} catch(e) {
				console.log('Failed to save to localStorage: ' + e)
			}


		return null;

	}

};


const mapStateToProps = (state, ownProps) => {
  return {
    loaded: state.loadedState,
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