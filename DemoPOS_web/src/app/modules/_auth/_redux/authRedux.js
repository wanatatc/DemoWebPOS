
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
  selectedEmployee: {
    id:'00205',
    name:'Thanapoom'
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
        client_version: action.payload.client_version
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
        client_version: ''
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
