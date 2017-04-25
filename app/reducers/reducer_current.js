import {FETCH_SINGLE} from '../constants/ActionTypes'

export default (state ={}, action)=>{
  switch (action) {
    case FETCH_SINGLE :
        return action.payload
    default:
      return state
  }
}
