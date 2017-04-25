import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  Text,
  View,
  Navigator,
  BackAndroid,
  AppRegistry
} from 'react-native'

import AllNotes from './app/components/view_allNotes'
import configureStore from './app/store/configureStore'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
const engine = createEngine('my-notes')

var store = configureStore(engine)

const load = storage.createLoader(engine)
load(store)

const routes = [
  { component: AllNotes }
]

class Notes extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          style={{ flex: 1 }}
          ref='nav'
          initialRouteStack={routes}
          renderScene={this.renderScene}
        />
      </Provider>
    )
  }
  renderScene(route, navigator) {
    return <route.component navigator={navigator} {...route.passProps}/>
  }
}

AppRegistry.registerComponent('MyFirstProject', () => Notes)
