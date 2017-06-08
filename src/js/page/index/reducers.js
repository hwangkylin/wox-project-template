import { combineReducers } from 'redux';
import { fromJS, toJS, set } from 'immutable';
import { FEATCH_LIST_SUCCESS } from './actions';

const defaultState = {
	list: []
};

function fetchList( state = defaultState, action ){
	switch( action.type ){
		case FEATCH_LIST_SUCCESS:
			return fromJS( state ).set( 'list', action.payload ).toJS();
		default:
			return state;
	}
}

export default fetchList;
