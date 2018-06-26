import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';



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
    };
    this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  handleSelectPlayer(index) {
      if(! this.isSelected(this.props.savedPlayers[index])) {
        this.tempPlayers.concat(this.savedPlayers[index])       
      } else {
        for(let i = 0; i < this.tempPlayers.length; i++) {
          if(this.savedPlayers[index].uid == this.tempPlayers[i].uid) {
            this.tempPlayers.splice(i,1)
          }
        }
      }
  }

  isSelected(item) {
      for(let i of this.props.tempPlayers) {
        if(item.uid == i.uid) {
          return true
        }
      }
      return false;
  }

  playerList = this.props.savedPlayers.map((item, index) => 
      <ListGroupItem active={this.isSelected(item)} key={item.uid}>{item.name}</ListGroupItem>
    )


  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={2}></Col>
            <Col><h3>Select Players</h3></Col>
            <Col md={2} className="right-align"><div className="addPlayer" click="openModal"></div></Col>
          </Row>
        </Grid>

        <ListGroup>{this.playerList}</ListGroup>


      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  tempPlayers: state.tempPlayers,
  savedPlayers: state.savedPlayers
})


export default connect(mapStateToProps)(SelectPlayers);

