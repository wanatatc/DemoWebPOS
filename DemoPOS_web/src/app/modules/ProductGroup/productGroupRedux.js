export const actionTypes = {
  RESET: "[PRODUCTGROUP_RESET] Action",
  OPEN_ADD: "[PRODUCTGROUP_OPEN_ADD] Action",
  OPEN_DND: "[PRODUCTGROUP_OPEN_DND] Action",
  SAVING: "[PRODUCTGROUP_SAVING] Action",
  OPEN_EDIT: "[PRODUCTGROUP_OPEN_EDIT] Action",
  //UPDATE_SEARCH: "[PRODUCTGROUP_UPDATE_SEARCH] Action",
};

const initialState = {
  open: false,
  backdrop: false,
  openDnd: false,
  /*openReOrder: false,
  selectedId: null,
  searchValues: {
    searchText: "",
  },*/
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
        }
    }

    case actionTypes.SAVING: {
        return {
            ...state,
            open: false,
            backdrop: true,
        }
    }

    // case actionTypes.OPEN_ADD: {
    //   return {
    //     ...state,
    //     open: true,
    //     selectedId: null,
    //   };
    // }

    case actionTypes.OPEN_EDIT: {
      return {
        ...state,
        open: true,
        formData: action.payload,
      };
    }

    case actionTypes.OPEN_DND: {
      return {
        ...state,
        openDnd: true,
      };
    }

    // case actionTypes.UPDATE_SEARCH: {
    //   return {
    //     ...state,
    //     searchValues: action.payload,
    //   };
    // }

    default:
      return state;
  }
};

export const actions = {
    openAdd: () => ( { type: actionTypes.OPEN_ADD }),
    openDnd: () => ( { type: actionTypes.OPEN_DND }),
    openEdit: (payload) => ({ type: actionTypes.OPEN_EDIT, payload }),
    saving: () => ( { type: actionTypes.SAVING }),
    reset: () => ({ type: actionTypes.RESET }),
    
  //openAdd: () => ({ type: actionTypes.OPEN_ADD }),
  //updateSearch: (payload) => ({ type: actionTypes.UPDATE_SEARCH, payload }),
};
