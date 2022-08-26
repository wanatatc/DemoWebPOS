export const actionTypes = {
  RESET: "[RESET] Action",
  OPEN_ADD: "[OPEN_ADD] Action",
  OPEN_EDIT: "[OPEN_EDIT] Action",
  OPEN_REORDER: "[OPEN_REORDER] Action",
  CLOSE_REORDER: "[CLOSE_REORDER] Action",
  CLOSE: "[CLOSE] Action",
  UPDATE_SEARCH: "[UPDATE_SEARCH] Action",
};

const initialState = {
  open: false,
  openReOrder: false,
  selectedId: null,
  searchValues: {
    searchText: "",
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

    case actionTypes.OPEN_REORDER: {
      return {
        ...state,
        openReOrder: true,
      };
    }

    case actionTypes.CLOSE_REORDER: {
      return {
        ...state,
        openReOrder: false,
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
      return {
        ...state,
        searchValues: action.payload,
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
  openReOrder: () => ({ type: actionTypes.OPEN_REORDER }),
  closeReOrder: () => ({ type: actionTypes.CLOSE_REORDER }),
  updateSearch: (payload) => ({ type: actionTypes.UPDATE_SEARCH, payload }),
};
