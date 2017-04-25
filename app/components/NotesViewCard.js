import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { Typo } from './Typography'
import { getColor } from './helpers'

export default class NotesViewCard extends Component {
  render() {
    const {
      title,
      description,
      id,
      keys
    } = this.props

    const background = (keys % 2 == 0) ? { backgroundColor: '#ffb84d' } : { backgroundColor: '#ffebcc'}

    return (
      <TouchableOpacity onPress={this.handleGoto.bind(this)} onLongPress={this.handleLongPress.bind(this)}>
        <View style={[ styles.cardContainer, background ]}>
          <View style={styles.cardTitleContainer}>
            <Text style={[ styles.cardTitle, Typo.cardTitle ]}>
              {title.toUpperCase()}
            </Text>
          </View>
          <View style={styles.cardDescriptionContainer}>
            <Text style={[ styles.cardDescription, Typo.cardDescription ]}>
              {(description.length > 60)
              ? description.slice(0, 60) + '...'
              : description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  handleLongPress() {
    this.props.onLongPressBtn(this.props.id)
  }

  handleGoto() {
    this.props.onPressBtn(this.props.id, this.props.title, this.props.description)
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  cardTitleContainer: {
    justifyContent: 'center'
  },
  cardTitle: {
    marginBottom: 10
  },
  cardDescriptionContainer: {

  },
  cardDescription: {

  }
})
