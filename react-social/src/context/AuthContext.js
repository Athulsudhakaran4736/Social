import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
const INITIAL_STATE = {
  user: {
    _id: '6414135512b6c981628240cc',
    username: 'athuls',
    email: 'athul123@gmail.com',
    password: '$2b$10$eH4t9KCn3GK9lShAdY1djeL.toZFmmy/7QOrwFrczgWjl6uKt49h2',
    profilePicture: '',
    coverPicture: '',
    followers: [],
    followings: [],
    isAdmin: false,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
