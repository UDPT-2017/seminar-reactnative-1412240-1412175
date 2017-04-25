import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  BackAndroid,
  ListView
} from 'react-native'
import { connect } from 'react-redux'

import NewNote from './view_newNote'
import SingleNote from './view_singleNote'
import NotesViewCard from '../lib/NotesViewCard'
import { deleteNote } from '../actions/Action'
import { styles } from './styles'
import NavigationBar from 'react-native-navigation-bar'

class AllNotes extends Component {
  constructor(props) {
    super(props)

    this._handleBackButton = this._handleBackButton.bind(this)
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton)
  }

  _handleBackButton() {
    if (this.props.navigator.getCurrentRoutes().length == 1) {
      return false
    }
    return true
  }

  render() {
    return (
      <View style={ styles.allNotesContainer }>
      <NavigationBar
        title={'My Notes'}
        height={44}
        titleColor={'#000'}
        backgroundColor={'#ffd699'}
        rightButtonTitle={'Create Note'}
        rightButtonTitleColor={'#000'}
        onRightButtonPress={this.addNewNote.bind(this)}
        />
        <View style={styles.listViewNotes}>
          { this.renderList() }
        </View>
      </View>
    )
  }

  addNewNote() {
    this.props.navigator.push({component: NewNote, type: 'addingNote'})
  }

  goToNote(noteId, title, description) {
    this.props.navigator.push({ component: SingleNote, type: 'editingNote', passProps: { noteId, title, description } })
  }

  longPressNote(noteId) {
    Alert.alert(
      'Delete Note',
      'Do you want to delete this note?',
      [
        { text: 'No' },
        { text: 'YES', onPress: () => this.deleteNote(noteId) }
      ]
    )
  }

  deleteNote(noteId) {
    this.props.deleteNote(noteId)
  }

  renderList() {
    if (this.props.notes.length <= 0) {
      return (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyList}>Add some notes...</Text>
        </View>
      )
    } else {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var dataSource = ds.cloneWithRows(this.props.notes) || []

      return (
        <ListView
          dataSource={dataSource}
          renderRow={(note, sectionID, rowID) => {
            return (
              <NotesViewCard
                title={note.title}
                description={note.description}
                id={note.id}
                keys={rowID}
                onPressBtn={this.goToNote.bind(this)}
                onLongPressBtn={this.longPressNote.bind(this)}
              />
            )
          }}
        />
      )
    }
  }
}

function mapStateToProps(state) {
  return { notes: state.allNotes }
}

export default connect(mapStateToProps, { deleteNote })(AllNotes)
