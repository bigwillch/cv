export const SIDE_LOAD = 'SIDE_LOAD';
export const SIDE_CLEAR = 'SIDE_CLEAR';

// Action creators
export const sideLoad = (href) => {
  console.log('sideload', href)
  return {
    type: SIDE_LOAD,
    payload: {
      href
    }
  }
}

export const sideClear = () => {
  return {
    type: SIDE_CLEAR,
    payload: {
      href: null
    }
  }
}

const initialState = {
  href: null
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case SIDE_LOAD:
    case SIDE_CLEAR:
      console.log(action)
      return { ...state, href: action.payload.href }
    default:
      return state
  }
}

// Selectors
export const getHref = (state) => state.href
