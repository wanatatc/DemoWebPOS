export const actionTypes = {
    RESET: "[PRODUCT_RESET] Action",
    OPEN_ADD: "[PRODUCT_OPEN_ADD] Action",
    OPEN_EDIT: "[PRODUCT_OPEN_EDIT] Action",
    CLOSE: "[PRODUCT_CLOSE] Action",
    UPDATE_SEARCH: "[PRODUCT_UPDATE_SEARCH] Action",
  };
  
  const initialState = {
    open: false,
    selectedId: null,
    searchValues: {
      filterColumn: "ProductName",
      value:"",
      execute:false
    },
  };
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.RESET: {
        return initialState;
      }
  
      case actionTypes.OPEN_ADD: {
        return {
          ...state,
          open: true,
          selectedId: null,
        };
      }
  
      case actionTypes.OPEN_EDIT: {
        return {
          ...state,
          open: true,
          selectedId: action.payload,
        };
      }
  
      case actionTypes.CLOSE: {
        return {
          ...state,
          open: false,
          selectedId: null,
        };
      }
  
      case actionTypes.UPDATE_SEARCH: {
        action.payload.execute = true;
        return {
          ...state,
          searchValues: action.payload
        };
      }
  
      default:
        return state;
    }
  };
  
  export const actions = {
    reset: () => ({ type: actionTypes.RESET }),
    close: () => ({ type: actionTypes.CLOSE }),
    openAdd: () => ({ type: actionTypes.OPEN_ADD }),
    openEdit: (payload) => ({ type: actionTypes.OPEN_EDIT, payload }),
    updateSearch: (payload) => ({ type: actionTypes.UPDATE_SEARCH, payload }),
  };
  