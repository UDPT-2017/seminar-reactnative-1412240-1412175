import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  BackAndroid,
  StatusBar,
  Image
} from 'react-native'
import { connect } from 'react-redux'

import { styles } from './styles'
import { getColor } from '../lib/helpers'
import { addNote } from '../actions/Action'
import NavigationBar from 'react-native-navigation-bar'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'

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
          backgroundColor={'#ffd699'}

          leftButtonIcon={require('../images/back.png')}
          
          onLeftButtonPress={this.goBack.bind(this)}
          rightButtonIcon={require('../images/save.png')}


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
          labelColor="#000"
          rippleColor="#000"
          style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
          onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
        >
          <Tab
            barBackgroundColor="#ffebcc"
            label="Upload"
			icon={<Image style={{width: 20, height:20}} source={require('../images/upload.png')}/>}
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

  addNote() {
    this.props.addNote({
      title: this.state.title,
      description: this.state.desc
    })
    this.goBack()
  }
}

export default connect(null, { addNote })(NewNote)
