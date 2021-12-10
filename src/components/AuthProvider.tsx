import React from 'react';

import {
  getItem as getToken,
  setItem as setToken,
  removeItem as removeToken,
} from './secureStorage';

const AuthContext = React.createContext({
  status: 'idle',
  authToken: null,
  signIn: () => {},
  signOut: () => {},
});

export const useAuthorization = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};

export const AuthProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(reducer, {
    status: 'idle',
    authToken: null,
  });

  React.useEffect(() => {
    const initState = async () => {
      try {
        const authToken = await getToken();
        if (authToken !== null) {
          dispatch({type: 'SIGN_IN', token: authToken});
        } else {
          dispatch({type: 'SIGN_OUT', token: null});
        }
      } catch (e) {
        console.log(e);
      }
    };

    initState();
  }, [state, dispatch]);

  const actions = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        dispatch({type: 'SIGN_IN', token});
        await setToken(token);
      },
      signOut: async () => {
        dispatch({type: 'SIGN_OUT', token: null});
        await removeToken();
      },
    }),
    [state, dispatch],
  );

  return (
    <AuthContext.Provider value={{...state, ...actions}}>
      {props.children}
    </AuthContext.Provider>
  );
};

const reducer = (state: any, action: { type: any; token: string | null; }) => {
  switch (action.type) {
    case 'SIGN_OUT':
      return {
        ...state,
        status: 'signOut',
        authToken: null,
      };
    case 'SIGN_IN':
      return {
        ...state,
        status: 'signIn',
        authToken: action.token,
      };
  }
};