export const SIDE_TRIGGER = 'SIDE_TRIGGER';
export const SIDE_LOADED = 'SIDE_LOADED';
export const SIDE_CLOSE = 'SIDE_CLOSE';

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

export const sideClose = () => {
  return {
    type: SIDE_CLOSE
  }
}

const initialState = {
  href: null,
  loading: false,
  active: false
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case SIDE_TRIGGER:
      return { ...state, href: action.payload.href, loading: true }
    case SIDE_LOADED:
      return { ...state, loading: false, active: true }
    case SIDE_CLOSE:
      return { ...state, active: false }
    default:
      return state
  }
}

// Selectors
export const getHref = (state) => state.href
