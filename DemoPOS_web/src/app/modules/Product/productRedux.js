export const actionTypes = {
    RESET: "[PRODUCT_RESET] Action",
    OPEN_ADD: "[PRODUCT_OPEN_ADD] Action",
    OPEN_EDIT: "[PRODUCT_OPEN_EDIT] Action",
    CLOSE: "[PRODUCT_CLOSE] Action",
    UPDATE_SEARCH: "[PRODUCT_UPDATE_SEARCH] Action",
    UPDATE_PAGINATED: "PRODUCT_UPDATE_PAGINATED] Action"
  };
  
  const initialState = {
    open: false,
    selectedId: null,
    paginated: {
      page: 1,
      recordsPerPage: 10,
      orderingField: "",
      ascendingOrder: true,
    },
    searchValues: {
      filterColumn: "ProductName",
      value:"",
      execute:false,
      executedAt: null,
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

        //reset paginated
        let paginated = {...state.paginated,page:1}
        action.payload.execute = true
        action.payload.executedAt = Date(Date.now())
        return {
          ...state,
          searchValues: action.payload,
          paginated: paginated
        };
      }

      case actionTypes.UPDATE_PAGINATED: {
        return {
          ...state,
          paginated: action.payload,
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
    updatePaginated: (payload) => ({ type: actionTypes.UPDATE_PAGINATED, payload }),
  };
  