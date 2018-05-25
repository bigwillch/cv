export const SIDE_TRIGGER = 'SIDE_TRIGGER';
export const SIDE_LOADED = 'SIDE_LOADED';
export const SIDE_CLEAR = 'SIDE_CLEAR';

// Action creators
export const sideTrigger = (href) => {
  return {
    type: SIDE_TRIGGER,
    payload: {
      href
    }
  }
}

export const sideLoaded = () => {
  return {
    type: SIDE_LOADED
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
  href: null,
  loading: false
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case SIDE_TRIGGER:
      return { ...state, href: action.payload.href, loading: true }
    case SIDE_LOADED:
      return { ...state, loading: false }
    case SIDE_CLEAR:
      return { ...state, href: null }
    default:
      return state
  }
}

// Selectors
export const getHref = (state) => state.href
