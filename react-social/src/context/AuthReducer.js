const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'Login_Start':
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case 'Login_Success':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'Login_Failure':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case 'Follow':
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };

    case 'UnFollow':
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (followings) => followings !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
