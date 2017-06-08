//action types
export const FEATCH_LIST = 'FEATCH_LIST';
export const FEATCH_LIST_SUCCESS = 'FEATCH_LIST_SUCCESS';

//action creator
export const actions = {
  featchList: () => ({
		type: FEATCH_LIST
	}),
	featchListSuccess: ( data ) => ({
		type: FEATCH_LIST_SUCCESS,
		payload: data
	})
}
