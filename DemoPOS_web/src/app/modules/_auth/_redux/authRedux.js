
export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
};

const initialAuthState = {
  user: null,
  authToken: null,
  roles: [],
  permissions: [],
  userManager: {},
  client_version: '',
  userProperties:{
    userId: 0,
    employeeCode: "",
    employeeFirstName: "",
    employeeLastName: "",
    employeeBranchId: 0,
    employeeBranchName: "",
  }
};

export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.Login: {
      return {
        ...state,
        user: action.payload.user,
        authToken: action.payload.authToken,
        roles: [...action.payload.roles],
        permissions: [...action.payload.permissions],
        userManager: action.payload.userManager,
        client_version: action.payload.client_version,
        userProperties: action.payload.userProperties
      };
    }

    case actionTypes.Logout: {
      return {
        ...state,
        user: null,
        authToken: null,
        roles: [],
        permissions: [],
        userManager: {},
        client_version: '',
        userProperties:{
          userId: 0,
          employeeCode: "",
          employeeFirstName: "",
          employeeLastName: "",
          employeeBranchId: 0,
          employeeBranchName: "",
        }
      };
    }

    default:
      return state;
  }
};

export const actions = {
  login: (payload) => ({ type: actionTypes.Login, payload }),
  logout: () => ({ type: actionTypes.Logout }),
};
