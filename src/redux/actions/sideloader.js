export const SIDE_TRIGGER = 'SIDE_TRIGGER';
export const SIDE_LOADED = 'SIDE_LOADED';
export const SIDE_CLOSE = 'SIDE_CLOSE';

// Action creators
export const sideTrigger = (href, data) => {
  return {
    type: SIDE_TRIGGER,
    payload: {
      href,
      data
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
  active: false,
  data: {}
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case SIDE_TRIGGER:
      // if current link already loaded open straight away
      if (state.href === action.payload.href) {
        return { ...state, active: true }
      }
      return { 
        ...state,
        href: action.payload.href,
        loading: true,
        data: action.payload.data
      }
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
