import { createSelector } from "reselect"
import { name as appName } from "../../package.json"

export const namespace = "ui"

const prefix = `${appName}/${namespace}`

const InitialState = {
  sidebars: {},
  modal: {
    type: "",
    modalProps: {}
  },
  expandedMenuKeys: [],
  pendingRequestChain: false
}

export const REGISTER_SIDEBAR = `${prefix}/REGISTER_SIDEBAR`

export const TOGGLE_COLLAPSE_SIDEBAR = `${prefix}/TOGGLE_COLLAPSE_SIDEBAR`
export const TOGGLE_SIDEBAR_VISIBILITY = `${prefix}/TOGGLE_SIDEBAR_VISIBILITY`

export const SHOW_MODAL = `${prefix}/SHOW_MODAL`
export const HIDE_MODAL = `${prefix}/HIDE_MODAL`

export const UI_EXPAND_MENU_KEY = `${prefix}/UI_EXPAND_MENU_KEY`

export const GET_LOADER = `${prefix}/GET_LOADER`
export const HIDE_LOADER = `${prefix}/HIDE_LOADER`

export default function reducer(state = InitialState, { type, payload }) {
  switch (type) {
    case REGISTER_SIDEBAR:
      return {
        ...state,
        sidebars: {
          ...state.sidebars,
          [payload.id]: {
            id: null,
            collapsible: false,
            collapsed: false,
            visible: true,
            ...payload
          }
        }
      }

    case TOGGLE_COLLAPSE_SIDEBAR:
      return {
        ...state,
        sidebars: {
          ...state.sidebars,
          [payload.id]: {
            ...state.sidebars[payload.id],
            collapsed: !state.sidebars[payload.id].collapsed
          }
        }
      }

    case TOGGLE_SIDEBAR_VISIBILITY:
      return {
        ...state,
        sidebars: {
          ...state.sidebars,
          [payload.id]: {
            ...state.sidebars[payload.id],
            visible: !state.sidebars[payload.id].visible
          }
        }
      }

    case SHOW_MODAL:
      return {
        ...state,
        modal: {
          type: "",
          modalProps: {},
          ...payload
        }
      }

    case HIDE_MODAL:
      return {
        ...state,
        modal: {
          type: "",
          modalProps: {}
        }
      }

    case UI_EXPAND_MENU_KEY: {
      return {
        ...state,
        expandedMenuKeys: payload.expandedKeys
      }
    }

    case GET_LOADER: {
      return {
        ...state,
        pendingRequestChain: true
      }
    }

    case HIDE_LOADER: {
      return {
        ...state,
        pendingRequestChain: false
      }
    }

    default:
      return state
  }
}

/* selectors */
const stateSelector = state => state[namespace]
const sidebarsSelector = createSelector(
  stateSelector,
  state => state.sidebars
)
export const modalSelector = createSelector(
  stateSelector,
  state => state.modal
)

export const expandedMenuKeysSelector = createSelector(
  stateSelector,
  state => state.expandedMenuKeys
)

export const pendingRequestChainSelector = createSelector(
  stateSelector,
  state => state.pendingRequestChain
)

export const sidebarInstanceSelector = createSelector(
  sidebarsSelector,
  (state, { id }) => id,
  (sidebars, id) => sidebars[id]
)

/* action creators */

export function registerSidebar(id, params = {}) {
  return {
    type: REGISTER_SIDEBAR,
    payload: { id, ...params }
  }
}

export function toggleCollapsingSidebar(id) {
  return {
    type: TOGGLE_COLLAPSE_SIDEBAR,
    payload: { id }
  }
}

export function toggleSidebarVisibility(id) {
  return {
    type: TOGGLE_SIDEBAR_VISIBILITY,
    payload: { id }
  }
}

export function showModal(type, modalProps) {
  return {
    type: SHOW_MODAL,
    payload: { type, modalProps }
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

export function expandMenuKeys(expandedKeys) {
  return {
    type: UI_EXPAND_MENU_KEY,
    payload: {
      expandedKeys
    }
  }
}

export function getLoader() {
  return {
    type: GET_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}
