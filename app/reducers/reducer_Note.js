import _ from 'lodash'
import {ADD_NOTE, UPDATE_NOTE,DELETE_NOTE} from '../constants/ActionTypes'

const initialState = []

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_NOTE:
      const newNote = Object.assign({}, { id: state.length }, action.payload)
      const newState = [newNote, ...state]
      return newState

    case UPDATE_NOTE:
      const newArray = _.remove(state, (data) => {
        return data.id != action.payload.id
      })
      const updatedNote = Object.assign({}, { id: newArray.length }, action.payload)
      const updatedState = [updatedNote, ...newArray]
      return updatedState

    case DELETE_NOTE:
      const deletedNewArray = _.remove(state, (data) => {
        return data.id != action.payload
      })
      return deletedNewArray

    default:
      return state
  }
}
