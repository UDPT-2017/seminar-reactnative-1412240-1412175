import {ADD_NOTE, UPDATE_NOTE,DELETE_NOTE} from '../constants/ActionTypes'

export function addNote(newNote) {
  return {
    type: ADD_NOTE,
    payload: newNote
  }
}

export function updateNote(updatedNote) {
  return {
    type: UPDATE_NOTE,
    payload: updatedNote
  }
}

export function deleteNote(noteId) {
  return {
    type: DELETE_NOTE,
    payload: noteId
  }
}
