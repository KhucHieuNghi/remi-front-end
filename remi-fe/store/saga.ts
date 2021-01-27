import { all } from 'redux-saga/effects';
import User from '~/store/user/saga';

export default function* AppSaga() {
  yield all([
    User(),
  ]);
}
