import { createStore, applyMiddleware, compose } from 'redux';
import reducer from  './reducers';
const { createOffline } = require('@redux-offline/redux-offline');
const config = require('@redux-offline/redux-offline/lib/defaults');

const { middleware, enhanceReducer, enhanceStore } = createOffline({
  ...config,
  discard: (error: any, action: any, retries: number) => {
    const { name, response, status } = error;
    // Server is unreachable, should try again later
    if (!response || !status) return false;
    // There was an error, should trigger Rollback action and discard the request
    if(status > 200) return true;
  }
});

function tickMiddleware(store: any) {
  return (next: any) => (action: any) => {
    if (action.type === 'Offline/SCHEDULE_RETRY') {
      const intervalId = setInterval(() => {
        store.dispatch({ type: 'TICK' });
      }, 1000);
      setTimeout(() => clearInterval(intervalId), action.payload.delay);
    }
    return next(action);
  };
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  enhanceReducer(reducer), 
  {}, 
  composeEnhancers(
    enhanceStore,
    applyMiddleware(middleware, tickMiddleware), 
  )
);
