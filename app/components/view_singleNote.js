import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  Alert,
  BackAndroid,
  StatusBar,
  Image
} from 'react-native'
import { connect } from 'react-redux'

import { styles } from './styles'
import { getColor } from '../lib/helpers'
import { updateNote } from '../actions/Action'
import { deleteNote } from '../actions/Action'
import NavigationBar from 'react-native-navigation-bar'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'


class SingleNote extends Component {
  constructor(props) {
    super(props)

    this._handleBackButton = this._handleBackButton.bind(this)

    this.state = {
      changed: false,
      id: this.props.noteId,
      title: this.props.title,
      desc: this.props.description
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('backPressedSingleNote', this._handleBackButton)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backPressedSingleNote', this._handleBackButton)
  }

  _handleBackButton() {
    if (this.state.changed && this.state.title != '') {
      this.updateNote()
    } else {
      this.goBack()
    }
    return true
  }

  render() {
    return(
      <View style={ styles.addNotesContainer }>
      <NavigationBar
        title={this.state.title.slice(0,40)}
        height={44}
        titleColor={'#000'}
        backgroundColor={'#ffd699'}
        leftButtonIcon={require('../images/back.png')}


        onLeftButtonPress={this.goBack.bind(this)}
        rightButtonIcon={require('../images/save.png')}

    
        onRightButtonPress={this.updateNote.bind(this)}
      />
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.inputTitleStyle}
            placeholder='Note Title...'
            placeholderTextColor='#aaa'
            returnKeyType='next'
            underlineColorAndroid="transparent"
            selectionColor={getColor('paperTeal')}
            onChangeText={(text) => this.setState({ title: text, changed: true })}
            value={this.state.title}
          />

          <TextInput
            style={styles.inputDescriptionStyle}
            multiline={true}
            placeholder='Note Description...'
            placeholderTextColor='#aaa'
            returnKeyType='done'
            underlineColorAndroid="transparent"
            selectionColor={getColor('paperTeal')}
            onChangeText={(text) => this.setState({desc: text, changed: true})}
            value={this.state.desc}
          />
        </View>
        <BottomNavigation
          labelColor="#000"
          rippleColor="#000"
          style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
          onTabChange={(newTabIndex)=>this.onButtonTagChange(newTabIndex)}
        >
          <Tab
            barBackgroundColor="#ffebcc"
            label="Delete"
			icon={<Image style={{width: 20, height:20}} source={require('../images/delete.png')}/>}
          />
          <Tab
            barBackgroundColor="#ffebcc"
            label="Camera"
			icon={<Image style={{width: 20, height:20}} source={require('../images/camera.png')}/>}
            />
          <Tab
            barBackgroundColor="#ffebcc"
            label="Setting"
			icon={<Image style={{width: 20, height:20}} source={require('../images/settings.png')}/>}
            />
    
    </BottomNavigation>
      </View>
    )
  }

  goBack(event) {
    this.props.navigator.pop()
  }

  updateNote() {
    if (this.state.changed) {
      this.props.updateNote({
        id: this.state.id,
        title: this.state.title,
        description: this.state.desc
      })
    }

    this.goBack()
  }
  onButtonTagChange(newTabIndex){
	  
	  if(newTabIndex===0){
		  console.log(newTabIndex)
		  this.deleteNote()
	  }
  }
  deleteNote() {
	  console.log(this.state.id);
      this.props.deleteNote(this.state.id)
    this.goBack()
  }
}

export default connect(null, { updateNote, deleteNote })(SingleNote)
