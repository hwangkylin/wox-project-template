import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './saga';
import List from './user-list';

const rootEle = document.getElementById('app');
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run( rootSaga );

function render() {
	ReactDOM.render(
		<Provider store={store}>
			<div>
        <List />
      </div>
		</Provider>,
		rootEle
	)
}

render();
store.subscribe( render );
