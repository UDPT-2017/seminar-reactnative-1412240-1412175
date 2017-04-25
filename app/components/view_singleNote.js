import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  Alert,
  BackAndroid,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

import { styles } from './styles'
import { getColor } from '../lib/helpers'
import { updateNote } from '../actions/Action'
import { deleteNote } from '../actions/Action'
import NavigationBar from 'react-native-navigation-bar'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

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

        leftButtonTitle={'Back'}
        leftButtonTitleColor={'#000'}
        onLeftButtonPress={this.goBack.bind(this)}

        rightButtonTitle={'Save'}
        rightButtonTitleColor={'#000'}
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
         labelColor="white"
         rippleColor="white"
         style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
         onTabChange={this.deleteNote.bind(this)}
         >
         <Tab
           barBackgroundColor="#37474F"
           label="Delete"
         />
         <Tab
           barBackgroundColor="#00796B"
           label="Image"
         />
         <Tab
           barBackgroundColor="#5D4037"
           label="Audio"
         />
         <Tab
           barBackgroundColor="#3E2723"
           label="HandWritting"
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
  deleteNote() {
      this.props.deleteNote(
        this.state.id)

    this.goBack()
  }
}

export default connect(null, { updateNote })(SingleNote)
