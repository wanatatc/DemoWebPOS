import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  UPDATE_DRAWER_OPEN: "[UPDATE_DRAWER_OPEN] Action",
  UPDATE_DARK_MODE: "[UPDATE_DARK_MODE] Action",
  SHOW_POPUP_CHANGEPASSWORD: "[SHOW_POPUP_CHANGEPASSWORD] Action",
  HIDE_POPUP_CHANGEPASSWORD: "[HIDE_POPUP_CHANGEPASSWORD] Action",
  UPDATE_TITLE: '[UPDATE_TITLE] Action',
  UPDATE_TOGGLEMENU:'[UPDATE_TOGGLEMENU] Action',
  UPDATE_RESPONSIVE_KEY: '[UPDATE_RESPONSIVE_KEY] Action'
};

const initialAuthState = {
  drawerOpen: false,
  darkMode: false,
  popupChangePassword: false,
  currentTitle: '',
  toggleMenu: true,
  responsiveKey: ''
};

export const reducer = persistReducer(
  { storage, key: "layout", whitelist: ["darkMode","toggleMenu"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_DRAWER_OPEN: {
        return {
          ...state,
          drawerOpen: action.payload,
        };
      }

      case actionTypes.UPDATE_DARK_MODE: {
        return {
          ...state,
          darkMode: action.payload,
        };
      }

      case actionTypes.UPDATE_TITLE: {
        return {
          ...state,
          currentTitle: action.payload,
        };
      }

      case actionTypes.SHOW_POPUP_CHANGEPASSWORD: {
        return {
          ...state,
          popupChangePassword: true,
        };
      }

      case actionTypes.HIDE_POPUP_CHANGEPASSWORD: {
        return {
          ...state,
          popupChangePassword: false,
        };
      }

      case actionTypes.UPDATE_TOGGLEMENU: {
        return {
          ...state,
          toggleMenu: action.payload
        }
      }

      case actionTypes.UPDATE_RESPONSIVE_KEY: {
        return {
          ...state,
          responsiveKey: action.payload
        }
      }

      default:
        return state;
    }
  }
);

export const actions = {
  updateDrawerOpen: (payload) => ({
    type: actionTypes.UPDATE_DRAWER_OPEN,
    payload,
  }),
  updateDarkMode: (payload) => ({
    type: actionTypes.UPDATE_DARK_MODE,
    payload,
  }),
  showPopupChangePassword: (payload) => ({
    type: actionTypes.SHOW_POPUP_CHANGEPASSWORD,
  }),
  hidePopupChangePassword: (payload) => ({
    type: actionTypes.HIDE_POPUP_CHANGEPASSWORD,
  }),
  updateTitle: (payload) => ({
    type: actionTypes.UPDATE_TITLE,payload
  }),
  updateToggleMenu: (payload) => ({
    type: actionTypes.UPDATE_TOGGLEMENU,payload
  }),
  updateResponsiveKey: (payload) => ({
    type: actionTypes.UPDATE_RESPONSIVE_KEY,payload
  }),
};
