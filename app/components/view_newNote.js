import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  BackAndroid,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

import { styles } from './styles'
import { getColor } from '../lib/helpers'
import { addNote } from '../actions/Action'
import NavigationBar from 'react-native-navigation-bar'

class NewNote extends Component {
  constructor(props) {
    super(props);

    this._handleBackButton = this._handleBackButton.bind(this)

    this.state = {
      title: '',
      desc: ''
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('backPressed', this._handleBackButton)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backPressed', this._handleBackButton)
  }

  _handleBackButton() {
    if (this.state.title == '') {
      this.goBack()
    } else {
      this.addNote()
    }
    this.goBack()
    return true
  }

  render() {
    return (
      <View style={ styles.addNotesContainer }>
        <NavigationBar
          title={'New Note'}
          height={44}
          titleColor={'#000'}
          backgroundColor={'#ffc266'}

          leftButtonTitle={'Back'}
          leftButtonTitleColor={'#000'}
          onLeftButtonPress={this.goBack.bind(this)}

          rightButtonTitle={'Save'}
          rightButtonTitleColor={'#000'}
          onRightButtonPress={this.addNote.bind(this)}
        />
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.inputTitleStyle}
            autoFocus={true}
            placeholder='Note Title...'
            placeholderTextColor='#aaa'
            returnKeyType='next'
            underlineColorAndroid="transparent"
            selectionColor={getColor('paperTeal')}
            onChangeText={(text) => this.setState({ title: text })}
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
            onChangeText={(text) => this.setState({desc: text})}
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

  addNote() {
    this.props.addNote({
      title: this.state.title,
      description: this.state.desc
    })
    this.goBack()
  }
}

export default connect(null, { addNote })(NewNote)
