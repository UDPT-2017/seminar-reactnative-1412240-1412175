import { createStore, applyMiddleware } from 'redux'
import * as storage from 'redux-storage'


import ApplicationStore from '../reducers'
const reducer = storage.reducer(ApplicationStore);

export default function configureStore (engine) {
  const middleware = storage.createMiddleware(engine)
  const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
  const store = createStoreWithMiddleware(reducer)
      return store;
}
