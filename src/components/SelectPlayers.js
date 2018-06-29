import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Col, Row, ListGroup, ListGroupItem, Modal, Form, ControlLabel, FormGroup, FormControl  } from 'react-bootstrap';



/*


  <b-list-group>
    <b-list-group-item v-for="(item, index) in savedPlayers" @click="selectPlayer(index)" class="clickable" :key="index" :active="isSelected(item)"><icon name="check" v-if="isSelected(item)" /> {{item.name}}</b-list-group-item>
  </b-list-group>

  <b-container class="fixed">
    <b-row>
      <b-col><b-button size="lg" variant="link" @click="back">Back</b-button></b-col>
      <b-col style="text-align:right"><b-button size="lg" variant="primary" @click="done">Done</b-button></b-col>
    </b-row>
  </b-container>

  <b-modal ref="newPlayer" title="New Player" @ok="addPlayer" ok-title="Add">
    <b-form>
      <b-form-group label="Name" label-for="playerName">
        <b-form-input id="playerName" v-model="newPlayerName"/>
      </b-form-group>
    </b-form>
  </b-modal>

*/

class SelectPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempPlayers : [],
      isSelected: [],
      showModal: false,
      newPlayer: {
        name: '',
        pdga: '',
        uid: 0
      }
    };
    this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);    
    this.handleNewPlayer = this.handleNewPlayer.bind(this);
  }

  handleSelectPlayer(uid) {
      let list = this.state.tempPlayers;
      if(! this.state.isSelected.includes(uid)) {
        for(let i of this.props.savedPlayers) {
            if(i.uid == uid) {
              list.push(i);
            }
          }
      } else {
        for(let i = 0; i < list.length; i++) {
          if(uid == list[i].uid) {
            list.splice(i,1);
          }
        }
      }
      let selectedUids = this.state.tempPlayers.map( player => {
        return player.uid;
      })
      this.setState({tempPlayers: list});
      this.setState({isSelected: selectedUids})
  }

  handleOpen() {
    this.setState({showModal: true})    
  }

  handleClose() {
    this.setState({showModal: false})
  }

  handleFormChange(evt) {
    evt.preventDefault();
    let newPlayer = Object.assign({}, this.state.newPlayer, { [evt.target.name] : evt.target.value});
    let newState = Object.assign({}, this.state, {newPlayer: newPlayer});
    this.setState(newState);    
  }

  handleNewPlayer(evt) {
    evt.preventDefault();
    let uid = Date.now().toString();
    let newPlayer = Object.assign({}, this.state.newPlayer, { uid: uid});
    this.props.saveNewPlayer(newPlayer); // add player to saved players in store    
    this.setState({newPlayer: {}}); // clear out newPlayer in state
    this.setState({tempPlayers: this.state.tempPlayers.concat(newPlayer)});// add to tempPlayer list
    this.setState({isSelected: this.state.isSelected.concat(uid)});  // add to selected list
    this.handleClose();
  }

  handleDone(props) {
      props.setNewRoundPlayers(this.state.tempPlayers);
      props.history.push('/new');
  }


  render() {

   const playerList = this.props.savedPlayers.map((item, index) => 
      <ListGroupItem active={this.state.isSelected.includes(item.uid)} key={item.uid} onClick={() => this.handleSelectPlayer(item.uid)}>{item.name}</ListGroupItem>
    )

    return (
      <div>
        <Grid>
          <Row>
            <Col md={2}></Col>
            <Col><h3>Select Players</h3></Col>
            <Col md={2} className="right-align"><div className="addPlayer" onClick={this.handleOpen}>Add</div></Col>
          </Row>
        </Grid>

        <ListGroup>{playerList}</ListGroup>

        <Grid className="fixed">
          <Row>
            <Col><Button size="lg" bsStyle="link" href="/new">Back</Button></Col>
            <Col className="right-align"><Button size="lg" bsStyle="primary" onClick={() => this.handleDone(this.props)}>Done</Button></Col>
          </Row>
        </Grid>

        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>New Player</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleNewPlayer}>
              <FormGroup controlId="playerName">
                <ControlLabel>Name</ControlLabel>
                <FormControl name="name" type="text" value={this.state.newPlayer.name} onChange={this.handleFormChange} />
              </FormGroup>
              <FormGroup controlId="playerNumber">
                <ControlLabel>PDGA</ControlLabel>
                <FormControl name="pdga" type="text" value={this.state.newPlayer.pdga} onChange={this.handleFormChange} />
              </FormGroup>              
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose} bsStyle="link">Cancel</Button>
            <Button bsStyle="primary" type="submit" onClick={this.handleNewPlayer}>Add Player</Button>
          </Modal.Footer>
        </Modal>


      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newPlayers: state.newround.players,
    savedPlayers: state.savedPlayers
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setNewRoundPlayers: (players) => {
      dispatch({type:'NEWROUND_PLAYERS', payload: players});
    },
    saveNewPlayer: (player) => {
      dispatch({type:'SAVE_PLAYER', payload: player})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectPlayers);

