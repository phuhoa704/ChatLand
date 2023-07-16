import {
    configureStore,
    compose,
  } from '@reduxjs/toolkit';
  import logger from 'redux-logger';
  import loading from './slices/Loading';
  import common from './slices/Common';
  import planning from './slices/Planning';
  import auth from './slices/Auth';
  import keyword from './slices/Keywords';
  import address from './slices/Address';
  import typemap from './slices/TypeMap';
  import toast from './slices/Toast';
  
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  export const store = configureStore({
    reducer: {
      loading,
      common,
      planning,
      auth,
      keyword,
      address,
      typemap,
      toast
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  })
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  