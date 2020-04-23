import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import tasksReducer from './reducers/tasks';
import App from './App';
import TodoApp from './containers/TodoApp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createLogger } from 'redux-logger';

// redux-logger middlewareを利用する
const loggerSetting = {
  predicate: (getState, action) => action.type !== 'INPUT_TASK',
};
const logger = createLogger(loggerSetting);

// localstorageに保存するmiddleware
const storageMiddleware = store => next => action => {
  const result = next(action);
  window.localStorage.setItem('todos-state', JSON.stringify(store.getState()));
  return result;
};
const savedState = JSON.parse(localStorage.getItem('todos-state'));

// middleware集約
const middlewares = [ logger, storageMiddleware ];

// ReducerをStateに登録
const store = createStore(
  tasksReducer,
  savedState ? savedState : tasksReducer(undefined, { type: 'INIT' }),
  // スプレッドオペレーターで登録
  applyMiddleware(...middlewares)
);

// 最終htmlに集約
const renderApp = (store) => {
  render(
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={ App } />
        <Route exact path="/todo" component={ TodoApp } />
        <Route exact path="/todo/:id" component={ TodoApp } />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store));
renderApp(store);
