import {
    call, put, takeLatest,
  } from 'redux-saga/effects';
import { store } from 'react-notifications-component';
import { SET_USER, LOGIN_USER } from './contains';
import { setUser } from './action';

function* loginUser(action:any) {
    try {
//   const { url } = action.payload;
//   const res = yield call(getSEOBusInfoFromAPI, action.payload);
    const data = {
        ...action.payload,
        movies: [

        ],
    };
    yield put(setUser(data));
} catch (err) {
    store.addNotification({
        title: 'Login',
        message: 'Wrong email or password',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 1500,
          onScreen: true,
        },
      });
    console.log('err loginUser', err);
}
}

function* root() {
yield takeLatest(LOGIN_USER, loginUser);
}

export default root;
