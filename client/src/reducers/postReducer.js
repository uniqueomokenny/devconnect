import { ADD_POST } from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }

    default:
      return state
  }
}

export default postReducer;